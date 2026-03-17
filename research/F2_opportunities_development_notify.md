# Neighborhood Development Notifier for Richmond, CA — Catch comment windows before they close

## Executive Summary
The Neighborhood Development Notifier addresses a critical civic gap in Richmond, California: residents frequently miss the opportunity to weigh in on local development because public comment windows are short and official notices are fragmented across disparate government systems. Under the California Environmental Quality Act (CEQA), public review periods for Negative Declarations (ND) or Mitigated Negative Declarations (MND) typically last 30 days, while Draft Environmental Impact Reports (EIR) require a 45-day review [1]. Furthermore, written comments are only accepted up until the public comment period on the relevant agenda item is closed [2]. 

This opportunity analysis outlines a strategic roadmap for building a proximity-first notification tool. Because the City of Richmond utilizes eSCRIBE for its meeting agendas [3] while Contra Costa County uses Legistar [4], the data pipeline must rely on a hybrid approach of web scraping and API integration. By geocoding these records and presenting them through a hyperlocal, address-based interface with prominent "Days left to comment" countdowns, this tool will empower residents to act before deadlines expire.

## Problem framing — Residents miss short CEQA windows without a single entry point
The core problem this tool solves is the friction of civic discovery. A Richmond resident who wants to know about development near their home currently has to proactively monitor physical postings, navigate the city's eSCRIBE agenda management system [3], or track Contra Costa County's Legistar portal [4]. 

CEQA-driven comment windows are strictly enforced and relatively brief. For example, an ND or MND requires a 30-day public review period [1], though some local guidelines note a 20-day review period if no state agency is involved [5]. Draft EIRs require a 45-day review period [1]. Once these windows close, or once the public comment period on a relevant Planning Commission agenda item concludes [2], resident input is no longer integrated into the official environmental review. The Notifier transforms this passive, fragmented discovery process into an active, location-based alert system.

## Who we're serving and jobs-to-be-done — "Tell me early enough to act"
The target user is a Richmond resident who cares about their immediate neighborhood but lacks the time or expertise to parse municipal zoning agendas. Their primary "job-to-be-done" is to be informed of relevant changes early enough to participate meaningfully.

### Core User Flow
1. **Onboarding & Location Input**: The user arrives at the site and enters their home address.
2. **Hyperlocal Discovery**: The system geocodes the address and displays a map and list of upcoming development items (variances, conditional use authorizations, CEQA notices) within a 0.25 to 0.5-mile radius.
3. **Urgency & Context**: Each item prominently features a "Days left to comment" countdown, calculated from the notice posting or hearing date.
4. **Action**: The user clicks a "How to comment" button, which provides direct links to the official eSCRIBE or Legistar record and instructions for submitting emails to the Planning Commission [2].
5. **Retention**: The user opts into a weekly email digest for future alerts within their geofenced radius.

## Data landscape audit — Richmond CA uses eSCRIBE/SIRE; county uses Legistar
A critical technical reality is that the City of Richmond, CA does not use Legistar for its current city council or planning commission meetings. 

* **City of Richmond**: The city transitioned to the eSCRIBE Agenda Management System in January 2022, archiving older records (2006–2021) in a SIRE system [3]. 
* **Contra Costa County**: County-level bodies, such as the North Richmond Municipal Advisory Council, utilize Legistar [4]. 

This bifurcated landscape means a pure Legistar API pipeline will miss all city-level planning commission data. The architecture must adapt to pull from both sources.

## MVP definition — Minimal data, maximum clarity
The Minimum Viable Product (MVP) must prove that hyperlocal, deadline-driven discovery is possible without over-engineering the backend. 

* **Data Needed**: Upcoming agendas scraped from eSCRIBE, county events from the Contra Costa Legistar API, user address input, and a basic geocoder.
* **Interface**: A clean, mobile-responsive split view featuring a map with project dots and a list view emphasizing expiration dates and hearing dates.
* **Demo-Ready Version**: A successful demo will allow judges to input 1–2 pre-selected Richmond addresses and instantly see at least 3 relevant upcoming items within a 0.5-mile radius. Each item must feature a computed deadline countdown and a working source link to the official city or county page.

## Data pipeline — From agendas to a geofenced, dated list
To deliver proximity-based alerts, the data pipeline must transform unstructured agenda text into geolocated, time-bound records.

1. **Ingestion**: 
 * *eSCRIBE Scraping*: Fetch upcoming meeting agendas from the City of Richmond's portal [3]. Use keyword classification to flag items containing "public hearing," "conditional use," "variance," or "CEQA."
 * *Legistar API*: Pull upcoming matters from the Contra Costa County Legistar instance using OData parameters [4].
2. **Address Extraction & Geocoding**: Parse project addresses from the agenda text and convert them to latitude/longitude coordinates.
3. **Spatial Join**: For the MVP, use a simple radial buffer (e.g., 1,000 feet) around the user's geocoded address. *Future iteration*: Integrate with a GeoHub parcel lookup to match exact parcel boundaries.
4. **Display**: Render the matched items on the frontend, calculating the days remaining based on the 30-to-45-day CEQA windows [1] or the scheduled hearing date.

## Key technical decision — API vs. scraped vs. pre-seeded data
Because the data landscape is fragmented, the technical architecture requires a hybrid approach.

