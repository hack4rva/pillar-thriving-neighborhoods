# Thriving Neighborhoods: De-risking Data Gaps for Build-Ready Hackathon Teams

## Executive Summary

For hackathon teams building solutions for the "Thriving Neighborhoods" pillar in Richmond, VA, data readiness is the primary determinant of success. An analysis of Richmond's civic technology infrastructure reveals eight specific information gaps that threaten to derail prototype development. 

The most critical insight is that **two of these gaps are hard blockers** that must be resolved before building: the availability of the Legistar Web API and the structure of address data within Legistar records. Without these, any automated development notifier or AI translator will fail at the ingestion stage. Conversely, the remaining six gaps—ranging from affordable housing portfolio completeness to compliance workflow specifics—have credible, immediate workarounds using publicly available reports, GIS layers, and proxy data. By front-loading API validation and leveraging existing 2024–2025 Affordable Housing Trust Fund (AHTF) data to seed prototypes, teams can maintain momentum and deliver functional, high-impact tools.

## What Must Be True to Start Building: Blockers vs. Workarounds

To enable rapid decision-making, the eight identified information gaps have been ranked by their impact on hackathon team viability. The table below delineates which gaps must be filled immediately (Blockers) versus those that can be mitigated during the build phase (Workarounds).

| Rank | Information Gap | Impact on Team Decision-Making | Dependent Tools | Status | Fast Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Legistar Web API availability** | Determines the feasibility of automated data ingestion for notifications and translations. | Notifier, Translator | **Resolved** — API confirmed live at https://webapi.legistar.com/v1/richmondva/Matters; client name is `richmondva` (corrected 2026-03-18) | No action required; teams can proceed directly to building against the confirmed endpoint. |
| **2** | **Structured addresses in Legistar** | Dictates geocoding accuracy and the ability to target neighborhood-specific alerts. | Notifier | **Confirmed — no structured field**: street addresses for SUP and planning cases appear in MatterTitle free text; geocoding requires string parsing (corrected 2026-03-18) | Build a rules-based parser (street number + name + suffix patterns); crosswalk to parcels via ArcGIS. |
| **3** | **GeoHub layer freshness & REST access** | Determines if GIS layers can be used as primary real-time triggers or just historical enrichment. | Notifier | Workaround | Check REST metadata for last-updated dates; use as enrichment if >90 days stale. |
| **4** | **Affordable housing portfolio list** | Provides the necessary seed data for compliance monitoring prototypes. | Compliance Tool | Workaround | Compile starter list from 2024–2025 AHTF reports and matching ordinances; request full export. |
| **5** | **Compliance monitoring workflow** | Ensures MVP features match actual staff pain points rather than assumed processes. | Compliance Tool | Workaround | Conduct 45–60 minute discovery interviews with HCD staff to map systems and bottlenecks. |
| **6** | **Neighborhood digital access data** | Informs the design of communication channels (SMS, print, web) for affected residents. | All resident-facing | Workaround | Pull ACS S2801 and FCC data; plan for multi-channel delivery from day one. |
| **7** | **Named departmental champion** | Secures a post-hackathon adoption and continuation pathway for the prototype. | All | Workaround | Secure executive and operational owners; draft a short MoU for weekly syncs. |
| **8** | **Translator accuracy benchmarks** | Prevents the public release of AI-generated misinformation regarding zoning and planning. | Translator | Workaround | Define strict criteria; conduct a 30-item review with a human planner before public launch. |

## Source Validation: Legistar and ArcGIS Data Paths

Confirming machine access to Richmond's legislative and spatial data is the most urgent technical priority. 

### Legistar Access: Endpoint, Client Name, and Fallbacks
Richmond's public Legistar portal is currently live at `richmondva.legistar.com` [1]. The Granicus Web API is confirmed live for Richmond (corrected 2026-03-18). Client name is `richmondva`; confirmed endpoint: `https://webapi.legistar.com/v1/richmondva/Matters`.
* **No further action required on API access** — teams can build directly against the confirmed endpoint (corrected 2026-03-18).
* **Fallback still useful as resilience**: cache a snapshot of API responses before the hackathon demo in case of rate limits or transient outages.

