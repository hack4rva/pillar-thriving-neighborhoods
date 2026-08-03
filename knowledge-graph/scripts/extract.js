#!/usr/bin/env node
/**
 * Extraction pipeline: rebuilds data/ from the research repository.
 *
 * Steps: run deterministic parsers (CIP CSV, evidence log, source inventory),
 * load curated extraction records, verify every excerpt against the actual
 * source files, resolve aliases, drop broken references into the review queue,
 * compute data-quality metrics, and write the normalized dataset.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCipCsv } from '../extraction/parsers/cip_csv.js';
import { parseEvidenceLog } from '../extraction/parsers/evidence_log.js';
import { parseSourceInventory } from '../extraction/parsers/source_inventory.js';
import { parsePostEventResearch } from '../extraction/parsers/post_event_research.js';
import { parseResearchCorpus } from '../extraction/parsers/research_corpus.js';
import { readOrganizations } from '../extraction/parsers/organizations.js';
import { makeNode, makeEdge, verifyProvenance, REPO_ID, slug } from '../extraction/lib.js';
import { config } from '../extraction/config.js';
import { computeMetrics } from '../extraction/metrics.js';

const ROOT = resolve(import.meta.dirname, '..');
const DATA_DIR = resolve(ROOT, 'data');
const PUBLIC_DATA_DIR = resolve(ROOT, 'public', 'data');

const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

/**
 * Curated records are hand-authored per pillar. A pillar that hasn't curated
 * any yet still gets a graph from its deterministic parsers, so read these
 * defensively rather than requiring the files to exist.
 */
const readRecords = (p, fallback) => {
  try {
    return readJson(p);
  } catch {
    return fallback;
  }
};

const RUN_TS = new Date().toISOString();

/**
 * Link a claim to a dataset when the corpus itself connects them — the claim
 * names the dataset, or both point at the same URL. Nothing is inferred beyond
 * a literal match, so every edge can be checked by reading the two rows.
 */
function deriveCitations(ev, inv) {
  if (!config.derive) return [];
  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return null; } };

  const edges = [];
  const datasets = inv.nodes.filter((n) => n.type === 'Dataset');
  // A domain shared by many sources (an open-data portal) says little about any
  // one of them, so only treat a domain as a link when it is distinctive.
  const perHost = new Map();
  for (const ds of datasets) {
    const h = host(ds.attrs?.url);
    if (h) perHost.set(h, (perHost.get(h) ?? 0) + 1);
  }

  for (const evNode of ev.nodes.filter((n) => n.type === 'Evidence')) {
    const claim = (evNode.description ?? '').toLowerCase();
    const evUrl = evNode.attrs?.url ?? null;
    const evHost = host(evUrl);
    for (const ds of datasets) {
      const name = ds.label.toLowerCase();
      const sameUrl = evUrl && ds.attrs?.url && evUrl === ds.attrs.url;
      const named = name.length >= 10 && claim.includes(name);
      const dsHost = host(ds.attrs?.url);
      const sameHost = !sameUrl && evHost && dsHost === evHost && (perHost.get(evHost) ?? 0) <= 3;
      if (!sameUrl && !named && !sameHost) continue;

      let description;
      if (sameUrl) description = `Claim and inventoried source share the URL ${evUrl}`;
      else if (named) description = `Claim names the inventoried source "${ds.label}"`;
      else description = `Claim cites ${evHost}, the same publisher domain as this inventoried source`;

      edges.push(makeEdge({
        source: evNode.id,
        target: ds.id,
        // A shared domain is an association; only an exact URL or a named
        // source is strong enough to call the claim supported by it.
        type: sameHost ? 'ASSOCIATED_WITH' : 'SUPPORTED_BY',
        description,
        evidenceStatus: 'documented',
        confidence: sameUrl ? 'high' : named ? 'medium' : 'low',
        provenance: evNode.provenance,
      }));
    }
  }
  return edges;
}

