> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Continuation Plan — Thriving Neighborhoods

This document identifies post-hackathon paths for teams that want their work to live beyond Sunday.

---

## City contacts and champions

### Sharon Ebert — Deputy CAO (DCAO)
- Role: Attended the February 18 working session; potential departmental champion for both targeted statements.
- Why relevant: As DCAO, Sharon Ebert has cross-departmental visibility including Planning, Housing, and Community Development.
- Contact: Sharon.Ebert@rva.gov [Unverified — confirm current role and contact]
- Continuation path: Present prototype to Sharon Ebert's office. Ask about hand-off to Planning or Housing department.

### Richmond Department of Planning and Development Review
- Role: Administers the Planning Commission process; manages Legistar records for development cases.
- Why relevant: A neighborhood development notifier or Legistar translator would be most useful if adopted or endorsed by Planning.
- Contact: [Unverified — confirm current department contact]
- Continuation path: Prototype must not add staff workload. Position as a public-facing complement to existing Legistar records.

### Richmond Office of Housing and Community Development
- Role: Administers affordable housing grants, loans, and incentive programs; responsible for compliance monitoring.
- Why relevant: The housing compliance tool is most useful if it reduces staff burden in this office.
- Contact: [Unverified — confirm current department contact]
- Continuation path: Prototype must be scoped to reduce, not increase, staff monitoring burden.

---

## Nonprofit and community partners

### PlanRVA
- What it does: Regional planning organization; works on housing, transportation, and land use policy for the Richmond region.
- Why relevant: PlanRVA can provide housing data context and may be a distribution partner for neighborhood change tools.
- Contact: martha@PlanRVA.org (Martha Shickle — attended working session)

### 1717 Collective
- What it does: Entrepreneurship support organization; attended working session.
- Why relevant: Less directly relevant to Thriving Neighborhoods, but may have connections to housing advocacy or community development organizations.
- Contact: hlyne@1717collective.org (Heather Lyne)

### Richmond community and neighborhood organizations
- Relevant for testing and adoption of a neighborhood development notifier. Specific organizations TBD.
- Richmond neighborhood organizations often track development activity informally — a tool that formalizes this could be valuable to them.

---

## Artifacts worth preserving

| Artifact | Why it matters |
|---|---|
| Legistar data pipeline / API wrapper | Reusable for any Richmond legislative data project |
| Address geocoding layer (Legistar + GeoHub) | Core infrastructure for any development lookup tool |
| Plain-language summary templates | Reusable content patterns for any planning communication tool |
| Housing portfolio data model | Schema for tracking affordable housing commitments |
| HUD FMR comparison logic | Reusable for any housing affordability analysis |

---

## 30-60-90 day next steps

### 30 days
- Document the prototype, data sources, and known gaps
- Share with Sharon Ebert's office and Planning Department
- Confirm Legistar API availability and terms of use with City IT
- Identify a potential City staff owner for continued development

### 60 days
- Test prototype with 5–10 Richmond residents (neighborhood development notifier) or 2–3 City staff (compliance tool)
- Refine based on feedback; document what changed and why
- Explore grant opportunities: Code for America, Knight Foundation civic tech grants, Virginia civic innovation programs

### 90 days
- Seek adoption pathway: City endorsement, nonprofit hosting, or open-source community maintenance
- Publish open data pipeline and code as a Richmond civic tech commons contribution
- Document remaining data gaps for City follow-up (e.g., Legistar API enablement, housing portfolio data structure)

---

## Risks to continuation

- No named departmental champion: both problem statements lack confirmed City champions. Continuation requires someone inside City government to take ownership.
- Legistar API access: if Richmond's Legistar instance does not have the API enabled, a web scraper is a fragile alternative.
- Housing compliance data: the full compliance picture requires internal City data that is not publicly available. The prototype scope must remain advisory.
- Staff capacity: City departments are limited in their ability to evaluate and adopt civic tech tools without dedicated resources.
