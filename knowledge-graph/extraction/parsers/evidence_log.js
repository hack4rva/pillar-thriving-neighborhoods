import { readRepoFile, makeNode, makeEdge, nodeId, REPO_ID } from '../lib.js';
import { config } from '../config.js';
import { parseTables, pick, headerKey, COLUMNS } from './tables.js';
import { readOrganizations } from './organizations.js';

const STATUS_TO_EVIDENCE = {
  confirmed: 'externally_verified',
  likely: 'reported_but_unverified',
  unverified: 'reported_but_unverified',
};

/** Map a heading or status-cell to one of our canonical statuses. */
function readStatus(text) {
  if (!text) return null;
  const t = String(text).toLowerCase();
  if (/prior art/.test(t)) return 'priorart';
  if (/dataset/.test(t)) return 'dataset';
  if (/document/.test(t)) return 'document';
  if (/risk/.test(t)) return 'risk';
  if (/missing|gap/.test(t)) return 'missing';
  if (/likely/.test(t)) return 'likely';
  if (/unverified|needs? verification|partial/.test(t)) return 'unverified';
  if (/confirm|verified|^yes$/.test(t)) return 'confirmed';
  return null;
}

/**
 * The kind of thing a table lists, read from its first content column. This is
 * more reliable than the section heading, which many repos omit.
 */
function tableKind(table) {
  const key = table.keys[1] ?? '';
  if (key === 'risk') return 'risk';
  if (key === 'dataset') return 'dataset';
  if (key === 'document') return 'document';
  if (key === 'tool') return 'priorart';
  if (['whatismissing', 'item', 'claimneeded'].includes(key)) return 'missing';
  return 'claim';
}

const trim = (s, n) => (s.length > n ? `${s.slice(0, n - 3)}…` : s);

/**
 * Parse the pillar's evidence log into evidence records plus graph nodes:
 * claim rows -> Evidence nodes, missing/gap rows -> ResearchQuestion nodes,
 * risk rows -> Risk nodes. Dataset, document, and prior-art rows become
 * evidence records only — dataset *nodes* come from the source inventory.
 */
