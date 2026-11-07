import { describe, it, expect } from 'vitest';
import { slug, nodeId, edgeId, parseMoney, parseLooseDate, verifyProvenance } from '../extraction/lib.js';
import { realProvenance } from './pillar.js';

describe('slug / ids', () => {
  it('slugifies names deterministically', () => {
    expect(slug('Fall Line Trail - Walmsley Boulevard to Bellemeade Road ')).toBe(
      'fall-line-trail-walmsley-boulevard-to-bellemeade-road');
    expect(slug('Richmond Department of Public Works (DPW)')).toBe('richmond-department-of-public-works-dpw');
  });

  it('node ids embed kind and slug', () => {
    expect(nodeId('project', 'Southside Community Center')).toBe('n:project:southside-community-center');
  });

  it('edge ids are deterministic 12-hex hashes', () => {
    const a = edgeId('n:a:x', 'n:b:y', 'FUNDS', 'doc.md');
    const b = edgeId('n:a:x', 'n:b:y', 'FUNDS', 'doc.md');
    expect(a).toBe(b);
    expect(a).toMatch(/^e:[a-f0-9]{12}$/);
    expect(edgeId('n:a:x', 'n:b:y', 'FUNDS', 'other.md')).not.toBe(a);
    expect(edgeId('n:b:y', 'n:a:x', 'FUNDS', 'doc.md')).not.toBe(a);
  });
});

describe('parseMoney', () => {
  it('parses currency strings', () => {
    expect(parseMoney('$2,057,000')).toBe(2057000);
    expect(parseMoney(' $550,000 ')).toBe(550000);
    expect(parseMoney('$30,513,000')).toBe(30513000);
    expect(parseMoney('1000000')).toBe(1000000);
  });
  it('returns null (never guesses) for missing/unparseable values', () => {
    for (const v of [null, undefined, '', 'N/A', 'TBD', 'unknown', '-', 'varies']) {
      expect(parseMoney(v)).toBeNull();
    }
  });
});

describe('parseLooseDate', () => {
  it('parses seasons, months, and bare years into sortable keys', () => {
    expect(parseLooseDate('Fall 2031')).toMatchObject({ year: 2031 });
    expect(parseLooseDate('December 2026').sortKey).toBeGreaterThan(parseLooseDate('Spring 2026').sortKey);
    expect(parseLooseDate('Fall 2026').sortKey).toBeGreaterThan(parseLooseDate('Summer 2026').sortKey);
    expect(parseLooseDate('2031').year).toBe(2031);
    expect(parseLooseDate('Late 2028').sortKey).toBeCloseTo(2028.9);
  });
  it('returns null for TBD/N/A instead of fabricating dates', () => {
    expect(parseLooseDate('TBD')).toBeNull();
    expect(parseLooseDate('N/A')).toBeNull();
    expect(parseLooseDate(null)).toBeNull();
  });
});

describe('verifyProvenance', () => {
  // Drawn from whichever pillar this copy of the explorer is running in, so
  // the three outcomes are exercised against a real corpus everywhere rather
  // than against one pillar's problem statements.
  const sample = realProvenance();

  it('verifies an excerpt at the stated line range', () => {
    const result = verifyProvenance(sample);
    expect(result.ok).toBe(true);
    expect(result.level).toBe('exact');
  });
  it('flags excerpts that do not exist in the source', () => {
    const result = verifyProvenance({
      ...sample,
      excerpt: 'this text was never written in the corpus at all',
    });
    expect(result.ok).toBe(false);
    expect(result.level).toBe('missing');
  });
  it('reports moved excerpts that exist elsewhere in the file', () => {
    // Same text, wrong line: the excerpt is real but the location has drifted.
    const [, start] = sample.sourceLocation.match(/lines (\d+)/);
    const elsewhere = Number(start) === 1 ? 999 : 1;
    const result = verifyProvenance({
      ...sample,
      sourceLocation: `lines ${elsewhere}-${elsewhere}`,
    });
    expect(result.ok).toBe(true);
    expect(result.level).toBe('moved');
  });
});
