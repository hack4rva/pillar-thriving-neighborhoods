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
  const questions = [...ev.questions];
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

  // External research: evidence records + Evidence nodes (mirrors the
  // evidence-log parser), new entities/relationships/flows, updates to
  // existing records, and answers to open questions.
  const evidenceRecords = [...ev.evidenceRecords];
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
  let nodes = [...cip.nodes, ...ev.nodes, ...inv.nodes, ...curatedNodes];
  let edges = [...cip.edges, ...(ev.edges ?? []), ...inv.edges, ...curatedEdges,
    ...deriveCitations(ev, inv)];
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
    filesExamined: collectFilesExamined(cip, ev, inv, entityRecords, relationshipRecords, curatedFlows, curatedQuestions),
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
