# From Compliance to Connection: Fixing Richmond's Development Review Awareness

## Executive Summary

Richmond's current approach to development review notifications meets the letter of the law but systematically excludes residents who are mobile-first, limited English proficient (LEP), or outside established civic networks. Information is highly fragmented: Planning Commission agendas live on Legistar, case activity sits in EnerGov's portal, and neighborhood contacts are isolated in a self-reported Civic Groups directory. This forces residents to "channel hop" to piece together a complete picture of neighborhood changes. 

Statutory notices are legally sufficient but practically late. Virginia law allows mailed notices to arrive as little as five days before a hearing, leaving residents with virtually no time to organize or digest complex proposals. Furthermore, participation tools heavily privilege synchronous attendance, with remote access provided via Microsoft Teams but no official asynchronous eComment channels enabled for agenda items. 

To shift from mere compliance to genuine connection, Richmond must bridge the gap between its document-centric systems and the mobile-first reality of its residents. By orchestrating existing data from Legistar and EnerGov into a unified, geofenced push-notification system, the City can deliver timely, accessible alerts directly to residents' phones. This software prototype, paired with low-lift policy changes like standardized on-site signage and translation thresholds, will transform development awareness from an exclusionary maze into an accessible civic touchpoint.

## Current Service Landscape

Information regarding development proposals in Richmond exists across multiple platforms, but it lacks a unified, subscribable path for residents. This fragmentation depresses awareness and creates high friction for community participation.

### Planning Commission Presence is Document-Centric

The Richmond Planning Commission generally meets every first and third Tuesday of the month [1]. The City relies heavily on Legistar to host its legislative calendar, agendas, and minutes [1]. While the City provides Microsoft Teams links for remote meeting access [2] [3], the platform is strictly document-centric. Recent Legistar entries for the Planning Commission explicitly show "eComment" as "Not available" [2] [3]. This indicates that there is no official asynchronous comment channel tied directly to agenda items, excluding workers, caregivers, and shift employees who cannot attend synchronous meetings.

### EnerGov Self Service Exposes Cases but Lacks Push Alerts

Richmond utilizes the EnerGov Online Permit Portal (Civic Access) for submitting Plan of Development (POD) applications and searching public records [1] [4]. The portal features a "Map" to explore neighborhood activity and a "Calendar" for public hearings [4]. However, the system requires residents to proactively seek out information; there are no clear mechanisms for residents to subscribe to geofenced alerts or automated notifications. Language support is also minimal, limited to a single Spanish help line ("¿Necesita ayuda? Enviar un correo al CSSHelp@rva.gov") [4].

### Civic Groups Directory is Unverified and Uneven

The City maintains a Civic Groups webpage to connect residents with neighborhood, community garden, and parks groups [5]. The Land Use Administration explicitly states that it "works with property owners and developers and the affected neighborhood associations" to ensure developments meet Master Plan goals [6]. However, the City warns that the contact information is supplied by the groups themselves, is "not considered a comprehensive list," and notes that "some of the groups listed may no longer be active" [5]. Relying on this directory as a primary notification backbone guarantees uneven coverage.

| Current Channels | Subscribe by Address | eComment | Mobile-Optimized Summaries | Language Support | Case Search by Address | Geofenced Notifications |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Legistar (Planning Commission)** | No | No | No | EN only | No | No |
| **EnerGov Self Service** | Unknown (not stated) | No | No | EN + minimal ES | Yes | No |
| **Civic Groups Directory** | No | No | No | EN only | No | No |

*Key Takeaway: Richmond's core planning tools are designed for active retrieval rather than proactive delivery, requiring residents to constantly monitor multiple portals to stay informed.*

## Statutory Baseline and Timing Realities

Virginia's statutory notice requirements set a low floor for awareness. While "on-time" legally, these notices often feel practically late to residents, severely limiting their ability to participate meaningfully.

### Notice Mechanics and Windows

Under Virginia Code § 15.2-2204, the local planning commission cannot recommend, nor the governing body adopt, any plan or ordinance amendment until notice is published twice in a newspaper [7]. The first notice must appear no more than 28 days before the hearing, and the second no less than five days before [7]. Written notice must be given at least five days before the hearing to the owners or occupants of all abutting property and property immediately across the street [7]. For adjoining localities, notice must be given at least 10 days prior, and for military bases or public-use airports, at least 30 days prior [7]. 

### Legal Risk and Trust Implications

