# Pain Point Research — Neighborhood Development Discovery

**Pillar:** Thriving Neighborhoods
**Problem Statement:** Make it easier for residents to find and understand development proposals near them so they can engage earlier in the planning process.
**Applies to:** RVA Plotlines, RVA Development Tracker, SIMBY
**Research Date:** April 1, 2026

**Evidence sources from existing corpus:**
- `A2_problem_landscape_development_transparency.md` — Transparency frameworks and data quality gaps (international lens)
- `A4_problem_landscape_root_causes.md` — Richmond system fragmentation and root causes
- `A5_problem_landscape_neighborhood_change.md` — Neighborhood change drivers, displacement, and early-warning indicators
- `B1_users_residents_development.md` — Richmond resident personas and discovery friction
- `B3_users_planning_commission.md` — Planning Commission staff workflow and notification channels
- `B5_users_digital_equity.md` — Digital divide and federal program terminations
- `G3_risks_inclusion.md` — Inclusion risks for Richmond development transparency tools

---

## Pain Points by JTBD

### Job 1 — The Resident Who Sees Construction and Can't Find Answers

**P1.1: Three Systems, Zero Cross-Links**
Richmond's development information is split across Legistar (legislative agendas and votes), EnerGov (permits and inspections), and ArcGIS GIS tools (maps and parcel data) — with no shared identifiers connecting them. A resident looking at a Planning Commission agenda in Legistar cannot click through to see the architectural plans in EnerGov or the neighborhood context in the GIS portal. There is no single address-based entry point that shows case status, zoning impacts, and upcoming meeting dates together (`A4_problem_landscape_root_causes.md`).

This fragmentation forces residents to act as their own data integrators. The systems were designed for internal workflows — Legistar for the City Clerk, EnerGov for applicants, GIS for planners — not for residents trying to answer "What is being built near me?" (`A4_problem_landscape_root_causes.md`, `B1_users_residents_development.md`).

**P1.2: The 150-Foot Notice Cliff**
Richmond's legal notification for Special Use Permits and rezonings is mailed only to property owners within 150 feet of the subject property. This radius is too small to capture the true sphere of neighborhood impact — traffic, density, shadow, and parking effects extend well beyond one lot. Because notices go to property owners (not occupants), renters never receive mail. A resident living two blocks away who will face increased traffic from a 200-unit project receives no official notification at all (`B1_users_residents_development.md`, `B3_users_planning_commission.md`).

The other statutory channels — a physical sign on the property (often missed by drivers and pedestrians) and a newspaper advertisement (in a medium with rapidly declining readership) — do not fill this gap (`B3_users_planning_commission.md`).

**P1.3: Compressed Timelines Leave No Room for Late Discovery**
Once an ordinance is introduced to City Council, a public hearing is typically scheduled just 30 days later, with the Planning Commission meeting one week prior. The full approval process runs 120 to 180 days, but the window for meaningful public input is much shorter. If a resident discovers a proposal after the Planning Commission has already voted, their ability to influence the outcome is severely diminished (`B1_users_residents_development.md`, `B3_users_planning_commission.md`).

**P1.4: Mobile-Hostile Documents Block Discovery at the Moment of Need**
Residents attempting to learn about proposals on their smartphones — the primary device for many Richmonders — face significant barriers. Legistar agenda packets often exceed 100 pages. Richmond's ArcGIS Parcel Mapper requires clicking exactly inside a parcel boundary; tapping in the right-of-way returns no results. Residents have explicitly complained that they "need a bigger monitor" for rezoning map PDFs. These aren't minor UX issues — they are functional barriers that prevent discovery for anyone without a desktop computer and broadband (`B1_users_residents_development.md`).

**P1.5: Addresses Are Buried in Unstructured Text**
The Legistar API does not have a dedicated address field for legislative matters. Project locations are embedded in `MatterTitle` strings (e.g., "To rezone the property known as..." or "a portion of right-of-way known as East Cary Street"). There is no reliable way to search "What's happening at 1234 Main Street?" without parsing addresses from free text and cross-referencing with the GIS parcel layer. This is the core technical barrier to building an address-based discovery tool (`A4_problem_landscape_root_causes.md`).

