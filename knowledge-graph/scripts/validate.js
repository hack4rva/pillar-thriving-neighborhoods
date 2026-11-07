#!/usr/bin/env node
/**
 * Validates generated data/ files against data/schema/graph.schema.json and
 * runs referential-integrity checks that a JSON Schema cannot express.
 * Exits non-zero on any violation.
 *
 *   node scripts/validate.js                 this pillar's data/
 *   node scripts/validate.js --data <dir>    any directory of generated files
 *
 * The --data form exists so derived graphs built outside a pillar repo (the
 * merged Richmond graph in rvahacks, for one) are held to these same rules
 * rather than to a second, drifting copy of them.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ROOT = resolve(import.meta.dirname, '..');
const argIdx = process.argv.indexOf('--data');
const DATA = argIdx > -1 ? resolve(process.argv[argIdx + 1]) : resolve(ROOT, 'data');
const read = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));
const readData = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));

const schema = read('data/schema/graph.schema.json');
const graph = readData('graph.json');
// Flows are also embedded in the graph; the standalone file is a build
// convenience that derived data sets do not necessarily produce.
const flows = existsSync(resolve(DATA, 'financial_flows.json'))
  ? readData('financial_flows.json')
  : graph.financialFlows;
const evidence = readData('evidence.json');
const questions = readData('unanswered_questions.json');
const reviewQueue = readData('review_queue.json');

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
