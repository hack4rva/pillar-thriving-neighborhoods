# 48-Hour MVP Feasibility: Richmond Neighborhood Development Tracker, End-to-End Plan

## Executive Summary
The build feasibility for the Richmond Neighborhood Development Tracker MVP within a 48-hour window is **High**. The public data path is verified end-to-end: the Granicus Legistar Web API for the client identifier `richmondva` is live and returns structured matter data [1] [2], while the City of Richmond's GIS portal hosts accessible, up-to-date ArcGIS Feature Services for both Addresses and Parcels [3] [4]. 

The primary technical hurdle is not data availability, but address extraction, as Legistar matters embed location data within free-text titles and bodies rather than dedicated fields [2] [5]. To ensure a credible and reliable demo, the architecture will rely on a hybrid approach: live API fetching for recent matters to prove freshness, deterministic geocoding against the city's Address layer, and a pre-seeded JSON fallback of 10–20 curated records to guarantee reliability if live parsing fails during the presentation.

## Feasibility Verdict
**Assessment: High Feasibility**

Both the Legistar API and Richmond's ArcGIS layers are public, well-documented, and sufficient to support a 48-hour MVP build. 
* **Evidence:** The Legistar API supports OData controls (e.g., `$top`, `$skip`, `$filter`) to manage payload sizes [6]. Richmond's "Addresses" feature layer contains `AddressLabel`, `Latitude`, and `Longitude` [3] [7], while the "Parcels" layer contains `ParcelID`, `PIN`, and `LandUse` [4]. Furthermore, Richmond's Legistar portal supports direct deep-linking to individual matters using `LegislationDetail.aspx?ID={id}&GUID={guid}` [5] [8].
* **Constraints:** The Legistar API limits queries to 1,000 responses per call [6]. Address extraction must rely on regex parsing from free text.
* **Verdict:** High feasibility can be achieved by utilizing a slim serverless proxy to handle CORS/caching and relying on a curated seed set for guaranteed map rendering.

## Technical Architecture
A simple, resilient pipeline can be built using client-side fetching, deterministic address matching, and lightweight map rendering.

### Verified Data Sources and Endpoints
* **Legistar Base API:** `https://webapi.legistar.com/v1/richmondva` [2].
 * *Matters Endpoint:* `/Matters?$filter=MatterLastModifiedUtc ge datetime'YYYY-MM-DD'` [6] [1].
* **Legistar Deep Links:**
 * *Legislation:* `https://richmondva.legistar.com/LegislationDetail.aspx?ID={id}&GUID={guid}` [5].
 * *Meetings:* `https://richmondva.legistar.com/MeetingDetail.aspx?ID={id}&GUID={guid}` [9].
* **ArcGIS Feature Services:**
 * *Addresses:* Item ID `674d645c444f4191998f0ebb96e56047` (Provides `AddressLabel`, `Latitude`, `Longitude`) [3] [7] [10].
 * *Parcels:* Item ID `fbfce2aab2a44c05bc0abc2d6ea7e54a` (Provides `ParcelID`, `PIN`, `OwnerName`, `LandUse`) [4] [11].

### Parsing and Geocoding Flow
1. **Extract:** Use regex to pull candidate address strings from the `MatterTitle` or `MatterBody` (e.g., "1304 MacTavish Avenue") [2] [5].
2. **Normalize:** Standardize street types and abbreviations to match USPS standards used by the city [3].
3. **Match:** Compare normalized strings to the `AddressLabel` in the Addresses layer. If matched, extract `Latitude` and `Longitude` [7]. If unmatched, flag the item with a "Location not specified" badge.
4. **Enrich:** On map marker click, perform a point-in-polygon query via `esri-leaflet` against the Parcels layer to append `ParcelID` and `LandUse` [4].

