# Richmond development clarity in 48 hours — a resident-first, data-backed path

## Executive Summary
For a weekend software prototype in Richmond, VA, the most actionable and research-ready problem is addressing resident confusion around neighborhood development proposals. While affordable housing compliance is a critical Pillar 2 goal, the City's Affordable Housing Trust Fund (AHTF) monitoring involves complex, multi-year documentation including quarterly construction reports, final reports, and annual affordability certifications over a 15-year period [1]. This back-office workflow is too intricate for a 48-hour build. 

Instead, the prototype should focus on a "What's planned near me?" tool. Currently, residents must navigate fragmented systems: the City's website directs them to manually search the Legistar calendar using specific dropdown filters [2], while the Land Use Project Mapper is currently "being updated" and the Development Mapper only displays projects exceeding $1.5 million [3]. By combining Legistar's legislative data with the City's ArcGIS parcel and zoning layers, a weekend team can build a single-entry address search that surfaces pending Planning Commission and City Council items, providing immediate clarity and actionable engagement steps for residents.

## Problem Focus — Resident confusion about nearby development is solvable in 48 hours
Richmond residents seeking information about development in their neighborhoods face a fragmented and often outdated digital landscape. The primary friction point is not a lack of public data, but the scattered nature of its presentation. 

When residents visit the City's Planning Commission page, they are instructed to "click here" to view the Legistar calendar and manually apply preset values from drop-down lists to find specific meeting documents [2]. If they turn to visual tools, they encounter significant limitations: the Land Use Project Mapper is currently offline for updates, and the Development Mapper only shows projects valued over $1.5 million and is only "updated periodically" [3]. This fragmentation makes it nearly impossible for an average resident to quickly answer, "What is being built down the street?" A weekend prototype focusing on an address-based proposal lookup directly solves this immediate resident need, whereas building internal compliance tooling would require navigating confidential contracts and complex workflows [1].

## Data Landscape — Legistar + ArcGIS layers are sufficient for an MVP
The foundation for a successful prototype relies on combining narrative legislative data with spatial context. Richmond's Legistar system contains the decision-critical narrative, process history, and attachments for development proposals. For example, a Special Use Permit (SUP) ordinance (e.g., ORD. 2025-095) contains the street address (14 South Lombardy Street) in the body text, alongside a detailed history of its progression through the Planning Commission and City Council [4]. 

To anchor this text data spatially, the prototype can leverage the City's ArcGIS layers. The Zoning Parcel Mapper exposes critical layers including Parcels, Zoning Districts, Special Use Permits, Board of Zoning Appeals Cases, and Design Overlay Districts [3]. By extracting addresses from Legistar and cross-referencing them with the Parcels layer, the prototype can normalize locations and provide immediate zoning context.

### Table — Core sources and roles for the MVP
| Source | What it provides | Update cadence | Access method | Reliability risks | How MVP uses it |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Legistar Calendar/Matters | Meeting dates, agendas, item histories, ordinances [5] [4] | Continuous | Web scraping / API | Address fields may be embedded in body text rather than structured fields | Primary source for "what" and "when" |
| Zoning Parcel Mapper | Parcels, Zoning Districts, SUPs, Overlays [3] | Periodic | ArcGIS REST Services | Requires accurate address matching to join | Primary source for "where" and "what rules apply" |
| Planning Commission Page | Roster, general duties, meeting cadence [2] | Static/Infrequent | Web | May not reflect real-time schedule changes | Context for resident engagement |
| Development Mapper | Projects over $1.5M [3] | Periodic | ArcGIS Web Map | Excludes smaller neighborhood projects | Excluded from primary MVP pipeline |
| Land Use Project Mapper | Current land use projects [3] | Currently being updated [3] | ArcGIS Web Map | Currently unavailable/unstable | Excluded until back online |

## User Journey Breakpoints — Where residents get stuck and how to fix it
The current resident journey breaks down at three critical stages: discovery, context, and engagement. 
1. **Discovery:** Residents struggle to find relevant items because they must manually filter the Legistar calendar by department and year [2]. 
2. **Context:** Even if they find an ordinance, understanding its spatial impact requires cross-referencing the address with the Zoning Parcel Mapper to see existing zoning and overlays [3]. 
3. **Engagement:** Knowing how and when to comment is obscured. The Planning Commission generally meets on the first and third Tuesdays of the month at 6:00 PM, with Microsoft Teams links provided in the calendar [5] [2], but this requires digging through the agenda packet.

