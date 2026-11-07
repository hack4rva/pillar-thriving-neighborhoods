> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Weekend-Capable Civic Tech in Housing: What Lasts, What to Build Next

## Executive Summary

The most successful weekend-built civic tech projects in housing and planning share a common DNA: they aggressively scope down to a single high-signal question, rely on pre-fetched static data to guarantee demo performance, and secure organizational stewardship early. An analysis of historical civic tech projects reveals that tools built on Legistar and municipal GIS can prototype rapidly and endure for years if architected correctly. 

For Richmond Thriving Neighborhoods, the optimal 48-hour hackathon strategy avoids the trap of multi-agency data joins (such as eviction or vacant lot tracking, which often require months of data cleaning). Instead, the team should focus on a "Councilmatic-Lite" legislative tracker, a static zoning map MVP, and a simple area-based email digest. By copying the static-first architecture of Chicago's 2nd City Zoning and the replicable template model of Councilmatic, Richmond can ship a highly demoable, low-maintenance tool that delivers immediate value to both residents and planning staff.

## What Richmond Can Ship in 48 Hours and Why It Will Matter

A static zoning map paired with a Legistar-filtered tracker and a simple "subscribe" digest is weekend-buildable, highly demoable, and positioned to sustain with minimal operational overhead. 

Hackathons often fail when teams attempt to build real-time API integrations or clean messy, multi-agency datasets under extreme time constraints. The most effective strategy for Richmond is to pre-download and simplify zoning districts once, host a static map, and avoid live ArcGIS queries during the hack. By locking in a crisp, demoable scope—such as "What is my parcel zoned?" combined with a one-paragraph explainer—the team can guarantee a working prototype. Furthermore, parsing rezoning ordinances from Legistar and linking them directly from map popups multiplies the tool's value, allowing judges and partners to see both the geographic context and the legislative process in a single click.

## 5 Civic Tech Exemplars in Housing and Planning

Projects that prefetch data, snapshot their databases, and scope to a single, high-signal question demo well and keep running long after the hackathon ends.

| Project | Core Data Source | Hackathon Origin? | Weekend Tech Choices | 48-Hour Demo Scope | Continued? | Why Valued |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2nd City Zoning** | Municipal GIS (ArcGIS REST) | Built early 2013 by Open City | Jekyll + MapLibre + gzipped GeoJSON via pyesridump; annual snapshot | "What is my zoning?" | Yes, ongoing | Instant lookup; SimCity UX; low ops |
| **Councilmatic** | Legistar | Yes (March 2011 hackathon) | Early scraper + alerts; later Django + Solr | "Track and alert on bills" | Yes, multi-city | Subscriptions; replicable template; partner fit |
| **Citygram** | City feeds (permits/meetings) | Ideated in brigade/fellows hack settings | Geo feeds + area-based notifications; daily digests | "Subscribe to your area + topic" | Yes, multi-city pilots | Citizen engagement; simple on-ramps |
| **Grounded in Philly** | Multi-agency vacant land data | No (launched June 2013 civically) | Web map + organizing tooling | "Find/organize around vacant lots" | Yes | Movement building; data consolidation |
| **Worst Evictors NYC (AEMP)** | Court/eviction data + open data | No (multi-month effort) | Heavy data cleaning/geocoding | Citywide evictions + landlord lookup | Yes | Advocacy; accountability |

*Takeaway: The projects that successfully transitioned from weekend sprints to sustained deployments (Councilmatic, 2nd City Zoning) relied heavily on static data and replicable templates, whereas projects dealing with evictions or vacant lots required extensive, multi-month data cleaning efforts.*

### 2nd City Zoning: Static GIS Wins the Weekend
Built by Open City in Chicago, 2nd City Zoning is an interactive map that allows users to find out how their building is zoned and explore zoning patterns [1] [2]. The project is entirely open source and built with open data, utilizing Jekyll, Bootstrap, and MapLibre-GL JS [2]. To make the zoning code digestible, the team utilized a color scheme inspired by the game SimCity 2000 [2]. Crucially, the team pulls data directly from the City of Chicago's ArcGIS REST Services Directory, converts it to GeoJSON using `pyesridump`, simplifies the geometries, and gzips the files into a static `/data` folder [1] [2]. 

