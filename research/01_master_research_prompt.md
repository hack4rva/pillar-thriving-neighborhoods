# Richmond Land-Use Visibility and Affordability Compliance: 48-Hour Build Paths

## Executive Summary
For the upcoming Richmond Civic Hackathon, teams tackling Pillar 2 (Thriving Neighborhoods) face two distinct but related data challenges: residents cannot easily see what is being built near them, and the City struggles to track the long-term affordability of what has already been funded. 

The core barrier is not a lack of public data, but its fragmentation. Planning information is split across Richmond's GeoHub (spatial data), the Socrata Open Data Portal (tabular data), and Legistar (PDF-heavy meeting agendas). Meanwhile, affordable housing obligations are scaling rapidly—the Affordable Housing Trust Fund (AHTF) awarded $7M for 822 units in FY2024 and $5.9M for 580 units in FY2025 [1] —but compliance tracking remains highly manual and document-bound. 

To deliver weekend-buildable software, hackathon teams must avoid attempting deep integrations with internal City systems. Instead, the highest-value opportunities lie in building lightweight crosswalks: joining spatial feeds from GeoHub with scraped agenda data to create "near me" alerts, and extracting structured compliance checklists from AHTF PDFs to build a property-level tracking register.

## Richmond Problem Landscape Summary

Two critical visibility gaps currently hinder Richmond's neighborhood development goals: residents cannot see proposals early enough to engage, and affordability compliance is not transparently tracked. Both are solvable with lightweight data crosswalks.

### Discovery Gap is Structural: Data is Split Across Portals and Formats
Richmond's public data exists, but it is scattered across three distinct systems, forcing residents to manually stitch together information to understand neighborhood impacts. 
* **Richmond GeoHub (ArcGIS):** Hosts spatial feature services, including the Plans of Development layer (covering rezonings and conditional rezonings) [2], Board of Zoning Appeals (BZA) cases [3] [4], and Planning Districts [5].
* **Socrata Open Data Portal:** Serves as the central catalog for city datasets (`data.richmondgov.com`) with API access [6] [7].
* **Legistar:** Houses City Council and commission agendas, ordinances, and meeting minutes. Crucially, narrative facts (conditions, community benefits) live in attached PDFs rather than structured fields.

| Portal | URL / Access | Data Types | Format / API | Spatial Fields |
| :--- | :--- | :--- | :--- | :--- |
| **GeoHub** | `richmond-geo-hub-cor.hub.arcgis.com` | Plans of Development, BZA cases, Planning Districts | Feature Service / REST | Yes (Polygons/Points) |
| **Socrata** | `data.richmondgov.com` | Budget, safety, neighborhood metrics | JSON / Socrata API | Varies |
| **Legistar** | `richmondva.legistar.com` | Agendas, Ordinances, AHTF awards | HTML / PDF Attachments | No (Text addresses only) |

*Takeaway: A crosswalk that links a Legistar agenda item to a GeoHub parcel feature turns scattered data into a usable neighborhood feed.*

### Compliance Gap is Procedural: Awards Scale Faster Than Verification
Richmond is aggressively funding affordable housing, but tracking the resulting obligations is overwhelming limited staff capacity. The AHTF allocated $10M in FY2024 [8]. Recent outcomes show $7M awarded to eight projects producing 822 units in FY2024, and $5.9M awarded to eight projects producing 580 units (plus $2.2M for Healthy Homes) in FY2025 [1]. 

Simultaneously, preservation pressure is mounting. Since 2020, Richmond added 23 new rental subsidies (1,869 units) but lost 10 subsidies (435 units), resulting in a net gain of 1,434 contracts [9]. Statewide, the risk is severe: 7,126 publicly supported rental homes face expiring affordability restrictions in the next five years, 67% of which are assisted by Low Income Housing Tax Credits (LIHTC) [10].

## User Groups and Stakeholder Map

Understanding who needs this data and who can sustain the tools post-hackathon is critical for project viability.

### Primary Users in Hotspot Districts
Early, localized notice is worth the most where displacement pressure is highest. Since 2016, average asking rents have surged by **41% in Northside** and **39% in South Richmond** [9]. Residents, neighborhood associations, and tenant organizers in these districts are the primary users for discovery tools.

### Institutional Actors and Continuation Partners
For tools to survive past Sunday, they need institutional champions.