The Code of Virginia states that an "inadvertent failure" by the planning commission representative to give written notice to an owner does not invalidate a subsequently adopted amendment [7]. However, case law demonstrates that failure to comply with *mandatory* statutory notice and hearing requirements renders an action void *ab initio* (from the beginning), as seen in cases like *Gas Mart v. Board of Supervisors of Loudoun County* [8]. Minimum compliance can still feel exclusionary to the public, and administrative errors carry significant reputational and litigation risks.

| Notice Type | Required Window | Target Audience |
| :--- | :--- | :--- |
| **Published Ads (Newspaper)** | 2x; first ≤28 days pre-hearing, second ≥5 days pre-hearing | General Public [7] |
| **Written Notice (Mail)** | ≥5 days pre-hearing | Owners/Occupants of abutting properties [7] |
| **Adjoining Localities** | ≥10 days pre-hearing | Chief administrative officer of adjoining locality [7] |
| **Military/Airports** | ≥30 days pre-hearing | Commander/Owner of facility [7] |

*Key Takeaway: The 5-day minimum for mailed notices and second newspaper ads provides insufficient lead time for community organizing; proactive digital alerts are the only way to expand this window.*

## Resident Access Constraints

Current notification channels systematically miss residents who rely on mobile devices, lack high-speed home internet, or face language barriers.

### Mobile-First and Data-Light Design Imperatives

According to 2023 American Community Survey (ACS) data analyzed in JCOTS Report 2504, 89.5% of Richmond households have a smartphone, while only 79.0% have a desktop or laptop [9]. Furthermore, 10.5% of Richmond households rely on a cellular data plan with no other type of internet subscription, and 6.6% have no computer at all [9]. This digital divide demands that planning notices and case summaries be mobile-first, low-bandwidth, and accessible via SMS, as PDF-heavy agendas and complex GIS map tools deter engagement for mobile-only users.

### Language Equity Gaps

There is no visible language access plan or translation policy for Richmond's planning content. The EnerGov portal features a single line of Spanish text directing users to an email address for help [4], but core materials, agendas, and case files appear to be English-only. This lack of translation ensures that LEP communities do not receive comprehensible notices, skewing participation toward English-dominant residents.

| Device / Subscription Type | Percentage of Richmond Households (2023) |
| :--- | :--- |
| **Smartphone** | 89.5% [9] |
| **Desktop or Laptop** | 79.0% [9] |
| **Broadband of any type** | 84.9% [9] |
| **Broadband (cable, fiber optic, DSL)** | 72.3% [9] |
| **Cellular data plan ONLY** | 10.5% [9] |
| **No computer** | 6.6% [9] |

*Key Takeaway: With 1 in 10 households relying solely on cellular data, Richmond's reliance on desktop-optimized portals and heavy PDFs actively excludes a significant portion of the population.*

## Neighborhood Association Notifications

Neighborhood associations are vital conveners, but relying on them as a primary notification system is fundamentally flawed due to data decay and uneven geographic coverage.

### What Exists and Its Caveats

The City's Civic Groups webpage provides contact information for neighborhood groups, but explicitly warns that the list is "supplied by the civic groups themselves and should not be considered a comprehensive list" [5]. The City also notes that "some of the groups listed may no longer be active" [5]. 

### How Planning Currently Engages

The Land Use Administration relies on these groups, stating it "works with property owners and developers and the affected neighborhood associations" [6]. Because the registry is unverified and opt-in, relying on it as a system-of-record means whole blocks or neighborhoods without active, registered leadership are systematically excluded from early development conversations.

## Comparative Practices

Other jurisdictions utilize standardized signage, applicant proof obligations, and multi-channel outreach to close awareness gaps. Richmond can adapt these practices within the bounds of the Virginia Code.

### Applicant-Driven Mailings and Variability Risks

Loudoun County shifts the burden of notification to the applicant. In cases involving zoning map amendments or special exceptions initiated by a landowner, the landowner is responsible for sending written notice to abutting property owners via registered or certified mail at least five days before the hearing [10]. 

### Signage as a Low-Cost Supplement

The Town of Strasburg mandates on-site sign notices for public hearings, providing a highly visible, low-cost supplement to mailed and published notices [11]. 

### Timing Discipline and Content Standards

The Albemarle County Land Use Law Handbook highlights the strict nature of Virginia's notice laws, warning that failure to comply with mandatory statutory notice requirements renders an action void *ab initio* [8]. The handbook advises standardizing routines, such as always publishing notice at the same intervals and on the same day of the week, to avoid fatal administrative errors [8].

