# Analysis Summary

A Jobs To Be Done (JTBD) analysis for the rva-plotlines project reveals that Richmond residents need a more accessible way to discover and understand local development proposals. The current system is fragmented across the city's Online Permit Portal (EnerGov), various ArcGIS mapping tools, and the Legistar legislative portal, forcing users to navigate jargon-heavy documents and disparate data sources. The analysis identified three core jobs:

1.  **Functional Job:** For neighborhood association leaders, the goal is to quickly understand the tangible impacts (height, use, parking) of a new proposal to effectively brief members and decide on a course of action. Their current workaround involves manually searching multiple city websites, and their core pain is the fragmented, technical nature of the information and uncertainty about its timeliness.

2.  **Emotional/Trust Job:** For long-time renters in gentrifying areas, the need is for a clear, trustworthy narrative about a proposed development's potential impact on their community (e.g., rents, traffic). This is driven by a desire to feel included in decisions that affect them. Their workaround involves relying on neighbors and social media, and their pain is a lack of confidence in understanding the complex information and knowing when to act.

3.  **Systems/Coordination Job:** For small developers, the job is to have a single, chronological, and geographically-anchored view of a project's journey through various city agencies (Planning Commission, BZA, City Council). This helps them coordinate with stakeholders and avoid surprises. Their current workaround is maintaining manual spreadsheets to cross-reference case numbers and meeting dates, and their pain is the time-consuming nature of this process and the risk of missing critical updates.

Collectively, these JTBDs demonstrate a clear need for rva-plotlines to serve as an integration and translation layer, converting complex, scattered data into coherent, accessible, and actionable narratives for different community stakeholders.

# Functional Job To Be Done

## Situation

When a new rezoning, special use permit, or plan of development is filed near my block

## Persona

I, a neighborhood association leader

## Motivation

want to quickly see what it means for height, uses, parking, and timelines in plain language on a map

## Outcome

so I can brief my members and decide whether to submit comments or attend Planning Commission

## Current Workaround

Manually search the Online Permit Portal/EnerGov, browse Zoning layers and Land Use project mappers, and dig through Planning Commission agendas and staff reports on Legistar.

## Core Pain

Fragmented sources, jargon-heavy PDFs, and uncertainty about whether I’m seeing the latest status or all nearby cases.


# Emotional Trust Job To Be Done

## Situation

When I notice a public meeting agenda item or a posted notice and worry it could accelerate displacement in my neighborhood

## Persona

I, a long-time renter in a gentrifying area

## Motivation

want a clear, trustworthy, non-technical story of what’s proposed and how it might affect rents, traffic, and local services

## Outcome

so I can feel confident I’m not being left out of decisions that affect me

## Current Workaround

Ask neighbors, scan social media, try to open agendas and staff reports on Legistar, and click around the City’s Zoning/Parcel maps.

## Core Pain

Low confidence in understanding implications; inaccessible language; hard to tell what’s final vs proposed and when to act.


# Systems Coordination Job To Be Done

## Situation

When multiple agencies and committees touch a project (PDR staff review, Planning Commission, BZA, City Council)

## Persona

I, a small infill developer

## Motivation

want a single, chronological, geo-anchored view of cases, hearings, and conditions

## Outcome

so I can coordinate with neighbors, schedule attendance, and avoid surprises in approvals

## Current Workaround

Maintain spreadsheets of EnerGov case numbers, cross-reference Zoning layers and historic/SUP overlays, and monitor Legistar meetings.

## Core Pain

Time-consuming cross-walking of case IDs, layers, and dates; missed updates; unclear interdependencies between cases.


# Data Questions

## Question

Which ArcGIS layers will be primary sources (e.g., Plans of Development, Special Use Permits, BZA cases) and how frequently are they updated relative to EnerGov status changes?

## Rationale

This is critical for ensuring data timeliness and accuracy. The project needs to know if the map-based information is a reliable, up-to-date reflection of the project's status as recorded in the primary permitting system, EnerGov.

## Question

Can rva-plotlines consume the public search endpoints or exports from the Online Permit Portal for cases/inspections without logins, and what fields are available (case ID, status, milestones, applicant, location)?

## Rationale

This question addresses the technical feasibility of data acquisition. The project's ability to automatically pull comprehensive and structured data from EnerGov is fundamental to its function of tracking and narrating development proposals.

## Question

How to reliably link Legistar agenda items to EnerGov case numbers and to GIS features (parcel IDs/addresses)?

## Rationale

A core value of the project is to connect disparate pieces of information. A robust method for linking meeting agendas (Legistar) to permit applications (EnerGov) and physical locations (GIS) is essential to create a single, chronological view of a project.

