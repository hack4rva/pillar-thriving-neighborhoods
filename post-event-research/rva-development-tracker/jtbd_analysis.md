# Project Analysis Summary

A Jobs To Be Done (JTBD) analysis was conducted for 'rva-development-tracker', a proposed civic tech project in Richmond, VA, aimed at making it easier for residents to discover and understand local development proposals. The analysis identified three core needs:

1.  **Functional:** Residents want a simple way to discover, map, and track new development proposals near their address to understand impacts and engage in the process. Currently, they face the pain of manually searching fragmented systems like the Online Permit Portal (EnerGov), Planning Commission agendas (Legistar), and various GIS maps, with no easy way to get 'near me' alerts.

2.  **Emotional/Trust:** Community members want a neutral, plain-language source of information with official links to feel confident they have facts, not rumors from social media or word-of-mouth. The core pain is low confidence due to jargon-filled official documents and difficulty verifying the latest project status.

3.  **Systems/Coordination:** Civic advocates and neighborhood leaders need a consolidated timeline of all actions related to a proposal (application, staff reports, meetings) to effectively coordinate community input. Their current workaround involves manual tracking in spreadsheets, which is inefficient and prone to missing key engagement windows.

The analysis also generated a series of open questions to guide the project's development, categorized by:
*   **Data:** Investigating the accessibility and reliability of public data from EnerGov, GIS layers, and the city's Open Data Portal.
*   **User:** Determining resident priorities, such as alert types, notification channels, and desired information (e.g., plain-language summaries vs. timeline views).
*   **Integration:** Assessing the feasibility of deep-linking to official city records on EnerGov and Legistar and embedding official GIS maps.
*   **Equity:** Ensuring the tool aligns with the Richmond 300 Master Plan's goals for inclusive engagement, especially in Priority Neighborhoods, and addresses accessibility and language needs.
*   **Prior Art:** Differentiating the project from existing tools like the Richmond Regional Development Tracker by focusing on official workflows and resident engagement rather than regional marketing.

# Functional Job To Be Done

## Situation

A new rezoning, Special Use Permit (SUP), or major development is proposed near my address.

## Persona

A Richmond resident/neighbor

## Motivation

To quickly discover, map, and track the proposal and its key milestones.

## Outcome

To understand the potential impacts of the development and be able to engage in the decision-making process before it's finalized.

## Current Workaround

Manually searching the EnerGov/Online Permit Portal (OPP) public view, scanning Planning Commission agendas on Legistar, and clicking through multiple separate GIS maps (Parcel, Zoning, Development) to piece together the project's status and context.

## Core Pain

The current systems are fragmented, making it difficult to find specific case IDs or addresses. Timelines are unclear, and there are no simple alert features for projects located 'near me'.


# Emotional Trust Job To Be Done

## Situation

I hear about a development project through word-of-mouth or see a public notice sign.

## Persona

A concerned community member

## Motivation

To find a neutral, plain-language summary of the project that includes official links and a clear history.

## Outcome

To feel confident that I have the actual facts about the project, not just rumors or incomplete information.

## Current Workaround

Relying on social media threads, neighborhood group discussions, or media snippets, and then attempting to reconcile that information with dense, official PDFs and government portals.

## Core Pain

There is low confidence in the available information due to technical jargon, documents that seem to change, and the overall difficulty in verifying the latest official status of a project.


# Systems Coordination Job To Be Done

## Situation

Multiple agencies, commissions, and datasets are all related to a single development proposal.

## Persona

A civic advocate or Citizen Advisory Council (CAC) leader

## Motivation

To have a consolidated timeline of all actions related to the proposal, including the application, staff report, Planning Commission agenda, City Council votes, and inspections.

## Outcome

To be able to effectively coordinate neighborhood input and ensure community members show up to the right meetings at the right time.

## Current Workaround

Maintaining personal spreadsheets, setting calendar reminders for Legistar meetings, and performing ad-hoc case tracking across various government portals.

## Core Pain

The primary difficulties are synchronizing updates from different sources, dealing with broken links (link rot) to official documents, and missing key engagement windows because public notices are dispersed and not centralized.


# Data Questions

- What public endpoints/feeds from the Online Permit Portal (EnerGov) are accessible without login for searching projects citywide and by proximity to an address? Any API or scrape‐resistant features?
- Which GIS layers should be primary for context (Zoning Districts, SUPs, Plans of Development, BZA cases, Historic Districts) and what are their refresh cadences? Any authoritative case IDs to join across systems?
- Does the City’s Open Data Portal expose permit/inspection datasets with addresses/coordinates suitable for geofencing alerts? If not, can ArcGIS REST services provide stable endpoints?
- Are Land Use Project Mapper datasets currently being updated during its maintenance note, and what is the handoff source of truth while it’s updated?
- What metadata is available from Legistar for Planning Commission items (case numbers, location, staff reports) to power cross‐links and timelines?

# User Questions

- Which neighborhoods/prioritized areas (per Richmond 300 Priority Neighborhoods) most need early notifications and multilingual plain‐language summaries?
- What are top resident tasks: “near me” alerts, plain-language summaries, timeline view, document diffs, or meeting RSVP/reminders? Rank by impact/effort.
- What is the preferred notification channel (email/SMS/push) and radius/filters (distance, case type, square footage, units added)?

# Integration Questions

- Can the tool deep-link to specific OPP/EnerGov records and to Legistar agenda items reliably (stable URLs, parameters)?
- Can we embed or reference official GIS web maps (Parcel/Zoning/Development) via ArcGIS links or consume REST layers directly for synchronized map views?
- What is the governance process with PDR to validate labels/statuses so the tracker reflects official terms and avoids misinformation?

# Equity Questions

- How will the tracker align with Richmond 300 goals for inclusive housing and planning engagement—e.g., surfacing affordable housing components, displacement risk signals, and Priority Neighborhoods context?
- What accessibility and language support are necessary (screen readers, Spanish, etc.) and how to ensure SMS‐first signup for digital divide users?

# Prior Art Questions

- How might the tool complement—not duplicate—the Richmond Regional Development Tracker (BizSense/PlanRVA) by focusing on official case workflow, alerts, and meeting engagement rather than regional marketing summaries?
- Are there existing Code for RVA or other civic tech repos we can fork/extend for case aggregation, map-based alerts, and Legistar/EnerGov adapters?
