# Pain Point Research — Affordable Housing Compliance Monitoring

**Pillar:** Thriving Neighborhoods
**Problem Statement:** Help City staff track whether publicly funded affordable housing stays affordable over time.
**Applies to:** Affordable Housing Compliance Dash
**Research Date:** April 1, 2026

---

## Pain Points by JTBD

### Job 1 — The Compliance Analyst Managing a Growing Portfolio With No Unified Tracker

**P1.1: Three Programs, Three Systems, No Single View**
Richmond's three affordable housing programs each use a different submission and tracking system: AHTEP runs through the EnerGov portal with Assessor coordination, EAHP uses OneDrive links sent directly to applicants, and AHTF relies on email and internal HCD processes (`A1_problem_landscape_housing_compliance.md`). The analyst must toggle between all three plus personal spreadsheets to understand what's due, what's been submitted, and what needs review. There is no unified registry or shared database — the compliance picture exists only in the analyst's head and their ad-hoc tracking files.

**P1.2: Staggered Deadlines Create Dead Zones for Errors**
AHTEP renewals are due November 1; AHTF certifications are due January 15; EAHP has project-specific timelines (`A1_problem_landscape_housing_compliance.md`). These staggered deadlines, managed across different platforms, create handoff gaps where multi-agency coordination between HCD and the Assessor can be dropped. The root cause analysis identifies this as a high software-addressability problem: "Staggered due dates managed across different platforms create 'dead zones' where multi-agency handoffs can easily be dropped" (`A4_problem_landscape_root_causes.md`).

**P1.3: Manual Rent and Income Verification Is Slow and Error-Prone**
AHTEP explicitly places the "burden of proof" on property owners to demonstrate that units meet affordability guidelines (`A1_problem_landscape_housing_compliance.md`). Analysts receive self-reported tenant income and rent data — often as PDFs or unstructured email attachments — and must manually cross-reference these against HUD AMI limits and calculate whether rent exceeds 30% of income. The staff persona research documents this as the highest-pain workflow step: "manually re-keying rent roll data from PDFs into Excel to calculate if rent exceeds the 30% income cap" (`B2_users_housing_staff.md`). Complex adjustments for utility allowances and household size compound the error risk.

**P1.4: The Portfolio Is Growing Faster Than Staff Capacity**
AHTF awarded $7M for 822 units in FY2024 and $5.9M for 580 units in FY2025 — each deal adding a 15-year monitoring obligation (`A1_problem_landscape_housing_compliance.md`). The new Ordinance 2026-045 dedicates 2.5% of real estate tax revenue to the AHTF, and ARPA investments are adding over 2,100 units expected online in 2026 (`C3_services_housing_programs.md`). Meanwhile, the 2026 audit cited "staff and leadership turnover" as a reason policies were not verified as implemented. Cumulative compliance debt is growing exponentially while the team absorbing it is small and unstable.

**P1.5: Institutional Knowledge Evaporates With Staff Turnover**
The data quality research warns that compliance tracking depends on individual analyst knowledge about property histories, developer relationships, and exception cases (`D5_data_quality.md`). When an analyst leaves, their spreadsheets, email context, and informal process knowledge leave with them. The 2026 audit found this directly: policies "could not be verified as implemented" because staff had turned over (`A1_problem_landscape_housing_compliance.md`). A system that stores compliance history only in an analyst's inbox is a system that resets to zero with every departure.

### Job 2 — The HCD Director Reporting Portfolio Status to City Council

**P2.1: No Way to Generate a Portfolio Roll-Up**
The Director needs to report on the entire affordable housing portfolio — compliance rates, risk concentrations, developer performance, unit counts by AMI tier — but no system produces this view. The data exists in fragments across EnerGov (AHTEP applications), OneDrive (EAHP submissions), email (AHTF certifications), and the Assessor's office (property valuations and inspections) (`A1_problem_landscape_housing_compliance.md`). Producing a roll-up requires manual compilation from every source, introducing delays and accuracy risks at every step.

**P2.2: The 2026 Audit Created an Accountability Mandate the City Cannot Yet Meet**
The audit found the City failed to follow its own funding rules, never created a documented implementation plan, and left $2.4M untransferred for three years (`A1_problem_landscape_housing_compliance.md`). Ordinance 2026-045 now requires the Chief Administrative Officer to submit a quadrennial evaluation of the AHTF's performance including units created, preserved, and affordability levels maintained (`C3_services_housing_programs.md`). The Director must answer these questions with data the City currently does not aggregate. The gap between the reporting obligation and the data infrastructure is immediate and acute.

**P2.3: Developer Performance Is Invisible at the Portfolio Level**
EAHP guidelines allow HCD to place developers with poor performance on "hold status" and apply additional monitoring requirements (`A1_problem_landscape_housing_compliance.md`). But identifying which developers have recurring problems requires manually reviewing individual project files. There is no dashboard showing developer-level compliance trends, repeat late submissions, or cross-program performance. The staff persona research notes that identifying developer patterns is a core managerial need: catching violations early enough to guide developers through a 30-day cure period rather than discovering years-old noncompliance during an audit (`B2_users_housing_staff.md`).

