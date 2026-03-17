# Building Resident-Centered Development Trackers: What Works Nationally, What Richmond Should Reuse

## Executive Summary

Richmond has the opportunity to build a resident-centered development tracker by adapting proven, open-source patterns from other major U.S. cities rather than starting from scratch. An analysis of national civic tech tools reveals that integrated, map-first portals significantly reduce friction and increase transparency. For example, New York City's Zoning Application Portal (ZAP) exposes approximately 30,000 land use projects dating back to the late 1970s and links directly to zoning and building databases [1] [2]. 

The most successful tools prioritize high-quality search and clear project timelines over complex, geofenced notification systems, which often become brittle without reliable data feeds. By leveraging open-source architectures like NYC's ZoLa and ZAP, Richmond can focus its resources on local data pipelines and user experience rather than rebuilding core mapping and filtering functionalities.

### Top-Line Takeaways — What to do in the next 90 days
* Fork proven open-source UI components (like ZoLa's map interface) and stand up a basic Layers API connected to a minimal Richmond planning dataset.
* Define and publish a core project schema and parcel/identifier strategy to enable cross-agency linking.
* Pilot a per-project timeline and embedded comment form on 5–10 active cases to test resident engagement.

## National Landscape of Development Tracking Tools

The most resilient and widely adopted development tracking tools are official, city-run products backed by strong open data practices and modular, open-source front-ends. Ad hoc or third-party tools often struggle with data freshness and long-term maintenance.

| Platform | Owner | Primary Function | Data Sources | Open-Source? | Notable Features |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ZoLa** | NYC Planning | Zoning & land use map, proposals view | Layers API; PLUTO/LION ecosystem; PAD-backed search | Yes (labs-zola) | MapboxGL layers; custom geosearch [3] [4] [5] |
| **ZAP Search** | NYC Planning | Land use application tracking | ZAP database (~30k projects since 1970s) | Yes (labs-zap-search) | Links to ZoLa, BISWeb, ACRIS; mobile support [1] [6] [2] |
| **Article 80 Projects** | Boston Planning | Development review tracking | BPDA Development Review; dataset PDDL | Unknown | Per-project timelines, docs, public comments (2016+) [7] [8] |

*Key Takeaway:* Cities that treat their planning data as a durable, versioned product (like NYC and Boston) provide the necessary foundation for effective public-facing trackers.

## Deep Dives into What Works

### NYC — ZAP + ZoLa Integration Shows the Value of Cross-Linking and Search
New York City's ecosystem demonstrates how modular applications can work together to provide end-to-end transparency. ZAP tracks land use applications and features direct links to ZoLa (zoning map), BISWeb (Department of Buildings), and ACRIS (Department of Finance) [2]. The ZAP dataset includes project tracking data for approximately 30,000 projects since the late 1970s [1]. 

Furthermore, NYC Planning Labs identified that search is ZoLa's most used function, prompting them to build NYC GeoSearch on the open-source Pelias engine using authoritative Property Address Directory (PAD) data [5]. ZoLa itself is built as an Ember.js single-page application that retrieves MapboxGL layers via a dedicated Layers API [4].

### Boston — Timeline and Feedback Integration Makes Process Legible
Boston's approach focuses on making the complex development review process understandable to residents. The city's Article 80 Development Projects portal includes a timeline feature for projects filed in 2016 and later [8]. This timeline displays key milestone dates, documents, events, pictures, and public comment forms directly within the project view [8]. The underlying dataset is published openly under the Open Data Commons Public Domain Dedication and License (PDDL) [7].

## Notifications and Resident Alerts

### Citygram Case Study — Concept is Strong; Sustainability Hinges on Feeds
Geofenced, topic-based alerts demonstrate high resident demand but require reliable, machine-readable event triggers to remain sustainable. Citygram, a project initiated during the 2014 Code for America fellowship by the Charlotte and Lexington teams, allows residents to subscribe to specific geographic areas and topics [9]. When an event occurs in the subscribed area, it delivers a notification via email, SMS, or webhook [9]. 

*Inference:* While the Citygram model is highly attractive for civic engagement, tools of this nature often go stale if the underlying municipal data feeds lack consistent, timestamped event triggers. Richmond should ensure its core data pipelines are robust before launching automated notification systems.

## Reusable Patterns vs. City-Specific Build

Richmond does not need to build its tracker entirely from scratch. By adopting open-source components, the city can accelerate development and reduce costs.

| Capability | Adapt (Reuse) | Build (Local) | Why It Matters |
| :--- | :--- | :--- | :--- |
| **Map UI & Layers** | ZoLa front-end patterns (Ember.js, MapboxGL) [4] | Richmond styles, branding, ADA compliance | Speeds delivery while ensuring local accessibility standards. |
| **Case Search UI** | ZAP Search patterns and repository [6] | Richmond-specific filters and statuses | Aligns the tool with Richmond's specific review processes. |
| **Geocoding** | Pelias-based search engine approach [5] | Integration of Richmond's authoritative address dataset | High-quality search is the primary driver of user adoption. |
| **Timelines** | Boston's milestone and comment model [8] | Richmond milestone schema; links to local hearings | Improves resident comprehension and channels input effectively. |

## Risks, Failure Modes, and Safeguards

* **Data Freshness Risk:** Tools underperform and lose public trust if datasets aren't updated regularly. Both Boston and NYC show recent data modifications (e.g., Boston's dataset modified 2026-02-28, NYC ZAP metadata updated 2026-03-15) [7] [1]. *Safeguard:* Publish SLAs and automate data pipelines.
* **Search Frustration Risk:** Poor address matching blocks entry for residents. NYC's investment in a custom GeoSearch underscores this importance [5]. *Safeguard:* Prioritize geocoder quality and testing using local address data.
* **Over-customization Risk:** Hard-coded UIs slow down future changes. *Safeguard:* Use a Layers API pattern to decouple map data assembly from the front-end UI [4].

