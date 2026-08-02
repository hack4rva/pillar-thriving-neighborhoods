import { describe, it, expect } from 'vitest';
import { readOrganizations } from '../extraction/parsers/organizations.js';

/**
 * Every string here was taken from a real source or owner cell in one of the
 * seven pillar corpora. The cases are the boundary: the reader has to be strict
 * enough to keep methodology notes out of the graph, and loose enough that a
 * hub called "1717 Collective" survives having a number for a name.
 */
describe('reading organizations out of source and owner cells', () => {
  it('passes through a name that is already just a name', () => {
    for (const name of [
      'Black History Museum and Cultural Center of Virginia',
      'United Way of Greater Richmond & Petersburg',
      'Community Foundation for a greater Richmond',
      'Local Initiatives Support Corporation',
      'Better Housing Coalition',
      'Pew Research',
      'Richmond.com',
    ]) {
      expect(readOrganizations(name)).toEqual([name]);
    }
  });

  it('keeps names that collide with the rejection rules', () => {
    // Leading digits, and prepositions that begin real organization names.
    expect(readOrganizations('1717 Collective')).toEqual(['1717 Collective']);
    expect(readOrganizations('Per Scholas')).toEqual(['Per Scholas']);
    expect(readOrganizations('Via Health')).toEqual(['Via Health']);
  });

  it('splits a cell that names more than one organization', () => {
    expect(readOrganizations('Commonwealth of Virginia / Dept of General Services'))
      .toEqual(['Commonwealth of Virginia', 'Dept of General Services']);
    expect(readOrganizations('StoryCorps Richmond page + RVAHub article + Virginia Tech News'))
      .toEqual(['StoryCorps Richmond', 'RVAHub', 'Virginia Tech News']);
  });

  it('reduces a document title to the body that published it', () => {
    expect(readOrganizations('Oral History Association — Informed Consent guidelines'))
      .toEqual(['Oral History Association']);
    expect(readOrganizations('GitHub — datamade/django-councilmatic')).toEqual(['GitHub']);
    expect(readOrganizations('HUD CHAS download page')).toEqual(['HUD CHAS']);
  });

  it('names nobody when the cell describes how the claim was gathered', () => {
    for (const cell of [
      'Search engine results linking to ArcGIS Online dataset pages',
      'WebFetch of icavcu.org',
      'ArcGIS Hub standard behavior for public datasets',
      'rva.gov official announcement',
      'DNS lookup failure',
      'per the user guide',
      'via web search',
      'Parallel.ai verification 2026-03-18 citing VCU Scholars Compass',
    ]) {
      expect(readOrganizations(cell), cell).toEqual([]);
    }
  });

  it('names nobody for an inbox, an endpoint, an interface or a bare figure', () => {
    for (const cell of [
      'CSSHelp@richmondgov.com',
      'PDRLandUseAdmin@rva.gov',
      'richmondva.legistar.com',
      'Legistar Web API',
      '2026-03-18',
      'N/A',
    ]) {
      expect(readOrganizations(cell), cell).toEqual([]);
    }
  });

  it('names nobody for a constituency rather than a body', () => {
    for (const cell of ['Community organizations', 'Community organizations/residents', 'organizations']) {
      expect(readOrganizations(cell), cell).toEqual([]);
    }
  });

  it('treats an absent cell as naming nobody', () => {
    for (const cell of ['', null, undefined, '   ']) {
      expect(readOrganizations(cell)).toEqual([]);
    }
  });
});
