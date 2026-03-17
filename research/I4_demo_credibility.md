# Make It Real: Richmond-Grounded Credibility for Thriving Neighborhoods

## Executive Summary

In civic technology demonstrations, credibility is not a byproduct of good design; it is a deliberate product feature. Judges, City of Richmond staff, and community members approach prototypes with a verification mindset. They will cross-check claims against their lived experiences and institutional knowledge. If a prototype uses generic placeholders, vague impact metrics, or fictional personas, it immediately signals a lack of local understanding. Conversely, grounding the demo in verifiable Richmond data—such as exact HUD income limits, specific Richmond Redevelopment and Housing Authority (RRHA) unit counts, and real GRTC transit corridors—transforms skepticism into trust. 

This strategy outlines how to operationalize data assurance, defined by the Open Data Institute as the processes that increase confidence that data will meet a specific need [1]. By adopting federal open data standards for source transparency and update cadence, and by owning the limitations of the data presented, the Thriving Neighborhoods prototype will project institutional readiness and deep local empathy.

### Top 5 Credibility Builders for this Pillar
1. **Micro-source labels with deep links**: Tagging every metric with "from HUD" or "from RRHA" and linking directly to the source page.
2. **Hyper-local specificity**: Using real addresses (e.g., 2506 Phaup St) and exact unit counts for specific communities like Gilpin Court or Fairfield Court.
3. **Visible data freshness**: Displaying "Last updated" dates and update frequencies (e.g., "Annual") using open data standards.
4. **Owned limitations**: Explicitly stating what the tool *does not* do or cover, which preempts "gotcha" questions from subject matter experts.
5. **Contextualized user stories**: Grounding resident narratives in actual, funded city projects (e.g., the new GRTC downtown transfer station at 8th & Leigh).

### Top 5 Credibility Killers to Avoid
1. **"Lorem Ipsum" and mock data**: Using placeholder text or generic map pins instantly destroys the illusion of a functional civic tool.
2. **Vague financial claims**: Stating a project is "affordable" without tying it to the exact FY2025 HUD Area Median Income limits.
3. **Fictional, placeless personas**: Opening with "Meet Jane, a generic city resident" instead of "Meet a Gilpin Court parent."
4. **Orphaned statistics**: Displaying impressive numbers without a clear, clickable path back to the official source.
5. **Hiding past failures or gaps**: Glossing over known community setbacks rather than acknowledging them as part of the ongoing development context.

## Why Credibility Is the Deciding Metric in Civic Demos

### The Verification Mindset of Judges, Staff, and Residents
Civic stakeholders evaluate tools based on their alignment with reality. City staff and community advocates can and will verify claims in seconds. They know the local landscape—they know which grants were won, which were lost, and exactly where transit hubs are being built. A demo must minimize the effort required to validate any element. If a user cannot immediately see where a number came from and verify its accuracy, the tool reads as marketing rather than a reliable civic utility. The U.S. Digital Service Playbook emphasizes using language that is familiar to the user and maintaining consistent design to build this trust [2].

### Credibility North Stars
To survive audit-level scrutiny during a demo, the prototype must be guided by strict credibility principles: verifiable identifiers, local specificity, visible freshness, owned limitations, and official links. Every data point must be treated as a claim requiring evidence.

## Use Real Richmond Data, Names, and Addresses

### RRHA Communities and Unit Counts Validate Neighborhood Focus
Using real neighborhood names and exact operational data proves the team did the work. The Richmond Redevelopment and Housing Authority (RRHA) manages specific, quantifiable communities. For example, Gilpin Court contains exactly 781 units, while Fairfield Court contains 447 units and operates out of an office at 2506 Phaup St, Richmond, VA 23223 [3]. Using these exact figures and addresses in the prototype—rather than generic "East End Housing"—anchors the tool in reality. 

### Funding and Income Data That Set the Ground Truth
Precision beats platitudes when discussing civic funding. Vague claims about "millions in funding" should be replaced with exact figures from official sources. For instance, the City of Richmond's Notice of Funding Availability (NOFA) anticipated specific federal allocations: $4,462,031 for CDBG; $1,455,440 for HOME; $376,954 for ESG; and $1,186,209 for HOPWA, alongside $2.9 million for the Affordable Housing Trust Fund (AHTF) [4]. 

Similarly, any mention of "affordable housing" must be gated behind exact income limits. The FY2025 HUD Adjusted HOME Income Limits for the Richmond, VA HUD Metro FMR Area dictate that the 30% limit is $23,850 for a 1-person household, $27,250 for 2 persons, $30,650 for 3 persons, and $34,050 for 4 persons [5]. 

#### Core Local Datasets to Ground the Demo

