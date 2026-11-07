# Project Analysis Summary

The 'renter-aware-notifications' project in Richmond, VA, is analyzed through the Jobs To Be Done (JTBD) framework, revealing three key needs. Functionally, renters need timely and accessible notifications about new developments to understand impacts and participate in public discourse, as the current owner-centric system is a significant barrier. Emotionally, renters want to feel their voice matters to the city to foster trust and a sense of belonging, which is currently undermined by a lack of direct communication. Systemically, community organizers require an efficient way to identify and mobilize renters in multifamily buildings to ensure their collective voice is heard in the development process. Key open questions for the project span several categories. Data questions focus on the reliability and frequency of development proposal data, methods for identifying multifamily buildings and their unit counts from city GIS data, and using census data for language targeting. User-focused questions address the information hierarchy on the door-hanger, language accessibility beyond English/Spanish, and the logistics of distribution. Integration questions revolve around automating the data pipeline and tracking proposal changes. Equity concerns include addressing the digital divide, prioritizing outreach in historically excluded neighborhoods, and measuring the project's impact on renter participation. Finally, the project seeks to learn from prior art, including similar civic tech initiatives and open-source tools from organizations like Code for America.

# Project Context

## Pillar

Thriving Neighborhoods

## Problem Statement

Neighborhood Development Discovery - Make it easier for residents to find and understand development proposals near them.

## Project Name

renter-aware-notifications

## Project Description

Generates printable door-hanger PDFs for multifamily buildings near development proposals. The materials are provided in English and Spanish (EN/ES) and aim to address the 59% of renters who are excluded from traditional deed-based notification systems.


# Functional Job To Be Done

## Situation

a new development is proposed in my neighborhood,

## Persona

a renter in a nearby apartment building

## Motivation

be notified in a timely and accessible way,

## Outcome

understand the potential impact on my community and have an opportunity to voice my opinion.

## Current Workaround

Actively searching the City of Richmond's Planning and Development Review portal, attending community meetings if I happen to hear about them, or relying on word-of-mouth from neighbors.

## Core Pain Point

The current system is designed for property owners, making it difficult and time-consuming for renters to stay informed and participate in the development process.


# Emotional Trust Job To Be Done

## Situation

I see new construction happening around me without any prior knowledge,

## Persona

a long-term renter who feels invested in my neighborhood

## Motivation

feel that my presence and voice matter to the city and developers,

## Outcome

have a sense of belonging and trust that my community is being shaped with my interests in mind.

## Current Workaround

Feeling disconnected from local government and the development process, leading to feelings of powerlessness and distrust.

## Core Pain Point

The lack of direct communication from the city reinforces the feeling that renters are not considered valued stakeholders in the community's future.


# Systems Coordination Job To Be Done

## Situation

a development proposal is submitted,

## Persona

a community organizer or advocate for equitable development

## Motivation

efficiently identify and inform affected renters in multifamily buildings,

## Outcome

mobilize residents to participate in public hearings and ensure their collective voice is heard.

## Current Workaround

Manually cross-referencing property records with resident information, which is often inaccurate or incomplete, and relying on volunteers to canvass buildings.

## Core Pain Point

The lack of a systematic way to identify and notify renters in large apartment buildings makes it difficult to organize and advocate for their interests effectively.


# Data Questions

## Question

What is the update frequency of the 'Plans of Development' dataset, and is there a reliable way to track the status of proposals from initial submission to final approval?

## Context

The project's ability to provide timely notifications hinges on the freshness and reliability of its primary data source. The 'Plans of Development' dataset on the Richmond GeoHub is identified as this source, but its update cycle and the mechanism for tracking a proposal's lifecycle are unknown. This information is critical to ensure notifications are sent promptly after a proposal is submitted and updated as its status changes.

## Priority

High

## Question

How can we reliably identify multifamily buildings using the city's GIS data, specifically the 'Parcels' and 'Zoning Districts' datasets?

## Context

The core function of the project is to notify renters in multifamily buildings. This requires a systematic method to distinguish these properties from others. The question seeks to determine which specific land use codes, zoning designations, or other attributes within the city's official GIS data can be used to create an accurate and automated process for identifying target buildings.

## Priority

High

## Question

Does the city's GIS data include the number of units in each multifamily building, and if not, what is the best way to estimate this?

## Context

For the logistical purpose of printing the correct number of door-hangers, the project needs to know or estimate the number of residential units in each identified multifamily building. This question explores whether this data point is readily available or if an effective estimation methodology needs to be developed.

## Priority

Medium

## Question

How can American Community Survey data on languages spoken at home be used at a granular level (e.g., census tract) to determine where to prioritize Spanish-language (ES) door-hangers?

## Context

