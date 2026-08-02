/**
 * Reads organization names out of the free-text "source" and "owner" columns.
 *
 * Those columns answer "where did this come from", and the answer is only
 * sometimes an organization. It is just as often a method ("WebFetch of
 * icavcu.org"), a document ("Meta for Developers — Graph API Event reference"),
 * an inbox (PDRLandUseAdmin@rva.gov), an endpoint (richmondva.legistar.com) or
 * several sources at once ("StoryCorps Richmond page + RVAHub article").
 *
 * Taking the cell verbatim turned all of those into Organization nodes, which
 * is how the graph ended up asserting that "Search engine results linking to
 * ArcGIS Online dataset pages" is an organization that publishes datasets.
 *
 * Returning [] is a normal outcome and loses nothing: the original string stays
 * on the evidence record and the dataset row, where it reads as what it is.
 */

/** Describes how a claim was gathered rather than who it came from. */
const METHOD = [
  /^(web\s?fetch|fetch(ed)?|retrieved|scraped|downloaded)\b/i,
  /^search (engine )?results?\b/i,
  /^search result\b/i,
  /\bverification\b[^.]*\bciting\b/i,
  /\bstandard behaviou?r\b/i,
  /\bissue #\d+/i,
  /^(per|via|from|see)\s/i,
  /\b(inferred|inference|assumption|estimated|extrapolated)\b/i,
  /\bnot (publicly )?available\b/i,
  /^(unknown|n\/a|tbd|none)$/i,
  // A note about the lookup going wrong, e.g. "DNS lookup failure".
  /\b(failure|failed|error|timed? ?out|no response|dead link|broken|404)\b/i,
];

/**
 * Nouns that turn an organization into the artifact it produced. Stripped from
 * the tail so "The Valentine announcement" yields the museum, not the notice.
 */
const ARTIFACT = 'guidelines?|reference|announcements?|articles?|changelogs?|documentation'
  + '|docs?|search results?|results?|reports?|pages?|snippets?|posts?|threads?'
  + '|listings?|faq|help|blog|newsletter|press release';

/** Qualifiers that only ever modify an artifact noun, never a name. */
const QUALIFIER = 'official|developer|public|online|web|internal|draft|final';

const ARTIFACT_TAIL = new RegExp(`\\s+(?:(?:${QUALIFIER})\\s+)*(?:${ARTIFACT})\\s*$`, 'i');
/**
 * An em-dash tail is a document title when it ends in an artifact noun, or a
 * repository path ("GitHub — datamade/django-councilmatic"). Either way the
 * organization is the part in front of the dash.
 */
const DASH_TITLE = new RegExp(`\\s[—–]\\s(.*\\b(?:${ARTIFACT})|\\S+/\\S+)\\s*$`, 'i');

/**
 * Words for a category of body rather than a body. A name built only from
 * these ("Community organizations/residents") describes a constituency; it is
 * not something anyone could look up, and as a node it attracts edges from
 * everywhere while identifying nobody.
 */
const COLLECTIVE = new Set(['organizations', 'organization', 'organisations', 'organisation',
  'residents', 'resident', 'groups', 'group', 'agencies', 'agency', 'stakeholders',
  'providers', 'provider', 'partners', 'partner', 'nonprofits', 'nonprofit',
  'businesses', 'business', 'leaders', 'members', 'staff', 'officials', 'departments',
  'institutions', 'entities', 'bodies', 'associations', 'advocates', 'volunteers',
  'vendors', 'contractors', 'employers', 'schools', 'churches', 'teams', 'users',
  'community', 'local', 'various', 'multiple', 'other', 'regional', 'state', 'and']);

const isCollective = (s) => {
  const words = s.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  return words.length > 0 && words.every((w) => COLLECTIVE.has(w));
};

/** Never an organization, whatever else the cell says. */
const NOT_AN_ORG = [
  /@/,                       // an inbox
  /https?:\/\//i,            // a link
  /\.[a-z]{2,}\/\S/i,        // a domain with a path
  /\bAPI\b/,                 // an interface
  /^\d/,                     // a date or figure
];

/** Sources joined into one cell. "&" is left alone — plenty of names contain it. */
const SPLIT = /\s+\+\s+|\s+\/\s+|\s+;\s+/;

/**
 * A hostname of three or more labels is a tenant or service endpoint
 * (richmondva.legistar.com), not a masthead. Two labels can be a publisher
 * brand (Richmond.com), so those are kept.
 */
const isEndpointHost = (s) => /^[a-z0-9-]+(\.[a-z0-9-]+){2,}$/i.test(s);

function readOne(raw) {
  let s = String(raw).trim().replace(/\s+/g, ' ');
  if (!s) return null;

  if (METHOD.some((re) => re.test(s))) return null;

  const original = s;
  // "Publisher — Some Document reference": keep the publisher, drop the title.
  s = s.replace(DASH_TITLE, '').trim();
  // Repeatedly, because "VCU Libraries search results" and "The Valentine
  // announcement page" both trail more than one artifact noun.
  let previous;
  do { previous = s; s = s.replace(ARTIFACT_TAIL, '').trim(); } while (s !== previous);
  s = s.replace(/[.,;:]+$/, '').trim();

  if (!s || s.length < 2) return null;
  if (NOT_AN_ORG.some((re) => re.test(s))) return null;
  if (isEndpointHost(s)) return null;
  if (isCollective(s)) return null;
  // A cell that was describing a document hosted somewhere ("rva.gov official
  // announcement") reduces to the host. The host was the address of the
  // document, not the name of a publisher, so there is no organization here.
  if (s !== original && /^[a-z0-9-]+\.[a-z]{2,}$/i.test(s)) return null;
  // Anything still this long is a sentence about a source, not its name.
  if (s.split(' ').length > 8) return null;
  return s;
}

/**
 * Organization names named by a source/owner cell. May be empty, and may hold
 * more than one when the cell listed several.
 */
export function readOrganizations(text) {
  if (!text) return [];
  const out = [];
  for (const part of String(text).split(SPLIT)) {
    const name = readOne(part);
    if (name && !out.includes(name)) out.push(name);
  }
  return out;
}
