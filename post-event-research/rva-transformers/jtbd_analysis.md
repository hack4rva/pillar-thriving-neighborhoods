# Project Summary

## Project Name

rva-transformers

## Description

Transform development data to be accessible and understandable for residents of Richmond, VA.

## Strategic Pillar

Thriving neighborhoods (that meet our housing needs)

## Problem Statement

Make it easier for residents to find and understand development proposals near them.


# Functional Job To Be Done

## Situation

When I hear there might be a new development on my block or I see a public notice sign,

## Persona

a Richmond resident

## Motivation

want to quickly see the official proposal details (what, where, status, hearing date) and how it relates to the Richmond 300 future land use and zoning process,

## Outcome

so I can understand potential impacts, decide whether to support or oppose, and show up to the right meeting in time to comment.

## Current Workaround

Manually search Legistar for case types (SUP/rezoning/LC&E), scan Planning Commission/CAR/UDC agendas, check the Site Plan page and the EnerGov Online Permit Portal, and ask neighbors/social media.

## Core Pain

Fragmented systems and jargon (SUP, LC&E, rezoning, site plan) across multiple boards and portals; no simple map-based “what’s near me, what’s next, how to act” view; short notice windows.


# Emotional Trust Job To Be Done

## Situation

When multiple projects pop up across our neighborhood,

## Persona

a neighborhood association leader

## Motivation

want a trustworthy, plain-language summary with timelines, responsible bodies (Planning Commission, CAR, UDC, BZA), and clear engagement steps,

## Outcome

so I can brief residents, build informed positions, and feel confident we aren’t missing critical deadlines.

## Current Workaround

Build ad‐hoc spreadsheets from Legistar agenda packets, email city staff for clarifications, and piece together Richmond 300 guidance to interpret consistency.

## Core Pain

Anxiety about missing hearings or misinterpreting policy; time-consuming document hunting; limited capacity to translate planning language for neighbors.


# Systems Coordination Job To Be Done

## Situation

When a proposal advances through different review bodies,

## Persona

a civic planner/advocate

## Motivation

want a consolidated timeline that tracks dependencies (e.g., Site Plan reviews before UDC final, CAR certificate of appropriateness for historic areas, Planning Commission recommendations to Council),

## Outcome

so I can coordinate comments, avoid duplicative outreach, and connect projects to plan goals and metrics.

## Current Workaround

Manually reconcile UDC/CAR/Planning Commission calendars and Legistar items, cross-check Richmond 300 maps, and monitor the PlanRVA Development Map and datasets for regional context.

## Core Pain

Process is non-linear and scattered across calendars and document repositories; it’s easy to lose thread of status, sequence, and how/when public input matters.


# Identified Personas

## Persona Name

Resident Near a Proposed Project

## Description

A Richmond resident who hears about a potential new development on their block or sees a public notice sign. They want to quickly access and understand the official proposal details (what, where, status, hearing date) and its relation to the Richmond 300 plan to decide whether to support or oppose it and participate in the correct public meeting.

## Key Concerns

Dealing with fragmented systems and confusing jargon (SUP, LC&E, rezoning). The core pain is the lack of a simple, map-based view to see what's happening nearby, what the next steps are, and how to act within short notice windows.

## Persona Name

Neighborhood Association Leader

## Description

A leader who needs to inform residents about multiple development projects in their neighborhood. They want a trustworthy, plain-language summary with timelines, responsible bodies (Planning Commission, CAR, UDC, BZA), and clear engagement steps to brief residents, build informed positions, and feel confident that critical deadlines are not missed.

## Key Concerns

Anxiety about missing hearings or misinterpreting policy, the time-consuming nature of hunting for documents, and the limited capacity to translate complex planning language for neighbors.

## Persona Name

Civic Planner/Advocate

## Description

A professional who tracks development proposals as they move through different review bodies. They want a consolidated timeline that shows dependencies (e.g., Site Plan before UDC) to coordinate comments, avoid duplicative outreach, and connect projects to broader city plan goals and metrics.

## Key Concerns

The process is non-linear and scattered across various calendars and document repositories, making it easy to lose track of a project's status, sequence, and the specific moments when public input is most impactful.

## Persona Name

Renter in a Priority Neighborhood

## Description

A resident in a historically underinvested neighborhood who is often least informed about development yet most impacted by it. The project aims to prioritize this group for proximity alerts and summaries.

## Key Concerns

Impacts on housing affordability, potential displacement, and having a voice in neighborhood changes.

