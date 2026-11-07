# JTBD Analysis — Affordable Housing Compliance Monitoring

**Pillar:** Thriving Neighborhoods
**Problem Statement (verbatim):** Affordable Housing Compliance Monitoring — Help City staff track whether publicly funded affordable housing stays affordable over time.
**Applies to:** Affordable Housing Compliance Dash

---

## Jobs To Be Done

### Job 1 — The Compliance Analyst Managing a Growing Portfolio With No Unified Tracker

> "When I (an HCD compliance analyst) am managing a growing portfolio of AHTF, AHTEP, and EAHP properties approaching their annual certification deadlines — January 15 for AHTF, November 1 for AHTEP — and my tracking is spread across EnerGov, OneDrive uploads, and email threads with no unified dashboard showing what's due, what's overdue, and what's at risk, I want to see every property's compliance status, upcoming deadlines, and outstanding documentation gaps in one place, so I can prioritize my review queue and catch missed certifications before they become audit findings."

**Current workaround:** Toggle between EnerGov for AHTEP applications, OneDrive links for EAHP submissions, and email for AHTF annual certifications. Maintain personal spreadsheets to track deadlines. Rely on memory and calendar reminders for staggered due dates across programs. Manually cross-reference HUD AMI/FMR tables against self-reported rent and income data in PDF submissions.
**Pain:** With AHTF alone funding 822 units in FY2024 and 580 in FY2025 — each carrying 15 years of monitoring obligations — the compliance workload is growing faster than staff capacity. The 2026 City audit found that staff turnover contributed to policies not being verified as implemented (`A1_problem_landscape_housing_compliance.md`). There is no system-of-record that survives a staff transition.

### Job 2 — The HCD Director Who Needs to Report Portfolio Status to City Council

> "When I (the HCD Director or senior staff member) need to brief City Council on the state of the affordable housing portfolio — how many units are compliant, how many certifications are overdue, which developers have recurring problems, and whether the new AHTF ordinance is delivering results — and the data I need is scattered across EnerGov, OneDrive, email, and the Assessor's office with no way to generate a roll-up, I want to pull a reliable portfolio-wide status report with compliance rates, risk concentrations, and trend data, so I can demonstrate program accountability and justify the 2.5% real estate tax dedication to Council."

**Current workaround:** Ask individual analysts to compile spreadsheets manually. Aggregate numbers from memory and fragmented records. Present incomplete data to Council with caveats. Rely on anecdotal knowledge about which developers are problematic.
**Pain:** The 2026 audit by Riad Ali found the City failed to follow its own funding rules, lacked documented implementation plans, and left $2.4M untransferred since 2022 (`A1_problem_landscape_housing_compliance.md`). Ordinance 2026-045 now dedicates 2.5% of real estate tax revenue to the AHTF and requires a quadrennial performance evaluation including units created, preserved, and affordability levels maintained (`C3_services_housing_programs.md`). Without aggregated compliance data, the City cannot satisfy this reporting requirement.

### Job 3 — The City Auditor Verifying That Public Investments Delivered Promised Affordability

> "When I (a City Auditor or Inspector General) need to verify that publicly funded housing investments are actually delivering the affordability commitments they promised — that AHTF loans produced units at the right AMI levels, that AHTEP exemptions are going to properties with qualifying rents, and that EAHP grants reached completion — but there is no auditable trail connecting Council-approved awards in Legistar to unit-level compliance records, I want to trace the chain from funding authorization to property-level outcomes with documented evidence at each step, so I can determine whether public dollars are achieving their intended purpose and identify systemic control weaknesses."

**Current workaround:** Request records from HCD manually. Cross-reference Legistar ordinances with whatever documentation HCD can produce. Attempt to reconcile the Assessor's property records with AHTEP exemption claims. Accept incomplete evidence chains due to data fragmentation.
**Pain:** The 2026 audit explicitly found that "key requirements were unclear or not adhered to, in part due to the absence of a documented implementation plan" and that the City never set up a separate AHTF accounting fund until December 2025 — three years after relevant ordinances passed (`A1_problem_landscape_housing_compliance.md`). If upstream financial flows lack traceability, downstream unit-level compliance is likely suffering the same weakness. Verification relies on self-reported tenant income and rent with no automated cross-checks (`A1_problem_landscape_housing_compliance.md`).

---

## Open Questions

