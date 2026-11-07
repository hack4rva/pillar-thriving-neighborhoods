# Project Summary

## Pillar

Thriving Neighborhoods

## Problem Statement

Neighborhood Development Discovery - Make it easier for residents to find and understand development proposals near them.

## Project Name

rva-neighborhood-watch

## Description

Neighborhood development monitoring to keep residents informed about local development activity.


# Functional Job To Be Done

## Situation

When a new rezoning, special use permit, or major building permit is filed near my home,

## Persona

a Richmond resident

## Motivation

I want to receive a clear, map-based summary of what’s proposed and its review timeline,

## Outcome

so I can understand impacts early and decide whether to engage (comment, attend meetings, contact reps).

## Current Workaround

Manually check the Online Permit Portal, Legistar agendas, and parcel/zoning maps; rely on neighborhood Facebook/Nextdoor or word of mouth.

## Core Pain

Fragmented systems, hard-to-search case records, no geo-targeted alerts, and technical language not translated for laypeople.


# Emotional Job To Be Done

## Situation

When development activity ramps up around my block,

## Persona

a long-time resident/renter

## Motivation

I want transparent, plain-language information from trustworthy sources,

## Outcome

so I feel confident I’m not missing decisions that affect affordability, parking, trees, and neighborhood character.

## Current Workaround

Ask a more “plugged-in” neighbor, scan meeting PDFs, or call PDR; often learn too late.

## Core Pain

Anxiety and distrust due to late notice, jargon-heavy documents, and perception that decisions are made before community input.


# Systems Job To Be Done

## Situation

When a case is scheduled (CAR/BZA/Planning Commission/City Council),

## Persona

a civic association leader

## Motivation

I want a unified feed that links parcels, permits, staff reports, agendas, and meeting logistics,

## Outcome

so I can coordinate timely outreach and organize attendance or comments across our neighborhood.

## Current Workaround

Copy-paste links from multiple sites into email/newsletters; maintain ad-hoc spreadsheets.

## Core Pain

Duplicative effort, missed deadlines, inconsistent identifiers across systems, and no easy way to segment by boundaries (HOA/Civic Association/City Council district).


# Data Questions

- Which data endpoints are available for the Online Permit Portal (Tyler EnerGov) — is there a public API or must we scrape case/permit details and statuses?
- Can we reliably map case records to parcels and addresses using the Parcel Mapper and zoning layers? What unique IDs (parcel ID/GPIN) should be canonical?
- Are datasets for BZA cases, Special Use Permits, and CAR certificates exposed as GIS layers with update frequency documented?
- How will we reconcile case lifecycles across Legistar (agendas/minutes) and PDR systems (submittal/review/inspection)?
- What are the update cadences and latency from submittal to public visibility for permits and land use cases?

# User Questions

- Which user segments should MVP prioritize: renters, homeowners, civic association leaders, small business owners, or advocates? What are their preferred channels (SMS, email, WhatsApp)?
- What radius/buffer feels “near me” to Richmond residents (e.g., 500 ft, 0.25 mi, by neighborhood boundary, or by council district)?
- What plain-language summaries and visuals (height, units, land use change, parking) best reduce confusion for first-time users?
- How do residents prefer to submit comments or sign up to speak — deep links into Legistar, forms, or guided instructions?

# Integration Questions

- Can Legistar subscriptions be automated per geofence or topic (Planning Commission, BZA, CAR) and tied back to the parcel/case page?
- Is there an official webhook/ICS/RSS for agendas and item updates we can ingest, and how to match items to parcels?
- Can RVA311 or City newsletters be used as outbound channels for opt-in alerts? Are there rate or content guidelines?
- Do neighborhood associations have existing listservs or Slack/Discord we can integrate for cross-posting alerts?

# Equity Questions

- How will we reach residents without reliable internet or who primarily use mobile devices? Is SMS alerting feasible and affordable?
- How do we support language access (Spanish and other common languages in Richmond) for summaries and notifications?
- What safeguards ensure equal visibility for under-resourced neighborhoods where civic bandwidth is limited?
- Can we incorporate transit access, tree canopy, floodplain, and displacement risk overlays to contextualize impacts in vulnerable areas?

# Prior Art Questions

- Are there existing civic tools in Richmond (or statewide) that already track permits/cases by geography that we should extend rather than duplicate?
- How have Richmond civic groups historically shared case alerts (e.g., via Legistar email subscriptions, Facebook groups, or neighborhood newsletters), and what failed/pain points should inform our design?
- What lessons from Code Refresh outreach, CAR notifications, or Planning Commission engagement can be embedded into onboarding and copy?

# Richmond Systems Overview

Currently, Richmond, VA, residents seeking information on neighborhood development must navigate a fragmented and complex web of city systems. There is no single source for tracking a development proposal from inception to completion. The process typically involves consulting multiple, disconnected platforms managed by the Planning & Development Review (PDR) department. Residents must use the Online Permit Portal (OPP), powered by EnerGov, to search for specific permits, submit plans, or check the status of an application. For information on public hearings and decisions, they must turn to the Legistar system, which hosts agendas and minutes for the Planning Commission, Board of Zoning Appeals (BZA), and Commission of Architectural Review (CAR). To understand the location and zoning context of a proposal, residents use various interactive GIS mapping tools, such as the Richmond Parcel Mapper and specific map layers for zoning districts, BZA cases, and Special Use Permits. The information is often presented in technical jargon, and case identifiers can be inconsistent across platforms. This disjointed process means residents must manually check multiple websites, rely on word-of-mouth through neighborhood groups, or be 'plugged-in' to know about proposed changes, leading to anxiety and a sense that decisions are made without adequate community input.
