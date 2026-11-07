> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Unlocking Richmond Development Data for Faster, Fairer Engagement

## Executive Summary

The initiative to build a neighborhood development notifier for Richmond in 48 hours is technically feasible but faces immediate data structure hurdles. The Granicus Legistar Web API is live for Richmond (using the `richmondva` client slug), successfully returning matters and events [1] [2]. However, the critical assumption that development case data includes machine-readable address fields is false; location data is embedded within rich text format (RTF) narratives [1]. 

Simultaneously, the City's ArcGIS infrastructure provides a dependable but asynchronous backbone. The Development Mapper categorizes projects by status (Pipeline, Under Construction, Completed) but is explicitly marked as "updated periodically" [3]. The Land Use Project Mapper is currently "being updated," signaling potential schema instability [3]. To succeed, the prototype must pivot from simple API integration to an extraction-heavy pipeline that parses RTF narratives into geocodable addresses, cross-referenced against authoritative parcel data from the Richmond ArcGIS Online portal [4].

## Data Access Reality Check

The foundation of any civic tech prototype relies on the accessibility and structure of public data. Current investigations into Richmond's systems reveal a mixed landscape of open endpoints and unstructured data.

The Legistar v1 API is active, but developers must use the `richmondva` slug rather than `richmond` to avoid 404 errors [5] [1]. While the API returns matter details, the location information is not neatly categorized. For example, a sample matter describes the location in a narrative format: "To close to public use and travel, a portion of right-of-way known as East Cary Street, located in the block bounded by Pear Street, East Main Street, Peach Street and East Dock Street" [1]. 

On the spatial side, the City of Richmond's ArcGIS Online page hosts several public GIS web applications [4]. The Development Mapper (webmap ID 777f2b6383fe42da9c6aaeac8df77c8c) tracks projects over $1.5 million since 2016, categorizing them into Pipeline, Under Construction, and Completed [3]. However, the City notes this map is "updated periodically so some information may have changed" [3]. Furthermore, the Land Use Project Mapper is currently flagged as "being updated" [3].

## Integration Architecture

To build a functional proposal map and alerting system without internal City data, we must combine Legistar narratives with ArcGIS parcel geometries. 

The architecture requires a multi-step pipeline:
1. **Ingest:** Pull matters from the Legistar API (`/v1/richmondva/matters`) filtered by land-use types [1].
2. **Parse:** Strip RTF formatting to extract plain text, then use Named Entity Recognition (NER) to identify street names, intersections, and bounding descriptions [1].
3. **Geocode:** Match extracted text against Richmond's Parcel Mapper data [3] [4].
4. **Join:** Use the parcel GEOID as the primary key to attach Development Mapper statuses (Pipeline, Under Construction, Completed) [3].

## Build Feasibility

A 48-hour neighborhood notifier MVP scoped to specific areas like Church Hill or Jackson Ward is viable, provided the scope is tightly managed. The primary gating risk is the address parsing pipeline. Because locations are described in narrative text (e.g., "bounded by Pear Street...") [1], standard geocoders will fail without an intermediate extraction step. The MVP must focus on a subset of easily parsable addresses first, logging complex bounding-box descriptions for manual triage or Phase 2 development.

## Data Freshness and Trust

Community trust depends on transparency regarding data provenance and freshness. Because the City explicitly cautions that the Development Mapper is "updated periodically" [3], the application must not present this data as real-time. Every alert and map popup must include a visible "last updated" timestamp derived from the ArcGIS REST service metadata [6]. Furthermore, all summaries must provide a direct link back to the official Legistar matter or ArcGIS item to mitigate the risk of misinformation.

## Resident Discovery and Usability

The primary friction point for residents is often discoverability. Even with open portals like the Richmond Interactive Map (RIM) [7] and the Zoning Parcel Mapper [3], users must know exactly what they are looking for. The MVP should invert this model by allowing residents to subscribe to a specific parcel or neighborhood boundary, pushing alerts to them when new Legistar matters intersect their watched zones.

## Address Parsing and Geocoding Strategy

Turning messy narratives into mappable points requires a layered matching strategy. Since Legistar matters contain RTF text like `{\rtf1\ansi\ansicpg1252...}` [1], the system must first sanitize the input. The parsing engine should attempt direct address extraction first. If that fails, it must look for street segments and block heuristics (e.g., "portion of right-of-way known as East Cary Street") [1]. Items that fall below a confidence threshold should be flagged for human review rather than mapped incorrectly.

## Proposal Map

A combined map unifies the static statuses of the Development Mapper [3] with the dynamic, process-oriented updates from Legistar [1]. The map will feature status filters (Pipeline, Under Construction, Completed) and parcel popups that display official file numbers, current statuses (e.g., "Withdrawn") [1], and links to upcoming meetings.

## Housing Investment Dashboard (Seed)

