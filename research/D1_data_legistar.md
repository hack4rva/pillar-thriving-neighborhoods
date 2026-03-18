---
title: "Richmond Legistar Data — Fast, Reliable Access for Dev-focused Hackathon Apps"
pillar: thriving-neighborhoods
section: D
problem_statement: development-discovery
tags:
  - Legistar
  - Granicus
  - API
  - OData
  - planning data
  - data access
summary: "Provides a technical inventory of the Legistar Web API as deployed by Richmond, including endpoint patterns, OData filtering, pagination constraints, and known data quality issues with addresses and attachments."
key_entities:
  - Legistar
  - Granicus
  - Planning Commission
  - Board of Zoning Appeals
datasets:
  - Legistar Web API
  - Richmond Legistar InSite portal
geography: Richmond, VA
source: parallel-ai
status: raw
related_reports:
  - D2_data_gis_development
  - D5_data_quality
  - F2_opportunities_development_notify
---

# Richmond Legistar Data — Fast, Reliable Access for Dev-focused Hackathon Apps

## Executive Summary
Richmond utilizes a standard Granicus/Legistar platform for its legislative and meeting data, accessible publicly at `https://richmondva.legistar.com/`. For hackathon developers building civic tech or real estate applications, this means you can leverage the well-documented Legistar Web API to extract development-related records like rezonings, special use permits, and variances. 

The API follows a predictable RESTful pattern (`https://webapi.legistar.com/v1/{Client}/`) and supports OData filtering, which is critical because queries are strictly capped at 1,000 responses. While the data structure is robust, developers must navigate specific data quality hurdles: addresses are not stored in dedicated fields and must be parsed from text, attachments are gated by visibility flags, and the exact API client slug for Richmond requires immediate testing during the hackathon's first hour. This inventory provides the exact endpoints, field mappings, and quick-start strategies needed to bypass these hurdles and start building immediately.

## 1) Richmond's Legistar Footprint

Richmond's legislative data is hosted on a standard Granicus InSite portal located at `https://richmondva.legistar.com/` [1]. Because it uses the standard Granicus architecture, developers can reuse common Legistar API patterns rather than scraping HTML. 

The portal actively publishes data from key development-related bodies, including the Planning Commission and the Board of Zoning Appeals [1] [2]. The legislation search interface reveals that Richmond uses specific, localized matter types such as "Application for a Certificate of Appropriateness," "Board of Zoning Appeals Case," and "City Planning Commission Resolution" [3]. This confirms that development and land-use data is actively tracked and categorized within the system, making it highly suitable for hackathon projects focused on housing, zoning, and urban development.

## 2) API Fundamentals

The Legistar Web API exposes legislative data directly over HTTPS [4]. It is a uniform, REST-like interface that allows developers to retrieve records using standard GET requests.

### Base URL and Authentication
The base URL pattern for all API calls is `https://webapi.legistar.com/v1/{Client}/` [5]. 
* **Public Access:** GET requests generally return items marked as public and visible on the InSite portal [6]. Both HTTP and HTTPS are supported [5].
* **Token Requirements:** Some clients require API tokens for access. If a read-only request returns an unauthorized response, a token must be appended as a URL parameter (e.g., `?token=verylongbase64token`) [5].

### Pagination and OData Requirements
A critical constraint of the Legistar API is that query replies are limited to 1,000 responses [6] [5]. To build performant applications and avoid missing data, developers must use OData parameters to page outputs and filter results [5].

| OData Parameter | Purpose | Example Usage |
| :--- | :--- | :--- |
| `$top` | Limits the number of returned items | `?$top=10` |
| `$skip` | Skips a specified number of items for pagination | `?$skip=10` |
| `$filter` | Filters results based on field values | `?$filter=EventDate ge datetime'2014-09-01'` |

*Takeaway:* Always implement `$top` and `$skip` in your data ingestion scripts to handle the 1,000-record limit gracefully. For busy sites, Granicus recommends ordering by item IDs and paging using a greater than (GT) filter on the highest returned ID to prevent missing items [6].

## 3) Core Entities & Fields for Development Workflows

To build a comprehensive view of a development project (what it is, when it is being discussed, where it is located, and the associated documents), developers must join data across several core endpoints.

### Matters (The "What")
Matters represent the actual legislative items (e.g., a rezoning ordinance). 

| Key Field | Data Type | Description |
| :--- | :--- | :--- |
| `MatterId` | integer | Unique identifier for the matter [7]. |
| `MatterTitle` | string | The descriptive title of the legislation [7]. |
| `MatterTypeName` | string | The category of the matter (e.g., Ordinance, Resolution) [7]. |
| `MatterBodyName` | string | The governing body responsible for the matter [7]. |
| `MatterStatusName` | string | Current status (e.g., Adopted, Continued) [7]. |
| `MatterIntroDate` | date | When the matter was introduced [7]. |

### Events and EventItems (The "When" and "Where")
Events represent meetings, while EventItems represent the specific matters discussed at those meetings.

