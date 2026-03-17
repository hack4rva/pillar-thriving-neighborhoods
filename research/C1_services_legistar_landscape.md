# Richmond Legistar, Unlocked: Fast-Track Access for Development Data

## Executive Summary

Richmond's Legistar system is the definitive source for development-related legislative records, and its API is publicly readable without authentication using the client slug `richmondva` [1]. For hackathon teams building civic tech, this means immediate access to a wealth of data. However, development actions are not neatly categorized into a single "Rezoning" bucket; they are dispersed across general "Ordinances" and specific board types [2]. Furthermore, critical project-level details (like exact addresses and site plans) are often locked inside PDF attachments rather than structured API fields [1] [3]. 

To succeed, developers must prioritize file harvesting, implement robust pagination to handle the API's 1000-record cap [4], and account for publication latency, as the API only returns items marked as public [4] [5]. This guide provides the roadmap to navigate these quirks and extract actionable development data within the first few hours of building.

## What's in Richmond's Legistar: Mapping Development Questions to Record Types

Understanding how Richmond categorizes development actions is the first hurdle. You will not find a dedicated "Rezoning" or "Special Use Permit" matter type. Instead, these major land-use decisions are routed as general Ordinances, while design and variance approvals go through specific boards [1] [2].

| Development Category | Legistar MatterType | Primary Body | Example Title Patterns | Where Details Live |
| :--- | :--- | :--- | :--- | :--- |
| **Rezonings & SUPs** | Ordinance (ID: 53) | City Council | "To rezone...", "To authorize a special use..." | Attachments (Staff Report, Location Map) |
| **Variances** | Board of Zoning Appeals Case (ID: 90) | Board of Zoning Appeals | Varies by docket | Attachments |
| **Design/Historic Approvals** | Application for a Certificate of Appropriateness (ID: 72) | Commission of Architectural Review | Varies by application | Attachments |
| **Public Right-of-Way** | Encroachment (ID: 68) | City Council / Planning | "To close to public use..." | Title text and Attachments |
| **Subdivisions** | Tentative Subdivision (ID: 70) | Planning Commission | Varies by application | Attachments |
| **City Planning** | City Planning Commission Resolution (ID: 71) | Planning Commission | Varies by resolution | Attachments |

*Key Takeaway:* To find rezonings and special use permits, you must query for Ordinances and filter by title keywords or routing history, rather than relying solely on the `MatterType` field [1] [2].

## How Records are Structured: Matters, Bodies, Events, Histories, Attachments

The Legistar data model is relational, centering on "Matters" (the legislative items) which are acted upon by "Bodies" during "Events" (meetings). 

| Core Entity | Key API Fields | Why it Matters for Development Tracking |
| :--- | :--- | :--- |
| **Matters** | `MatterId`, `MatterTitle`, `MatterTypeName`, `MatterBodyName` | The core record. Contains the descriptive title (often the only place the address is listed) and current status [1]. |
| **Bodies** | `BodyId`, `BodyName` | Identifies who is handling the matter (e.g., Planning Commission, City Council) [6]. |
| **Attachments** | `MatterAttachmentName`, `MatterAttachmentHyperlink` | Holds the actual substance: Staff Reports, Location Maps, and Ordinances in PDF format [3]. |
| **Histories** | `MatterHistoryActionBodyName`, `MatterHistoryPassedFlag` | Tracks the lifecycle of a matter from introduction to final vote [4]. |
| **Events** | `EventDate`, `EventTime` | Meeting schedules where matters are discussed [4]. |

*Key Takeaway:* A single Matter record (like Ordinance 2014-071) will link to a specific Body (City Council) and contain multiple Attachments (Staff Report, Location Map) that must be fetched separately to understand the full scope of the development [1] [3].

## Where to Find Richmond's Records: Portal and API Entry Points

Richmond provides both a human-readable portal and a machine-readable API. Both draw from the same underlying database, but the API is essential for scalable data extraction.

