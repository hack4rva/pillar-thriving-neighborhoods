# Closing Richmond's Information Gap: Resident Personas for Finding Neighborhood Development Proposals

## Executive Summary

Richmond is undergoing a generational shift in land use, driven by the Richmond 300 master plan and a citywide Code Refresh aimed at increasing density [1] [2]. However, the digital infrastructure residents use to discover and understand these changes is highly fragmented, creating a severe information gap. 

**Core discovery failure from "radius-limited" notice**
Mailed notices for Special Use Permits (SUPs) reach only property owners within 150 feet of the subject property [3]. Because hearings are typically scheduled 30 days after introduction and the entire approval process takes 120 to 180 days [3], engaged residents living just outside this narrow radius often discover proposals too late to participate meaningfully.

**Fragmented systems create a maze for residents**
Key touchpoints are split across the Legistar portal for agendas [4], ArcGIS apps for zoning layers [5], and the Online Permit Portal for compliance [6]. There is no single, federated entry point that allows a resident to search an address and instantly see case status, zoning impacts, and upcoming meeting dates.

**Mobile-unfriendly artifacts block access at the moment of need**
Residents attempting to view rezoning maps and planning documents on their phones face significant friction, with some noting they "need a bigger monitor for that map PDF" [7]. Furthermore, the City's Parcel Mapper requires users to click exactly inside a parcel boundary; clicking in the right-of-way returns no results [5], frustrating mobile users trying to tap a general area.

**Renters in historically impacted areas face high risk with low visibility**
In neighborhoods like Jackson Ward—where mid-century highway construction displaced 10% of the city's Black population [8] —current revitalization efforts like the HUD Choice Neighborhoods grant and the Gilpin Court rebuild [8] [9] signal massive future changes. Renters in these areas need specific alerts regarding how zoning changes might affect their building's use and their housing security.

## Where Information Lives Today

Critical signals regarding neighborhood development are split across multiple platforms. None of these systems currently deliver proactive, mobile-first, plain-language alerts to residents.

### Legistar: Agendas, Packets, and Case Histories
Legistar serves as the central repository for the Planning Commission, City Council, and Board of Zoning Appeals [4]. While it is a comprehensive database for power users, it is heavily reliant on massive PDF packets that are punishing for residents attempting to find specific project impacts on their smartphones.

### ArcGIS Interactive Mapping Tools
The City provides robust GIS tools, including the Zoning Parcel Mapper, which features layers for Special Use Permits, Board of Zoning Appeals Cases, and Plans of Development [5]. However, the user experience fails on mobile devices. The Parcel Mapper's "Drilldown" operation only works when clicking strictly inside a parcel boundary; clicks in the right-of-way or outside the city return no results [5].

### Online Permit Portal and Zoning Administration
The Online Permit Portal (OPP) is used for submitting applications like Certificates of Zoning Compliances [6]. It is a transactional system designed for applicants and developers, making it highly unintuitive for residents asking, "What is being built near me?"

### Richmond 300 and Code Refresh Context
The Richmond 300 master plan and the ongoing zoning Code Refresh serve as the policy north-star shaping approvals [1]. While the Planning Commission uses these documents to justify density increases [1], the broad policy language is rarely translated into "what this means on my block" for the average resident.

## Resident Personas

To design an effective discovery solution, we must understand the distinct needs, literacy levels, and technological contexts of the residents navigating these systems. The following three personas span low-to-high planning literacy and are tied to real Richmond neighborhood contexts.

### Persona A: Long-Time Church Hill Homeowner

**Context & Goals**: This resident recently heard a rumor from a neighbor about a new infill development proposed two blocks away. In Church Hill, where recent approvals (like a 3-unit apartment building on Q Street) have sparked debates over density, parking, and privacy [1], this homeowner wants quick clarity on the project's scope and how to weigh in.

**Knowledge & Gaps**: They know their neighborhood intimately and understand the parking constraints. However, they do not know the difference between a "by-right" development and a Special Use Permit, nor do they understand that an SUP requires six affirmative votes from the City Council [3]. 

