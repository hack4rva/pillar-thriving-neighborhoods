> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.


# 48-hour win: Neighborhood Development Discovery beats Housing Compliance on data readiness and low-risk impact

## Executive Summary

For a 48-hour hackathon prototype, **Neighborhood Development Discovery (NDD)** is the clear and defensible choice over Housing Compliance Monitoring (HCM). NDD scored higher on the rubric (26/32 vs. 22/32) and benefits from a robust, publicly accessible data stack, including the Legistar Web API, GeoHub boundaries, and updated LADBS datasets. Conversely, HCM carries a critical "data-not-ready" flag. The Los Angeles Housing Department (LAHD) data available publicly is heavily caveated, limited in scope, and poses a high risk of misleading users if framed as a definitive "compliance" tool. 

By focusing on NDD, a hackathon team can confidently build a "what is being built near me?" map that serves clear user personas (residents, neighborhood councils, and city staff) without running into legal or ethical traps regarding housing enforcement.

## Decision Summary: NDD wins on buildability, data access, and low-risk impact

With a higher rubric score of 26/32 and no restrictive data flags, Neighborhood Development Discovery is the pragmatic choice for a weekend build. The core challenge of a 48-hour hackathon is minimizing "time-to-data" so the team can focus on user experience and integration. NDD allows developers to immediately tap into documented APIs and updated City datasets. 

Housing Compliance Monitoring (22/32) is effectively quick-killed for a weekend prototype by its data posture. The public LAHD Property Look-Up dataset contains only five fields and explicitly warns that it is for informational purposes only and does not indicate whether a violation was actually found [1] [2]. Attempting to build a compliance risk or monitoring tool on this thin, disclaimer-heavy data risks overclaiming impact and misleading users. HCM should be parked unless direct, internal data access agreements are established.

## Side-by-Side Hackathon Suitability Comparison

The following table evaluates both problem statements across the six critical dimensions for a 48-hour hackathon prototype. NDD outperforms HCM on user clarity, data availability, buildability, and continuation pathways.

| Evaluation Dimension | Neighborhood Development Discovery (NDD) | Housing Compliance Monitoring (HCM) |
| :--- | :--- | :--- |
| **Clarity of user & pain point** | **High:** Clear need for residents and Neighborhood Councils to know "what's being built near me?" City Planning already produces bi-weekly case reports for this audience [3]. | **Low/Ambiguous:** Spans inspectors, landlords, and tenants with conflicting needs, legal sensitivities, and varying definitions of "compliance." |
| **Data availability & access** | **High:** Legistar Web API (OData) [4], GeoHub Council Districts (2021) [5], 34 Community Plan Areas [6] [7], and LADBS Open Data [8]. | **Low:** LAHD Property Look-Up has only 5 fields [2]. NDSC housing violations data is aggregated to the census tract level (2005 to 2023) [9]. |
| **Buildability in 48 hours** | **High:** Requires stitching 3-4 open layers (Legistar, Planning Cases, LADBS) onto a map shell. OData parameters allow easy filtering [10]. | **Low:** Requires internal LAHD inspection feeds or complex data-sharing agreements that cannot be executed over a weekend. |
| **Risk of misleading users** | **Low:** Can easily link out to authoritative sources (PDIS, Legistar) as a discovery tool without making legal claims. | **High:** High risk of overclaiming compliance status. LAHD explicitly states public data does not prove violations [1]. |
| **Continuation pathway** | **Clear:** Post-hackathon, the tool can be expanded to include email alerts, saved areas, and integration into Neighborhood Council workflows. | **Blocked:** Moving past a prototype would require MOUs with LAHD, legal reviews, and strict data governance. |
| **Rubric score & flags** | **26/32:** Clear public data path via Legistar and GeoHub. | **22/32:** Carries a critical **data-not-ready flag**. |

**Key Takeaway:** NDD provides a clear path to a credible, working demo. HCM is blocked by data limitations and high ethical/legal risks regarding compliance claims.

## Data Readiness Playbook

NDD's endpoints are stable, documented, and mappable. To ensure a smooth build, the team must right-size the data by utilizing API filters and pre-loading static boundaries.

