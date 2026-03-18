# Verification Research Results

Pillar: Thriving Neighborhoods (Legistar, GeoHub, housing data, Richmond, VA)
Date: 2026-03-18
Parallel.ai run_id: trun_3cad0ebea15c480eb3eba88f03c1a85d
Processor: pro

---

# Richmond Neighborhood Intelligence: What's Verified, What's Risky, and What to Build Now

## Executive Summary

For hackathon teams building civic technology for Richmond's Thriving Neighborhoods pillar, the data landscape presents clear opportunities and specific roadblocks. The core data pipes are open and production-ready: Richmond's Legistar API and ArcGIS Development Tracker are publicly accessible without authentication, allowing teams to ship direct integrations immediately. 

However, teams must navigate several data quality and access realities. Address data in Legistar is unstructured text requiring parsing, and building permit data is entirely absent from the City's Socrata open data portal, residing instead in the EnerGov Online Permit Portal. For neighborhood need analysis, HUD CHAS data provides granular tract-level insights, and housing grant ordinances (HOME, CDBG, ESG, HOPWA) are queryable via the Legistar API, though inconsistent titling requires fuzzy matching strategies.

## Strategic Implementation Playbook

Before diving into the specific verification items, teams should align their technical approaches with the realities of Richmond's data infrastructure.

| Data Source | Access Method | Paging & Limits | Key Caveats for Teams |
|---|---|---|---|
| **Legistar (Granicus)** | Public API, no auth | `$filter`, `$orderby`, `$top`, `$skip`; JSON format | Addresses live in unstructured titles; keyword titling is inconsistent. |
| **ArcGIS Development Tracker** | Public REST API | `resultOffset` / `resultRecordCount`; max 2000 records | Uses State Plane (EPSG:2284); Land Use Project Mapper is currently "being updated" and unstable. |
| **Building Permits (EnerGov)** | Web portal (OPP) | No documented public API | Not on Socrata; scraping must respect Terms of Service; prefer bulk data requests. |
| **HUD CHAS Data** | File downloads / HUD GIS | DBF/SPSS/SAS; ArcGIS feature layers | Counts are rounded (1-7 rounds to 4); available at tract and some block group levels. |

---

## Verification Report: Top 10 Claims

### 1. Richmond's Legistar API endpoint
* **Verification status:** CONFIRMED
* **Official source URL:** `https://webapi.legistar.com/v1/richmondva/Matters`
* **Key details for teams:** 
 * **Access/Auth:** The Granicus Web API is public and requires no API key or authentication.
 * **Format:** Returns valid JSON and supports partial OData-style query parameters (`$filter`, `$orderby`, `$top`, `$skip`).
 * **Endpoints:** Common endpoints include `/Matters`, `/Events`, `/EventItems`, `/Files`, and `/MatterTypes`.
 * **Rate limits:** There are no published rate limits, but teams should implement polite throttling (e.g., <5 requests/sec) and use `$skip`/`$top` for pagination.
* **Any corrections to the original claim:** None. The endpoint is live and production-ready.

### 2. Richmond GeoHub — Development layers are current and accessible
* **Verification status:** LIKELY (Development Mapper confirmed; Land Use Mapper unavailable)
* **Official source URL:** `https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Development_Tracker/FeatureServer` [1]
* **Key details for teams:** 
 * **Access/Auth:** Public ArcGIS REST endpoint; no token needed.
 * **Data Formats:** Supports JSON, GeoJSON, CSV, shapefile, and SQLite [1].
 * **Paging:** `maxRecordCount` is set to 2000 [1]. Use `resultOffset` and `resultRecordCount` for pagination.
 * **Fields:** Contains highly useful fields including `Project_Name`, `Status`, `Date_Updated`, `Dwelling_Units`, and `Address` [2].
 * **Caveat:** The City's Interactive Mapping Tools page explicitly notes: "The Land Use Project Mapper is being updated" [3]. 
* **Any corrections to the original claim:** The Development Activity Mapper is current and accessible, but teams should not depend on the Land Use Project Mapper having a stable REST endpoint at this time.

### 3. Legistar address field consistency
* **Verification status:** CONFIRMED (with caveat)
* **Official source URL:** `https://richmondva.legistar.com/MeetingDetail.aspx?ID=1252850`
* **Key details for teams:** 
 * **Structure:** Addresses for Special Use Permits (SUP) and rezoning cases appear in the `MatterTitle` free-text field (e.g., "3618 Hawthorne Avenue").
 * **API Limitations:** The structured `MatterText1-5` fields are commonly null for Ordinance-type records. There is no dedicated, structured address field in the API.
 * **Actionable Advice:** Teams must build regex extractors for "<number> <street>" patterns. For multi-parcel cases, consider joining to the ArcGIS Development Tracker via SUP/POD or ParcelID to improve geocoding precision.
* **Any corrections to the original claim:** None, but teams must be aware that "parseable" means string parsing from titles, not extracting from a dedicated address field.

### 4. HUD CHAS data is available at census tract level for Richmond
* **Verification status:** CONFIRMED
* **Official source URL:** `https://www.huduser.gov/portal/datasets/cp.html` [4]
* **Key details for teams:** 
 * **Geography:** Data is available at Census Summary Level 080 (Tract part) and some tables at 091 (Block Group part) [4].
 * **Formats:** Users can download files in SAS, SPSS, and DBF formats [4].
 * **Rounding Rules:** The Census Bureau requires CHAS data to be rounded. 0 remains 0; 1-7 rounds to 4; 8 or greater rounds to the nearest multiple of 5 [5]. Teams should not interpret small numbers as exact household counts.
 * **Joins:** Use the FIPS-based geographic identifier (`sum080`) to join to local tract shapefiles [4].
