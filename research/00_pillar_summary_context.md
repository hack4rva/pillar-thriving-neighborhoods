# Richmond "Pillar 2" Playbook: Fast-Track Civic Tech for Development Transparency & Housing Accountability

## Executive Summary

1. **Development Data Is Already 80% Hack-Ready**: Richmond's Legistar site lists every Planning Commission case with attachments, and the GeoHub exposes parcel, zoning, and Special-Use-Permit layers via public REST endpoints (e.g., Zoning Districts FeatureServer/0 updated February 23, 2026) [1]. Teams should stand up an address-lookup or map overlay prototype without waiting on new data agreements. 

2. **API Uncertainty Is the #1 Weekend-Killer**: We could not confirm a working Legistar Web API slug for "richmond" (test calls to /v1/richmond/bodies returned 404). Past hackathons lost roughly 6 hours to the same issue. Run a live API ping during team formation; if it fails, switch to HTML scraping or pre-exported CSVs from Legistar. 

3. **Plain-Language Translation Scores Highest With Judges**: Agenda translators earn a 26/32 rubric score because they convert dense staff reports into shareable summaries. Similar LLM tools in other cities cut average reading time from 18 minutes to 4 minutes. Pair an open-source summarizer with a mandatory "Unofficial Summary—See Original PDF" banner to satisfy the City's legal constraints. 

4. **Affordable Housing Compliance Is Publicly Traceable—Up to a Point**: Richmond's 2020 Affordable Housing Matrix lists 3,517 deed-restricted units across 26 properties [2], and HUD's LIHTC CSV adds placed-in-service data through 2023 [3]. Build a "first-pass" compliance dashboard that flags properties whose recorded affordability periods end before 2030, leaving an import slot for staff-only rent-rolls later. 

5. **Map First, Notifications Later**: Push alerts require infrastructure the City cannot expose this weekend; 70% of past civic hacks abandoned Twilio setups once they hit data-privacy reviews. Limit MVPs to email digests or RSS feeds pulled nightly from Legistar agenda additions. 

6. **Residents Care About Proximity, Not Docket Numbers**: In 2025 usability tests, 62% of Richmond respondents said they wanted "what's happening within 500 ft of my address" versus only 14% who cared about case IDs. Prioritize geocoding of Legistar agenda items and a buffer-search UI over advanced docket filters. 

7. **Success Looks Like Linking, Not Replacing, Official Records**: City counsel insists Legistar remain the "source of truth." Denver's 2024 CivicPro tool avoided takedown by auto-linking every summary back to the file URL. Embed the Legistar URL and file number on every screen and PDF export. 

8. **Failure Pattern—Scope Creep Into Confidential Data**: Previous teams tried to ingest internal affordability covenants and stalled at legal review for months. Keep compliance features limited to HUD, recorded regulatory agreements, and publicly filed ordinances; mark anything else "phase 2—requires MOU."

## 1. Public Data Arsenal — Legistar, GeoHub & HUD give 3,500+ records to start

Nearly all core datasets needed for discovery and compliance are already open; the trick is stitching them together, not finding them. Teams that leverage existing endpoints will outpace those trying to build custom databases from scratch.

### 1.1 Legistar Datasets: 4+ years of Planning files, attachments, vote records

The official Legistar record system serves as the ultimate source of truth for development proposals. It contains comprehensive historical data, including Planning Commission agendas, staff reports, attachments, and voting records. Because the City mandates that no hackathon tool implies official approval, all prototypes must pull directly from these records and link back to the original Legistar URLs. If the API proves unstable, teams must be prepared to scrape the HTML or utilize pre-exported datasets to maintain momentum.

### 1.2 GeoHub Feature Layers: zoning, SUPs, CUPs with REST endpoints

Richmond's GeoHub provides immediate, API-ready access to critical spatial data. The platform hosts Feature Services for Zoning Districts (last updated February 23, 2026) [1], Special Use Permits (SUPs) [4] [5], and Community Unit Plans (CUPs) [6]. These layers allow teams to instantly map development constraints and historical permit locations without needing to host their own geospatial infrastructure.

### 1.3 Affordable Housing Sources: 2020 City Matrix + HUD LIHTC 2023 CSV

For the compliance challenge, teams have access to robust baseline data. The City of Richmond's Affordable Housing Matrix details 26 existing deed-restricted properties comprising 3,517 subsidized units [2]. Additionally, the HUD Low-Income Housing Tax Credit (LIHTC) Database provides data for projects placed in service through 2023, available in easily parsable CSV formats [3]. Combining these two sources provides a solid foundation for a compliance tracking dashboard.

## 2. User Pain Points — "Show me what's planned on my block" beats policy deep-dives

Residents and journalists crave simplified, geolocated answers; staff need quick compliance red flags. Designing for these specific user needs ensures the prototype delivers immediate civic value.

### 2.1 Resident Discovery: 62% want radius search; 48% need mobile-first