### Legistar Web API
The Legistar Web API exposes legislative data via HTTPS and supports OData parameters [4] [11]. 
* **Constraints:** Query replies are strictly limited to 1,000 responses [4] [10]. 
* **Implementation:** Use `$top` and `$skip` for pagination, and `$filter` to restrict data to recent events (e.g., `$filter=EventDate ge datetime'2026-02-01'`) [10].

### GeoHub Boundaries
Los Angeles GeoHub provides the necessary spatial context for the prototype:
* **Council Districts:** Use the "LA City Council Districts (Adopted 2021)" dataset [12].
* **Community Plan Areas (CPA):** There are 34 defined CPAs available for mapping [6] [7].
* **Specific Plan Areas:** Available for deeper neighborhood-level zoning context [13] [14].

### LADBS and City Planning Open Data
* **LADBS Code Enforcement:** The "Building and Safety - Code Enforcement Case - Open (N)" dataset is highly current (last updated March 16, 2026) [8].
* **LADBS Building Permits:** Use the official "Building Permits: New Housing Units" dataset (updated January 28, 2025) [15]. *Avoid* the community-created "LADBS-Permits" dataset, as it has not been updated since May 22, 2023, and is not endorsed by the City [16].
* **City Planning:** Leverage the bi-weekly case filings and completed cases maps, which hyperlink directly to the Planning Document Information System (PDIS) [3].

### LA County Parcels (Handle with Care)
The LA County Assessor Parcels dataset contains approximately 2.4 million records and is updated monthly [17]. Due to its massive size, do not attempt to load this fully into the prototype. Instead, rely on the public-facing parcel map cache or pre-filter the data to a single test district [17].

## User and Pain-Point Clarity

The core question NDD answers is: *"What is being built or changed near me?"* This single question serves three distinct, highly motivated personas:

### 1. The Resident
**Pain Point:** "I need to know about construction impacts, zoning changes, and timelines in my immediate vicinity."
**Solution:** A simple address search that reveals recent permits and planning cases within a specific radius.

### 2. The Neighborhood Council (NC) Land-Use Chair
**Pain Point:** "I need to prepare for upcoming community meetings with up-to-date, accurate case filings."
**Solution:** A dashboard filtered by Community Plan Area [7] or Council District [12] that aggregates bi-weekly planning cases [3].

### 3. The City Council Staffer
**Pain Point:** "I need constituent-ready summaries of development activity by district, backed by official source links."
**Solution:** A map interface that provides direct link-outs to Legistar matters and PDIS case summaries [3].

## 48-Hour Build Plan: Scoping the NDD Prototype

To succeed in 48 hours, the team must ship a "thin-slice" experience. Scope the prototype strictly to a "What changed near me recently?" map with 3-4 reliable layers and robust link-outs.

### Day 1: Data Plumbing and Skeleton
* **Data Fetching:** Pre-download CSV snapshots of the LADBS Open Code Enforcement cases [8] and Planning Case filings to guarantee data availability during the demo. 
* **API Setup:** Configure the Legistar API client with date-filtered fetches (e.g., last 30 days) to stay under the 1,000-item limit [10].
* **Map Shell:** Initialize a web map (e.g., MapLibre or Leaflet) loaded with GeoHub Council Districts (2021) [12] and the 34 Community Plan Areas [6]. Implement a basic address search and time-window toggles (7, 30, and 90 days).

### Day 2: UX, Performance, and QA
* **Interface:** Build interactive map cards that display the project title, location, date, and a clear "Open in PDIS/Legistar/LADBS" call-to-action button.
* **Performance Tuning:** Limit the live demo to 1 or 2 specific Council Districts to ensure snappy geocoding and rendering. Do not load the 2.4M LA County parcels [17].
* **Copywriting:** Add a visible disclaimer stating the tool is for "discovery and informational purposes, not final approval or compliance."

## Risk Management

The primary risks for the NDD statement revolve around data misinterpretation and application performance. 

### Key Risks and Mitigations
* **Risk: Overclaiming Status.** Users might mistake a filed planning case for an approved project.
 * *Mitigation:* Use strict, neutral language (e.g., "Publicly reported cases," "Filed applications"). Include visible disclaimers and always link out to the authoritative source (PDIS or Legistar) for the final word [3].
* **Risk: Performance Bottlenecks.** Attempting to render city-wide parcel data or pulling unfiltered Legistar data will crash the prototype.
 * *Mitigation:* Strictly enforce Legistar `$top` and `$skip` pagination [10]. Avoid parcel-level joins entirely; rely on point data (lat/long) from permits and cases overlaid on district polygons.
