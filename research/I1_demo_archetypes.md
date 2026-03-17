# Winning Civic Demos: Richmond-anchored archetypes that signal real impact, trusted data, and post-hackathon viability

## Executive Summary

To win the "Thriving Neighborhoods" track at the Richmond Civic Hackathon, teams must move beyond flashy concepts and prove local impact, feasibility, and execution within a strict 2–3 minute demo window [1]. Judges are looking for solutions that address real Richmond challenges, such as the city's 49-year-old zoning code that restricts development in two-thirds of the city [2]. 

The most successful demos anchor their narrative in a specific neighborhood, like Jackson Ward, and use real city data to prove their concept. By integrating live links to the Richmond Parcel Map, Zoning Map, and EnerGov Online Permit Portal (OPP) [3] [4], teams signal that their tool is a viable prototype rather than a "toy." Furthermore, addressing the "what happens next" question head-on by proposing a 60-day pilot and acknowledging Code for America's warnings about "unsustainable apps" [5] will separate winning projects from the rest of the pack.

## Why These Archetypes Win With Richmond Judges

### Aligning Demo Beats to Devpost Criteria

The Richmond Civic Hackathon explicitly evaluates projects on Impact, Innovation, Feasibility, Execution, and Collaboration [1]. Judges weigh local impact and feasibility heavily; they want to see if the City or community could realistically pilot the solution [1]. Over-indexing on novelty at the expense of feasibility is a common trap. 

| Judging Criterion | What Judges Look For | How to Prove It in a 2-Minute Demo |
| :--- | :--- | :--- |
| **Impact** | Meaningful address of a real Richmond challenge [1]. | Anchor the story in the current Code Refresh effort or eviction disparities in specific ZIP codes [6] [2]. |
| **Feasibility** | Realistic potential for a City or community pilot [1]. | Live-click into the EnerGov OPP or Richmond ArcGIS maps to show integration pathways [3] [4]. |
| **Execution** | Quality of the prototype and presentation clarity [1]. | Use a structured narrative ("resident shut out" or "staff workflow") with clear UI and no mocked data. |
| **Innovation** | Creative or unique approach [1]. | Combine disparate data (e.g., zoning parcels + eviction filings) to reveal new insights. |

*Takeaway: A rehearsed demo that hits these specific proof points using real Richmond infrastructure will score significantly higher on Feasibility and Execution than a polished but disconnected app.*

## Richmond Context You Must Weave In

### Leveraging Code Refresh and Neighborhood Equity

To make the demo resonate, it must reflect Richmond's current policy landscape. The city's population has grown by over 18% in the last 30 years, outpacing affordable housing, while the zoning code has remained stagnant since 1976 [2]. The ongoing "Code Refresh" aims to legalize "middle housing" like duplexes and accessory dwelling units (ADUs) by-right [2]. 

Grounding your demo in Jackson Ward (Gilpin Court) provides powerful historical and equity context. The neighborhood was bisected by the construction of the Richmond-Petersburg Turnpike, displacing its majority Black population [7]. Overlaying this history with current data—such as the Eviction Lab's tracking of eviction filings across Richmond's 36 ZIP codes [6] —demonstrates a deep understanding of the "Thriving Neighborhoods" mandate.

## Archetype 1 — Development Discovery: "The Resident Who Was Shut Out"

### Revealing By-Right Options Under New Zoning

This narrative arc spotlights the discovery gaps created by legacy rules and shows how your tool empowers residents to navigate the proposed Code Refresh changes [2]. It turns policy abstractions into tangible choices for a single property owner.

**Opening Sentence Templates:**
* "Meet Tasha, a homeowner in Jackson Ward; last year, a by-right path to add a home was invisible to her."
* "On this Jackson Ward parcel, the rules on paper versus what’s actually allowed don’t match—until now."

**Minute-by-Minute Screen Guide:**
* **0:00–0:20 (Problem Frame):** Show the map focused on a specific parcel in Jackson Ward. Display current zoning restrictions and overlay eviction filings by ZIP code to establish the equity stakes [6].
* **0:20–0:45 (Discovery):** The tool identifies viable by-right options (e.g., a duplex or ADU) under the proposed Code Refresh [2]. Show physical constraints and setbacks.
* **0:45–1:10 (Verification):** Live-click from your app to the official Richmond Zoning Map [4] and back. Point out the "Source, Last Updated, Coverage" labels on your UI.
* **1:10–1:35 (Next Steps):** Live-search the EnerGov OPP for required permits and inspections [3]. Show the user exactly what they need to do next, with a deep-link button to the portal.
* **1:35–1:55 (Impact):** Zoom out to show estimated units unlocked on similar parcels across the ZIP code.
* **1:55–2:10 (Close):** Deliver the continuation ask (detailed in the Closing section).

## Archetype 2 — Housing Compliance: "Staff Workflow Before → After"

### Proving Time Savings Through Unified Case Views

