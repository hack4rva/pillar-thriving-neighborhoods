# JTBD Analysis — Neighborhood Development Discovery

**Pillar:** Thriving Neighborhoods
**Problem Statement (verbatim):** Neighborhood Development Discovery — Make it easier for residents to find and understand development proposals near them so they can engage earlier in the planning process.
**Applies to:** RVA Plotlines, RVA Development Tracker, SIMBY

---

## Jobs To Be Done

### Job 1 — The Resident Who Sees Construction and Can't Find Answers
> "When I (a Richmond homeowner or long-time renter) notice a demolition crew on the next block or hear through my civic association that a rezoning is planned near my home, I want to search my address and immediately see what has been filed, what it would change, and when the public hearing is, so I can understand the proposal's impact on my neighborhood and submit informed comments before the decision is made."

**Current workaround:** Ask neighbors or check Nextdoor. Search the Legistar portal for the Planning Commission calendar, download a 100+ page agenda PDF, and scroll through looking for a familiar street name. Try the ArcGIS Zoning Parcel Mapper on a phone and fail because it requires clicking exactly inside a parcel boundary. Call the Department of Planning and Development Review during business hours and hope to reach the assigned planner. If the resident lives beyond the 150-foot mailing radius, they may never receive official notice at all.

**Pain:** Richmond's development information is scattered across three unlinked systems — Legistar for legislative agendas, EnerGov for permits, and ArcGIS for maps — with no cross-referencing by address or parcel (`A4_problem_landscape_root_causes.md`). Mailed notices reach only property owners within 150 feet of a proposal, leaving most impacted neighbors uninformed (`B1_users_residents_development.md`, `B3_users_planning_commission.md`). The 120-to-180-day approval window is compressed by a 30-day hearing notice, meaning late discovery effectively equals no voice (`B3_users_planning_commission.md`).

### Job 2 — The Excluded Resident Who Can't Access the Process at All
> "When I (a non-English-speaking Richmond resident, or a resident without broadband access or a computer) live in a neighborhood undergoing rapid change — new construction, rising rents, unfamiliar signs posted on fences — I want to learn what is happening near my home in my own language and through a channel I can actually use, so I can understand whether my housing is at risk and participate in decisions that affect my family."

**Current workaround:** Rely on word-of-mouth from bilingual neighbors or community organizations. Attempt to parse English-language site signage that lists a case number and hearing date with no context. Attend a Planning Commission meeting and hope an interpreter is available. In many cases, simply do not engage.

**Pain:** Richmond's planning documents, Legistar portal, and ArcGIS tools are English-only and web-dependent (`G3_risks_inclusion.md`). The City's Language Access Plan guarantees free interpreter services, but this applies to in-person and phone interactions — not to the digital platforms where development information lives (`G3_risks_inclusion.md`). Legal notices are mailed to property owners, systematically excluding renters — who make up a disproportionate share of non-English-speaking and lower-income residents (`G3_risks_inclusion.md`, `B1_users_residents_development.md`). Residents earning under $30,000 text roughly twice as much as wealthier residents but have no SMS-based channel for development information (`G3_risks_inclusion.md`). Richmond City Council has formally declared broadband access a "public necessity," acknowledging that market failures exclude lower-income Black and Brown families from digital civic life (`G3_risks_inclusion.md`).

### Job 3 — The Planning Staff Who Only Hear from Insiders
> "When I (a City Planning Commission staff member or civic engagement coordinator) prepare for a public hearing on a rezoning or special use permit and receive comments from only a handful of well-resourced neighborhood association leaders, I want a broader and more representative cross-section of affected residents to have discovered the proposal and understood its implications, so the Commission's decisions reflect genuine community input rather than the narrow slice of residents who already know how to navigate the system."

**Current workaround:** Fulfill legal notification requirements (150-foot mailing, newspaper ad, site sign) and hope for broader awareness. Rely on applicants to conduct community outreach to civic associations as instructed on the application form. Answer individual phone calls from residents who learn about a case through informal channels. Spend 60% of staff time on application review and only 5% on community communication.