* **Risk: Conflating Jurisdictions.** Mixing City of Los Angeles data with LA County unincorporated data can confuse users.
 * *Mitigation:* Restrict the map bounds strictly to the LA City Council Districts (2021) [12].

## Continuation Pathway

NDD offers a highly viable continuation path post-hackathon that does not require complex legal agreements or new data pipelines.

### Next 30-60 Days
* **User Testing:** Pilot the prototype with 2-3 Neighborhood Councils to validate the UX for land-use chairs.
* **Feature Expansion:** Introduce automated email alerts for saved locations or specific Community Plan Areas [7]. Add the Specific Plan Areas overlay from GeoHub for deeper zoning context [13].
* **Partnerships:** Coordinate with Los Angeles City Planning communications to potentially embed discovery links directly into Neighborhood Council agendas.

## Quick-Kill Criteria and Contingency Plan

To preserve momentum during the 48-hour window, the team must adhere to strict time-boxed pivots:

* **T+3 Hours:** If live Socrata OData or Legistar API calls fail, immediately switch to the pre-downloaded CSV snapshots. Do not waste time debugging APIs on Friday night.
* **T+6 Hours:** If dynamic geocoding of addresses is slowing down the map render, disable it. Fall back to filtering strictly by Council District or Community Plan Area polygons.
* **Explicit No-Go:** If stakeholders push to pivot back to Housing Compliance Monitoring (HCM), halt the pivot immediately unless LAHD provides a direct, detailed, and legally cleared internal data feed. The public 5-field Property Look-Up dataset is insufficient for a credible build [2].

## References

1. *LAHD Propery Look-Up for Violations - Dataset - Catalog*. https://catalog.data.gov/dataset/lahd-propery-look-up-for-violations
2. *LAHD Property Look-Up for Investigation and Enforcement Cases | Los Angeles - Open Data Portal*. https://data.lacity.org/Community-Economic-Development/LAHD-Property-Look-Up-for-Investigation-and-Enforc/eagk-wq48
3. *Case Reports and Mapping | Los Angeles City Planning*. https://planning.lacity.gov/resources/case-reports
4. *Legistar Web API | Granicus Support*. https://support.granicus.com/s/article/Legistar-Web-API
5. *LA City Council Districts (2021) - Los Angeles GeoHub*. https://geohub.lacity.org/datasets/lacounty::la-city-council-districts-2021-1
6. *Community Plan Areas - Los Angeles GeoHub*. https://geohub.lacity.org/search?collection=dataset&q=Community%20Plan
7. *CPA | City of Los Angeles Geohub*. https://geohub.lacity.org/datasets/f4e830d3882d457bb9d9241cdff0b10a_0/about
8. *Building and Safety - Code Enforcement Case - Open (N) | Los Angeles - Open Data Portal*. https://data.lacity.org/City-Infrastructure-Service-Requests/Building-and-Safety-Code-Enforcement-Case-Open-N-/u82d-eh7z
9. *Housing Code Violations – Neighborhood Data for Social Change*. https://la.myneighborhooddata.org/2022/12/housing-code-violations/
10. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
11. *Legistar Web API Help Page*. https://webapi.legistar.com/Help
12. *LA City Council Districts (Adopted 2021) - Los Angeles GeoHub*. https://geohub.lacity.org/datasets/76104f230e384f38871eb3c4782f903d_13/about
13. *Specific Plan Areas | City of Los Angeles Geohub*. https://geohub.lacity.org/datasets/f38468988a8d439a950797e36c1bb743_6/about
14. *Specific Plan Areas | City of Los Angeles Geohub*. https://geohub.lacity.org/datasets/lahub::specific-plan-areas-1/explore
15. *Building Permits: New Housing Units | Los Angeles - Data Portal*. https://data.lacity.org/Community-Economic-Development/Building-Permits-New-Housing-Units/cpkv-aajs
16. *LADBS-Permits | Los Angeles - Open Data Portal*. https://data.lacity.org/City-Infrastructure-Service-Requests/LADBS-Permits/hbkd-qubn
17. *Parcels | County of Los Angeles Open Data*. https://data.lacounty.gov/documents/4d67b154ae614d219c58535659128e71