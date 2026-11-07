import { describe, it, expect } from 'vitest';
import { parseCipCsv, phaseToFinancialStatus } from '../extraction/parsers/cip_csv.js';
import { parseEvidenceLog } from '../extraction/parsers/evidence_log.js';
import { parseSourceInventory } from '../extraction/parsers/source_inventory.js';
import { hasProjectsCsv, SCHEMA } from './pillar.js';

// vitest still evaluates the body of a skipped suite, so the parse has to be
// guarded as well as the suite: pillars without the CSV cannot even call it.
describe.skipIf(!hasProjectsCsv)('CIP CSV parser', () => {
  const result = hasProjectsCsv ? parseCipCsv() : { nodes: [], edges: [], flows: [], rowCount: 0 };
  const projects = result.nodes.filter((n) => n.type === 'Project');

  it('extracts all 125 projects', () => {
    expect(result.rowCount).toBe(125);
    expect(projects.length).toBe(125);
  });

  it('is deterministic across runs', () => {
    const again = parseCipCsv();
    expect(again.nodes.map((n) => n.id)).toEqual(result.nodes.map((n) => n.id));
    expect(again.edges.map((e) => e.id)).toEqual(result.edges.map((e) => e.id));
  });

  it('parses documented costs and never fabricates missing ones', () => {
    const southside = projects.find((n) => n.id === 'n:project:southside-community-center');
    expect(southside).toBeDefined();
    expect(southside.attrs.costUSD).toBe(30513000);
    for (const p of projects) {
      expect(p.attrs.costUSD === null || typeof p.attrs.costUSD === 'number').toBe(true);
    }
  });

  it('creates a FUNDS edge per project from the CIP fund', () => {
    const funds = result.edges.filter((e) => e.type === 'FUNDS' && e.source === 'n:fund:richmond-cip-budget');
    expect(funds.length).toBe(125);
    for (const e of funds) {
      expect(e.evidenceStatus).toBe('documented');
      expect(e.financial.currency).toBe('USD');
      expect(e.flowId).toMatch(/^f:cip-/);
    }
  });

  it('detects the documented ARPA mentions and models them with unknown amounts', () => {
    const arpa = result.edges.filter((e) => e.source === 'n:legislation:arpa');
    // Three CIP projects mention ARPA in their description/status text
    // (verified against the raw CSV): Southside Community Center, the
    // Williamsburg Avenue CSO improvement, and Lucks Field Community Center.
    expect(arpa.map((e) => e.target).sort()).toEqual([
      'n:project:combined-sewer-overflow-improvement-williamsburg-avenue',
      'n:project:lucks-field-community-center',
      'n:project:southside-community-center',
    ]);
    for (const e of arpa) {
      expect(e.evidenceStatus).toBe('documented');
      expect(e.financial.amountUSD).toBeNull();
    }
  });

  it('only the Southside Community Center ARPA flow has an inferred beneficiary stage', () => {
    const arpaFlows = result.flows.filter((f) => f.id.startsWith('f:arpa-'));
    expect(arpaFlows.length).toBe(3);
    for (const f of arpaFlows) {
      const last = f.stages[f.stages.length - 1];
      if (f.id === 'f:arpa-southside-community-center') {
        expect(last.to).toBe('n:region:southside-richmond');
      } else {
        expect(last.to).toMatch(/^n:project:/);
      }
    }
  });

  it('withholds manager emails and phone numbers (privacy)', () => {
    const serialized = JSON.stringify(result.nodes) + JSON.stringify(result.edges);
    expect(serialized).not.toMatch(/@rva\.gov|@richmondgov\.com/i);
    expect(serialized).not.toMatch(/\(804\)\s?\d{3}|804-\d{3}-\d{4}/);
  });

  it('maps phases to financial statuses conservatively', () => {
    expect(phaseToFinancialStatus('Completed')).toBe('completed');
    expect(phaseToFinancialStatus('Construction')).toBe('partially_disbursed');
    expect(phaseToFinancialStatus('Pre-Construction')).toBe('committed');
    expect(phaseToFinancialStatus('Planning/Design')).toBe('committed');
    expect(phaseToFinancialStatus('')).toBe('committed');
  });
});

describe('evidence log parser', () => {
  const result = parseEvidenceLog();

  it('extracts evidence records with mapped statuses', () => {
    // Taken from the schema rather than restated, so the two cannot drift.
    const allowed = SCHEMA.definitions.evidenceRecord.properties.status.enum;
    for (const rec of result.evidenceRecords) {
      expect(rec.id, rec.id).toMatch(/^ev:[A-Z]+-\d+$/);
      expect(allowed, rec.id).toContain(rec.status);
      if (rec.url !== null) expect(rec.url, rec.id).toMatch(/^https?:/);
    }
  });

  it('creates a ResearchQuestion node for every question it reports', () => {
    const questions = result.nodes.filter((n) => n.type === 'ResearchQuestion');
    expect(result.questions.length).toBe(questions.length);
    for (const q of questions) expect(q.id).toMatch(/^n:question:[a-z0-9-]+$/);
  });

  it('creates Risk nodes from R- entries', () => {
    for (const r of result.nodes.filter((n) => n.type === 'Risk')) {
      expect(r.attrs.evidenceLogId, r.label).toMatch(/^R-\d+$/);
    }
  });

  it('every record carries line-level provenance into admin/evidence_log.md', () => {
    for (const rec of [...result.evidenceRecords, ...result.nodes]) {
      expect(rec.provenance[0].sourceDoc).toBe('admin/evidence_log.md');
      expect(rec.provenance[0].sourceLocation).toMatch(/^lines \d+-\d+$/);
    }
  });
});

describe('source inventory parser', () => {
  const result = parseSourceInventory();
  // The parser also returns publishers derived from the owner column, so the
  // dataset assertions have to be scoped rather than run over every node.
  const datasets = result.nodes.filter((n) => n.type === 'Dataset');

  it('creates a Dataset node per named inventory row', () => {
    expect(datasets.length).toBe(result.rowCount);
  });

  it('returns nothing but datasets and their publishers', () => {
    const types = new Set(result.nodes.map((n) => n.type));
    expect([...types].sort()).toEqual(types.has('Organization') ? ['Dataset', 'Organization'] : ['Dataset']);
  });

  it('marks a dataset unavailable exactly when the inventory says so', () => {
    // Against the raw cell, not the parsed url: a row that says "Not publicly
    // available" keeps that text in urlRaw and stores null for url.
    for (const ds of datasets) {
      const unreachable = /not (publicly )?available|unknown/i.test(ds.attrs.urlRaw ?? '');
      expect(ds.attrs.available, ds.label).toBe(!unreachable);
    }
  });

  it('only exposes a url that is actually a url', () => {
    for (const ds of datasets) {
      if (ds.attrs.url !== null) expect(ds.attrs.url, ds.label).toMatch(/^https?:\/\//);
    }
  });
});