## Minimum Viable Version
To deliver a credible demo, the MVP must include these 5 core features:
1. **Live Matters List:** A feed of land-use-relevant matters from the last 60–90 days, filtered by keywords (e.g., "special use", "rezoning").
2. **Interactive Map:** Map display with markers for successfully geocoded items, and a clear "Location not specified" state for non-geocodable matters.
3. **Summary Cards:** UI cards displaying the title, address, meeting date, status, plain-language chips (e.g., "SUP", "Rezoning"), and a live "View on Legistar" link.
4. **Basic Filters:** Controls to filter by date range, governing body (e.g., Planning Commission, City Council), and tag.
5. **Reliability Layer:** A pre-seeded JSON file of 10–20 curated, pre-geocoded records that automatically loads if the live fetch fails.

## Data Access Path
The data pipeline relies on OData filtering and deterministic joins to local GIS data.

### Legistar Fetch Strategy
Query the API using OData date filters to restrict payload size: `GET /Matters?$filter=MatterLastModifiedUtc ge datetime'2026-01-01'` [6]. Apply client-side keyword filtering to isolate land-use matters by searching for terms like "special use", "rezone", "conditional use", or "variance" [5].

### Address Extraction and Matching
Because addresses are embedded in text (e.g., "To authorize the conditional use of the property known as 1304 MacTavish Avenue...") [5], the app will use regex patterns looking for numbers followed by street names and types. These will be normalized and queried against the ArcGIS REST feature service using a `where=upper(AddressLabel)='...'` clause to retrieve coordinates [3] [7].

## Front-End Tech Choices
To maximize speed-to-demo and avoid vendor lock-in or token management, the recommended stack is lightweight and static.

* **Mapping:** Leaflet + OpenStreetMap (OSM) tiles. Leaflet requires no API tokens, and `esri-leaflet` seamlessly handles ArcGIS Feature Service queries for parcel data. Mapbox GL should be avoided to prevent token configuration overhead.
* **UI Framework:** Vanilla JS (ES Modules) + Vite. React introduces unnecessary state management overhead for a 48-hour build unless the team is exceptionally fluent in it.
* **Hosting & Backend:** Netlify or Vercel static hosting, paired with a serverless proxy (Cloudflare Worker or Netlify Function) to cache Legistar API calls for 5 minutes, mitigating CORS issues and rate limits.

## Hour Estimates by Component
The build fits comfortably within a 48-hour window, requiring approximately 35 hours of active development plus a buffer.

| Component | Best (h) | Likely (h) | Worst (h) |
| :--- | :--- | :--- | :--- |
| Data fetch + proxy (Legistar OData, caching) | 2 | 3 | 5 |
| Keyword filters + address parsing/normalization | 4 | 6 | 8 |
| Address match via ArcGIS Addresses | 2 | 3 | 5 |
| Map display (Leaflet, markers, selection) | 3 | 4 | 6 |
| Parcel enrichment on click (esri-leaflet) | 2 | 3 | 4 |
| Cards UI + filters + deep links | 4 | 6 | 8 |
| Plain-language chips/summaries (rule-based) | 2 | 3 | 4 |
| Pre-seeded JSON (curation + loader) | 1 | 2 | 3 |
| QA, logging, perf polish | 2 | 3 | 4 |
| Deploy + fallback routing | 1 | 2 | 3 |
| **Totals** | **23** | **35** | **50** |

## What to Pre-Seed vs. What Must Be Live
To balance demo reliability with the credibility of live data, the architecture splits static and dynamic elements.

| Item | Pre-seed | Live |
| :--- | :--- | :--- |
| 10–20 matters with verified addresses/coords | Yes | N/A |
| Matters list (last 60–90 days) | No | Yes (API fetch) |
| Legistar deep links (GUID/ID) | No | Yes (from API) |
| Address lookups for seeded items | Yes (embedded lat/long) | Optional live for others |
| Parcel enrichment | No | Yes (on-demand query) |
| Filters (body/date/tag) | N/A | Yes |