## Persona Name

Homeowner Near Active Corridors

## Description

A property owner living near a major street or development area who is a potential user of the tool.

## Key Concerns

Impacts on property value, traffic, neighborhood character, and quality of life.

## Persona Name

Small Business Owner

## Description

A local entrepreneur whose business operations could be affected by nearby construction and development.

## Key Concerns

Changes in customer traffic, competition, and the overall business environment resulting from new developments.


# Richmond Data Ecosystem Summary

## Source Name

Richmond Legistar

## Description

This is the city's legislative portal, which serves as a primary repository for agendas, case files, and metadata for various municipal bodies involved in development review. This includes the Planning Commission, Commission on Architectural Review (CAR), Urban Design Committee (UDC), and Board of Zoning Appeals (BZA). The portal contains crucial documents and data points such as case types (e.g., Special Use Permit, Rezoning, Location, Character and Extent), addresses, parcel IDs (GPINs), meeting dates, staff reports, and official actions. It is also the platform for residents to find links to provide eComment on specific proposals.

## Limitations

The data is highly fragmented and difficult for the average resident to navigate. Users must manually search for specific case types across different commissions. The system uses technical jargon (e.g., SUP, LC&E, CAR COA) that is not easily understood by the public. There is no simple, map-based interface to view proposals near a specific address. The overall development process is non-linear and scattered across various calendars and document repositories within Legistar and other city systems, making it extremely difficult to track a single project's status, sequence, and dependencies (e.g., Site Plan review before UDC final). This fragmentation creates anxiety and a high time-cost for residents and neighborhood leaders trying to stay informed.

## Url

https://richmondva.legistar.com/Legislation.aspx


# Data Questions

## Question Text

What are the authoritative data sources we can reliably pull: Legistar items and metadata for Planning Commission, CAR, UDC, BZA; EnerGov permit/plan records; GIS layers (parcels, zoning, Historic Districts, Future Land Use, Priority Neighborhoods); PlanRVA Development Map? What fields/IDs link across them?

## Context

This is crucial for establishing a reliable foundation for the project. Identifying and linking the primary, authoritative data sources across different city departments is the first step to creating a consolidated and accurate view of development proposals, which currently exists in fragmented systems.

## Question Text

Can we programmatically classify Legistar “Types” (e.g., Special Use Permit, Rezoning, Location, Character and Extent, Conceptual Review, Staff Report) and extract addresses, GPINs/parcel IDs, meeting dates, staff reports, and actions?

## Context

The project's scalability and sustainability depend on automating the extraction of key information. This question assesses the technical feasibility of parsing unstructured or semi-structured data from Legistar to avoid manual data entry and ensure timely updates.

## Question Text

What is available via open GIS for SUPs/rezonings and how current is it? Are there APIs or regular exports for Special Use Permits and other case layers on the Richmond GeoHub? If items were moved/retired, what’s the current endpoint?

## Context

A map-based interface is a core project goal. This question determines whether the project can leverage existing, up-to-date city GIS data or if it will need to create and maintain its own spatial datasets, which would significantly increase the maintenance burden.

## Question Text

How do we resolve addresses to parcels and overlay Future Land Use and design overlays to explain “consistency with Richmond 300” in plain language?

## Context

A key user need is to understand how a proposal fits within the city's master plan. This question addresses the technical challenge of connecting a specific property (via address or parcel ID) to its corresponding land use designation in the Richmond 300 plan to generate meaningful, plain-language explanations.

## Question Text

What is the expected refresh cadence for each source (Legistar agenda publication, EnerGov status changes, GIS layer updates) and how do we handle late-minute agenda amendments?

## Context

For the tool to be trusted by residents, the information must be current and reflect last-minute changes. This question addresses the operational challenge of synchronizing with various data sources that update on different schedules and handling the unpredictability of government meeting agendas.


# User Questions

## Question Text

Which resident personas should we prioritize first: renters in Priority Neighborhoods, homeowners near active corridors, small business owners, or neighborhood association officers? What devices/languages do they use?

## Context

To design an effective and equitable solution, the project must focus on specific user groups. This question helps define the primary audience, ensuring the tool is tailored to their unique needs, technical access (e.g., mobile vs. desktop), and language preferences.

## Question Text

What are residents’ top “action” needs: learn basics, subscribe for proximity alerts, generate talking points tied to Richmond 300, or find how/where to submit eComment?

## Context