## Facts, Inferences, Unknowns

### Facts
* NYC's ZAP provides project tracking data for approximately 30,000 projects since the late 1970s [1].
* ZAP features direct links to ZoLa, BISWeb, and ACRIS, and works on mobile device browsers [2].
* ZoLa is an Ember.js application that uses a Layers API to retrieve MapboxGL layers [4].
* NYC GeoSearch is built on Pelias and uses authoritative Property Address Directory (PAD) data [5].
* Boston's Article 80 portal utilizes a timeline feature for projects filed in 2016 and later, displaying milestones, documents, and public comment forms [8].
* Citygram is a geographic notification platform that delivers alerts via email, SMS, or webhook based on open government data [9].

### Inferences (Clearly Labeled)
* *Inference:* Notifications should be phased in only after Richmond exposes a stable "events" feed; the Citygram concept depends heavily on reliable, machine-readable triggers to prevent the tool from going stale.
* *Inference:* Adopting open-source patterns from ZoLa and ZAP can significantly shorten time-to-value, shifting the main effort to data engineering and Richmond-specific workflows rather than UI development.

### Unknowns
* Specific architecture, data sources, and current maintenance status of Councilmatic (Chicago and others).
* Mechanics, data sources, and resident adoption metrics for Lookout SF / SPUR development notification tools.
* Specific patterns and adoption rates for development tracker apps in Seattle and Los Angeles.
* Recent case studies from other civic tech organizations (mySociety, OpenPlans, Urban Institute) in this specific domain.

## Top 3 Patterns Most Applicable to Richmond

1. **Cross-Linked, Map-First Case Browser:** Combine lifecycle tracking (like ZAP) with zoning context (like ZoLa) and parcel-based linkouts to permits and property records [1] [2].
2. **High-Quality Address Search:** Treat search as the primary user experience. Invest in a robust geocoding stack (similar to NYC's Pelias implementation) paired with a maintained local address dataset [5].
3. **Timeline-Driven Engagement:** Display per-project milestones alongside documents and in-app comment forms to focus resident input at key stages, mirroring Boston's approach [8].

## Implementation Roadmap and KPIs

* **0–90 days:** Define data schema and parcel IDs. Stand up a basic Layers API, fork the ZoLa UI, import 50–100 recent cases, and execute a soft launch.
* **90–180 days:** Add project timelines, document bundles, and comment forms. Integrate cross-linkouts to other city databases and instrument search analytics.
* **180–270 days:** Pilot notifications on 1–2 specific event types (e.g., new filings). Publish an official events API and expand to additional neighborhoods.
* **KPIs:** Data freshness (under 48-hour lag), search success rate (greater than 90%), time-to-first-result (under 1.2 seconds), and notification delivery success rates.

## References

1. *Zoning Application Portal (ZAP) - Project Data - Catalog*. https://catalog.data.gov/dataset/zoning-application-portal-zap-project-data
2. *New Tool: Mayor de Blasio and DCP Announce Real Time Information on NYC Land Use Proposals Now Just a Click Away | Ben Kallos, New York City Council Member*. https://benkallos.com/press-release/new-tool-mayor-de-blasio-and-dcp-announce-real-time-information-nyc-land-use
3. *ZoLa | NYC's Zoning & Land Use Map*. https://zola.planning.nyc.gov/
4. *GitHub - NYCPlanning/labs-zola: NYC Planning's Zoning and Land Use App · GitHub*. https://github.com/NYCPlanning/labs-zola
5. *NYC GeoSearch Makes ZoLa Better. Almost every New Yorker who uses ZoLa… | by Andy Cochran | NYC Planning Tech | Medium*. https://medium.com/nyc-planning-digital/nyc-geosearch-makes-zola-better-681660758369
6. *GitHub - NYCPlanning/labs-zap-search: Search application for the DCP Zoning Application Search · GitHub*. https://github.com/NYCPlanning/labs-zap-search
7. *Article 80 Development Projects (website) - Dataset - Analyze Boston*. https://data.boston.gov/dataset/article80-development-projects
8. *
	Development Projects & Plans | Bostonplans.org
*. http://www.bostonplans.org/projects/development-projects
9. *GitHub - codeforamerica/citygram: Subscribe to your city. · GitHub*. https://github.com/codeforamerica/citygram