### Address Fields: Confirmed — Parsing Required
Confirmed: Richmond's Legistar does NOT include a structured address field for land-use items (SUP and planning cases). Street addresses appear in the MatterTitle text field and require string parsing for geocoding (corrected 2026-03-18).
* **Action**: Teams must implement a rules-based parser (e.g., street number + name + suffix patterns) and supplement with parcel IDs cross-referenced against ArcGIS layers. Do not assume a clean address field exists.

### ArcGIS/GeoHub Layers: REST and Freshness
Richmond provides spatial data via its Interactive Mapping Tools. The GeoHub Development Tracker (ArcGIS web map ID `777f2b6383fe42da9c6aaeac8df77c8c`) was last updated January 8 2026 and tracks projects >$1.5M since 2016 (corrected 2026-03-18). The Land Use Project Mapper is "being updated" with no stable REST endpoint available (corrected 2026-03-18). A "Plans of Development" dataset also exists on the Richmond GeoHub [5].
* **Action**: Use the GeoHub Development Tracker (web map ID `777f2b6383fe42da9c6aaeac8df77c8c`) as the primary development activity layer. Do not depend on the Land Use Project Mapper — it has no stable REST endpoint. Verify the `lastEditDate` on the Development Tracker before the hackathon to confirm it remains current enough for demo use (corrected 2026-03-18).

## Seed the Compliance Portfolio: What We Can Assemble Today

While a comprehensive, canonical database of all city-funded affordable housing is missing, teams do not need to wait for a City IT export to begin building the compliance tool. A highly accurate starter portfolio can be reconstructed immediately using recent public disclosures.

| Source Material | Evidence & Data Points Available | Utility for Hackathon Teams |
| :--- | :--- | :--- |
| **AHTF Press Release (Aug 12, 2025)** | Announces $9M total allocation, with $7M directed to 8 specific projects creating nearly 600 units. Lists developers, unit counts, districts, and award amounts [6]. | Provides a modern seed list of active projects to populate the compliance dashboard. |
| **AHTF Annual Report 2024** | Details $7,030,835 awarded impacting 1,048 units. Includes specific project data (e.g., Blueridge Estates: 182 units; Bellevue Gardens: $750k) and flags stalled projects like "Heights at Brady Square" [7]. | Adds a historical cohort and provides a real-world failure case to model risk alerts against. |
| **Legistar Ordinances** | Individual ordinances authorize specific grants/loans (e.g., ORD. 2025-236 for Bellevue Gardens at 3940 Rosedale Avenue) [8]. | Verifies exact physical addresses and legal conditions for geocoding and compliance tracking. |

* **Action**: Analysts should immediately compile a starter portfolio table (Project Name, Address, Developer, Units, Award, Ordinance ID) from these 2024–2025 sources. Concurrently, request a full portfolio export from the Department of Housing and Community Development (HCD) to close historical gaps.

## Compliance Workflow Discovery: Avoid Building the Wrong Thing

The policies governing Richmond's housing compliance are well-documented in the 2020 HCD Procedures Manual [9]. However, the *operational* workflow—the actual systems staff use daily, the cadence of their work, and their specific pain points—remains a critical blind spot. For example, the PY 2024/FY 2025 Consolidated Annual Performance and Evaluation Report (CAPER) noted that no HOME housing units were due for inspection during that specific period [10]. This indicates that compliance monitoring is highly cyclical, and building a dashboard that assumes constant daily alerts may result in a tool that doesn't fit staff realities.
* **Action**: Schedule a 45–60 minute discovery interview with HCD compliance staff. Map their current systems (e.g., Excel, SharePoint, HMIS) and define alert-worthy events (e.g., building permit inactivity >180 days, code violations) to ensure the MVP features align with actual operational bottlenecks.

## Resident Digital Access: Design for Multi-Channel from Day One

Designing web-first tools without understanding the digital literacy and broadband access of affected neighborhoods risks excluding the most vulnerable residents. While the HUD CHAS data API was recently updated on December 23, 2025 [11], and the Census Bureau's ACS Table S2801 tracks internet subscriptions [12], this data has not yet been pulled for Richmond's specific development hotspots.
* **Action**: Extract ACS S2801 data for Richmond city to compute the percentage of households that are "cellular-data only" or have "no internet subscription" [12]. Overlay this data with development hotspots from GeoHub. 
* **Product Decision**: Default the notifier tool to an SMS opt-in model and generate printable one-pagers for physical distribution. A web portal is necessary but insufficient for equitable neighborhood engagement.

