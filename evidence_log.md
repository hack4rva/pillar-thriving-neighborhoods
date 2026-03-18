# Evidence Log — Thriving Neighborhoods

Track every claim used in research, design, or demo here. Update status as verification progresses.

Format: ID | Claim | Source | URL | Status | Date checked

---

## Confirmed

| ID | Claim | Source | URL | Status | Date checked |
|---|---|---|---|---|---|
| E-001 | HUD Fair Market Rents are publicly available for Richmond MSA | HUD | https://www.huduser.gov/portal/datasets/fmr.html | Confirmed public | — |
| E-002 | NLIHC National Housing Preservation Database is publicly accessible | NLIHC | https://preservationdatabase.org | Confirmed public | — |
| E-003 | Richmond City Council and Planning Commission meetings are recorded in Legistar | City of Richmond | https://richmondva.legistar.com | Confirmed — live URL verified | 2026-03-18 |
| E-010 | Richmond uses the Granicus/Legistar platform with client name "richmondva" | Legistar Web API | https://webapi.legistar.com/v1/richmondva/Matters?$top=1 | Confirmed — API returns live data | 2026-03-18 |
| E-011 | The Granicus Web API is publicly accessible for Richmond at client name "richmondva" | Legistar Web API | https://webapi.legistar.com/v1/richmondva/Matters | Confirmed — returns valid JSON | 2026-03-18 |
| E-012 | Richmond has a Development Mapper and Land Use Project Mapper accessible via ArcGIS Online | City of Richmond PDR | https://www.rva.gov/planning-development-review/interactive-mapping-tools | Confirmed — both tools listed; Development Mapper web map ID 777f2b6383fe42da9c6aaeac8df77c8c last updated January 8, 2026 | 2026-03-18 | Web-verified 2026-03-18: ArcGIS Development Tracker REST endpoint confirmed at https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Development_Tracker/FeatureServer (public, no auth, maxRecordCount 2000, supports JSON/GeoJSON/CSV/shapefile/SQLite). Key fields: Project_Name, Status, Date_Updated, Dwelling_Units, Address. Coordinate system: State Plane EPSG:2284. Land Use Project Mapper is "being updated" per rva.gov — no stable REST endpoint. |
| E-013 | Sharon Ebert holds the DCAO role for Economic and Community Development at City of Richmond | rva.gov official announcement | https://www.rva.gov/mayors-office/news/mayor-appoints-dcao-economic-and-community-development-director-housing-and | Confirmed — also designated Acting CAO by Mayor Avula in May 2025 | 2026-03-18 |
| E-014 | HUD CHAS data is available at census tract level for Richmond | HUD CHAS download page | https://www.huduser.gov/portal/datasets/cp.html | Confirmed — census tract is an available geographic level in the download tool | 2026-03-18 | Web-verified 2026-03-18: Geography available at Census Summary Level 080 (Tract part) and some tables at 091 (Block Group part). Download formats: SAS, SPSS, DBF. Rounding rules: 0 stays 0; counts 1-7 round to 4; counts ≥8 round to nearest multiple of 5. Join key: FIPS-based geographic identifier (sum080). See also: https://www.huduser.gov/portal/datasets/cp/CHAS/data_doc_chas.html |

---

## Verified with caveats

| ID | Claim | Source | URL | Status | Date checked | Caveats |
|---|---|---|---|---|---|---|
| E-015 | Legistar Planning Commission matter titles include street addresses for SUP/rezoning cases | richmondva.legistar.com | https://richmondva.legistar.com/MeetingDetail.aspx?ID=1252850 | Confirmed in web UI — addresses like "3618 Hawthorne Avenue" appear in agenda item titles | 2026-03-18 | API MatterText1-5 fields are null for Ordinances; addresses appear to live in MatterTitle text, not structured fields. Geocoding will require string parsing. |
| E-016 | Richmond has 30 matter types in Legistar including "Location Character and Extent Item" and "City Planning Commission Resolution" | Legistar Web API | https://webapi.legistar.com/v1/richmondva/MatterTypes | Confirmed — 30 types returned including planning-specific types | 2026-03-18 | No dedicated "Rezoning" or "Special Use Permit" type exists; SUPs appear under "Ordinance". |
| E-017 | Legistar for Richmond contains housing grant ordinances (HOME, CDBG, HOPWA, ESG) searchable by matter title | Legistar Web API | https://webapi.legistar.com/v1/richmondva/Matters | Confirmed — March 2026 ordinance authorizing ~$12.5M in HUD grants (HOME, CDBG, ESG, HOPWA) is present and queryable | 2026-03-18 | Not all housing funding programs use consistent titling; title-based search is feasible but incomplete. |
| E-018 | Richmond notification requirements for planning hearings require mailed notice to adjacent property owners and at least 5 days advance notice per Virginia Code | Virginia Code § 15.2-2204 | https://law.lis.virginia.gov/vacode/title15.2/chapter22/section15.2-2204/ | Confirmed from state statute — mailing to abutting owners plus across-street owners; 5 days min for cases ≤25 parcels; newspaper notice at least 5 days before hearing | 2026-03-18 | City zoning ordinance may add requirements (e.g. 150-foot radius referenced in search results but not independently confirmed from official City Code text). |
| E-019 | django-councilmatic last had a release in February 2023 (v3.1.0) but has open issues and pull requests | GitHub — datamade/django-councilmatic | https://github.com/datamade/django-councilmatic | Likely still usable — v3.1.0 released Feb 2023, 40 open issues, 1 open PR; not archived | 2026-03-18 | No commit in the past year confirmed from search; project is not actively maintained at production pace. Use with caution for a hackathon build. |

