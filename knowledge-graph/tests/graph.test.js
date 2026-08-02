import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { computeMetrics } from '../extraction/metrics.js';

const read = (p) => JSON.parse(readFileSync(resolve(import.meta.dirname, '..', p), 'utf8'));
const schema = read('data/schema/graph.schema.json');
const graph = read('data/graph.json');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

describe('generated graph', () => {
  it('conforms to the JSON schema', () => {
    const validate = ajv.compile(schema);
    const ok = validate(graph);
    if (!ok) console.error(validate.errors?.slice(0, 5));
    expect(ok).toBe(true);
  });

  it('has no broken references', () => {
    const ids = new Set(graph.nodes.map((n) => n.id));
    for (const e of graph.edges) {
      expect(ids.has(e.source), `missing ${e.source}`).toBe(true);
      expect(ids.has(e.target), `missing ${e.target}`).toBe(true);
    }
    for (const f of graph.financialFlows) {
      for (const s of f.stages) {
        expect(ids.has(s.from), `flow ${f.id} missing ${s.from}`).toBe(true);
        expect(ids.has(s.to), `flow ${f.id} missing ${s.to}`).toBe(true);
      }
    }
  });

  it('has unique, well-formed ids', () => {
    expect(new Set(graph.nodes.map((n) => n.id)).size).toBe(graph.nodes.length);
    expect(new Set(graph.edges.map((e) => e.id)).size).toBe(graph.edges.length);
    for (const n of graph.nodes) expect(n.id).toMatch(/^n:[a-z0-9_]+:[a-z0-9-]+$/);
    for (const e of graph.edges) expect(e.id).toMatch(/^e:[a-f0-9]{12}$/);
  });

  it('classifies every node and edge with a valid evidence status', () => {
    const valid = new Set(['documented', 'externally_verified', 'proposed',
      'reported_but_unverified', 'inferred', 'hypothetical', 'disputed', 'unknown']);
    for (const r of [...graph.nodes, ...graph.edges]) expect(valid.has(r.evidenceStatus)).toBe(true);
  });

  it('every record has provenance with source doc and location', () => {
    for (const r of [...graph.nodes, ...graph.edges, ...graph.financialFlows]) {
      expect(r.provenance.length).toBeGreaterThan(0);
      for (const p of r.provenance) {
        expect(p.sourceDoc.length).toBeGreaterThan(0);
        expect(p.sourceLocation.length).toBeGreaterThan(0);
      }
    }
  });

  it('models known ground truths from the corpus', () => {
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));
    // 125 CIP projects at ~$982M documented.
    const projects = graph.nodes.filter((n) => n.type === 'Project');
    expect(projects.length).toBe(125);
    // Unknown funding source is explicit, not omitted.
    expect(byId.get('n:unknown:cip-funding-sources')?.type).toBe('UnknownEntity');
    // The D3 Harvard anomaly is present and disputed.
    const d3Flow = graph.financialFlows.find((f) => f.id === 'f:d3-harvard-grant');
    expect(d3Flow?.evidenceStatus).toBe('disputed');
    // CVTA deliberately has no FUNDS edge (only coordination).
    const cvtaFunds = graph.edges.filter((e) => e.source === 'n:agency:cvta' && e.type === 'FUNDS');
    expect(cvtaFunds.length).toBe(0);
    // GPS constraint claim is documented with evidence link.
    const gpsEvidence = graph.edges.find((e) =>
      e.source === 'n:claim:gps-incomplete' && e.type === 'HAS_EVIDENCE');
    expect(gpsEvidence).toBeDefined();
  });

  it('proposed money never counts as documented in metrics', () => {
    const metrics = computeMetrics(graph.nodes, graph.edges, graph.financialFlows, [], [], [], {});
    expect(metrics.totalDocumentedFundingUSD).toBeGreaterThan(900_000_000);
    expect(metrics.totalProposedFundingUSD).toBe(0);
    expect(metrics.totalDisbursedUSDEstimate).toBeLessThan(metrics.totalDocumentedFundingUSD);
    expect(metrics.provenanceCoverage).toBe(100);
    expect(metrics.brokenReferences).toBe(0);
  });
});
