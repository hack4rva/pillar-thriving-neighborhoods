# Analysis Summary

This Jobs To Be Done analysis focuses on an affordable housing compliance dashboard for the City of Richmond, VA, under the 'Thriving Neighborhoods' pillar. The project aims to track the long-term affordability of publicly funded housing, including units supported by HOME, LIHTC, and the local Equitable Affordable Housing Program (EAHP). The key challenge is that compliance monitoring is fragmented. Richmond's Department of Housing & Community Development (HCD) monitors HOME projects through on-site inspections and annual owner reports, while Virginia Housing oversees LIHTC compliance statewide using its own online portal. This creates disjointed workflows and data silos. The analysis identifies three key personas facing distinct challenges: the City HCD Compliance Officer struggling with manual data wrangling, the Affordable Property Manager burdened by duplicate reporting and anxiety over compliance, and an Interagency Program Manager lacking a consolidated view to coordinate across different funding layers and agencies.

# Functional Job To Be Done

## Situation

When annual owner certifications and on-site inspection milestones come due for HOME- and locally funded projects,

## Persona

City HCD Compliance Officer

## Motivation

want to see, at a project-and-unit level, whether affordability, rent limits, income eligibility, and HQS/NSPIRE conditions are compliant and up to date,

## Outcome

so I can trigger on-site inspections, request corrective actions, and document compliance in CAPER with minimal data wrangling.

## Current Workaround

Spreadsheets and email collating owner annual reports, PDF attachments, and notes from biennial on-site inspections; cross-checking HUD IDIS and paper files for due dates; manual parcel lookups.

## Core Pain

Fragmented data across owner reports, HUD systems, and paper/email; missed or hard-to-predict inspection windows; limited visibility into unit-level noncompliance and approaching affordability end dates.


# Emotional Job To Be Done

## Situation

When preparing annual certifications and tenant files for audits by Virginia Housing and the City,

## Persona

Affordable Property Manager/Owner

## Motivation

want clear, consistent, and prevalidated compliance status and document checklists,

## Outcome

so I can feel confident that what I submit won’t trigger findings or IRS/HUD issues and that I can demonstrate good-faith compliance to maintain funding and reputation.

## Current Workaround

Compile certifications in Virginia Housing’s Tenant Portal (Procorem), then repackage similar data for the City via email/PDF; maintain parallel spreadsheets for rent limits, utility allowances, and AIT set-asides.

## Core Pain

Duplicate data entry, differing report formats/timelines (City vs. Virginia Housing), anxiety about surprise findings; unclear expectations for City-specific HOME/local requirements vs. LIHTC.


# Systems Job To Be Done

## Situation

When coordinating monitoring across City-funded projects that also have LIHTC or other layers,

## Persona

Interagency Program Manager coordinating HCD, RRHA, Virginia Housing, and providers

## Motivation

want a consolidated portfolio view that aligns City HOME/local compliance milestones with Virginia Housing reporting status and property changes (ownership, decontrol),

## Outcome

so I can reduce conflicting requests, prevent lapses as affordability periods change, and present accurate metrics in CAPER and to leadership.

## Current Workaround

Manual crosswalking of project lists from City contracts, HUD IDIS schedules, Virginia Housing notices, and provider emails; ad hoc Smartsheets/SharePoint trackers.

## Core Pain

No single source of truth; hard to reconcile unit counts and affordability clocks across program layers; late awareness of ownership/management changes or AIT reporting impacts.


# Data Questions

## Question

What is the authoritative list of City-assisted affordable developments (HOME, CDBG, EAHP, local trust fund) with project IDs, parcel IDs, unit counts by AMI, affordability start/end dates, and required inspection cadence?

## Context

This question is fundamental to establishing the complete scope of the dashboard. Without a definitive master list of all properties that require monitoring, it's impossible to track compliance comprehensively or build a single source of truth.

## Potential Answer Source

Internal records, contracts, and databases from the City of Richmond's Department of Housing & Community Development (HCD). Cross-referencing with Consolidated Annual Performance and Evaluation Reports (CAPERs).

## Question

Can the dashboard ingest Virginia Housing Procorem exports (tenant events, certifications, AIT status) at the property level for Richmond-located projects, and what legal/data-sharing constraints apply?

## Context

This addresses the significant pain point of duplicate data entry for property managers who report to both the City and Virginia Housing. Ingesting this data directly would streamline workflows and improve data consistency, but requires technical and legal feasibility checks.

## Potential Answer Source

Technical and legal discussions between the City of Richmond (HCD, IT) and Virginia Housing to establish data sharing agreements and API/export capabilities.

## Question

How will the system normalize addresses/parcel IDs (Assessor, GIS) to reliably join owner reports, CAPER projects, and LIHTC properties?

## Context

Data about the same property may exist in multiple systems with slight variations in addresses or identifiers. A reliable normalization and joining strategy is a critical technical prerequisite for creating a unified view of any given property.

## Potential Answer Source

City of Richmond's GIS and Assessor of Real Estate office data, services, and data standards.

## Question

For HOME projects, what unit-level data are consistently available (income, rents, HQS/NSPIRE results) vs. only project-level?

## Context

The answer to this question determines the dashboard's level of detail. The ability to monitor compliance at the individual unit level, rather than just the project level, provides much more granular insight and enables more precise interventions.

## Potential Answer Source

A review of the annual reports submitted by property owners to the City's HCD for HOME-funded projects.

## Question

How will affordability-end and decontrol-period flags be calculated and updated for resyndications, refinancings, or EAHP-specific terms?

## Context

A core function of the dashboard is to provide alerts for expiring affordability. These calculations can be complex and vary by funding source and events like refinancing. A clear logic is needed to make these flags accurate and reliable.

