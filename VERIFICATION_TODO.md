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
**Evidence log ID:** TBD

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
**Evidence log ID:** TBD

---

## 7. NLIHC Preservation Database coverage for Richmond
**Claim:** The NLIHC National Housing Preservation Database contains meaningful Richmond property coverage, not just federal public housing.
**How to verify:** Search the NLIHC database for Richmond properties and assess coverage.
**Evidence log ID:** E-002

---

## 8. Richmond Open Data Portal — active permit dataset
**Claim:** The Richmond Open Data Portal (Socrata) has an active building permit dataset that is current enough to be useful for neighborhood change analysis.
**How to verify:** Visit data.richmondgov.com, find the permits dataset, and check the last-updated date and completeness.
**Evidence log ID:** TBD

---

## 9. Councilmatic open-source project — current maintenance status
**Claim:** The django-councilmatic open-source project is actively maintained and could be used as a starting point for a Richmond development tracker.
**How to verify:** Check the GitHub repository for recent commits and any Richmond-specific forks.
**Evidence log ID:** TBD

---

## 10. Legistar housing funding ordinance searchability
**Claim:** Housing grant and loan approvals can be found in Legistar by searching for specific matter types or keywords, and they contain enough information to seed a housing investment dashboard.
**How to verify:** Search Richmond's Legistar for "housing" or "Section 108" or "HOME" and assess result completeness and structure.
**Evidence log ID:** TBD

---

## Verification log

| Item | Status | Date | Notes |
|---|---|---|---|
| 1. Legistar API | Unverified | — | — |
| 2. GeoHub layers | Unverified | — | — |
| 3. Legistar address fields | Unverified | — | — |
| 4. CHAS tract level | Unverified | — | — |
| 5. Sharon Ebert contact | Unverified | — | — |
| 6. Notification requirements | Unverified | — | — |
| 7. NLIHC coverage | Unverified | — | — |
| 8. Open Data Portal permits | Unverified | — | — |
| 9. Councilmatic status | Unverified | — | — |
| 10. Legistar housing ordinances | Unverified | — | — |