### Data Questions
1. What data fields does EnerGov actually store for AHTEP applications — does it track unit counts, AMI tiers, rent levels, or just application status and fees?
2. Is the City Assessor's property data accessible via API or bulk export, or only through manual lookups and the data request process described on rva.gov?
3. Which HUD datasets are most useful for automated rent-limit validation — FMR (metro-wide, updated annually Oct 1) or Small Area FMRs (ZIP-level)? What about the delayed FY2026 Income Limits (pushed to May 1, 2026)?
4. What is the actual count of properties currently under active AHTF, AHTEP, and EAHP compliance obligations? The research estimates 1,400+ AHTF units from FY2024-25 alone, but the total monitored portfolio is unknown.
5. Does HCD maintain any internal spreadsheet or database that functions as a de facto compliance registry, even if informal?
6. Can Legistar data reliably map Council-approved AHTF awards to specific parcels, or are parcel identifiers buried in PDF attachments that require manual extraction?
7. What HUD datasets beyond AMI/FMR are relevant — LIHTC property-level data, NHPD preservation database, CHAS housing needs data?

### User Questions
8. How many HCD staff members currently manage compliance monitoring across all three programs? The research suggests the team is small but does not give a headcount.
9. What is the current end-to-end workflow for processing a single AHTF annual certification — from reminder to review to sign-off? How long does one property take?
10. Do compliance analysts use any standardized forms or checklists, or does the review process vary by analyst and program?
11. How does the Assessor's office coordinate with HCD on AHTEP — is the handoff for Base Value Reports and Final Inspections tracked in a shared system or via email?

### Integration Questions
12. Does Richmond's EnerGov instance expose any APIs or support scheduled data exports, or is it a closed portal with no external integration capability?
13. What format does the Assessor's office use for property data — is it compatible with parcel IDs in other City systems like GeoHub?
14. Is Legistar data useful for tracking ordinance-backed AHTF awards and their compliance terms, or are the financial details too deeply buried in PDF attachments to be machine-readable?
15. Could Virginia Housing's HDS NextGen/WTCMS compliance data for LIHTC properties be ingested to reduce duplicate monitoring for properties that receive both state and local funds?

### Equity Questions
16. Which Richmond neighborhoods have the highest concentration of AHTF/AHTEP/EAHP-funded affordable housing? Are these the same neighborhoods with the highest cost burden per CHAS data?
17. Are compliance failures — missed certifications, lapsed exemptions, enforcement gaps — concentrated in specific neighborhoods or among specific developers?
18. Who bears the cost when an AHTEP exemption lapses because the owner missed the November 1 renewal — the owner, the tenants, or both? What happens to tenants if affordability restrictions expire?
19. Does the current self-reporting model create a systematic equity gap where well-resourced developers maintain compliance easily while smaller, community-based developers struggle with paperwork?

### Prior Art Questions
20. What comparable municipal compliance monitoring tools exist nationally — Denver's Affordable Housing Portal, San Francisco's MOHCD portfolio dataset, Chicago's ARO dashboard, LA's covenant registry?
21. What did the February 2026 City Auditor report specifically recommend regarding compliance infrastructure, beyond the financial findings about untransferred funds?
22. Has any city successfully built a compliance monitoring dashboard during a hackathon or civic tech sprint that was later adopted by government?
23. Does Virginia Housing's compliance monitoring system (HDS NextGen/WTCMS with March 1 tenant validation deadline) provide a model Richmond could adapt for local programs?

---

## Answered Questions (Parallel AI Research, April 2026)

### Data Questions

**Q1. What data fields does EnerGov actually store for AHTEP applications?**
`[Partial]` EnerGov likely stores unit counts, AMI tiers for restricted units (e.g., up to 80% AMI), tenant income verification, and application/renewal status over time. However, the specific data schema is not publicly documented — fields like `unit_count_80_ami` or `rent_level` are inferred from program rules, not confirmed from the system itself. Annual renewal applications are required, confirming the system tracks compliance status over time.
Source: `hc_q1_system_data.md` — Energov Ahtep Data Fields

**Q2. Is the City Assessor's property data accessible via API or bulk export?**
`[Confirmed]` Yes, both. The Assessor's parcel data is exposed via the Richmond GeoHub ArcGIS REST API for programmatic access. A bulk Public Data Set is also available for free download in Excel format, updated monthly, containing detailed information on every parcel (address, legal description, land/building characteristics, ownership, assessment history). Manual lookup is also available at rva.gov/assessor-real-estate/property-search.
Source: `hc_q1_system_data.md` — Assessor Property Data Accessibility, Data Accessibility Overview