| Jurisdiction | Applicant Mailing Responsibility | On-Site Signage Required | Proof-of-Mailing Standardization |
| :--- | :--- | :--- | :--- |
| **Richmond (Current)** | Unknown | Unknown | Unknown |
| **Loudoun County** | Yes (Registered/Certified Mail) [10] | Unknown | Yes [10] |
| **Strasburg** | Unknown | Yes [11] | Unknown |
| **Albemarle (Guidance)** | Unknown | Yes (implied as mode of notice) [8] | Yes (Affidavits required) [7] |

*Key Takeaway: Shifting mailing burdens to applicants (with strict proof) and mandating on-site signage are proven, code-compliant ways to increase visibility without straining city staff capacity.*

## Gap Analysis

Addressing Richmond's notification gaps requires a two-pronged approach: software solutions to unify and push data, and policy/staffing changes to ensure equity and visibility.

### Software-Solvable Gaps
* **Geofenced Notifications:** Integrating EnerGov case data with Legistar agendas to trigger automated alerts based on a resident's address or parcel proximity.
* **Mobile Case Cards:** Auto-generating mobile-optimized, low-bandwidth summaries of development proposals that can be sent via SMS or email.
* **Asynchronous Input:** Creating webforms, SMS reply flows, or voicemail-to-text systems tied to specific Legistar item IDs to capture feedback outside of synchronous meetings.
* **Audit Dashboards:** Maintaining public, auditable logs of when and how notices were sent to mitigate legal risks and build trust.

### Staffing and Policy Needs
* **On-Site Signage Ordinance:** Mandating standardized, highly visible on-site signage for all land-use cases.
* **Language Access Policy:** Establishing translation thresholds (e.g., translating summaries if a census tract exceeds 5% LEP) and implementing human QA for automated translations.
* **Verified Registry Upkeep:** Converting the self-reported Civic Groups list into a verified, actively managed dataset with primary/secondary contacts and bounce tracking.

## Specific Services to Complement (Not Replace)

A hackathon prototype or new software layer should not attempt to replace Richmond's core systems of record. Instead, it should "snap in" to existing infrastructure to orchestrate and amplify data.

* **Legistar:** Do not replace the legislative calendar. Instead, ingest agendas and items via API/scraping to add subscribe and asynchronous comment layers.
* **EnerGov:** Do not replace the permit portal. Use it as a read-only feed for case statuses and map data, triggering alerts when milestones change.
* **Civic Groups:** Do not replace neighborhood associations. Treat them as distribution amplifiers by providing them with co-branded, easily shareable digital case cards.
* **Statutory Notices:** Do not replace newspaper ads or mailed notices. Keep them for legal compliance, but enhance them by including short URLs or QR codes that point to mobile case cards.

## Facts, Inferences, and Unknowns

### Facts
* The Planning Commission generally meets the first and third Tuesday of the month; agendas are hosted on Legistar, and remote access is via Teams [1] [2] [3].
* EnerGov provides a Map, Calendar, and Search function, with a Spanish help email [4].
* The Civic Groups directory is self-reported, not comprehensive, and contains inactive groups [5].
* Virginia Code § 15.2-2204 requires two newspaper ads and mailed notice to abutters at least 5 days before a hearing [7].
* 89.5% of Richmond households have smartphones, while 10.5% rely solely on cellular data [9].
* Loudoun County requires applicants to send written notices [10], and Strasburg requires on-site signage [11].

### Inferences
* **eComment is not enabled:** Based on recent Legistar entries showing "Not available," the City does not currently support asynchronous digital comments for Planning Commission items [2] [3].
* **Lack of Language Access:** The absence of translated materials beyond a single help line suggests LEP residents are systematically excluded from early awareness.
* **Fragmentation Drives Low Awareness:** The separation of meeting logistics (Legistar), case files (EnerGov), and community contacts (Civic Groups) creates a high barrier to entry for average residents.

### Unknowns
* Whether Richmond currently requires on-site signage for land-use cases.
* Whether the Planning Department offers any hidden email or RSS subscriptions for case changes.
* The exact staff FTE capacity available for proactive community outreach.
* Whether Richmond utilizes applicant-driven mailings similar to Loudoun County.

## Prototype Blueprint

To rapidly close the awareness gap, Richmond should develop a thin integration layer that delivers alerts, summaries, and comment capabilities without altering core systems. This can be achieved in an 8-12 week sprint.

### Features and Data Flows
1. **Data Ingestion:** Pull Legistar agenda items and EnerGov case statuses via APIs or scraping.
2. **Geofenced Subscriptions:** Allow residents to subscribe via address, SMS, email, or WhatsApp. The system will listen for EnerGov/Legistar updates within a configurable radius of the user's address.
3. **Mobile Case Cards:** Auto-generate concise, bilingual (EN/ES) summaries featuring a map, project milestones, and a clear "What this means" section optimized for mobile screens.
4. **Asynchronous Input:** Provide a webform, SMS reply option, and voicemail-to-text hotline. Bundle these inputs into a pre-meeting summary routed to staff and commissioners.