## Question

Are there authoritative geographies for neighborhoods/associations in Richmond to power proximity notifications and equity rollups?

## Rationale

To effectively deliver proximity-based alerts and perform meaningful equity analysis, the project requires a definitive, official dataset of neighborhood boundaries. Without this, notifications and analysis would be based on arbitrary or inconsistent areas.

## Question

What is the retention and versioning policy for superseded staff reports and amended applications?

## Rationale

Development proposals often change. Understanding how the city handles outdated or amended documents is crucial for the project to present the most current information and avoid confusing users with superseded plans.


# User Questions

## Question

Which priority personas in Richmond (association leaders, renters, homeowners, small developers, advocacy orgs) need different narrative “translations” and alert thresholds?

## Rationale

To ensure the tool provides relevant and valuable information tailored to the specific needs, concerns, and technical understanding of different user groups, thereby maximizing engagement and utility.

## Question

What languages, reading levels, and accessibility needs are most common for Planning Commission/BZA engagement in Richmond?

## Rationale

To design an inclusive and equitable tool that is accessible to all residents, regardless of their language, literacy level, or physical abilities, ensuring broader community participation.

## Question

What are the most common entry points today (yellow signs, social, word-of-mouth, Legistar calendar, EnerGov search, Zoning map), and where do users drop off?

## Rationale

To understand the current user journey for discovering development information, allowing the project to meet users where they are and design a more effective, streamlined experience that reduces user friction and drop-off.

## Question

What default “near me” radius makes sense in Richmond’s context (parcel adjacency vs 250–1000 ft buffers) for surfacing proposals?

## Rationale

To configure the tool's proximity-based notifications to be meaningful and relevant to users in a dense urban context like Richmond, avoiding both information overload and missed alerts for impactful nearby projects.


# Integration Questions

## Question

What is the most stable way to deep-link users from a narrative back to the authoritative record (EnerGov case page, Legistar agenda packet, specific ArcGIS feature)?

## Rationale

To build trust and empower users, the tool must provide a reliable pathway to the original source documents. This question seeks to identify a technical approach for linking that won't break as city websites are updated, ensuring long-term utility.

## Question

Can the tool embed or snapshot key PDFs (staff reports, site plans) for accessibility while respecting the City’s canonical sources and updates?

## Rationale

This question addresses a core design tension between user experience and data authority. Embedding documents makes them more accessible, but risks showing outdated information. The project must determine a strategy that balances ease of access with the need to point to the official, most current record.

## Question

Should the tool push meeting reminders keyed to Legistar calendar updates for Planning Commission and BZA, and how to avoid stale or canceled meeting notices?

## Rationale

This feature would be highly valuable to users, but it carries a significant risk. Sending incorrect notifications about canceled or rescheduled meetings could erode user trust. This question explores how to implement this feature reliably or if the risk is too high.


# Equity Questions

## Question

How will proximity and impact narratives incorporate Richmond 300 Future Land Use, overlays (historic districts, design overlays), and known displacement risks to avoid bias?

## Rationale

To ensure the tool provides a complete and context-aware picture of development impacts, preventing it from presenting data in a vacuum and potentially reinforcing existing inequities or misleading users about long-term community consequences.

## Question

What safeguards ensure neighborhoods with less digital access still learn about proposals (SMS, printable summaries, multilingual content)?

## Rationale

To bridge the digital divide and guarantee that the tool's benefits reach all Richmond residents, not just those who are technologically savvy or have reliable internet access, thereby promoting more equitable civic engagement.

## Question

How to present uncertainty and tradeoffs (e.g., affordable units proposed vs conditions) to build trust without overstating impacts?

## Rationale

To maintain credibility and build long-term trust with users by communicating the nuances and conditional aspects of development proposals honestly, which is especially important in communities wary of developer promises and city processes.


# Prior Art Questions

## Question

Which notification and narrative patterns from prior civic tech (e.g., city open-data mappers and subscription alerts) best fit Richmond’s stack of EnerGov + ArcGIS + Legistar?

## Rationale

Instead of reinventing the wheel, this question aims to identify proven design patterns from other projects that are compatible with Richmond's specific technical infrastructure. This can accelerate development and lead to a more effective user experience.

## Question

How have other cities linked permitting systems, GIS layers, and legislative calendars to provide end-to-end project timelines, and what pitfalls should Richmond avoid?

## Rationale

This question seeks to leverage the experiences of other municipalities. Understanding the challenges, failures, and successes of similar data integration projects can provide a valuable roadmap for 'rva-plotlines', helping to anticipate problems and adopt best practices.

