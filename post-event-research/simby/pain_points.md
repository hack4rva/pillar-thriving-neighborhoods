# Executive Summary

Richmond residents and neighborhood leaders face significant barriers when attempting to track local urban development. Critical information is fragmented across disparate and difficult-to-navigate city systems, including the Online Permit Portal (OPP), Legistar for meeting agendas, and multiple ArcGIS mapping tools. The official notification process is narrowly defined, limited to mailed notices sent only to property owners within a 150-foot radius of a project, systematically excluding renters and nearby neighbors. Furthermore, the available project documents are highly technical and lack plain-language summaries, making it challenging for the average resident to understand what is being proposed. The 'simby' project, under the 'Thriving Neighborhoods' pillar, aims to rectify these issues by creating a centralized, accessible development discovery tool. The project's goal is to aggregate data from all relevant sources into a single, trustworthy interface, provide clear and concise summaries of proposals, and implement a robust, opt-in notification system to ensure all interested residents can find, understand, and participate in the development process before key decisions are made.

# Project Background

The 'simby' project is an initiative under the City of Richmond's 'Thriving Neighborhoods' pillar. Its core problem statement is 'Neighborhood Development Discovery - Make it easier for residents to find and understand development proposals near them.' The project is envisioned as a development discovery tool designed specifically to help residents find and understand what is being built or proposed in their neighborhoods. The primary goal is to address the current fragmented and confusing process by creating a single, user-friendly resource. This tool aims to empower residents, from individual property owners to neighborhood association leaders, by providing them with timely, clear, and comprehensive information, enabling them to make informed decisions and participate effectively in public hearings and feedback processes.

# Resident Persona Analysis

## Persona Name

Richmond resident and property owner (near a new rezoning/SUP/BZA case)

## Job To Be Done

When a new rezoning, Special Use Permit (SUP), or Board of Zoning Appeals (BZA) case is filed within a few blocks of my home, I want to quickly see what is proposed, identify key dates, and understand how to comment, so I can make an informed decision and participate before hearings take place.

## Pain Points

1. Fragmented and Unclear Information Sources: Key information is scattered across the Online Permit Portal (EnerGov/OPP) for plans, the Legistar calendar for agendas, and multiple ArcGIS maps for zoning and case details. The Development Mapper explicitly warns it is 'updated periodically,' indicating potential data staleness.
2. Exclusionary Notification Radius: Official notices for rezonings and Special Use Permits are mailed only to property owners within a 150-foot radius, leaving many close neighbors and all renters uninformed unless they see a physical sign or actively track city agendas.
3. Restrictive and Time-Sensitive Processes: State law allows for short windows between public notices and hearings. This, combined with mail-dependent notifications and the small radius, creates a high risk of residents missing critical deadlines for input.
4. Poor Portal Usability: The Online Permit Portal has significant friction, requiring strict address entry formats (no punctuation, no full street types) and failing for single-digit addresses, for which it instructs users to 'come into the office.'
5. Technical and Inaccessible Documentation: Project applications consist of technical documents like site plans, elevations, and lighting plans, with no official plain-language summaries available to help residents quickly understand what is being proposed and how to comment.

## Current Workarounds

To overcome the fragmented system, residents must engage in a series of inefficient activities. These include physically watching for yellow and white public notice signs in the neighborhood, checking their mail for official notices (if they are within the 150-foot owner radius), manually checking Legistar agendas for hearing dates, repeatedly searching the Online Permit Portal (OPP) by address or permit number, navigating various ArcGIS maps and their layers, and directly contacting Planning and Development Review (PDR) staff or their neighborhood association for information.


# Neighborhood Leader Persona Analysis

## Persona Name

Neighborhood association leader

## Job To Be Done

When I hear about a development rumor in my neighborhood, for example in a community Facebook group, I need to find a trustworthy, plain-language summary of the project that includes official links and a history of any changes.

## Key Needs

The primary need is for a trustworthy, plain-language summary with official links and a change history. This allows the leader to act as a reliable source of information for their community, verify rumors, and track project evolution without having to manually compile information from disparate and technical sources.

## Pain Points

