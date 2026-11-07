# Project Overview

## Project Name

simby

## Pillar

Thriving Neighborhoods

## Problem Statement

Neighborhood Development Discovery - Make it easier for residents to find and understand development proposals near them.

## Project Description

Development discovery tool helping residents find and understand whats being built or proposed near them.


# Functional Job To Be Done

## Situation

When a new rezoning/SUP/BZA case is filed within a few blocks of my home

## Persona

a Richmond resident and property owner

## Motivation

I want to quickly see what is proposed, key dates, and how to comment

## Outcome

so I can make an informed decision and participate before hearings

## Current Workaround

Watch for yellow/white public notice signs, check mail for notices, search Legistar agendas, click through OPP/CSS and PDR maps.

## Core Pain

Fragmented sources, unclear status/timelines, hard-to-find documents, inconsistent map/portal search and update latency.


# Emotional Trust Job To Be Done

## Situation

When I hear about a development rumour in my neighborhood Facebook group

## Persona

a neighborhood association leader

## Motivation

I want a trustworthy, plain-language summary with official links and a change history

## Outcome

so I can brief neighbors confidently and not feel blindsided

## Current Workaround

Ask planners by email, skim PDFs in Legistar, crowdsource info in social media.

## Core Pain

Jargon-heavy documents, uncertainty about accuracy/recency, anxiety about missing deadlines.


# Systems Coordination Job To Be Done

## Situation

When multiple agencies touch a proposal (PDR Land Use, BZA, CAR, City Council)

## Persona

a community advocate

## Motivation

I want a single timeline showing dependencies, past actions, and upcoming hearings

## Outcome

so I can coordinate testimony and outreach effectively

## Current Workaround

Manually build spreadsheets/calendars from Legistar and portal breadcrumbs.

## Core Pain

No cross-body canonical case ID, shifting dates/continuances, and no unified feed or alerts.


# Data Questions

- Which ArcGIS layers are authoritative and have stable REST endpoints for cases (e.g., BZA cases, Special Use Permits, Plans of Development, Zoning Districts)? What are their update cadences and change logs?
- Does the EnerGov CSS/OPP expose a public search endpoint or RSS/JSON for recent applications, inspections, or issued permits that simby can legally and reliably scrape or integrate?
- Can Legistar for Planning Commission, BZA, CAR, and Council be queried via the Legistar API for agenda items, actions, and attachments, and how can Legistar item IDs be mapped to land-use case IDs?
- Is there a consolidated 'Land Use Project Mapper' feed planned for when that application is updated, and can its underlying feature layer(s) be accessed directly?
- Are there public datasets for mailed-notice boundaries or contact lists (for owners within 150 ft), or must simby compute these buffers from parcel data at runtime?

# User Questions

- What geographic filters do Richmond users prefer (e.g., address, parcel, neighborhood, council district, Old & Historic district), and what alert radius feels appropriate (the legal 150 ft vs. a broader 500–1,000 ft community radius)?
- What plain-language fields do residents need most (e.g., what is changing, number of units, height, parking, design district triggers, hearing dates, how to comment)?
- What notification modes are most important for trust and accessibility (e.g., email, SMS, print flyers, Spanish/other languages), and what are the expectations for notification frequency and handling last-minute continuances?

# Integration Questions