* **Any corrections to the original claim:** None.

### 5. Sharon Ebert's current role and availability as champion
* **Verification status:** LIKELY
* **Official source URL:** `https://www.rva.gov/mayors-office/news/mayor-appoints-dcao-economic-and-community-development-director-housing-and`
* **Key details for teams:** 
 * **Role:** Sharon Ebert is the DCAO for Economic & Community Development and was designated Acting CAO by Mayor Avula in May 2025.
 * **Engagement:** Given her dual roles, her bandwidth may be highly constrained.
* **Any corrections to the original claim:** While she is the appropriate contact based on her portfolio, teams must confirm her actual availability and preferred engagement pathways through hackathon organizers (Christian Markow, Michael Kolbe).

### 6. Richmond Planning Commission notification requirements
* **Verification status:** LIKELY (State law confirmed; local radius unconfirmed)
* **Official source URL:** `https://library.municode.com/va/richmond/codes/code_of_ordinances` [6]
* **Key details for teams:** 
 * **State Minimums:** Virginia Code § 15.2-2204 requires mailed notice to abutting and across-street owners at least 5 days before a hearing for cases affecting ≤25 parcels.
 * **Local Radius:** Secondary sources reference a 150-foot mailing radius, but this specific metric cannot be independently confirmed from the official Richmond City Code text.
 * **Actionable Advice:** Because state law creates at least a 5-day pre-hearing window, teams can build early-warning alerts by tracking Planning Commission agendas and the Development Tracker's "Pipeline" status before Legistar postings stabilize.
* **Any corrections to the original claim:** Do not assert a specific 150-foot local mailing radius without a direct City Code citation. Design systems around the state-mandated 5-day minimum.

### 7. NLIHC Preservation Database coverage for Richmond
* **Verification status:** CANNOT VERIFY
* **Official source URL:** `https://preservationdatabase.org`
* **Key details for teams:** 
 * **Access:** The database is publicly accessible and contains roughly 80,000 properties nationally.
 * **Limitation:** City-specific property counts and coverage quality for Richmond cannot be obtained without registering for an account and downloading the data export.
* **Any corrections to the original claim:** Do not assume "meaningful Richmond property coverage" until a team member with an account exports and validates the Richmond subset. Deprioritize for MVP if access is delayed.

### 8. Richmond Open Data Portal — active permit dataset
* **Verification status:** INCORRECT
* **Official source URL:** `https://energov.richmondgov.com/energov_prod/selfservice#/home` [7]
* **Key details for teams:** 
 * **Data Location:** There is no building permits dataset present in the `data.richmondgov.com` public Socrata catalog.
 * **Actual Source:** The City uses the EnerGov Online Permit Portal (OPP) for building, electrical, mechanical, and site plan permits [7].
 * **Actionable Advice:** Do not attempt to build Socrata integrations for permits. Teams must either carefully scrape the OPP search interface (respecting Terms of Service) or submit an open data/FOIA request for a bulk export.
* **Any corrections to the original claim:** The claim that Socrata has an active permit dataset is incorrect. Teams must pivot to the EnerGov portal.

### 9. Councilmatic open-source project — current maintenance status
* **Verification status:** LIKELY (Usable, but low maintenance)
* **Official source URL:** `https://github.com/datamade/django-councilmatic`
* **Key details for teams:** 
 * **Activity:** The project is not actively maintained at a production pace. The last release (v3.1.0) was dated February 9, 2023. The repository has roughly 40 open issues and is not archived.
 * **Actionable Advice:** It is viable for a quick hackathon prototype, but teams should expect dependency debt and compatibility issues. Alternatively, building a slim, custom Legistar-to-Database ETL with a lightweight UI may be faster and safer.
* **Any corrections to the original claim:** The claim that it is "actively maintained" is incorrect. It is lightly maintained but still serves as a potential starting point.

### 10. Legistar housing funding ordinance searchability
* **Verification status:** CONFIRMED (with caveat)
* **Official source URL:** `https://richmondva.legistar.com/MeetingDetail.aspx?ID=1354758` [8]
* **Key details for teams:** 
 * **Availability:** Ordinances authorizing HOME, CDBG, ESG, and HOPWA funds are present in Legistar. For example, ORD. 2026-071 on the March 23, 2026 agenda authorizes $12,553,779.59 across these programs [8].
 * **Query Strategy:** Teams can query the API using `$filter=substringof('HOME',MatterTitle) eq true`.
 * **Caveat:** Matter titling is not fully consistent. A systematic housing investment dashboard requires fuzzy title matching across multiple keywords (e.g., "Consolidated Plan", "Annual Action Plan", "Section 108") and may require parsing attached PDF files to validate exact funding amounts.
* **Any corrections to the original claim:** Add the caveat that title-based searching is feasible but incomplete due to inconsistent clerk titling practices.

## References

1. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Development_Tracker/FeatureServer?f=pjson
2. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Development_Tracker/FeatureServer/0?f=pjson
3. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
4. *Consolidated Planning/CHAS Data | HUD USER*. https://www.huduser.gov/portal/datasets/cp.html
5. *CHAS Data Documentation | HUD USER*. https://www.huduser.gov/portal/datasets/cp/CHAS/data_doc_chas.html
6. *Code of Ordinances | Richmond, VA - Municode Library*. https://library.municode.com/va/richmond/codes/code_of_ordinances
7. *Online Permit Portal | Richmond*. https://www.rva.gov/planning-development-review/online-permit-portal
8. *
	City of Richmond - Meeting of City Council on 3/23/2026 at 6:00 PM
*. https://richmondva.legistar.com/MeetingDetail.aspx?ID=1354758&GUID=8DB1D522-D712-4A81-8EF9-5F9991B397FE&Options=&Search=