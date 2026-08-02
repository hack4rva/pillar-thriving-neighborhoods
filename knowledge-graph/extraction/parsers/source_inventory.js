import { parse } from 'csv-parse/sync';
import { readRepoFile, makeNode, makeEdge, nodeId, slug } from '../lib.js';
import { config } from '../config.js';
import { readOrganizations } from './organizations.js';
import { headerKey } from './tables.js';

/**
 * Column synonyms. Every pillar keeps a source inventory, but no two use the
 * same header names, so columns are matched by meaning rather than position.
 */
const COLS = {
  id: ['id'],
  name: ['name', 'sourcename'],
  url: ['url', 'urlexpected'],
  owner: ['owner'],
  status: ['status', 'verified'],
  access: ['accessmode', 'accessmethod', 'format', 'publicaccess'],
  keyFields: ['keyfields'],
  notes: ['notes', 'reliabilitynotes', 'recommendeduse'],
  relevance: ['relevantto', 'pillarrelevance', 'problemarea', 'scope'],
};

/** Read a value from a CSV row object by column meaning. */
function field(row, keyMap, which) {
  for (const syn of COLS[which]) {
    const actual = keyMap.get(syn);
    if (actual !== undefined) {
      const v = (row[actual] ?? '').trim();
      if (v) return v;
    }
  }
  return '';
}

function statusToEvidence(status) {
  const s = (status || '').toLowerCase();
  if (s.startsWith('verified') || s === 'yes') return 'documented';
  if (s.includes('not ready') || s.includes('not available')) return 'documented';
  if (s.includes('unknown')) return 'unknown';
  return 'reported_but_unverified';
}

/** Parse the pillar's source inventory into Dataset nodes (+ publisher edges). */
export function parseSourceInventory() {
  const CSV_PATH = config.sources.sourceInventory;
  if (!CSV_PATH) return { nodes: [], edges: [], filesExamined: [], rowCount: 0 };

  const rows = parse(readRepoFile(CSV_PATH), { columns: true, skip_empty_lines: true, bom: true });
  const nodes = [];
  const edges = [];
  if (!rows.length) return { nodes, edges, filesExamined: [CSV_PATH], rowCount: 0 };

  // Normalized header -> actual header, so lookups survive naming differences.
  const keyMap = new Map(Object.keys(rows[0]).map((h) => [headerKey(h), h]));
  const ownerNodes = config.ownerNodes ?? {};
  const relevanceNodes = config.relevanceNodes ?? {};
  const derivedOrgs = new Set();

  rows.forEach((row, i) => {
    const name = field(row, keyMap, 'name');
    if (!name) return;

    const rowId = field(row, keyMap, 'id') || String(i + 1);
    const id = nodeId('dataset', name);
    const url = field(row, keyMap, 'url');
    const owner = field(row, keyMap, 'owner');
    const status = field(row, keyMap, 'status');
    const access = field(row, keyMap, 'access');
    const relevance = field(row, keyMap, 'relevance');
    const prov = [{ sourceDoc: CSV_PATH, sourceLocation: `row id=${rowId}`, excerpt: name }];

    nodes.push(makeNode({
      id,
      type: 'Dataset',
      label: name,
      description: field(row, keyMap, 'notes'),
      evidenceStatus: statusToEvidence(status),
      provenance: prov,
      attrs: {
        inventoryId: rowId,
        owner,
        url: /^https?:/.test(url) ? url : null,
        urlRaw: url,
        accessMode: access,
        verificationStatus: status,
        keyFields: field(row, keyMap, 'keyFields'),
        available: !/not (publicly )?available|unknown/i.test(url),
      },
    }));

    // Publishers named in the inventory become nodes when the pillar has no
    // curated organization set. The owner cell is read rather than taken
    // verbatim: it can name several publishers, or describe how the source was
    // found instead of naming anyone, in which case no publisher is asserted.
    const curated = ownerNodes[owner];
    const publishers = curated
      ? [{ id: curated, label: owner }]
      : (config.derive ? readOrganizations(owner) : []).map((orgName) => {
        const orgId = nodeId('org', orgName);
        if (!derivedOrgs.has(orgId)) {
          derivedOrgs.add(orgId);
          nodes.push(makeNode({
            id: orgId,
            type: 'Organization',
            label: orgName,
            description: `Publisher or owner of inventoried data sources for this pillar.`,
            evidenceStatus: 'documented',
            provenance: prov,
          }));
        }
        return { id: orgId, label: orgName };
      });

    for (const publisher of publishers) {
      edges.push(makeEdge({
        source: publisher.id,
        target: id,
        type: 'PUBLISHES',
        description: `${publisher.label} owns/publishes "${name}" (${access})`,
        evidenceStatus: statusToEvidence(status),
        confidence: /^verified/i.test(status) ? 'high' : 'medium',
        provenance: prov,
      }));
    }

    const relevanceNode = relevanceNodes[relevance];
    if (relevanceNode) {
      edges.push(makeEdge({
        source: id,
        target: relevanceNode,
        type: 'ASSOCIATED_WITH',
        description: `Inventoried as relevant to: ${relevance}`,
        evidenceStatus: 'documented',
        confidence: 'high',
        provenance: prov,
      }));
    }
  });

  return { nodes, edges, filesExamined: [CSV_PATH], rowCount: rows.length };
}

export const sourceInventoryDatasetId = (name) => `n:dataset:${slug(name)}`;