**Pain:** Staff bandwidth is structurally consumed by technical case processing — a typical city planner spends 60% of time reviewing applications and 20% assisting the Commission, leaving only 5% for community communication (`B3_users_planning_commission.md`). Despite 94+ outreach events during the Code Refresh, residents and councilors reported feeling uninformed, demonstrating that high outreach volume does not equal comprehension or reach (`B3_users_planning_commission.md`). Planning Commission meetings are dominated by repeat participants — often neighborhood association leaders, developers, and attorneys — while renters, non-English speakers, and residents outside the 150-foot radius are structurally absent (`G3_risks_inclusion.md`, `B1_users_residents_development.md`). Any new tool must be 100% automated with zero additional staff workload, pulling data from existing public feeds rather than requiring manual input (`B3_users_planning_commission.md`).

---

## Open Questions

### Data Questions
1. What is the confirmed API client slug for Richmond's Legistar instance — is `richmondva` stable and publicly accessible without a token?
2. How many total legislative matters exist in Richmond's Legistar, and what is the date range of the oldest records accessible via the API?
3. What is the actual update cadence of the GeoHub Development Tracker layer — the City says "updated periodically" but provides no SLA?
4. How accurate is geocoding when addresses are parsed from Legistar `MatterTitle` fields? What percentage of titles contain parseable addresses vs. descriptions like "a portion of right-of-way known as East Cary Street"?
5. Are the Special Use Permit, Plans of Development, and Board of Zoning Appeals overlay layers in ArcGIS accessible as standalone Feature Services with documented field schemas?
6. Does the Legistar API enforce CORS restrictions that would block browser-based fetches, and what are the effective rate limits before throttling?

### User Questions
7. Who currently attends Planning Commission public hearings — what is the demographic and geographic breakdown of commenters?
8. How do Richmond residents currently learn about development proposals? Is there any survey data on awareness channels (mail, signs, word-of-mouth, social media, Legistar)?
9. What percentage of public comments are submitted by repeat participants (e.g., neighborhood association leaders, developers, attorneys) vs. first-time commenters?
10. Do residents in historically impacted neighborhoods (Jackson Ward, Church Hill, East End) engage with development proposals at lower rates than citywide averages?

### Integration Questions
11. Can a third-party tool connect to the Legistar OData API and the ArcGIS REST API simultaneously to cross-link legislative items with map locations?
12. Does Richmond's EnerGov permit system expose any API or export mechanism that would allow linking building permit data to Legistar zoning cases?
13. Is there a maintained, machine-readable list of Richmond civic associations and their geographic boundaries that a notification tool could use for routing?
14. Would the City permit an external tool to link directly to Legistar agenda PDFs and staff reports, or are there access restrictions on hosted attachments?

### Equity Questions
15. What is the digital divide in Richmond by neighborhood — which census tracts have the lowest broadband penetration, and do those tracts overlap with high-development areas?
16. What languages are most spoken after English in Richmond's high-development corridors? Does the current planning notification infrastructure serve any of them?
17. What percentage of Richmond households are renters vs. owners in neighborhoods with active rezoning cases, given that legal notice only reaches property owners?
18. Are there existing community organizations (churches, tenant unions, immigrant service providers) that currently serve as informal information bridges for development proposals?

### Prior Art Questions
19. What happened to previous attempts to build development tracking tools for Richmond — has the City or Code for America brigade tried this before?
20. What distinguishes the tools that survive beyond a hackathon (Councilmatic, 2nd City Zoning) from the ones that die within months (Citygram forks, EveryBlock)?

---

## Answered Questions (Parallel AI Research, April 2026)

Research conducted via Parallel AI across three domains: system data and APIs, usage and equity, and prior art. Answers are tagged by confidence level.

### Data Questions

**1. What is the confirmed API client slug for Richmond's Legistar instance — is `richmondva` stable and publicly accessible without a token?**
`[Confirmed]` — The client slug is `richmondva`. The API is publicly accessible (`True`) and does not require a token (`False`). Base URL: `https://webapi.legistar.com/v1/richmondva/Matters`. No CORS restrictions enforced. Source: `dd_q1_system_data.md`

**2. How many total legislative matters exist in Richmond's Legistar, and what is the date range of the oldest records accessible via the API?**
`[Partial]` — The total count and oldest record date were not retrieved (require live API calls). The research confirms the methods — use `$count=true` and `$orderby=MatterIntroDate asc` — but did not execute them. Source: `dd_q1_system_data.md`

**3. What is the actual update cadence of the GeoHub Development Tracker layer — the City says "updated periodically" but provides no SLA?**
`[Partial]` — No formal SLA or documented update cadence exists. Updates are described as "as updated by data owners" (ad-hoc). The related Plans of Development dataset was last updated June 29, 2022, which is nearly four years stale. Source: `dd_q1_system_data.md`