/**
 * Tie a cited source to an inventoried dataset when they are literally the same
 * thing: identical URL, or the same host where that host backs only a handful of
 * sources. A shared host like rva.gov says nothing, so it is not enough on its own.
 */
function linkSourcesToInventory(rc, inv) {
  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return null; } };
  const datasets = inv.nodes.filter((n) => n.type === 'Dataset' && n.attrs?.url);

  const perHost = new Map();
  for (const ds of datasets) {
    const h = host(ds.attrs.url);
    if (h) perHost.set(h, (perHost.get(h) ?? 0) + 1);
  }

  const edges = [];
  for (const src of rc.nodes) {
    const url = src.attrs.url;
    const h = src.attrs.host;
    for (const ds of datasets) {
      const sameUrl = ds.attrs.url === url;
      const sameHost = !sameUrl && host(ds.attrs.url) === h && (perHost.get(h) ?? 0) <= 2;
      if (!sameUrl && !sameHost) continue;
      edges.push(makeEdge({
        source: src.id,
        target: ds.id,
        type: sameUrl ? 'SUPPORTED_BY' : 'ASSOCIATED_WITH',
        description: sameUrl
          ? `Research cites this inventoried source directly (${url})`
          : `Research cites ${h}, the publisher of this inventoried source`,
        evidenceStatus: 'documented',
        confidence: sameUrl ? 'high' : 'low',
        provenance: src.provenance,
      }));
    }
  }
  return edges;
}

/**
 * Turn the reviewed corpus-entity record into nodes and edges.
 *
 * The record is produced offline by extraction/enrich/extract_entities.mjs. Its
 * anchors are re-checked here rather than trusted: a claim id that no longer
 * exists means the corpus moved under the record, and the element is dropped
 * instead of being given provenance that does not resolve. That keeps this
 * script's output a pure function of the repository, model output included.
 */
/**
 * Reduce the open-question list to questions that are open, and to one entry
 * each. Mutates in place; returns what it removed, for the report.
 *
 * Two sources feed this list — the evidence log's "Missing" section and the
 * per-project gap lists in post-event research — and they overlap, so the same
 * gap can be written twice under different ids. The graph deduplicates by id
 * and so never showed it; the published count came from the list and did.
 *
 * A question the corpus has since struck through and marked resolved is also
 * not open. It is dropped here rather than in the source file, because the
 * strikethrough is the record of it having been answered.
 */
const RESOLVED = /~~.*~~|\b(RESOLVED|ANSWERED)\b/;

function tidyQuestions(questions) {
  const seen = new Map(); // normalized text -> kept question
  const removed = { duplicates: 0, resolved: 0, resolvedTexts: [] };
  const kept = [];
  for (const q of questions) {
    if (RESOLVED.test(q.question)) {
      removed.resolved++;
      removed.resolvedTexts.push(q.question);
      continue;
    }
    // Identity follows the graph's: a question is the one its node is. Two
    // sections of the same project can ask one thing in two wordings, which
    // reads as two entries in the list and has always been one node. Falls back
    // to the text where a question has no node of its own.
    const qNode = (q.relatedNodeIds ?? []).find((id) => id.startsWith('n:question:'));
    const norm = qNode ?? q.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const prior = seen.get(norm);
    if (prior) {
      // The duplicate can name related entities the first one did not.
      prior.relatedNodeIds = [...new Set([...(prior.relatedNodeIds ?? []), ...(q.relatedNodeIds ?? [])])];
      removed.duplicates++;
      continue;
    }
    seen.set(norm, q);
    kept.push(q);
  }
  questions.length = 0;
  questions.push(...kept);
  return removed;
}

/** Entity types whose names have to read like the name of a body. */
const ORG_TYPES = new Set(['Organization', 'GovernmentAgency', 'Nonprofit', 'Foundation',
  'University', 'Employer', 'Vendor', 'TrainingProvider', 'LegislativeBody']);