## Definition of "Done"
The MVP is considered complete when:
1. A user loads the app and sees geocoded markers for at least 10 items (seeded or live), alongside a list of 20–50 live matters from the last 60–90 days.
2. Each summary card displays the title, address (or "Location not specified"), date, status, plain-language chips, and a functional "View on Legistar" link [5].
3. Filters (date range, body, tag) successfully update both the map and the card list in sync.
4. Clicking a map marker highlights the corresponding card and triggers a parcel enrichment query to display `ParcelID` and `LandUse` [4].
5. If the live Legistar fetch fails, the app automatically falls back to the pre-seeded JSON and displays a banner indicating "limited mode."

## Risks and Mitigations
* **Address Parsing Failures:** Free-text addresses may use non-standard phrasing. *Mitigation:* Restrict queries to land-use keywords, maintain manual overrides for demo targets, and gracefully degrade to "Location not specified."
* **CORS Denial / API Latency:** Browser security may block direct Legistar calls. *Mitigation:* Route calls through a serverless proxy with a 5-minute cache.
* **Payload Size:** Fetching all matters will exceed the 1,000-item limit [6]. *Mitigation:* Strictly enforce OData date filters (`$filter=MatterLastModifiedUtc`) to pull only recent data.

## 48-Hour Build Plan
* **Hours 0–6:** Scaffold the app (Vite, Leaflet, basic layout). Deploy the serverless proxy and verify Legistar OData fetching.
* **Hours 6–12:** Build keyword filters and the regex address extractor. Fetch the ArcGIS Addresses schema and test exact string matching.
* **Hours 12–18:** Render map markers from matched items. Build the UI cards, wire up the Legistar deep links, and implement rule-based summary chips.
* **Hours 18–24:** Implement parcel enrichment on marker click via `esri-leaflet`. Build basic UI filters and empty-state banners.
* **Hours 24–30:** Curate the 10–20 pre-seeded JSON records with verified coordinates. Wire up the automatic fallback mode.
* **Hours 30–36:** Polish UI/UX, synchronize map and card selection states, and implement basic error logging.
* **Hours 36–42:** Conduct QA with live data. Refine regex edge cases and hardcode manual overrides for specific demo targets.
* **Hours 42–48:** Final deployment, smoke testing, and demo script preparation.

## References

1. *Legistar Web API Help Page*. https://webapi.legistar.com/Help
2. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Matters?$top=1
3. *Addresses | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/674d645c444f4191998f0ebb96e56047_0/about
4. *Parcels - Overview*. https://www.arcgis.com/home/item.html?id=fbfce2aab2a44c05bc0abc2d6ea7e54a
5. *
	City of Richmond - File #: ORD. 2025-073
*. https://richmondva.legistar.com/LegislationDetail.aspx?ID=7315322&GUID=0E2C6899-407D-4EF6-93E1-FADB7864C352&FullText=1
6. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
7. *Addresses - Overview*. https://www.arcgis.com/home/item.html?id=674d645c444f4191998f0ebb96e56047
8. *
	City of Richmond - File #: ORD. 2025-143
*. https://richmondva.legistar.com/LegislationDetail.aspx?ID=7432219&GUID=22C4BF81-3A6C-477A-A89A-6312C27D11F9&Options=&Search=&FullText=1
9. *
	City of Richmond - Meeting of City Council on 3/23/2026 at 6:00 PM
*. https://richmondva.legistar.com/MeetingDetail.aspx?ID=1354758&GUID=8DB1D522-D712-4A81-8EF9-5F9991B397FE&Options=&Search=
10. *Fetched web page*. https://www.arcgis.com/sharing/rest/content/items/674d645c444f4191998f0ebb96e56047?f=pjson
11. *Fetched web page*. https://www.arcgis.com/sharing/rest/content/items/fbfce2aab2a44c05bc0abc2d6ea7e54a?f=pjson