**4. How accurate is geocoding when addresses are parsed from Legistar `MatterTitle` fields? What percentage of titles contain parseable addresses vs. descriptions like "a portion of right-of-way known as East Cary Street"?**
`[Still Unknown]` — None of the three research files addressed address parsing accuracy or MatterTitle field content analysis. This requires direct sampling of the Legistar API. Source: none

**5. Are the Special Use Permit, Plans of Development, and Board of Zoning Appeals overlay layers in ArcGIS accessible as standalone Feature Services with documented field schemas?**
`[Partial]` — Plans of Development has a confirmed REST endpoint at `https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/PlanOfDevelopment/FeatureServer/0`. SUP and BZA have ArcGIS Online item pages but direct REST endpoint URLs were not extracted — they must be accessed from the item page metadata. Field schemas were not documented. Source: `dd_q1_system_data.md`

**6. Does the Legistar API enforce CORS restrictions that would block browser-based fetches, and what are the effective rate limits before throttling?**
`[Partial]` — CORS restrictions are reported as not enforced (`False`), but this is not officially guaranteed by Granicus documentation. The primary limit is 1,000 items per response (requires `$top`/`$skip` pagination). Formal per-time-window rate limits are not publicly documented. Source: `dd_q1_system_data.md`

### User Questions

**7. Who currently attends Planning Commission public hearings — what is the demographic and geographic breakdown of commenters?**
`[Partial]` — No demographic or geographic data on Planning Commission commenters exists. The only proxy is Richmond 300 master plan survey data (1,030 respondents): 72% White, 20% Black/African American, 5% Latino. Age data was not collected. This proxy reflects a one-time citywide planning process (2018–2020), not routine quasi-judicial hearings. Source: `dd_q2_usage_equity.md`

**8. How do Richmond residents currently learn about development proposals? Is there any survey data on awareness channels?**
`[Partial]` — For Richmond 300: press releases, a 3,490-subscriber email list (30.5% avg open rate), social media (Facebook, Instagram), and in-person events. No equivalent survey data exists for routine development proposals before the Planning Commission. Source: `dd_q2_usage_equity.md`

**9. What percentage of public comments are submitted by repeat participants vs. first-time commenters?**
`[Partial]` — No data exists for Planning Commission hearings. For Richmond 300: 62% first-time participants in Community Consultation #1, dropping to 42% in Consultation #2. This suggests outreach fatigue but cannot be extrapolated to individual rezoning cases. Source: `dd_q2_usage_equity.md`

**10. Do residents in historically impacted neighborhoods (Jackson Ward, Church Hill, East End) engage with development proposals at lower rates than citywide averages?**
`[Still Unknown]` — The City conducted targeted outreach in these neighborhoods for Richmond 300 (events at MLK Middle School, 2nd Street Festival, meetings with Union Hill and Church Hill Civic Associations). However, no quantitative comparison of participation rates by neighborhood vs. citywide averages has been published. Source: `dd_q2_usage_equity.md`

### Integration Questions

**11. Can a third-party tool connect to the Legistar OData API and the ArcGIS REST API simultaneously to cross-link legislative items with map locations?**
`[Confirmed]` — Yes. This is technically feasible and has been done before. Councilmatic (DataMade/Chicago) routinely ingests Legistar data and adds ArcGIS map layers. The integration works by cross-referencing shared identifiers (addresses, parcel IDs) between the two APIs. Source: `dd_q3_prior_art.md`

**12. Does Richmond's EnerGov permit system expose any API or export mechanism that would allow linking building permit data to Legistar zoning cases?**
`[Confirmed]` — No. EnerGov does not expose a public API or data export. Access is limited to the web-based Citizen Self Service portal at `https://energov.richmondgov.com/EnerGov_Prod/selfservice`. The system does integrate ESRI map functionality internally, but this is not externally accessible. There is no documented EnerGov-to-Legistar integration. Source: `dd_q1_system_data.md`, `dd_q3_prior_art.md`

**13. Is there a maintained, machine-readable list of Richmond civic associations and their geographic boundaries that a notification tool could use for routing?**
`[Confirmed]` — Yes. The Richmond GeoHub publishes a "Civic Associations" feature service accessible via ArcGIS REST API and GeoJSON export at `https://richmond-geo-hub-cor.hub.arcgis.com/datasets/civic-associations`. This is the key dataset for building neighborhood-boundary notification features. Source: `dd_q3_prior_art.md`

