import { describe, it, expect } from 'vitest';
import { slug, nodeId, edgeId, parseMoney, parseLooseDate, verifyProvenance } from '../extraction/lib.js';

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
  it('verifies an excerpt at the stated line range', () => {
    const result = verifyProvenance({
      sourceDoc: 'docs/problem_space/targeted_problem_statements.md',
      sourceLocation: 'lines 12-13',
      excerpt: 'How might we use technology to improve how Richmond residents find and understand',
    });
    expect(result.ok).toBe(true);
    expect(result.level).toBe('exact');
  });
  it('flags excerpts that do not exist in the source', () => {
    const result = verifyProvenance({
      sourceDoc: 'docs/problem_space/targeted_problem_statements.md',
      sourceLocation: 'lines 12-13',
      excerpt: 'this text was never written in the corpus at all',
    });
    expect(result.ok).toBe(false);
    expect(result.level).toBe('missing');
  });
  it('reports moved excerpts that exist elsewhere in the file', () => {
    const result = verifyProvenance({
      sourceDoc: 'docs/problem_space/targeted_problem_statements.md',
      sourceLocation: 'lines 1-1',
      excerpt: 'Street Cleaning Zone Lookup using the public schedule page',
    });
    expect(result.ok).toBe(true);
    expect(result.level).toBe('moved');
  });
});
