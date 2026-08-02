import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { REPO_ROOT, REPO_ID } from './config.js';

export { REPO_ROOT, REPO_ID };

export function slug(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function nodeId(kind, name) {
  return `n:${kind}:${slug(name)}`;
}

/** Deterministic edge ID: hash of the identifying tuple. */
export function edgeId(source, target, type, sourceDoc) {
  const h = createHash('sha256')
    .update(`${source}|${target}|${type}|${sourceDoc}`)
    .digest('hex');
  return `e:${h.slice(0, 12)}`;
}

/**
 * Parse a currency string like "$2,057,000" or " $550,000 " into a number.
 * Returns null for missing/unparseable values (never guesses).
 */
export function parseMoney(text) {
  if (text == null) return null;
  const t = String(text).trim();
  if (t === '' || /^(n\/a|na|tbd|unknown|-)$/i.test(t)) return null;
  const m = t.replace(/[$,\s]/g, '');
  if (!/^\d+(\.\d+)?$/.test(m)) return null;
  return Number(m);
}

const SEASONS = { winter: 0, spring: 1, summer: 2, fall: 3, autumn: 3 };
const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/**
 * Parse loose completion dates like "Fall 2031", "December 2026", "2031",
 * "Late 2028" into { raw, year, sortKey } or null. sortKey ~ year + fraction.
 */
export function parseLooseDate(text) {
  if (text == null) return null;
  const raw = String(text).trim();
  if (raw === '' || /^(n\/a|na|tbd|unknown|-)$/i.test(raw)) return null;
  const yearMatch = raw.match(/(19|20)\d{2}/);
  if (!yearMatch) return null;
  const year = Number(yearMatch[0]);
  const lower = raw.toLowerCase();
  let fraction = 0.5;
  for (const [name, q] of Object.entries(SEASONS)) {
    if (lower.includes(name)) { fraction = (q + 0.5) / 4; break; }
  }
  for (const [name, m] of Object.entries(MONTHS)) {
    if (lower.includes(name)) { fraction = (m + 0.5) / 12; break; }
  }
  if (lower.includes('late')) fraction = 0.9;
  if (lower.includes('early')) fraction = 0.1;
  return { raw, year, sortKey: year + fraction };
}

const fileCache = new Map();

export function readRepoFile(relPath) {
  const abs = resolve(REPO_ROOT, relPath);
  if (!fileCache.has(abs)) {
    fileCache.set(abs, readFileSync(abs, 'utf8'));
  }
  return fileCache.get(abs);
}

export function repoFileExists(relPath) {
  return existsSync(resolve(REPO_ROOT, relPath));
}

function normalizeWs(s) {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * Verify a provenance entry against the actual source file.
 * Returns { ok, level, message }:
 *  - ok=true,  level="exact"   excerpt found within the stated line range
 *  - ok=true,  level="moved"   excerpt found in the file but outside the range
 *  - ok=false, level="missing" excerpt not found (or file missing)
 * Only applies to repo files with "lines A-B" locations and an excerpt;
 * URLs are marked "external"; excerpt-less entries are marked "unchecked".
 */
export function verifyProvenance(prov) {
  const { sourceDoc, sourceLocation, excerpt } = prov;
  if (/^https?:/.test(sourceDoc)) return { ok: true, level: 'external', message: 'external URL (not file-verifiable)' };
  if (!excerpt) return { ok: true, level: 'unchecked', message: 'no excerpt to verify' };
  if (!repoFileExists(sourceDoc)) {
    return { ok: false, level: 'missing', message: `source file not found: ${sourceDoc}` };
  }
  const content = readRepoFile(sourceDoc);
  const needle = normalizeWs(excerpt);
  const lineMatch = /lines?\s+(\d+)(?:\s*[-–]\s*(\d+))?/i.exec(sourceLocation || '');
  if (lineMatch) {
    const start = Number(lineMatch[1]);
    const end = Number(lineMatch[2] ?? lineMatch[1]);
    const lines = content.split('\n');
    const range = normalizeWs(lines.slice(start - 1, end).join('\n'));
    if (range.includes(needle)) return { ok: true, level: 'exact', message: 'verified' };
    if (normalizeWs(content).includes(needle)) {
      return {
        ok: true, level: 'moved',
        message: `excerpt found in ${sourceDoc} but not at "${sourceLocation}" (found near ${locateExcerpt(content, excerpt)})`,
      };
    }
    return { ok: false, level: 'missing', message: `excerpt not found in ${sourceDoc}` };
  }
  // Section/heading/row locations: verify against the whole document.
  if (normalizeWs(content).includes(needle)) {
    return { ok: true, level: 'exact', message: 'verified (whole-document match)' };
  }
  return { ok: false, level: 'missing', message: `excerpt not found in ${sourceDoc}` };
}

/** Best-effort line locator used in "moved" diagnostics. */
function locateExcerpt(content, excerpt) {
  const firstFragment = normalizeWs(excerpt).slice(0, 40);
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (normalizeWs(lines[i]).includes(firstFragment)) return `line ${i + 1}`;
  }
  return 'unknown line';
}

/** Node/edge factory helpers keep required fields honest at the call site. */
export function makeNode({ id, type, label, description = '', evidenceStatus, provenance, aliases, attrs, notes }) {
  const n = { id, type, label, repo: REPO_ID, evidenceStatus, provenance };
  if (description) n.description = description;
  if (aliases?.length) n.aliases = aliases;
  if (attrs && Object.keys(attrs).length) n.attrs = attrs;
  if (notes) n.notes = notes;
  return n;
}

export function makeEdge({ source, target, type, description, evidenceStatus, confidence, provenance, temporal, financial, flowId, notes, sourceDoc }) {
  const doc = sourceDoc ?? provenance?.[0]?.sourceDoc ?? '';
  const e = {
    id: edgeId(source, target, type, doc),
    source, target, type, description,
    repo: REPO_ID, evidenceStatus, confidence, provenance,
  };
  if (temporal) e.temporal = temporal;
  if (financial) e.financial = financial;
  if (flowId) e.flowId = flowId;
  if (notes) e.notes = notes;
  return e;
}
