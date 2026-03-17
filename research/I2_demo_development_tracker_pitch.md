# Richmond Development Notifier — A credible, judge-proof demo plan that centers residents, proves data freshness, and de-risks city partnerships

## Executive Summary
Civic engagement in Richmond's development process often suffers from a critical timing gap: residents discover major neighborhood changes only after the window for meaningful input has closed. Recent developments along the Forest Hill–Semmes corridor highlight this friction. As one resident noted regarding a recent project, "The community is unaware of the rezone... NTMP study is useless if residents are unaware of its existence" [1]. 

This demo script and pitch narrative present a solution: a neighborhood development notifier that bridges the gap between the City's official Legistar system and the residents it impacts. By translating complex zoning ordinances—like the 266-unit Semmes/McDonough Special Use Permit (ORD. 2024-180) [2] —into plain-language, address-based alerts, the tool empowers proactive engagement. Crucially, the platform maintains absolute transparency by pulling directly from the City's Legistar API, displaying exact `MatterLastModifiedUtc` timestamps [3], and routing users directly to official City Council and Planning Commission channels [4]. This approach de-risks the tool for city partnerships by explicitly avoiding outcome prediction and reinforcing the official public record.

## Demo Narrative Architecture

### Timing Guide (60-Second Blocks)
To keep the 3–5 minute pitch tight and impactful, the narrative is structured into specific time-boxed blocks that answer judges' concerns before they are asked:

| Time Block | Focus Area | Key Narrative Goal |
| :--- | :--- | :--- |
| **0:00–1:00** | Resident Story & Problem | Anchor the pain point in Richmond using the Semmes corridor SUP dates and scale. |
| **1:00–2:00** | Live Walkthrough | Demonstrate the address search, list view, plain-language card, and official link. |
| **2:00–3:00** | Map View & Freshness | Show the map view, prove data currency with API timestamps, and state limitations. |
| **3:00–4:00** | Impact & De-escalation | Recap the value of early notice in preventing neighborhood conflicts. |
| **4:00–5:00** | The Ask & Next Steps | Outline the pilot scope and specific partnership requests to the City. |

### Key Phrases to Use and Avoid
Language matters significantly when presenting civic tech to judges and city officials. The framing must build trust and respect official processes.

* **Use:** "From Legistar (official record)", "View official record", "Last updated in Legistar at [time]", "We don't predict outcomes", "Here's how to submit public comment."
* **Avoid:** "Approval odds/probability", "Guaranteed alerts for every change" (instead say "We sync hourly from Legistar"), "Override city process."
* **Core Framing:** "We make it easy to see, in time to act—then we route you to the City's process."

## Full Demo Script and Screen States

**[0:00 - 1:00] The Opening Story**
* **Screen State (Beat 1):** A slide showing a screenshot of a real resident email text ("The community is unaware of the rezone...") next to a complex, dense thumbnail of the Semmes SUP ordinance text.
* **Exact Opening Sentence:** *"In September 2025, a Richmond resident living near the Forest Hill-Semmes corridor wrote to the city in frustration, stating: 'The community is unaware of the rezone... public engagement is needed'"* [1].
* **Script:** "This isn't an isolated incident. When major developments happen—like the recent Special Use Permit for 266 units across 14 parcels on Semmes Avenue and McDonough Street [2] —the timeline moves fast. That project went from introduction to Planning Commission recommendation to final City Council adoption in just about 90 days [2]. If you don't know how to navigate the city's legislative portal, you find out too late. We built the Richmond Development Notifier to change that."

**[1:00 - 2:00] The Tool Walkthrough**
* **Screen State (Beat 2):** A clean address bar with a loading spinner, transitioning to "Found 3 proposals within 0.5 miles."
* **Script:** "Let's look at how it works. A resident simply enters their Richmond address. Instantly, the tool queries nearby development proposals scheduled for the Planning Commission or City Council."
* **Screen State (Beat 3):** A list of proposal cards with titles, unit counts, next hearing dates, and a prominent "From Legistar" badge.
* **Script:** "Instead of dense legal jargon about 'yards, height, and lot coverage' [2], they see a plain-language summary: What is it, where is it, how big is it, and when is the next hearing. But we never replace the official record. Notice this 'From Legistar' badge on every card. With one click on 'View official record,' the user is taken directly to the City Clerk's official file page [5]."