The MVP intervenes by offering a single address search that automatically surfaces the next relevant meeting, provides a direct link to the agenda, displays the parcel and zoning context, and offers plain-language instructions on how to attend or comment.

## MVP Definition — Build “What’s Planned Near Me?” V0.9 in 48 hours
The Minimum Viable Product (MVP) must prioritize a narrow, reliable slice of functionality over comprehensive citywide indexing. The core feature is an address search that returns a list of pending Planning Commission and City Council items within a specific radius, complete with parcel/zoning context and the date of the next relevant meeting. 

Non-goals for the 48-hour window include building an official public notice system, creating a comprehensive historical archive, or developing back-office affordable housing compliance tools. The technical plan involves fetching recent Legistar matters, using heuristics to extract addresses from the text [4], matching those to the ArcGIS parcel layer [3], and displaying them on a simple map interface.

### Table — 48-hour build plan
| Task | Owner | Est. hours | Dependencies | Risk | Mitigation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Data access tests | Backend Lead | 2 | None | Legistar API unavailable | Fallback to HTML scraping of recent CPC agendas |
| Address extraction | Backend Lead | 4 | Data access | Addresses buried in PDF attachments | Focus on body text parsing first; use manual seed list if <70% hit rate |
| Parcel match | GIS Lead | 4 | Address extraction | Address string mismatch | Use fuzzy matching against ArcGIS parcel layer |
| UI & Map | Frontend Lead | 8 | Parcel match | Map rendering performance | Use lightweight leaflet map with minimal layers |
| Content & Engagement | UX/Content | 4 | None | Confusing terminology | Write plain-language "how to comment" guides |
| QA & Demo flow | Full Team | 4 | All above | Demo fails live | Hardcode a reliable "golden path" address for the presentation |

## Data Access Plan — Verify endpoints and extraction reliability, fast
The critical path for the first six hours is validating programmatic access to Legistar and the reliability of address extraction. The team must test whether the Granicus Web API is open for Richmond or if HTML scraping of the calendar and matter pages is required. A sample of 25-50 recent Planning Commission and City Council matters should be audited to determine how often the subject property address appears in the structured title or body text (as seen in ORD. 2025-095 [4]) versus being locked in PDF attachments. If the automated address hit rate is below 70%, the team should pivot to a manually curated seed list of 20 high-impact neighborhood projects to ensure a functional demo. Simultaneously, the team must verify the ArcGIS REST service endpoints behind the Zoning Parcel Mapper to ensure the Parcels and Zoning Districts layers can be queried dynamically [3].

## Affordable Housing Angle — Add value without handling confidential compliance
While the City's Affordable Housing Trust Fund (AHTF) requires rigorous compliance monitoring—including quarterly reports during construction, a final report with financial statements, and annual affordability certifications for 15 years [1] —this workflow is too complex and confidential for a public hackathon. 

Instead, the prototype can add value by providing an "Affordability near me" context layer using public data. The National Housing Preservation Database (NHPD) offers an address-level inventory of federally assisted rental housing and a mapping tool to identify properties at risk of losing subsidies [6] [7] [8]. The prototype can link out to the NHPD mapping tool and flag Legistar ordinances that contain keywords like "affordable" or "AHTF," providing transparency without assuming official monitoring responsibilities.

### Table — Public affordability data sources and use in MVP
| Source | Coverage | Access | Data fields | Use in MVP | Caveats |
| :--- | :--- | :--- | :--- | :--- | :--- |
| National Housing Preservation Database (NHPD) | Federally assisted rental housing [8] | Registration required / Mapping Tool [6] [7] | Subsidies, end dates, locations [9] | Link out for "Affordability near me" context | Requires user registration for detailed data [7] |
| Virginia Housing | Statewide rental compliance [10] | Web | Regulatory adherence resources [10] | Informational link | High-level guidance, not property-specific |
| Legistar Ordinances | City Council actions [4] | Web / API | Ordinance body text [4] | Flag keywords (e.g., "affordable") | Unstructured text; requires careful parsing |

