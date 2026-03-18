# Verification TODO — Top 10 Claims to Verify

These are the highest-priority claims to verify before or at the start of the hackathon. Each one affects key build decisions.

---

## 1. Richmond's Legistar API endpoint
**Claim:** Richmond's Legistar instance exposes the Granicus Web API at a public endpoint.
**Why it matters:** The neighborhood development notifier and Legistar translator both depend on API access. If unavailable, teams must fall back to web scraping or pre-seeded data.
**How to verify:** Visit https://webapi.legistar.com/help, identify the Richmond client name, and test an API call (e.g., `GET /api/v1/{client}/Matters`).
**Evidence log ID:** E-011

---

## 2. Richmond GeoHub — Development layers are current and accessible
**Claim:** The Richmond GeoHub Land Use Project Mapper and Development Activity Mapper layers contain current data accessible via ArcGIS REST API.
**How to verify:** Navigate to Richmond's ArcGIS hub, find the service URL, check the last-updated metadata, and test a REST query.
**Evidence log ID:** E-012

---

## 3. Legistar address field consistency
**Claim:** Development case records in Richmond's Legistar include structured or parseable address fields that can be geocoded.
**How to verify:** Pull several recent Planning Commission cases from Legistar and inspect the address field format.
**Evidence log ID:** E-015
**Verified 2026-03-18:** Addresses appear in MatterTitle text for planning cases (e.g. "3618 Hawthorne Avenue"), not in structured API fields. MatterText1-5 are null for Ordinance-type matters. Geocoding requires string parsing.

---

## 4. HUD CHAS data is available at census tract level for Richmond
**Claim:** HUD CHAS data can be accessed at census tract level for Richmond, not just city or county level.
**How to verify:** Download the CHAS data files and verify that Richmond census tracts are included.
**Evidence log ID:** E-014

---

## 5. Sharon Ebert's current role and availability as champion
**Claim:** Sharon Ebert (DCAO) is the appropriate City contact for continuation pathway conversations.
**How to verify:** Confirm with hackathon organizers (Christian Markow, Michael Kolbe) that Sharon Ebert is still the relevant DCAO contact.
**Evidence log ID:** E-013

---

## 6. Richmond Planning Commission notification requirements
**Claim:** Richmond's notification requirements for development cases include specific mailing radius and timeline requirements that create a gap before Legistar posting.
**How to verify:** Find the City's land use notification requirements in the City Code or Planning Department website.
**Evidence log ID:** E-018
**Verified 2026-03-18:** Virginia Code § 15.2-2204 requires mailed notice to abutting owners and across-street owners, minimum 5 days before hearing for cases affecting ≤25 parcels; newspaper notice must appear at least 5 days before meeting. A 150-foot mailing radius is referenced in secondary sources but not confirmed from official Richmond City Code text.

---

## 7. NLIHC Preservation Database coverage for Richmond
**Claim:** The NLIHC National Housing Preservation Database contains meaningful Richmond property coverage, not just federal public housing.
**How to verify:** Search the NLIHC database for Richmond properties and assess coverage.
**Evidence log ID:** E-002

---

## 8. Richmond Open Data Portal — active permit dataset
**Claim:** The Richmond Open Data Portal (Socrata) has an active building permit dataset that is current enough to be useful for neighborhood change analysis.
**How to verify:** Visit data.richmondgov.com, find the permits dataset, and check the last-updated date and completeness.
**Evidence log ID:** E-020-cv
**Verified 2026-03-18:** Cannot verify. No building permits dataset is present in data.richmondgov.com's public catalog. Richmond's permit data is accessible via the Online Permit Portal at rva.gov, not the Socrata open data portal. Teams should not plan to use data.richmondgov.com for permit data.

---

