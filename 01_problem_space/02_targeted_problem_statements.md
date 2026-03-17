# Targeted Problem Statements — Thriving Neighborhoods

## 1) Ensuring Affordable Housing Investments Stay Affordable

Score: 22/32 — Needs work
Quick-kill flags: lacks continuation pathway; data not ready for teams

### Problem statement
How might we use technology to improve how the City tracks and verifies compliance with affordable housing agreements — so that units funded through public investment remain affordable as promised, without overwhelming limited staff capacity?

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

### Gaps to close before building
- List of publicly funded affordable housing developments is not available in this repository
- Legistar records for housing funding actions have not been linked
- Public rental listing data for rent-vs-commitment comparison has not been identified
- Manual monitoring workflow has not been described
- A departmental champion has not been named

### Data-readiness warning
This statement has a data-not-ready flag. The compliance monitoring workflow and the list of funded developments are not publicly documented in accessible form. Teams choosing this problem should expect to spend significant time scoping down to what is actually available and may find that a staff-facing workflow tool is more feasible than a compliance dashboard.

### Recommended hackathon scope if pursuing this
Narrow to: a staff-facing tool that helps organize and track publicly visible information (Legistar funding records, public rental listings) against affordability commitments. Treat internal City data as out of scope. Do not make compliance determinations — only surface information for staff review.

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