While local compliance data is difficult to automate, national datasets (HUD, NLIHC) can seed a meaningful housing investment dashboard. This Phase 2 initiative would map federal preservation data against Richmond's neighborhood boundaries to highlight areas at risk of losing affordability, requiring no direct access to internal City spreadsheets.

## Compliance Automation Limits

The affordable housing compliance problem cannot be meaningfully addressed in a weekend prototype. Core compliance data—such as rent rolls, developer reporting, and specific unit affordability statuses—is not publicly exposed through the Legistar or ArcGIS APIs reviewed [3] [1]. Automating this workflow requires direct partnership with City housing staff and access to internal systems.

## Equity and Accessibility

Residents in lower-income neighborhoods may face greater barriers to accessing web-based GIS tools. To ensure equitable access, the notifier must support SMS-first workflows. Complex map interfaces like the Development Mapper [3] are valuable for power users, but plain-text SMS alerts summarizing nearby Legistar matters provide a lower-friction entry point for residents with device or digital literacy constraints.

## Hypotheses Validation and Unknowns

Based on the API and GIS data extracted, we can categorize the initial 10 hypotheses to guide immediate development priorities.

| Hypothesis | Status | Evidence & Sources | Next Steps |
| :--- | :--- | :--- | :--- |
| 1. Legistar API enabled with machine-readable addresses | **Needs Reframing** | API is live (`richmondva`), but addresses are embedded in RTF narrative, not structured fields. [1] | Build RTF-to-text parsing and NER pipeline for address extraction. |
| 2. ArcGIS Mappers contain current REST data | **Partially Confirmed** | Development Mapper is public but "updated periodically." Land Use Mapper is "being updated." [3] [4] | Use Development Mapper; add data freshness warnings. Monitor Land Use Mapper for schema changes. |
| 3. Residents learn of proposals informally | **Unverified** | Requires user research; not verifiable via API data. | Conduct resident interviews during MVP testing. |
| 4. Staff spend time manually cross-referencing | **Unverified** | Plausible, but requires staff workflow analysis. | Interview housing compliance staff. |
| 5. Discoverability is the main friction point | **Likely** | Multiple mappers exist [3] [7], but require proactive searching. | Build push-notification MVP to test engagement. |
| 6. LLM summaries are accurate enough | **Unverified** | Depends on LLM performance on Legistar RTF text [1]. | Run sample matters through LLM and audit for hallucinations. |
| 7. National databases can seed a dashboard | **Likely** | Standard practice, though not directly tested in this API pull. | Scope Phase 2 data inventory for HUD/NLIHC. |
| 8. 48-hour neighborhood MVP is feasible | **Likely** | APIs are accessible [3] [1], gating factor is text parsing. | Time-box address parsing to Day 1; map integration to Day 2. |
| 9. Digital literacy limits Legistar access | **Likely** | Standard civic tech barrier. | Design SMS-first alert options. |
| 10. Compliance automation requires internal data | **Plausible** | No public compliance data found in ArcGIS or Legistar endpoints. | Draft data-sharing MOU with City staff. |

*Table 1: Validation status of the top 10 project hypotheses based on API and GIS endpoint analysis.*

The data reveals that while the infrastructure exists, the unstructured nature of the location data [1] requires a shift from simple API integration to text processing.

## Implementation Timeline and Decision Gates

The project will proceed with a rapid two-day MVP focused on a single neighborhood. 
* **Day 1:** Establish Legistar ingestion and build the RTF parsing/geocoding pipeline. *Gate:* Achieve a 60% successful geocode rate on a sample of 50 recent matters.
* **Day 2:** Integrate ArcGIS Development Mapper statuses [3] and deploy the SMS/email alerting framework. *Gate:* Successfully trigger an alert based on a new Legistar matter.

## Metrics and Feedback Loops

To prove value and iterate, the prototype must track specific performance metrics. Technical metrics will include geocode precision and recall (how many RTF narratives successfully map to a parcel). User metrics will track subscriber growth in the target neighborhoods, alert open rates, and the volume of "Report an issue" tickets generated by users identifying mismatched data between the City's periodic updates [3] and on-the-ground reality.

## References

1. *Fetched web page*. http://webapi.legistar.com/v1/richmondva/matters?$top=1
2. *Fetched web page*. http://webapi.legistar.com/v1/richmondva/events?$top=1
3. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
4. *Richmond, VA - ArcGIS Online*. https://cor.maps.arcgis.com/
5. *The resource cannot be found.*. http://webapi.legistar.com/v1/clients
6. *Status (Service) | ArcGIS REST APIs | Esri Developer*. https://developers.arcgis.com/rest/enterprise-administration/enterprise/service-status/
7. *Richmond Interactive Map - Overview*. https://www.arcgis.com/home/item.html?id=885b2329814741639440d60f9af50488