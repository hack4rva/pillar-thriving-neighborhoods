# Analysis Overview

## Project Name

hud-rent-cap-validator

## Project Description

An automated tool that validates rent amounts against Housing and Urban Development (HUD) Area Median Income (AMI) limits. It functions by allowing users to upload unit data, after which the tool calculates the maximum allowable rent ceiling for each AMI tier and flags any units that are in violation of these limits.

## Civic Pillar

Thriving Neighborhoods

## Problem Statement

Affordable Housing Compliance Monitoring: The project aims to assist City of Richmond staff in effectively tracking whether designated affordable housing units remain affordable over their mandated compliance periods.

## Location Context

The project is situated within the political and administrative framework of Richmond, Virginia. It aligns with the city's 'Thriving Neighborhoods' pillar, which prioritizes meeting housing needs for all income levels. Key stakeholders include the City's Housing & Community Development (HCD) department, which manages federal funds like CDBG and HOME, the Affordable Housing Trust Fund (AHTF), and the Richmond Redevelopment and Housing Authority (RRHA). The project supports the city's Equitable Affordable Housing Plan, specifically the goal to create a database for monitoring LIHTC projects, and aligns with the Mayor's 2026 plan to improve execution and resource stewardship.


# Jobs To Be Done Statements

## Jtbd Type

Functional

## Situation

When I’m preparing annual or quarterly compliance reviews for City-assisted or LIHTC/HOME-restricted units,

## Persona

City HCD compliance analyst

## Motivation

to auto-validate reported rents against current HUD AMI-based rent limits by bedroom size and utility assumptions,

## Outcome

so I can quickly identify out-of-compliance units, trigger notices, and document findings for audits.

## Current Workaround

Manually download HUD/HOME/LIHTC rent and income limit PDFs, maintain spreadsheets, and cross-check property manager rent rolls with hand-calculated ceilings; email back-and-forth for clarifications.

## Core Pain Point

Error-prone manual lookups, outdated sheets, inconsistent utility allowances, and slow turnaround during audit windows.

## Jtbd Type

Emotional/trust

## Situation

When I communicate findings to property managers, funders, and leadership,

## Persona

Program manager overseeing AHTF/HOME contracts

## Motivation

want a transparent, auditable calculation trail sourced from HUD APIs and City-standard assumptions,

## Outcome

so I can stand behind decisions, reduce disputes, and build trust with community partners and residents that affordability is being protected.

## Current Workaround

Attach screenshots of tables, cite PDFs, and explain bespoke spreadsheet logic.

## Core Pain Point

Disputes over sources/versions and limited confidence from stakeholders due to opaque or inconsistent calculations.

## Jtbd Type

Systems/coordination

## Situation

When coordinating across HCD, RRHA, Planning (PDR), Finance/EDA, and external owners,

## Persona

Interagency coordinator

## Motivation

want a shared, up-to-date registry of restricted units and automated rent-cap validations,

## Outcome

so I can align actions (e.g., cure periods, AHTF disbursements, LIHTC preservation), avoid duplicated requests, and report citywide compliance metrics aligned with Thriving Neighborhoods goals.

## Current Workaround

Siloed trackers per program (AHTF/HOME/LIHTC), ad hoc email merges, and manual reconciliations with open data/assessor records.

## Core Pain Point

Fragmented systems, version drift, and missed timelines for enforcement or preservation opportunities.


# Data Questions

## Question Text

Which AMI/rent frameworks must the validator support first for Richmond: HUD HOME Rent Limits, MTSP/LIHTC rent limits, HCV Payment Standards, project-specific regulatory agreements, or AHTF contract terms? How are utility allowances standardized (RRHA vs project-specific)?

## Rationale

This is crucial for defining the core logic of the validator. The tool must accurately reflect the specific legal and contractual obligations for different types of affordable units in Richmond to be effective.

## Potential Source

City of Richmond Housing & Community Development (HCD), Richmond Redevelopment and Housing Authority (RRHA), Affordable Housing Trust Fund (AHTF) program documents and staff.

## Question Text

What is the authoritative registry of restricted units (addresses, unit mix, affordability tiers, term dates, regulatory layers)? Is there an existing HCD-maintained list or only program silos? Can we link to parcel/addresses from the Open Data Portal?

## Rationale

The project's success depends on having a comprehensive and accurate dataset of all units to be monitored. Identifying if this data is centralized or siloed will determine the level of data integration effort required.

## Potential Source

HCD program managers, City of Richmond's Open Data Portal, Planning and Development Review (PDR) department.

## Question Text

How frequently should limits refresh (annual HUD updates, mid-year corrections, local policy updates)? What versioning is required for audits (effective date, data source, parameters)?

## Rationale

Compliance is time-sensitive and requires historical accuracy. The tool must use the correct limits for a given time period and maintain a versioned history for audibility and to resolve disputes.

## Potential Source

HCD compliance analysts, HUD API documentation, City legal and policy advisors.

## Question Text

What Richmond-specific fields are needed (Council District, Pulse BRT/TIF zones, preservation risk flags from the Plan’s LIHTC monitoring database concept)?

## Rationale

To maximize the tool's utility for local planning and policy, it should incorporate data fields that align with Richmond's specific strategic priorities, such as transit-oriented development and housing preservation efforts.