## Ownership and Continuity: Secure a Departmental Champion

A prototype without a City owner becomes shelfware the day the hackathon ends. Identifying a champion is a prerequisite for post-event continuity. Potential sponsors are already visible in recent housing initiatives, including Mayor Danny Avula, HCD Director Merrick Malone, AHTF Board Chair Ellen Robertson, and Planning Director Kevin Vonck [6] [7].
* **Action**: Engage these leaders to secure one executive sponsor and one operational product owner. Draft a 1-page Memorandum of Understanding (MoU) committing to a weekly 30-minute sync and a defined data-sharing pathway for 60–90 days post-hackathon.

## Translator Accuracy: Define the Bar and Test Before Public Release

There is currently no standard for how accurate an AI-generated plain-language summary of a planning document needs to be. The risk of publishing hallucinated zoning constraints or incorrect meeting dates is severe.
* **Action**: Establish a two-tier benchmark before public release:
 1. **Zero Tolerance**: 100% accuracy required for identifiers (file numbers, addresses, districts, vote outcomes, meeting dates).
 2. **Content Coverage**: ≥95% factual coverage of key conditions with no invented facts.
* Test the AI translator against a "gold set" of 30 recent staff reports, utilizing a human planner to redline the outputs and refine the system prompts.

## Build Plan: Week-by-Week Mitigations and Milestones

To maintain momentum, teams must front-load source enablement while parallel-pathing workarounds.

**Week 0–1: De-risking and Data Seeding**
* **Legistar**: Execute endpoint tests; conduct outreach to IT; stand up HTML/RSS scrapers as a fallback.
* **ArcGIS**: Document service freshness for GeoHub layers; assign primary or enrichment roles based on update frequency.
* **Portfolio**: Compile the 2024–2025 AHTF projects into a seed database; request the canonical HCD export.
* **Digital Access**: Pull ACS S2801 data; draft the multi-channel (SMS/Print/Web) strategy.
* **Ownership**: Secure the departmental champion and schedule the HCD discovery interview.

**Week 2–3: Core Logic and Benchmarking**
* **Address Audit**: Complete the manual Legistar address audit; build the text parser and test geocoding hit-rates.
* **Compliance**: Complete HCD workflow discovery; define the early-warning alert rules (e.g., using the "Heights at Brady Square" stalled project as a model).
* **Translator**: Run the 30-item AI benchmark test; set release gates based on accuracy.

**Week 4+: Hardening and MVP Launch**
* **Integration**: Swap scrapers for the Legistar API if enabled.
* **Launch**: Deploy the notifier (using GeoHub as primary if fresh), the compliance dashboard (populated with the AHTF cohort), and the translator (gated to internal/pilot audiences until accuracy is proven).

## References

1. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
2. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
3. *How to identify my city's legistar client name?*. https://groups.google.com/g/open-civic-data/c/sMxWQs2JwZU
4. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
5. *Plans of Development | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/3d63de08ef924513bbfa9448e6b66dd6_0/about
6. *City awards $9 million through Affordable Housing Trust Fund | Richmond*. https://www.rva.gov/press-releases-and-announcements/news/city-awards-9-million-through-affordable-housing-trust-fund
7. *2022-2023 AHTF Board Annual Report*. https://www.rva.gov/sites/default/files/2025-08/AHTF%20Annual%20Report%202024%2012-23-2024%20%282%29.pdf
8. *
	City of Richmond - File #: ORD. 2025-236
*. https://richmondva.legistar.com/LegislationDetail.aspx?ID=7702635&GUID=C3582192-7BB5-41B0-B8A9-81CD6F5C0445&Options=&Search=
9. *procedures manual for federal entitlement funds for fiscal ...*. https://www.rva.gov/sites/default/files/2020-08/PD-ProceduresManual2019-20.pdf
10. *PY 2024/FY 2025 Consolidated Annual Performance ...*. https://www.rva.gov/sites/default/files/2025-09/PY2024%20FY2025%20CAPER%20-%20For%20Public%20Review_0.pdf
11. *Consolidated Planning/CHAS Data | HUD USER*. https://www.huduser.gov/portal/datasets/cp.html
12. *broadband - Census Bureau Tables*. https://data.census.gov/cedsci/table?q=broadband&g=0400000US10