---

## Cannot Verify

| ID | Claim | Notes | Date checked |
|---|---|---|---|
| E-020-cv | Richmond Open Data Portal has an active building permits dataset | CORRECTION (Web-verified 2026-03-18): The claim is INCORRECT. There is no building permits dataset in the data.richmondgov.com Socrata public catalog. Richmond's permit data is accessed via the EnerGov Online Permit Portal at https://energov.richmondgov.com/energov_prod/selfservice#/home (covers building, electrical, mechanical, and site plan permits). No documented public API for EnerGov OPP. Teams must either carefully scrape the OPP search interface (respecting Terms of Service) or submit an open data/FOIA request for a bulk export. Do not plan Socrata integrations for permit data. See also: https://www.rva.gov/planning-development-review/online-permit-portal | 2026-03-18 |
| E-021-cv | GeoHub ArcGIS REST API endpoint URL for Land Use Project Mapper | The Land Use Project Mapper is listed on rva.gov as "being updated." No stable REST endpoint was found. The Development Mapper (web map ID 777f2b6383fe42da9c6aaeac8df77c8c) is live. | 2026-03-18 |
| E-022-cv | NLIHC Preservation Database specific Richmond VA property count | The NHPD website does not expose a public count by city without login. Database covers ~80,000 federally assisted properties nationally; Richmond inclusion is expected but count is unverified. | 2026-03-18 |

---

## Missing (still needed)

| ID | Claim needed | Why it matters |
|---|---|---|
| E-023 | Named departmental champion for continuation pathway beyond Sharon Ebert | Required for post-hackathon pathway confirmation |
| E-024 | Resident survey data on development discovery pain points | Would strengthen the user case |
| E-025 | Confirmed 150-foot mailing radius in Richmond City zoning ordinance (vs. state minimum of abutting only) | Determines whether notification gap is 150 ft or street-adjacent only |
| E-026 | Specific Legistar address field structure for "Location Character and Extent Item" type matters | API returned empty results for that filter; need to confirm whether those items exist in API or only in web UI |

---

## Useful datasets

| Name | URL | Format | Status | Notes |
|---|---|---|---|---|
| HUD Fair Market Rents | https://www.huduser.gov/portal/datasets/fmr.html | CSV/Excel | Confirmed accessible | — |
| HUD CHAS | https://www.huduser.gov/portal/datasets/cp.html | Excel/CSV | Confirmed — census tract level available | Use data download tool; select Place or Census Tract level |
| NLIHC Preservation Database | https://preservationdatabase.org | CSV/API | Confirmed accessible | ~80,000 properties nationally; Richmond subset unquantified |
| Richmond Legistar API | https://webapi.legistar.com/v1/richmondva/ | JSON (REST) | Confirmed — client name "richmondva" | Returns live data; addresses in MatterTitle text, not structured fields |
| Richmond Development Mapper | https://cor.maps.arcgis.com/apps/mapviewer/index.html?webmap=777f2b6383fe42da9c6aaeac8df77c8c | ArcGIS Web Map | Confirmed — last updated Jan 8, 2026 | Projects >$1.5M since 2016; pipeline/under construction/completed |
| Richmond Land Use Project Mapper | https://www.rva.gov/planning-development-review/interactive-mapping-tools | ArcGIS Web App | Listed but "being updated" | No stable REST endpoint found as of 2026-03-18 |

---

## Prior art

| Tool | URL | Relevance | Status | Notes |
|---|---|---|---|---|
| django-councilmatic | https://github.com/datamade/django-councilmatic | Legistar-based tracker (open source) | Low-maintenance — last release v3.1.0 Feb 2023; not archived | Usable for hackathon but dependency debt likely; check Python version compatibility |
| NLIHC Preservation Database | https://preservationdatabase.org | Housing compliance model | Confirmed accessible | — |

---

## Risks (updated)

| ID | Risk | Severity | Mitigation | Update |
|---|---|---|---|---|
| R-001 | Legistar API does not expose structured address fields — addresses are embedded in MatterTitle text | Medium | Parse addresses from MatterTitle using regex or NLP; fall back to manual annotation | Updated: API confirmed accessible; risk is address parsing quality, not access |
| R-002 | Land Use Project Mapper REST endpoint unavailable (marked "being updated") | Medium | Use Development Mapper (web map ID 777f2b6383fe42da9c6aaeac8df77c8c) instead, or fetch data from ArcGIS REST services directly | Updated: Development Mapper is confirmed live |
| R-003 | AI summaries contain planning errors | High | Label as interpretation; link to official source | Unchanged |
| R-004 | Compliance tool implies official findings | High | Frame as staff-support only; add disclaimers | Unchanged |
| R-005 | Building permits dataset not on open data portal | Medium | Use Legistar ordinances or ArcGIS Development Mapper as proxy for development activity | New |