## Potential Answer Source

Analysis of program regulations for HOME, LIHTC, and the local Equitable Affordable Housing Program (EAHP), as well as specific legal agreements for individual projects.


# User Questions

## Question

Which HCD roles will use the dashboard (Compliance Officers, Program Managers, Data Analyst) and what tasks do they perform at month/quarter/year cycles?

## Context

To design a useful tool, it's essential to understand the specific personas who will use it. This involves mapping out their responsibilities, decision-making processes, and reporting cadences to ensure the dashboard's features align with their actual job functions.

## Potential Answer Source

Interviews, workshops, and workflow observation sessions with staff from the City of Richmond's Department of Housing & Community Development (HCD).

## Question

What do affordable housing owners/managers need from the City view (e.g., checklists, calendars, status of document reviews) to reduce duplicate effort with Virginia Housing?

## Context

This question addresses the 'Emotional/Trust JTBD' of property managers. By understanding their needs, the City can design a portal or view that adds value for them, potentially increasing the quality and timeliness of compliance data submissions and reducing the City's administrative burden.

## Potential Answer Source

Interviews or focus groups with affordable housing owners and property managers who operate in Richmond and report to both the City and Virginia Housing.

## Question

What are RRHA’s monitoring touchpoints for City-funded non-public-housing projects, if any, and do their staff require read-only or contributor access?

## Context

This question relates to the 'Systems/Coordination JTBD'. The Richmond Redevelopment and Housing Authority (RRHA) is a key housing partner. Understanding their role in monitoring and their data needs is crucial for creating a consolidated portfolio view and avoiding duplicative or conflicting efforts.

## Potential Answer Source

Joint meetings and workflow mapping sessions with staff from RRHA and the City's HCD.


# Integration Questions

## Question

What integrations are feasible in phase 1: HUD IDIS schedule references, Virginia Housing Tenant Portal data (via export), City document management (SharePoint/Laserfiche), and Assessor/GIS parcel services?

## Context

This question is critical for defining the initial technical scope and development roadmap. It seeks to understand the practical possibilities of connecting the new dashboard with existing, critical data systems used by the City and its partners to avoid creating data silos and enable automated workflows from the start.

## Potential Answer Source

City of Richmond IT department, technical documentation for HUD IDIS and Virginia Housing's Tenant Portal, City's GIS and Assessor's office, and staff familiar with the City's document management systems (SharePoint/Laserfiche).

## Question

How will the dashboard track and alert on ownership/management changes (from Virginia Housing notices and City contracting) and sync that to contact records and certification responsibilities?

## Context

Changes in property ownership or management are key events that can impact compliance. This question addresses the need for the system to have a robust mechanism to receive, process, and act on this information to ensure that compliance responsibilities are correctly assigned and tracked, preventing lapses in oversight.

## Potential Answer Source

City of Richmond's contracting department, Virginia Housing's compliance department, and Housing & Community Development (HCD) staff who manage provider relationships.

## Question

Will the dashboard produce CAPER-ready monitoring narratives/metrics and attach inspection logs/photos for audit trails?

## Context

A key function for the City staff is reporting to HUD via the Consolidated Annual Performance and Evaluation Report (CAPER). This question explores the dashboard's potential to automate or streamline this reporting, which is a core pain point. It also touches on the need for the system to serve as a repository for audit-proof documentation.

## Potential Answer Source

HCD staff responsible for preparing the CAPER, HUD regulations and reporting guidelines, and City compliance officers who conduct inspections.


# Equity Questions

## Question

How will the system surface disparities (location of noncompliance, loss of affordability, rent-burden risk) across neighborhoods and protected classes to inform corrective actions and fair housing priorities?

## Context

This question moves the dashboard's purpose beyond simple compliance tracking to a proactive tool for promoting fair housing. It's crucial for ensuring the system helps identify and address systemic inequities in housing, such as whether non-compliance or loss of affordable units is concentrated in specific communities.

## Potential Answer Source

City of Richmond's Office of Equitable Development, local fair housing advocacy groups, HCD policy staff, and community-based organizations.

## Question

What language access and accessibility needs exist for owner submissions and City communications about findings and corrective action plans?

## Context

To be truly equitable, the system and its associated processes must be accessible to all users. This question addresses the need to consider the diversity of property owners and managers, ensuring that language barriers or disabilities do not prevent them from successfully navigating the compliance process.

## Potential Answer Source

Surveys or interviews with affordable housing owners/managers, City's language access resources or coordinator, and disability advocacy groups.

## Question

How will tenant protections during decontrol/affordability transitions be monitored and flagged for intervention?

## Context

The end of a property's mandatory affordability period is a high-risk time for tenants who may face displacement. This question focuses on the dashboard's role in proactively identifying these upcoming transitions so that the City can intervene, provide resources, and ensure tenant rights are protected.

## Potential Answer Source

HCD staff, tenant advocacy organizations, legal aid services, and policies outlined in the Equitable Affordable Housing Program (EAHP).


# Prior Art Questions

## Question

Which existing municipal compliance dashboards or open-source civic tech components (e.g., inspection scheduling, affordability period calculators) are most adaptable to Richmond’s HOME/EAHP context, and what data models did they use?

## Context

This question is about leveraging existing work to accelerate development and avoid 'reinventing the wheel.' By researching solutions built by other cities or the civic tech community, the project team can learn from their successes and failures, potentially adopting or adapting existing code, data models, or design patterns relevant to Richmond's specific funding programs like HOME and EAHP.

## Potential Answer Source

Case studies from other municipal governments, civic technology communities (e.g., Code for America), open-source software repositories like GitHub, and academic research on housing policy implementation.