**Q3. Which HUD datasets are most useful for automated rent-limit validation?**
`[Confirmed]` For general metro-level validation, Fair Market Rents (FMR) are recommended. Small Area FMRs (SAFMRs) offer ZIP-level precision, but Richmond is **not** a mandated SAFMR area. HUD provides API access for both FMR and Income Limits datasets. FY2026 Income Limits release is confirmed for May 2026. These datasets have clear, predictable update schedules.
Source: `hc_q1_system_data.md` — Hud Dataset Utility And Schedule

**Q4. What is the actual count of properties under active compliance obligations?**
`[Partial]` The City does not publish a consolidated count of properties under active AHTF, AHTEP, and EAHP compliance obligations. Program documents describe funding criteria and specific awards but do not provide a citywide active inventory. An official count would require a direct query to city departments or a FOIA request. The JTBD's estimate of 1,400+ AHTF units from FY2024-25 remains the best available proxy.
Source: `hc_q1_system_data.md` — Active Compliance Property Count, Public Database Of Subsidized Units

**Q5. Does HCD maintain any internal spreadsheet or database as a de facto compliance registry?**
`[Still Unknown]` The research confirmed the city relies on "labor-intensive manual processes" and that the OCA audit recommended formalizing policies and data sources, which strongly implies an informal tracking approach. However, no research source confirmed or denied the existence of a specific internal spreadsheet or database. The EnerGov portal, OneDrive, and email threads remain the only documented tools.
Source: `hc_q2_staffing_equity.md` — Hcd Staffing For Compliance (indirect)

**Q6. Can Legistar data reliably map Council-approved AHTF awards to specific parcels?**
`[Confirmed]` No. Direct automated mapping is not possible. Parcel identifiers are buried in PDF attachments to legislative records, not in structured metadata fields. Linking an AHTF award to a specific parcel requires manual review of supporting documents. This process is "not reliable for automated extraction from structured Legistar data."
Source: `hc_q1_system_data.md` — Legistar To Parcel Mapping Reliability

**Q7. What HUD datasets beyond AMI/FMR are relevant?**
`[Confirmed]` Three additional datasets are relevant: (1) Low-Income Housing Tax Credit (LIHTC) Property-Level Data for cross-referencing tax-credit property compliance; (2) Comprehensive Housing Affordability Strategy (CHAS) data for housing needs and eligibility context; (3) National Housing Preservation Database (NHPD) for tracking federally assisted properties in Richmond. All are available via HUD download or API.
Source: `hc_q1_system_data.md` — Other Relevant Hud Datasets; `hc_q3_prior_art.md` — Nhpd Overview

### User Questions

**Q8. How many HCD staff members currently manage compliance monitoring?**
`[Partial]` The staffing level is not published. Neither HCD public documents nor the OCA 2026 special review specify the number of compliance FTEs. The primary challenge is confirmed as reliance on "labor-intensive manual processes" with the OCA recommending formal policies, clearer roles, and improved monitoring — all indicators of a system under strain with insufficient capacity.
Source: `hc_q2_staffing_equity.md` — Hcd Staffing For Compliance

**Q9. What is the current end-to-end workflow for processing a single AHTF annual certification?**
`[Partial]` The process is self-reporting: AHTF recipients must submit annual certifications of compliance by **January 15** each year throughout the 15-year affordability period (starting at construction completion). The certification must be in a form acceptable to HCD. However, the internal workflow (reminder cadence, review queue structure, sign-off roles) and processing time are not published.
Source: `hc_q2_staffing_equity.md` — Ahtf Annual Certification Workflow

**Q10. Do compliance analysts use standardized forms or checklists?**
`[Still Unknown]` The research confirms annual certifications must be in a form "acceptable to HCD" but does not reveal whether standardized forms or checklists exist. The OCA audit's recommendation to develop "formal policies and procedures that define roles and responsibilities, process steps, timing, definitions, data sources, and monitoring" strongly suggests that such standardization does not currently exist.
Source: `hc_q2_staffing_equity.md` — Ahtf Annual Certification Workflow (indirect)

**Q11. How does the Assessor's office coordinate with HCD on AHTEP?**
`[Partial]` The coordination process is documented in detail: (1) Applicant submits to HCD → (2) HCD reviews eligibility → (3) HCD notifies Assessor for Base Value inspection → (4) Assessor inspects → (5) Base Value Report within 10 business days → (6) Final inspection after Certificate of Occupancy → (7) HCD Director grants exemption effective Jan 1. Applicants use the EnerGov Self-Service portal, but **it is not confirmed whether HCD and the Assessor's Office share a single case-management system** for tracking the handoff between departments.
Source: `hc_q2_staffing_equity.md` — Assessor And Hcd Coordination On Ahtep