For compliance and transparency tools, a "before and after" narrative reduces cognitive load for judges and proves immediate operational value. Currently, the public can search permits and inspections without a login via the OPP [3], but staff often navigate multiple systems to build a complete picture of a property.

**Opening Sentence Templates:**
* "Here’s how a code case in Jackson Ward takes 7 clicks today—and 2 clicks with our tool."
* "Before: parcel lookup, then PDFs, then status calls. After: a unified case view pulling OPP and parcel data into one screen."

**Minute-by-Minute Screen Guide:**
* **0:00–0:25 (Before):** Show the current fragmented process. Look up a parcel on the Richmond Parcel Map [4], toggle to the Zoning Map, and simulate manual note-taking.
* **0:25–0:50 (Before):** Navigate to the OPP permit/inspection search [3]. Illustrate the ambiguity of tracking status across multiple disconnected records.
* **0:50–1:20 (After):** Reveal the unified case view. Show parcel context, permits, inspections, and violations in one dashboard. Highlight automated status badges and a next-action generator.
* **1:20–1:40 (Feasibility Check):** Live-click into the exact EnerGov record to prove the data is real and the integration is plausible [3].
* **1:40–2:00 (Equity Lens):** Apply a ZIP-level eviction overlay [6] to show how staff could triage proactive outreach to vulnerable properties.

## Make It Feel "Real," Not a Toy

### Building Credibility Through Data Provenance

Judges quickly dismiss apps that rely on mocked data or lack clear sourcing. To build immediate credibility, adhere to open data best practices. The Sunlight Foundation's Open Data Policy Guidelines recommend providing a common metadata scheme and clear citation forms [8]. Similarly, Socrata best practices emphasize the importance of data dictionaries, last-updated timestamps, and controlled vocabularies [9].

**Trust Signals to Include On-Screen:**
* **Source Labels:** Every data visualization must have a visible "Source" label with a clickable URL back to the Richmond Open Data Portal or GeoHub [10] [11].
* **Timestamps:** Include "Last Updated" and "Coverage" notes to assure data practices, aligning with Open Data Institute (ODI) guidance on trustworthiness [12].
* **Assumptions & Gaps Panel:** If you must use proxy data (e.g., using the Vacant Building List because a specific code violations API is unavailable), explicitly state this in a top-right disclaimer panel. Watermark any mocked data as "Demo Data."

## Closing the Demo & Post-Hackathon Sustainability

### Addressing the "What Happens Next?" Question

Code for America has explicitly noted the challenge of "unsustainable apps" that run as parallel experiments but fail to serve their intended functions long-term [5]. To win, your demo must close with a concrete, realistic continuation plan rather than vague aspirations.

**The Credible Continuation Ask:**
End your presentation by proposing a 60-day read-only pilot with the Department of Planning & Development Review (PDR). 

| Sustainability Element | What to Show on Your Final Slide |
| :--- | :--- |
| **The Ask** | "We are seeking a 60-day read-only pilot with PDR to test this workflow." |
| **Integration Path** | Highlight that the tool relies on public OPP/ArcGIS links, requiring zero IT integration from the City [3] [4]. |
| **Governance** | Name a specific project maintainer, provide the public GitHub repo URL, and state the open-source license. |
| **Decision Gate** | Define success metrics for the pilot (e.g., "Reduce median staff clicks by 40%" or "Identify 50 viable ADU parcels"). |

*Takeaway: By presenting a lightweight Memorandum of Understanding (MOU) concept and a clear governance structure, you directly answer the judges' feasibility concerns and prove your team is thinking beyond the weekend.*

## References

1. *Richmond Civic Hackathon: Richmond's best hustlers, hackers, and artists solving the city's toughest challenges. - Devpost*. https://hack-for-rva.devpost.com/?ref_feature=challenge&ref_medium=discover
2. *Richmond’s Code Refresh aims to rewrite rules that restrict growth*. https://www.vpm.org/news/2025-09-18/richmond-zoning-code-refresh-update-housing-development-vonck-robertson
3. *Online Permit Portal | Richmond*. https://www.rva.gov/planning-development-review/online-permit-portal
4. *Richmond, VA - ArcGIS Online*. https://cor.maps.arcgis.com/
5. *An Open Letter to the Code for America Brigades — Code for America*. https://codeforamerica.org/news/an-open-letter-to-the-code-for-america-brigades/
6. *Richmond, Virginia | Eviction Tracking System*. https://evictionlab.org/eviction-tracking/richmond-va/
7. *A Guide for Growth*. https://rva.gov/sites/default/files/2025-03/R300_Amended_RRHA_lowres_20250321.pdf
8. *  Open Data Policy Guidelines : Sunlight Foundation*. https://sunlightfoundation.com/opendataguidelines
9. *Best Practices for Metadata Management – Data & Insights Client Center*. https://support.socrata.com/hc/en-us/articles/115008609707-Best-Practices-for-Metadata-Management
10. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
11. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/
12. *Assuring data practices | The ODI - Open Data Institute (ODI)*. https://theodi.org/what-we-do/consultancy-and-products/assuring-data-practices