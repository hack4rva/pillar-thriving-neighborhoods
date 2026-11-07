/**
 * What this pillar actually has, so the suite can tell a real failure from a
 * test that does not apply here.
 *
 * The explorer is one codebase ported across seven pillars with very different
 * corpora: only Built Environment has a capital-projects CSV and the external
 * research pass built on it. Assertions about 125 CIP projects or the ARPA
 * flows are ground truths for that pillar and meaningless in the others, so
 * they are skipped rather than deleted — the port stays a copy, and Built
 * Environment keeps its coverage.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { config } from '../extraction/config.js';
import { verifyProvenance } from '../extraction/lib.js';

const ROOT = resolve(import.meta.dirname, '..');
const readJson = (p) => (existsSync(resolve(ROOT, p))
  ? JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'))
  : null);

const graph = readJson('data/graph.json');
const external = readJson('extraction/records/external.json');

/** The graph schema, so tests can assert against it instead of restating it. */
export const SCHEMA = readJson('data/schema/graph.schema.json');

export const hasProjectsCsv = Boolean(config.sources?.projectsCsv);
export const hasExternalResearch = Boolean(external?.evidence?.length);
export const hasFinancialFlows = Boolean(graph?.financialFlows?.length);

/**
 * A provenance record from this pillar's own graph that points at a markdown
 * file and a single line — the shape verifyProvenance can check exactly.
 */
export function realProvenance() {
  for (const node of graph?.nodes ?? []) {
    for (const p of node.provenance ?? []) {
      if (!p.sourceDoc?.endsWith('.md')) continue;
      if (!/^lines \d+-\d+$/.test(p.sourceLocation ?? '')) continue;
      if (!p.excerpt || p.excerpt.length < 25) continue;
      if (!existsSync(resolve(ROOT, '..', p.sourceDoc))) continue;
      const candidate = {
        sourceDoc: p.sourceDoc, sourceLocation: p.sourceLocation, excerpt: p.excerpt,
      };
      // Has to be one that verifies: some excerpts are summaries of the line
      // rather than the line, and those cannot exercise the exact/moved paths.
      if (verifyProvenance(candidate).level === 'exact') return candidate;
    }
  }
  throw new Error('no verifiable markdown provenance in this pillar to test against');
}