- Can simby deep-link to the OPP case/permit detail, relevant Legistar agenda items, and ArcGIS parcel popups, while preserving context (address/parcel/case number)?
- What is the city’s stance on automated harvesting of data from the OPP/CSS and ArcGIS popups, and are there rate limits or terms of use that would require a Memorandum of Understanding (MOU)?
- How will simby reconcile differing statuses across various sources (e.g., EnerGov's 'under review' vs. Legistar's 'referred/continued' vs. a BZA agenda's 'deferred')? A status normalization definition is needed.

# Equity Questions

- How will simby incorporate language access and screen-reader compliance, and how will it surface projects in historically disinvested areas (e.g., Jackson Ward) without introducing bias?
- Should alerts default to a larger-than-legal notice radius or offer neighborhood-level subscriptions to counteract the inequities of mailed notice rules that are restricted to property owners?
- Can simby highlight key equity signals, such as displacement risk, affordability commitments, design overlays, and historic district reviews, by drawing from Richmond 300 and related datasets?

# Prior Art Questions

- Which features from NYC's ZoLa/ZAP, Seattle’s 'Shaping Seattle', Boston BPDA’s map, and Philly Atlas are most applicable to Richmond’s context (e.g., document bundling, timeline view, public comment guidance), and which might be infeasible given Richmond's local data structures?

# Analysis Of Current Workflow

## Summary

The current user journey for a Richmond resident to discover and understand local development proposals is highly fragmented and manual. It involves navigating a disconnected ecosystem of city websites, portals, and mapping tools. Residents often discover projects through offline methods like physical signage or mailed notices, which then require them to piece together information from various online sources. There is no single, unified platform that provides a comprehensive overview of a project, its status, relevant documents, and key dates, forcing users to become amateur researchers, cross-referencing information across multiple systems.

## Pain Points

Users face significant difficulties, including data fragmentation across multiple city portals, leading to confusion and wasted time. The information provided is often laden with technical jargon and presented in dense PDF documents, making it inaccessible to the average resident. There is a high degree of uncertainty regarding the accuracy and recency of information, causing anxiety about missing deadlines for public comment. The search functionality on existing portals is often inconsistent and difficult to use, especially for address-based queries. Furthermore, there is a lack of subscription or alert features, preventing residents from proactively tracking projects by location or case type. This creates a reactive, high-effort process where residents feel they might be blindsided by new developments.

## Involved Platforms

A resident must navigate a variety of separate city platforms to gather a complete picture of a development proposal. These include: the EnerGov-based Online Permit Portal (OPP/Citizen Self Service) for permit applications and status checks; the Legistar system for meeting agendas, case files, and minutes for bodies like the Planning Commission, Board of Zoning Appeals (BZA), Commission of Architectural Review (CAR), and City Council; the Planning and Development Review's (PDR) Interactive Mapping Tools, such as the Zoning Parcel Mapper and Development Mapper; the ArcGIS GeoHub for specific data layers like BZA cases; and the city's general Socrata Open Data Portal.

## User Actions Required

To stay informed, a user must perform numerous specific tasks. These include physically looking for yellow and white public notice signs posted on properties, checking their mail for notices sent to nearby property owners, and proactively searching through Legistar agendas for relevant items. Online, they must manually browse the Online Permit Portal and various ArcGIS mappers, which can be difficult to search by address. Users often resort to emailing city planners directly for clarification, crowdsourcing information on social media platforms like Facebook, and manually building their own spreadsheets or calendars to track case timelines, dependencies, and continuances across different government bodies like the Planning Commission and City Council.


# Richmond Data Ecosystem Summary

## Source Name

Zoning Parcel Mapper

## Platform Technology

ArcGIS

## Data Types Available

The Zoning Parcel Mapper provides information about existing zoning, special use permits (SUPs), and other special zoning on a parcel. Available data layers include Zoning Districts, Zoning Confirmation Letters, Board of Zoning Appeals (BZA) Cases, Special Use Permits, Plans of Development, and City Old & Historic Districts.

## Accessibility Notes

This is a publicly accessible interactive mapping tool available on the City of Richmond's Planning and Development Review website. Users can search for properties and view various data layers. However, the ecosystem is in flux, as noted by the city that the related 'Land Use Project Mapper' is currently being updated, which could affect data availability or consistency. The data for BZA cases is also available as a separate layer on the city's ArcGIS GeoHub, which contains hyperlinks to documentation.


# Public Notice Process Summary

## Responsible Body

For rezoning applications, the process involves two primary bodies. The Planning Commission first considers the proposed rezoning and forwards a recommendation to the City Council. The City Council then holds its own public hearing and is the final decision-making authority. Other bodies like the Board of Zoning Appeals (BZA) handle different types of cases, such as variances and special exceptions.

## Notice Method

Public notification for a rezoning hearing is conducted through multiple methods to meet legal requirements. This includes posting a public notice sign on the subject property, publishing an advertisement in a daily newspaper, and mailing written notices to the owners of all properties within a specified distance.

## Mailing Notice Radius Feet

150.0

## Process Description

The public hearing process for a rezoning begins after an application is submitted, which must be preceded by a pre-application conference with city staff. Once the application is accepted, a thirty-day public notice period commences. During this time, a sign is posted on the site, an ad is run in a newspaper, and notices are mailed to property owners within 150 feet. One week before the final hearing, the Planning Commission reviews the proposal and sends a recommendation to the City Council. The City Council then holds the definitive public hearing to approve or deny the rezoning request.

