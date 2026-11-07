> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Closing Richmond's Development Transparency Gap — Staff and Commissioner Realities to Design Around

## Executive Summary
Richmond’s development notification process is legally compliant but functionally narrow, creating a transparency gap that frustrates residents and challenges Planning Commission staff. Current notification relies on a 150-foot mailing radius, physical site signs, and newspaper advertisements [1] [2] [3]. While these meet statutory requirements, they frequently fail to reach the broader sphere of affected neighbors. 

Staff bandwidth is heavily consumed by technical case processing, with a typical City Planner dedicating 60% of their time to application review and only 5% to community communication [4]. Consequently, public-facing tools like Legistar—designed primarily for legislative record-keeping—serve as the main information repository but present high usability barriers for laypeople [5] [6]. This dynamic has culminated in significant public friction, most visibly during the recent "Code Refresh" zoning overhaul, where despite over 94 community outreach events, residents and some city councilors expressed feeling uninformed and excluded from the process [7]. 

To bridge this gap without overwhelming already-constrained planning staff, any new neighborhood development notifier must be entirely automated. It must extract data directly from existing public endpoints (like Legistar), expand the notification radius beyond the 150-foot legal minimum, and translate technical zoning jargon into plain-language alerts—all while requiring zero manual input or moderation from city planners.

## Richmond Planning Commission Workflow — Who Does What, When, and Why It Matters

### Multi-Agency Coordination Drives the 120-180 Day Timeline
The development review process in Richmond is highly structured, orchestrated primarily by the Land Use Administration Division. Staff manage applications for Special Use Permits (SUP), Community Unit Plans (CUP), and Rezonings, acting as the central hub for multi-agency review [8] [1]. 

The workflow is rigorous but internally focused. Applicants are required or strongly encouraged to attend pre-application conferences with staff to align projects with the Richmond 300 Master Plan and mitigate neighborhood impacts early [8] [1]. Once an application is submitted, staff circulate it to various city agencies (e.g., Public Works, Public Utilities, Fire) which generally have 30 days to provide written comments [1] [9]. 

Following agency review, staff confer with the applicant, draft an ordinance, and schedule a public hearing before the City Planning Commission (CPC) [1] [2]. The CPC hearing typically occurs about three weeks after these milestones are met [9]. If the CPC recommends approval, the ordinance is introduced to the City Council, which holds its own public hearing approximately 30 to 45 days later [1] [9]. In total, the approval process for SUPs and CUPs generally takes between 120 to 180 days, assuming no major modifications or incomplete submissions delay the schedule [9] [2].

## Public Notification Channels — Legally Sufficient but Functionally Narrow

### The Gap Between Legal Notice and True Awareness
Richmond's public notification protocols strictly adhere to City and Virginia State Code, but these legal minimums often fail to generate functional community awareness. The reliance on hyper-local mailings and outdated media formats leaves many impacted residents in the dark until late in the process.

| Notification Channel | Statutory Requirement & Execution | Limitations for Residents | Automation & Improvement Lever |
|---|---|---|---|
| **Site Signage** | Posted on the property at least 15 days prior to the CPC public hearing and remains until final City Council disposition [3]. | Easy for commuters or pedestrians to miss; provides minimal context beyond case ID and hearing date. | Generate QR codes for signs linking to a mobile-friendly, plain-language case dashboard. |
| **Mailed Notice** | Letters sent to property owners within 150 feet of the subject property [1] [9] [2]. | Excludes renters; 150-foot radius is too small to capture the true sphere of neighborhood impact (traffic, density). | Not applicable for modification (legal requirement), but highlights the need for a digital tool with a 500-1,000 ft radius. |
| **Newspaper Ads** | Published in a daily newspaper of general circulation [1] [9] [2]. | Rapidly declining print readership means these notices are rarely seen by the general public. | Ingest public hearing data to trigger automated email/SMS alerts to subscribed residents. |
| **Legistar Portal** | Agendas, staff reports, and meeting videos are hosted on the city's legislative portal [5] [10]. | High friction UX; requires specific search parameters; jargon-heavy documents; eComment often unavailable [5] [10]. | Scrape Legistar APIs to extract case data and auto-generate plain-language summaries. |

These channels satisfy the law but push the burden of discovery onto the resident. While application forms instruct developers to discuss proposals with area civic associations and submit letters of support or opposition, this early outreach is decentralized and heavily dependent on the applicant's diligence [1] [9].

## Legistar: Internal Use vs Public Design — Bridging the UX Gap

### A System Built for Clerks, Not Citizens
Legistar serves as the backbone of Richmond's legislative and planning record-keeping. Internally, it is highly effective for staff and the City Clerk to compile agendas, attach dense staff reports, and archive meeting minutes and videos [10] [6]. However, its public-facing design creates a significant usability barrier.

The Department of Planning and Development Review's own website highlights this friction. To view CPC agendas, the site instructs users to navigate to the Legistar calendar, switch to a "List View," use a "Search Calendar" feature, and select preset values from drop-down lists for the current year and specific department [5]. Recognizing these hurdles, the Office of the City Clerk has had to publish dedicated video tutorials teaching citizens how to navigate Legistar on both desktop and mobile devices [6]. Furthermore, while Legistar supports an "eComment" feature for public input, calendar listings for CPC meetings frequently show this option as "Not available," forcing residents to rely on live testimony or direct emails [10].