## Credibility and Community-Centered Framing — Earn trust from judges, staff, orgs
To ensure the prototype is viewed as a credible, continuation-worthy tool rather than a disruptive rogue application, it must be framed with extreme transparency. The application must prominently feature a "Not an official City system" disclaimer. Every data point must include a provenance link—for example, a "View source in Legistar" button routing directly to the official matter page, and a "View this parcel in Zoning Mapper" link [4] [3]. By displaying a "Last updated" timestamp and providing clear, accessible instructions on how to join the Microsoft Teams meetings for the Planning Commission [5], the tool positions itself as a bridge between the community and official City processes, rather than a replacement for them.

## Comparative Patterns to Borrow — Proven civic UX we can adapt
The prototype should borrow established user experience patterns from successful civic tech tools like Councilmatic. 

### Table — Reusable patterns vs. our MVP choices
| Pattern | Source tool | Why it works | How we adapt in 48h | Risk |
| :--- | :--- | :--- | :--- | :--- |
| Address-first search | Councilmatic / Zoning Mappers | Centers the user's immediate physical context | Single search bar resolving to ArcGIS parcel | Geocoding failures |
| Item timeline cards | Councilmatic | Demystifies the legislative process | Show CPC and Council dates from Legistar history [4] | Missing historical data |
| Minimalist context map | Lookout SF | Prevents GIS overload | Show only parcel outline and zoning color [3] | Map rendering bugs |
| Direct engagement links | Various civic tools | Reduces friction to action | Surface the Teams link and agenda PDF [5] | Links change last minute |

## Measurement and Handoff — Prove impact and set up continuation
Success at the 48-hour mark is defined by a live demonstration where a user can enter a Richmond address, view a pending Planning Commission item within 30 seconds, understand its zoning context, and click directly into the official Legistar agenda. To ensure the project lives beyond the weekend, the team must package the code in an open-source repository with clear documentation on the Legistar parsing logic and ArcGIS service configurations. Identifying a specific point of contact within the Planning & Development Review department or a local neighborhood association will facilitate a warm handoff for future iterations.

## Evidence Base (URLs) — What we relied on and why it’s trustworthy
* **Planning Commission Operations:** https://www.rva.gov/planning-development-review/planning-commission [2]
* **Legistar Calendar & Matters:** https://richmondva.legistar.com/ [5] and specific ordinance examples like ORD. 2025-095 [4].
* **Interactive Mapping Tools:** https://www.rva.gov/planning-development-review/interactive-mapping-tools (Details the Zoning Parcel Mapper, Development Mapper, and the offline status of the Land Use Project Mapper) [3].
* **Affordable Housing Trust Fund Guidelines:** https://rva.gov/sites/default/files/2025-11/AHTF%20Program%20Guidelines%20%28upd%2011.5.25%29.pdf [1].
* **National Housing Preservation Database:** https://preservationdatabase.org/ [6] and its mapping tool [7].

## Open Questions and Risks — What we must validate Day 1
* **Legistar API Access:** Is the Granicus Web API fully open for Richmond, or will the team be forced to rely on HTML scraping?
* **Address Reliability:** What percentage of Legistar development matters contain a cleanly formatted street address in the title or body text versus being buried in scanned PDF attachments?
* **ArcGIS Integration:** Can the team successfully query the Parcels layer via REST to perform spatial joins with the extracted Legistar addresses?

## Priorities and Timeline — 48-hour execution plan
* **Hours 0-6:** Validate Legistar endpoints, audit 25-50 items for address extraction viability, and confirm ArcGIS parcel resolver functionality.
* **Hours 6-24:** Build the data ingest pipeline, execute geocoding/joins, and stand up the UI skeleton with provenance panels.
* **Hours 24-36:** Polish the user experience, integrate plain-language "how to engage" content, and add the NHPD affordability link-outs.
* **Hours 36-48:** Conduct QA testing on 2-3 specific neighborhoods, finalize the demo script using a reliable "golden path," and package documentation for handoff.

***

## Output Summary: Facts, Inferences, Unknowns, and Priorities