The tool's features should be driven by what users want to accomplish. Understanding whether the primary need is for awareness (alerts), deeper understanding (talking points), or direct action (eComment links) will guide feature prioritization and user interface design.

## Question Text

What level of detail is most helpful in summaries (e.g., unit counts, height/FAR, parking, use type) versus information overload?

## Context

This question addresses the core challenge of making complex information 'understandable.' Finding the right balance is key to providing value without overwhelming residents with technical jargon or excessive data, which would defeat the project's purpose.

## Question Text

What accessibility and language access requirements should we meet (screen reader support, Spanish and other languages aligned with City language access plan)?

## Context

To be truly accessible to all Richmond residents, the project must be designed inclusively. This question ensures that technical and content design considers users with disabilities and those who speak languages other than English, aligning with broader city equity goals.

## Question Text

How will we measure trust and usefulness (e.g., share rates, alert opt-ins, attendance at meetings, user surveys)?

## Context

Defining success is critical for iteration and demonstrating impact. This question moves beyond simple usage statistics to focus on metrics that indicate whether the project is actually helping residents feel more informed, confident, and engaged in the development process.


# Integration Questions

## Question Text

What technical pathways are acceptable to the City for data ingestion: public Legistar endpoints, web-scraping with rate limits, Calendars/ICS, or staff-provided data feeds?

## Context

This is a fundamental question of technical and political feasibility. The project's ability to access data reliably and sustainably depends on using methods that are approved by and not disruptive to the city's IT infrastructure.

## Question Text

Can we link directly to eComment and meeting agendas in Legistar and surface the correct “next step” body (Planning Commission vs CAR vs UDC vs City Council)?

## Context

To empower residents to act, the tool must provide clear, direct pathways to participation. This question focuses on the technical ability to create deep links into the city's legislative portal and correctly guide users to the right meeting and comment form.

## Question Text

How can we reference the EnerGov Online Permit Portal records for site plans without exposing PII while still clarifying status stages?

## Context

This question navigates the critical balance between transparency and privacy. The project needs to provide useful information on development status from the permit portal while strictly adhering to regulations protecting personally identifiable information (PII).

## Question Text

Can we embed or cache Richmond 300 interactive maps (Future Land Use, Priority Neighborhoods) and overlay proposed projects to visualize “fit”?

## Context

Visual context is essential for understanding development impact. This question explores the technical feasibility of integrating official city maps directly into the tool, which would provide powerful context without requiring the project to recreate and maintain complex map layers.

## Question Text

How might this tool complement the PlanRVA Development Map (regional context) rather than duplicate it; can we deep-link to regional items?

## Context

This question addresses strategic positioning within the existing civic tech landscape. To be successful and gain support, the project must demonstrate that it provides unique, Richmond-specific value that complements, rather than competes with, existing regional tools.


# Equity Questions

## Question Text

How will proximity alerts and summaries prioritize historically underinvested Priority Neighborhoods and renters who are often least informed yet most impacted?

## Context

This question ensures the project proactively addresses systemic inequities. It forces a focus on outreach and feature design that serves communities most vulnerable to development pressures, rather than only benefiting those who are already civically engaged.

## Question Text

What safeguards ensure plain-language explanations don’t oversimplify or bias interpretations of consistency with Richmond 300 goals?

## Context

This addresses the ethical responsibility of information translation. The project must develop a process to create summaries that are simple but not simplistic, ensuring they are neutral and do not unintentionally mislead residents or favor a particular viewpoint.

## Question Text

How do we provide multi-channel access (SMS/email/print handouts for libraries/rec centers) for residents with limited internet access?

## Context

This question is critical for bridging the digital divide. An online-only tool risks excluding residents without reliable internet access; providing information through channels like SMS or physical printouts is essential for equitable access.

## Question Text

How will we track equitable reach and participation (e.g., sign-ups and meeting attendance by neighborhood/ward, language preference)?

## Context

To hold the project accountable to its equity goals, its impact must be measured. This question focuses on defining metrics that go beyond overall usage to analyze who is being reached and empowered, ensuring the tool is making a difference in target communities.


# Prior Art Questions

## Question Text

Which design patterns from NYC Planning’s ZAP Search and Philadelphia’s Atlas are most transferable (map-first discovery, case timelines, document bundles, subscription alerts)?

## Context

This question aims to leverage the successes of established projects. By identifying and adapting proven features, the project can accelerate its design process and build on user interface patterns that are known to be effective for this type of data.

## Question Text