**[2:00 - 3:00] Map View and Data Freshness**
* **Screen State (Beat 4):** A map view showing clustered parcels (like the 14 parcels for the Semmes project), a user address pin, and a distance ring.
* **Script:** "Visualizing the scope is critical. A project might span 6.94 acres across multiple streets [2]. Our map view plots these parcels so neighbors understand the true physical footprint immediately."
* **Screen State (Beat 5):** A tooltip on the proposal card showing `MatterLastModifiedUtc` vs. the tool's last sync time.
* **Script:** "Now, a question we always get from judges and city staff: 'How do you know this data is current?' We answer that with absolute transparency. We pull directly from the Legistar Web API. On every proposal, we display two clocks: 'Last updated in Legistar'—using the exact `MatterLastModifiedUtc` and `EventItemLastModifiedUtc` timestamps from the city's system [6] [3] —and 'Last synced by our tool.' We sync hourly, so you always know exactly how fresh the data is."

**[3:00 - 4:00] Scope Boundaries and Impact**
* **Screen State (Beat 6):** An inline disclaimer ribbon at the bottom of the card, alongside a clear "How to comment" Call-to-Action button.
* **Script:** "It is vital to state what this tool does *not* do. We do not predict outcomes. We do not create or alter official records. And we do not replace public comment. Our sole job is to make the information accessible in time to act, and then route users directly to the City's official submission channels and Land Use Administration processes [7]. Early notice de-escalates conflicts. When neighbors and developers have time to talk before a final hearing, we avoid the breaking points that frustrate everyone."

**[4:00 - 5:00] The Close and Continuation Ask**
* **Screen State (Beat 7):** A final slide with three clear partnership bullets and team contact information.
* **Script:** "To take this from a working prototype to a city-wide resource, we need three things. First, a pilot partnership with the City to ensure our routing aligns with their goals. Second, confirmation from the City Clerk's office on Legistar API rate limits and SLAs so our timestamps remain rock-solid. And third, support from the Planning Department to validate our notification triggers. Thank you. We're ready to help Richmond residents see what's coming, in time to shape it."

## Fallback Narrative and Risk Mitigation

If the live demo breaks due to network issues or Legistar API downtime, the pitch must seamlessly transition to a prepared fallback that preserves credibility.

### The Fallback Plan
* **Pre-loaded Assets:** Have static screenshots of the address search result, the plain-language proposal card (complete with timestamps), and map tiles showing the parcel clusters ready in the presentation deck.
* **Physical Artifacts:** Bring a printed copy of the official Legistar file for ORD. 2024-180, showing the File #, Status, and History [2].
* **Script Adjustment:** "As with any live civic system, portals occasionally go down for maintenance. Right now, we are displaying our cached data from our last hourly sync. If you look at the screen, you'll see our 'Using cached data from [Time]' banner. This is exactly why we built the system to store the last known `MatterLastModifiedUtc` timestamp [3]. Even if the city's API is temporarily unreachable, residents still have access to the most recent plain-language summary and know exactly when it was last verified against this official printed record I have right here."

### Freshness Evidence Fields
To further prove technical competence during Q&A, refer to this exact mapping of API fields used in the tool:

| Field Name | What it Proves | Where it is Shown in the UI |
| :--- | :--- | :--- |
| `MatterLastModifiedUtc` | The exact time the legislative file was last changed [3]. | Proposal card header and detailed view. |
| `EventItemLastModifiedUtc` | The last change to specific meeting agenda items [6]. | The "Upcoming Hearing" section. |
| `MatterAttachmentLastModifiedUtc` | The last update to attached documents or plans [8]. | The "Attachments & Plans" subsection. |

By relying on these specific endpoints, the tool guarantees that it is a faithful, transparent reflection of the City of Richmond's official legislative data.

## References

1. *I am extremely concerned about the rezoning as proposed ...*. https://rva.gov/sites/default/files/2025-11/Module1_AllEmails_2025.pdf
2. *
	City of Richmond - File #: ORD. 2024-180
*. https://richmondva.legistar.com/LegislationDetail.aspx?ID=6736374&GUID=53E8BB0E-55A6-42D3-B94D-F51C8D159940&Options=&Search&FullText=1
3. *PUT v1/{Client}/Matters/{MatterId}*. https://webapi.legistar.com/Help/Api/PUT-v1-Client-Matters-MatterId
4. *Planning Commission | Richmond*. https://www.rva.gov/planning-development-review/planning-commission
5. *Legistar Tutorial for Council Meetings on Computers - YouTube*. https://www.youtube.com/watch?v=yDljr0RQNQk
6. *POST v1/{Client}/Events/{EventId}/EventItems*. https://webapi.legistar.com/Help/Api/POST-v1-Client-Events-EventId-EventItems
7. *Land Use Administration | Richmond*. https://www.rva.gov/planning-development-review/land-use-administration
8. *POST v1/{Client}/Matters/{MatterId}/Attachments*. https://webapi.legistar.com/Help/Api/POST-v1-Client-Matters-MatterId-Attachments