## Potential Source

Richmond's Equitable Affordable Housing Plan, HCD, PDR, and City Council staff.


# User Questions

## Question Text

Primary users and permissions: HCD compliance analysts, program managers, RRHA liaisons, EDA staff, external owners/managers? Read vs write vs attest rights?

## Rationale

To design a secure and effective system, it's essential to understand who will use the tool and what level of access they require. This informs the user interface design and security architecture.

## Potential Source

Interviews with staff from HCD, RRHA, Economic Development Authority (EDA), and potentially external property management companies.

## Question Text

What outputs are required: violation flags, cure letters, exportable audit packets, dashboards by program and pillar metrics? Any state-required templates (Virginia DHCD/VHDA/Virginia Housing)?

## Rationale

The tool's value is in the actions it enables. Defining the necessary outputs from the start ensures the tool will generate the specific reports, alerts, and documents needed for compliance, auditing, and strategic reporting.

## Potential Source

HCD compliance staff, program managers, Virginia Department of Housing and Community Development (DHCD), Virginia Housing.

## Question Text

What’s the acceptable accuracy/latency for batch uploads during audit season? How should the tool handle missing data, ambiguous bedroom counts, or AMI tie-breakers?

## Rationale

This question addresses the practical realities of data quality and system performance. Defining business rules for handling imperfect data and understanding performance needs during peak times is critical for user trust and adoption.

## Potential Source

HCD compliance analysts and program managers who perform the current manual process.


# Integration Questions

## Question Text

Should the validator integrate with HUD User APIs for IL/HTF/HOME/MTSP, RRHA utility allowance sources, and the City’s Open Data Portal/parcel layers? Any existing case-management (e.g., grants management, contract management) to hook into?

## Rationale

To maximize automation and data accuracy, the tool should connect to authoritative data sources. Understanding potential integration points with existing city systems is key to streamlining workflows and avoiding data duplication.

## Potential Source

City of Richmond IT department, HCD staff, RRHA, HUD API documentation, City's Open Data Portal team.

## Question Text

Can we ingest rent rolls securely from property managers (SFTP, portal upload) and return machine-readable results? Any need to integrate with RRHA HCV landlord portal for cross-checks?

## Rationale

The tool needs a defined, secure, and user-friendly method for receiving data from external partners. Exploring integration with other portals like RRHA's could provide valuable cross-validation of data.

## Potential Source

City of Richmond IT department, HCD staff, external property managers, RRHA technical staff.


# Equity Questions

## Question Text

How will the tool account for anti-displacement priorities and equitable enforcement (e.g., grace periods, technical assistance) consistent with the Mayor’s plan and One Richmond guiding principles?

## Rationale

To ensure the tool is not merely punitive but supports housing stability, its design should incorporate principles of equitable enforcement that align with the city's broader anti-displacement and housing goals.

## Potential Source

Mayor's Office, HCD policy staff, City's Office of Equity and Inclusion, community housing advocates.

## Question Text

Will resident-facing transparency be provided (e.g., public dashboard of preserved units/rent caps) without exposing PII, to build trust in affordability commitments?

## Rationale

Public transparency can empower residents and build trust in the city's commitment to affordable housing. This question explores how the tool's data could be used to support this goal while protecting personal information.

## Potential Source

HCD leadership, City's communications and web teams, community advocacy groups.

## Question Text

How to handle edge cases (SROs, group homes, supportive housing) and avoid unintended enforcement burdens on mission-driven nonprofits?

## Rationale

A one-size-fits-all approach may not work for all housing types. The tool must be flexible enough to handle unique cases and support, not hinder, the work of non-profits providing critical housing services.

## Potential Source

HCD program managers, non-profit housing providers, policy experts on special needs housing.


# Prior Art Questions

## Question Text

Which Richmond teams already maintain LIHTC/HOME/AHTF trackers, and what schemas exist to avoid re-inventing? The Plan mentions creating a LIHTC monitoring database—what progress has been made?

## Rationale

To avoid duplicating effort and to build on existing work, it is critical to identify and understand any current data collection systems or related projects within the City of Richmond, such as the planned LIHTC database.

## Potential Source

HCD staff managing LIHTC, HOME, and AHTF programs; City's IT or data teams.

## Question Text

Which external tools are in use (HUD User API for Income Limits/Home Rent Limits, any vendor solutions for compliance)? How do peers in Virginia (e.g., Henrico/Chesterfield, Virginia Housing) validate rent caps?

## Rationale

Understanding the current toolset and learning from the practices of peer organizations in the region can provide valuable insights, shortcuts, and best practices for developing Richmond's own solution.

## Potential Source

HCD staff, counterparts in Henrico and Chesterfield counties, Virginia Housing (formerly VHDA).

## Question Text

Lessons from other cities’ AMI/rent validators or inclusionary monitoring portals to inform UX, auditability, and public transparency?

## Rationale

Many cities face similar challenges. Researching their solutions can inform best practices for user experience (UX), technical architecture for auditability, and strategies for public-facing data transparency.

## Potential Source

Civic tech communities (e.g., Code for America), academic research, planning and housing departments in other municipalities.

