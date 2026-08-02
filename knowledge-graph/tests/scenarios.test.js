import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Dataset } from '../src/data';
import { AppState } from '../src/state';
import { computeMetrics } from '../extraction/metrics.js';

const read = (p) => JSON.parse(readFileSync(resolve(import.meta.dirname, '..', p), 'utf8'));
const schema = read('data/schema/graph.schema.json');
const fixture = read('tests/fixtures/scenarios.json');
const data = Dataset.fromGraph(fixture);

describe('fixture scenarios', () => {
  it('fixture graph conforms to the schema', () => {
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const ok = validate(fixture);
    if (!ok) console.error(validate.errors?.slice(0, 5));
    expect(ok).toBe(true);
  });

  it('1: complete path funder → program → beneficiary is traceable', () => {
    const { nodes } = data.downstreamFinancial('n:fund:alpha-fund');
    expect(nodes.has('n:program:services-program')).toBe(true);
    const path = data.shortestPath('n:fund:alpha-fund', 'n:population:target-group');
    expect(path).toEqual(['n:fund:alpha-fund', 'n:program:services-program', 'n:population:target-group']);
  });

  it('2: proposed funding stays out of documented totals', () => {
    const m = computeMetrics(fixture.nodes, fixture.edges, fixture.financialFlows, [], [], [], {});
    expect(m.totalProposedFundingUSD).toBe(50000);
    // documented: 100k + 200k + 180k + 150k + 80k + 10k + 60k (not 50k proposed, not 25k/15k disputed, not 40k unknown)
    expect(m.totalDocumentedFundingUSD).toBe(780000);
  });

  it('3: disputed flow is flagged and excluded from documented totals', () => {
    const flow = data.flowById.get('f:disputed');
    expect(flow.evidenceStatus).toBe('disputed');
    const edge = data.edgeById.get('e:aaaaaaaaaaa4');
    expect(edge.evidenceStatus).toBe('disputed');
  });

  it('4: unknown destinations are explicit UnknownEntity endpoints', () => {
    const flow = data.flowById.get('f:unknown-dest');
    const dest = data.nodeById.get(flow.stages[0].to);
    expect(dest.type).toBe('UnknownEntity');
    const m = computeMetrics(fixture.nodes, fixture.edges, fixture.financialFlows, [], [], [], {});
    expect(m.flowsWithUnknownDestination).toBeGreaterThanOrEqual(1);
    expect(m.fundingWithUnknownDestinationUSD).toBeGreaterThanOrEqual(40000);
  });

  it('5: multi-intermediary flows keep per-stage amounts and rollup', () => {
    const flow = data.flowById.get('f:multi');
    expect(flow.stages.length).toBe(3);
    expect(flow.stages.map((s) => s.amountUSD)).toEqual([200000, 180000, 150000]);
    expect(flow.rollup.pctReachingFinal).toBe(75);
    const { nodes } = data.downstreamFinancial('n:fund:alpha-fund');
    expect(nodes.has('n:org:mid-org')).toBe(true);
  });

  it('6: partial disbursement is distinguishable from full', () => {
    const flow = data.flowById.get('f:partial');
    expect(flow.status).toBe('partially_disbursed');
    expect(flow.rollup.disbursedUSD).toBeLessThan(flow.rollup.committedUSD);
    expect(flow.rollup.isEstimate).toBe(true);
  });

  it('7: conflicting amounts from different sources both survive with distinct provenance', () => {
    const conflicting = fixture.edges.filter((e) => e.flowId === 'f:conflict');
    expect(conflicting.length).toBe(2);
    const docs = conflicting.map((e) => e.provenance[0].sourceDoc);
    expect(new Set(docs).size).toBe(2);
    const flow = data.flowById.get('f:conflict');
    expect(flow.amountUSD).toBeNull(); // never silently picks a side
    expect(flow.unknowns.length).toBeGreaterThan(0);
  });

  it('8: two funders reaching the same beneficiary are both attached', () => {
    const funders = (data.inEdges.get('n:program:services-program') ?? []).filter((e) => e.financial);
    expect(funders.map((e) => e.source).sort()).toEqual(
      ['n:fund:alpha-fund', 'n:fund:beta-fund', 'n:org:mid-org'].sort());
  });

  it('9: one program funded through multiple mechanisms', () => {
    const mechanisms = (data.inEdges.get('n:program:services-program') ?? [])
      .filter((e) => e.financial).map((e) => e.financial.mechanism);
    expect(new Set(mechanisms).size).toBeGreaterThanOrEqual(2);
  });
});

describe('search and filter logic', () => {
  const state = new AppState(data);

  it('filters nodes by type', () => {
    state.filters.nodeTypes.delete('Proposal');
    const visible = state.visibleNodeIds();
    expect(visible.has('n:proposal:future-program')).toBe(false);
    expect(visible.has('n:fund:alpha-fund')).toBe(true);
    state.filters.nodeTypes.add('Proposal');
  });

  it('filters edges by evidence status', () => {
    state.filters.evidenceStatuses.delete('disputed');
    const visible = state.visibleNodeIds();
    const edges = state.visibleEdges(visible);
    expect(edges.some((e) => e.evidenceStatus === 'disputed')).toBe(false);
    state.filters.evidenceStatuses.add('disputed');
  });

  it('filters financial edges by amount range', () => {
    state.filters.amountMin = 100000;
    const edges = state.visibleEdges(state.visibleNodeIds());
    const financial = edges.filter((e) => e.financial);
    expect(financial.every((e) => e.financial.amountUSD >= 100000)).toBe(true);
    state.filters.amountMin = null;
  });

  it('focus mode restricts to a neighborhood', () => {
    state.focusNodeId = 'n:population:target-group';
    state.focusHops = 1;
    const visible = state.visibleNodeIds();
    expect(visible.has('n:population:target-group')).toBe(true);
    expect(visible.has('n:program:services-program')).toBe(true);
    expect(visible.has('n:fund:beta-fund')).toBe(false);
    state.focusNodeId = null;
  });
});