/**
 * Whether a name is the name of something, rather than a word for a kind of
 * thing. The model is asked for durable nameable entities and mostly obliges,
 * but roughly one in six of what it returns is a concept lifted from the
 * sentence — "asset_id", "geometry types", "diagnostic fields", "equipment",
 * "existing 311 datasets". Those are what a claim is *about*; as nodes they
 * accumulate edges while identifying nothing.
 *
 * English capitalizes proper names, which separates them cleanly, with two
 * exceptions worth keeping: brands that begin on a lowercase letter (eVA, iCal,
 * mRelief) and bare hostnames (data.census.gov, richmondva.legistar.com).
 */
const isProperName = (name) => /^[^a-z]/.test(name)
  || /^[a-z][A-Z]/.test(name)
  || /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/|$|\s)/i.test(name);

function buildCorpusGraph(record, rc, warnings) {
  const claimById = new Map(rc.claims.map((c) => [c.id, c]));
  const nodes = [];
  const edges = [];
  const dropped = { staleClaim: 0, unknownEndpoint: 0, notAnOrg: 0, notAName: 0 };

  // Provenance for anything derived from claims: the report line that said it,
  // plus the primary source that line cites. Two hops, both checkable.
  const provFor = (claimIds) => {
    const out = [];
    for (const id of claimIds.slice(0, 4)) {
      const c = claimById.get(id);
      if (!c) continue;
      const primary = c._sources[0];
      out.push({
        sourceDoc: c._report,
        sourceLocation: `lines ${c._line}-${c._line}`,
        // Verbatim, so the excerpt can be found at the line it names.
        excerpt: (c._raw ?? c.claim).slice(0, 400),
        claimId: c.id,
        ...(primary?.url ? { url: primary.url } : {}),
        ...(primary?.title ? { sourceTitle: primary.title } : {}),
      });
    }
    return out;
  };

  // The model names the same place several ways across batches. Only variants
  // of one entity are folded here — "City of Richmond" stays a separate
  // GovernmentAgency, because the municipal government and the place are not
  // interchangeable in a graph about who does what.
  const canonical = (name) => name.replace(/^Richmond,\s*(Virginia|VA)$/i, 'Richmond');

  const idFor = (name, type) => `n:${type.toLowerCase()}:${slug(canonical(name))}`;
  const byNorm = new Map(); // normalized name -> node id

  const skipped = new Set();
  const skip = (name) => skipped.add(name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim());
  for (const e of record.entities) {
    const live = e.claimIds.filter((id) => claimById.has(id));
    if (!live.length) { dropped.staleClaim++; continue; }
    if (!isProperName(e.name)) { skip(e.name); dropped.notAName++; continue; }
    // The model occasionally lifts a contact address or a URL out of a claim
    // and types it as an organization. An inbox is a way to reach a body, not
    // the body itself, so it does not get to be a node.
    if (ORG_TYPES.has(e.type) && !readOrganizations(e.name).length) {
      skip(e.name);
      dropped.notAnOrg++;
      continue;
    }
    const id = idFor(e.name, e.type);
    byNorm.set(e.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(), id);
    // Status follows the strongest source behind its claims, never the model.
    const verified = live.some((cid) => claimById.get(cid)._evidenceStatus === 'externally_verified');
    nodes.push(makeNode({
      id,
      type: e.type,
      label: canonical(e.name).length > 90 ? `${canonical(e.name).slice(0, 87)}…` : canonical(e.name),
      description: e.description || '',
      evidenceStatus: verified ? 'externally_verified' : 'reported_but_unverified',
      aliases: e.aliases,
      attrs: { claimCount: live.length, origin: 'research corpus' },
      provenance: provFor(live),
    }));
  }

  for (const r of record.relations) {
    const live = r.claimIds.filter((id) => claimById.has(id));
    if (!live.length) { dropped.staleClaim++; continue; }
    const source = byNorm.get(r.source);
    const target = byNorm.get(r.target);
    if (!source || !target || source === target) { dropped.unknownEndpoint++; continue; }
    edges.push(makeEdge({
      source,
      target,
      type: r.type,
      description: r.description || `Stated in ${live.length} cited claim${live.length === 1 ? '' : 's'}`,
      evidenceStatus: 'reported_but_unverified',
      confidence: live.length >= 3 ? 'high' : live.length === 2 ? 'medium' : 'low',
      provenance: provFor(live),
    }));
  }

  // Attach each entity to the sources its claims cite. This is what stops the
  // cited-source nodes being an unreachable bibliography off to one side.
  const sourceNodeByUrl = new Map(rc.nodes.map((n) => [n.attrs.url, n]));
  const seen = new Set();
  for (const e of record.entities) {
    if (skipped.has(e.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim())) continue;
    const entityId = idFor(e.name, e.type);
    for (const cid of e.claimIds) {
      const claim = claimById.get(cid);
      if (!claim) continue;
      for (const s of claim._sources) {
        const src = sourceNodeByUrl.get(s.url);
        if (!src) continue;
        const key = `${entityId}|${src.id}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push(makeEdge({
          source: entityId,
          target: src.id,
          type: 'SUPPORTED_BY',
          description: `A claim naming this entity cites ${s.title ?? s.url}`,
          evidenceStatus: 'documented',
          confidence: 'high',
          provenance: provFor([cid]),
        }));
      }
    }
  }

  if (Object.values(dropped).some(Boolean)) {
    warnings.push(`[corpus] dropped ${dropped.staleClaim} stale-anchor, `
      + `${dropped.unknownEndpoint} unresolved-endpoint, ${dropped.notAnOrg} not-an-organization `
      + `and ${dropped.notAName} not-a-name records`);
  }
  return { nodes, edges };
}

/**
 * Move sentence-shaped Problem/Need nodes into the evidence layer.
 *
 * The post-event research parser names these nodes with the sentence it found
 * them in, so each one is unique to a single document and connects to nothing
 * else — they were the bulk of the graph's degree-1 tail. As claims they are
 * still readable and still cited; they just stop pretending to be entities.
 *
 * Evidence and ResearchQuestion nodes are also sentence-shaped and are left
 * alone: a claim and an open question are supposed to read as statements.
 */
function demoteSentenceNodes(per, warnings) {
  const isSentence = (n) => n.label.split(/\s+/).length > 8 || n.label.endsWith('…');
  const demotable = (n) => ['Problem', 'Need'].includes(n.type) && isSentence(n);

  const demoted = per.nodes.filter(demotable);
  const ids = new Set(demoted.map((n) => n.id));
  if (!demoted.length) return { nodes: per.nodes, edges: per.edges, claims: [] };

  const claims = demoted.map((n, i) => ({
    id: `ev:P-${i + 1}`,
    claim: (n.description || n.label).slice(0, 900),
    status: 'unverified',
    source: 'post-event research',
    url: null,
    repo: REPO_ID,
    provenance: n.provenance,
    notes: `Recorded as a ${n.type.toLowerCase()} statement in post-event research. Held as a claim rather than an entity because it is phrased as a finding.`,
  }));

  warnings.push(`[demote] ${demoted.length} sentence-shaped Problem/Need nodes moved to the evidence layer`);
  return {
    nodes: per.nodes.filter((n) => !ids.has(n.id)),
    edges: per.edges.filter((e) => !ids.has(e.source) && !ids.has(e.target)),
    claims,
  };
}

function main() {
  const warnings = [];
  const reviewQueue = readRecords('extraction/records/review.json', []);

  // 1. Deterministic parsers ------------------------------------------------
  // The projects CSV is the only origin of costs, phases, and financial flows.
  // Pillars without one produce a graph with no money layer, by design.
  const cip = config.sources.projectsCsv
    ? parseCipCsv()
    : { nodes: [], edges: [], flows: [], filesExamined: [] };
  const ev = parseEvidenceLog();
  const inv = parseSourceInventory();
  const perRaw = parsePostEventResearch();
  // The research corpus is prose, so only its citations are machine-readable.
  // This yields the claim index and one node per cited primary source; the
  // entities those claims are *about* are resolved separately.
  const rc = parseResearchCorpus();
  const demoted = demoteSentenceNodes(perRaw, warnings);
  const per = { ...perRaw, nodes: demoted.nodes, edges: demoted.edges };

  // 2. Curated records ------------------------------------------------------
  const entityRecords = readRecords('extraction/records/entities.json', []);
  const relationshipRecords = readRecords('extraction/records/relationships.json', []);
  const curatedFlows = readRecords('extraction/records/flows.json', []);
  const curatedQuestions = readRecords('extraction/records/questions.json', []);
  // External research: web-sourced findings that answer/narrow open questions.
  // Provenance is URL-based (not file-verifiable); counted as "external".
  // Normalize rather than trust the file: a pillar with no external research
  // yet should still iterate cleanly over every collection below.
  const external = {
    researchedAt: null,
    evidence: [], entities: [], relationships: [], flows: [],
    nodeUpdates: [], flowUpdates: [], questionAnswers: [],
    ...readRecords('extraction/records/external.json', {}),
  };

  const verification = { exact: 0, moved: 0, unchecked: 0, missing: 0, external: 0 };
  const verifyAll = (record, kind, label) => {
    let ok = true;
    for (const prov of record.provenance ?? []) {
      const result = verifyProvenance(prov);
      verification[result.level] = (verification[result.level] ?? 0) + 1;
      if (result.level === 'moved') warnings.push(`[moved] ${kind} ${label}: ${result.message}`);
      if (!result.ok) {
        ok = false;
        reviewQueue.push({
          id: `r:provenance-${slug(label)}`,
          itemType: kind,
          proposed: label,
          sourceExcerpt: prov.excerpt ?? '',
          sourceLocation: `${prov.sourceDoc} ${prov.sourceLocation}`,
          rationale: `Provenance verification failed: ${result.message}. Record excluded from the graph until re-verified.`,
          confidence: 'low',
          alternatives: ['Fix the excerpt/location in extraction/records', 'Drop the record'],
          decisionRequested: 'Re-verify this record against the source document.',
        });
      }
    }
    return ok;
  };

  const curatedNodes = [];
  for (const rec of entityRecords) {
    if (verifyAll(rec, 'node', rec.id)) curatedNodes.push(makeNode(rec));
  }

  const curatedEdges = [];
  for (const rec of relationshipRecords) {
    if (verifyAll(rec, 'edge', `${rec.source} ${rec.type} ${rec.target}`)) {
      curatedEdges.push(makeEdge(rec));
    }
  }

  // Research questions -> nodes (+ optional links to related nodes).
  const questions = [...ev.questions, ...per.questions];
  for (const q of curatedQuestions) {
    if (!verifyAll(q, 'node', q.id)) continue;
    const qNodeId = `n:question:${q.id.slice(2)}`;
    curatedNodes.push(makeNode({
      id: qNodeId,
      type: 'ResearchQuestion',
      label: q.question.length > 90 ? q.question.slice(0, 87) + '…' : q.question,
      description: q.question,
      evidenceStatus: 'documented',
      provenance: q.provenance,
      attrs: { category: q.category },
    }));
    for (const rel of q.relatedNodeIds ?? []) {
      curatedEdges.push(makeEdge({
        source: qNodeId,
        target: rel,
        type: 'ASSOCIATED_WITH',
        description: `Open question related to this entity: ${q.question}`,
        evidenceStatus: 'documented',
        confidence: 'high',
        provenance: q.provenance,
      }));
    }
    questions.push({
      id: q.id, question: q.question, category: q.category,
      repo: REPO_ID, relatedNodeIds: [qNodeId, ...(q.relatedNodeIds ?? [])],
      provenance: q.provenance,
    });
  }

  const questionStats = tidyQuestions(questions);

  // External research: evidence records + Evidence nodes (mirrors the
  // evidence-log parser), new entities/relationships/flows, updates to
  // existing records, and answers to open questions.
  // Claims carry scratch fields (prefixed _) used to wire them to source nodes
  // and to the entity pass; they are not part of the evidenceRecord schema.
  // Dropped by prefix rather than by name so adding one cannot break the
  // schema — which is exactly what happened when _raw was introduced.
  const claimRecords = rc.claims.map((c) => Object.fromEntries(
    Object.entries(c).filter(([k]) => !k.startsWith('_')),
  ));
  const evidenceRecords = [...ev.evidenceRecords, ...claimRecords, ...demoted.claims];
  for (const rec of external.evidence) {
    evidenceRecords.push({ ...rec, repo: REPO_ID });
    const code = rec.id.slice(3); // "ev:W-1" -> "W-1"
    curatedNodes.push(makeNode({
      id: `n:evidence:${code.toLowerCase()}`,
      type: 'Evidence',
      label: `${code}: ${rec.claim.length > 80 ? rec.claim.slice(0, 77) + '…' : rec.claim}`,
      description: rec.claim,
      evidenceStatus: rec.status === 'confirmed' ? 'externally_verified' : 'reported_but_unverified',
      provenance: rec.provenance,
      attrs: { evidenceLogStatus: rec.status, url: rec.url ?? null, origin: 'external research' },
    }));
  }
  for (const rec of external.entities) {
    verifyAll(rec, 'node', rec.id);
    curatedNodes.push(makeNode(rec));
  }
  for (const rec of external.relationships) {
    verifyAll(rec, 'edge', `${rec.source} ${rec.type} ${rec.target}`);
    curatedEdges.push(makeEdge(rec));
  }

  // 3. Merge ---------------------------------------------------------------
  const corpusRecord = readRecords('extraction/records/corpus_entities.json', { entities: [], relations: [] });
  const corpus = buildCorpusGraph(corpusRecord, rc, warnings);

  let nodes = [...cip.nodes, ...ev.nodes, ...inv.nodes, ...per.nodes, ...rc.nodes, ...corpus.nodes, ...curatedNodes];
  let edges = [...cip.edges, ...(ev.edges ?? []), ...inv.edges, ...per.edges, ...curatedEdges,
    ...deriveCitations(ev, inv), ...linkSourcesToInventory(rc, inv), ...corpus.edges];
  const flows = [...cip.flows, ...curatedFlows, ...external.flows];

  // Duplicate node IDs: merge provenance, keep first definition.
  const byId = new Map();
  for (const n of nodes) {
    if (byId.has(n.id)) {
      const kept = byId.get(n.id);
      kept.provenance = [...kept.provenance, ...n.provenance];
      warnings.push(`[merge] duplicate node id ${n.id}: provenance merged`);
    } else {
      byId.set(n.id, n);
    }
  }
  nodes = [...byId.values()];

  // Apply external-research updates to already-extracted records. Updates
  // never overwrite corpus provenance; they append URL provenance and notes.
  for (const upd of external.nodeUpdates) {
    const node = byId.get(upd.id);
    if (!node) { warnings.push(`[external] nodeUpdate target missing: ${upd.id}`); continue; }
    Object.assign(node, upd.set ?? {});
    if (upd.appendNote) node.notes = node.notes ? `${node.notes} ${upd.appendNote}` : upd.appendNote;
    for (const prov of upd.addProvenance ?? []) {
      verification.external++;
      node.provenance.push(prov);
    }
  }
  const flowById = new Map(flows.map((f) => [f.id, f]));
  for (const upd of external.flowUpdates) {
    const flow = flowById.get(upd.id);
    if (!flow) { warnings.push(`[external] flowUpdate target missing: ${upd.id}`); continue; }
    Object.assign(flow, upd.set ?? {});
    for (const su of upd.stageUpdates ?? []) {
      if (!flow.stages[su.index]) { warnings.push(`[external] ${upd.id} has no stage ${su.index}`); continue; }
      Object.assign(flow.stages[su.index], su.set);
    }
    if (upd.rollup) flow.rollup = upd.rollup;
    if (upd.unknowns) flow.unknowns = upd.unknowns;
    if (upd.appendNote) flow.notes = flow.notes ? `${flow.notes} ${upd.appendNote}` : upd.appendNote;
    for (const prov of upd.addProvenance ?? []) {
      verification.external++;
      flow.provenance.push(prov);
    }
  }

  // Duplicate-candidate detection: same normalized label, different IDs.
  const labelIndex = new Map();
  for (const n of nodes) {
    const key = n.label.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (labelIndex.has(key) && labelIndex.get(key) !== n.id) {
      reviewQueue.push({
        id: `r:dup-${slug(key)}`,
        itemType: 'node',
        proposed: `${labelIndex.get(key)} vs ${n.id}`,
        sourceExcerpt: n.label,
        sourceLocation: 'label comparison across extraction sources',
        rationale: 'Two nodes share the same normalized label; they may be the same entity and need alias resolution.',
        confidence: 'medium',
        alternatives: ['Merge via extraction/aliases.json', 'Keep separate'],
        decisionRequested: 'Decide whether these are the same entity.',
      });
    } else {
      labelIndex.set(key, n.id);
    }
  }

  // Broken references: edges whose endpoints do not exist.
  const brokenEdges = [];
  edges = edges.filter((e) => {
    const ok = byId.has(e.source) && byId.has(e.target);
    if (!ok) {
      brokenEdges.push(e);
      reviewQueue.push({
        id: `r:broken-${e.id.slice(2)}`,
        itemType: 'edge',
        proposed: `${e.source} ${e.type} ${e.target}`,
        sourceExcerpt: e.description,
        sourceLocation: e.provenance?.[0] ? `${e.provenance[0].sourceDoc} ${e.provenance[0].sourceLocation}` : 'unknown',
        rationale: 'Edge references a node that does not exist in this extraction run.',
        confidence: 'low',
        alternatives: ['Fix the node id in extraction records', 'Add the missing entity'],
        decisionRequested: 'Repair the reference.',
      });
    }
    return ok;
  });

  // Flow stage references must also resolve.
  for (const f of flows) {
    for (const s of f.stages) {
      for (const end of [s.from, s.to]) {
        if (!byId.has(end)) {
          warnings.push(`[broken-flow] ${f.id} references missing node ${end}`);
        }
      }
    }
  }

  // Attach external-research answers to open questions (status stays visible:
  // answered questions are annotated, never silently removed).
  const questionById = new Map(questions.map((q) => [q.id, q]));
  for (const qa of external.questionAnswers) {
    const q = questionById.get(qa.id);
    if (!q) { warnings.push(`[external] questionAnswer target missing: ${qa.id}`); continue; }
    q.status = qa.status;
    q.answer = qa.answer;
  }

  // A question the corpus struck through is no longer open, so its node goes
  // with its list entry. Matched on text because the node id is derived from
  // the source section rather than from the question.
  if (questionStats.resolvedTexts.length) {
    const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const resolved = questionStats.resolvedTexts.map(norm);
    const gone = new Set(nodes
      .filter((n) => n.type === 'ResearchQuestion'
        && resolved.some((r) => r.startsWith(norm(n.description || n.label).slice(0, 60))))
      .map((n) => n.id));
    if (gone.size) {
      for (let i = nodes.length - 1; i >= 0; i--) if (gone.has(nodes[i].id)) nodes.splice(i, 1);
      for (let i = edges.length - 1; i >= 0; i--) {
        if (gone.has(edges[i].source) || gone.has(edges[i].target)) edges.splice(i, 1);
      }
    }
  }

  // Stamp extraction time (IDs stay deterministic; only timestamps vary).
  for (const n of nodes) n.extractedAt = RUN_TS;
  for (const e of edges) e.extractedAt = RUN_TS;
  for (const f of flows) f.extractedAt = RUN_TS;

  // Deterministic ordering.
  nodes.sort((a, b) => a.id.localeCompare(b.id));
  edges.sort((a, b) => a.id.localeCompare(b.id));
  flows.sort((a, b) => a.id.localeCompare(b.id));

  // 4. Metrics ---------------------------------------------------------------
  const metrics = computeMetrics(nodes, edges, flows, evidenceRecords, reviewQueue, brokenEdges, verification);
  metrics.questionsDeduplicated = questionStats.duplicates;
  metrics.questionsResolvedSinceLogged = questionStats.resolved;
  metrics.externalResearch = {
    researchedAt: external.researchedAt,
    evidenceRecords: external.evidence.length,
    questionsAnswered: external.questionAnswers.filter((q) => q.status === 'answered').length,
    questionsPartiallyAnswered: external.questionAnswers.filter((q) => q.status === 'partially_answered').length,
    note: 'Web-sourced findings; official government sources classified externally_verified, organization/news figures reported as likely. See docs/data-methodology.md.',
  };

  // 5. Outputs ---------------------------------------------------------------
  const meta = {
    schemaVersion: '1.0.0',
    generatedAt: RUN_TS,
    repos: [REPO_ID],
    // Lets one identical index.html title itself correctly in every pillar repo.
    pillarName: config.pillarName,
    shortName: config.shortName,
    description: config.description,
    counts: { nodes: nodes.length, edges: edges.length, financialFlows: flows.length },
  };
  const graph = { meta, nodes, edges, financialFlows: flows };

  mkdirSync(DATA_DIR, { recursive: true });
  const write = (name, value) =>
    writeFileSync(resolve(DATA_DIR, name), JSON.stringify(value, null, 1) + '\n');

  write('graph.json', graph);
  write('nodes.json', nodes);
  write('edges.json', edges);
  write('financial_flows.json', flows);
  write('evidence.json', evidenceRecords);
  write('unanswered_questions.json', questions);
  write('review_queue.json', reviewQueue);
  write('extraction_report.json', {
    generatedAt: RUN_TS,
    repo: REPO_ID,
    // The research reports are named individually rather than counted, because
    // the corpus is the largest input by far and which of it was read — and
    // which was set aside as off brief — is the first thing anyone auditing
    // this graph needs to know.
    filesExamined: [
      ...collectFilesExamined(cip, ev, inv, per.nodes, entityRecords, relationshipRecords, curatedFlows, curatedQuestions),
      ...rc.stats.reportsRead,
    ],
    researchCorpus: {
      reportsRead: rc.stats.reportsRead.length,
      reportsOffBrief: rc.stats.offTopic,
      reportsWithoutReferences: rc.stats.skipped,
      claimsIndexed: rc.claims.length,
      primarySourcesCited: rc.nodes.length,
    },
    provenanceVerification: verification,
    warnings,
    metrics,
  });

  // Copies served by Vite (public/ is copied verbatim into the build).
  mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
  for (const name of ['graph.json', 'evidence.json', 'unanswered_questions.json', 'review_queue.json', 'extraction_report.json']) {
    cpSync(resolve(DATA_DIR, name), resolve(PUBLIC_DATA_DIR, name));
  }

  console.log(`nodes=${nodes.length} edges=${edges.length} flows=${flows.length} questions=${questions.length} review=${reviewQueue.length}`);
  console.log(`verification: ${JSON.stringify(verification)}`);
  if (warnings.length) {
    console.log(`warnings (${warnings.length}):`);
    for (const w of warnings) console.log('  ' + w);
  }
}

function collectFilesExamined(cip, ev, inv, ...recordSets) {
  const files = new Set([...cip.filesExamined, ...ev.filesExamined, ...inv.filesExamined]);
  for (const records of recordSets) {
    for (const rec of records) {
      for (const p of rec.provenance ?? []) {
        if (!/^https?:/.test(p.sourceDoc)) files.add(p.sourceDoc);
      }
    }
  }
  return [...files].sort();
}


main();
