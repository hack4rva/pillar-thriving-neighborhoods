#!/usr/bin/env node
/**
 * Validates generated data/ files against data/schema/graph.schema.json and
 * runs referential-integrity checks that a JSON Schema cannot express.
 * Exits non-zero on any violation.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ROOT = resolve(import.meta.dirname, '..');
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

const schema = read('data/schema/graph.schema.json');
const graph = read('data/graph.json');
const flows = read('data/financial_flows.json');
const evidence = read('data/evidence.json');
const questions = read('data/unanswered_questions.json');
const reviewQueue = read('data/review_queue.json');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const errors = [];

// 1. Whole-graph schema validation.
const validateGraph = ajv.compile(schema);
if (!validateGraph(graph)) {
  for (const err of validateGraph.errors.slice(0, 30)) {
    errors.push(`schema: ${err.instancePath} ${err.message}`);
  }
}

// 2. Sub-schemas for auxiliary files.
const subCheck = (defName, items, label) => {
  const validate = ajv.compile({ ...schema.definitions[defName], definitions: schema.definitions });
  items.forEach((item, i) => {
    if (!validate(item)) {
      errors.push(`${label}[${i}] (${item.id ?? '?'}): ${ajv.errorsText(validate.errors)}`);
    }
  });
};
subCheck('financialFlow', flows, 'financial_flows');
subCheck('evidenceRecord', evidence, 'evidence');
subCheck('unansweredQuestion', questions, 'unanswered_questions');
subCheck('reviewItem', reviewQueue, 'review_queue');

// 3. Referential integrity.
const nodeIds = new Set(graph.nodes.map((n) => n.id));
const dupNodeIds = graph.nodes.length - nodeIds.size;
if (dupNodeIds > 0) errors.push(`duplicate node ids: ${dupNodeIds}`);

const edgeIds = new Set();
for (const e of graph.edges) {
  if (edgeIds.has(e.id)) errors.push(`duplicate edge id: ${e.id}`);
  edgeIds.add(e.id);
  if (!nodeIds.has(e.source)) errors.push(`edge ${e.id}: missing source ${e.source}`);
  if (!nodeIds.has(e.target)) errors.push(`edge ${e.id}: missing target ${e.target}`);
  if (e.source === e.target) errors.push(`edge ${e.id}: self-loop ${e.source}`);
}

const flowIds = new Set();
for (const f of graph.financialFlows) {
  if (flowIds.has(f.id)) errors.push(`duplicate flow id: ${f.id}`);
  flowIds.add(f.id);
  for (const s of f.stages) {
    if (!nodeIds.has(s.from)) errors.push(`flow ${f.id}: missing stage.from ${s.from}`);
    if (!nodeIds.has(s.to)) errors.push(`flow ${f.id}: missing stage.to ${s.to}`);
  }
}
for (const e of graph.edges) {
  if (e.flowId && !flowIds.has(e.flowId)) errors.push(`edge ${e.id}: unknown flowId ${e.flowId}`);
}

// 4. Financial sanity: proposed/inferred money must never be marked disbursed.
for (const e of graph.edges) {
  if (!e.financial) continue;
  const spentStatuses = ['disbursed', 'partially_disbursed', 'completed'];
  if (
    ['proposed', 'inferred', 'hypothetical'].includes(e.evidenceStatus) &&
    spentStatuses.includes(e.financial.status)
  ) {
    errors.push(`edge ${e.id}: ${e.evidenceStatus} funding marked as ${e.financial.status}`);
  }
}

// 5. Provenance completeness.
for (const rec of [...graph.nodes, ...graph.edges, ...graph.financialFlows]) {
  if (!rec.provenance?.length) errors.push(`${rec.id}: no provenance`);
}

if (errors.length) {
  console.error(`VALIDATION FAILED (${errors.length} errors):`);
  for (const err of errors.slice(0, 50)) console.error('  ' + err);
  process.exit(1);
}
console.log(
  `validation OK: ${graph.nodes.length} nodes, ${graph.edges.length} edges, ` +
  `${graph.financialFlows.length} flows, ${evidence.length} evidence records, ` +
  `${questions.length} questions, ${reviewQueue.length} review items`
);
