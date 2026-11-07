# Executive Summary

The Jobs To Be Done (JTBD) analysis for Richmond's participation-analytics-dashboard project reveals three key needs for the Planning and Development Review (PDR) staff. Functionally, planners need to move from manual, ad-hoc spreadsheets to a system that quickly cross-references public participation data with census demographics to identify and address engagement gaps. Emotionally, staff need transparent and defensible metrics to build trust with the community and decision-makers, proving that engagement efforts were inclusive. Systemically, program leads require a shared dashboard to standardize data inputs, coordinate outreach across departments, and track outcomes in alignment with the Richmond 300 master plan. To successfully implement this dashboard, a series of 15 critical open questions must be addressed. These questions cover the specifics of data availability and granularity, user workflows and roles, integration with existing city systems like the Online Permit Portal, ensuring equitable representation and data privacy, and learning from best practices in other cities.

# Project Overview

## Pillar

Thriving Neighborhoods

## Problem Statement

Neighborhood Development Discovery - Make it easier for residents to find and understand development proposals near them.

## Project Name

participation-analytics-dashboard

## Project Description

A dashboard designed for Richmond's Planning staff to visualize and analyze who is participating in the public input process for development proposals and, crucially, who is not. The system will cross-reference engagement data (e.g., meeting sign-ins, online comments) with Census demographics by tract to identify gaps in outreach and ensure more equitable engagement, aligning with the goals of the Richmond 300 master plan.


# Jobs To Be Done Analysis

## Job Type

Functional

## Situation

When a development proposal is filed or moves to a hearing near a neighborhood

## Persona

a PDR planner/analyst

## Motivation

to quickly see who participated by event and by census tract versus who lives nearby

## Outcome

so I can identify gaps in engagement and adjust outreach before decisions are made

## Current Workaround

Manually merging sign-in sheets, online comments, and survey exports; visually comparing addresses against census tracts; and using ad-hoc spreadsheets and maps.

## Core Pain Point

The current process is slow, prone to errors, and not standardized across different cases, making it difficult to compare engagement data against demographics and to report findings succinctly to the City Planning Commission (CPC) or City Council.

## Job Type

Emotional/Trust

## Situation

When presenting a staff report or a community briefing

## Persona

a PDR staff member

## Motivation

to have transparent, defensible participation metrics, broken down by census tract, language, and income proxies

## Outcome

so I can build trust with residents and decision-makers that the engagement process was inclusive and aligned with the goals of the Richmond 300 plan

## Current Workaround

Using narrative summaries, selective charts, and anecdotal references to input received from civic associations.

## Core Pain Point

There is a perception of bias or undercounting in participation, and it is difficult to concretely demonstrate that outreach efforts have reached traditionally under-represented groups and areas that lack active civic associations.

## Job Type

Systems/Coordination

## Situation

When coordinating across the Planning and Development Review (PDR), Richmond Redevelopment and Housing Authority (RRHA), and various boards and commissions

## Persona

a PDR program lead

## Motivation

to use a shared dashboard that standardizes data inputs and aligns with Richmond 300 reporting requirements

## Outcome

so I can coordinate outreach tactics, track outcomes across different proposals, and use the insights to inform larger initiatives like zoning rewrites and small area plans

## Current Workaround

Utilizing separate and disconnected tools such as EnerGov exports, PDFs in Legistar, and email lists, combined with inconsistent case tagging and manual data entry for the annual Richmond 300 report.

## Core Pain Point

The systems are fragmented, leading to duplicate data entry, and valuable lessons learned from individual cases and neighborhoods are often missed or not shared effectively across departments.


# Data Questions

## Question

What engagement data does PDR reliably capture today per case (sign-ins with addresses, emails/ZIPs, meeting attendance, virtual participation logs, language interpretation requests)? At what granularity and format?

## Relevance

The dashboard's fundamental ability to analyze participation is entirely dependent on the quality and structure of the input data. Understanding the current data collection practices is the first step in determining project feasibility, identifying data gaps, and designing the necessary data ingestion and processing pipelines.

## Question

Can addresses from sign-ins be geocoded to Census tracts reliably, and how are PO Boxes or incomplete data handled?

## Relevance

The core function of the dashboard is to compare participant locations with Census tract demographics. This requires the accurate conversion of street addresses into geographic coordinates. This question addresses the technical feasibility and data quality challenges, such as handling incomplete addresses or PO Boxes, which directly impact the validity of the dashboard's spatial analysis.

## Question

What demographic baselines by tract will be the official comparators (ACS 5-year: race/ethnicity, age, income, tenure, language, disability)? What refresh cadence?

## Relevance

To measure engagement gaps equitably, a standardized and officially recognized demographic benchmark is required. This question aims to define the authoritative data source (e.g., ACS 5-year estimates) and the policy for its updates, ensuring that all participation analyses are consistent, comparable, and based on trusted data.

## Question

How will participation be deduped across multiple touchpoints (online survey + meeting + eComment) within a single proposal?

## Relevance

To generate accurate metrics on the number of unique individuals participating, a clear methodology for identifying and consolidating records from the same person across different engagement channels is essential. This prevents overcounting and ensures the integrity of the analysis of participation reach.

## Question

What protections are required to avoid exposing personally identifiable information while still reporting equity participation gaps (e.g., small-n suppression)?

## Relevance