1. Burden of Verifying Rumors: Leaders must manually triangulate information across multiple official systems, including the Online Permit Portal (OPP), Legistar agendas, and various mapping layers, just to confirm the status and key dates of a rumored project.
2. Lack of Plain-Language Summaries: Project submittals are highly technical (e.g., site plans, elevations, landscaping plans), and there is no standardized, resident-friendly synopsis provided by the city. This forces volunteer leaders to interpret and summarize complex information for their members.
3. Pressure for Proactive Engagement: Board of Zoning Appeals (BZA) guidance pressures applicants to consult with civic associations, threatening case continuances and fees for failure to do so. This creates time-sensitive coordination pressures on volunteer leaders to review proposals and respond quickly.
4. Inconsistent Data and Unreliable Updates: The explicit warning that development maps are 'updated periodically' signals that leaders cannot rely on a single map for authoritative, real-time status, forcing them to constantly re-verify information.
5. Limited Official Outreach: The narrow 150-foot mailed notice radius for property owners means that neighborhood associations must take on the responsibility of organizing broader community outreach to ensure all affected residents are informed.


# Current Workarounds And System Failures

Residents in Richmond currently rely on a combination of high-effort, often unreliable methods to learn about development proposals. These workarounds include physically watching for yellow or white public notice signs posted on properties, checking their mail for mailed notices, manually searching Legistar agendas for relevant items, and navigating the Online Permit Portal (OPP/CSS) and various Planning and Development Review (PDR) maps. Neighborhood association leaders resort to building internal trackers, maintaining contact lists, and manually compiling summaries for their members. These methods are necessary because the official systems are fraught with failures. A primary failure is the notification process itself; official notices are mailed only to property owners within a restrictive 150-foot radius, completely excluding renters and nearby neighbors who live just beyond this boundary. This reliance on mail is further complicated by short, legally mandated time windows between when a notice is published and when a hearing occurs, creating a high risk that residents will miss critical dates for input. The digital systems meant to provide information are also broken. The Online Permit Portal (OPP) has a notoriously difficult search function that requires precise, non-intuitive address formats and fails for single-digit addresses, with the official guidance being for the user to physically go to the city office. This creates a significant barrier to basic discovery. Furthermore, the city's own maps, such as the Development Mapper, come with disclaimers that they are only 'updated periodically,' meaning residents cannot trust them for up-to-the-minute, authoritative information. The cost of this status quo is significant, leading to missed hearings, a loss of resident voice in development matters, hours of wasted time monitoring disparate systems, and inequitable participation that favors those with the time, resources, and technical skills to navigate this convoluted process.

# Pain Point Information Fragmentation

The core pain point for Richmond residents trying to understand local development is the severe fragmentation of information across multiple, disconnected city systems. There is no single, authoritative source where a resident can find all information related to a specific development case. Instead, they must piece together a puzzle from various official websites. The Online Permit Portal (OPP), also known as EnerGov, contains information on permits and plans. The city's Legistar system is where one must go to find meeting agendas, hearing dates, and the eComment function for public input. Compounding this, crucial spatial and case information is spread across several different ArcGIS maps, such as the 'Zoning Parcel Mapper' which has layers for Board of Zoning Appeals (BZA) cases, Special Use Permits (SUPs), and Plans of Development, and a separate 'Development Mapper'. This creates a disjointed and confusing user experience, requiring residents and neighborhood leaders to manually triangulate data from these disparate sources to get a complete picture. The problem is worsened by inconsistent update cadences and data latency; for instance, the Development Mapper explicitly warns users that it is 'updated periodically,' implying the information may be stale and unreliable. This lack of a consolidated case page with a clear status, timeline, and all associated documents forces residents into a constant, time-consuming cycle of checking and cross-referencing multiple portals, with no guarantee that they have the most current information.

# Pain Point Public Notice System

## Method

Mailed Notice

## Description

For significant land use cases like Rezoning and Special Use Permits, the city mails notices to inform property owners about upcoming public hearings.

## Inadequacies

The notification radius is extremely limited, reaching only 'owners of all properties within 150 feet' of the subject property. This systematically excludes residents living just beyond this small boundary and all renters, who receive no direct mailed notice. This, combined with short statutory windows for hearings, means many affected community members are left uninformed and miss critical opportunities to provide input.

## Evidence Source

Richmond Rezoning Application & Special Use Permit (SUP) Application


# Pain Point Portal And Map Usability

## Tool Name

Online Permit Portal (EnerGov/OPP)

## Purpose

The portal is intended for searching development-related records, including permits and plans.

## Usability Issues

The portal suffers from significant usability problems that create friction for basic discovery. Its search function requires a strict and non-intuitive address format, telling users to omit punctuation and full street names. More critically, the system fails when searching for single-digit addresses (e.g., '1 W Broad'), and the official guidance instructs users in this situation to 'come into the office until this problem is resolved,' creating a physical barrier to accessing public information online.


