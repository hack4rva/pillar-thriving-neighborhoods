> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Housing Data Feasibility — Thriving Neighborhoods

Analysis of what housing and development data is actually accessible for hackathon teams.

---

## Legistar (Richmond City Council Records)

### What it is
Legistar is the City of Richmond's legislative management system. It stores City Council agendas, meeting minutes, ordinances, resolutions, and associated documents. Development proposals (rezonings, special use permits, variances, housing funding actions) appear in Legistar as "matters" tied to specific meetings.

### Access path
- **Web browser**: Richmond's Legistar instance is publicly accessible. Users can browse meeting agendas, search for matters, and download PDFs.
- **Granicus Web API**: Legistar is built on Granicus software, which provides a documented REST API (webapi.legistar.com). The API is confirmed live for Richmond (corrected 2026-03-18). Client name is `richmondva`.
- **Confirmed API endpoint**: `https://webapi.legistar.com/v1/richmondva/Matters` (corrected 2026-03-18). Additional endpoints: `/v1/richmondva/MeetingItems`, `/v1/richmondva/Bodies`.

### Data quality
- Records go back many years; completeness and consistency vary.
- Staff report PDFs are attachments; the text within them is not indexed.
- Addresses for development cases (SUP and planning cases) appear in the MatterTitle text field — no structured address field exists; geocoding requires string parsing (corrected 2026-03-18).
- Meeting dates and hearing schedules are generally reliable.

### Feasibility for weekend
- **High**: the API is confirmed live; a team can pull matters, filter by type, and display them in 1–2 hours (corrected 2026-03-18).
- **Moderate** for address geocoding: addresses are in MatterTitle free text for SUP/planning cases; a rules-based string parser is required before geocoding (corrected 2026-03-18).
- **Low** for PDF content: parsing staff report PDFs programmatically requires OCR and NLP and is unlikely to be reliable in 48 hours.

---

## Richmond GeoHub / ArcGIS

### What it is
Richmond's GeoHub hosts GIS layers including the Land Use Project Mapper, Development Activity Mapper, Zoning Parcel Mapper, and parcel boundaries.

### Access path
- **Web viewer**: Public web viewers exist for several layers.
- **ArcGIS REST API**: ArcGIS services expose a REST API for querying feature layers by geography, attribute, or bounding box. The endpoint pattern is typically: `https://gisweb.richmondgov.com/arcgis/rest/services/...`
- **GeoJSON download**: Some layers allow bulk GeoJSON or CSV export.

### Data quality
- GeoHub Development Tracker: ArcGIS web map ID `777f2b6383fe42da9c6aaeac8df77c8c`, last updated January 8 2026, tracks projects >$1.5M since 2016 (corrected 2026-03-18).
- The Land Use Project Mapper is "being updated" with no stable REST endpoint currently available (corrected 2026-03-18).
- Parcel boundaries are generally reliable.
- Zoning data is authoritative for the City's official zoning classification.

### Feasibility for weekend
- **High** for parcel/address geocoding: straightforward to query by address or bounding box.
- **High** for zoning context: stable data, REST API accessible.
- **Moderate** for development activity: the GeoHub Development Tracker (web map ID `777f2b6383fe42da9c6aaeac8df77c8c`) is the usable layer; the Land Use Project Mapper has no stable REST endpoint and should be avoided (corrected 2026-03-18).

---

## HUD CHAS Data

### What it is
Comprehensive Housing Affordability Strategy data estimates housing need by income level, tenure, cost burden, and geographic area. Based on Census ACS data, published by HUD.

### Access path
- Downloadable Excel/CSV tables from HUD website.
- data.hud.gov API available.
- Data is available at city, county, and census tract level.

### Data quality
- Lagged by 2–3 years from census year. Not real-time.
- Census tract level is most useful for neighborhood-level analysis.
- Tables require joins and reshaping; not ready-to-use out of the box.

### Feasibility for weekend
- **Moderate**: downloading and reshaping for Richmond is about 2–3 hours of data work.
- Primarily useful for context and housing affordability framing, not operational monitoring.

---

## HUD Fair Market Rents

### What it is
Annual estimates of gross rent (including utilities) for standard-quality units by bedroom size in each metropolitan area and non-metropolitan county. Published annually.

### Access path
- Downloadable tables and API from HUD.
- Available by MSA and county; Richmond MSA rates are published.

### Data quality
- Published annually; reasonably current.
- MSA-level only; no neighborhood breakdown.
- Useful as a baseline for affordability comparison but not for property-level monitoring.

### Feasibility for weekend
- **High**: a simple lookup table can be built in under an hour.
- Can be hardcoded for the current year if needed.

---

## Richmond Open Data Portal (Socrata)

### What it is
Richmond's open data portal. Hosts various datasets including business licenses, crime, permits, and geographic data.

### Access path
- SODA API (Socrata Open Data API) for JSON/CSV queries.
- Endpoint: data.richmondgov.com

### Data quality
- Dataset catalog should be reviewed carefully; not all datasets are current or complete.
- Building permit data is NOT on this portal. Building permits are handled by the EnerGov Online Permit Portal at energov.richmondgov.com, not the Socrata open data portal (corrected 2026-03-18).

### Feasibility for weekend
- **Moderate to High** depending on which datasets are current and accessible.
- SODA API is developer-friendly.

---

## What is NOT accessible

| Data needed | Why it's not accessible |
|---|---|
| City affordable housing compliance records | Internal City database; not public |
| Developer self-reported rent rolls | Submitted to City under program agreements; not public |
| Individual tenant income data | PII; never public |
| Internal City monitoring spreadsheets | Internal staff tools; not public |
| Confidential housing contract terms | Legal documents with privacy restrictions |

---

## Summary: data readiness by project type

| Project | Data readiness | Blocking dependency |
|---|---|---|
| Neighborhood development notifier | High | Legistar API confirmed live; blocking dependency resolved (corrected 2026-03-18). Geocoding requires MatterTitle string parsing. |
| Legistar plain-language translator | High | Legistar API confirmed live at webapi.legistar.com/v1/richmondva (corrected 2026-03-18) |
| Affordable housing compliance tracker (staff tool) | Low-Medium | No public compliance data; must scope to Legistar records only |
| Development proposal map | Medium-High | Use GeoHub Development Tracker (web map ID 777f2b6383fe42da9c6aaeac8df77c8c) + Legistar MatterTitle address parsing (corrected 2026-03-18) |
| Housing investment dashboard | Medium | Manual Legistar extraction + HUD data. NLIHC database covers ~80,000 properties nationally; Richmond inclusion is expected but not confirmed from public-facing pages (corrected 2026-03-18). |
| Neighborhood change visualizer | Medium | Building permit data is in EnerGov (energov.richmondgov.com), not the Socrata Open Data Portal — verify EnerGov scraping feasibility before committing to this approach (corrected 2026-03-18) |