**First-Step Questions**: 
* "Is this a rumor, or is an actual application filed?"
* "How tall will it be, and where will the new residents park?"
* "When is the public hearing?"

**Systems Used & Where They Get Stuck**: They attempt to use Legistar and the Zoning Parcel Mapper. They get stuck downloading a 200-page Planning Commission agenda PDF on their phone, unable to find the specific staff report for the property. 

**Device & Connectivity**: Smartphone is their primary device; they have spotty home Wi-Fi and rely on cellular data.

**Barriers**: The 150-foot mailing radius for SUP notices [3] means they never received official mail. The PDF bloat on Legistar makes discovery impossible on their phone [7].

### Persona B: Jackson Ward Renter

**Context & Goals**: A renter in Jackson Ward is worried about how the citywide Code Refresh and the Jackson Ward Community Plan might affect their building. Given the neighborhood's history of urban renewal and the upcoming transformation of Gilpin Court into mixed-income housing [8] [9], they are highly sensitive to displacement risks.

**Knowledge & Gaps**: They know their lease terms and their immediate community. They do not know how to read zoning codes or whether a proposed rezoning allows their landlord to demolish or alter their building.

**First-Step Questions**: 
* "Will my building's allowed use change?"
* "Does this proposal include affordable housing requirements?"
* "Who can I contact for tenant protection?"

**Systems Used & Where They Get Stuck**: They rely on social media, community word-of-mouth, and general City web pages. They get stuck because official planning documents do not contain renter-specific guidance or plain-language summaries of displacement risks.

**Device & Connectivity**: Smartphone-only user; relies heavily on public or work Wi-Fi.

**Barriers**: Parcel-lookup complexity and map interfaces that fail to answer "what changes for me." The historical context of exclusion makes dense, bureaucratic language feel adversarial.

### Persona C: Carytown/Fan-Area Neighborhood Association Leader

**Context & Goals**: A neighborhood association zoning committee leader who actively monitors Planning Commission and BZA cases to brief their members. They want to track all development proposals within a 0.25-mile radius of their neighborhood corridor.

**Knowledge & Gaps**: High planning literacy. They understand the 120 to 180-day SUP approval timeline [3] and are familiar with Richmond 300. Their gap is time: they lack the bandwidth to manually check multiple systems daily.

**First-Step Questions**: 
* "What new SUPs or BZA cases were filed in my district this week?"
* "Are there any updates to the staff reports for next week's Planning Commission meeting?"

**Systems Used & Where They Get Stuck**: They use Legistar, the ArcGIS Zoning Parcel Mapper [5], and the zoning ordinance. They get stuck doing duplicate data wrangling—downloading PDFs, extracting the relevant details, and rewriting them into emails for their association members.

**Device & Connectivity**: Desktop computer at an office; smartphone when walking the neighborhood. Broadband access is excellent.

**Barriers**: No ability to save filtered watchlists or receive automated, consolidated change logs for a specific geographic boundary.

### Persona Comparison Matrix

| Feature | Persona A (Church Hill Homeowner) | Persona B (Jackson Ward Renter) | Persona C (Carytown NA Leader) |
| :--- | :--- | :--- | :--- |
| **Primary Goal** | Understand impact of a specific nearby proposal (parking, height) | Assess displacement risk and building use changes | Monitor all corridor activity to brief association members |
| **First Question** | "How big is it and where will they park?" | "Will my building's zoning change?" | "What new cases were filed in my district this week?" |
| **Planning Literacy** | Low (confuses by-right vs. SUP) | Low (unfamiliar with zoning codes) | High (understands timelines and ordinances) |
| **Systems Used** | Neighbor tips, Legistar search | Social media, City web pages | Legistar, ArcGIS Zoning Mapper, Desktop |
| **Primary Barrier** | 150-ft notice exclusion; PDF bloat on mobile | Lack of renter-specific impact summaries | Manual data wrangling; no saved geographic alerts |
| **Device Context** | Smartphone primary; spotty Wi-Fi | Smartphone only; public Wi-Fi | Desktop primary; broadband |