## Staff and Commissioner Perspectives — Where It Succeeds and Where It Falls Short

### High Technical Rigor vs. Low Outreach Capacity
From the staff perspective, the current process succeeds in its technical rigor and interagency coordination. The Pre-Application meeting framework effectively acts as a "one-stop-shop" to align projects with the Richmond 300 Master Plan and lower adverse environmental and neighborhood impacts before formal submission [8]. 

However, the process falls short in proactive community engagement due to severe bandwidth constraints. A standard City Planner's duties allocate 60% of their time to reviewing land use applications and preparing comments, and 20% to assisting the Planning Commission with technical expertise and reports. Only 5% of their time is dedicated to communicating with members of the community [4]. 

Commissioners are acutely aware of the resulting engagement gap, which has been starkly highlighted during the ongoing "Code Refresh" zoning rewrite. Despite the city hosting over 94 community outreach events, deploying pop-ups, and forming a Zoning Advisory Council (ZAC), public backlash has been fierce [11] [7]. Residents at civic league meetings have expressed feeling "forced" into rezoning and unaware of the changes, prompting City Councilor Reva Trammell to propose a new 18-member citizen commission to review the code from a neighborhood perspective [7]. This environment indicates that even when outreach volume is high, the *comprehension* and *reach* of that information remain inadequate, leading to residents arriving at meetings frustrated and uninformed.

## What a Neighborhood Development Notifier Must Do — Useful Without Burden

### Automating Transparency Without Increasing Staff Workload
To be viable, a neighborhood development notifier must operate entirely independently of planning staff workflows. It must bridge the gap between the 150-foot legal mailing radius and the actual neighborhood impact zone without requiring planners to manually upload data, manage email lists, or moderate comments.

