# Targeted Problem Statements — Thriving Neighborhoods

## 1) Ensuring Affordable Housing Investments Stay Affordable

Score: 22/32 — Needs work
Quick-kill flags: lacks continuation pathway
Data status: **AHPG data package provided by HCD, March 25, 2026** — data gap resolved

### Problem statement (revised March 25, 2026 per Rachel Hightman, HCD)
How might we use technology to improve how the City tracks and verifies compliance with affordable housing performance grant agreements—so that units funded through public investment remain affordable as promised, without overwhelming limited staff capacity?

### Context
Richmond invests in affordable housing through performance grants, low-interest loans, Section 108 loans, and other incentive programs. As the portfolio of funded developments grows, staff must verify that developers comply with affordability requirements, rent limits, and repayment terms. Monitoring is largely manual, and data is spread across internal trackers, public records, and external housing listings.

### Constraints
- Limited staff capacity
- Budget limitations
- Some contract details cannot be made public
- Data exists but is fragmented across systems
- Technology should support human compliance oversight rather than replace it

### Success would mean
- Staff can easily track affordability requirements across funded developments
- Compliance risks are flagged earlier
- Public housing investments are easier to monitor over time
- Staff spend less time compiling data manually

### Available data (provided by HCD, March 25, 2026)
- `2026.03.24 - HCD Projects - Hackathon.xlsx` — master HCD project dataset
- `AHPG Information.docx` — program overview and key questions for participants
- `Affordable Housing Performance Grant Projects.xlsx` — full AHPG project roster with parcel PINs
- `Affordable Housing Performance Grant Rent and Occupancy Report (2024 Limits) - FINAL.xlsx` — annual compliance form
- `Template - AHPG Agreement.docx` — standard grant agreement template

### Remaining gaps
- A long-term departmental champion for continued maintenance has not been named
- Unit-level compliance records remain internal — scope to the provided datasets only

### Recommended hackathon scope if pursuing this
Build a staff-facing tool that uses the AHPG project roster and rent/occupancy report structure to organize and track affordability commitments. Address at least one of the three HCD questions: (1) milestone tracking, (2) compliance verification, (3) long-term database maintenance over a 30-year project lifespan. Do not make compliance determinations — only surface information for staff review.

---

## 2) Help Residents Discover and Understand Neighborhood Development

Score: 26/32 — Strong
Quick-kill flags: lacks continuation pathway

### Problem statement
How might we use technology to make it easier for residents to discover and understand development proposals in their neighborhoods — so they can engage earlier and more meaningfully in the planning process?

### Context
Development proposals in Richmond are publicly available through City Council agendas and Legistar. Finding and understanding this information requires familiarity with City processes and proactive searching. Residents frequently learn about projects late — or after decisions have already been made. Planning Commission and City Council meetings often include residents who were unaware of proposals until they happened to hear about them from a neighbor or news article.

### Constraints
- Must rely on publicly available data sources
- Should not add workload for City staff
- Must integrate with or pull from existing systems such as Legistar
- Information must remain accurate and timely
- Output must be understandable to residents without planning expertise

### Success would mean
- Residents can easily see projects affecting their neighborhood
- Development proposals are easier to understand
- Public engagement occurs earlier in the process
- Staff receive fewer reactive inquiries about the status of proposals

### Gaps to close before building
- Output type has not been specified (map, notifications, searchable list, explainer)
- Resident device usage and digital literacy in affected neighborhoods are undocumented
- Broadband access rate in affected neighborhoods is unknown
- Legistar API access has not been confirmed for Richmond's instance

### Recommended hackathon scope
Build: an address or neighborhood search interface that surfaces active and recent development proposals from Legistar, shows them on a map, and provides a plain-language summary of what each proposal involves and when public comment is open. Explicitly disclaim that information comes from Legistar and may not be exhaustive or instantaneous.
