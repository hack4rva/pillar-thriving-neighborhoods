# 48-Hour Resilience Playbook — Shipping a Richmond civic data MVP despite Legistar and GeoHub gaps

## Executive Summary
Building a civic tech MVP in 48 hours requires treating every external data source as potentially unstable. While the City of Richmond provides accessible data portals, rate limits, record caps, and inconsistent formatting can easily derail a live demo. This playbook provides a deterministic, static-first architecture to ensure your prototype remains functional regardless of API uptime. 

Key strategic actions include:
* **Constrain Legistar queries**: The Richmond Legistar API is active but enforces a strict 1,000-response limit [1]. You must use OData paging and date filters to prevent silent failures [2] [1].
* **Bypass GeoHub REST limits**: Richmond's GeoHub layers cap queries at 2,000 records [3]. Rely on manual GeoJSON/CSV exports for base layers rather than live REST calls [4] [5] [3].
* **Normalize addresses before geocoding**: Free-text addresses will fail standard geocoders. Use `libpostal` and `usaddress` to parse messy strings [6] [7], then batch geocode via the US Census API to avoid Nominatim's strict 1 request/second throttle [8] [9].
* **Fake real-time with honest timestamps**: Do not attempt to build a real-time pipeline. Instead, extract source metadata timestamps (e.g., `MatterLastModifiedUtc`) to display accurate "As of" badges that build user trust [10].

## Problem framing — ship a credible MVP in 48 hours by reducing live-data risk

To ship a working prototype by Sunday afternoon, you must design around the hard constraints of your dependencies. Treating these APIs as highly available enterprise services will lead to mid-demo timeouts. Choose a static-first approach, confining "live" calls to small, reversible probes.

### Constraints you must design around
* **Legistar API Limits**: The Granicus Legistar Web API restricts query replies to 1,000 responses [1]. While the Richmond client slug (`richmondva`) is accessible without authentication for basic endpoints [10] [11], pulling historical data requires precise OData `$top`, `$skip`, and `$filter` parameters [2] [1].
* **GeoHub Record Caps**: Richmond's GeoHub datasets are public, but the REST API limits queries. For example, the Addresses feature layer contains 148,008 records, but the `maxRecordCount` per query is capped at 2,000 [12] [3]. 
* **Geocoding Throttles**: Free geocoding services have strict acceptable use policies. Nominatim (OpenStreetMap) enforces an absolute maximum of 1 request per second, forbids heavy bulk geocoding, and requires a valid User-Agent [8]. 
* **Unstructured PDFs**: Legistar agendas and staff reports are stored as PDF attachments [10] [11]. Automated parsing of municipal PDFs is highly brittle under time pressure due to scanned documents and inconsistent formatting.

## Decision trees — deterministic fallbacks for each dependency

### Legistar data path — API vs scrape vs static JSON

Default to paged API pulls in narrow windows. Switch to scraping or static JSON at the first sign of instability, CORS errors, or token requirements.

* **If GET `https://webapi.legistar.com/v1/richmondva/Matters?$top=1` returns 200 OK:**
 * **Then**: Use OData filters to scope by date and body [2] [10]. For Events, use `?$filter=EventDate ge datetime'YYYY-MM-DD'` [1]. Page the output using `$top` and `$skip` [2] [1]. Cap your lookback window to the last 60–90 days to avoid hitting the 1,000-record limit [1].
* **If the API throws 401/403 errors or CORS blocks the browser:**
 * **Then**: Proxy the request via a lightweight Node/Python server. If it remains blocked, switch to scraping. Use community tools like `python-legistar-scraper` [13] [14] to target Richmond's InSite pages (`richmondva.legistar.com/Calendar.aspx` and `Legislation.aspx`) [15] [16].
* **If scraping is throttled or HTML selectors shift:**
 * **Then**: Fall back to manual data entry. Seed 10–20 key items into a static `data/matters.json` file, capturing the title, body, intro date, and attachment URLs.

### GeoHub spatial path — REST vs manual download vs static layer

Prefer manual GeoJSON or CSV exports to bypass per-query caps. Treat the live REST API as an optional enhancement for small data slices.

* **If the GeoHub dataset page loads and "View API Resources" is accessible:**
 * **Then**: For light, targeted queries (under 2,000 features), call the `FeatureServer/0/query` endpoint [3]. 