| Key Field | Data Type | Description |
| :--- | :--- | :--- |
| `EventDate` | date | The date of the meeting [8]. |
| `EventLocation` | string | The physical or virtual location of the meeting [8]. |
| `EventItemMatterId` | integer | Links the agenda item back to the core Matter record [8]. |
| `EventItemMatterType` | string | The type of matter being discussed [8]. |

### Attachments (The "Documents")
Attachments contain the actual PDFs, site plans, and staff reports.

| Key Field | Data Type | Description |
| :--- | :--- | :--- |
| `MatterAttachmentName` | string | The display name of the file [9]. |
| `MatterAttachmentHyperlink` | string | URL to access the document [9]. |
| `MatterAttachmentShowOnInternetPage` | boolean | Flag indicating if the file is public [9]. |
| `MatterAttachmentIsHyperlink` | boolean | Indicates if the attachment is a link rather than a hosted file [9]. |

### Sample API Response Structures

**Sample EventItem JSON Structure:**
```json
{
 "EventItemId": 1,
 "EventItemEventId": 4,
 "EventItemMatterId": 1,
 "EventItemMatterName": "sample string 20",
 "EventItemMatterType": "sample string 21",
 "EventItemMatterStatus": "sample string 22"
}
```
*(Source: [8])*

**Sample Attachment JSON Structure:**
```json
{
 "MatterAttachmentId": 1,
 "MatterAttachmentName": "sample string 4",
 "MatterAttachmentHyperlink": "sample string 5",
 "MatterAttachmentIsHyperlink": true,
 "MatterAttachmentShowOnInternetPage": true
}
```
*(Source: [9])*

## 4) Filtering for Development Items

Because Legistar does not have a universal "development" flag, developers must filter based on Richmond's specific taxonomy. 

Richmond's portal explicitly lists matter types such as "Board of Zoning Appeals Case," "Application for a Certificate of Appropriateness," and "City Planning Commission Resolution" [3]. 

To isolate development records, use OData filters on the `/Matters` endpoint. You can filter by `MatterTypeName` or search for keywords within the `MatterTitle`.

**Recommended OData Filter Strategies:**
* **Exact Type Match:** `?$filter=MatterTypeName eq 'Board of Zoning Appeals Case'`
* **Keyword Search:** `?$filter=substringof('Rezoning', MatterTitle) or substringof('Special Use Permit', MatterTitle)`

*Takeaway:* Start by pulling all `MatterTypes` from `v1/{Client}/MatterTypes` [4] to map out Richmond's exact naming conventions, then build your OData queries accordingly.

## 5) Data Quality and Caveats

Working with Legistar data requires defensive programming to handle several known data quality issues.

### Inconsistent Address Fields
The `Matters` endpoint does not contain a dedicated address field [7]. Addresses for rezonings or special use permits are typically embedded within the `MatterTitle` or the matter text. 
* **Mitigation:** Developers must implement lightweight NLP or Regex to extract street addresses and parcel numbers from the `MatterTitle`. Cross-reference this with `EventLocation` [8] to differentiate between the project site and the meeting venue.

### Attachment Accessibility
Not all attachments are publicly accessible. The API returns a `MatterAttachmentShowOnInternetPage` boolean [9]. 
* **Mitigation:** Always check that `MatterAttachmentShowOnInternetPage` is `true` before attempting to render or download a file. Additionally, check `MatterAttachmentIsHyperlink` to determine if you need to render an external URL or fetch binary file content via the `/File` endpoint [4] [9].

### The 1,000 Record Limit
As noted, queries are strictly limited to 1,000 responses [6]. 
* **Mitigation:** Never rely on a bare `/Matters` call. Always use `$top`, `$skip`, or date-based `$filter` parameters to ensure you are not silently dropping older records [5].

## 6) Facts, Inferences, Unknowns

### Facts
* **Portal URL:** Richmond's public portal is `https://richmondva.legistar.com/` [1].
* **API Base:** The Granicus Web API operates at `https://webapi.legistar.com/v1/{Client}/` [5].
* **Pagination Limit:** Query replies are strictly limited to 1,000 responses [6].
* **OData Support:** The API supports OData parameters (`$top`, `$skip`, `$filter`) for pagination and querying [5].
* **Attachment Visibility:** Attachments utilize a `MatterAttachmentShowOnInternetPage` flag to dictate public visibility [9].

### Inferences (Clearly Labeled)
* *Inference:* The API client slug is likely `richmondva` or `richmond`, mirroring the portal subdomain.
* *Inference:* Because there is no native address field in the `Matters` schema [7], developers will absolutely need to parse addresses from text fields to map development projects.
* *Inference:* Development-related matters will heavily route through the Planning Commission and Board of Zoning Appeals bodies [1] [2].

### Unknowns That Require Testing
* **Exact Client Slug:** The exact `{Client}` string for Richmond must be verified via trial and error.
* **Token Requirement:** It is unknown if Richmond requires an API token for read-only GET requests. This must be tested immediately.
* **Historical Completeness:** The depth of historical data available via the API versus the web portal is unknown.

## 7) Developer Quick-Start (First 2 Hours)

