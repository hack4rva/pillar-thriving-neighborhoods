#!/usr/bin/env node
/**
 * Resolves the entities and relationships the research corpus talks about.
 *
 * The corpus is prose, so this is the one step that cannot be done with a
 * parser. It is fenced in three ways so that it enriches the graph without
 * being able to invent anything:
 *
 *  1. The model only ever sees cited claim sentences produced by
 *     parsers/research_corpus.js. Uncited prose is never submitted.
 *  2. Every entity and relationship must name the claim ids it came from.
 *     Anything unanchored, or anchored to a claim outside its own batch, is
 *     discarded here and counted in the run report.
 *  3. Output is written to extraction/records/corpus_entities.json and consumed
 *     by extract.js on later runs. Extraction itself stays deterministic and
 *     offline, and this file can be diffed and reviewed like any other record.
 *
 * The model decides what a cited sentence is *about*. It never decides whether
 * the sentence is true — evidence status is inherited from the source tier that
 * the deterministic pass already assigned.
 *
 * Usage: node extraction/enrich/extract_entities.mjs [--limit N] [--dry-run]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseResearchCorpus } from '../parsers/research_corpus.js';

const MODEL = process.env.KG_MODEL ?? 'gpt-5.4-mini';
const CONCURRENCY = 6;
const MAX_CLAIMS_PER_BATCH = 20;
const OUT = resolve(import.meta.dirname, '..', 'records', 'corpus_entities.json');

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const LIMIT = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity;

/** Subset of the schema's node enum that a civic research claim can produce. */
const ENTITY_TYPES = [
  'Problem', 'Need', 'Population', 'ConstituentGroup', 'Community',
  'Organization', 'GovernmentAgency', 'LegislativeBody', 'Nonprofit', 'Foundation',
  'University', 'Employer', 'Vendor', 'TrainingProvider',
  'Program', 'Project', 'Policy', 'Legislation', 'Proposal',
  'Fund', 'Grant', 'Contract', 'Budget', 'TaxIncentive',
  'Service', 'Dataset', 'GeographicRegion', 'Outcome', 'Risk',
];

const RELATION_TYPES = [
  'AFFECTS', 'EXPERIENCES_NEED', 'SERVES', 'GOVERNS', 'REGULATES', 'FUNDS',
  'GRANTS_TO', 'CONTRACTS_WITH', 'ADMINISTERS', 'RESTRICTS', 'DELIVERS_SERVICE_TO',
  'PROPOSES', 'SUPPORTS', 'OPPOSES', 'DEPENDS_ON', 'IMPLEMENTS', 'EVALUATES',
  'MEASURES', 'PRODUCES', 'BENEFITS', 'FAILS_TO_REACH', 'ADDRESSES',
  'ASSOCIATED_WITH', 'LOCATED_IN', 'MANAGES', 'PUBLISHES',
];

const SYSTEM = `You extract a knowledge graph from cited sentences in civic research about Richmond, Virginia.

You will receive numbered CLAIMS. Each is one sentence from a research report that carries a citation to a primary source.

Extract:
- ENTITIES: the durable, nameable things the claims are about — agencies, programs, funds, policies, datasets, services, populations, places, organizations.
- RELATIONS: connections between those entities that a claim explicitly states.

Hard rules:
- Only extract an entity if a claim names it. Never infer an entity that "must" exist.
- Only extract a relation if a claim states it. Never connect two entities because it seems plausible.
- Every entity and relation MUST list the claim ids it came from, using the exact ids given.
- Entity names must be the proper name as written, normalized to its fullest form in the batch (prefer "Affordable Housing Trust Fund" over "the fund"). Put short forms and acronyms in aliases.
- Do NOT create an entity for a whole sentence, a finding, a recommendation, or a statistic. Those are claims, not entities. If you cannot give it a proper name, skip it.
- Do NOT extract generic concepts ("data", "residents", "the city", "decision-making", "transparency", "patient care", "efficiency") unless they name a specific body, e.g. "City of Richmond".
- An entity must be something you could look up. If the name is an abstract noun phrase rather than a named thing, skip it.
- Relations reference entities by their exact name string from your own entities list.
- Get direction right: FUNDS, PUBLISHES, GOVERNS and ADMINISTERS run from the actor to the thing acted on. If you are unsure of the direction, use ASSOCIATED_WITH.
- Some claims are background from other cities or other fields. Extract those entities only if the claim names them as real organizations, programs or datasets; skip abstractions entirely.

Prefer fewer, higher-confidence extractions over exhaustive coverage. Extracting nothing from a claim is a valid answer.`;