| Data Strategy | Pros | Cons | Decision for MVP |
| :--- | :--- | :--- | :--- |
| **Legistar API** | Structured, linkable, supports OData filtering. | Only covers Contra Costa County [4], missing Richmond city data. | Implement for county-level data to demonstrate API integration capabilities. |
| **eSCRIBE Scraping** | Captures the actual City of Richmond Planning Commission and Council data [3]. | Fragile to markup changes; requires robust error handling. | Primary engine for city data; essential for a functional Richmond-focused tool. |
| **Pre-seeded Data** | Guarantees a fast, reliable, and crash-proof demo experience. | Not scalable; risks appearing inauthentic if not labeled properly. | Use as a fallback cache for the demo, clearly labeled as "Sample Data" if live scraping fails. |

**Takeaway**: The MVP must utilize a hybrid of eSCRIBE scraping and Legistar API calls to provide comprehensive coverage, backed by a pre-seeded cache to ensure demo stability.

## Credibility and trust — Provenance, freshness, disclaimers
Civic tools live or die on user trust. If a resident misses a deadline because the tool displayed outdated information, credibility is permanently lost. 

To build trust, every project card must include a direct "Source" link back to the official eSCRIBE or Legistar record. The UI must display a "Last fetched" timestamp to indicate data freshness. Finally, the site must feature a plain-language disclaimer stating that it is an unofficial discovery assistant and that the City of Richmond's official postings remain the definitive source for legal deadlines.

## Risks and mitigations — Data gaps, staleness, scope creep
Several risks threaten the viability of this tool, requiring proactive mitigation strategies.

* **Incomplete Data**: Because Richmond CA does not use Legistar [3], relying solely on APIs will result in an empty tool. *Mitigation*: Invest heavily in the eSCRIBE scraper and clearly communicate the tool's current coverage limits to users.
* **Stale Records**: Agenda items can be updated or pulled at the last minute. *Mitigation*: Run daily data pulls, display fetch timestamps prominently, and include a server-side "Refresh Now" capability.
* **Overpromising Notifications**: Real-time push alerts are technically complex and prone to false positives. *Mitigation*: Scope the MVP to discovery and weekly email digests rather than instant SMS alerts.
* **Jurisdiction Confusion**: Many open-source GIS and Legistar assets labeled "Richmond" actually belong to Richmond, Virginia. *Mitigation*: Hard-code "Richmond, California" into all geocoding queries and implement domain allowlists (e.g., `ci.richmond.ca.us`) to prevent cross-contamination.

## Competitive landscape — Hyperlocal gap vs existing tools
While several civic tech tools exist, none perfectly address the hyperlocal, deadline-driven needs of a Richmond, CA resident.

| Tool | Core Focus | Strengths | Limitations for this Use Case |
| :--- | :--- | :--- | :--- |
| **Councilmatic** | Open-source legislative tracking [6]. | Excellent for tracking bills, committees, and council members [6]. | Focuses on citywide legislation rather than parcel-proximity or CEQA deadlines. |
| **SF Permits in My Neighborhood** | Map-based permit tracking for San Francisco [7]. | Places dots at parcel centers; offers email alerts; updates daily [7]. | Geofenced strictly to San Francisco; not deployable for Richmond. |
| **SF Public Notices** | Tabular list of project applications [8]. | Explicitly lists "Date of Posting," "Expiration Date," and "Hearing Date" [8]. | Requires manual sorting; lacks a personalized, address-centric push mechanism. |
| **Neighborhood Notifier (Proposed)** | Hyperlocal development alerts for Richmond, CA. | Combines address-proximity with explicit "Days left to comment" urgency. | Requires maintaining custom scrapers for eSCRIBE. |

**Takeaway**: The Notifier differentiates itself by combining the hyperlocal map interface of SF's tools with explicit countdown timers for CEQA and hearing deadlines, specifically tailored for Richmond's data ecosystem.

## Scoring to rubric — Clarity, scope, impact, accessibility
To ensure high marks from judges, the prototype must explicitly align with evaluation rubrics:

* **Clarity**: The value proposition must be obvious within 5 seconds. The use of plain language and prominent "Days left" counters achieves this.
* **Scope**: The MVP constraints (e.g., 0.5-mile radius, hybrid scraping/API) demonstrate a realistic, achievable technical roadmap.
* **Impact**: Success is highly measurable. The tool will track click-through rates to official eSCRIBE/Legistar pages and the volume of digest emails sent.
* **Accessibility**: The interface must be mobile-first, as many residents do not use desktop computers for community news. It must support keyboard navigation, high-contrast text, and provide clear instructions for submitting comments via phone or email, aligning with the Planning Commission's procedural rules [2].

## References

1. *Quick Guide to Public Noticing and Filing Requirements ...*. https://dot.ca.gov/-/media/dot-media/programs/environmental-analysis/documents/ser/quick-guide-public-notice-requirements-a11y.pdf
2. *RICHMOND PLANNING COMMISSION PROCEDURAL RULES*. https://www.ci.richmond.ca.us/Archive.aspx?ADID=12519
3. *Council Agenda Documents | Richmond, CA - Official Website*. https://www.ci.richmond.ca.us/151/Council-Agenda-Documents
4. *
	CONTRA COSTA COUNTY - Meeting Calendar
*. https://contra-costa.legistar.com/
5. *CITY OF RICHMOND GUIDELINES AND PROCEDURES FOR ...*. https://www.ci.richmond.ca.us/DocumentView.aspx?DID=307
6. *New York City Councilmatic | DataMade*. https://datamade.us/our-work/councilmatic/nyc-council-councilmatic/
7. *Permits in My Neighborhood | SF Planning*. https://sfplanning.org/resource/permits-my-neighborhood
8. *Public Notices for Project Applications | SF Planning*. https://sfplanning.org/page/public-notices-project-applications