To maximize hackathon time, follow this 4-step sequence in the first two hours to validate access and secure your first payload.

**Step 1: Probe the Client Slug and Auth (Minutes 0-30)**
Test common client slugs to see if the API is open or token-gated.
* Test 1: `curl https://webapi.legistar.com/v1/richmondva/bodies`
* Test 2: `curl https://webapi.legistar.com/v1/richmond/bodies`
* *Outcome:* If you receive a 200 OK, you have your slug. If you receive a 401 Unauthorized, Richmond requires a token [5]. If you receive an XML error stating the connection string is not set up, the slug is incorrect.

**Step 2: Enumerate Matter Types (Minutes 30-60)**
Once authenticated, pull the taxonomy to understand how Richmond categorizes development.
* Action: Fetch `v1/{Client}/MatterTypes` [4].
* *Outcome:* Save this JSON. Identify the exact IDs for "Board of Zoning Appeals Case" and "City Planning Commission Resolution" [3].

**Step 3: Pull Recent Events and Items (Minutes 60-90)**
Fetch meetings from the last 30 days to get live data.
* Action: Fetch `v1/{Client}/events?$filter=EventDate ge datetime'2026-02-15'` [5].
* *Outcome:* Extract `EventItemMatterId` from the `EventItems` array to find active legislation [8].

**Step 4: Fetch Attachments for a Single Matter (Minutes 90-120)**
Test document retrieval for a known `MatterId`.
* Action: Fetch `v1/{Client}/Matters/{MatterId}/Attachments` [4].
* *Outcome:* Verify the `MatterAttachmentShowOnInternetPage` flag and test downloading the file [9].

## 8) Sample API Call Patterns

Use these URL patterns (replace `{Client}` with the discovered slug) to build your data pipelines.

**View All Agenda Matters (Paged):**
```text
https://webapi.legistar.com/v1/{Client}/matters?$top=100&$skip=0
```
*(Source: [5])*

**Filter Events by Date Window:**
```text
https://webapi.legistar.com/v1/{Client}/events?$filter=EventDate ge datetime'2026-01-01' and EventDate lt datetime'2026-03-01'
```
*(Source: [5])*

**View Actions Taken on a Specific Matter:**
```text
https://webapi.legistar.com/v1/{Client}/matters/1234/histories?$filter=MatterHistoryPassedFlag ne null
```
*(Source: [5])*

**Retrieve Attachments for a Matter:**
```text
https://webapi.legistar.com/v1/{Client}/Matters/1234/Attachments
```
*(Source: [4])*

## 9) Outcome & Decision Mapping

To build features that track the lifecycle of a development project, you must map statuses and votes. 
* **Current Status:** Use `MatterStatusName` from the `/Matters` endpoint to show the current state (e.g., In Committee, Adopted) [7].
* **Historical Actions:** Use the `/Matters/{MatterId}/Histories` endpoint to track how a matter moved through different bodies over time [4].
* **Vote Tallies:** To see exact vote counts on a specific action, take the ID returned from the Histories endpoint and query `/EventItems/{EventItemId}/Votes` [5] [4].

## 10) Appendix: Core Endpoint Reference

| Endpoint | Description |
| :--- | :--- |
| `GET v1/{Client}/Matters` | Retrieves legislative items [4]. |
| `GET v1/{Client}/Events` | Retrieves meetings and embedded agenda items [4]. |
| `GET v1/{Client}/Bodies` | Retrieves governing bodies (e.g., Planning Commission) [4]. |
| `GET v1/{Client}/Matters/{MatterId}/Attachments` | Retrieves file metadata and links for a matter [4]. |
| `GET v1/{Client}/Matters/{MatterId}/Attachments/{Id}/File` | Retrieves the actual file content [4]. |
| `GET v1/{Client}/MatterTypes` | Retrieves the taxonomy of matter categories [4]. |

*Fallback Strategy:* If the API is strictly token-gated and the city cannot provide one during the hackathon, developers should pivot to scraping the RSS feeds available on the Richmond Calendar page (`https://richmondva.legistar.com/Calendar.aspx?From=RSS`) [2] or utilizing existing open-source scrapers like `python-legistar-scraper` [10] to extract baseline HTML data.

## References

1. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
2. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/Calendar.aspx?From=RSS&Mode=Next%20Month
3. *Fetched web page*. https://richmondva.legistar.com/Legislation.aspx
4. *Legistar Web API Help Page*. https://webapi.legistar.com/Help
5. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
6. *Legistar Web API | Granicus Support*. https://support.granicus.com/s/article/Legistar-Web-API
7. *GET v1/{Client}/Matters*. https://webapi.legistar.com/Help/Api/GET-v1-Client-Matters
8. *GET v1/{Client}/Events*. https://webapi.legistar.com/Help/Api/GET-v1-Client-Events
9. *GET v1/{Client}/Matters/{MatterId}/Attachments*. https://webapi.legistar.com/Help/Api/GET-v1-Client-Matters-MatterId-Attachments
10. *opencivicdata/python-legistar-scraper: Scrapes municipal ...*. https://github.com/opencivicdata/python-legistar-scraper