### Job 3 — The City Auditor Verifying Public Investments Delivered Promised Affordability

**P3.1: No Auditable Chain From Funding Authorization to Unit-Level Compliance**
Council approves AHTF awards via Legistar ordinances. These ordinances reference specific projects, dollar amounts, and affordability terms — but those details are buried in PDF attachments, not structured database fields (`D3_data_housing_programs.md`). Downstream, compliance certifications arrive via email or EnerGov with no systematic link back to the originating award. The data quality research confirms: "Because City Council resolutions do not store financial terms in structured database fields, automated or manual PDF parsing of Fiscal Impact Statements and Affordability Agreements is required to track local compliance" (`D3_data_housing_programs.md`). An auditor cannot trace the chain without reconstructing it manually.

**P3.2: Self-Reported Data With No Cross-Checks Undermines Verification**
Compliance verification for all three programs depends on owner-submitted data. AHTEP requires owners to prove that rents do not exceed 30% of tenant income, but there is no automated cross-check against HUD limits or any independent data source (`A1_problem_landscape_housing_compliance.md`). Nationally, the Grounded Solutions Network found that just over 40% of inclusionary housing programs do not track units or fees despite 97% claiming to monitor rental compliance (`A4_problem_landscape_root_causes.md`). Richmond's reliance on self-reporting without structured validation fits this national pattern of monitoring in name but not in practice.

**P3.3: Governance Gaps Make Systemic Control Weaknesses Likely**
If the City failed to transfer $2.4M and never created an AHTF accounting fund until three years after the relevant ordinances passed, the auditor must assume that downstream controls are similarly weak (`A1_problem_landscape_housing_compliance.md`). The root cause analysis ranks "weak ordinance execution controls" as a Richmond-specific governance risk with low software-addressability — software cannot force the City to implement its own ordinances, but it can make gaps visible and create an auditable record of what was and was not tracked (`A4_problem_landscape_root_causes.md`).

**P3.4: Federal and Local Compliance Layers Overlap Without Integration**
Properties receiving both federal funds (HOME, CDBG) and local funds (AHTF) carry overlapping compliance obligations tracked in different systems — HCD monitors local requirements while Virginia Housing monitors LIHTC via HDS NextGen/WTCMS with its own March 1 deadline (`E3_prior_art_housing_compliance.md`). The data sources research identifies no integration between these layers: "No single database contains both local financial investments and federal compliance dates; a custom ETL pipeline joining Legistar, NHPD, and VHDA via parcel IDs is the only viable strategy for a complete inventory" (`D3_data_housing_programs.md`).

---

## Cross-Cutting Equity Dimension: Who Bears the Cost When Compliance Fails

**The Affordability Penalty Falls on Tenants, Not Owners**
When an AHTEP exemption lapses because an owner missed the November 1 renewal, the owner loses a tax benefit — but the tenants lose the affordability restriction that kept their rent below 30% of income. When an AHTF-funded property stops submitting annual certifications and no one follows up, the 15-year affordability covenant becomes unenforceable in practice even if it remains on paper. The compliance overreach research (`G2_risks_compliance_overreach.md`) rightly warns against tools that prematurely label properties "non-compliant" — but the equity risk of the *opposite* failure is equally severe: tools that fail to detect noncompliance allow affordable units to silently exit the restricted stock.

**Compliance Failures Concentrate in the Neighborhoods That Can Least Afford Them**
The research corpus does not yet map compliance failure rates by neighborhood. But the structural conditions are clear: affordable housing investments are concentrated in lower-income neighborhoods, and the CHAS data shows these same areas have the highest housing cost burden (`D4_data_hud_rental.md`). If compliance monitoring is weakest where it matters most — because staff capacity is thin, systems are fragmented, and self-reported data goes unverified — then the neighborhoods with the most publicly funded affordable housing are also the neighborhoods most vulnerable to affordability erosion.

**The Self-Reporting Model Favors Well-Resourced Developers**
Large developers with property management software like Yardi can generate compliant reports efficiently (`B2_users_housing_staff.md`). Smaller, community-based developers — often the ones building in the neighborhoods that need affordable housing most — may lack the administrative capacity to navigate staggered deadlines, PDF submission requirements, and complex HUD AMI calculations across three separate programs. A compliance system that penalizes paperwork failures rather than actual affordability violations creates a regressive equity dynamic: the developers most aligned with community needs face the highest administrative burden.

**The Monitoring Gap Grows With Every Funded Unit**
Every new AHTF award adds 15 years of monitoring obligation. With 1,400+ units funded in FY2024-25 alone, the compliance pipeline is expanding far faster than the staff and systems monitoring it (`A1_problem_landscape_housing_compliance.md`). The practical result is declining monitoring intensity per unit over time — meaning the most recently funded properties (the ones deepest into underserved neighborhoods, per the AHTF's 30% AMI set-aside requirement) will receive the least oversight. Without a scalable compliance infrastructure, the City's own equity-targeting policy is undermined by its inability to enforce it.