**14. Would the City permit an external tool to link directly to Legistar agenda PDFs and staff reports, or are there access restrictions on hosted attachments?**
`[Still Unknown]` — None of the research files addressed attachment linking permissions or access restrictions on hosted Legistar documents. Source: none

### Equity Questions

**15. What is the digital divide in Richmond by neighborhood — which census tracts have the lowest broadband penetration, and do those tracts overlap with high-development areas?**
`[Still Unknown]` — The City has not published tract-level broadband penetration maps, and no overlay analysis with high-development areas exists in reviewed documents. City Council has declared high-speed internet a "public necessity," acknowledging the divide, but no granular data is available. Source: `dd_q2_usage_equity.md`

**16. What languages are most spoken after English in Richmond's high-development corridors? Does the current planning notification infrastructure serve any of them?**
`[Partial]` — Spanish is the only language explicitly served (in-office interpretation via OIRE staff; Richmond 300 included a Spanish-language session on the Southside). Other languages are available via a third-party contractor (United Language Group) but are not individually specified. No data exists on the most common non-English languages within high-development corridors specifically. Source: `dd_q2_usage_equity.md`

**17. What percentage of Richmond households are renters vs. owners in neighborhoods with active rezoning cases?**
`[Partial]` — Citywide: 59% renters, 41% owners (ACS data). A neighborhood-level breakdown tied to active rezoning cases has not been published. Given that legal notice goes only to property owners, this means ~59% of city households are structurally excluded from direct notification. Source: `dd_q2_usage_equity.md`

**18. Are there existing community organizations that currently serve as informal information bridges for development proposals?**
`[Confirmed]` — Yes. Confirmed organizations include: Union Hill Civic Association, Church Hill Civic Association, Richmond Tenants Union (citywide tenant advocacy), and multiple faith-based and ethnic community organizations engaged during Richmond 300 (Cedar Street Baptist, Latino Parade and Festival, Innovate Fulton). Source: `dd_q2_usage_equity.md`

### Prior Art Questions

**19. What happened to previous attempts to build development tracking tools for Richmond — has the City or Code for America brigade tried this before?**
`[Confirmed]` — No city-led development tracker exists. No Code for RVA project was found. However, a regional tracker does exist: the Richmond Regional Development Tracker, an ArcGIS Experience app built by PlanRVA and Richmond BizSense, covering major real estate projects across the region. BizSense also operates a separate commercial tracker. Source: `dd_q3_prior_art.md`

**20. What distinguishes the tools that survive beyond a hackathon (Councilmatic, 2nd City Zoning) from the ones that die within months (Citygram forks, EveryBlock)?**
`[Confirmed]` — Survivors share: (a) durable data pipelines connected to official, stable APIs like Legistar; (b) institutional stewardship or a dedicated maintainer (e.g., DataMade, Open City); (c) clearly defined scope addressing a real user demand; (d) robust deployment/hosting. Failures share: (a) lack of stable city-supported data feeds causing data drift; (b) no ongoing maintainers or sustainable funding model; (c) volunteer burnout. Source: `dd_q3_prior_art.md`

---

### Research Coverage Summary

| Status | Count | Key gaps |
|--------|-------|----------|
| `[Confirmed]` | 7 | — |
| `[Partial]` | 9 | Planning Commission demographics (proxy only), GeoHub update cadence (no SLA), SUP/BZA REST endpoints (not extracted), renter data by rezoning area (citywide only), language data by corridor (Spanish only) |
| `[Still Unknown]` | 4 | Legistar MatterTitle geocoding accuracy, neighborhood-level engagement rates, Legistar attachment linking permissions, tract-level broadband-vs-development overlap |

### Critical Finding

Richmond's data infrastructure is buildable — Legistar is open, ArcGIS provides civic association boundaries, and the Legistar-to-ArcGIS integration pattern is proven by Councilmatic. The technical path to an address-based development discovery tool is clear. The most important design constraint is that EnerGov (permits) has no public API, so the tool must work without permit data or solve for scraping.

### Critical Data Gap

No one tracks who participates in Planning Commission hearings. The City collects no demographic, geographic, or repeat-vs-first-time data on public commenters in its routine quasi-judicial process. This means teams cannot validate whether their tool is actually reaching underrepresented residents without building their own measurement. The 59% renter population is structurally invisible to the current notification system (mailed to property owners only), and no broadband-vs-development overlap data exists to target the digital divide.
