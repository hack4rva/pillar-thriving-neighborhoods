/**
 * Indexes the deep-research corpus in research/.
 *
 * This is the citation spine the rest of the graph hangs from. Nothing here is
 * inferred: a claim exists only where a report line carries a [N] marker that
 * resolves to a numbered entry in that report's "## References" section, and a
 * source exists only where such an entry carries a URL.
 *
 * Why only citations, when the reports are full of prose? Because a sentence
 * with a resolvable citation can be checked by a reader, and one without cannot.
 * Restricting extraction to cited lines is what makes it safe to run a language
 * model over this corpus later: the model gets to say what a cited sentence is
 * about, never whether it is true.
 *
 * Emits:
 *  - claims    evidence records, one per cited line (ev:R-n)
 *  - nodes     one Evidence node per distinct cited URL, tiered by authority
 *  - edges     Evidence -> Dataset/Organization links are left to the caller;
 *              this parser only relates claims to the sources backing them
 */
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { readRepoFile, makeNode, slug, REPO_ID, REPO_ROOT } from '../lib.js';

const RESEARCH_DIR = 'research';

/**
 * Scaffolding rather than findings: the prompt that generated the corpus, and
 * the indexes over it. Their sentences carry citations but assert nothing.
 */
const META_FILES = /^(INDEX|validation_report|\d+_master_research_prompt)\b/i;

/**
 * Local relevance vocabulary, tested against the whole report rather than each
 * sentence: a report can be entirely about Richmond while most of its sentences
 * use pronouns.
 */
const LOCAL = /\b(richmond|rva|virginia|henrico|chesterfield|petersburg|commonwealth|grtc|vcu)\b/gi;

/**
 * Sections A–D and F–I are briefed to describe Richmond specifically, so one
 * that never names the city has drifted off brief — this corpus contains a
 * "development transparency" report about international aid, and a "missing
 * information" report about clinical records. Section E is prior art from other
 * cities and J–Q are theory and cross-city comparison, so those are expected to
 * range wider and are not held to this test.
 */
const LOCAL_SECTION = /^[A-DF-I]\d/;
/** Mentions per thousand words below which a local-section report is off brief. */
const LOCAL_THRESHOLD = 0.5;

/**
 * Source authority. The corpus cites rva.gov ordinances alongside Reddit
 * threads and Medium posts; flattening those into one "source" would be the
 * single most misleading thing this graph could do, so the tier rides along on
 * every source node and decides the evidence status of anything citing it.
 */
const TIERS = [
  ['official', /(^|\.)gov$|\.gov\/|(^|\.)gov\.|virginia\.gov|richmondgov|legistar|arcgis\.com|\.mil$/],
  ['academic', /\.edu(\/|$)|sciencedirect|researchgate|jstor|springer|arxiv|pubmed|nih\.gov|tandfonline|wiley/],
  ['press', /vpm\.org|richmonder|richmond\.com|axios|wtvr|nbc12|wric|styleweekly|npr\.org|apnews|nytimes|washingtonpost|bloomberg|governing\.com|route-fifty|statescoop|smartcitiesdive/],
  ['code', /github\.com|gitlab\.com|npmjs\.com|pypi\.org/],
  ['community', /reddit\.com|facebook\.com|nextdoor|twitter\.com|x\.com|youtube\.com|medium\.com|substack|quora|linkedin\.com|wordpress|blogspot/],
];

/** Official sources can be cited as verified; everything else stays weaker. */
const STATUS_BY_TIER = {
  official: 'externally_verified',
  academic: 'reported_but_unverified',
  press: 'reported_but_unverified',
  code: 'reported_but_unverified',
  community: 'reported_but_unverified',
  other: 'reported_but_unverified',
};

/** Scraper placeholders that show up in reference lists instead of real titles. */
const GENERIC_TITLE = /^(fetched web page|pdf|untitled|home|document|web page|link|no title)$/i;

/**
 * A title lifted from a URL or filename, e.g.
 * "the-usability-and-content-accessibility-of-the-e-government".
 */
function unslug(title) {
  if (!/^[a-z0-9]+(-[a-z0-9]+){3,}$/.test(title)) return title;
  return title.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
}

/**
 * Give sources that share a page title something to tell them apart.
 *
 * Distinct URLs legitimately carry the same title — four separate pages are all
 * called "Search | Richmond" — and as nodes they read as one thing repeated.
 * Only the collisions are touched, so the common case keeps its clean title.
 */