*Key Takeaway*: Despite vastly different literacy levels and goals, all three personas are blocked by the same systemic failures: platform fragmentation, mobile-hostile PDFs, and a lack of proactive, address-based alerting.

## Common Friction Points Across Personas

Three repeat failures explain the vast majority of resident drop-offs when trying to engage with the planning process:

* **The 150-Foot Notice Cliff**: The City's requirement to mail notices only to property owners within 150 feet of a subject property [3] systematically excludes engaged neighbors who live just one or two blocks away but will still feel the impacts of traffic and density.
* **Opaque and Rapid Timelines**: Once an ordinance is introduced to City Council, a public hearing is usually scheduled just 30 days later, with the Planning Commission meeting one week prior to that [3]. If a resident misses the initial introduction, the window to organize and submit written comments closes rapidly.
* **Mobile Map and PDF Failures**: Residents explicitly complain that they "need a bigger monitor" to view rezoning maps [7]. Furthermore, the ArcGIS Parcel Mapper's strict requirement to click exactly inside a parcel boundary (ignoring right-of-way taps) [5] makes mobile navigation incredibly frustrating.

## Accessibility Considerations

To make participation possible for all Richmonders, digital planning tools must be designed with strict accessibility baselines:

* **Mobile-First Summaries**: Legistar packets must be auto-summarized into mobile-friendly cards that highlight the "what, where, and when" without requiring a PDF download.
* **Tap-Anywhere Radius Detection**: Map interfaces must abandon the "click-inside-parcel" constraint [5] and allow users to tap anywhere on a street to drop a pin and see nearby cases.
* **Plain-Language Glossaries**: Terms like "Special Use Permit," "By-Right," and "BZA" must feature inline, 6th-grade reading level definitions.
* **Multimodal Delivery**: Provide audio briefs of staff reports and large-text toggles for low-vision users and those consuming information on the go.

## Opportunity Map

To solve the biggest pains first, the City should implement the following features to guide residents from "hearing a rumor" to "taking meaningful action."

### Address-Based Watchlists Beyond 150 Feet
Capture the residents excluded by formal mailing rules [3]. Allow users to enter their address and draw a 2-to-3 block geofence to receive SMS or email alerts whenever a new SUP, BZA, or rezoning case is filed in their custom radius.

### Timeline and "Next Action" Cards
Convert the complex 120 to 180-day approval process [3] into a clear, user-friendly countdown. Display simple cards that state: "Planning Commission meets in 7 days. Submit comments by [Date]. City Council votes in 3 weeks."

### PDF Auto-Summarizer and Case Impact Snapshot
Use extraction tools to pull the most critical data from Legistar PDFs: proposed use, number of units, height changes, parking plans, and the assigned staff contact. Link this snapshot directly to how the project aligns with the Richmond 300 master plan [1].

### Neighborhood Dashboards from ArcGIS Layers
Prebuild web pages for specific neighborhoods that automatically pull in the existing ArcGIS layers for Special Use Permits, Plans of Development, and City Old & Historic Districts [5]. This eliminates the need for NA leaders to manually build maps.

## Equity Lens

Designing for Richmond requires acknowledging the city's history of exclusionary zoning and urban renewal. In Jackson Ward, highway construction displaced 10% of the city's Black population [8]. Today, as the city plans the transformation of Gilpin Court and utilizes HUD Choice Neighborhoods grants [8] [9], trust must be actively earned.

The platform must include renter-specific alerts that answer, "What if my building is rezoned?" It should provide direct lines to Richmond Redevelopment & Housing Authority (RRHA) contacts, legal aid, and tenant protection resources. Furthermore, every case summary must include transparent source links back to the original Legistar item and GIS layers to build trust and prove the data is unaltered.

## Implementation Plan