### Safeguards and Metrics
The prototype must include a public notice log and opt-in audit to track per-case delivery stats. Key Performance Indicators (KPIs) should include: subscribers per case, the delta in notice lead time (e.g., notifying residents 21 days out instead of 5), comment volume/composition, and LEP participation share.

## Implementation Risks and Cautionary Examples

Scaling a new notification system carries risks that must be mitigated during the pilot phase.

### Failure Cases
* **Incomplete Association Lists:** Relying too heavily on the unverified Civic Groups directory [5] will lead to complaints from excluded neighborhoods.
* **Missed Mandatory Steps:** If the prototype replaces statutory mailings and fails, it could trigger legal challenges that void planning actions, as warned in the Albemarle handbook [8].

### Mitigations
* Treat neighborhood associations strictly as amplifiers; rely on parcel-based geofenced alerts as the primary digital delivery method.
* Maintain all statutory mail and newspaper requirements; the digital system must be an *addition*, not a replacement.
* Stage rollouts geographically to manage staff training and comment triage volume.

## Staffing and Systems Readiness

Software alone cannot fix development review awareness; modest staffing is required to turn tools into outcomes. Richmond will need to allocate 0.5 to 1.0 FTE for a content and translation coordinator to QA automated Spanish translations and ensure case summaries are written in plain language. Additionally, the City must establish a shared inbox and workflow for comment triage, backed by a strict Service Level Agreement (SLA) to ensure pre-meeting summaries are delivered to commissioners before they vote.

## Policy Opportunities

Low-lift policy changes can dramatically boost coverage and trust without requiring massive budget allocations.

* **On-Site Signage Standards:** Codify requirements for the size, placement, and timing of on-site signs for all development proposals, similar to Strasburg [11].
* **Translation Thresholds:** Mandate the translation of agendas and case summaries for projects located in census tracts where the LEP population exceeds 5%.
* **Applicant Proof-of-Mailing:** Require applicants to upload certified mail receipts and affidavits directly into EnerGov, standardizing the proof process used in Loudoun County [10].

## Action Plan and Timeline

Richmond should execute a 90-day pilot in 2-3 neighborhoods with mixed device access and LEP profiles to measure lift before scaling citywide.

* **Weeks 1-3:** Build data connectors to Legistar and EnerGov; design the mobile case card template; launch SMS/email subscription landing page.
* **Weeks 4-6:** Establish the English/Spanish content flow; activate the asynchronous comment intake (SMS/web/voicemail); build the internal audit dashboard.
* **Weeks 7-9:** Pilot on-site signage with QR codes linking to case cards; onboard community partners (libraries, RRHA sites) to distribute physical one-pagers.
* **Weeks 10-12:** Evaluate KPIs (lead time delta, comment volume, subscriber growth); present findings to the Planning Commission; make the scale/kill decision.

## References

1. *Planning Commission | Richmond*. https://www.rva.gov/planning-development-review/planning-commission
2. *
	City of Richmond - Planning Commission
*. https://richmondva.legistar.com/DepartmentDetail.aspx?ID=24014&GUID=CFDDD5D6-AE26-43ED-8747-A02A21FD9362
3. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
4. *Civic Access*. https://energov.richmondgov.com/energov_prod/selfservice
5. *Civic Groups | Richmond*. https://rva.gov/planning-development-review/civic-groups
6. *Land Use Administration | Richmond*. https://www.rva.gov/planning-development-review/land-use-administration
7. *§ 15.2-2204. Advertisement of plans, ordinances, etc.; joint public hearings; written notice of certain amendments*. https://law.lis.virginia.gov/vacode/title15.2/chapter22/section15.2-2204/
8. *Chapter 28 Notice Requirements for Land Use Proposals*. https://gcva.granicus.com/MetaViewer.php?view_id=1&event_id=1107&meta_id=56718
9. *Beyond Access: Broadband Affordability & Adoption*. https://dls.virginia.gov/commissions/jcots/materials/broadband_report_nov_2025.pdf
10. *Public Notice Requirements | Loudoun County, VA - Official Website*. https://www.loudoun.gov/2499/Public-Notice-Requirements
11. *ARTICLE XV – PUBLIC HEARING; NOTICE Chapter 84*. https://www.strasburgva.com/media/22091