| Data Type | Example Value | Source Label | Official Link Target |
| :--- | :--- | :--- | :--- |
| **Neighborhood Units** | Gilpin Court: 781 units; Fairfield Court: 447 units [3] | `from RRHA` | rrha.com/housing/communities |
| **City Funding** | CDBG: $4,462,031; AHTF: $2.9M [4] | `from City NOFA` | rva.gov NOFA guidelines PDF |
| **Income Limits** | FY2025 30% HAMFI (4-person): $34,050 [5] | `from HUDUSER` | huduser.gov FY2025 Income Limits PDF |
| **Federal Allocations** | FY2025 CPD Allocations [6] | `from HUD Exchange` | hudexchange.info Awards & Allocations |

*Takeaway: Hardcoding these exact figures into the prototype's default state ensures that the first thing judges see is a reflection of their actual working environment.*

## Make Sources Visible on Every Element

### Implement "from [agency]" Tags with Deep Links
If a user cannot see and click the source, the data does not count. The DCAT-US Schema (Project Open Data) recommends utilizing a `references` field to provide related documents and URLs for datasets [7]. The prototype UI should adopt this standard visually by placing micro-labels (e.g., "from HUD", "from Legistar") next to every metric, accompanied by an "Open in..." button that deep-links directly to the source document. This shortens adjudication time and signals audit-readiness.

### Standardize Identifiers and Exact Field Names
Consistency reduces friction. Use official program names and file formats exactly as they appear in local databases. If referencing a City Council ordinance, use the exact Legistar format. If referencing federal grants, use the exact HUD acronyms (CDBG, HOME, ESG, HOPWA) [4]. 

## Show Freshness and Update Cadence Up Front

### Follow DCAT-US: Modified and AccrualPeriodicity
Data freshness is a visible promise of responsibility. The DCAT-US metadata schema requires a `modified` field (last updated) and an `accrualPeriodicity` field to express the duration of time between data publishing [7]. The schema uses ISO 8601 repeating durations, such as `R/P1Y` for annual updates, `R/P3M` for quarterly, or `irregular` for ad-hoc updates [7]. The prototype should display "Last updated" and "Update frequency" at the top of every data card.

### Dataset-Level Freshness Plan
Different datasets have different lifecycles, and the UI must reflect this. For example, HUD's Comprehensive Housing Affordability Strategy (CHAS) data relies on custom tabulations of American Community Survey (ACS) data, with recent releases covering 2018-2022 [8]. Income limits and CPD allocations roll over annually [5] [6]. 

#### Dataset Freshness and Staleness Rules

| Dataset | Last Updated / Current Version | Cadence (DCAT-US) | Staleness UI Rule |
| :--- | :--- | :--- | :--- |
| **CHAS Data** | ACS 2018-2022 [8] | `R/P1Y` [7] | Turn badge amber > 15 months |
| **Income Limits** | FY2025 [5] | `R/P1Y` [7] | Turn badge amber after next FY post |
| **CPD Allocations** | FY2025 [6] | `R/P1Y` [7] | Turn badge amber > 12 months |
| **GRTC TSP** | FY 2025 – FY 2034 [9] | `irregular` [7] | Turn badge amber > 18 months |

*Takeaway: Building a data-age badge that changes color when data passes its expected cadence window proves the tool is designed for long-term maintenance, not just a one-off demo.*

## Own the Limitations and Known Gaps

### Model After Local Practice
Acknowledging what a tool does not cover increases credibility by preempting skepticism. Local agencies already practice this transparency. For example, RRHA's Creighton Renaissance page openly acknowledges that their 2016 Choice Neighborhoods grant application was unsuccessful, while highlighting their continued progress since 2017 [10]. Similarly, HUD explicitly warns users to use caution when comparing pre-2018 CHAS data with newer versions due to changing variable definitions [8]. 

### Standard Limitation Statements
The prototype should feature a persistent "What this tool does not cover" card or inline limitation chips. Examples include:
* "CHAS data comparability warning: Pre-2018 estimates may not be directly comparable due to variable changes." [8]
* "Income limits reflect the Richmond HUD Metro FMR Area, not custom neighborhood-level medians." [5]
* "Zoning and Legistar status data are not final until formally adopted by the City Council."

## Ground User Stories in Real Richmond Context

### Transit-Anchored Narratives That Map to GRTC Plans
Opening a demo with a fictional, generic user ("Meet John") immediately distances the audience. Instead, ground user stories in real, funded infrastructure projects. The GRTC Transit Strategic Plan (FY 2025 – FY 2034) outlines specific near-term initiatives: a new downtown transfer station at 8th Street and Leigh Street, an East End Transfer Hub site selection, and the Malvern Avenue Pulse Infill Station beginning construction in 2025 [9]. 
* **Credible Story**: "A Gilpin Court parent transferring at the new 8th & Leigh station to access the Pulse." (Label: `from GRTC TSP 2025-2034`).

