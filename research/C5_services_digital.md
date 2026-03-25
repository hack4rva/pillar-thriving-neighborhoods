
# From Fragments to Flow: Unifying Richmond's Digital Planning Tools

## Executive Summary

Richmond's digital planning information is accurate but highly fragmented across multiple platforms, requiring users to piece together data from the Online Permit Portal (OPP), the Richmond GeoHub, and the Legistar legislative calendar. While the city has made significant strides—such as transitioning to a new Site Plan ordinance and launching the OPP for digital submissions—residents and developers still lack a unified, location-first view of development activity. 

Crucially, there is no proactive notification system for planning and zoning changes; the city's existing alert system is strictly for emergencies. To bridge the gap between what the city provides and what users actually need, a hackathon prototype should avoid modifying the city's backend systems. Instead, it should build *alongside* the OPP and build *on* the open endpoints of GeoHub and Legistar to create an address-based aggregator and geo-subscription service.

## Current Tool Inventory: What Exists Today

The city offers a robust but disjointed toolkit across EnerGov, ArcGIS Hub, and Legistar. Each system solves a specific slice of the user journey but operates in a silo.

### OPP (EnerGov): 7 plan types live with documented address search quirks
The Online Permit Portal (OPP) serves as the city's primary system of record for development applications. Customers can currently apply for seven specific plan types: Building, Electrical, Mechanical, Gas Piping (residential), Plumbing (residential), Certificate of Zoning Compliance, and Site Plan [1]. The portal allows users to pay invoices, print permits, and schedule inspections [1]. Importantly, public search is available without an account, allowing users to search for properties using map or search options to view projects [1]. However, the system has known findability pitfalls: the official FAQ explicitly warns users not to use punctuation or spell out street types, and notes a specific bug where searching single-digit addresses (e.g., "1 W Broad") fails entirely [1]. 

### GeoHub mapping: "Plans of Development" dataset and spatial layers
Richmond's GeoHub (ArcGIS Hub) provides public access to spatial data. It hosts planning-relevant datasets, including a specific "Plans of Development" layer [2]. While the GeoHub provides the necessary spatial infrastructure for mapping development activity, the metadata regarding update frequencies and data limitations is not consistently surfaced to the end user, making it difficult to determine how closely the map aligns with real-time OPP filings.

### Planning website organization: ORD. 2024-314 Site Plan transition and PDF forms
The Department of Planning and Development Review (PDR) website acts as a central directory, routing users to various external portals. It organizes information by boards and commissions, zoning, GIS mapping, and applications [3]. A critical recent update is the implementation of a new Site Plan ordinance (ORD. 2024-314), which officially replaces the legacy Plan of Development (POD) process to reduce bureaucratic inefficiencies [4]. Despite the push toward the OPP, several key processes still rely on static documents; for example, the site links to 2025 PDF application forms for Special Use Permits (SUP) and Rezonings [4]. 

### Legistar calendar: Agendas and minutes lack geo-subscription capabilities
Case narratives, public hearings, and Planning Commission activities live in the Legistar system [5]. Users are directed to Legistar to view agendas, minutes, and meeting details [5]. While the system supports iCalendar exports and RSS feeds (via a "Mode=Next Month" parameter) [6] [7], it lacks any native capability for users to subscribe to updates based on geography, neighborhood, or specific project addresses.

## User Journeys and Gaps

The largest pain points for residents and developers stem from discovery, proactive awareness, and terminology shifts.

### "What's happening near me?" is not answered in one place
Currently, a resident curious about a construction site down the street must check the OPP map for permits [1], search GeoHub for spatial context [2], and dig through Legistar agendas to see if the Planning Commission is reviewing a rezoning request [5]. There is no single pane of glass that aggregates this information by address or neighborhood.

### Notification blind spot: No planning push alerts exist today
Richmond has a robust emergency notification system called Richmond Ready Alerts (powered by Everbridge), which pushes alerts for severe weather, utility outages, and active threats [8]. However, there is absolutely no equivalent subscription system for development notifications, zoning changes, or permit filings. Residents must passively monitor websites to stay informed.

### Terminology translation: POD history vs. Site Plan present
Because the city recently replaced the Plan of Development (POD) process with the new Site Plan process [4], historical data and new data use different terminologies. Users searching for recent activity might miss older POD records if search tools do not normalize or link these two terms.

## Build vs. Extend: Hackathon Prototype Strategy

A hackathon team should build *alongside* (not inside) city systems, utilizing open endpoints to aggregate data and provide proactive notifications.

| Tool | Public Endpoints? | Integration Risk | Recommended Approach |
| :--- | :--- | :--- | :--- |
| **OPP (EnerGov)** | Public search available; API status undocumented | High (Backend modifications risky) | **Build alongside**: Proxy searches to OPP; build address normalizer to bypass search bugs. |
| **GeoHub** | Yes (ArcGIS REST) | Low | **Build on**: Ingest spatial layers (zoning, parcels) as basemaps. |
| **Legistar** | Yes (RSS, iCal) | Low | **Build on**: Parse RSS/HTML feeds to extract agenda items and map them to addresses. |
| **PDR Website** | No (Static HTML/PDFs) | Low | **Build alongside**: Link out to canonical PDFs; do not duplicate static content. |

*Takeaway: The lowest-risk, highest-value approach is to use GeoHub and Legistar as data feeds while treating the OPP as a destination to link users toward for official status.*

### Prototype 1: Development Activity Explorer
Create an address-first map interface that overlays OPP case statuses on GeoHub basemaps, while pulling in upcoming Legistar agenda items. This provides a single pane of glass for residents, reducing the friction of checking three separate city portals.