### Integration Questions

**Q12. Does Richmond's EnerGov instance expose APIs or support data exports?**
`[Confirmed]` No. EnerGov access is limited to manual lookups on its public portal. There is no public documentation on the database schema, no bulk data export option, and no API access. This is a closed system for external integration purposes.
Source: `hc_q1_system_data.md` — Data Accessibility Overview, Data Systems And Portals

**Q13. What format does the Assessor's office use for property data — is it compatible with other City systems?**
`[Partial]` The Assessor publishes monthly Excel bulk exports and exposes data via the Richmond GeoHub ArcGIS REST API using standard parcel layers. The GeoHub parcels dataset is publicly available at richmond-geo-hub-cor.hub.arcgis.com. Parcel IDs are the common key across the Assessor's data and GeoHub, suggesting compatibility. However, explicit confirmation of field-level compatibility with EnerGov or Legistar is not available since those systems don't expose structured parcel data.
Source: `hc_q1_system_data.md` — Data Systems And Portals, Data Accessibility Overview

**Q14. Is Legistar data useful for tracking AHTF awards and compliance terms?**
`[Confirmed]` Only partially useful. Legistar records document ordinance and appropriation details for AHTF awards, but financial details and parcel identifiers are deeply buried in PDF attachments. This data is not machine-readable at scale. Structured metadata contains the legislative action but not the property-level compliance terms.
Source: `hc_q1_system_data.md` — Legistar To Parcel Mapping Reliability, Data Systems And Portals

**Q15. Could Virginia Housing's HDS NextGen/WTCMS data be ingested to reduce duplicate monitoring?**
`[Partial]` Virginia Housing's WTCMS facilitates electronic tenant certification submissions, centralized monitoring, and deadline-driven compliance cycles for LIHTC properties statewide. It is a relevant reference model for Richmond. However, the research did not confirm whether WTCMS data is available for local government ingestion or whether an integration pathway exists. The system's features (standardized data formats, automated validation, owner/agent submission portals) are documented as adaptable patterns.
Source: `hc_q3_prior_art.md` — Virginia Housing System Analysis

### Equity Questions

**Q16. Which neighborhoods have the highest concentration of AHTF/AHTEP/EAHP housing?**
`[Partial]` No consolidated citywide data exists, but identified AHTF-funded project locations include: Manchester (Saint Francis Home, 70 units), Northside/Brookland Park (Brookland Park Apartments/Highland Terrace, 66 units), Jackson Ward (affordable homeownership), and Cameo Street (67 units) — totaling at least 203 identified units. A 2021 map organized AHTF projects by Council District, but current data is not consolidated. No cross-reference with CHAS cost burden data was found.
Source: `hc_q2_staffing_equity.md` — Geographic Concentration Of Affordable Housing

**Q17. Are compliance failures concentrated in specific neighborhoods or among specific developers?**
`[Partial]` No public dataset demonstrates systemic compliance failures by developer type or neighborhood. The one documented project-specific failure is Heights at Brady Square (construction halted due to financial shortfalls). The OCA audit found systemic process weaknesses — "the City did not consistently implement the funding requirements" — rather than geographic or developer-specific patterns. The available evidence points to institutional process failures, not localized non-compliance.
Source: `hc_q2_staffing_equity.md` — Compliance Failure Patterns

**Q18. Who bears the cost when an AHTEP exemption lapses?**
`[Confirmed]` Primarily tenants. When an AHTEP exemption lapses or is terminated, affordability conditions cease to apply. Landlords may raise rents subject only to the Virginia Residential Landlord and Tenant Act (VRLTA), which requires 60-day written notice for landlords with >4 units (§55.1-1204(K)) but **Virginia has no rent control**. Tenants are protected from unlawful eviction (§§55.1-1245, 55.1-1252) but are otherwise vulnerable to significant rent increases and displacement.
Source: `hc_q2_staffing_equity.md` — Tenant Impact Of Ahtep Exemption Lapse, Virginia Tenant Protection Laws

**Q19. Does the self-reporting model create a systematic equity gap?**
`[Partial]` No formal study quantifies an equity gap, but evidence strongly suggests one exists. The city has acknowledged reliance on "labor-intensive manual processes." The OCA recommended formalizing procedures precisely because the current model lacks standardized structure. The research concludes that smaller, community-based developers lacking administrative staff and legal counsel are disproportionately burdened compared to larger firms — an inference from official acknowledgements and audit findings rather than a measured outcome.
Source: `hc_q2_staffing_equity.md` — Equity Analysis Of Self Reporting Model