### Councilmatic: Legistar-First Trackers Prototype Fast and Endure
Councilmatic was conceptualized by Mjumbe Poe and initially developed at a hackathon in March 2011 [3]. It functions as a subscription service for city council legislative information [4]. The project was later chosen by Code for America for its "Great American Civic Hack" in 2013, leading to national replication [5]. Today, it survives through the `django-councilmatic` core and a starter template provided by DataMade, powering instances in Chicago, Los Angeles, and beyond [6] [7]. Note: `django-councilmatic` last release was v3.1.0 in February 2023; not actively maintained but usable for a hackathon build (corrected 2026-03-18).

### Citygram: "Subscribe to Your City" Secures Funding
Citygram, developed by Code for Charlotte, was designed to make it easier for local governments to connect with citizens by creating a notification system based on geographic areas and specific categories [8]. The project grew out of hackathon ideation and "subscribing to your city" brainstorms in 2014 [9]. It successfully secured a $35,000 Knight Prototype Fund grant [8].

### Grounded in Philly and AEMP: High Value, Low Weekend Viability
Grounded in Philly consolidates vacant land data from multiple city agencies to help residents secure legal use of vacant lots [10]. Similarly, the Anti-Eviction Mapping Project (AEMP) in NYC built the "Worst Evictors" platform by combining research from tenant organizers with data analysis [11]. However, because NYC eviction records are "virtually unusable for analysis," the project required months of volunteer labor to sanitize, deduplicate, and geocode the raw data [11]. These projects highlight that multi-agency data joins are not viable for a 48-hour sprint.

## Technical Patterns to Copy for Weekend Builds

Static-first architecture, pre-fetched JSON/GeoJSON, and the avoidance of authentication or real-time dependencies are decisive factors in weekend build success.

* **Annual ESRI-to-GeoJSON Pipelines**: 2nd City Zoning updates its data annually by running `esri2geojson` against Chicago's ArcGIS server, using `ogr2ogr` to simplify geometries (with a tolerance of `0.00003`), minifying the properties to only what is necessary, and gzipping the result [1]. This completely removes the need for live ArcGIS queries during a demo.
* **Starter Templates and Repeatable Deploys**: Councilmatic's transition from a hackathon scraper to a robust platform was enabled by the creation of the `councilmatic-starter-template` and `django-councilmatic` [6] [7]. Leveraging existing open-source templates drastically reduces weekend setup time.
* **Digest Models over Real-Time Webhooks**: Citygram's model of allowing users to select a geographic area and category for notifications lowers infrastructure complexity compared to building real-time webhooks [8].

## Scope Moves That Demo in 48 Hours

To ensure a successful demo, teams must ruthlessly prioritize one dataset, one primary user story, and read-only flows.

* **Include**: Parcel-level zoning lookups; a rezoning agenda list with basic filters; an area-based daily digest.
* **Skip**: Multi-agency joins (e.g., combining vacancy data with court records), role-based authentication, and any data editing workflows.

## Value Propositions That Score with Judges and Partners

Self-service transparency combined with staff time savings and replicability equals immediate traction.

OpenCounter's commercial ZoningCheck product demonstrates exactly what planning staff value: the ability for applicants to see where their project is allowed "in seconds," comprehensive ArcGIS integration, and precalculated zoning clearances [12]. While a hackathon project won't match a commercial SaaS, framing the pitch around "reducing a 30-minute manual lookup to a 10-second self-service search" resonates deeply with municipal partners. Furthermore, 2nd City Zoning proved that clear storytelling and delightful UX (the SimCity aesthetic) drive significant press and public engagement [2].

## Continuation Factors: From Weekend Demo to Sustained Service

Named stewards, minimal operational costs, and documented data refreshes keep projects alive long after the hackathon ends.

Councilmatic persisted because it was adopted and maintained by DataMade and Code for America Brigades [6] [7]. 2nd City Zoning remains active because its static architecture allows for virtually free hosting (e.g., GitHub Pages) and its data update process is documented as a simple, repeatable script [1] [2].

## Risks and Failure Cases: Where Weekends Go to Die

Dirty data and live API dependencies will tank a 48-hour demo. 

The AEMP's experience with NYC eviction data—requiring months of volunteer labor just to make the open data usable—is a stark warning [11]. Attempting to clean and join messy datasets during a hackathon guarantees failure. The mitigation strategy is to snapshot JSON/GeoJSON data prior to the event, run everything locally, and pre-render indexes.

## Unknowns and Validation Needs for Richmond