* **If you need full layers (e.g., all 148,008 Richmond addresses) or heavy filters:**
 * **Then**: Do not use the REST API. Use the "Download" button on the dataset page to export the data [12]. ArcGIS Hub supports exporting to CSV, GeoJSON, Shapefile, KML, and Excel [4] [5] [3]. Clip this data to your region of interest and commit it to your repository.
* **If downloads stall or the portal goes down:**
 * **Then**: Rely on the last-known good static GeoJSON stored in your repo.

### Address handling and geocoding — messy text to points you can map

Municipal address data is rarely clean. You must normalize and parse the text before attempting to geocode, batching requests offline whenever possible.

* **If address strings are messy or unstructured:**
 * **Then**: Pass the string through `libpostal`'s `expand_address` API to normalize abbreviations and conventions [6]. Next, use the `usaddress` Python library's `tag` method to split the string into structured components (e.g., AddressNumber, StreetName, PlaceName) [7] [17]. 
* **If you need to geocode a large batch of parsed addresses:**
 * **Then**: Use the US Census Geocoder. It allows batch submissions of up to 10,000 addresses without requiring an API key [9].
* **If you need ad-hoc, live geocoding during the demo:**
 * **Then**: Use Nominatim, but strictly throttle to 1 request per second, provide a custom User-Agent, and cache all results locally [8].
* **If geocoding fails entirely:**
 * **Then**: Map the item to a known approximate location (e.g., City Hall or a Council District centroid) and flag it as "approximate" in the UI.

### PDF staff reports — parse vs manual summary

Automated PDF parsing is a stretch goal. Create human-readable summaries immediately to ensure you have content for the demo.

* **If the PDF is text-based and cleanly formatted:**
 * **Then**: Timebox 30 minutes to attempt extraction using tools like `pdftotext`, `pdfplumber`, or `Tabula`. 
* **If parsing yields low-quality text or the document is scanned:**
 * **Then**: Abandon automation. Manually summarize 5–10 representative reports into a `summaries.json` file. Include fields for Title, Purpose, Location, Financial Impact, and Next Action.
* **Always**: Link directly to the original PDF hosted on Legistar (e.g., `EventAgendaFile` or `EventMinutesFile`) so users can verify the source [11].

## Data freshness — honest, visible "as of" signals

Static data earns trust when it is transparently labeled. Never imply your app has a real-time pipeline if it relies on static JSON.

* **Legistar**: Surface the `MatterLastModifiedUtc` and `EventAgendaLastPublishedUTC` fields directly in your UI [10] [11].
* **GeoHub**: Display the "Data Updated" timestamp from the dataset's about page (e.g., March 17, 2026) [12].
* **Implementation**: Add an "As of: [Date]" badge next to every dataset. Wire a manual "Refresh data" button that simply updates the timestamp check, even if the underlying data remains static.

## Fallback data and tool matrix

Choose the right tool for each failure mode and prepare your artifacts before coding begins.

### Geocoding Options
| Service | Cost / Key | Limits & Policy | Best Use in 48h |
| :--- | :--- | :--- | :--- |
| **US Census Geocoder** | Free / No key | Batch up to 10,000 addresses [9] | Pre-geocoding large datasets offline |
| **Nominatim (OSM)** | Free / No key | Max 1 req/sec; User-Agent required [8] | Live, ad-hoc lookups with strict caching |
| **ArcGIS World Geocoding** | Free tier available | Limited anonymous features [18] | Edge cases where Census fails |

*Takeaway: Rely on the US Census Geocoder for bulk processing to avoid IP bans, reserving Nominatim strictly for single, user-triggered searches.*

### Legistar Access Options
| Mode | Evidence | When to Use | Deliverable |
| :--- | :--- | :--- | :--- |
| **Live API** | `richmondva` slug works; 1,000 row cap [1] [10] | Fetching the last 60–90 days of data | Paged API client + JSON cache |
| **HTML Scrape** | `python-legistar-scraper` targets InSite [13] | API throws CORS or requires tokens | `data/matters.json` |
| **Manual Seed** | N/A | Total API/scraper failure | Curated JSON of 10–20 items |

*Takeaway: Start with the live API using OData paging, but keep a scraper ready as a safety valve.*

