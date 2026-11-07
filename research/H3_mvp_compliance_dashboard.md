> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.


# Build-Ready, Not Audit-Ready: A Weekend-Scale Affordable Housing Compliance Prototype

## Executive Summary
The feasibility of building an Affordable Housing Compliance Dashboard MVP is **Medium-High**, provided the tool is strictly positioned as a "staff-support workflow" rather than a definitive compliance audit system. Because internal compliance data (e.g., rent rolls, covenants) is not publicly available, the MVP must rely on public proxies—specifically the National Housing Preservation Database (NHPD), HUD Fair Market Rent (FMR) tables, and Legistar municipal data. 

To succeed, the prototype must avoid binary "compliant/non-compliant" labels, which would erode trust if inferred from incomplete public data. Instead, it should surface contextual cues (e.g., rent reasonableness via FMR comparisons) to accelerate staff triage. Furthermore, because the demo will require synthetic or seeded data to fill gaps, strict adherence to NIST data provenance guidelines is required to prevent demo data from being mistaken for real compliance violations. 

For teams constrained to a single weekend, building a **Development Notifier** using the turnkey Chicago Building Permits API is a faster, lower-risk alternative (12–16 hours) compared to the full Compliance Workflow MVP (52–66 hours). However, both tools can share the same underlying property data model, allowing teams to sequence them strategically.

## Decision Snapshot — Prototype is feasible; make it a workflow tool, not an audit system
With internal data unavailable, a credible "Compliance Readiness Workflow" MVP is feasible in approximately 52–66 engineering hours using public data. The build is highly recommended if the goal is to validate staff workflows and UI/UX concepts. However, it requires explicit labeling of synthetic data and a complete avoidance of automated compliance claims. If the immediate goal is guaranteed demo reliability with live data in under 20 hours, the team should pivot to the Development Notifier.

## Problem Framing and Success Criteria — Validate staff workflow, not legal compliance
Define success as faster triage and better context for staff follow-up, explicitly avoiding any automated "compliance" assertions.

### Who this serves and what changes
Compliance analysts currently spend excessive time gathering context before they can even begin an audit. They need quick visibility into a property's program participation, relevant local ordinances, and baseline rent reasonableness. Success for this MVP equals a reduced time-to-first-triage, clear follow-up task generation, and clean, exportable property briefs. 

### Scope guardrails
To maintain credibility without internal data, the scope must be tightly controlled:
* **In-Scope**: Data ingestion from public sources, context surfacing, HUD FMR comparisons, ordinance linkouts, and task queuing.
* **Out-of-Scope**: Definitive compliance determinations, bulk certifications, tenant-level data handling, and document uploads.

## Data Landscape and Feeds — What’s accessible now and how to use it
Three core sources (NHPD, HUD FMR, Legistar) plus an optional permits dataset can power a robust demo if used strictly as context rather than ground truth.

### Data source fit and constraints

| Data Source | What it provides | Access Method | Update Notes | Licensing / TOU | Integration Effort |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NHPD (PAHRC/NLIHC)** | Property and subsidy records [1]. | Registered download | 2025 update added 600+ National Housing Trust Fund properties [2]. | Requires registration and agreement to Terms of Use [3] [4]. | Medium |
| **HUD FMR** | Annual rents by bedroom size | CSV / Bulk | Yearly by county/metro | Public | Small |
| **Legistar** | Ordinances and legislative matters | Web API | Rolling updates | Public | Medium |
| **Chicago Permits** | Building permits from 2006–present | SODA API / CSV / JSON | Updated March 16, 2026; 1.48M views [5]. | Public | Small |

*Takeaway*: The NHPD provides the foundational property records, but its Terms of Use require careful handling of property-level data [3]. The Chicago Permits dataset (identifier: `ydr8-5enu`) offers a highly reliable, frequently updated alternative for live-data demonstrations [5] [6].

### Data joins and normalization
To create a unified portfolio view, the system must join these disparate feeds. HUD FMR data requires GEOID or County FIPS joins to map rent tiers to specific properties. NHPD and Legistar data require address standardization to align properties with local legislative matters. Program tags extracted from the NHPD can be mapped to local ordinance keywords to generate contextual linkouts for compliance staff.