Before scoping the Richmond build, several local variables must be confirmed.

* **Resolved**: Richmond uses Legistar; API is confirmed live at `https://webapi.legistar.com/v1/richmondva/Matters` (corrected 2026-03-18). **Remaining unknowns**: Are there rate limits on the Legistar API? Are the city's zoning shapefiles or ArcGIS services openly accessible for bulk download? What are the constraints for free email delivery services (e.g., SendGrid, Mailgun) for the digest feature?
* **Validation Plan**: Conduct a 30-minute data discovery session prior to the hackathon to test sample API calls and perform one successful parcel data export.

## Top 3 Weekend-Viable Patterns for Richmond Thriving Neighborhoods

These three patterns perfectly align with Richmond's needs and the constraints of a 48-hour build.

1. **Councilmatic-Lite for Land Use**: Build a filtered legislative tracker specifically for zoning, special use permits, and Board of Zoning Appeals (BZA) items. Implement a nightly prefetch of the agenda data, tag items by keyword, and offer simple email alerts.
2. **Static Zoning Map MVP**: Deploy a Jekyll and MapLibre map using simplified, gzipped GeoJSON. Include a basic parcel search, friendly zoning descriptions, and direct links to relevant ordinances.
3. **Citygram-Style Digest**: Create an area-based daily email digest for two reliable feeds (e.g., building permits and rezoning agendas). Start with a simple script that polls CSV/JSON data to a static cache, avoiding live webhooks entirely.

## Richmond Playbook: What to Copy, Adapt, and Avoid

### Copy
* **2nd City Zoning's Data Pipeline**: Copy the ESRI-to-GeoJSON pipeline, including geometry simplification and gzipping [1].
* **Councilmatic's Content Model**: Utilize the established models for bills, events, and organizations [7].
* **Static Hosting**: Host the frontend on GitHub Pages or Netlify to ensure zero-maintenance uptime.

### Adapt
* **Citygram's Notifications**: Adapt the notification model to an email-only daily digest for version 1, avoiding the complexity of SMS delivery during the hackathon.

### Avoid
* **Court and Eviction Data**: Avoid any attempts to map evictions or join multi-agency vacant lot data in version 1 [10] [11].
* **Complex Search Infrastructure**: Avoid setting up Solr or ElasticSearch unless absolutely necessary; rely on local JSON filtering for the MVP.

### 30/60/90-Day Arc
* **30 Days**: Ship the MVP trio (Map, Tracker, Digest) and officially appoint a project steward (e.g., a local brigade leader).
* **60 Days**: Add cross-links between the map parcels and the legislative tracker, and implement basic analytics.
* **90 Days**: Expand the data feeds and begin formal onboarding with partner agencies.

## Facts (with URLs)

* Councilmatic was first quietly started at a hackathon in March 2011 and launched after 18 months of development. URL: `http://technical.ly/civic-news/councilmatic-18-months-in-the-making-use-this-web-app-to-track-city-council-legislation` [3]
* Code for America chose Councilmatic for its Great American Civic Hack in 2013. URL: `http://technical.ly/software-development/code-for-america-councilmatic-opentreemap` [5]
* The Councilmatic family includes a starter template and a core Django app maintained by DataMade. URLs: `http://github.com/datamade/django-councilmatic`, `http://github.com/datamade/councilmatic-starter-template` [6] [7]
* 2nd City Zoning is an interactive map built with Jekyll, Bootstrap, and MapLibre-GL JS that updates its data annually from Chicago's ArcGIS server. URLs: `http://github.com/datamade/second-city-zoning`, `http://secondcityzoning.org/about` [1] [2]
* Since 2011, there have been over 2,300 zoning reclassifications in Chicago, which 2nd City Zoning links to via Chicago Councilmatic. URL: `http://secondcityzoning.org/about` [2]
* Citygram, by Code for Charlotte, was awarded a $35,000 Knight Prototype Fund grant to create a geographic notification system. URL: `http://niemanlab.org/2015/11/20-new-projects-are-awarded-35000-knight-prototype-fund-grants` [8]
* The Worst Evictors NYC project required months of volunteer labor from the Housing Data Coalition and AEMP to sanitize and geocode raw city data. URL: `http://notesfrombelow.org/article/anti-eviction-mapping-project` [11]
* OpenCounter's ZoningCheck integrates with Esri ArcGIS REST APIs to precalculate zoning clearances. URL: `http://opencounter.com/products/zoningcheck` [12]