function disambiguate(nodes) {
  const byLabel = new Map();
  for (const n of nodes) byLabel.set(n.label, [...(byLabel.get(n.label) ?? []), n]);
  for (const group of byLabel.values()) {
    if (group.length < 2) continue;
    for (const n of group) {
      let tail = '';
      try {
        const u = new URL(n.attrs.url);
        tail = (u.pathname + u.search).replace(/\/+$/, '');
      } catch { /* keep the label as-is */ }
      if (!tail || tail === '/') tail = n.attrs.host;
      if (tail.length > 40) tail = `…${tail.slice(-39)}`;
      n.label = `${n.label} (${tail})`;
    }
  }
}

/**
 * Where a source lives, for citations that came with no title. The hostname
 * alone is not an identity: fourteen distinct Open Data datasets were all
 * labelled "data.richmondgov.com" and read as one repeated node.
 */
function locate(url, host) {
  let tail = '';
  try {
    const u = new URL(url);
    tail = (u.pathname + u.search).replace(/\/+$/, '');
  } catch { return host; }
  if (!tail || tail === '/') return host;
  if (tail.length > 48) tail = `…${tail.slice(-47)}`;
  return `${host}${tail}`;
}

function tierFor(url) {
  let host = '';
  try { host = new URL(url).hostname; } catch { return 'other'; }
  const probe = `${host}${(() => { try { return new URL(url).pathname; } catch { return ''; } })()}`;
  for (const [tier, re] of TIERS) if (re.test(probe)) return tier;
  return 'other';
}

/** Reference lines look like "3. *Title*. https://..." (title sometimes absent). */
function parseReferences(lines, startIdx) {
  const refs = new Map();
  for (const line of lines.slice(startIdx + 1)) {
    const m = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
    if (!m) continue;
    const rest = m[2];
    const url = (rest.match(/https?:\/\/[^\s)>*\]]+/) ?? [])[0] ?? null;
    const title = rest
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[*_]/g, '')
      .replace(/[.,\s-]+$/, '')
      .trim();
    refs.set(m[1], { title: title || null, url });
  }
  return refs;
}

/**
 * A cited line is worth indexing only if it makes an assertion. Headings,
 * list scaffolding and the reference block itself carry citations without
 * saying anything.
 */
function isClaimLine(line) {
  const t = line.trim();
  if (t.length < 40) return false;
  if (/^#{1,6}\s/.test(t)) return false;
  if (/^\|/.test(t)) return false;
  // Strip list/quote markers before measuring prose.
  const prose = t.replace(/^[-*+>]\s*/, '').replace(/^\d+[.)]\s*/, '');
  return prose.split(/\s+/).length >= 6;
}