* **Automated Data Ingestion:** The tool must perform nightly scrapes or API pulls from the Legistar CPC calendar, extracting case types, addresses, meeting dates, and links to staff reports [10].
* **Expanded Geospatial Alerts:** Utilizing city GIS parcel data, the tool should allow residents to subscribe to custom notification radii (e.g., 500 to 1,000 feet), triggering email or SMS alerts when a case enters their zone.
* **Plain-Language Translation:** The system should auto-generate brief, 150-word summaries of complex cases (e.g., explaining what a Special Use Permit actually means for a specific block) using standardized definitions from city application forms [1] [2].
* **Applicant Toolkit:** Provide developers with one-click templates to notify civic associations, including printable flyers and QR codes that link to the tool's case dashboard, standardizing the applicant-led outreach required by city forms [1].
* **Strict "Read-Only" Boundaries:** The tool must *not* feature native comment boards or new official inboxes. It should direct users to existing participation channels (like the Clerk's office or live meetings) to prevent creating new FOIA liabilities or moderation burdens for staff [6].

## Implementation Approach — Low-Risk, High-Utility Architecture

### Building a Frictionless Civic Tech Layer
The architecture should rely on a read-only adapter that interfaces with Legistar's public portal and Richmond's open GIS data. By hosting the service externally as a static site generator with a notification microservice, the city avoids complex IT integrations, VPN requirements, or security risks to internal databases. 

The rollout should begin with a 90-day pilot focused on 2-3 high-development districts. This allows the system to ingest a controlled volume of CPC agendas, test the accuracy of the PDF parsing for addresses, and validate the automated email delivery before scaling citywide.

## Metrics and Feedback Loops — Proving Value Without Burden

### Measuring Awareness, Not Controversy
Success should be measured by the proactive reach of information, not by the volume of public opposition. Key Performance Indicators (KPIs) for the pilot should include:
* Subscriber growth and alert open rates within the expanded 500-1,000 foot buffers.
* The percentage of CPC agenda items viewed on the platform more than 100 times prior to the hearing date.
* The share of alerts successfully delivered at least 10 days prior to a CPC meeting.
* Qualitative feedback via quarterly surveys of CPC commissioners assessing whether public commenters appear more accurately informed about the technical realities of the cases being heard.

## Risk Management — Legal, UX, and Trust

### Guardrails for Non-Official Notifications
The primary risk of a third-party or automated notifier is the conflation of its alerts with legally mandated public notice. 
* **Legal Guardrails:** Every alert and webpage must feature a prominent disclaimer stating it is an informational tool and does not constitute official legal notice under City Code Sec. 30-1050.5 or Virginia Code § 15.2-2204 [3]. 
* **UX Guardrails:** Because CPC agendas are volatile and cases are frequently continued or withdrawn, the tool must sync live with Legistar status updates and prominently display "Last Updated" timestamps to prevent residents from acting on stale data [10].
* **Trust Guardrails:** The platform should maintain neutral, civic branding and clearly publish its methodology for sourcing data directly from published city reports.

---

## Required Outputs

### Facts (with URLs)
* **Legal Notice Requirements:** Richmond requires physical signs to be posted on properties at least 15 days prior to a Planning Commission public hearing for Special Use Permits and Rezonings. Notices must also be mailed to property owners within 150 feet, and advertised in a daily newspaper. (https://www.rva.gov/sites/default/files/2020-06/City%20of%20Richmond%20-%20Zoning%20Ordinance%20-%20July%202020.pdf) [3] (https://rva.gov/sites/default/files/2025-10/Special%20Use%20Permit%20Application%20Form%20-%202025.pdf) [2].
* **Staff Time Allocation:** A Richmond City Planner's typical duties consist of 60% application review, 20% Planning Commission assistance, and only 5% communicating with the community. (https://www.governmentjobs.com/careers/richmond/jobs/newprint/5244026) [4].
* **Process Timeline:** The approval process for preliminary Community Unit Plans and Special Use Permits generally takes between 120 to 180 days. (https://rva.gov/sites/default/files/2025-08/2025%20Community%20Unit%20Plan%20Application%20Form.pdf) [9].
* **Legistar Usage:** The City of Richmond uses Legistar to host Planning Commission calendars, agendas, and meeting videos. (https://richmondva.legistar.com/Calendar.aspx) [10].
* **Public Engagement Friction:** Despite the city hosting over 94 community outreach events for the Code Refresh, residents and civic leagues have protested the process, leading to a proposal for a new 18-member citizen advisory commission. (https://www.richmonder.org/at-charged-meeting-trammell-calls-for-citizen-commission-to-rethink-code-refresh/) [7].

### Inferences (clearly labeled)
* **Inference:** The 150-foot mailing radius and reliance on newspaper ads leave a vast majority of functionally impacted neighbors unaware of developments until it is too late. *Why it matters:* This breeds distrust and leads to hostile public hearings.
* **Inference:** Legistar's complex interface and the frequent unavailability of the "eComment" feature for CPC meetings actively suppress asynchronous public participation. *Why it matters:* It forces residents to attend meetings in person or navigate opaque email channels, favoring those with flexible schedules.
* **Inference:** Planning staff do not have the bandwidth to adopt any new software that requires manual data entry, list management, or comment moderation. *Why it matters:* Any proposed transparency tool must be 100% automated and pull from existing public data feeds.
* **Inference:** The intense backlash to the Code Refresh zoning overhaul indicates that high *volume* of outreach (94+ events) does not equate to high *comprehension* among residents. *Why it matters:* Tools must focus on plain-language translation, not just data distribution.

### Unknowns
* Whether the Planning Department maintains a centralized, public-facing API or directory of recognized civic associations that a tool could automatically ping.
* The specific internal workflows or hidden fields staff use within Legistar that are not exposed to the public portal.
* Whether the Planning Commission plans to universally enable the Legistar "eComment" feature for all future meetings.
* The exact IT security constraints and polling rate limits Richmond imposes on third-party applications scraping Legistar data.

### Key constraints for any tool targeting planning staff or leveraging Planning workflows
* **Must Not Replace Legal Notice:** The tool cannot alter or replace the statutory requirements for 15-day signage, 150-foot mailings, or newspaper ads; it must be strictly additive and clearly disclaimed as non-official.
* **Zero Staff Workload:** The tool cannot require planners to manually upload documents, write summaries, or moderate public comments.
* **Legistar as the Source of Truth:** All data must be ingested directly from Legistar and published staff reports to ensure accuracy.
* **Real-Time Status Syncing:** Because CPC agendas are volatile, the tool must frequently poll for continuances, deferrals, or withdrawals to prevent spreading outdated information.
* **No New Official Records:** The tool should avoid creating new official public comment inboxes that would trigger FOIA retention requirements for the city; it should route users to existing participation channels.

## References

1. *Rezoning-Conditional Rezoning Application Form*. https://rva.gov/sites/default/files/2025-10/Rezoning-Conditional%20Rezoning%20Application%20Form%20-%202025.pdf
2. *Fetched web page*. https://rva.gov/sites/default/files/2025-10/Special%20Use%20Permit%20Application%20Form%20-%202025.pdf
3. *ZONING ORDINANCE*. https://www.rva.gov/sites/default/files/2020-06/City%20of%20Richmond%20-%20Zoning%20Ordinance%20-%20July%202020.pdf
4. *City of Richmond*. https://www.governmentjobs.com/careers/richmond/jobs/newprint/5244026
5. *Planning Commission | Richmond*. https://www.rva.gov/planning-development-review/planning-commission
6. *Informational Meeting Guide | Richmond*. https://www.rva.gov/office-city-clerk/informational-meeting-guide
7. *At charged meeting, Trammell calls for citizen commission to rethink code refresh*. https://www.richmonder.org/at-charged-meeting-trammell-calls-for-citizen-commission-to-rethink-code-refresh/
8. *Land Use Administration | Richmond*. https://www.rva.gov/planning-development-review/land-use-administration
9. *Fetched web page*. https://rva.gov/sites/default/files/2025-08/2025%20Community%20Unit%20Plan%20Application%20Form.pdf
10. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
11. *Code Refresh | Richmond*. https://www.rva.gov/planning-development-review/code-refresh