import { readFileSync, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';

/**
 * Per-pillar configuration for the extraction pipeline.
 *
 * The app is identical in every pillar repo; only this config differs. Optional
 * sources are auto-disabled when the file is absent, so a pillar that has no
 * capital-projects CSV simply produces a graph with no financial layer rather
 * than failing the build.
 */

const KG_ROOT = resolve(import.meta.dirname, '..');
export const REPO_ROOT = resolve(KG_ROOT, '..');

const DEFAULTS = {
  repoId: basename(REPO_ROOT),
  pillarName: basename(REPO_ROOT),
  shortName: basename(REPO_ROOT),
  description: '',
  sources: {
    evidenceLog: 'admin/evidence_log.md',
    sourceInventory: 'data/source_inventory.csv',
    // Capital-projects export. Only the Built Environment pillar has one; it is
    // the sole origin of project costs, phases, and every financial flow.
    projectsCsv: null,
    // Deep-research outputs per proposed project: pain points, jobs to be done,
    // prior art, and open questions, each with cited sources.
    postEventResearch: 'post-event-research',
  },
};

function loadConfigFile() {
  const path = resolve(KG_ROOT, 'pillar.config.json');
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, 'utf8'));
}

const raw = loadConfigFile();

/** Drop any configured source whose file isn't actually present. */
function resolveSources(configured) {
  const merged = { ...DEFAULTS.sources, ...(configured ?? {}) };
  const out = {};
  for (const [key, relPath] of Object.entries(merged)) {
    out[key] = relPath && existsSync(resolve(REPO_ROOT, relPath)) ? relPath : null;
  }
  return out;
}

export const config = {
  ...DEFAULTS,
  ...raw,
  sources: resolveSources(raw.sources),
  /**
   * Derive organizations and citations from strings already in the corpus
   * (inventory `owner`, evidence `source`, dataset names quoted in claims).
   * Off for pillars whose entities are hand-curated, since deriving would
   * duplicate them; on for pillars with no curated records yet, where it is
   * the difference between a graph and a list.
   */
  derive: raw.derive ?? false,
};

export const REPO_ID = config.repoId;
