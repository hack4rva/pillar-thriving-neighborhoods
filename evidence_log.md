# Evidence Log — Thriving Neighborhoods

Track every claim used in research, design, or demo here. Update status as verification progresses.

Format: ID | Claim | Source | URL | Status | Date checked

---

## Confirmed

| ID | Claim | Source | URL | Status |
|---|---|---|---|---|
| E-001 | HUD Fair Market Rents are publicly available for Richmond MSA | HUD | https://www.huduser.gov/portal/datasets/fmr.html | Confirmed public |
| E-002 | NLIHC National Housing Preservation Database is publicly accessible | NLIHC | https://preservationdatabase.org | Confirmed public |
| E-003 | Richmond City Council meetings are recorded in Legistar | City of Richmond | TBD — confirm URL | Unverified |

---

## Likely but unverified

| ID | Claim | Source | URL | Status |
|---|---|---|---|---|
| E-010 | Richmond uses the Granicus/Legistar platform | Working session notes | — | Unverified |
| E-011 | The Granicus Web API is available for Richmond's Legistar instance | Granicus documentation | https://webapi.legistar.com/help | Unverified — must confirm Richmond endpoint |
| E-012 | Richmond GeoHub includes a Land Use Project Mapper layer | GeoHub | TBD | Unverified |
| E-013 | Sharon Ebert (DCAO) attended the February 18 working session | Rubric document | — | Unverified from independent source |
| E-014 | HUD CHAS data is available at census tract level for Richmond | HUD | https://www.huduser.gov/portal/datasets/cp.html | Likely — confirm format |

---

## Missing

| ID | Claim needed | Why it matters |
|---|---|---|
| E-020 | List of City-funded affordable housing developments | Foundation of compliance tool; not publicly available in structured form |
| E-021 | Richmond Legistar API endpoint URL | Required before building any Legistar-based tool |
| E-022 | GeoHub REST API endpoint for Land Use Project Mapper | Required before building development map |
| E-023 | Named departmental champion for continuation | Required for post-hackathon pathway |
| E-024 | Resident survey data on development discovery pain points | Would strengthen the user case |

---

## Useful datasets

| Name | URL | Format | Status |
|---|---|---|---|
| HUD Fair Market Rents | https://www.huduser.gov/portal/datasets/fmr.html | CSV/Excel | Confirmed accessible |
| HUD CHAS | https://www.huduser.gov/portal/datasets/cp.html | Excel | Confirmed accessible |
| NLIHC Preservation Database | https://preservationdatabase.org | CSV/API | Confirmed accessible |
| Richmond Legistar | TBD | JSON (API) or HTML | Unverified — confirm API |
| Richmond GeoHub | TBD | ArcGIS REST / GeoJSON | Unverified — confirm layers |

---

## Prior art

| Tool | URL | Relevance | Status |
|---|---|---|---|
| django-councilmatic | https://github.com/datamade/django-councilmatic | Legistar-based tracker (open source) | Unverified — check current maintenance |
| NLIHC Preservation Database | https://preservationdatabase.org | Housing compliance model | Confirmed accessible |

---

## Risks

| ID | Risk | Severity | Mitigation |
|---|---|---|---|
| R-001 | Legistar API not available for Richmond | High | Fall back to pre-seeded static JSON |
| R-002 | GeoHub layers stale or not REST-accessible | Medium | Fall back to manual GeoJSON download |
| R-003 | AI summaries contain planning errors | High | Label as interpretation; link to official source |
| R-004 | Compliance tool implies official findings | High | Frame as staff-support only; add disclaimers |
