import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

const graph = read('data/graph.json');
const evidence = read('data/evidence.json');
const questions = read('data/unanswered_questions.json');
const report = read('data/extraction_report.json');
const external = read('extraction/records/external.json');

const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));
const flowById = new Map(graph.financialFlows.map((f) => [f.id, f]));

describe('external research integration', () => {
  it('every external evidence record carries a URL and an access-date note', () => {
    const external_ev = evidence.filter((e) => e.id.startsWith('ev:W-'));
    expect(external_ev.length).toBe(external.evidence.length);
    for (const e of external_ev) {
      expect(e.url).toMatch(/^https?:\/\//);
      const notes = e.provenance.map((p) => p.note ?? '').join(' ');
      expect(notes).toMatch(/accessed 2026-08-01/);
    }
  });

  it('official-source findings become externally_verified; news/org figures stay reported', () => {
    // rva.gov press release confirms the sweeping pause.
    expect(nodeById.get('n:claim:sweeping-paused-2025').evidenceStatus).toBe('externally_verified');
    expect(nodeById.get('n:claim:sweeping-neighborhood-calendar').evidenceStatus).toBe('externally_verified');
    // Fall Line figures come from the project org and news, not a budget document.
    const w8 = evidence.find((e) => e.id === 'ev:W-8');
    expect(w8.status).toBe('likely');
    const w8node = nodeById.get('n:evidence:w-8');
    expect(w8node.evidenceStatus).toBe('reported_but_unverified');
  });

  it('upgraded claims gained HAS_EVIDENCE edges and left the lacking-evidence list', () => {
    const lacking = report.metrics.claimsLackingPrimaryEvidence;
    expect(lacking).not.toContain('n:claim:sweeping-paused-2025');
    expect(lacking).not.toContain('n:claim:sweeping-neighborhood-calendar');
    const he = graph.edges.filter((e) =>
      e.type === 'HAS_EVIDENCE' && e.target.startsWith('n:evidence:w-'));
    expect(he.length).toBeGreaterThanOrEqual(2);
  });

  it('verified ARPA allocations live on flows, never on edges (anti-double-counting)', () => {
    const southside = flowById.get('f:arpa-southside-community-center');
    expect(southside.amountUSD).toBe(16_000_000);
    expect(southside.stages[2].amountUSD).toBe(16_000_000);
    expect(southside.stages[2].evidenceStatus).toBe('externally_verified');
    const lucks = flowById.get('f:arpa-lucks-field-community-center');
    expect(lucks.amountUSD).toBe(20_000_000);
    // The corresponding ARPA edges keep null amounts.
    for (const e of graph.edges.filter((x) => x.source === 'n:legislation:arpa' && x.financial)) {
      expect(e.financial.amountUSD).toBeNull();
    }
    // And the headline project-level documented total is unchanged by upstream findings.
    expect(report.metrics.totalDocumentedFundingUSD).toBe(982_322_153);
  });

  it('the Williamsburg CSO ARPA portion remains unknown (no invented figures)', () => {
    const cso = flowById.get('f:arpa-combined-sewer-overflow-improvement-williamsburg-avenue');
    expect(cso.amountUSD).toBeNull();
  });

  it('new upstream flows are externally verified with rollup methodology', () => {
    const slfrf = flowById.get('f:arpa-slfrf-to-richmond');
    expect(slfrf.amountUSD).toBe(154_000_000);
    expect(slfrf.evidenceStatus).toBe('externally_verified');
    expect(slfrf.rollup.methodology).toBeTruthy();
    const cip = flowById.get('f:cip-sources-fy25-29');
    expect(cip.stages.map((s) => s.amountUSD)).toEqual([575_000_000, 257_827_914, 71_184_745]);
    expect(cip.amountUSD).toBe(904_012_659);
  });

  it('answered questions are annotated, never removed', () => {
    expect(questions.length).toBe(20);
    const arpa = questions.find((q) => q.id === 'q:arpa-portion');
    expect(arpa.status).toBe('answered');
    expect(arpa.answer).toMatch(/\$16,000,000/);
    const raise = questions.find((q) => q.id === 'q:raise-tiger-details');
    expect(raise.status).toBe('answered');
    const mix = questions.find((q) => q.id === 'q:cip-funding-mix');
    expect(mix.status).toBe('partially_answered');
    expect(report.metrics.externalResearch.questionsAnswered).toBe(2);
    expect(report.metrics.externalResearch.questionsPartiallyAnswered).toBe(7);
  });

  it('URL provenance is counted as external, not silently passed as verified', () => {
    expect(report.provenanceVerification.external).toBeGreaterThan(0);
    expect(report.provenanceVerification.missing).toBe(0);
  });

  it('external updates append provenance rather than replacing corpus provenance', () => {
    const claim = nodeById.get('n:claim:sweeping-paused-2025');
    const docs = claim.provenance.map((p) => p.sourceDoc);
    expect(docs.some((d) => /^https?:/.test(d))).toBe(true);
    expect(docs.some((d) => !/^https?:/.test(d))).toBe(true);
  });
});