The rollout should be phased, starting with read-only integrations before moving to proactive alerting.

1. **Data Ingestion**: Begin by pulling the Legistar calendar and agenda packet APIs [4]. 
2. **ArcGIS Integration**: Connect to the existing Zoning Parcel Mapper services to pull the SUP, BZA, and Plan of Development layers [5].
3. **Normalization**: Implement address normalization and "tap radius" logic to fix the mobile mapping constraints.
4. **Content Operations**: Develop the plain-language glossary and deploy the PDF auto-summarizer to generate the mobile-friendly impact cards.

## Measurement Plan

Success should be measured by action and comprehension, not just page views.

* **Time-to-Discovery**: Track the average time between a case being introduced and the first resident views in the surrounding blocks.
* **Conversion Rates**: Measure the percentage of alert recipients who click through to read the summary, and the percentage who subsequently submit a comment or RSVP to a hearing.
* **Mobile Completion**: Track the success rate of smartphone users attempting to find a specific case via address search.
* **Equity Metrics**: Monitor the renter engagement rate and account creation density in historically impacted priority neighborhoods like Jackson Ward.

## Risks and Mitigations

* **Misinterpretation of "By-Right"**: Residents may see a by-right development on the map and assume they can vote it down, leading to frustration. *Mitigation*: Use clear, distinct labels for "By-Right" vs. "Proposal Requiring Approval," accompanied by plain-language explainers.
* **Out-of-Date Layers**: If the ArcGIS layers [5] lag behind Legistar [4], residents will lose trust. *Mitigation*: Implement nightly syncs and prominently display "Last Updated" timestamps on all dashboards.
* **Over-Alerting Fatigue**: A 3-block radius in a dense area might trigger too many notifications. *Mitigation*: Allow users to set digest preferences (e.g., weekly summaries) and filter by project size or type.

## Appendices

**Evidence Base & Resources**
* **Notice & Timelines**: PDR Special Use Permit Application Form details the 150-foot notice radius, 30-day hearing schedules, and the 120-180 day overall timeline [3].
* **Mapping Constraints**: RVA Interactive Mapping Tools documentation confirms the Parcel Mapper drilldown limitations and lists available zoning layers [5].
* **Neighborhood Context**: The Richmonder coverage of Church Hill density debates and Richmond 300 alignment [1]; RRHA documentation on Jackson Ward's history of displacement and the Gilpin Court community plan [8] [9].
* **Resident Friction**: Community discussions highlighting the need for larger monitors to view City PDFs and general confusion over zoning changes [7].

## References

1. *THE NEXT 50 YEARS: Richmond’s zoning overhaul envisions a denser city. What will that look like?*. https://www.richmonder.org/the-next-50-years-richmonds-zoning-overhaul-envisions-a-denser-city-what-will-that-look-like/
2. *Richmond’s Code Refresh aims to rewrite rules that restrict growth*. https://www.vpm.org/news/2025-09-18/richmond-zoning-code-refresh-update-housing-development-vonck-robertson
3. *Special Use Permit Application Form*. https://rva.gov/sites/default/files/2025-10/Special%20Use%20Permit%20Application%20Form%20-%202025.pdf
4. *
	City of Richmond - Planning Commission
*. https://richmondva.legistar.com/DepartmentDetail.aspx?ID=24014&GUID=CFDDD5D6-AE26-43ED-8747-A02A21FD9362
5. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
6. *Zoning Administration | Richmond*. https://www.rva.gov/planning-development-review/zoning-administration
7. *Richmond is Rezoning every Parcel in town for the first ...*. https://www.reddit.com/r/rva/comments/1kz6ttx/richmond_is_rezoning_every_parcel_in_town_for_the/
8. *Jackson Ward | Richmond*. https://www.rva.gov/planning-development-review/jackson-ward
9. *Jackson Ward Community Plan | Richmond Redevelopment & Housing Authority*. https://www.rrha.com/redevelopment/gilpin-court/jackson-ward/