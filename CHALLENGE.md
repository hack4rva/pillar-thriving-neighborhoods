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

#### Participant guide: connecting to the rubric (if you chose this problem)

Optional prompts — judges use [`RUBRIC.md`](../../RUBRIC.md).

- **Impact:** Earlier, clearer understanding of **development proposals** near residents — without claiming approval status you didn’t verify.
- **User Value:** Resident or civic participant who can find proposals, comment windows, or plain-language summaries.
- **Feasibility:** Public sources (Legistar, GeoHub, etc.) with honest limits on API/live coverage.
- **Innovation:** Map + summary + timing beats a raw agenda dump.
- **Execution:** Search or map flow works on real or sampled Legistar-derived data.
- **Equity and inclusion:** Reach people without planning jargon; focus on neighborhoods feeling rapid change.

**What often works well:** Development tracker, map layer, comment notifier, plain-language agenda helper — all sourced and disclaimed.

**What to avoid:** Implying approved/rejected without official verification, or exhaustive claims without “may be incomplete.”

*Try asking yourself:* Could my neighbor learn what’s proposed **before** the vote without a planning degree?

---

### Problem 2: Ensuring Affordable Housing Investments Stay Affordable

**Score: 22/32 — Needs work**
**✅ Data now available: The City's Department of Housing & Community Development provided a full AHPG data package on March 25, 2026. The Affordable Housing Performance Grant program is the designated pilot. See the [City-Provided Data Package](README.md#city-provided-data-package) section in README.md.**

**Statement (revised March 25, 2026 per Rachel Hightman, HCD):**
How might we use technology to improve how the City tracks and verifies compliance with affordable housing performance grant agreements—so that units funded through public investment remain affordable as promised, without overwhelming limited staff capacity?

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

**Available data (provided by HCD, March 25, 2026):**
- `2026.03.24 - HCD Projects - Hackathon.xlsx` — master HCD project dataset (all programs, all years)
- `AHPG Information.docx` — program overview and the three key questions your tool should address
- `Affordable Housing Performance Grant Projects.xlsx` — full AHPG project roster with parcel PINs, council districts, and project types
- `Affordable Housing Performance Grant Rent and Occupancy Report (2024 Limits) - FINAL.xlsx` — the annual compliance form staff review manually today
- `Template - AHPG Agreement.docx` — standard grant agreement defining affordability obligations and the 30-year compliance window

**Remaining gaps:**
- A long-term departmental champion for continued maintenance has not been named
- Internal City data (individual unit-level compliance records) remains non-public — scope to the provided datasets only

**Recommended scope if pursuing this:**
A staff-facing tool that uses the AHPG project roster and rent/occupancy report structure to organize and track affordability commitments. The three questions from HCD (milestone tracking, compliance verification, long-term database maintenance) are your design brief. No compliance determinations — only information organization and surfacing for staff review.

#### Participant guide: connecting to the rubric (if you chose this problem)

Optional prompts — [`RUBRIC.md`](../../RUBRIC.md) is authoritative for judges.

- **Impact:** Help HCD staff **organize and review** public/grant-related affordability information — not automated compliance verdicts.
- **User Value:** Staff persona with a clearer view of milestones, roster fields, or rent/occupancy structure from provided datasets.
- **Feasibility:** Stay within **provided** HCD package and public data; no internal-only unit records.
- **Innovation:** Dashboards, diff views, or “three questions” UX that reduce spreadsheet thrash.
- **Execution:** Works on real XLSX columns or a faithful subset with stated limits.
- **Equity and inclusion:** Frame outcomes around residents who depend on sustained affordability.

**What often works well:** Compliance **support** tracker, investment explorer, or early-warning surfacing — always “for staff review.”

**What to avoid:** “Out of compliance” claims without verified data, or legal determinations.

*Try asking yourself:* Could staff use this to **prepare** for review faster, without the tool playing lawyer?

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

**Rubric connection (blue sky):** Primarily **Problem 1** (understanding neighborhood change). Use the Problem 1 participant guide; add housing angles only in line with Problem 2 constraints if you touch compliance.

---

## Pillar Award: official scoring mechanics

**Authoritative rubric:** [`RUBRIC.md`](../../RUBRIC.md) at the hackathon root.

**Participant guides** under each problem are optional — **not** binding on judges.

| Category | Weight |
|----------|--------|
| **Impact** (targeted civic problem) | **5** |
| **User Value** | 4 |
| **Feasibility** / implementability | 3 |
| **Innovation** / originality | 3 |
| **Execution** / prototype quality | 3 |
| **Equity and inclusion** | 3 |

Read **`RUBRIC.md`** for full definitions and anchors.

**Score formula:** Sum of (category score 1–5 × weight). Maximum 105.

**Tiebreaker:** User Value score.

**General tips** (full detail in `RUBRIC.md`): Civic usefulness over complexity; flag fragile assumptions; slides-only → low Execution.