// Strict structured output: every property must be required and objects must be
// closed, so optional fields are modelled as nullable instead.
const SCHEMA = {
  name: 'record_graph',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['entities', 'relations'],
    properties: {
      entities: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['name', 'type', 'aliases', 'description', 'claimIds'],
          properties: {
            name: { type: 'string', description: 'Proper name, as written in the claim.' },
            type: { type: 'string', enum: ENTITY_TYPES },
            aliases: { type: 'array', items: { type: 'string' } },
            description: { type: 'string', description: 'One clause on what it is, drawn from the claims.' },
            claimIds: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      relations: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['source', 'target', 'type', 'description', 'claimIds'],
          properties: {
            source: { type: 'string' },
            target: { type: 'string' },
            type: { type: 'string', enum: RELATION_TYPES },
            description: { type: 'string', description: 'What the claim says about this connection.' },
            claimIds: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
  },
};

async function callModel(batch, attempt = 0) {
  const prompt = batch.map((c) => `${c.id}: ${c.claim}`).join('\n\n');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: 16000,
      response_format: { type: 'json_schema', json_schema: SCHEMA },
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: `CLAIMS:\n\n${prompt}` },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    // 429/5xx are transient; anything else is a bug in the request.
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
      return callModel(batch, attempt + 1);
    }
    throw new Error(`${res.status} ${body.slice(0, 300)}`);
  }

  const json = await res.json();
  const text = json.choices?.[0]?.message?.content;
  let result = { entities: [], relations: [] };
  if (text) {
    try { result = JSON.parse(text); } catch { throw new Error('model returned unparseable JSON'); }
  }
  return { result, usage: json.usage ?? {} };
}

/** Reports keep related claims together, which gives the model usable context. */
function buildBatches(claims) {
  const byReport = new Map();
  for (const c of claims) {
    if (!byReport.has(c._report)) byReport.set(c._report, []);
    byReport.get(c._report).push(c);
  }
  const batches = [];
  for (const [report, list] of byReport) {
    for (let i = 0; i < list.length; i += MAX_CLAIMS_PER_BATCH) {
      batches.push({ report, claims: list.slice(i, i + MAX_CLAIMS_PER_BATCH) });
    }
  }
  return batches;
}

async function pool(items, size, worker) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await worker(items[i], i);
    }
  }));
  return out;
}

const rc = parseResearchCorpus();
const claims = rc.claims.slice(0, LIMIT === Infinity ? undefined : LIMIT);
const byId = new Map(claims.map((c) => [c.id, c]));
const batches = buildBatches(claims);

console.log(`${claims.length} claims across ${new Set(claims.map((c) => c._report)).size} reports -> ${batches.length} batches`);
if (DRY) {
  console.log('\n--- first batch ---');
  console.log(batches[0].claims.map((c) => `${c.id}: ${c.claim.slice(0, 110)}`).join('\n'));
  process.exit(0);
}

const rejected = { unanchored: 0, foreignClaim: 0, unknownEntity: 0, selfLoop: 0, sentenceName: 0, generic: 0 };
const entities = new Map(); // normalized name -> record
const relations = new Map(); // dedup key -> record
let inTok = 0, outTok = 0, failures = 0;

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
/** An entity name that reads like a sentence is a claim the model mislabelled. */
const looksLikeSentence = (s) => s.split(/\s+/).length > 8 || /[.;]\s/.test(s);

/**
 * Abstractions the model reaches for when a claim has no nameable subject.
 * They attract edges from everywhere and connect nothing meaningfully, which
 * is worse for the graph than the claim going unextracted.
 */
const GENERIC_ENTITY = new RegExp(`^(${[
  'data', 'the data', 'information', 'residents', 'the city', 'city', 'government', 'public',
  'transparency', 'accountability', 'efficiency', 'equity', 'access', 'accessibility',
  'decision making', 'decision makers', 'stakeholders', 'community', 'the community',
  'staff', 'users', 'citizens', 'the public', 'technology', 'software', 'systems',
  'process', 'processes', 'policy', 'policies', 'funding', 'budget', 'cost', 'costs',
  'patient care', 'care delivery', 'health', 'quality', 'outcomes', 'services',
  'compliance', 'monitoring', 'reporting', 'documentation', 'research', 'analysis',
].join('|')})$`, 'i');