## 9. Councilmatic open-source project — current maintenance status
**Claim:** The django-councilmatic open-source project is actively maintained and could be used as a starting point for a Richmond development tracker.
**How to verify:** Check the GitHub repository for recent commits and any Richmond-specific forks.
**Evidence log ID:** E-019
**Verified 2026-03-18:** Last release v3.1.0 dated February 9, 2023. 40 open issues, 1 open PR as of verification date. Repository is not archived. Project is not actively maintained at a production pace. Usable for a hackathon prototype but expect dependency debt and compatibility issues.

---

## 10. Legistar housing funding ordinance searchability
**Claim:** Housing grant and loan approvals can be found in Legistar by searching for specific matter types or keywords, and they contain enough information to seed a housing investment dashboard.
**How to verify:** Search Richmond's Legistar for "housing" or "Section 108" or "HOME" and assess result completeness and structure.
**Evidence log ID:** E-017
**Verified 2026-03-18:** HOME, CDBG, ESG, and HOPWA grant ordinances are present and queryable via the API by MatterTitle keyword. A March 2026 ordinance authorizes ~$12.5M in HUD grants. Funding amounts are referenced in titles. However, matter titling is not fully consistent — a systematic housing investment dashboard would require fuzzy title matching across multiple keywords.

---

## Verification log

| Item | Status | Date | Notes |
|---|---|---|---|
| 1. Legistar API | Confirmed | 2026-03-18 | Client name is "richmondva". `https://webapi.legistar.com/v1/richmondva/Matters` returns live JSON. Evidence ID: E-011 |
| 2. GeoHub layers | Confirmed with caveat | 2026-03-18 | Development Mapper confirmed live (ArcGIS web map ID 777f2b6383fe42da9c6aaeac8df77c8c, last updated Jan 8 2026). Land Use Project Mapper listed but "being updated" — no stable REST endpoint. Evidence ID: E-012 |
| 3. Legistar address fields | Confirmed with caveat | 2026-03-18 | Street addresses appear in MatterTitle text for SUP/planning cases (e.g. "3618 Hawthorne Avenue"). MatterText1-5 fields are null for Ordinances. No structured address field in API — parsing required. Evidence ID: E-015 |
| 4. CHAS tract level | Confirmed | 2026-03-18 | Census tract is a supported geographic level in the HUD CHAS download tool at huduser.gov/portal/datasets/cp.html. Evidence ID: E-014 |
| 5. Sharon Ebert contact | Confirmed | 2026-03-18 | Sharon Ebert is DCAO for Economic & Community Development per rva.gov announcement. Named Acting CAO by Mayor Avula in May 2025. Evidence ID: E-013 |
| 6. Notification requirements | Confirmed (state law) | 2026-03-18 | Virginia Code § 15.2-2204 requires mailed notice to abutting owners and across-street owners, minimum 5 days before hearing for cases ≤25 parcels. City zoning ordinance 150-foot radius not independently confirmed from official text. Evidence ID: E-018 |
| 7. NLIHC coverage | Cannot Verify | 2026-03-18 | Database is publicly accessible (~80,000 properties nationally). Richmond inclusion expected but city-specific count not obtainable without login/download. Evidence ID: E-022-cv |
| 8. Open Data Portal permits | Cannot Verify | 2026-03-18 | No building permits dataset found in data.richmondgov.com public catalog. Richmond permit data sits in the Online Permit Portal (rva.gov), not the open data portal. Evidence ID: E-020-cv |
| 9. Councilmatic status | Confirmed (low maintenance) | 2026-03-18 | Last release v3.1.0 dated Feb 9, 2023. 40 open issues, 1 open PR. Not archived. Not actively maintained at production pace. Evidence ID: E-019 |
| 10. Legistar housing ordinances | Confirmed | 2026-03-18 | HOME, CDBG, ESG, HOPWA ordinances are present and queryable by MatterTitle keyword. March 2026 ordinance authorizes ~$12.5M in HUD grants. Titling is not fully consistent — title-based search is feasible but incomplete. Evidence ID: E-017 |
