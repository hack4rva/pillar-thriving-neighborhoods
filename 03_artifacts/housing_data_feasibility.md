# Housing Data Feasibility — Thriving Neighborhoods

Analysis of what housing and development data is actually accessible for hackathon teams.

---

## Legistar (Richmond City Council Records)

### What it is
Legistar is the City of Richmond's legislative management system. It stores City Council agendas, meeting minutes, ordinances, resolutions, and associated documents. Development proposals (rezonings, special use permits, variances, housing funding actions) appear in Legistar as "matters" tied to specific meetings.

### Access path
- **Web browser**: Richmond's Legistar instance is publicly accessible. Users can browse meeting agendas, search for matters, and download PDFs.
- **Granicus Web API**: Legistar is built on Granicus software, which provides a documented REST API (webapi.legistar.com). However, API access depends on whether Richmond has it enabled. **This must be confirmed before building.**
- **Typical API endpoints**: `/api/v1/{client}/Matters` (list cases), `/api/v1/{client}/MeetingItems` (items on specific agendas), `/api/v1/{client}/Bodies` (list of councils/commissions).

### Data quality
- Records go back many years; completeness and consistency vary.
- Staff report PDFs are attachments; the text within them is not indexed.
- Addresses for development cases may be in free text rather than structured fields.
- Meeting dates and hearing schedules are generally reliable.

### Feasibility for weekend
- **High** if the API is enabled: a team can pull matters, filter by type, and display them in 1–2 hours.
- **Moderate** if scraping: web scraping is feasible but brittle. Structure varies by page type.
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
- Development activity layers may not be updated in real-time; check last-modified metadata.
- Parcel boundaries are generally reliable.
- Zoning data is authoritative for the City's official zoning classification.

### Feasibility for weekend
- **High** for parcel/address geocoding: straightforward to query by address or bounding box.
- **High** for zoning context: stable data, REST API accessible.
- **Moderate** for development activity: depends on layer freshness and how it's structured.

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
- Building permit data (if available) would be useful for neighborhood change analysis.

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
| Neighborhood development notifier | Medium-High | Legistar API access confirmation |
| Legistar plain-language translator | Medium-High | Legistar API + sample PDFs |
| Affordable housing compliance tracker (staff tool) | Low-Medium | No public compliance data; must scope to Legistar records only |
| Development proposal map | Medium-High | GeoHub layer access + Legistar geocoding |
| Housing investment dashboard | Medium | Manual Legistar extraction + HUD data |
| Neighborhood change visualizer | Medium | Open Data Portal permit data freshness |