let done = 0;
await pool(batches, CONCURRENCY, async (batch) => {
  let out;
  try {
    out = await callModel(batch.claims);
  } catch (err) {
    failures++;
    console.error(`  FAIL ${batch.report}: ${err.message}`);
    return;
  }
  inTok += out.usage.prompt_tokens ?? 0;
  outTok += out.usage.completion_tokens ?? 0;

  const allowed = new Set(batch.claims.map((c) => c.id));
  const localNames = new Map();

  for (const e of out.result.entities ?? []) {
    const ids = (e.claimIds ?? []).filter((id) => allowed.has(id));
    if (!ids.length) { rejected[e.claimIds?.length ? 'foreignClaim' : 'unanchored']++; continue; }
    if (looksLikeSentence(e.name)) { rejected.sentenceName++; continue; }
    if (GENERIC_ENTITY.test(norm(e.name))) { rejected.generic++; continue; }

    const key = norm(e.name);
    localNames.set(key, e.name);
    if (!entities.has(key)) {
      entities.set(key, { name: e.name, type: e.type, aliases: new Set(), descriptions: [], claimIds: new Set() });
    }
    const rec = entities.get(key);
    for (const a of e.aliases ?? []) if (norm(a) !== key) rec.aliases.add(a);
    if (e.description) rec.descriptions.push(e.description);
    for (const id of ids) rec.claimIds.add(id);
  }

  for (const r of out.result.relations ?? []) {
    const ids = (r.claimIds ?? []).filter((id) => allowed.has(id));
    if (!ids.length) { rejected[r.claimIds?.length ? 'foreignClaim' : 'unanchored']++; continue; }
    const s = norm(r.source), t = norm(r.target);
    // Both endpoints must be entities this batch actually produced.
    if (!entities.has(s) || !entities.has(t)) { rejected.unknownEntity++; continue; }
    if (s === t) { rejected.selfLoop++; continue; }

    const key = `${s}|${r.type}|${t}`;
    if (!relations.has(key)) {
      relations.set(key, { source: s, target: t, type: r.type, descriptions: [], claimIds: new Set() });
    }
    const rec = relations.get(key);
    if (r.description) rec.descriptions.push(r.description);
    for (const id of ids) rec.claimIds.add(id);
  }

  done++;
  if (done % 10 === 0) console.log(`  ${done}/${batches.length} batches`);
});

// Serialize. Claim ids are the anchor extract.js re-checks, so they are the
// payload here; provenance itself is rebuilt from the claim index at build time.
const record = {
  generatedAt: new Date().toISOString(),
  model: MODEL,
  claimsSubmitted: claims.length,
  batches: batches.length,
  batchFailures: failures,
  rejected,
  usage: { inputTokens: inTok, outputTokens: outTok },
  entities: [...entities.values()]
    .map((e) => ({
      name: e.name,
      type: e.type,
      aliases: [...e.aliases].sort(),
      description: e.descriptions.sort((a, b) => b.length - a.length)[0] ?? '',
      claimIds: [...e.claimIds].sort(),
    }))
    .sort((a, b) => b.claimIds.length - a.claimIds.length || a.name.localeCompare(b.name)),
  relations: [...relations.values()]
    .map((r) => ({
      source: r.source,
      target: r.target,
      type: r.type,
      description: r.descriptions.sort((a, b) => b.length - a.length)[0] ?? '',
      claimIds: [...r.claimIds].sort(),
    }))
    .sort((a, b) => b.claimIds.length - a.claimIds.length),
};

mkdirSync(resolve(import.meta.dirname, '..', 'records'), { recursive: true });
writeFileSync(OUT, JSON.stringify(record, null, 1) + '\n');

console.log(`\nentities ${record.entities.length}  relations ${record.relations.length}`);
console.log(`rejected  ${JSON.stringify(rejected)}`);
console.log(`tokens    in=${inTok} out=${outTok}  (~$${(inTok / 1e6 * 3 + outTok / 1e6 * 15).toFixed(2)})`);
console.log(`wrote     ${OUT}`);
