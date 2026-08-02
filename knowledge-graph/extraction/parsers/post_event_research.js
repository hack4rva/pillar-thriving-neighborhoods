import { readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { readRepoFile, makeNode, makeEdge, nodeId, slug, REPO_ID, REPO_ROOT } from '../lib.js';
import { config } from '../config.js';
import { readOrganizations } from './organizations.js';

/**
 * Parse `post-event-research/` into graph structure.
 *
 * Each project directory holds paired files: a `.json` carrying the research
 * output schema plus per-field citations and confidence, and a `.md` holding
 * the values under headings that mirror the schema exactly. The schema tells us
 * which fields are arrays of objects, so the markdown can be read structurally
 * rather than guessed at.
 *
 * These are AI-assisted research syntheses with real source citations but no
 * human verification, so every node is recorded as reported_but_unverified and
 * carries both file provenance and the cited URLs.
 */

const headingToKey = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const titleize = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const trim = (s, n) => (s.length > n ? `${s.slice(0, n - 3)}…` : s);

/** Split a research markdown file into `# Section` blocks, keeping line numbers. */
function splitSections(md) {
  const lines = md.split('\n');
  const sections = [];
  let current = null;
  lines.forEach((line, i) => {
    const h1 = /^# (.+)$/.exec(line);
    if (h1) {
      current = { title: h1[1].trim(), key: headingToKey(h1[1]), lineNo: i + 1, body: [] };
      sections.push(current);
      return;
    }
    if (current) current.body.push({ text: line, lineNo: i + 1 });
  });
  return sections;
}

/**
 * Read a section's `## Field` sub-blocks. A repeat of an already-seen field
 * name starts the next array item, which is how the writer serializes lists.
 */
function readFields(section) {
  const items = [];
  let item = null;
  let field = null;
  for (const { text, lineNo } of section.body) {
    const h2 = /^## (.+)$/.exec(text);
    if (h2) {
      const key = headingToKey(h2[1]);
      if (!item || key in item.values) {
        item = { values: {}, lines: {} };
        items.push(item);
      }
      field = key;
      item.values[field] = '';
      item.lines[field] = lineNo + 1;
      continue;
    }
    if (field && text.trim()) {
      item.values[field] = `${item.values[field]} ${text.trim()}`.trim();
    }
  }
  return items;
}

/** Plain prose section (no `##` sub-headings). */
function readProse(section) {
  return section.body.map((l) => l.text).join('\n').trim();
}

/** Index basis entries so a field path resolves to its citations and confidence. */
function indexBasis(basis) {
  const map = new Map();
  for (const b of basis ?? []) map.set(b.field, b);
  return map;
}

/** Provenance: the markdown line, plus each cited URL with its first excerpt. */
function provenanceFor(mdPath, lineNo, excerpt, basisEntry) {
  const prov = [{ sourceDoc: mdPath, sourceLocation: `lines ${lineNo}-${lineNo}`, excerpt }];
  for (const c of basisEntry?.citations ?? []) {
    if (!c.url) continue;
    prov.push({
      sourceDoc: c.url,
      sourceLocation: 'cited in post-event research',
      excerpt: (c.excerpts ?? [])[0] ?? '',
    });
    if (prov.length >= 4) break; // enough to trace; full list lives in the JSON
  }
  return prov;
}

export function parsePostEventResearch() {
  const rel = config.sources.postEventResearch;
  const empty = { nodes: [], edges: [], questions: [], filesExamined: [] };
  if (!rel) return empty;

  const root = resolve(REPO_ROOT, rel);
  if (!existsSync(root)) return empty;

  const nodes = [];
  const edges = [];
  const questions = [];
  const filesExamined = [];
  const seen = new Set();

  const addNode = (node) => {
    if (seen.has(node.id)) return false;
    seen.add(node.id);
    nodes.push(node);
    return true;
  };

  // `_shared-*` directories hold research common to several projects and are
  // included; `_research-answers` is a different question/answer shape.
  const projects = readdirSync(root)
    .filter((d) => !d.startsWith('.') && d !== '_research-answers')
    .filter((d) => statSync(join(root, d)).isDirectory())
    // A directory named for a failed run ("unknown-corrupted") has no project
    // behind it. Skipping it here rather than just its node keeps its findings
    // from being emitted as edges to a proposal that was never created.
    .filter((d) => !isPlaceholder(d));

  for (const project of projects) {
    const projectId = `n:proposal:${slug(project)}`;
    const projectDir = join(root, project);
    // Markdown carries the values; a sibling JSON adds citations and confidence
    // where the research was run through the structured pipeline.
    const files = readdirSync(projectDir).filter((f) => f.endsWith('.md') && f !== 'INDEX.md');
    if (!files.length) continue;

    let projectCreated = false;

    for (const mdFile of files) {
      const base = mdFile.replace(/\.md$/, '');
      const mdRel = `${rel}/${project}/${mdFile}`;
      const jsonRel = `${rel}/${project}/${base}.json`;

      let output = null;
      if (existsSync(resolve(REPO_ROOT, jsonRel))) {
        try { output = JSON.parse(readRepoFile(jsonRel)).output; } catch { output = null; }
      }
      const schema = output?.output_schema?.properties ?? null;

      filesExamined.push(mdRel);
      const basis = indexBasis(output?.basis);
      const sections = splitSections(readRepoFile(mdRel));

      // The project itself, described by whichever summary section exists.
      if (!projectCreated) {
        const summary = sections.find((s) => /summary$/.test(s.key));
        const text = summary ? readProse(summary) : '';
        projectCreated = addNode(makeNode({
          id: projectId,
          type: 'Proposal',
          label: titleize(project),
          description: text,
          evidenceStatus: 'proposed',
          provenance: provenanceFor(mdRel, summary?.lineNo ?? 1, text.slice(0, 200), null),
          attrs: { origin: 'post-event research', project },
        })) || projectCreated;
      }

      for (const section of sections) {
        // With a schema, trust it; without one, infer from the markdown itself.
        const spec = schema?.[section.key];
        if (schema && !spec) continue;
        const structured = spec
          ? spec.type === 'array' || spec.type === 'object'
          : section.body.some((l) => /^## /.test(l.text));
        const items = structured ? readFields(section) : null;

        const emit = (opts) => emitFinding({
          ...opts, section, mdRel, basis, projectId, addNode, edges, questions,
        });

        // Pain points: scoped to the population named in the section key.
        if (/pain_points$/.test(section.key)) {
          const audience = section.key.replace(/_pain_points$/, '');
          const groupId = audienceNode(audience, mdRel, section.lineNo, addNode);
          items?.forEach((item, i) => {
            const need = emit({
              index: i, type: 'Need', kind: 'pain_point',
              label: item.values.pain_point, item,
              notes: ['evidence', 'system_breakdown', 'cost_of_status_quo'],
            });
            if (need && groupId) {
              edges.push(makeEdge({
                source: groupId, target: need, type: 'EXPERIENCES_NEED',
                description: `${titleize(audience)} experience this documented pain point`,
                evidenceStatus: 'reported_but_unverified', confidence: 'medium',
                provenance: provenanceFor(mdRel, section.lineNo, item.values.pain_point ?? '', null),
              }));
            }
          });
          continue;
        }

        // Systemic issues, barriers, and challenges: problems the project sits
        // inside. Some pillars research the landscape rather than the user, and
        // name these sections "barriers to X" or "challenges in Y".
        if (/^systemic_issue/.test(section.key) || /equity_analysis$/.test(section.key)
            || /(^|_)(barriers?|challenges?|limitations)(_|$)/.test(section.key)) {
          if (items?.length) {
            items.forEach((item, i) => emit({
              index: i, type: 'Problem', kind: 'systemic',
              label: item.values.systemic_barrier ?? item.values.barrier ?? Object.values(item.values)[0],
              item, notes: ['impact', 'evidence_source', 'evidence'],
            }));
          } else {
            emit({ index: 0, type: 'Problem', kind: 'systemic', label: readProse(section), item: null });
          }
          continue;
        }

        // Jobs to be done.
        if (/job_to_be_done$/.test(section.key)) {
          emit({
            index: 0, type: 'Need', kind: 'job',
            label: items?.length ? Object.values(items[0].values)[0] : readProse(section),
            item: items?.[0] ?? null,
          });
          continue;
        }

        // Open questions raised by the research.
        if (/_questions$/.test(section.key)) {
          items?.forEach((item, i) => {
            const q = emit({
              index: i, type: 'ResearchQuestion', kind: 'question',
              label: item.values.question ?? Object.values(item.values)[0], item,
              notes: ['why_it_matters', 'how_to_answer', 'rationale'],
            });
            if (q) {
              questions.push({
                id: `q:${slug(project)}-${slug(section.key)}-${i}`,
                question: item.values.question ?? Object.values(item.values)[0] ?? '',
                category: section.key.replace(/_questions$/, ''),
                repo: REPO_ID,
                relatedNodeIds: [q, projectId],
                provenance: provenanceFor(mdRel, section.lineNo, item.values.question ?? '', null),
              });
            }
          });
          continue;
        }

        // What other cities did.
        if (/comparable_cities$/.test(section.key) || /^prior_art/.test(section.key)) {
          items?.forEach((item, i) => emit({
            index: i, type: 'Evidence', kind: 'prior_art',
            label: [item.values.city_name, item.values.finding ?? item.values.tool_name]
              .filter(Boolean).join(' — '),
            item, notes: ['challenge_or_strategy', 'relevance_to_richmond', 'finding'],
          }));
          continue;
        }

        // Tools already in the field, and who runs them.
        if (/tools$/.test(section.key)) {
          items?.forEach((item, i) => {
            const svc = emit({
              index: i, type: 'Service', kind: 'tool',
              label: item.values.tool_name, item,
              notes: ['effectiveness', 'limitations'],
            });
            // The cell can name a partnership ("GRCoC / Homeward"), so it is
            // read into names rather than used whole.
            for (const org of svc ? readOrganizations(item.values.managing_organization) : []) {
              const orgId = nodeId('org', org);
              addNode(makeNode({
                id: orgId, type: 'Organization', label: org,
                description: `Named in post-event research as the organization managing ${item.values.tool_name}.`,
                evidenceStatus: 'reported_but_unverified',
                provenance: provenanceFor(mdRel, section.lineNo, org, null),
              }));
              edges.push(makeEdge({
                source: orgId, target: svc, type: 'MANAGES',
                description: `${org} manages ${item.values.tool_name}`,
                evidenceStatus: 'reported_but_unverified', confidence: 'medium',
                provenance: provenanceFor(mdRel, section.lineNo, org, null),
              }));
            }
          });
          continue;
        }

        // Recommendations, linked to the pain point they name.
        if (/^implications_for/.test(section.key) || /recommendations$/.test(section.key)) {
          items?.forEach((item, i) => {
            const rec = emit({
              index: i, type: 'Proposal', kind: 'recommendation',
              label: item.values.specific_recommendation ?? item.values.recommendation_area,
              item, notes: ['recommendation_area', 'pain_point_addressed'],
              linkType: 'PROPOSES',
            });
            const addressed = item.values.pain_point_addressed;
            if (rec && addressed) {
              const target = `n:need:${slug(addressed)}`;
              if (seen.has(target)) {
                edges.push(makeEdge({
                  source: rec, target, type: 'ADDRESSES',
                  description: `Recommendation addresses: ${addressed}`,
                  evidenceStatus: 'proposed', confidence: 'medium',
                  provenance: provenanceFor(mdRel, section.lineNo, addressed, null),
                }));
              }
            }
          });
          continue;
        }
      }
    }
  }

  // Some repos write their post-event research as free-form prose rather than
  // the schema-mirrored format. Those yield no findings, so drop the project
  // node rather than leave an unconnected placeholder in the graph.
  const linked = new Set(edges.map((e) => e.source));
  const kept = nodes.filter((n) => !(n.attrs?.project && !linked.has(n.id)));

  const byId = new Map();
  for (const e of edges) if (!byId.has(e.id)) byId.set(e.id, e);

  return { nodes: kept, edges: [...byId.values()], questions, filesExamined };
}

/**
 * Some pain-point sections are scoped by population ("returning citizen
 * survivor"), others by job type or task ("functional job", "task specific").
 * Only the former describes a group of people.
 */
const NOT_A_POPULATION = /(^|_)(functional|emotional|systems?|task|job|cross_cutting|general|overall)(_|$)/;

/** ConstituentGroup node for the population a pain-point section is scoped to. */
function audienceNode(audience, mdRel, lineNo, addNode) {
  if (!audience || audience === 'resident') return null;
  if (NOT_A_POPULATION.test(audience)) return null;
  const id = nodeId('group', audience);
  addNode(makeNode({
    id,
    type: 'ConstituentGroup',
    label: titleize(audience),
    description: `Population scoped by the post-event research when documenting pain points.`,
    evidenceStatus: 'documented',
    provenance: [{ sourceDoc: mdRel, sourceLocation: `lines ${lineNo}-${lineNo}`, excerpt: '' }],
  }));
  return id;
}

/**
 * Text standing in for an answer the research did not have. Recorded as a node
 * it becomes an entity called "N/A — No information available", which is worse
 * than the absence it was standing in for.
 */
export function isPlaceholder(text) {
  return /^(n\/a|none|unknown|not (specified|available|provided|applicable)|no (information|data)|tbd|todo|pending|corrupted?)\b/i
    .test(String(text).trim());
}

/**
 * Create one finding node and link it to its project. Returns the node id, or
 * null when the source text was empty.
 */
function emitFinding({
  index, type, kind, label, item, notes = [], linkType = 'ADDRESSES',
  section, mdRel, basis, projectId, addNode, edges,
}) {
  const text = (label ?? '').trim();
  if (!text || isPlaceholder(text)) return null;

  const prefix = { Need: 'need', Problem: 'problem', Evidence: 'evidence', Service: 'service', Proposal: 'proposal', ResearchQuestion: 'question' }[type] ?? 'node';
  const id = `n:${prefix}:${slug(text)}`;

  const fieldPath = `${section.key}.${index}`;
  const basisEntry = basis.get(fieldPath) ?? basis.get(section.key);
  const detail = notes
    .map((n) => (item?.values?.[n] ? `${titleize(n)}: ${item.values[n]}` : null))
    .filter(Boolean).join(' · ');

  const created = addNode(makeNode({
    id,
    type,
    label: trim(text, 90),
    description: detail ? `${text} — ${detail}` : text,
    evidenceStatus: type === 'Proposal' ? 'proposed' : 'reported_but_unverified',
    provenance: provenanceFor(mdRel, item?.lines ? Object.values(item.lines)[0] : section.lineNo, text, basisEntry),
    attrs: {
      origin: 'post-event research',
      kind,
      section: section.key,
      confidence: basisEntry?.confidence ?? null,
      citationCount: basisEntry?.citations?.length ?? 0,
    },
  }));

  // Link even when the node already existed: the same finding can be reported
  // by more than one project, and each link is real. Duplicates are collapsed
  // by edge id before the parser returns.
  void created;
  {
    edges.push(makeEdge({
      source: projectId,
      target: id,
      type: linkType,
      description: `${titleize(kind)} identified by post-event research for this project`,
      evidenceStatus: 'reported_but_unverified',
      confidence: 'medium',
      provenance: [{ sourceDoc: mdRel, sourceLocation: `lines ${section.lineNo}-${section.lineNo}`, excerpt: text }],
    }));
  }
  return id;
}