### GeoHub Access Options
| Mode | Evidence | When to Use | Deliverable |
| :--- | :--- | :--- | :--- |
| **REST Query** | `maxRecordCount` is 2,000 [3] | Small, highly filtered spatial queries | On-demand API calls |
| **Manual Download** | Supports GeoJSON, CSV, Shapefile [4] [3] | Need full layers (e.g., all addresses) | Static GeoJSON in repo |

*Takeaway: Download base layers manually to guarantee map rendering during your final presentation.*

## Pre-hackathon checklist — 60-minute go/no-go probes

Decide which data will be static versus live in the first hour of the hackathon to avoid rabbit holes.

1. **Legistar API Probe**: GET `https://webapi.legistar.com/v1/richmondva/Matters?$top=1` and `/Events?$top=1` [10] [11]. Confirm 200 OK and check the browser console for CORS errors.
2. **GeoHub Probe**: Open the Richmond Addresses dataset page [12]. Load the REST endpoint `FeatureServer/0?f=pjson` and confirm `supportedExportFormats` includes `geojson` and `csv` [3]. Export a 500-record sample.
3. **Geocoding Probe**: Geocode 3 test addresses using the US Census single-line endpoint [9] and Nominatim [19]. Verify your User-Agent is accepted by Nominatim [8].
4. **PDF Probe**: Download 2 recent staff reports from Legistar attachments. Run `pdftotext` and assess if the output is usable.
5. **Lock the Scope**: Based on these probes, explicitly declare which features will use live APIs and which will rely on static files.

## Prepare in advance — reduce live-data risk to near-zero

Walk into the hackathon with your safety nets already built.

* **Pre-seeded Datasets**: Generate `data/matters.json` and `data/events.json` containing 20 recent items. Download and clip `city_boundary.geojson` and `addresses_subset.geojson` from GeoHub.
* **Code Scaffolds**: Write your Legistar API fetcher in advance, hardcoding the `$top`, `$skip`, and `$filter` parameters [1]. Build a simple proxy server to bypass potential CORS blocks.
* **Geocoding Pipeline**: Script a local pipeline that runs `libpostal` [6] -> `usaddress` [7] -> US Census Batch API [9]. 
* **UI Components**: Build an "As of [Timestamp]" badge component that accepts ISO 8601 strings (like `2014-05-24T04:17:51.993` [11]) and formats them for the user.

## References

1. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
2. *Legistar Web API | Granicus Support*. https://support.granicus.com/s/article/Legistar-Web-API
3. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Addresses/FeatureServer/0?f=pjson
4. *Data download settings—ArcGIS Hub - Esri Documentation*. https://doc.arcgis.com/en/hub/content/data-download-settings.htm
5. *Downloads guide for ArcGIS Hub and ArcGIS Enterprise Sites*. https://www.esri.com/arcgis-blog/products/arcgis-hub/data-management/downloads-guide-for-arcgis-hub-and-arcgis-enterprise-sites
6. *GitHub - openvenues/libpostal: A C library for parsing/normalizing street addresses around the world. Powered by statistical NLP and open geo data. · GitHub*. https://github.com/openvenues/libpostal
7. *GitHub - datamade/usaddress: :us: a python library for parsing unstructured United States address strings into address components · GitHub*. https://github.com/datamade/usaddress
8. *Nominatim Usage Policy (aka Geocoding Policy)*. https://operations.osmfoundation.org/policies/nominatim/
9. *Census Geocoder Documentation*. https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html
10. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Matters?$top=1
11. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Events?$top=1
12. *Addresses | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/674d645c444f4191998f0ebb96e56047_0/about
13. *GitHub - opencivicdata/python-legistar-scraper: Scrapes municipal data from Legistar websites · GitHub*. https://github.com/opencivicdata/python-legistar-scraper
14. *python-legistar-scraper/legistar/events.py at master · opencivicdata/python-legistar-scraper · GitHub*. https://github.com/opencivicdata/python-legistar-scraper/blob/master/legistar/events.py
15. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
16. *City of Richmond - Legislation*. https://richmondva.legistar.com/Legislation.aspx
17. *usaddress 0.5.4 — usaddress 0.5.4 documentation*. https://usaddress.readthedocs.io/en/latest/
18. *Geocoding Services • tidygeocoder*. https://jessecambon.github.io/tidygeocoder/articles/geocoder_services.html
19. *Search - Nominatim 5.2.0 Manual*. https://nominatim.org/release-docs/latest/api/Search/