**Facts (with URLs)**
* The Richmond Planning Commission generally meets on the first and third Tuesdays of the month at 6:00 PM. (http://rva.gov/planning-development-review/planning-commission) [2]
* The City's Land Use Project Mapper is currently "being updated" and the Development Mapper only shows projects over $1.5 million. (http://rva.gov/planning-development-review/interactive-mapping-tools) [3]
* The Affordable Housing Trust Fund (AHTF) requires recipients to submit quarterly reports during construction, a final report, and annual affordability certifications. (http://rva.gov/sites/default/files/2025-11/AHTF%20Program%20Guidelines%20%28upd%2011.5.25%29.pdf) [1]
* The National Housing Preservation Database (NHPD) provides an interactive mapping tool to find affordable rental properties. (http://experience.arcgis.com/experience/a5d6ef93eed54d2bb795af627bd7f3b1/page/Page) [7]

**Inferences**
* *Inference:* Because the AHTF compliance process involves extensive, multi-year documentation and legal agreements, building a compliance monitoring tool is not feasible for a 48-hour hackathon.
* *Inference:* Because the City explicitly directs residents to use the Legistar calendar with manual drop-down filters to find planning documents, residents likely experience high friction when trying to discover neighborhood-level impacts.
* *Inference:* Legistar body text (as seen in ORD. 2025-095) contains actionable address data, meaning text parsing can successfully link legislative items to spatial GIS layers.

**Unknowns**
* The exact availability and rate limits of the Granicus Web API for Richmond's Legistar instance.
* The percentage of development-related Legistar items that contain easily extractable addresses in the body text versus those locked in PDF attachments.
* The specific text of the two "Pillar 2" statements mentioned in the user's prompt (as they were not present in the retrieved evidence).

**Priority ranking of questions by research urgency**
1. **Question 3:** What is the actual structure and accessibility of Richmond's Legistar data? *(Critical path for data ingest)*
2. **Question 4:** What GIS layers on the Richmond GeoHub most directly support a lookup tool? *(Critical path for spatial context)*
3. **Question 2:** Where exactly do Richmond residents get stuck? *(Defines the UX/UI requirements)*
4. **Question 9:** What minimum viable prototype could meaningfully reduce resident confusion? *(Defines the 48-hour scope)*
5. **Question 10:** What evidence and framing would make a prototype feel credible? *(Critical for demo success and handoff)*
6. **Question 5:** What does the City's affordable housing compliance monitoring workflow look like? *(Important for scoping out/excluding from the MVP)*
7. **Question 6:** What public data exists to support housing compliance? *(Needed for the "Affordability near me" context layer)*
8. **Question 8:** What comparable tools offer patterns to adapt? *(Useful for UI shortcuts)*
9. **Question 1:** Which Pillar 2 statement reflects the clearest problem? *(Largely answered by pivoting to the resident lookup tool)*
10. **Question 7:** Which Richmond institutions help residents navigate the process? *(Important for Day 2 outreach, but not blocking the initial build)*

## References

1. *Program Guidelines – AHTF | Affordable Housing Trust Fund*. https://rva.gov/sites/default/files/2025-11/AHTF%20Program%20Guidelines%20%28upd%2011.5.25%29.pdf
2. *Planning Commission | Richmond*. https://www.rva.gov/planning-development-review/planning-commission
3. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
4. *
	City of Richmond - File #: ORD. 2025-095
*. https://richmondva.legistar.com/LegislationDetail.aspx?ID=7356395&GUID=864C2405-DE62-4A11-942A-8F49CA0B2FA1&FullText=1
5. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
6. *Home - National Housing Preservation Database (NHPD)*. https://preservationdatabase.org/
7. *National Housing Preservation Database (NHPD) Mapping Tool October 2025*. https://experience.arcgis.com/experience/a5d6ef93eed54d2bb795af627bd7f3b1/page/Page
8. *About the Database*. https://preservationdatabase.org/about-the-database/
9. *Accessing the Database - National Housing Preservation Database (NHPD)*. https://preservationdatabase.org/accessing-the-database/
10. *Rental Housing Compliance Monitoring*. https://www.virginiahousing.com/partners/rental-housing/compliance-monitoring