### Prior Art Questions

**Q20. What comparable municipal compliance monitoring tools exist nationally?**
`[Confirmed]` Five systems documented in detail: (1) **Denver** — Affordable Housing Portal for annual covenant-restricted rental compliance with annual email-initiated reporting cycle; (2) **San Francisco** — MOHCD/OCII open dataset (34 columns, quarterly updates) and portfolio dashboard; (3) **Chicago** — ARO Dashboard (Tableau-based, geographic visualization); (4) **Los Angeles** — LAHD Land Use Covenants registry plus public Affordable & Accessible Housing Registry; (5) **Washington, DC** — Housing Insights (Code for DC civic data tool, open-source, comprehensive inventory of subsidized housing).
Source: `hc_q3_prior_art.md` — National Compliance Tool Profiles

**Q21. What did the February 2026 City Auditor report recommend regarding compliance infrastructure?**
`[Confirmed]` Eight recommendations, all high priority: (1) Legislative action to resolve ambiguous City Code §12-46; (2) Formal policies defining roles, responsibilities, process steps, timing, data sources, and monitoring; (3) Determine disposition of $2,472,307 in untransferred funds; (4) Formal quality review process for ordinances; (5) Enhanced oversight and transparency for ordinance implementation; (6) Maintain separate AHTF accounting fund (implemented Dec 2025 as Fund 0405); (7) Documented process to track financial transfers to completion; (8) Minimum operating reserve for Delinquent Tax Sales fund. The administration concurred with all recommendations.
Source: `hc_q3_prior_art.md` — Richmond Auditor Report Recommendations, Richmond Auditor Report Summary

**Q22. Has any city built a compliance dashboard during a hackathon that was later adopted?**
`[Confirmed]` No verified evidence exists. The closest case is DC's Housing Insights, which originated as a Code for DC civic data project. However, it was **not formally adopted** by DC government — it is operated externally and used by advocates and officials. No U.S. city was found to have adopted a compliance dashboard built during a hackathon.
Source: `hc_q3_prior_art.md` — Hackathon Dashboard Initiatives

**Q23. Does Virginia Housing's HDS NextGen/WTCMS provide a model Richmond could adapt?**
`[Partial]` Yes, as a structural model. WTCMS features relevant to Richmond include: electronic tenant certification submissions, centralized compliance portfolio management, owner/agent submission portals, and automated validation workflows. However, the "March 1 tenant data validation deadline" cited in the JTBD was **not verified** — no official Virginia Housing document was found publicly stating this deadline. The system remains a strong reference model for local adaptation, particularly its standardized data formats and deadline-driven compliance cycles.
Source: `hc_q3_prior_art.md` — Virginia Housing System Analysis

---

### Research Resolution Summary

| Status | Count | Key gaps |
|--------|-------|----------|
| `[Confirmed]` | 10 | — |
| `[Partial]` | 11 | HCD staffing headcount, active portfolio count, EnerGov schema details, neighborhood-level equity data, WTCMS integration pathway, inter-department system tracking |
| `[Still Unknown]` | 2 | Whether HCD maintains an internal compliance registry (Q5), whether analysts use standardized review forms (Q10) |

### Critical finding

The February 2026 City Auditor report (OCA 2026-07) is the single most important contextual document for hackathon teams. It confirms systemic failures: no documented implementation plan, no separate accounting fund until December 2025, $2.47M in untransferred funds since FY2022, and a mayoral concurrence to modernize away from "labor-intensive manual processes." Teams building a compliance dashboard are building exactly what the auditor recommended — a system of formal policies, defined data sources, and monitoring. The administration has already agreed this is needed; the question is execution, not buy-in.

### Critical data gap

No public registry of active compliance obligations exists. The city does not publish how many properties are currently monitored, under which programs, or at what AMI levels. Without this foundational inventory — even an approximate one — any dashboard prototype must either (a) generate a synthetic dataset from known AHTF awards in Legistar PDFs and AHTEP renewals in EnerGov, or (b) demonstrate the workflow against a realistic but fabricated dataset and document the FOIA/data request needed to populate it with real data. The Assessor's ArcGIS API and HUD datasets are accessible, but the city-specific compliance layer that connects funding commitments to property outcomes does not exist in any public, structured form.
