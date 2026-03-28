> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Research Notes — Thriving Neighborhoods Pillar

Last updated: 2026-03-18

---

## Executive Brief (Web-Verified 2026-03-18)

This brief reflects the verified state of Richmond's civic data infrastructure as of 2026-03-18, following Parallel.ai verification research (run_id: trun_3cad0ebea15c480eb3eba88f03c1a85d).

### What's confirmed and ready to build on

**Richmond Legistar API** — Fully confirmed. The Granicus Web API is public with no authentication required at `https://webapi.legistar.com/v1/richmondva/Matters`. It returns valid JSON, supports OData-style query parameters (`$filter`, `$orderby`, `$top`, `$skip`), and includes endpoints for /Matters, /Events, /EventItems, /Files, and /MatterTypes. Teams should implement polite throttling (<5 requests/sec). This is production-ready for hackathon use.

**ArcGIS Development Tracker** — Confirmed accessible. The REST endpoint at `https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Development_Tracker/FeatureServer` is public with no authentication required. It supports JSON, GeoJSON, CSV, shapefile, and SQLite formats, with a max record count of 2000 (use `resultOffset`/`resultRecordCount` for pagination). Key fields include Project_Name, Status, Date_Updated, Dwelling_Units, and Address. Note: the coordinate system is State Plane EPSG:2284. The Land Use Project Mapper is currently "being updated" per rva.gov and has no stable REST endpoint — do not depend on it.

**HUD CHAS Data** — Confirmed at census tract level for Richmond. Available at Census Summary Level 080 (Tract part) and some tables at 091 (Block Group part). Download formats: SAS, SPSS, DBF. Important rounding rules: 0 stays 0; counts 1–7 round to 4; counts ≥8 round to the nearest multiple of 5. Do not interpret small CHAS counts as exact household figures. Join key: FIPS-based geographic identifier (sum080).

**Legistar Housing Funding Ordinances** — Confirmed queryable. HOME, CDBG, ESG, and HOPWA grant ordinances are present and searchable by MatterTitle keyword (e.g., `$filter=substringof('HOME',MatterTitle) eq true`). A March 2026 ordinance authorizes $12,553,779.59 across HUD grant programs. However, matter titling is inconsistent — a systematic housing investment dashboard requires fuzzy title matching across keywords including "Consolidated Plan", "Annual Action Plan", and "Section 108", and may require parsing attached PDFs for exact amounts.

**Legistar Address Field Structure** — Confirmed with caveat. Street addresses for Special Use Permits (SUP) and rezoning cases appear in the `MatterTitle` free-text field (e.g., "3618 Hawthorne Avenue"), not in structured API fields. MatterText1-5 fields are null for Ordinance-type records. Geocoding requires building a regex extractor for "<number> <street>" patterns. For multi-parcel cases, join to the ArcGIS Development Tracker via SUP/POD or ParcelID to improve geocoding precision.

**Virginia Planning Notification Requirements** — Confirmed from state statute. Virginia Code § 15.2-2204 requires mailed notice to abutting and across-street owners at least 5 days before a hearing for cases affecting ≤25 parcels; newspaper notice must appear at least 5 days before the meeting. This creates an actionable early-warning window. Note: a 150-foot local mailing radius is referenced in secondary sources but cannot be confirmed from official Richmond City Code text. Design notification alert systems around the confirmed 5-day state-minimum, not an unverified 150-foot radius.

### What's incorrect — do not build on these

**Richmond Open Data Portal building permits (data.richmondgov.com)** — INCORRECT. There is no building permits dataset in the public Socrata catalog. Richmond's permit data lives in the EnerGov Online Permit Portal at `https://energov.richmondgov.com/energov_prod/selfservice#/home`. There is no documented public API for EnerGov OPP. Teams must either carefully scrape the OPP search interface (respecting Terms of Service) or submit an open data/FOIA request for a bulk export. Do not plan Socrata integrations for permit data.

### What cannot be verified yet

**NLIHC Preservation Database Richmond coverage** — The database covers ~80,000 federally assisted properties nationally and is publicly accessible at https://preservationdatabase.org. Richmond inclusion is expected but a city-specific property count requires registering and downloading the data export. Deprioritize for MVP if account access is delayed.

**django-councilmatic maintenance status** — The project is not actively maintained. Last release v3.1.0 dated February 9, 2023; ~40 open issues; repository not archived. It is viable for a quick hackathon prototype but teams should expect dependency debt and Python version compatibility issues. Building a slim, custom Legistar-to-database ETL with a lightweight UI may be faster and safer.

**Sharon Ebert as City champion** — Her role as DCAO for Economic & Community Development is confirmed. She was also designated Acting CAO by Mayor Avula in May 2025, which means her bandwidth may be highly constrained. Confirm her actual availability and preferred engagement pathway through hackathon organizers (Christian Markow, Michael Kolbe) before counting on her as a direct champion.

---

## Data Infrastructure Summary

| Data Source | Access Method | Key Constraint | Hackathon Readiness |
|---|---|---|---|
| Legistar (Granicus) | Public REST API, no auth | Addresses in unstructured MatterTitle text | Ready — use immediately |
| ArcGIS Development Tracker | Public REST API, no auth | State Plane coordinates (EPSG:2284); max 2000 records | Ready — use immediately |
| HUD CHAS | File downloads (DBF/SPSS/SAS) | Counts rounded; no real-time API | Ready — pre-download recommended |
| EnerGov Permit Portal | Web portal only | No documented public API | Caution — scrape carefully or use FOIA |
| NLIHC NHPD | Requires account login for export | City-specific count unverified | Deprioritize for MVP |

---

## Recommended Build Priorities

1. **Neighborhood Development Notifier** — Legistar API + ArcGIS Development Tracker are both confirmed and accessible. The 5-day notification window is confirmed from state statute. This is the most data-ready prototype.

2. **Legistar Plain-Language Translator** — Confirmed access to all matter types and housing grant ordinances. Title-based search is feasible; add fuzzy matching for completeness. Can be demonstrated with live API calls.

3. **Housing Need Map** — HUD CHAS at census tract level is confirmed. Pre-download data before the hackathon to avoid format conversion delays. Combine with Legistar housing grant data for investment overlay.

4. **Development Permit Tracker** — Use ArcGIS Development Tracker as the primary source (confirmed live). Permit portal (EnerGov) data should be treated as a stretch goal requiring careful scraping or pre-obtained bulk export.

---

## Prototype Disclaimer

This tool provides general information and links to official resources. It does not provide legal advice or determine eligibility. For official determinations, consult the City of Richmond or relevant agency.