What are the known pitfalls from other cities (e.g., stale data, confusing status terms, reliance on staff uploads) and how can we mitigate them in RVA?

## Context

Learning from the failures and challenges of others is crucial for risk mitigation. This question encourages a proactive approach to common problems in civic tech, such as data maintenance and user confusion, to build a more resilient and sustainable tool.

## Question Text

Can we adopt a consistent case taxonomy and status progression similar to ZAP (e.g., filed → in review → hearing scheduled → decided → appealed) adapted to Richmond bodies and terms (SUP, LC&E, CAR COA, UDC final)?

## Context

This explores whether a standardized workflow can bring clarity to Richmond's complex and non-linear development review process. Adopting a simplified, consistent status model, tailored to local terminology, could significantly improve user understanding.

## Question Text

What minimum dataset and document set (staff report, application, site plan, public notice) improves comprehension without heavy maintenance burden?

## Context

This is a practical question focused on defining the scope of a Minimum Viable Product (MVP). It seeks to find the sweet spot between providing enough information to be genuinely useful to residents and limiting the data requirements to what is sustainable to collect and maintain.


# Key Stakeholders

## Stakeholder Name

City of Richmond Planning Commission

## Stakeholder Type

City Department

## Role In Project

Makes recommendations to City Council on Special Use Permits (SUPs), Rezonings, and Conditional Use Permits. It also grants 'Location, Character and Extent' approval for public projects. Its agendas and items in the Legistar system are a primary data source for the project.

## Stakeholder Name

Richmond City Council

## Stakeholder Type

City Government

## Role In Project

The final decision-making body for many development proposals. It can overrule the Planning Commission with a two-thirds vote, making its decisions a critical endpoint in the development process timeline.

## Stakeholder Name

Urban Design Committee (UDC)

## Stakeholder Type

City Department

## Role In Project

An advisory board to the Planning Commission that reviews development on public property or in the public right-of-way. Many projects require Site Plan review before going to the UDC, making it a key dependency to track.

## Stakeholder Name

Commission of Architectural Review (CAR)

## Stakeholder Type

City Department

## Role In Project

Reviews all exterior changes to structures within the city's Old and Historic Districts and issues Certificates of Appropriateness. Its meetings and actions, available via Legistar, are another crucial data source.

## Stakeholder Name

Department of Planning and Development Review (PDR)

## Stakeholder Type

City Department

## Role In Project

Manages the Site Plan review process, which is a prerequisite for some UDC reviews. The department is a key data source, particularly through the EnerGov Online Permit Portal.

## Stakeholder Name

Neighborhood Associations

## Stakeholder Type

Community Group

## Role In Project

A primary user group for the project. Leaders of these associations need reliable, plain-language information to brief residents and represent community interests at public hearings.

## Stakeholder Name

Hack for RVA Partners

## Stakeholder Type

Civic Partner

## Role In Project

A local civic tech group and a key partner in the civic hackathon where the 'rva-transformers' project is being developed. This group provides technical expertise and ensures alignment with the Mayor's Action Plan.

## Stakeholder Name

PlanRVA

## Stakeholder Type

Regional Body

## Role In Project

Maintains the regional Development Map. The 'rva-transformers' project aims to complement this existing tool, not duplicate it, potentially by deep-linking to provide regional context.

## Stakeholder Name

Board of Zoning Appeals (BZA)

## Stakeholder Type

City Department

## Role In Project

Mentioned as one of the responsible bodies in the development process whose cases are tracked in the Legistar system. It is part of the overall ecosystem the project must account for.


# Potential Challenges

## Challenge Area

Data Access and Integration

## Description

A primary challenge is the fragmented and siloed nature of Richmond's development data. Critical information is scattered across multiple, disconnected systems: Legistar for legislative items and meeting agendas; the EnerGov Online Permit Portal for site plans and permit statuses; and various GIS layers for parcels, zoning, and future land use. The context highlights a core problem: there are no reliable, consistent identifiers to programmatically link a single development project across these platforms. This makes it extremely difficult to create a consolidated timeline that tracks dependencies and a project's status as it moves between review bodies like the Planning Commission, UDC, and City Council. The project team must determine the technical and political feasibility of data ingestion methods—such as using public endpoints, web-scraping, or negotiating for staff-provided data feeds—and then build a system to resolve addresses, link disparate records, and classify case types automatically. The variability in data refresh rates and the need to handle last-minute agenda changes further compound this integration challenge.

## Risk Level

High

