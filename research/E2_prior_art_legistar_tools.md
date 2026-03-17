# Legistar-Powered Civic Tools: What to Reuse, What to Build Now

## Executive Summary
Legistar is the dominant legislative management software, used by 70% of the largest cities and counties in the U.S. [1]. For civic hackers and transparency advocates, this presents a massive opportunity: building a tool that works for one Legistar instance can theoretically scale to hundreds of municipalities. However, Granicus (Legistar's parent company) provides a constrained OData Web API capped at 1,000 responses per call [2], and they do not offer a developer SDK or troubleshooting support for custom code [3]. 

The most proven path forward is reusing the `django-councilmatic` ecosystem, which powers production sites like LA Metro Board Reports [4]. While the API exposes core data, teams must still rely on scraping for edge cases, handling hidden files, and ensuring ADA compliance, as default Legistar PDFs are not fully accessible [5]. For a Richmond-based team, the immediate next step is validating API access and deploying the Councilmatic starter template.

## Why Legistar-first matters for Richmond
Legistar is the de facto source for big-city legislative data. According to promotional materials, it is adopted by 70% of the largest cities and counties in the U.S. [1]. This means that standardizing on Legistar-compatible tooling maximizes portability across jurisdictions. Richmond currently uses Legistar for its legislative calendar and board reports, with an active InSite portal at `richmondva.legistar.com` [6] [7]. By targeting the Legistar API, a Richmond civic app can tap into a well-understood data pipeline that has already been battle-tested by other cities.

## Proven blueprint: django-councilmatic on the Legistar API
The most robust, production-ready framework for Legistar data is Councilmatic, maintained by DataMade. The `django-councilmatic` core provides the essential functions for these sites [8]. A prime example is the Los Angeles Metro Board Agendas site (`boardagendas.metro.net`), which tracks board reports, committees, and members [4] [9]. 

The LA Metro implementation proves that frequent, token-authenticated API syncs are viable. The app ingests updated data from the Legistar API "several times an hour" using a Dockerized scraper pipeline and a Legistar API token stored in a `secrets.py` file [10]. Teams can ship quickly by forking the `councilmatic-starter-template` [11] and mirroring LA Metro's ingestion schedule.

### Councilmatic deployment signals and reuse levers

| Deployment | Update Cadence | Auth | Data Domains | Reusable Components | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| LA Metro Board Reports | Several times an hour | API Token | Matters, events, bodies, members | `la-metro-councilmatic`, `django-councilmatic` | Proves high-frequency API polling works in production [4] [10]. |
| Starter Template | Configurable | Configurable | Open Civic Data standard | `councilmatic-starter-template` | Baseline for new cities [11]. |

## Open-source Legistar clients/wrappers
The open-source ecosystem around Legistar heavily favors Python for production ETL, though cross-language options exist for specific niches. Hackathons should default to actively maintained, Web API-first libraries. The older `fgregg/legistar-scrape` library has been officially deprecated and superseded by `opencivicdata/python-legistar-scraper` [12].

### OSS Legistar tooling comparison

| Project | Language | API Style | Coverage | Maintenance Signal | Links |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `python-legistar-scraper` | Python | Web + Scrape | Events, matters | Active (issues in 2025) | [13] [14] |
| `LegisPy` | Python | SOAP | Legacy SOAP | Low/Unknown | [15] |
| `legistarapi` | R | Web | General Web API | Docs maintained | [1] |
| `legisearch` | Python | Web | Events to SQLite | 2025 updates | [16] |
| `legistar-scrape` | Python | Web | Early scraper | Deprecated | [12] |

## Granicus platform realities
Granicus provides a Web API that exposes Legistar data directly over HTTPS [17]. However, it is not a modern developer platform with SDKs. The API uses OData parameters (`$top` and `$skip`) for pagination, and queries are strictly limited to 1,000 responses per call [2]. 

Furthermore, Granicus Support explicitly states that APIs are a "very technical tool" and they "only help you set up API usage, and does not provide assistance with troubleshooting issues" [3]. Builders must be prepared to handle their own pagination, token management, and error handling.

### Granicus components for builders

| Component | Purpose | Public Access | Dev Support | Builder Note |
| :--- | :--- | :--- | :--- | :--- |
| Web API | HTTPS data access | Requires client name/token | Setup only, no troubleshooting | Must implement OData `$top`/`$skip` [2] [3]. |
| InSite Portal | Public web interface | Yes | N/A | Often lacks ADA compliance for PDFs [5]. |

## Known gaps and failure modes
Relying solely on the Legistar API will leave gaps. API visibility is directly tied to InSite configuration; if an administrator checks "Not Viewable Via InSite" or fails to check "Available on the Web" for a file status, it will not appear [3]. 

Additionally, the `python-legistar-scraper` repository highlights ongoing edge cases, such as handling HTTP errors while scraping event details, determining active versions of related matters, and dealing with duplicated votes or roll calls [13] [3]. Finally, Granicus notes that reports published to InSite (Agendas, Minutes) can be read by screen readers but "are not ADA compliant by default" [5].

### Need vs. approach (API vs. scrape vs. policy fix)

| Data Need | API Availability | Scrape Fallback | Admin/Policy Change | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Historical backfills | Yes (paginated) | No | No | Must loop `$skip` due to 1,000 item limit [2]. |
| Hidden files | No | No | Yes | Requires unchecking "Not Viewable Via InSite" [3]. |
| ADA-compliant outputs | No | No | Yes | Must enable HTML reports for ADA compliance [5]. |
| Event details/minutes | Partial | Yes | No | Scrapers often needed for complex event parsing [13]. |

## City/agency-built interfaces on Legistar
Cities and agencies frequently build custom interfaces to bypass the UX limitations of the default InSite portal. The premier example is the Los Angeles County Metropolitan Transportation Authority, which partnered with DataMade to launch Metro Councilmatic (Board Reports) [4]. This site provides a vastly improved, searchable, and trackable interface for board reports, committees, and members, proving that a custom front-end can significantly enhance public dialogue [9].

## Richmond starting point
For a Richmond team wanting to build on Legistar, a rapid 10-day sprint can validate the approach:

1. **Days 1-2 (Access):** Confirm the API client key (likely `richmondva`) and test endpoints like `https://webapi.legistar.com/v1/richmondva/matters?$top=10` [2]. Determine if an API token is required and file a Granicus support ticket if access is blocked [3].
2. **Days 3-4 (Bootstrap):** Fork the `councilmatic-starter-template` [11]. Set up local secrets following the `la-metro-councilmatic` pattern [10].
3. **Days 5-7 (Ingest & Map):** Run the `opencivicdata/python-legistar-scraper` against Richmond's endpoints [14]. Map local committees and render basic list/detail views.
4. **Days 8-10 (Refine):** Implement search, handle the 1,000-item pagination limit [2], and audit missing files against the public InSite portal [6].

## Reuse vs. build

### Components to reuse vs. custom-build

| Capability | Reuse Candidate | Build Scope | Rationale | Link |
| :--- | :--- | :--- | :--- | :--- |
| ETL/Ingest | `python-legistar-scraper` | Light config | Maintained, API-aware | [14] |
| Web App | `django-councilmatic` | Theming/IA | Proven UX for legislation | [8] |
| Data Model | Open Civic Data | Local fields | Interop across cities | [11] |
| Accessibility | Custom templates | High | InSite PDFs are not ADA-compliant | [5] |

## Risks, unknowns, and validation plan
**Inferences & Risks:** The biggest risk is silent data omission. Because visibility is controlled by granular admin checkboxes ("Not Viewable Via InSite") [3], a perfectly functioning API client might still miss controversial or miscategorized legislation. Furthermore, scraping event details is prone to HTTP errors [13].

**Unknowns:** 
* Richmond's exact API token requirements (some clients require them, some do not) [2].
* The internal administrative workflows of the Richmond City Clerk regarding file visibility statuses.

**Validation Plan:** The team must run completeness checks by comparing API outputs against the public `richmondva.legistar.com` calendar [7]. 

## Implementation checklist and KPIs
To ensure a successful deployment, track the following metrics:
* **Access:** API endpoints reachable and returning 200 OK status.
* **Completeness:** ≥98% agreement with the public InSite portal for matters and events.
* **Freshness:** Data lag of <1 hour during business hours (matching LA Metro's cadence) [10].
* **Accessibility:** Custom UI achieves WCAG-AA compliance, bypassing the non-ADA compliant default PDFs [5].

## References

1. *Access the Legistar Web API • legistarapi*. https://elipousson.github.io/legistarapi/index.html
2. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
3. *Troubleshooting Common Legistar Issues | Granicus Support*. https://support.granicus.com/s/article/Troubleshooting-Common-Legistar-Issues
4. *Los Angeles Metro Board Agendas | DataMade*. https://datamade.us/our-work/councilmatic/metro-councilmatic/
5. *Legistar and Insite Accessibility*. https://support.granicus.com/s/article/Legistar-and-Insite-Accessibility
6. *City of Richmond - Legislation*. https://richmondva.legistar.com/Legislation.aspx
7. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
8. *GitHub - datamade/django-councilmatic: :heartpulse: Django app providing core functions for *.councilmatic.org · GitHub*. https://github.com/datamade/django-councilmatic
9. *Home - Metro Board*. https://boardagendas.metro.net/
10. *GitHub - Metro-Records/la-metro-councilmatic: :metro: An instance of councilmatic for LA Metro · GitHub*. https://github.com/datamade/la-metro-councilmatic
11. *GitHub - datamade/councilmatic-starter-template: :clipboard: Starter code & documentation for new councilmatic instances · GitHub*. https://github.com/datamade/councilmatic-starter-template
12. *GitHub - fgregg/legistar-scrape: Legistar Scraper is a python library for scraping Legistar sites -- legislation management sites hosted by by Granicus. · GitHub*. https://github.com/fgregg/legistar-scrape
13. *Issues · opencivicdata/python-legistar-scraper*. https://github.com/opencivicdata/python-legistar-scraper/issues
14. *python-legistar-scraper/legistar/events.py at master · opencivicdata/python-legistar-scraper · GitHub*. https://github.com/opencivicdata/python-legistar-scraper/blob/master/legistar/events.py
15. *GitHub - mjumbewu/LegisPy: Wrapper for Granicus's Legistar SOAP API · GitHub*. https://github.com/mjumbewu/LegisPy
16. *GitHub - jisaacstone/legisearch: Tool for searching mountian view city council meeting minutes · GitHub*. https://github.com/jisaacstone/legisearch
17. *Legistar Web API Help Page*. https://webapi.legistar.com/Help