While analyzing demographic data is key to the project's equity goals, it is legally and ethically critical to protect the privacy of residents. This question addresses the need for data governance protocols, such as suppressing data for very small groups (small-n suppression), to prevent the inadvertent identification of individuals.

## Question

Which Richmond 300 Priority Neighborhoods and Big Moves should have elevated engagement KPIs, and what constitutes 'success' before entitlement milestones?

## Relevance

This question connects the dashboard's data directly to the strategic goals outlined in the Richmond 300 Master Plan. Defining specific key performance indicators (KPIs) for Priority Neighborhoods ensures the tool is used to actively monitor and drive equitable outcomes in areas identified as having the greatest social vulnerability.


# User Questions

## Question

Which PDR roles will own data entry/QA (case planner, engagement specialist, admin)? What workflows fit CPC agenda cycles?

## Relevance

This question is critical for designing a tool that integrates seamlessly into the existing organizational structure and workflows of the Richmond Planning Department. Understanding who is responsible for data input and quality assurance, and how the tool's use aligns with the City Planning Commission's (CPC) agenda cycles, is fundamental to ensuring the dashboard is practical, maintainable, and adopted by staff.

## Question

What views do planners, engagement staff, and managers each need (per-proposal, per-neighborhood, per-tract rollups, quarterly department view)?

## Relevance

Different users have different information needs. This question is vital for designing a user-centric dashboard with tailored interfaces and data visualizations. Planners might need a detailed view per proposal, while managers may require a high-level quarterly department view. Addressing this ensures the tool is effective and provides value to each specific user persona.

## Question

What thresholds/alerts matter operationally (e.g., <50% of adjacent tracts represented; no attendance from Priority Neighborhoods; language access needs unmet)?

## Relevance

To be an effective operational tool rather than just a historical report, the dashboard must proactively highlight critical issues. This question helps define the business logic for alerts that can trigger timely interventions. For example, an alert about low participation from a Priority Neighborhood allows staff to adjust outreach strategies in real-time, directly supporting more equitable engagement.


# Integration Questions

## Question

What fields can we pull from the Online Permit Portal/EnerGov to automatically list proposals, locations, and milestones?

## Relevance

Automating the ingestion of core proposal data from the city's primary land use system (EnerGov) is critical for efficiency and accuracy. This integration would eliminate redundant data entry for planners, reduce the risk of human error, and ensure the dashboard always reflects the current status of development projects.

## Question

How will artifacts from CPC/BZA/CAR/UDC (agendas, action summaries) link to proposals to show where/when engagement occurred?

## Relevance

Linking the dashboard to official documents from various commissions (CPC, BZA, etc.), likely managed in a system like Legistar, provides essential context. It allows users to connect participation data directly to specific hearings and decision points in a project's lifecycle, creating a comprehensive record of engagement and its relationship to official proceedings.

## Question

Can the dashboard read/write to existing ArcGIS layers (e.g., Civic Associations, tracts, Priority Neighborhoods) and publish public-facing maps when appropriate?

## Relevance

Two-way integration with the city's authoritative GIS platform is crucial for spatial analysis. Reading from existing layers ensures the dashboard uses official boundaries for tracts and Priority Neighborhoods. The ability to write or publish new map layers would allow the dashboard's findings to be shared and utilized across other city departments and potentially with the public, maximizing its impact.


# Equity Questions

## Question

How will we handle neighborhoods without active civic associations and overlapping boundaries to avoid skewing outreach metrics?

## Relevance

This question addresses a core equity challenge acknowledged in the Richmond 300 plan: the uneven coverage of civic associations. To be equitable, the dashboard must not reinforce existing biases where well-organized, often wealthier, neighborhoods have their voices amplified. Developing a methodology to account for areas without formal civic structures is essential for fair and accurate outreach metrics.

## Question

What protections are required to avoid exposing personally identifiable information while still reporting equity participation gaps (e.g., small-n suppression)?

## Relevance

This question highlights the critical tension between transparency and privacy. While the dashboard's purpose is to track demographic participation to ensure equity, it must do so without compromising the privacy of residents. This requires implementing data governance and anonymization techniques, such as suppressing data for small population counts, to ethically report on equity gaps.

## Question

Which Richmond 300 Priority Neighborhoods and Big Moves should have elevated engagement KPIs, and what constitutes “success” before entitlement milestones?

## Relevance

This question directly connects the dashboard's functionality to the strategic goals of the Richmond 300 plan. The plan identifies 'Priority Neighborhoods' based on social vulnerability. By defining specific Key Performance Indicators (KPIs) for these areas, the tool becomes a mechanism for accountability, ensuring that engagement efforts are intentionally focused on and measured within the communities that the city has prioritized for equitable development.


# Prior Art Questions

## Question

Which comparable cities’ participation-equity dashboards or equity-mapping practices does Richmond want to emulate (metrics, visualization, governance)?

## Relevance

This question aims to identify successful examples from other municipalities. By studying existing dashboards, Richmond can learn from their experiences, adopt best practices in metrics, visualization, and governance, and avoid potential pitfalls, ensuring the new tool is effective and well-designed from the start.

## Question

What reporting needs exist for the Richmond 300 annual report and for Council committees that this dashboard should automate (frequency, format, narrative vs. metrics)?

## Relevance

This question focuses on understanding the internal reporting requirements that the dashboard must meet. Automating the generation of reports for the Richmond 300 annual review and for City Council committees would streamline a critical workflow, save staff time, and ensure the dashboard's outputs are directly integrated into the city's accountability and decision-making processes.