# Pain Point Technical Jargon And Process Opacity

A significant barrier for residents is the opacity of the development process, which is shrouded in technical jargon and complex documentation. When a development is proposed, the application materials and submittals consist of highly technical documents such as site plans, architectural elevations, lighting plans, and landscaping plans. These documents are not accompanied by any standardized, plain-language summaries. This forces residents and even volunteer neighborhood association leaders to sift through dense, technical PDFs to understand the basic and most critical aspects of a project, such as its proposed use, height, number of units, and parking provisions. The process of how to provide comment and the key deadlines are often buried within these documents or across different systems. This lack of accessible information makes it incredibly difficult for an average person to make an informed decision and participate effectively in the public process. This opacity has serious equity implications. It disproportionately excludes residents who lack the time, professional background, or technical skills to interpret zoning codes and architectural drawings. Furthermore, despite a citywide language access policy, these critical planning artifacts are almost exclusively available in English, creating a significant barrier for residents with Limited English Proficiency (LEP). The 'simby' project is envisioned to address this directly by providing auto-generated, plain-language summaries that distill key project details and clearly outline the timeline and methods for public participation.

# Cross Cutting Equity Dimensions

## Affected Group

Renters

## Barrier

The public notification process for rezonings and special use permits relies on mailing notices exclusively to property owners. Since renters do not own the property they live in, they are systematically excluded from this primary channel of communication.

## Impact

Renters are often unaware of proposed development projects in their immediate vicinity that could affect their housing, neighborhood character, and quality of life. This lack of direct notification leads to their exclusion from the civic process, resulting in a loss of voice and an inability to participate in public hearings or provide feedback before decisions are made.


# Comparative Analysis Of Other Cities

## City Name

Durham

## State

NC

## Notification System Details

Durham provides email-based Planning public notification services for anyone who signs up, including individuals and neighborhood organizations. It also features a 'Rezoning Explorer' application that allows the public to view and comment on zoning map change applications.

## Key Takeaway

Consolidated, proactive notifications (like email subscriptions) and map-driven case discovery tools can significantly reduce friction for residents trying to track development.

## City Name

Pittsburgh

## State

PA

## Notification System Details

Pittsburgh centralizes its planning public notices and hearing information into a dedicated portal on its official website. This single location is used to review various upcoming items, including City Council public hearings and Zoning Map Amendments.

## Key Takeaway

Creating a single, dedicated portal for all planning-related public notices demonstrates a best practice for simplifying information access for the public.


# Evidence From Richmond Sources

## Source Name

Interactive Mapping Tools

## Source Type

City Website

## Key Finding

The city's 'Development Mapper' is noted as being 'updated periodically,' which implies that the information may not be current. The 'Zoning Parcel Mapper' is a separate tool that contains layers for BZA cases, Special Use Permits, and Plans of Development, illustrating the fragmented nature of information.

## Url

https://www.rva.gov/planning-development-review/interactive-mapping-tools

## Source Name

Rezoning Application Form

## Source Type

Application Form

## Key Finding

Public notices for rezoning hearings are mailed only to the 'owners of all properties within 150 feet of the subject property,' excluding renters and nearby neighbors outside this small radius.

## Url

https://rva.gov/sites/default/files/2025-10/Rezoning-Conditional%20Rezoning%20Application%20Form%20-%202025.pdf

## Source Name

Special Use Permit Application Form

## Source Type

Application Form

## Key Finding

Similar to rezoning, notices for Special Use Permits are mailed only to property owners within a 150-foot radius, limiting awareness for the broader neighborhood.

## Url

https://www.rva.gov/sites/default/files/2025-04/2025%20Special%20Use%20Permit%20Application%20Form.pdf

## Source Name

VA Code §15.2-2204

## Source Type

State Law

## Key Finding

State law allows for short windows between public notice and hearings. Newspaper ads can appear as late as seven days before a meeting, and written notice to the property owner is only required five days before the hearing.

## Url

https://law.lis.virginia.gov/vacode/title15.2/chapter22/section15.2-2204/

## Source Name

Online Permit Portal (OPP) FAQ

## Source Type

City Website

## Key Finding

The portal's search functionality is not user-friendly. It requires users to omit punctuation and street types. For single-digit addresses (e.g., '1 W Broad'), the search fails, and the city instructs users to 'come into the office.'

## Url

https://www.rva.gov/planning-development-review/online-permit-portal

## Source Name

Online Permit Portal (OPP) User Guide

## Source Type

User Guide

## Key Finding