### Prototype 2: Geo-subscriptions
Develop an email/SMS alert system where users can drop a pin, set a radius, and receive proactive notifications when new OPP filings or Legistar agenda items appear within their zone. This directly solves the "notification blind spot."

### Prototype 3: Case timeline and plain-language briefs
Build a tool that translates complex planning jargon (e.g., bridging the POD to Site Plan terminology gap) and extracts key deadlines and contacts from the city's static PDF forms, presenting them in a simple timeline.

## Risks, Open Questions, and Validation Plan

To ensure the prototype is viable, the team must de-risk data access and governance early in the development cycle.

### Details to confirm
* **OPP API Access**: It is undocumented if the EnerGov OPP offers a public API or if data must be scraped via HTML automation. Rate limits are also unverified.
* **GeoHub Cadence**: The exact update frequency for planning layers (like Plans of Development) is not clearly documented.
* **State vs. Local**: It is unclear how comprehensively the "Virginia Permit Transparency" portal [9] covers Richmond's local permits compared to the OPP.

### Validation steps and contacts
The team should execute a technical discovery sprint to sample ArcGIS REST endpoints, parse Legistar RSS feeds, and test OPP search automation. Outreach should be conducted to `CSSHelp@richmondgov.com` (for OPP technical queries) and `PDRLandUseAdmin@rva.gov` (for planning process clarifications) [1] [5].

## Recommendations and Next Steps

Start with a lightweight aggregator using GeoHub and Legistar feeds, then layer in OPP search capabilities.

| Strategy | Action Items |
| :--- | :--- |
| **Build On** | Utilize GeoHub REST endpoints for stable, open mapping data. Consume Legistar ICS/RSS feeds for meeting agendas. |
| **Build Alongside** | Use deep links to the OPP for permit status rather than trying to replicate the EnerGov database. Link directly to PDR website PDFs rather than hosting outdated copies. |

### 90-Day Roadmap
* **Weeks 1-2 (Discovery)**: Validate data access paths (ArcGIS REST, Legistar parsing, OPP search scraping).
* **Weeks 3-6 (MVP Explorer)**: Build the unified map interface combining GeoHub layers and Legistar agenda items.
* **Weeks 7-10 (Notifications)**: Implement the geo-subscription service for email/SMS alerts.
* **Weeks 11-13 (Pilot)**: Launch beta testing with neighborhood associations; track metrics like percentage of addresses subscribed and reduction in 311 inquiries.

## Appendices

### Appendix A: Facts and URLs

| Fact | Source URL |
| :--- | :--- |
| OPP accepts 7 plan types (Building, Electrical, Mechanical, Gas Piping, Plumbing, Cert of Zoning, Site Plan). | `https://www.rva.gov/planning-development-review/online-permit-portal` |
| OPP public search fails on single-digit addresses (e.g., "1 W Broad"). | `https://www.rva.gov/planning-development-review/online-permit-portal` |
| Site Plan ordinance (ORD. 2024-314) replaced the Plan of Development (POD) process. | `https://www.rva.gov/planning-development-review/site-plan` |
| GeoHub hosts a "Plans of Development" dataset. | `https://richmond-geo-hub-cor.hub.arcgis.com/datasets/plans-of-development-3` |
| Richmond Ready Alerts (Everbridge) is for emergencies, not development. | `https://rva.gov/richmondreadyalerts` |
| Legistar hosts Planning Commission agendas and offers RSS/iCal exports. | `https://richmondva.legistar.com/` |

### Appendix B: Inferences

| Inference | Rationale |
| :--- | :--- |
| **Address normalization is required.** | Because the OPP explicitly fails on certain address formats and punctuation [1], any third-party search tool must clean and format user input before querying the city database. |
| **Legacy "Permits Web Inquiry" is deprecated.** | The PDR site states the "best way to check the status of a permit is through the city's Online Permit Portal" [10], indicating legacy tools should be avoided for new builds. |
| **Users are confused by terminology.** | The recent shift from POD to Site Plan [4] means historical data and new data use different names, requiring a translation layer for public understanding. |

### Appendix C: Open Questions

| Open Question | Resolution Method |
| :--- | :--- |
| OPP API availability and rate limits. | Technical spike to inspect network traffic on `energov.richmondgov.com`; email `CSSHelp@richmondgov.com`. |
| GeoHub layer update frequency. | Inspect ArcGIS REST metadata endpoints for "last edited" timestamps. |
| Legistar item-to-parcel matching. | Analyze RSS feed payloads to see if standardized address fields or parcel IDs are included in agenda item descriptions. |

## References

1. *Online Permit Portal | Richmond*. https://www.rva.gov/planning-development-review/online-permit-portal
2. *Plans of Development | Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/plans-of-development-3
3. *PDR Home Page | Richmond*. https://www.rva.gov/planning-development-review/pdr-home-page
4. *Site Plan | Richmond*. https://www.rva.gov/planning-development-review/site-plan
5. *Planning Commission | Richmond*. https://www.rva.gov/planning-development-review/planning-commission
6. *City of Richmond - Calendar*. https://richmondva.legistar.com/
7. *City of Richmond - Calendar*. https://richmondva.legistar.com/Calendar.aspx?From=RSS&Mode=Next%20Month
8. *Richmond Ready Alerts | Richmond*. https://rva.gov/richmondreadyalerts
9. *Search Applications - Virginia Permit Transparency*. https://permits.virginia.gov/Permit/Search
10. *Permits and Inspections | Richmond*. https://www.rva.gov/planning-development-review/permits-and-inspections