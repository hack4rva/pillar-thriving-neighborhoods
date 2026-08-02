/**
 * Generic markdown-table reader.
 *
 * Each pillar repo writes its evidence log in a slightly different dialect:
 * different heading levels, different column names and orders, sometimes no
 * section headings at all. Rather than encode one repo's layout, we read every
 * table, remember its header row, and let callers ask for columns by meaning.
 */

/** Comparison key for a header cell: lowercase, alphanumerics only. */
export const headerKey = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

const splitRow = (line) => line.split('|').slice(1, -1).map((c) => c.trim());

const isDivider = (line) => /^\|[\s:|-]+\|$/.test(line.trim());

/**
 * @returns {Array<{headers: string[], keys: string[], heading: string|null,
 *                  rows: Array<{cells: string[], lineNo: number}>}>}
 */
export function parseTables(text) {
  const lines = text.split('\n');
  const tables = [];
  let heading = null;
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h = /^#{1,6}\s+(.+?)\s*$/.exec(line.trim());
    if (h) {
      heading = h[1];
      current = null;
      continue;
    }
    if (!line.trim().startsWith('|')) {
      current = null;
      continue;
    }
    if (isDivider(line)) continue;

    const cells = splitRow(line);
    if (!current) {
      current = { headers: cells, keys: cells.map(headerKey), heading, rows: [] };
      tables.push(current);
      continue;
    }
    current.rows.push({ cells, lineNo: i + 1 });
  }
  return tables;
}

/** First non-empty cell whose column header matches one of `synonyms`. */
export function pick(table, row, synonyms) {
  for (const syn of synonyms) {
    const idx = table.keys.indexOf(syn);
    if (idx >= 0) {
      const v = (row.cells[idx] ?? '').trim();
      if (v && v !== '—' && v !== '-') return v;
    }
  }
  return '';
}

export const COLUMNS = {
  label: ['claim', 'claimneeded', 'whatismissing', 'item', 'dataset', 'document', 'risk', 'tool', 'need'],
  source: ['source', 'sourcename', 'sourceofclaim', 'basis', 'basisforinference', 'owner', 'city'],
  url: ['url', 'officialurl', 'sourceurl', 'urlexpected'],
  status: ['status', 'verified'],
  notes: ['notes', 'caveats', 'reliabilitynotes', 'relevance', 'update'],
  impact: ['impact', 'whyitmatters', 'riskifwrong'],
  remedy: ['howtogetit', 'howtoresolve', 'verifyvia', 'whatneedsconfirmation', 'mitigation'],
  severity: ['severity'],
};