### The Public Portal (Human Search)
* **Calendar:** `http://richmondva.legistar.com/` [7]
* **Legislation Search:** `http://richmondva.legistar.com/Legislation.aspx` [8]

### The Granicus Web API (Developer Path)
* **Base URL:** `https://webapi.legistar.com/v1/richmondva` [1]
* **Documentation:** `http://webapi.legistar.com/Help` [9] and `http://webapi.legistar.com/Home/Examples` [4]

| Endpoint | Purpose | Sample URL |
| :--- | :--- | :--- |
| **Matters** | Fetch legislative items | `/Matters?$top=10&$skip=0` |
| **MatterTypes** | List available record types | `/MatterTypes` |
| **Bodies** | List boards and commissions | `/Bodies` |
| **Attachments** | Get PDFs for a specific matter | `/Matters/{MatterId}/Attachments` |
| **Histories** | Track actions on a matter | `/Matters/{MatterId}/histories` |

*Key Takeaway:* Use the portal to quickly verify your API queries, but rely on the `webapi.legistar.com` endpoints for building your application.

## Developer Quickstart: First 2 Hours to Working Data

Follow these steps to establish a working data pipeline in the first two hours of your hackathon:

1. **Smoke Test:** Verify access by fetching a single matter. 
 * `GET https://webapi.legistar.com/v1/richmondva/Matters?$top=1` [1]
2. **Inventory Types & Bodies:** Pull the reference data to map IDs.
 * `GET https://webapi.legistar.com/v1/richmondva/MatterTypes` [2]
 * `GET https://webapi.legistar.com/v1/richmondva/Bodies` [6]
3. **Find Likely Rezones:** Query Ordinances and filter by title keywords.
 * `GET https://webapi.legistar.com/v1/richmondva/Matters?$filter=substringof('rezone',MatterTitle) eq true and MatterTypeName eq 'Ordinance'&$top=10`
4. **Pull Attachments:** Extract the PDF links for a specific matter.
 * `GET https://webapi.legistar.com/v1/richmondva/Matters/1129/Attachments` [3]
5. **Retrieve Histories:** Track the votes and actions.
 * `GET https://webapi.legistar.com/v1/richmondva/Matters/1129/histories` [4]
6. **Implement Pagination:** Set up `$top` and `$skip` logic, as queries are hard-capped at 1000 responses [4].
7. **Test CORS:** Attempt to fetch API data and PDFs directly from the browser. If blocked, immediately stand up a simple server proxy.
8. **Save a Minimal Dataset:** Cache the JSON responses and download a few PDFs to ensure you have offline data to build UI against.

## Known Limitations and How to Mitigate Them

The Legistar API is powerful but comes with specific operational constraints that can derail a project if ignored.

| Limitation | Evidence / Source | Mitigation Strategy |
| :--- | :--- | :--- |
| **Publication Latency** | Auto-sync runs every 10 mins; PDF conversion takes up to 30 mins. API only returns "public" items [4] [5] [10]. | Do not promise real-time updates. Poll hourly and design UI to handle "awaiting publication" states. |
| **Unstructured Addresses** | `MatterTitle` contains the location (e.g., "portion of right-of-way known as East Cary Street") [1]. No dedicated address field exists. | Implement NLP/regex to parse addresses from titles and attachment PDFs, then cross-walk to a GIS service. |
| **1000-Record Cap** | API silently truncates responses at 1000 items [4]. | Always use ODATA `$top` and `$skip` parameters. For large syncs, paginate by ID using a Greater Than (GT) filter [4]. |
| **Authentication** | Richmond allows public read access without a token [1], but docs note some clients require them [4]. | Build your API client to optionally accept a token parameter just in case policies change. |

*Key Takeaway:* Treat the API as an eventually-consistent data source and invest early in text extraction tools to pull structured locations out of unstructured titles and PDFs.

## Patterns in Richmond's Process: From CPC to Council

Development records don't exist in a vacuum; they move through a predictable pipeline. You can reconstruct this lifecycle using the `Bodies` and `Histories` endpoints.