A key feature of the project is providing notifications in both English and Spanish. To implement this effectively and equitably, the project needs a data-driven approach to identify neighborhoods with a higher concentration of Spanish-speaking households. This question focuses on the practical application of census data to guide the distribution of bilingual materials.

## Priority

Medium


# User Questions

## Question

What information is most critical to include on the door-hanger to be both informative and actionable?

## Context

To ensure the door-hangers are effective, it's essential to understand the information hierarchy that renters find most useful. This involves determining the right balance of content, such as a project summary, the date and time of a public hearing, and a link or QR code for more detailed information, to prompt engagement without overwhelming the recipient.

## Priority

High

## Question

Who will be responsible for printing and distributing the door-hangers, and how can we coordinate with property managers to ensure access to buildings?

## Context

The success of a physical notification system hinges on a reliable and repeatable distribution process. This question addresses the operational side of reaching renters, including identifying the party responsible for the physical tasks and the strategy for gaining access to apartment buildings, which may require building relationships with property managers.

## Priority

High


# Integration Questions

## Question

What is the most efficient way to automate the process of checking for new development proposals, identifying nearby multifamily buildings, and generating the door-hanger PDFs?

## Context

This question addresses the central technical challenge of the project: building an automated data pipeline. The goal is to create a system that can automatically execute the entire workflow—ingesting new proposal data, performing the spatial analysis to find nearby apartment buildings, and generating the final PDF artifacts—without manual intervention, making the solution scalable and sustainable.

## Priority

High

## Question

How can we track changes or updates to development proposals and ensure that renters are notified of significant modifications or new hearing dates?

## Context

Development proposals are dynamic and can be modified throughout the review process. A simple notification at the time of submission is insufficient. This question highlights the need for a 'change detection' mechanism to monitor proposals for significant updates, such as rescheduled public hearings, to ensure renters receive current and actionable information.

## Priority

High


# Equity Questions

## Question

Beyond English and Spanish, what other languages are commonly spoken by renters in Richmond, and should we consider additional translations?

## Context

To ensure maximum accessibility and inclusivity, the project must look beyond the initial EN/ES scope. This requires identifying other significant language communities within Richmond's renter population to determine if additional translations are necessary to reach all affected residents.

## Priority

High

## Question

How can we use granular data on languages spoken at home to determine where to prioritize Spanish-language (ES) door-hangers?

## Context

Effective outreach requires targeted distribution. This question focuses on using demographic data, such as from the American Community Survey at a census tract level, to create a data-driven strategy for deploying translated materials to the specific neighborhoods where they are most needed.

## Priority

High

## Question

What is the role of digital outreach in reaching renters who may prefer or have better access to online information?

## Context

While the project's focus on physical door-hangers is designed to bridge the digital divide, an equitable approach must also consider that some renters are best reached online. This question explores a hybrid strategy, incorporating tools like email or social media, to ensure comprehensive outreach across different communication preferences.

## Priority

Medium

## Question

Are there specific neighborhoods or zoning districts with a high concentration of renters who have been historically excluded from the development process? How can we prioritize outreach in these areas?

## Context

To actively counteract historical inequities, this question prompts an investigation into which areas of Richmond have high renter populations that have been systematically disenfranchised. The goal is to identify these communities and prioritize them for outreach efforts to ensure their voices are included.

## Priority

High

## Question

How can we measure the effectiveness of this project in increasing renter participation in the development process?

## Context

To ensure the project is meeting its equity goals, it is crucial to define and track metrics of success. This involves determining how to measure impact, such as by tracking public hearing attendance from renters, analyzing the origins of public comments, or conducting follow-up surveys to gauge changes in awareness and engagement.

## Priority

Medium


# Prior Art Questions

## Question

What lessons can be learned from projects that used physical mailers, like postcards for rental assistance, regarding the logistics and impact of outreach?

## Context

The Civic Tech Field Guide documents a project that utilized postcards to inform renters about rental assistance. Since the 'renter-aware-notifications' project plans to use physical door-hangers, understanding the lessons from similar physical outreach campaigns is crucial for planning logistics and maximizing impact.

## Priority

High

## Question

Have other cities with a high percentage of renters developed similar tools or processes to notify them of development proposals, and what can be learned from their successes and failures?

## Context

The challenge of notifying renters about neighborhood development is not unique to Richmond. Investigating how other municipalities have addressed this issue can provide valuable insights, proven models, or cautionary tales that can inform the project's strategy and design.

## Priority

High

## Question

Are there any open-source tools or playbooks from Code for America or other civic tech organizations for renter outreach and engagement that could be adapted for this project?

## Context

Organizations like Code for America often create reusable solutions and guides for common civic problems. Identifying an existing open-source tool or a detailed playbook could significantly accelerate the project's development and help avoid common mistakes in renter engagement.

## Priority

High