## Synthetic/Seeded Data Governance — Build trust through explicit provenance
Because the MVP will use mock portfolio data to simulate internal compliance records, it must follow established frameworks for synthetic data governance to prevent confusion.

### Labeling patterns and safeguards
NIST AI 100-4 emphasizes that no single technique for labeling synthetic content is comprehensive [7] [8]. Therefore, a layered approach is required. NIST Special Publication 1800-39 demonstrates best practices by explicitly discovering, identifying, and labeling synthetic datasets [9]. 
* **Metadata**: Implement a `dataset_provenance` field in the database (values: "real", "synthetic", "blended").
* **UI Watermarks**: Apply a persistent "Demo Data" ribbon on all property cards, a top-banner disclaimer on the dashboard, and explicit footers on any exports.
* **Audit Trail**: Include `seeded_at`, `seeded_by`, and `source_urls` in the data model.
* **Access Control**: Keep raw NHPD data server-side to comply with TOU [3], sharing only aggregated or derived metrics publicly.

### Failure and mitigation
**Risk**: Demo screenshots circulate internally or externally without context, leading stakeholders to believe real properties are failing compliance checks. 
**Mitigation**: Always include hardcoded watermarks and provenance metadata in UI views and PDF/CSV exports.

## MVP Definition — A narrow, credible "Compliance Readiness Workflow"
The MVP should ship four core UI components built on a shared portfolio model, strictly avoiding pass/fail judgments.

### UI components and behaviors
* **Portfolio Table**: A sortable list of properties with filters for program tags, jurisdiction, and FMR delta thresholds.
* **Map View**: A geospatial view with clustering and jurisdiction overlays to visualize portfolio distribution.
* **Property Detail Panel**: A drawer or page showing a program summary, related Legistar ordinances, staff notes, and a task queue.
* **FMR Comparator**: A widget comparing a property's estimated rents against HUD FMR tiers by bedroom size, using color cues (e.g., yellow for "above FMR") to signal review priority.

### Explicit exclusions
The UI must not contain "compliant/non-compliant" toggles. It must exclude tenant personally identifiable information (PII) and must not attempt automated ordinance enforcement logic, which is too brittle for an MVP.

## Technical Architecture — Simple, explainable stack with reusable core
One normalized portfolio model can support both the compliance workflow and the alternative development notifier.

### Data model
* **Entities**: `Property`, `Subsidy` (sourced from NHPD), `Jurisdiction`, `Ordinance` (from Legistar), `FMRRecord` (from HUD), `Task`, and `Note`.
* **Keys & Relationships**: Use `property_id`, `geoid`, and `county_fips` as primary join keys. Establish 1:M relationships for Property-to-Subsidy and Jurisdiction-to-Ordinance.

### Pipelines and services
* **Ingestors**: A registered pull for NHPD data, a CSV parser for HUD FMR, and an API client for Legistar. If utilizing Chicago Permits, the Socrata API can be queried using the `/api/v3/views/ydr8-5enu/query.json` endpoint [6], utilizing SoQL `$select` and `$where` clauses for filtering [10] [11].
* **Join Service**: A lightweight geocoding and county assignment service to facilitate FMR lookups.
* **API Layer**: Endpoints for portfolio read, search, detail retrieval, and task management.

### UI/UX framework
A standard web application featuring a data table, a clustered map, a detail drawer, and an FMR widget. Crucially, the UI must include feature flags to toggle "demo mode" watermarks on and off.

## Build Plan and Effort Estimates — What fits in a weekend vs a week
The compliance workflow MVP requires roughly a week of effort, whereas a simpler development notifier can be shipped in a weekend.

### Component hour estimates

| Component | Estimated Hours (Low–High) |
| :--- | :--- |
| Data ingestion (NHPD / HUD / Legistar) | 12–16 |
| Portfolio model + joins | 6–8 |
| Table view + filters | 8–10 |
| Map + clustering | 10–12 |
| Detail view | 6–8 |
| FMR comparator | 6–8 |
| Wiring / QA | 4–6 |
| **Total (Compliance MVP)** | **52–66** |

*Takeaway*: At 52–66 hours, the Compliance MVP is too large for a standard two-day hackathon or weekend build without significant scope cuts. 

### Weekend slicing strategy
If attempted over a weekend, slice the build into phases. Weekend 1: Focus entirely on data ingestion, the core data model, the basic table view, and the FMR comparator. Weekend 1.5 (or follow-up sprint): Add the map, detail view, and UI polish.