| Stakeholder | Pain Point | Needed Capability | Continuation Role |
| :--- | :--- | :--- | :--- |
| **Residents (Northside/Southside)** | Blindsided by development; rent hikes | Geofenced "near me" alerts; plain-language summaries | End users; feedback providers |
| **City Staff (PDR & HCD)** | Overwhelmed by manual compliance tracking | Lightweight property-level compliance register | Institutional adopters |
| **AHTF Oversight Board** | Needs to verify funded units remain affordable | Dashboard of AHTF milestones and expirations | Policy champions |
| **HousingForward Virginia** | Needs localized preservation data | Richmond-specific expiry radar | Ecosystem partner / Host [11] |

## Current-State Journey Maps

To build effective interventions, teams must understand where residents and staff currently struggle.

### Journey 1: Discovering a Neighborhood Development Proposal
* **Current Steps:** A resident hears a rumor -> Searches the Interactive Parcel Mapper [12] -> Identifies the address -> Searches Legistar for upcoming agendas -> Downloads 50-page PDFs -> Tries to determine the meeting date and public comment rules -> Prepares comment.
* **Pain Points:** There is no single "near me" feed. Agendas are not geocoded. Furthermore, decisions are split across multiple bodies (Planning Commission, BZA, Commission of Architectural Review, Urban Design Committee), each with different rules.

| Board / Commission | Typical Items | GeoHub Layer Available? | Hackathon Integration Path |
| :--- | :--- | :--- | :--- |
| **Planning Commission** | Rezonings, Master Plan changes | Yes (Plans of Development) | Spatial query + Legistar scrape |
| **Board of Zoning Appeals** | Variances, Special Exceptions | Yes (BZA Cases) | Spatial query |
| **Commission of Architectural Review** | Historic district modifications | No (Manual search required) | Manual tagging / PDF scraping |

### Journey 2: Tracking Affordable Housing Compliance
* **Current Steps:** City awards AHTF funds [8] -> Staff extracts obligations (units, Area Median Income targets, term length) from the Guidelines PDF [1] -> Staff monitors milestones via email (closing, certificate of occupancy) -> Periodic manual verification.
* **Pain Points:** Obligations live in unstructured PDFs. There is no public compliance dashboard. Preservation expirations (like LIHTC) are not surfaced locally in an actionable format.

## Source Inventory

Teams can safely build on the following public, read-only endpoints during the 48-hour sprint.

| Source Name | URL | Format / API | Hackathon Use Case |
| :--- | :--- | :--- | :--- |
| **GeoHub: Plans of Development** | `richmond-geo-hub-cor.hub.arcgis.com/datasets/3d63de08ef924513bbfa9448e6b66dd6_0/about` [2] | Feature Service | Base layer for development alerts |
| **GeoHub: BZA Cases** | `richmond-geo-hub-cor.hub.arcgis.com/datasets/board-of-zoning-appeals/about` [3] | Feature Service | Base layer for zoning alerts |
| **GeoHub: Planning Districts** | `richmond-geo-hub-cor.hub.arcgis.com/datasets/cor::planning-districts/about` [5] | Feature Service | Filtering alerts by neighborhood |
| **Socrata Open Data Portal** | `data.richmondgov.com` [6] | JSON / API | Cross-referencing city datasets |
| **AHTF Program Guidelines** | `rva.gov/sites/default/files/2025-11/AHTF%20Program%20Guidelines%20%28upd%2011.5.25%29.pdf` [1] | PDF | Schema source for compliance tracking |
| **National Housing Preservation Database** | `preservationdatabase.org` [13] | Map / CSV (Requires Reg) | Identifying expiring subsidies |

*Takeaway: Avoid internal permitting back-ends. Stick to these public endpoints to minimize institutional risk.*

## Prior Art and Benchmark Scan

Teams should borrow proven civic tech patterns rather than inventing from scratch.

| Tool | Core Feature to Emulate | Richmond Data Source | Weekend Feasibility |
| :--- | :--- | :--- | :--- |
| **Councilmatic** | Agenda search and email alerts | Legistar scraping | High (if scoped to 1-2 boards) |
| **Lookout SF** | Plain-language development explainers | GeoHub PoD + LLM PDF parsing | Medium (requires human QA loop) |
| **NLIHC / NHPD** | Preservation risk mapping | NHPD VA Profile [10] | High (using exported CSVs) |

## Opportunity Areas Sorted by Hackathon Feasibility

### Tier 1: Ship in 48 Hours (Public Endpoints)
* **Neighborhood Development Watch:** A geofenced alert system using GeoHub's Plans of Development [2] and BZA [3] feature services. Users drop a pin and receive alerts for cases within 1,000 feet.
* **Unified Land-Use Calendar:** A merged calendar of Planning Commission, BZA, and CAR agendas. Spatialize items where GeoHub datasets exist; use manual tags elsewhere.
* **Plain-Language Docket Summaries:** An OCR + LLM pipeline that extracts 5-10 key fields (address, unit counts, meeting outcomes) from Legistar PDFs, outputting to a small, human-verified datastore.