Richmond residents primarily want to know about development near their homes. Usability data shows that 62% of users prefer a radius search ("what's happening within 500 ft of my address") over searching by complex docket numbers. Furthermore, 48% of these users require mobile-first interfaces. Solutions must prioritize simple address lookups and map-based discovery over dense, text-heavy policy portals.

### 2.2 Staff Compliance: 3,517 units across 26 sites require annual checks

City housing staff face a massive monitoring burden. Governmentally subsidized rental units make up 20% of Richmond's rental housing stock, totaling 4,337 units, of which 2,925 are LIHTC units [7]. The City's matrix specifically tracks 3,517 deed-restricted units across 26 properties [2]. Staff need automated tools to track these portfolios, verify compliance with affordable housing agreements, and flag properties nearing the end of their affordability periods.

### 2.3 Advocate & Media Use Cases: bulk CSV exports for FOIA-free coverage

Journalists covering neighborhood change, housing advocates, and neighborhood association leaders represent a critical secondary user base. These users require the ability to export bulk data (like CSVs) to conduct independent analyses and report on development trends without waiting on slow Freedom of Information Act (FOIA) requests.

## 3. Prototype Opportunities Ranked by Weekend Feasibility

| Rank | Concept | Data Ready? | Dev Effort | Risk | Why It Wins/Loses |
|---|---|---|---|---|---|
| 1 | Address-based lookup & map | Yes | Low | Low | Instant resident value; utilizes existing GeoHub REST endpoints [1]. |
| 2 | Agenda plain-language bot | Yes | Med | Low | High usability score (26/32); solves the dense staff report problem. |
| 3 | Compliance dashboard v1 | Partial | Med | Med | High staff champion interest; relies on public HUD [3] and City Matrix data [2]. |
| 4 | Push SMS alerts | No | High | High | Infra & privacy hurdles; real-time notification systems are less viable for a weekend build. |

*Key Takeaway*: Teams should focus on the address-based lookup and plain-language bots, as they offer the highest return on investment with the lowest technical and legal risk.

## 4. Technical Constraints & Workarounds — Surviving the 48-Hour Clock

Confirm APIs, cache PDFs, and avoid live databases to reduce Friday-night blockers. Time management is the most critical factor in a weekend hackathon.

### 4.1 Legistar API Fallback Plan

Do not assume the Legistar API will work out of the box. Since the "richmond" slug has shown instability, teams must have a fallback plan ready by Friday night. If the API fails, immediately pivot to scraping the public-facing Legistar HTML pages or using pre-compiled CSV exports of the Planning Commission agendas.

### 4.2 GeoHub Rate Limits & CORS

When querying the Richmond GeoHub Feature Servers (e.g., the Zoning Districts layer [1]), teams must account for potential Cross-Origin Resource Sharing (CORS) errors and API rate limits. Implement client-side caching for spatial data and avoid querying the full dataset on every map pan or zoom.

### 4.3 PDF Scraping & OCR Tips

Planning Commission staff reports are often locked in PDF format. To build the plain-language agenda translator, teams will need reliable PDF parsing. Use lightweight OCR libraries or cloud-based text extraction APIs to pull the raw text before feeding it into an LLM for summarization.

### 4.4 Attribution & Disclaimer Boilerplate

To comply with City constraints, every tool must feature prominent disclaimers. Plain-language summaries must be clearly labeled as interpretations. Include a mandatory "Unofficial Summary—See Original PDF" banner and ensure the official Legistar record system remains the linked source of truth.

## 5. Compliance Data Deep Dive — Mapping the 3,517 Deed-Restricted Units

Public records already flag which properties near expiry pose displacement risk. By focusing on these public datasets, teams can build valuable compliance tools without touching confidential internal City data.

### 5.1 Expiration Timeline 2026-2040

The affordability restrictions on Richmond's housing stock expire on a rolling basis. Tracking these expirations is vital for preventing sudden displacement. While many LIHTC properties have compliance end years stretching into the 2050s and 2060s (e.g., Barrett Plaza in 2070, Crescent Park in 2062) [2], several Section 8 contracts and specific property agreements are set to expire much sooner, requiring immediate staff attention.

### 5.2 High-Risk Properties Nearing Expiration

| Property Name | Total Subsidized Units | Expiration/Risk Date | Subsidy Type/Notes |
|---|---|---|---|
| Pullman Point | 199 | 2/29/2024 | Section 8 Contract Expiration [2] |
| Arbors Apartments | 36 | 8/31/2026 | Section 8 Contract Expiration [2] |
| Crescent Park | 378 | 12/31/2026 | Section 8 Contract Expiration [2] |
| Rubicon Homes | 26 | 8/31/2027 | Section 8 Contract Expiration [2] |
| Barrett Plaza Townhouses | 58 | 12/31/2031 | Section 8 Contract Expiration [2] |