## Positioning and Risk — Call it a workflow prototype, not a compliance system
Language and UI must avoid legal assertions. Inferring compliance from proxies will erode trust with actual compliance officers.

### Messaging and labels
Rename the internal project to "Compliance Readiness" or "Affordability Monitoring Support." Replace any "Status" columns with "Review Priority." Use evidence cues (like FMR deltas and ordinance links) to prompt human action rather than machine judgment.

### Legal/ethical guardrails
Respect the NHPD Terms of Use by avoiding the public redistribution of bulk property-level data [3]. In public demos or open-source repositories, show only aggregated data or heavily synthesized mock portfolios.

## Option B: Development Notifier — Faster time-to-value, complementary to the dashboard
If the 52-66 hour estimate is prohibitive, the team should pivot to a Development Notifier using the Chicago Building Permits API.

### Feasibility comparison

| Criterion | Compliance Workflow MVP | Dev Notifier MVP |
| :--- | :--- | :--- |
| **Time to demo** | 52–66 hours | 12–16 hours |
| **Data risk** | Medium (NHPD TOU restrictions) | Low (Public Socrata API) |
| **User value** | High for compliance teams | High for planning/outreach teams |
| **Future synergy** | Establishes shared portfolio model | Establishes shared ingestion framework |

*Takeaway*: The Chicago Permits dataset is highly accessible via the Socrata API (`ydr8-5enu`) [5] [6]. Because it updates continuously, it provides an immediate "live data" wow-factor that the static compliance MVP lacks.

### Minimal notifier scope
A 12-16 hour build would include: SoQL-based filters (by permit type, ward, or tract) [10], saved searches, a daily email/webhook alert system, and a simple map visualization.

## Roadmap and Next Steps — Ship, learn, and pick the lane
Choose one of the two tracks based on available engineering hours and the need for demo certainty. Both tracks can eventually merge, as they rely on the same underlying property data model.

### Decision tree and immediate actions
* **If ≤ 1 weekend and you need guaranteed live data**: Build the Development Notifier.
* **If 1–1.5 weekends and you want workflow validation**: Build the Compliance Readiness MVP.
* **Immediate Actions**: 
 1. Secure NHPD registration immediately to clear TOU hurdles.
 2. Define the specific Legistar ordinance keywords to track.
 3. Pull the latest HUD FMR CSV.
 4. Implement the `dataset_provenance` labeling framework before writing any UI code.

### Demo plan and metrics
To prove the MVP's value, track specific success metrics during user testing. For the Compliance MVP, measure the reduction in "time-to-triage" and the percentage of properties accurately flagged as "Review Needed." For the Notifier, track the number of subscriptions created and alert engagement rates.

## References

1. *National-Housing-Preservation-Database-User-Guide.pdf*. https://preservationdatabase.org/wp-content/uploads/2025/09/National-Housing-Preservation-Database-User-Guide.pdf
2. *National Housing Preservation Database Updated to...*. https://nlihc.org/resource/national-housing-preservation-database-updated-include-national-housing-trust-fund
3. *Terms of Use - National Housing Preservation Database (NHPD)*. https://preservationdatabase.org/terms-and-conditions/
4. *Register as a new user - National Housing Preservation Database (NHPD)*. https://preservationdatabase.org/register-as-a-new-user/
5. *Building Permits | City of Chicago | Data Portal*. https://data.cityofchicago.org/Buildings/Building-Permits/ydr8-5enu
6. *API Endpoints - Socrata*. https://dev.socrata.com/docs/endpoints.html
7. *Reducing Risks Posed by Synthetic Content An Overview of Technical Approaches to Digital Content Transparency | NIST*. https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content
8. *NIST Synthetic Content Labeling/Detection Report...*. https://downloads.regulations.gov/NIST-2024-0001-0029/attachment_1.pdf
9. *SP 1800-39, Data Classification Practices - CSRC - NIST*. https://csrc.nist.gov/pubs/sp/1800/39/ipd
10. *The WHERE Clause - Socrata - Data & Insights*. https://dev.socrata.com/docs/queries/where.html
11. *The SELECT Clause | Socrata - Data & Insights*. https://dev.socrata.com/docs/queries/select