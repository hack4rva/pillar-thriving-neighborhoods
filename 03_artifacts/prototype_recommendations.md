> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Prototype Recommendations — Thriving Neighborhoods

## Problem 1 — Residents discovering neighborhood development

### Concept A: Neighborhood Development Notifier
- What it is: An address or neighborhood search tool that surfaces pending and recent development proposals from Legistar, shows them on a map, and summarizes what each proposal involves and when public comment is open.
- User served: Richmond residents who want to stay informed about development near their homes.
- 48-hour feasibility: Fetch Legistar records via API or web; geocode case addresses using GeoHub; display on a map with plain-language summaries. Build a simple search interface.
- Data/content: Legistar (cases, meeting dates, staff report PDFs); Richmond GeoHub (parcel/address geocoding); static glossary of planning terms.
- Team roles: Data/API wrangler, frontend developer, UX writer for plain-language summaries, product lead.
- Key risk/limitation: Legistar API is confirmed live at https://webapi.legistar.com/v1/richmondva/Matters (corrected 2026-03-18). Street addresses for SUP and planning cases appear in MatterTitle free text — no structured address field; geocoding requires string parsing (corrected 2026-03-18). Plain-language summaries require either manual curation or AI summarization with careful disclaimers. Do not claim the list is exhaustive.
- Compelling demo: Enter a Richmond address → see 3 nearby development proposals with plain-language descriptions, meeting dates, and a "comment by" deadline. Show a map view. Link out to official Legistar records.

---

### Concept B: Legistar Plain-Language Translator
- What it is: A tool that takes a City Council agenda item or Planning Commission case from Legistar and produces a plain-language summary: what is proposed, where it is, who benefits, what the timeline is, and how residents can comment.
- User served: Richmond residents who encounter Legistar records or planning documents and cannot understand them.
- 48-hour feasibility: Pull a sample set of 10–20 real Legistar items; use an LLM to generate plain-language summaries with a standard template; display them with the original source linked.
- Data/content: Legistar agenda items and staff report PDFs; curated glossary of planning terms; official comment period information.
- Team roles: Content designer, AI/NLP developer, frontend developer.
- Key risk/limitation: AI-generated summaries may contain errors. Must clearly label summaries as "plain-language interpretation" and link directly to the original Legistar record. Include a disclaimer that the original official document controls.
- Compelling demo: Show a side-by-side of a real Legistar staff report excerpt and a plain-language summary. Demonstrate 3–4 different case types.

---

## Problem 2 — City staff monitoring affordable housing compliance

### Concept C: Affordable Housing Portfolio Tracker (Staff Tool)
- What it is: A structured dashboard for City housing staff that organizes funded development records, tracks affordability commitment terms and expiration dates, and flags properties that need follow-up review.
- User served: City housing department staff monitoring compliance with grant, loan, and incentive program terms.
- 48-hour feasibility: Build a static or simple database-backed tool seeded with a small sample of publicly available data from Legistar housing funding ordinances and HUD records. Focus on the interface and workflow, not the full data set.
- Data/content: Sample Legistar housing funding ordinances; HUD Fair Market Rent tables; sample developer records (anonymized or fictional for demo).
- Team roles: Product lead/UX designer, frontend developer, data researcher.
- Key risk/limitation: The full compliance dataset does not exist in public form; this tool is a workflow prototype, not a real compliance system. Frame explicitly as a staff-support tool, not an automated compliance engine. Do not make compliance determinations.
- Compelling demo: Show a staff member opening the tool and seeing a portfolio view: which properties have affordability periods expiring in 2026, which ones have rents to review, and a drill-down to the original Legistar ordinance and HUD FMR comparison.

---

### Concept D: Development Proposal Map / Explorer
- What it is: An interactive map of Richmond showing active and recent development proposals, color-coded by type (rezoning, special use permit, variance, new construction), with filtering by neighborhood and proposal status.
- User served: Residents, neighborhood associations, and local journalists who want a geographic overview of development activity.
- 48-hour feasibility: Use the GeoHub Development Tracker (ArcGIS web map ID 777f2b6383fe42da9c6aaeac8df77c8c, last updated January 8 2026, tracks projects >$1.5M since 2016) and Legistar API data; plot cases on a Leaflet or Mapbox map; add simple filters. Seed with 20–50 real cases for the demo. Note: the Land Use Project Mapper has no stable REST endpoint and should not be used (corrected 2026-03-18).
- Data/content: Richmond GeoHub Development Tracker (ArcGIS web map ID 777f2b6383fe42da9c6aaeac8df77c8c, corrected 2026-03-18); parcel geometry; Legistar API at webapi.legistar.com/v1/richmondva (case data; addresses in MatterTitle free text requiring string parsing, corrected 2026-03-18).
- Team roles: Frontend/maps developer, data wrangler, UX designer.
- Key risk/limitation: Data freshness is critical — stale maps mislead users. Label data with the last-updated date prominently. Do not claim completeness. Link to official Legistar for current status.
- Compelling demo: Show a map of a Richmond neighborhood with 5–8 development proposal pins. Click on one pin to see the project address, proposal type, hearing date, comment deadline, and link to Legistar.

---

### Concept E: Housing Investment Dashboard (Public Transparency)
- What it is: A public-facing dashboard showing where the City has invested in affordable housing (grants, loans, incentives) and the status of affordability commitments over time.
- User served: Residents, advocates, and journalists who want to understand how public housing investment is distributed across the city.
- 48-hour feasibility: Build from publicly available Legistar funding ordinances and HUD property data. Map investments by address. Show affordability period length and expiration year.
- Data/content: Legistar housing funding ordinances; HUD Affordable Housing Preservation database; NLIHC National Housing Preservation Database (covers ~80,000 properties nationally; Richmond inclusion is expected but not confirmed from public-facing pages — verify before relying on it, corrected 2026-03-18).
- Team roles: Data researcher, mapping/frontend developer, content designer.
- Key risk/limitation: Full dataset requires manual extraction from Legistar PDF attachments; scope to a curated sample. Do not imply the data is exhaustive. Include explicit data source labels and last-updated dates.
- Compelling demo: Show a map of Richmond with housing investment pins for 10–15 funded developments. Click a pin to see the development name, investment amount, affordability requirement, and expiration year.

---

### Concept F: Neighborhood Change Visualizer
- What it is: A before/after or time-series tool showing how a Richmond neighborhood has changed over time — permit activity, new development, property value changes — using public GIS and parcel data.
- User served: Residents, community organizations, and journalists tracking neighborhood change or displacement pressure.
- 48-hour feasibility: Use Richmond GeoHub parcel data, permit data from the EnerGov Online Permit Portal (energov.richmondgov.com), and assessed value data. Build a simple timeline or before/after slider for one test neighborhood. Note: building permits are NOT on the Socrata open data portal — they are in EnerGov (corrected 2026-03-18).
- Data/content: Richmond GeoHub; EnerGov Online Permit Portal (permits — not Socrata, corrected 2026-03-18); assessments from GeoHub or open data; HUD CHAS (cost burden trends).
- Team roles: Data wrangler, frontend/maps developer, content designer.
- Key risk/limitation: Data availability and freshness need verification before building. Avoid implying causal claims (e.g., "this development caused displacement") without rigorous analysis. Frame as an information tool, not an analysis tool.
- Compelling demo: Show Church Hill or Jackson Ward with a slider showing permit activity and development proposals over 5 years. Annotate 2–3 key events with plain-language context.