export function parseEvidenceLog() {
  const LOG_PATH = config.sources.evidenceLog;
  if (!LOG_PATH) return { evidenceRecords: [], nodes: [], questions: [], filesExamined: [] };

  const evidenceRecords = [];
  const nodes = [];
  const edges = [];
  const questions = [];
  const derivedOrgs = new Set();

  /**
   * Attribute a claim to the organizations the corpus names as its source.
   * The source cell frequently holds a method or a document title instead of a
   * name, and sometimes several names at once, so it is read rather than taken
   * verbatim. A cell that names nobody produces no node and no edge.
   */
  const attribute = (evidenceNodeId, sourceName, prov) => {
    if (!config.derive || !sourceName) return;
    for (const orgName of readOrganizations(sourceName)) {
      const orgId = nodeId('org', orgName);
      if (!derivedOrgs.has(orgId)) {
        derivedOrgs.add(orgId);
        nodes.push(makeNode({
          id: orgId,
          type: 'Organization',
          label: orgName,
          description: 'Named in the evidence log as the source of one or more claims.',
          evidenceStatus: 'documented',
          provenance: prov,
        }));
      }
      edges.push(makeEdge({
        source: evidenceNodeId,
        target: orgId,
        type: 'ASSOCIATED_WITH',
        description: `Evidence log names ${orgName} as the source of this claim`,
        evidenceStatus: 'documented',
        confidence: 'high',
        provenance: prov,
      }));
    }
  };

  for (const table of parseTables(readRepoFile(LOG_PATH))) {
    if (headerKey(table.headers[0] ?? '') !== 'id') continue;
    const kind = tableKind(table);
    const headingStatus = readStatus(table.heading);

    for (const row of table.rows) {
      const id = row.cells[0];
      if (!/^[A-Z]+-\d+$/.test(id)) continue;

      const label = pick(table, row, COLUMNS.label) || row.cells[1] || '';
      if (!label) continue;
      const url = pick(table, row, COLUMNS.url);
      const source = pick(table, row, COLUMNS.source);
      const notes = pick(table, row, COLUMNS.notes);
      const prov = [{
        sourceDoc: LOG_PATH,
        sourceLocation: `lines ${row.lineNo}-${row.lineNo}`,
        excerpt: label,
      }];

      // A row is only "confirmed" when the corpus says so explicitly. Absent a
      // statement, a bare URL earns "likely" — never externally_verified.
      const rowStatus = readStatus(pick(table, row, COLUMNS.status));
      let status = kind === 'claim'
        ? (rowStatus ?? headingStatus ?? (/^https?:/.test(url) ? 'likely' : 'unverified'))
        : kind;
      if (!STATUS_TO_EVIDENCE[status] && kind === 'claim') status = 'unverified';

      if (kind === 'claim') {
        evidenceRecords.push({
          id: `ev:${id}`, claim: label, status,
          source: source || null, url: /^https?:/.test(url) ? url : null,
          repo: REPO_ID, provenance: prov,
        });
        nodes.push(makeNode({
          id: `n:evidence:${id.toLowerCase()}`,
          type: 'Evidence',
          label: `${id}: ${trim(label, 70)}`,
          description: label,
          evidenceStatus: STATUS_TO_EVIDENCE[status],
          provenance: prov,
          attrs: {
            evidenceLogId: id, logStatus: status,
            url: /^https?:/.test(url) ? url : null, source: source || null,
          },
        }));
        attribute(`n:evidence:${id.toLowerCase()}`, source, prov);
      } else if (kind === 'missing') {
        const impact = pick(table, row, COLUMNS.impact);
        const remedy = pick(table, row, COLUMNS.remedy);
        evidenceRecords.push({
          id: `ev:${id}`, claim: `MISSING: ${label}`, status: 'missing',
          source: null, url: null, repo: REPO_ID, provenance: prov,
          notes: `Impact: ${impact}. How to get it: ${remedy}`,
        });
        const nodeId = `n:question:${id.toLowerCase()}`;
        questions.push({
          id: `q:${id.toLowerCase()}`,
          question: label,
          category: 'missing-data',
          repo: REPO_ID,
          relatedNodeIds: [nodeId],
          provenance: prov,
        });
        nodes.push(makeNode({
          id: nodeId,
          type: 'ResearchQuestion',
          label: `${id}: ${trim(label, 70)}`,
          description: `${label} — Impact: ${impact}. How to get it: ${remedy}`,
          evidenceStatus: 'documented',
          provenance: prov,
          attrs: { evidenceLogId: id, impact, howToGet: remedy },
        }));
      } else if (kind === 'risk') {
        const severity = pick(table, row, COLUMNS.severity);
        const mitigation = pick(table, row, COLUMNS.remedy);
        evidenceRecords.push({
          id: `ev:${id}`, claim: `RISK: ${label}`, status: 'risk',
          source: null, url: null, repo: REPO_ID, provenance: prov,
          notes: `Severity: ${severity}. Mitigation: ${mitigation}`,
        });
        nodes.push(makeNode({
          id: `n:risk:${id.toLowerCase()}`,
          type: 'Risk',
          label: `${id}: ${trim(label, 70)}`,
          description: `${label} — Severity: ${severity}. Mitigation: ${mitigation}`,
          evidenceStatus: 'documented',
          provenance: prov,
          attrs: { evidenceLogId: id, severity, mitigation },
        }));
      } else {
        // Datasets, source documents, and prior art are all catalogued
        // reference material; the schema files them under one status, so the
        // distinction is preserved in the claim prefix instead.
        evidenceRecords.push({
          id: `ev:${id}`, claim: `${kind.toUpperCase()}: ${label}`, status: 'dataset',
          source: source || null, url: /^https?:/.test(url) ? url : null,
          repo: REPO_ID, provenance: prov, notes: notes || '',
        });
      }
    }
  }

  // Some pillars write their gaps as a bullet list rather than a table. Those
  // are documented gaps too, so capture them — but only in sections that had
  // no ID-table, to avoid double-counting a repo that uses both.
  const tabledSections = new Set(
    parseTables(readRepoFile(LOG_PATH))
      .filter((t) => headerKey(t.headers[0] ?? '') === 'id' && t.rows.length)
      .map((t) => t.heading),
  );
  for (const gap of parseBulletGaps(readRepoFile(LOG_PATH), tabledSections)) {
    const nodeIdStr = `n:question:gap-${gap.index}`;
    const prov = [{
      sourceDoc: LOG_PATH,
      sourceLocation: `lines ${gap.lineNo}-${gap.lineNo}`,
      excerpt: gap.text,
    }];
    questions.push({
      id: `q:gap-${gap.index}`,
      question: gap.text,
      category: 'missing-data',
      repo: REPO_ID,
      relatedNodeIds: [nodeIdStr],
      provenance: prov,
    });
    nodes.push(makeNode({
      id: nodeIdStr,
      type: 'ResearchQuestion',
      label: trim(gap.text, 70),
      description: gap.text,
      evidenceStatus: 'documented',
      provenance: prov,
      attrs: { origin: 'evidence log gap list', section: gap.heading },
    }));
  }

  return { evidenceRecords, nodes, edges, questions, filesExamined: [LOG_PATH] };
}

/** Bullet items under a "Missing"/"Gaps" heading in sections without a table. */
function parseBulletGaps(text, tabledSections) {
  const lines = text.split('\n');
  const out = [];
  let heading = null;
  let index = 0;
  for (let i = 0; i < lines.length; i++) {
    const h = /^#{1,6}\s+(.+?)\s*$/.exec(lines[i].trim());
    if (h) { heading = h[1]; continue; }
    if (readStatus(heading) !== 'missing') continue;
    if (tabledSections.has(heading)) continue;
    const b = /^[-*]\s+(.{25,})$/.exec(lines[i].trim());
    if (!b) continue;
    // Strikethrough marks a resolved gap; it is no longer open.
    if (b[1].startsWith('~~')) continue;
    out.push({ text: b[1].replace(/\*\*/g, '').trim(), lineNo: i + 1, heading, index: ++index });
  }
  return out;
}