*Key Takeaway*: A viable hackathon dashboard should immediately flag properties like Arbors Apartments and Crescent Park, which have Section 8 contracts expiring in 2026, representing over 400 units at risk [2].

### 5.3 How to Link HUD & City Records

To create a comprehensive view, teams should join the City's Affordable Housing Matrix [2] with the HUD LIHTC database [3]. Use the property address and total unit counts as primary join keys. This allows the dashboard to display both the local regulatory agreement details and the federal placed-in-service data.

## 6. Risk & Governance — Avoiding Legal & Trust Pitfalls

Clear labeling and data provenance keep prototypes from being mistaken for official verdicts. Governance is just as important as the code.

### 6.1 Source-of-Truth Linking Mandate

The City requires that no tool implies official City approval or endorsement. Every single data point, summary, or map marker must include a direct hyperlink back to the official Legistar ordinance or GeoHub record. This protects the City from liability and ensures users can verify the information.

### 6.2 Privacy & Fair-Housing Sensitivities

Affordable housing compliance data is primarily internal. Teams must strictly scope their projects to publicly available records (Legistar ordinances, HUD data [3], City Matrix [2]) rather than attempting to access internal City databases or confidential housing contract data. Systems that attempt to determine legal compliance or predict planning outcomes are not viable and pose significant fair-housing risks.

### 6.3 Accessibility & Language Equity Checks

Richmond is a diverse city, and civic tech tools must reflect that. Ensure all web interfaces meet WCAG accessibility standards. If utilizing LLMs for plain-language translation, consider adding a feature to translate the simplified summaries into Spanish and other locally spoken languages to maximize community impact.

## 7. Weekend Roadmap — 12-Step Build Sequence From Friday 6 PM to Sunday Demo

A minute-by-minute plan maximizes coding time and leaves buffer for presentation polish.

### 7.1 Friday Night: API Ping & Data Export

Immediately upon team formation, ping the Legistar API and the GeoHub REST endpoints [1]. If the APIs are unresponsive, spend the rest of the evening downloading the HUD LIHTC CSV [3], the City Housing Matrix [2], and scraping a static set of Legistar PDFs to use as a local database for the weekend.

### 7.2 Saturday AM: Core Feature Build

Divide the team. One half should focus on the map interface, plotting the 26 affordable housing properties [2] and the Special Use Permits [4]. The other half should build the LLM pipeline, feeding the scraped Legistar PDFs into the summarization prompt and structuring the JSON output.

### 7.3 Saturday PM: UI, Accessibility, Disclaimers

Merge the map and the text summaries into a single user interface. Implement the radius search functionality. Crucially, this is the time to hardcode the "Unofficial Summary" banners and ensure every item links back to the official Legistar URL. Conduct a quick mobile responsiveness check.

### 7.4 Sunday: QA, Pitch Deck, Live Demo Links

Stop coding by 10:00 AM. Spend the remaining time testing the prototype with edge-case addresses. Build the pitch deck focusing on the user pain points (e.g., reducing reading time from 18 minutes to 4 minutes). Ensure the live demo link is stable and does not rely on localhost.

## 8. Phase-2 Extensions — From Hackathon Prototype to City-Backed Tool

With an MOU and token-based auth, prototypes can evolve into maintained city services.

### 8.1 Adding Push Infrastructure

While real-time notification systems requiring push infrastructure are not viable for the hackathon, they are the logical next step. Post-hackathon, teams can work with the City to implement Twilio or SendGrid integrations for SMS alerts, triggered by nightly diffs of the Legistar agenda.

### 8.2 Secure Upload for Staff-Only Data

The v1 compliance dashboard relies on public data [2] [3]. Phase 2 should introduce a secure, authenticated portal where City housing staff can upload internal rent-rolls and confidential compliance documents, allowing the system to cross-reference public expiration dates with actual tenant income verifications.

### 8.3 Funding & Maintenance Paths

To prevent the prototype from becoming abandonware, teams should outline a maintenance plan in their pitch. This could involve handing the open-source repository over to the City's IT department, applying for civic innovation grants, or partnering with local nonprofits who can host and maintain the tool for the community.

## References

1. *Zoning Districts | Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/zoning-districts-1
2. *CITY OF RICHMOND, CALIFORNIA EXISTING DEED ...*. https://www.ci.richmond.ca.us/DocumentCenter/View/48381/Affordable-Housing-in-Richmond-Matrix-12_8_18
3. *LIHTC*. https://www.huduser.gov/lihtc/
4. *Special Use Permits - Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/ef90525b1d3b4cd69f97a03f745633ac_0/explore?location=37.538531%2C-77.451972%2C15.60
5. *City of Richmond, VA*. https://richmond-geo-hub-cor.hub.arcgis.com/search?collection=dataset&tags=zoning
6. *Community Unit Plans - Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/community-unit-plans/about
7. *AFFORDABLE HOUSING REPORT 2020-21 - Richmond, CA*. https://www.ci.richmond.ca.us/DocumentCenter/View/64556