const clean = (s) => s
  .replace(/^[-*+>]\s*/, '')
  .replace(/^\d+[.)]\s*/, '')
  .replace(/\[\d+\]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

export function parseResearchCorpus() {
  const dir = resolve(REPO_ROOT, RESEARCH_DIR);
  if (!existsSync(dir)) {
    return { claims: [], nodes: [], sources: new Map(), stats: { reports: 0, skipped: [] } };
  }

  const claims = [];
  const sources = new Map(); // url -> { url, title, tier, citedBy:Set<report>, claimIds:[] }
  const skipped = [];
  let reports = 0;
  let seq = 0;

  const offTopic = [];
  /** Reports that produced claims, named so the extraction report can list them. */
  const reportsRead = [];

  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const rel = `${RESEARCH_DIR}/${file}`;
    if (META_FILES.test(file)) { skipped.push({ file: rel, reason: 'corpus scaffolding, not findings' }); continue; }
    const text = readRepoFile(rel);
    const lines = text.split('\n');
    reports++;

    if (LOCAL_SECTION.test(file)) {
      const words = text.split(/\s+/).length;
      const density = 1000 * ((text.match(LOCAL) ?? []).length) / words;
      if (density < LOCAL_THRESHOLD) {
        offTopic.push({ file: rel, localMentionsPerKWord: Number(density.toFixed(2)) });
        continue;
      }
    }

    const refIdx = lines.findIndex((l) => /^#{1,6}\s*References\s*$/i.test(l.trim()));
    if (refIdx < 0) { skipped.push({ file: rel, reason: 'no References section' }); continue; }
    const refs = parseReferences(lines, refIdx);
    if (!refs.size) { skipped.push({ file: rel, reason: 'References section had no numbered entries' }); continue; }

    // Buffered so the report can be judged as a whole before its claims count.
    const pending = [];

    for (let i = 0; i < refIdx; i++) {
      const line = lines[i];
      const markers = [...line.matchAll(/\[(\d+)\]/g)].map((m) => m[1]);
      if (!markers.length || !isClaimLine(line)) continue;

      const cited = [...new Set(markers)]
        .map((n) => ({ n, ...(refs.get(n) ?? {}) }))
        .filter((r) => r.url || r.title);
      if (!cited.length) continue; // dangling [N]: no reference to point at

      const withUrl = cited.filter((c) => c.url);
      // The strongest source backing the line sets its status.
      const tiers = withUrl.map((c) => tierFor(c.url));
      const status = tiers.includes('official') ? 'externally_verified'
        : withUrl.length ? STATUS_BY_TIER[tiers[0]] ?? 'reported_but_unverified'
          : 'reported_but_unverified';

                      const primary = withUrl[0] ?? null;
                      // The claim text has citation markers stripped so it reads
                      // as a sentence, which means it no longer appears in the
                      // file. Provenance excerpts have to be verbatim or they
                      // cannot be checked against the line they cite.
                      const raw = line.trim();
                      pending.push({
        id: null, // assigned once the report clears the relevance check
        claim: clean(line).slice(0, 900),
        status: status === 'externally_verified' ? 'confirmed' : 'likely',
        source: primary?.title ?? null,
        url: primary?.url ?? null,
        repo: REPO_ID,
        provenance: [{
          sourceDoc: rel,
          sourceLocation: `lines ${i + 1}-${i + 1}`,
          excerpt: raw.slice(0, 400),
          ...(primary?.url ? { url: primary.url } : {}),
          ...(primary?.title ? { sourceTitle: primary.title } : {}),
        }],
        notes: withUrl.length > 1
          ? `Cites ${withUrl.length} sources: ${withUrl.map((c) => c.url).join(' ')}`
          : undefined,
        // Not part of the evidenceRecord schema; stripped before writing and
        // used to wire claims to their source nodes and to the LLM pass.
        _evidenceStatus: status,
        _sources: withUrl,
        _report: rel,
        _line: i + 1,
        _raw: raw,
      });
    }

    if (pending.length) reportsRead.push(rel);
    for (const c of pending) {
      c.id = `ev:R-${++seq}`;
      claims.push(c);
      for (const s of c._sources) {
        if (!sources.has(s.url)) {
          sources.set(s.url, { url: s.url, title: s.title, tier: tierFor(s.url), citedBy: new Set(), claimIds: [] });
        }
        const entry = sources.get(s.url);
        entry.citedBy.add(rel);
        entry.claimIds.push(c.id);
        if (!entry.title && s.title) entry.title = s.title;
      }
    }
  }

  // One node per distinct cited source. These are the endpoints a reader
  // follows out of the graph, so they carry the URL, the tier, and how much of
  // the corpus leans on them.
  const nodes = [];
  for (const s of sources.values()) {
    let host = s.url;
    try { host = new URL(s.url).hostname.replace(/^www\./, ''); } catch { /* keep raw */ }
    // Some reference entries carry a scraper placeholder instead of a title.
    const title = s.title?.trim();
    const usable = title && title.length > 3 && !GENERIC_TITLE.test(title);
    const label = usable ? unslug(title) : locate(s.url, host);
    nodes.push(makeNode({
      // Hash the URL rather than slugging it: slug() truncates at 80 chars, and
      // deep .gov and ArcGIS URLs share long prefixes, so slugs collided and
      // silently merged distinct sources.
      id: `n:source:${slug(host)}-${createHash('sha256').update(s.url).digest('hex').slice(0, 8)}`,
      type: 'Evidence',
      // Trimmed after the cut, not before: slicing a long page title lands
      // mid-word as often as not, and left the label ending in a space.
      label: label.length > 120 ? `${label.slice(0, 119).trimEnd()}…` : label,
      description: `${s.tier} source cited by ${s.citedBy.size} research report${s.citedBy.size === 1 ? '' : 's'} (${s.claimIds.length} claim${s.claimIds.length === 1 ? '' : 's'}).`,
      evidenceStatus: STATUS_BY_TIER[s.tier],
      attrs: {
        url: s.url,
        host,
        sourceTier: s.tier,
        citedByReports: [...s.citedBy].sort(),
        claimCount: s.claimIds.length,
      },
                      provenance: [...s.citedBy].slice(0, 5).map((doc) => ({
                        sourceDoc: doc,
                        sourceLocation: 'References',
                        // The URL, not the title: reference lines wrap titles in
                        // markdown emphasis, so only the URL is verbatim.
                        excerpt: s.url,
        url: s.url,
        ...(s.title ? { sourceTitle: s.title } : {}),
      })),
    }));
  }

  disambiguate(nodes);

  return {
    claims,
    nodes,
    sources,
    stats: {
      reports, skipped, offTopic, reportsRead,
      claimCount: claims.length,
      sourceCount: nodes.length,
    },
  };
}