---

### Job 2 — The Excluded Resident Who Can't Access the Process at All

**P2.1: Language Barriers Lock Residents Out of Complex Planning Decisions**
Richmond's planning documents, Legistar portal, ArcGIS tools, and all statutory notifications (mail, signage, newspaper ads) are in English. The City's Language Access Plan guarantees free interpreter services for in-person and phone interactions, but this guarantee does not extend to the digital platforms where development information is published. Spanish is the primary non-English language (71.57% of Richmond's Limited English Proficiency population), but no planning interface is natively available in Spanish (`G3_risks_inclusion.md`).

The problem goes beyond translation. Planning jargon — "Special Use Permit," "by-right development," "Board of Zoning Appeals," "R-63 zoning district" — requires cultural and procedural context, not just word-for-word translation. A tool that renders English zoning jargon into Spanish zoning jargon has not made the process accessible (`B1_users_residents_development.md`, `G3_risks_inclusion.md`).

**P2.2: The Digital Divide Is a Participation Divide**
Richmond City Council formally declared equal access to high-speed gigabit internet a "public necessity," acknowledging that market failures have excluded lower-income communities — particularly Black and Brown families — from digital society (`G3_risks_inclusion.md`). Approximately 13.8% of Richmond households lack broadband internet subscriptions. The federal Affordable Connectivity Program ended in June 2024, and the Digital Equity Act grants were terminated in May 2025, removing the primary subsidy and capacity-building pipelines for low-income households (`B5_users_digital_equity.md`).

For residents who are smartphone-only with cellular data, web-heavy civic platforms are functionally inaccessible. Americans earning less than $30,000 send and receive roughly twice as many texts as those earning over $75,000 — yet no SMS-based channel exists for Richmond development notifications (`G3_risks_inclusion.md`).

**P2.3: Renters Bear Displacement Risk but Have the Least Visibility**
In neighborhoods undergoing rapid change — Jackson Ward (where mid-century highway construction displaced 10% of the city's Black population), Church Hill, and the East End — renters are most vulnerable to displacement from development. Yet they are systematically excluded from official notification channels that target property owners. Renters need specific alerts about how zoning changes might affect their building's allowed use and their housing security, but no current system provides this (`B1_users_residents_development.md`, `A5_problem_landscape_neighborhood_change.md`).

National research confirms this pattern: 23% of displaced households in Philadelphia moved to neighborhoods with 15% higher poverty rates. Cities with inclusionary zoning saw 7% lower displacement rates, but only when residents were aware of and could engage with the process early (`A5_problem_landscape_neighborhood_change.md`).

**P2.4: Trust Barriers Compound Technical Barriers**
For immigrant communities — particularly undocumented residents — interacting with any government-affiliated system carries perceived risk. A development tracker that requires account creation, location data, or personal information will be avoided by the residents who face the highest displacement risk. This is not a hypothetical concern; Census undercounting in immigrant neighborhoods demonstrates the pattern. Trust must be designed in from the start through low-barrier access (no accounts, no tracking), transparent data sourcing, and partnership with trusted community organizations (`G3_risks_inclusion.md`).

---

### Job 3 — The Planning Staff Who Only Hear from Insiders

**P3.1: Staff Bandwidth Is Structurally Consumed by Technical Processing**
A typical Richmond City Planner allocates 60% of their time to reviewing land use applications and preparing agency comments, 20% to assisting the Planning Commission with technical expertise and reports, and only 5% to communicating with the community. This is not a staffing failure — it reflects the genuine complexity of multi-agency review (Public Works, Utilities, Fire, and others each get 30 days to comment). The result is that proactive community engagement is structurally impossible under current workloads (`B3_users_planning_commission.md`).

Any proposed transparency tool that requires staff to manually upload data, manage subscriber lists, write summaries, or moderate comments will be rejected. The tool must be 100% automated — pulling from existing Legistar and GIS endpoints — with zero additional staff burden (`B3_users_planning_commission.md`).

**P3.2: High Outreach Volume Does Not Equal Comprehension**
The Code Refresh zoning overhaul demonstrates the limits of traditional outreach. Despite the City hosting over 94 community outreach events, deploying pop-ups, and forming a Zoning Advisory Council, residents at civic league meetings reported feeling "forced" into rezoning and unaware of the changes. A City Councilor proposed a new 18-member citizen commission in response to public frustration. The lesson: distributing more information through more events does not solve the comprehension problem when the information itself is inaccessible (`B3_users_planning_commission.md`).

**P3.3: Legal Notice Channels Produce Unrepresentative Input**
The three statutory notification channels — 150-foot mailing, property signage, and newspaper ads — systematically over-represent property owners, English speakers, and residents with flexible schedules. Planning Commission hearings are consequently dominated by repeat participants from neighborhood associations, development firms, and legal practices. The Commission makes decisions affecting entire neighborhoods based on input from a narrow, non-representative slice of the community. Staff are aware of this gap but lack the tools or bandwidth to close it (`B3_users_planning_commission.md`, `G3_risks_inclusion.md`).

**P3.4: No Public Feedback on Whether Outreach Is Working**
Staff have no metrics on who sees development proposals, who understands them, and who is structurally excluded. There is no published analysis of public hearing attendance demographics, comment source geography, or whether the 150-foot radius correlates with meaningful awareness. Without measurement, the City cannot identify which neighborhoods are underserved or calibrate outreach accordingly (`B3_users_planning_commission.md`).

---

## Cross-Cutting Equity Dimension

### "Homeowner Capture" Is the Default Outcome

A web-only, English-only development tracker will structurally replicate the existing inequity. Research on online political participation shows that only 10% of adults earning $20,000-$39,999 participate in two or more online political activities per year, compared to 35% of adults earning $100,000+ (`G3_risks_inclusion.md`). A desktop-first web tool will systematically overrepresent higher-income, English-speaking homeowners — the residents who already navigate the system effectively.

This is not a theoretical concern. It is the documented failure mode for civic tech transparency tools nationally. Citygram's geographic subscription model failed to account for who had the digital access and civic literacy to sign up. Community boards in New York City found that their data was biased toward self-selecting, higher-resource participants (`G3_risks_inclusion.md`).

### Richmond's History Demands Intentional Design

Richmond's neighborhoods carry the legacy of exclusionary zoning and urban renewal. In Jackson Ward, highway construction displaced 10% of the city's Black population. Today, as the city plans the transformation of Gilpin Court through a HUD Choice Neighborhoods grant, trust must be actively earned — not assumed (`B1_users_residents_development.md`). A tool that makes development information more accessible only to the residents who already have access will deepen rather than close the civic participation gap.

### What Equitable Design Requires

Based on the research corpus, an equitable development discovery tool for Richmond must:

1. **Work without broadband.** SMS-based lookup and alerts reach residents who text but cannot load map-heavy web applications (`G3_risks_inclusion.md`).
2. **Reach renters, not just owners.** Notification by building address (not property deed record) and printable door-hanger assets for multifamily buildings bypass the owner-only mailing system (`G3_risks_inclusion.md`, `B1_users_residents_development.md`).
3. **Provide native-language content.** At minimum, Spanish UI at launch, with interpreter routing for additional languages per the City's Language Access Plan (`G3_risks_inclusion.md`).
4. **Require no accounts or personal data.** Low-barrier access (search by address, no login) reduces trust barriers for immigrant communities (`G3_risks_inclusion.md`).
5. **Measure who is reached and who is missing.** Track engagement by ZIP code, renter status, language, and device type. Compare coverage against eviction filing hotspots and broadband gaps. Deploy offline outreach where digital engagement lags (`G3_risks_inclusion.md`).
6. **Translate process, not just words.** Plain-language summaries at a 6th-grade reading level that explain what a proposal means for a specific block — not just what it says in planning jargon (`B1_users_residents_development.md`).
