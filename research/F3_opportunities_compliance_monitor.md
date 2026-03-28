> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Weekend-Build Staff Tool: HUD-anchored Affordable Housing Compliance Monitor

## Executive Summary
A functional, staff-facing affordable housing compliance monitor is highly feasible for a weekend build if strictly scoped as an advisory "monitoring cues" dashboard rather than an automated enforcement system. By anchoring the tool in the publicly available HUD Multifamily Assistance & Section 8 Contracts Database [1] and supplementing it with legislative context from the Legistar Web API [2], teams can deliver a compelling workflow prototype. The critical success factor is framing: the tool must be presented as a triage queue that surfaces upcoming contract expirations and advisory Fair Market Rent (FMR) benchmarks to guide staff actions, explicitly avoiding any automated compliance determinations. If reputational or data-reliability risks appear too high during development, pivoting to a public-facing "development notifier" (similar to NYC's ZAP alerts) remains a viable fallback [3].

## Opportunity and Weekend Feasibility

A minimal, staff-only portfolio that surfaces HUD contract expirations and advisory FMR benchmarks is buildable in 48 hours. The core value proposition relies on aggregating fragmented public data into a single operational view for housing department staff, bypassing the need for confidential city data during the hackathon phase.

### Scope-to-Value in 48 Hours
The weekend build must focus strictly on what can be shipped reliably. The MVP should deliver a portfolio view of seeded developments, highlighting upcoming contract expirations and displaying the HUD FMR ratio [1]. It should also include a lightweight Legistar watchlist to track recent council actions related to specific properties. The team must aggressively defer tenant-level rent checks, income verification, and any automated compliance flagging, as these require private data and complex regulatory logic found in extensive municipal manuals [4] [5].

### Data Anchors You Can Trust on Day 1
The prototype can be reliably anchored using two primary public data sources, avoiding the need for sensitive municipal databases.

| Data Source | Fields Utilized | Refresh Rate & Access | Notables & Constraints |
| :--- | :--- | :--- | :--- |
| **HUD Multifamily Assistance & Section 8 Database** | Contract end date, assisted units count, property total unit count, rent-to-FMR ratio [1] | Monthly (Current as of 03/03/2026); Excel download [1] | The rent-to-FMR ratio is explicitly a "guide only"; dataset is not exhaustive [1]. |
| **Legistar Web API** | Matters, Histories, EventItems, Votes [2] [6] | Real-time; HTTPS/JSON [2] [7] | Queries limited to 1,000 responses; returns only public items; some clients require tokens [2]. |

The HUD database provides the foundational property and contract data, while the Legistar API offers legislative context. To ensure demo stability, Legistar data should be prefetched or heavily filtered using ODATA parameters (e.g., limiting by date or specific bodies) [2].

## Staff-Facing Framing

To avoid authority overreach, the tool must be designed and pitched as a triage and queue-building utility. Municipalities like San Francisco and Seattle utilize comprehensive, multi-page manuals to govern compliance monitoring, dictating how staff interact with property managers and audit records [4] [5]. The prototype should support these existing workflows by acting as a discovery layer—prompting staff to "request a compliance packet" or "schedule an audit"—rather than attempting to replace the manual review process.

### What the Tool Can vs. Cannot Do
Clarity on the tool's boundaries is essential for both user trust and judge evaluation.

| Capability Status | Specific Functions |
| :--- | :--- |
| **What it CAN do** | Display a portfolio of HUD-backed properties; flag contract expirations in 30/90/180 days; show the HUD rent-to-FMR benchmark [1]; list recent legislative items via Legistar [2]. |
| **What it CANNOT do** | Determine legal compliance status; assess individual tenant income eligibility; compute restricted rent schedules; audit property financials; replace official staff reviews [4] [5]. |

## MVP Demo Spec

The minimum useful demo consists of a single, high-impact dashboard screen. It should feature a portfolio view of seeded developments, sorted by upcoming expiration dates. Clicking on a property should open a detail panel displaying the HUD FMR comparison ratio and the most recent relevant council action fetched from Legistar. The primary call-to-action on this panel should be a simple "Request Compliance Packet" button, demonstrating the workflow handoff.

### Data Decisions and Synthetic Handling
Because local inclusionary housing datasets are often unevenly public, the demo should be seeded with 10–20 real local properties extracted from the HUD Section 8 portfolio [1]. If the team chooses to include local inclusionary zoning (IZ) examples to demonstrate broader utility, these must be synthetic. Any synthetic data must be aggressively labeled with "Synthetic—Demo Only" badges, visually segregated (e.g., using a different color scheme), and clearly separated in any data export metadata to prevent confusion.

## Risks and Mitigations

Building a tool adjacent to legal compliance carries inherent risks regarding implied authority and data misinterpretation.

| Identified Risk | Context & Source | Mitigation Strategy |
| :--- | :--- | :--- |
| **Overstating Authority** | HUD explicitly disclaims that its data does not purport to be complete or all-inclusive [1]. | Implement persistent "Advisory Only" banners; restrict framing to staff-only access; scrub UI of definitive terms like "Compliant/Non-Compliant". |
| **Misinterpreting FMR Ratios** | HUD warns the ratio is a guide and geographic mismatches may occur [1]. | Add mandatory tooltips explaining: "Guide only; geographic mismatches possible." |
| **Live API Fragility** | Legistar API has 1,000-record caps and can be slow on busy sites [2]. | Use prefetched JSON snapshots for the demo; apply narrow date filters and explicit paging [2]. |
| **Synthetic Data Confusion** | Mixing real HUD data with fake local IZ data. | Apply strict visual watermarks, badges, and a toggle to hide synthetic data entirely. |

## Presentation to Judges

When pitching to judges, focus entirely on workflow impact rather than technical automation. Walk them through a concrete, 60-second staff task: "A housing department staffer opens their portfolio, sees six contracts expiring in the next 180 days, clicks a property to view its HUD FMR ratio and recent council actions, and clicks one button to trigger a compliance packet request." Contrast this focused, internal utility with public-facing tools like NYC's Zoning Application Portal (ZAP) [3] or Philadelphia's Atlas [8] to highlight the specific value of a staff-centric triage system.

## Continuation Pathway

The post-hackathon roadmap requires transitioning from a prototype to a hardened production system. The immediate next step is securing a champion within a municipal housing department. 

### Data Hardening and Governance
To make the tool production-ready, the team must implement automated monthly ETL pipelines for the HUD data updates [1]. Expanding the tool to cover local inclusionary housing will require establishing Data Memorandums of Understanding (MOUs) with the city to access non-public records. The system will also need robust audit logs, schema validation, and an internal API to eventually connect with existing city systems.

## Go/No-Go Decision vs. Development Notifier

**Recommendation: Proceed with the Compliance Monitor if strict scoping is maintained.** 
Pursue the staff compliance monitor if the team is disciplined enough to keep it internal, advisory, and strictly anchored to the HUD dataset [1]. It solves a complex workflow problem and stands out in a hackathon. However, if the team struggles to manage the reputational risks or finds the UI leaning too heavily toward automated legal judgments, pivot immediately to the "development notifier." A public-facing permit or zoning alert tool—modeled after NYC's ZAP email subscriptions [3] —is a safer, lower-risk alternative that leverages existing public feeds without the burden of compliance implications.

## References

1. *Multifamily Assistance & Section 8 Database | HUD.gov / U.S. Department of Housing and Urban Development (HUD)*. http://www.hud.gov/hud-partners/multifamily-assist-section8-database
2. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
3. *Subscribe to ZAP Updates - Zoning Application Portal - NYC.gov*. https://zap.planning.nyc.gov/subscribe
4. *Inclusionary Affordable Housing Program Monitoring and ...*. https://www.sf.gov/sites/default/files/2024-08/Inclusionary%20Affordable%20Housing%20Monitoring%20and%20Procedures%20Manual%20Final%207.25.24.pdf
5. *Office of Housing releases updated Compliance Manual for Multi-Family Tax Exemption(MFTE), Incentive Zoning (IZ) and Mandatory Housing Affordability (MHA) programs - at Home*. https://housing.seattle.gov/office-of-housing-releases-updated-compliance-manual-for-multi-family-tax-exemptionmfte-incentive-zoning-iz-and-mandatory-housing-affordability-mha-programs/
6. *Legistar Web API Help Page*. https://webapi.legistar.com/Help
7. *Legistar Web API - Granicus*. https://webapi.legistar.com/
8. *Atlas | phila.gov*. https://atlas.phila.gov/