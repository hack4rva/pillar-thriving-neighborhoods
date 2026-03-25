# Thriving Neighborhoods — Hackathon Challenge

This file defines the two practical problem statements for this pillar and the top-rated blue sky vision. Read this before reading anything else in the repository.

---

## The Two Problems You're Solving

### Problem 1: Help Residents Discover and Understand Neighborhood Development

**Score: 26/32 — Strong (recommended starting point)**

**Statement:**
How might we use technology to make it easier for residents to discover and understand development proposals in their neighborhoods — so they can engage earlier and more meaningfully in the planning process?

**Why this problem matters:**
Development proposals in Richmond are publicly available through City Council agendas and Legistar. But finding and understanding them requires familiarity with City processes and proactive searching. Residents frequently learn about projects late — or after decisions have already been made. The information is public. The problem is discoverability, legibility, and timing.

**Build toward:**
- Neighborhood development tracker — address or neighborhood search, surfaces active and recent proposals from Legistar
- Development proposal map — shows proposals geographically with plain-language summaries
- Public comment notifier — alerts residents when a proposal near them enters public comment
- Legistar plain-language translator — converts council agenda items and development proposals into readable summaries

**Key constraints:**
- Must rely on publicly available data sources — do not build on internal City planning systems
- Must not add workload for City staff
- Information must remain accurate — label it as coming from Legistar and not guaranteed to be exhaustive or instantaneous
- Must be understandable to residents without planning expertise
- Do not imply a development project is approved or rejected without official verification

**Data sources:**
- Legistar — Richmond City Council meeting system. Confirm API access for Richmond's instance before building a live integration.
- Richmond GeoHub: https://richmond-geo-hub-cor.hub.arcgis.com/
- Richmond Open Data Portal: https://data.richmondgov.com/
- Parcel data and permit data may be available through GeoHub — verify before building

**Recommended weekend scope:**
An address or neighborhood search interface that surfaces active and recent development proposals from Legistar, displays them on a map, and provides a plain-language summary of what each proposal involves and when public comment is open. Disclaimer: "Information sourced from Legistar. May not be exhaustive. Check official City sources for authoritative status."

---

### Problem 2: Ensuring Affordable Housing Investments Stay Affordable

**Score: 22/32 — Needs work**
**⚠ Data not ready flag: The compliance monitoring workflow and list of funded developments are not publicly documented in accessible form. Teams choosing this problem must spend significant time scoping to what is actually available.**

**Statement:**
How might we use technology to improve how the City tracks and verifies compliance with affordable housing agreements — so that units funded through public investment remain affordable as promised, without overwhelming limited staff capacity?

**Why this problem matters:**
Richmond invests in affordable housing through performance grants, low-interest loans, Section 108 loans, and other programs. As the portfolio of funded developments grows, staff must verify that developers comply with affordability requirements, rent limits, and repayment terms. Monitoring is largely manual. Data is spread across internal trackers, public records, and external housing listings. Compliance gaps can go undetected.

**Build toward:**
- Staff-facing compliance tracker — organizes publicly visible information (Legistar funding records, public rental listings) against affordability commitments
- Affordable housing investment explorer — visualizes publicly funded developments and their stated commitments
- Rent vs. commitment monitor — compares publicly listed rents against known affordability commitments from public records
- Early warning tool — surfaces funded developments approaching the end of affordability periods

**Key constraints:**
- Some contract details cannot be made public — work only with what is publicly available
- Technology must support human compliance oversight, not replace it
- Do not make compliance determinations — only surface information for staff review
- Do not claim a development is out of compliance without verified data
- Must operate within limited staff capacity

**Data gaps (blocking — must be resolved before building):**
- List of publicly funded affordable housing developments is not available in this repository
- Legistar records for housing funding actions have not been linked
- Public rental listing data for rent-vs-commitment comparison has not been identified
- Manual monitoring workflow has not been described
- A departmental champion has not been named

**Recommended scope if pursuing this:**
A staff-facing tool that uses Legistar funding records and public rental listings to organize affordability commitments in one place. Treat internal City data as explicitly out of scope. No compliance determinations — only information organization and surfacing.

---

## The Blue Sky Vision

### Making Neighborhood Change Easier to Understand — 22/27 — Strong ★ Recommended

**Statement:**
How might we use technology to help Richmond residents understand how their neighborhoods are changing — so that they can engage more meaningfully in planning, investment, and development decisions that affect where they live?

**Why this scored well:**
Clear user (Richmond resident). Strong data path (Legistar, GeoHub, Socrata). Natural demo path (map or timeline of development activity). This is the closest blue sky to the targeted Problem 1 and inherits much of its strength.

**Hackathon path if you're aiming at this vision:**
Scope tightly to one neighborhood or one data layer rather than attempting a citywide dashboard:
- One neighborhood: show all development activity in Jackson Ward or Church Hill over the past two years
- One data layer: show all rezoning requests citywide with a plain-language explanation of what each type of rezoning means
- One user journey: a resident moves to a new neighborhood and wants to understand what is changing around them

The blue sky is the ceiling. Problem 1 (Neighborhood Development Discovery) is the practical floor. A team that builds Problem 1 with this blue sky framing — historical context, change over time, resident voice — will have a compelling pitch for both the Pillar Award and the Moonshot Award.

---

## How Your Solution Will Be Judged (Pillar Award)

The Pillar Award uses the following weights. For full category definitions and scoring anchors, see [`/RUBRIC.md`](../../RUBRIC.md) at the hackathon root.

| Category | Weight | What judges are asking |
|----------|--------|------------------------|
| **Impact** | **5** | Does this directly address one of the two problem statements above? |
| **User Value** | 4 | Is there a specific, real user? Does the prototype improve their ability to understand or engage with neighborhood development? |
| **Feasibility** | 3 | Could this be piloted by a City planning department or housing team within a year? |
| **Innovation** | 3 | Does the team bring fresh thinking to development transparency or housing compliance? |
| **Execution** | 3 | Does a working demo exist? Is the flow coherent? |
| **Equity** | 3 | Does the solution reach residents without planning expertise, particularly in rapidly changing neighborhoods? |

**Score formula:** Sum of (category score 1–5 × weight). Maximum 105.

**Tiebreaker:** User Value score.

**What wins here:** A prototype that makes neighborhood development proposals discoverable and legible to residents, or that makes affordable housing compliance monitoring tractable for City staff, using real public data.

**What loses here:** Tools implying developments are approved or rejected without official verification, solutions making legal or compliance determinations, or projects requiring internal City housing system integration.