The user guide confirms the search difficulties, instructing users not to enter a street type and acknowledging that for single-digit addresses, they may need to email or visit the Permit Office in person.

## Url

https://www.rva.gov/sites/default/files/2019-12/OPP%20User%20Guide.pdf

## Source Name

BZA Presentation Handout

## Source Type

Handout/Guidance Document

## Key Finding

The Board of Zoning Appeals (BZA) can penalize applicants who fail to consult with neighbors or neighborhood associations by continuing the case and charging a $150 continuance fee, placing a time-sensitive burden on volunteer association leaders.

## Url

https://www.rva.gov/sites/default/files/2020-11/BZA%20Presentation%20Handout%20-%20November%202020.pdf

## Source Name

City of Richmond Language Access Policy

## Source Type

City Policy

## Key Finding

The city has an official policy to provide free interpretation and translation services to ensure residents with Limited English Proficiency (LEP) have meaningful access, yet most planning documents and systems are English-centric.

## Url

https://www.rva.gov/immigrant-engagement/language-access


# Key Findings And Prioritized Pain Points

The research identified several critical, cross-cutting pain points that create significant friction for Richmond residents and neighborhood leaders trying to engage with urban development. These are prioritized as follows:

1.  **Information Fragmentation and Data Latency:** The most significant pain point is that information is scattered across multiple, non-integrated city platforms. Residents must manually check the Online Permit Portal (OPP/EnerGov), the Legistar calendar system for agendas, and various ArcGIS maps (Zoning Parcel Mapper, Development Mapper). This process is time-consuming, confusing, and prone to error. Compounding this is the issue of data latency; for instance, the Development Mapper explicitly warns it is only 'updated periodically,' meaning residents cannot trust it for authoritative, up-to-the-minute information.

2.  **Exclusionary and Inadequate Notification Process:** The current notification system is a major source of inequity. Official notices for rezonings and Special Use Permits are mailed only to property owners within a restrictive 150-foot radius. This practice systematically excludes renters, who have no direct line of notification, and residents living just beyond the 150-foot boundary. Reliance on mail and short statutory windows between notice and hearing further increases the risk that even eligible residents will miss their opportunity to comment.

3.  **Inaccessible and Technical Documentation:** Development proposals are submitted as complex, technical documents such as site plans, elevations, and lighting plans. There is no requirement or mechanism for providing standardized, plain-language summaries. This forces residents and volunteer neighborhood leaders to sift through dense PDFs to understand the basic scope of a project, creating a high barrier for those without technical expertise.

4.  **Poor Usability of Official Portals:** The city's primary online tools suffer from usability issues that hinder discovery. The OPP has a rigid search function that fails with common address formats and has a known bug with single-digit addresses that requires users to physically 'come into the office,' creating a significant access barrier.

# Recommendations For Simby Project

Based on the research findings, the following actionable recommendations are proposed for the 'simby' project to effectively address the identified pain points for Richmond residents:

1.  **Develop a Unified Case Tracker:** Create a single, authoritative web page for each development case that aggregates data from the Online Permit Portal (OPP), Legistar, and ArcGIS maps. This page should serve as the central source of truth, clearly displaying the project's current status, a history of changes, and links to all official documents. To build trust, it should include 'last-synced' timestamps to indicate data freshness.

2.  **Implement Plain-Language Summaries:** The tool should automatically generate, or require as part of the submission process, a plain-language summary for each project. This summary must include key, easily digestible information such as the proposed land use, number of residential units, building height, parking details, and a concise project description. This feature is critical for lowering the barrier to understanding for non-technical users.

3.  **Create a Robust and Inclusive Notification System:** Go beyond the legally mandated 150-foot mailings to property owners. Simby should feature a proactive, opt-in notification system via email and SMS. Users should be able to subscribe to alerts for a specific address with a configurable radius (e.g., 500 feet, 1000 feet), ensuring renters, nearby neighbors, and other interested parties can receive timely updates.

4.  **Provide Clear Milestone Tracking and Timelines:** Each case page should feature a visual timeline that tracks key milestones in the development process, from initial filing to staff report availability, Planning Commission hearings, and final City Council or BZA votes. This should prominently feature key dates and deadlines, especially the last day to submit public comment.

5.  **Prioritize Accessibility and Equity:** To address the digital divide and language barriers, the platform should be designed with accessibility in mind. This includes offering low-bandwidth views, creating simple, printable one-page summaries for offline sharing, and integrating multilingual support to align with the city's Language Access Policy. This could involve auto-translating key summary fields while always linking back to the original English documents.