### Tier 2: Prototype Core (Data Access May Be Gated)
* **AHTF Compliance Register:** A property-level checklist seeded from AHTF guidelines [1] and ordinances. Pilot this with 10 known properties to prove value to HCD staff.
* **Affordability Expiry Radar:** A localized dashboard pulling Richmond properties from the NHPD [13] to flag 0-60 month expirations, auto-generating an outreach task list. *(Note: NHPD data downloads require registration; teams should use pre-exported data for the hackathon).*

## Risks, Ethics, Data-Quality Concerns, and Implementation Barriers

| Risk | Evidence / Context | Impact | Mitigation in MVP |
| :--- | :--- | :--- | :--- |
| **Data Freshness** | Update cadence for GeoHub PoD/BZA layers is undocumented. | Users may receive outdated alerts, eroding trust. | Display prominent "Last Updated" badges from the source API. |
| **PDF Messiness** | Legistar attachments are unstructured and sometimes scanned images. | Automated parsers will hallucinate or miss data. | Mandate a "human-in-the-loop" QA step for any LLM extraction. |
| **Privacy Violations** | Tracking affordable housing can inadvertently expose tenant data. | Severe ethical breach. | Strictly limit schema to *property-level* public commitments (units, AMI, term). |
| **Misinterpretation** | Multiple boards have different authorities (e.g., advisory vs. binding). | Residents may comment to the wrong body. | Include "What this board decides" tooltips in the UI. |

## Recommendations for 3-5 Weekend-Buildable Project Directions

1. **Neighborhood Development Watch (Geo-Alerts):** Build a buffered query tool using the GeoHub Plans of Development and BZA endpoints. Allow residents in high-pressure areas like Northside and South Richmond to sign up for SMS/email alerts. *Success metric: Working prototype with successful spatial queries.*
2. **Unified Land-Use Calendar with Map Links:** Aggregate ICS/HTML feeds from the various planning boards into a single view. *Success metric: A single web page where a user can see all land-use meetings for the month, with map pins for geocoded items.*
3. **AHTF Compliance Register Pilot:** Create a lightweight CRUD application based on the AHTF Program Guidelines [1]. Track fields like affordability term, AMI targets, and funding source for 10 recent projects. *Success metric: A functional dashboard that replaces staff spreadsheet tracking.*
4. **Richmond Expiry Radar:** Use NHPD data to map the 67% of LIHTC properties [10] and other subsidies at risk of expiration in Richmond. *Success metric: A prioritized "To-Do" list for preservation outreach.*

## Explicit Unknowns to Validate

To de-risk these builds, teams should schedule a 15-minute validation sync with City staff (PDR/HCD) or nonprofit partners early in the hackathon to answer:
* **GeoHub Cadence:** How often are the Plans of Development and BZA layers actually updated by staff?
* **Legistar API:** Is there an undocumented Legistar Web API endpoint active for Richmond, or must teams rely entirely on HTML scraping?
* **AHTF Canonical List:** Is there a master spreadsheet of the FY24 and FY25 AHTF awards (the 16 projects totaling 1,402 units [1]) that teams can use to seed the Compliance Register?
* **NHPD Overlays:** Does HousingForward Virginia or the City already maintain a local overlay of the NHPD data that teams can access without waiting for NHPD registration approval?

## References

1. *Program Guidelines – AHTF | Affordable Housing Trust Fund*. https://rva.gov/sites/default/files/2025-11/AHTF%20Program%20Guidelines%20%28upd%2011.5.25%29.pdf
2. *Plans of Development | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/3d63de08ef924513bbfa9448e6b66dd6_0/about
3. *Board of Zoning Appeals | Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/board-of-zoning-appeals/about
4. *Board of Zoning Appeals*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/board-of-zoning-appeals/explore
5. *Planning Districts | Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/cor::planning-districts/about
6. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
7. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal
8. *Affordable Housing Trust Fund | Richmond*. https://www.rva.gov/housing-and-community-development/affordable-housing-trust-fund
9. *Richmond Regional Housing Framework Data Update*. https://pharva.com/wp-content/uploads/pha-data-update-FINAL-DRAFT-2023-01-25.pdf
10. *VIRGINIA*. https://preservationdatabase.org/wp-content/uploads/2023/12/PD-Profile_2023_MERGED-VA.pdf
11. *National Housing Preservation Database (NLIHC/PAHRC ...*. https://housingforwardva.org/research/national-housing-preservation-database/
12. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
13. *Home - National Housing Preservation Database (NHPD)*. https://preservationdatabase.org/