| Body | Typical Role in Development | Signals to Watch |
| :--- | :--- | :--- |
| **Planning Commission (ID: 154)** | Initial review and recommendation [11]. | Look for "recommended approval" in histories to predict upcoming Council agendas. |
| **Land Use, Housing & Transportation (ID: 178)** | Committee review [12]. | Acts as a gatekeeper before formal Council votes. |
| **City Council (ID: 138)** | Final enactment of Ordinances (Rezones, SUPs) [6]. | Final "Passed" or "Withdrawn" status [1]. |
| **Board of Zoning Appeals (ID: 206)** | Handles variances independently [13]. | Final decisions on BZA Cases. |

## Inferences and Open Questions to Confirm Before Building

**Inferences (Clearly Labeled):**
* *Inference:* Because Rezoning and Special Use Permits lack dedicated `MatterTypes`, they must be identified by searching for "Ordinance" types routed through the Planning Commission or City Council with specific title keywords.
* *Inference:* Annexations and housing funding approvals will similarly appear as general Ordinances and require keyword detection.

**Unknowns That Must Be Confirmed:**
* **Address Consistency:** Does the format of addresses in `MatterTitle` remain consistent across recent years, or is it highly variable?
* **CORS Policies:** Does `webapi.legistar.com` or `legistar2.granicus.com` (where PDFs are hosted) allow Cross-Origin Resource Sharing (CORS) from local development environments?
* **Rate Limits:** What is the effective rate limit (QPS) before the Granicus API begins throttling requests?
* **Attachment Formats:** Are site plans consistently uploaded as vector PDFs (which can be easily parsed), or are they often scanned images requiring OCR?

## API Reference Cheat Sheet for Richmond

Use these base endpoints appended to `https://webapi.legistar.com/v1/richmondva` to navigate the data [14] [4].

| Endpoint | Sample URL | Notes |
| :--- | :--- | :--- |
| **Matters** | `/Matters?$top=100` | Capped at 1000. Use ODATA filters [4]. |
| **Attachments** | `/Matters/{MatterId}/Attachments` | Returns direct links to PDFs [3]. |
| **Histories** | `/Matters/{MatterId}/Histories` | Shows the routing and votes [14]. |
| **Votes** | `/EventItems/{EventItemId}/Votes` | Requires the EventItem ID from the history [4]. |
| **MatterTypes** | `/MatterTypes` | Reference list of all document types [2]. |
| **Bodies** | `/Bodies` | Reference list of all boards/commissions [6]. |

## Appendix: Source Links and Facts

* **Portal Calendar:** `http://richmondva.legistar.com/` [7]
* **Portal Legislation Search:** `http://richmondva.legistar.com/Legislation.aspx` [8]
* **API Help Docs:** `http://webapi.legistar.com/Help` [9]
* **API Examples & Limits:** `http://webapi.legistar.com/Home/Examples` [4]
* **Publishing Latency:** Auto-sync runs every 10 minutes; PDF conversion takes up to 30 minutes [5] [10].

## References

1. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Matters?$top=1
2. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/MatterTypes
3. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Matters/1129/Attachments
4. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
5. *Agenda Posting Procedures and Publishing Checks | Granicus Support*. https://support.granicus.com/s/article/Agenda-Posting-Procedures-and-Publishing-Checks
6. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Bodies
7. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
8. *City of Richmond - Legislation*. https://richmondva.legistar.com/Legislation.aspx
9. *Legistar Web API Help Page*. https://webapi.legistar.com/Help
10. *Publishing to InSite | Granicus Support*. https://support.granicus.com/s/article/Publishing-to-InSite
11. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Bodies?$filter=substringof('Planning',BodyName)%20eq%20true
12. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Bodies?$filter=substringof('Land%20Use,%20Housing%20and%20Transportation',BodyName)%20eq%20true
13. *Fetched web page*. https://webapi.legistar.com/v1/richmondva/Bodies?$filter=substringof('Zoning',BodyName)%20eq%20true
14. *Legistar Web API | Granicus Support*. https://support.granicus.com/s/article/Legistar-Web-API