## Inferences

* **Confirmed**: Richmond uses Legistar (Granicus platform). The API is live at `https://webapi.legistar.com/v1/richmondva/Matters` (client name: `richmondva`). A Councilmatic-Lite approach using the API is immediately viable — no scraper required (corrected 2026-03-18).
* **Inference**: A single, public ArcGIS zoning layer exists for Richmond and can be exported to GeoJSON prior to the hackathon.
* **Inference**: A digest-only notification model (batch emails sent nightly) will satisfy initial user needs and drastically minimize infrastructure risk compared to real-time alerts.

## Implementation Recipes: Copy/Paste Play for Weekend Build

To de-risk the sprint, utilize these proven implementation steps:

1. **ArcGIS to GeoJSON Pipeline**: 
 * Use `pyesridump` or `esri2geojson` to extract the layer.
 * Simplify the geometry using `ogr2ogr` with a tolerance of `0.00003`.
 * Minify the JSON to remove unused properties.
 * Gzip the file and place it in a `/data` directory [1].
2. **Static Site Setup**: 
 * Initialize a Jekyll site with MapLibre.
 * Build a parcel search using a prebuilt local index.
 * Host the repository on GitHub Pages or Netlify for free, zero-ops deployment [2].
3. **Legistar Ingestion**: 
 * Use a simple JSON pull or a Python scraper to extract agenda items.
 * Store the results in a local SQLite database or flat JSON file.
 * Filter the items strictly by keywords like "rezoning," "special use permit," or "BZA" [7].
4. **Digest Automation**: 
 * Set up a nightly cron job (e.g., via GitHub Actions) that reads the cached JSON.
 * Run a spatial join against buffered user geometries.
 * Send batch emails using a service like Mailgun or SendGrid.

## Appendix: Unknowns, Risks, and Mitigation Plan

The first day of the hackathon must be spent addressing these specific risks:

* **Risk**: Richmond data endpoints are undocumented or heavily rate-limited.
 * **Mitigation**: Snapshot all required data (zoning shapefiles, recent agenda JSON) on Friday night. Build the app against the local snapshot.
* **Risk**: Email provider constraints block the digest demo.
 * **Mitigation**: Use environment flags to fall back to a local console output or a mock inbox for the demo presentation.
* **Risk**: The project dies on Monday because no one owns the repository.
 * **Mitigation**: Appoint a specific steward (e.g., a Code for America brigade captain) before the demo begins, and ensure all deployment scripts are documented in the README.

## References

1. *GitHub - datamade/second-city-zoning: 🏙 2nd City Zoning is an interactive map that lets you find out how your building is zoned, learn where to locate your business and explore zoning patterns throughout Chicago · GitHub*. https://github.com/datamade/second-city-zoning
2. *About - 2nd City Zoning - An interactive map of Chicago's ...*. https://secondcityzoning.org/about/
3. *Councilmatic: 18 months in the making, use this web app to track City Council legislation*. https://technical.ly/civic-news/councilmatic-18-months-in-the-making-use-this-web-app-to-track-city-council-legislation/
4. *Mjumbe Poe*. https://about.mjumbepoe.com/
5. *Great American Civic Hack: Code for America chooses Councilmatic, OpenTreeMap as national projects*. https://technical.ly/software-development/code-for-america-councilmatic-opentreemap/
6. *GitHub - datamade/councilmatic-starter-template: :clipboard: Starter code & documentation for new councilmatic instances · GitHub*. https://github.com/datamade/councilmatic-starter-template
7. *GitHub - datamade/django-councilmatic: :heartpulse: Django app providing core functions for *.councilmatic.org · GitHub*. https://github.com/datamade/django-councilmatic
8. *20 new projects are awarded $35,000 Knight Prototype Fund grants | Nieman Journalism Lab*. https://www.niemanlab.org/2015/11/20-new-projects-are-awarded-35000-knight-prototype-fund-grants/
9. *Team Charlotte*. https://team-charlotte.tumblr.com/
10. *Grounded in Philly | The Public Interest Law Center*. https://pubintlaw.org/cases-and-projects/grounded-in-philly/
11. *The Anti-Eviction Mapping Project // Notes From Below*. https://notesfrombelow.org/article/anti-eviction-mapping-project
12. *ZoningCheck - Planning & Zoning Software*. https://www.opencounter.com/products/zoningcheck/