### Housing-Anchored Narratives with RRHA Places
Tie housing narratives to actual redevelopment efforts and grants. For example, RRHA and the City of Richmond recently received a $450,000 Choice Neighborhoods Planning Grant for Gilpin Court and the Jackson Ward community [11]. 
* **Credible Story**: "A resident engaging with the Gilpin Court Choice Neighborhoods planning process checking FY2025 HOME-eligible rehab limits."

## Required On-Screen Elements

To ensure the prototype passes the visual audit test during the demo, specific UI elements must be treated as first-class features, not afterthoughts.

#### Element-to-Evidence Checklist

| UI Element | Required Label Format | Example Implementation | Official Link Target |
| :--- | :--- | :--- | :--- |
| **Metric Card** | Source + Last Updated + Cadence | `"from HUDUSER • Updated 2026-03-17 • R/P1Y"` | HUD dataset portal |
| **Neighborhood Panel** | Local Name + Exact Unit Count | `"Gilpin Court — 781 units (from RRHA)"` [3] | RRHA Communities page |
| **Funding Row** | Program + Year + Exact $ | `"CDBG (FY21-22 est.): $4,462,031"` [4] | City NOFA PDF |
| **Income Check** | FY + Area + Household Size | `"FY2025 Richmond FMR 30%: $34,050 (4-HH)"` [5] | HUDUSER Income Limits |
| **Limitation Chip** | Scope Note / Warning | `"CHAS pre-2018 not comparable"` [8] | HUD CHAS documentation |

*Takeaway: These elements ensure that every screen of the demo inherently answers the questions "Where did this come from?" and "Is it up to date?"*

## Credibility Checklist for Demo Day

Before stepping on stage or deploying the prototype for judges, ensure the following criteria are met:

* [ ] **No Mock Data**: All "Lorem Ipsum" text, generic map pins, and placeholder numbers have been purged and replaced with real Richmond data.
* [ ] **Exact Addresses Used**: Facilities and communities use real addresses (e.g., RRHA office at 2506 Phaup St) [3].
* [ ] **Income Limits Verified**: All affordability metrics are strictly tied to the FY2025 HUD Metro FMR Area limits [5].
* [ ] **Funding Precision**: Grant amounts match official NOFA or HUD Exchange allocations down to the dollar [6] [4].
* [ ] **Source Tags Visible**: Every data card features a "from [Source]" micro-label.
* [ ] **Clickable Provenance**: Every source tag has a working hyperlink to the official government PDF or portal.
* [ ] **Freshness Displayed**: `modified` dates and `accrualPeriodicity` (e.g., R/P1Y) are visible on all datasets [7].
* [ ] **Limitations Owned**: A "What this tool does not cover" section or inline warning (e.g., CHAS comparability) is clearly visible [8].
* [ ] **Contextualized Personas**: User stories reference real transit hubs (e.g., 8th & Leigh) [9] or real housing initiatives (e.g., Creighton Renaissance) [10].

## References

1. *Data assurance: what is it and why do we need it? | The ODI*. https://theodi.org/insights/reports/data-assurance-white-paper/
2. *The Digital Services Playbook — from the U.S. DOGE Service*. https://playbook.usds.gov/
3. *Communities | Richmond Redevelopment & Housing Authority*. https://www.rrha.com/housing/communities
4. *NOTICE OF FUNDING AVAILABILITY*. http://rva.gov/sites/default/files/2020-10/City%20of%20Richmond%20Application%20NOFA%20Guidelines%20FY21-22%20%28AHTF%20CDBG%20HOME%20ESG%20HOPWA%29.pdf
5. *FY2025 ADJUSTED HOME INCOME LIMITS*. https://www.huduser.gov/portal/datasets/home-datasets/files/HOME_IncomeLmts_State_VA_2025.pdf
6. *Awards and Allocations - HUD Exchange*. https://www.hudexchange.info/GRANTEES/ALLOCATIONS-AWARDS/?na=111020&start=5552
7. *DCAT-US Schema v1.1 (Project Open Data Metadata ...*. https://resources.data.gov/resources/dcat-us/
8. *Consolidated Planning/CHAS Data | HUD USER*. https://www.huduser.gov/portal/datasets/cp.html
9. *GRTC Transit Strategic Plan FY 2025 – FY 2034*. https://drpt.virginia.gov/wp-content/uploads/2024/10/GRTC-TSP-Updated-2024.pdf
10. *Creighton Renaissance | Richmond Redevelopment & Housing Authority*. https://www.rrha.com/redevelopment/creighton/
11. *HUD AWARDS $450,000 Choice Planning Grant to RRHA and City of Richmond | Richmond Redevelopment & Housing Authority*. https://www.rrha.com/news/hud-awards-450000-choice-planning-grant-to-rrha-and-city-of-richmond/