# Executive Summary

The Jobs To Be Done (JTBD) analysis for Richmond's participation-analytics-dashboard project reveals three key needs for the Planning and Development Review (PDR) staff. Functionally, planners need to move from manual, ad-hoc spreadsheets to a system that quickly cross-references public participation data with census demographics to identify and address engagement gaps. Emotionally, staff need transparent and defensible metrics to build trust with the community and decision-makers, proving that engagement efforts were inclusive. Systemically, program leads require a shared dashboard to standardize data inputs, coordinate outreach across departments, and track outcomes in alignment with the Richmond 300 master plan. To successfully implement this dashboard, a series of critical open questions must be addressed concerning data availability and granularity, user workflows, integration with existing city systems like the Online Permit Portal, ensuring equitable representation and data privacy, and learning from best practices in other cities.

# Project Summary

## Pillar

Thriving Neighborhoods

## Problem Statement

Neighborhood Development Discovery - Make it easier for residents to find and understand development proposals near them.

## Project Name

participation-analytics-dashboard

## Project Description

A dashboard designed for Richmonds Planning staff to visualize and analyze who is participating in the public input process for development proposals and, crucially, who is not. The system will cross-reference engagement data (e.g., meeting sign-ins, online comments) with Census demographics by tract to identify gaps in outreach and ensure more equitable engagement, aligning with the goals of the Richmond 300 master plan.


# Key User Personas

## Persona Title

PDR planner/analyst

## Job Type

Functional

## Situation

When a development proposal is filed or moves to a hearing near a neighborhood.

## Motivation

To quickly see who participated by event and by census tract versus who lives nearby.

## Desired Outcome

So I can identify gaps in engagement and adjust outreach before decisions are made.

## Persona Title

PDR planner/analyst

## Job Type

Emotional/Trust

## Situation

When presenting a staff report or a community briefing.

## Motivation

To present transparent, defensible metrics that prove engagement efforts were inclusive and build trust with the community and decision-makers.

## Desired Outcome

To have a single, defensible story about public engagement that can withstand public scrutiny and build confidence in the planning process.

## Persona Title

Program lead/manager

## Job Type

Systemic

## Situation

When managing engagement processes citywide and coordinating across different city departments.

## Motivation

To standardize data inputs, coordinate outreach across departments, and track outcomes in alignment with strategic goals like the Richmond 300 master plan.

## Desired Outcome

To establish a unified, citywide system for engagement data that enables coordinated outreach, eliminates data silos, and allows for effective tracking of outcomes against the Richmond 300 master plan.


# Functional Pain Points For Planners

PDR planners face significant functional pain points rooted in a slow, error-prone, and non-standardized manual process for managing public engagement data. Data capture is fragmented across various channels, including in-person sign-in sheets, online surveys, interactive maps, and direct emails, with no standard for demographic metadata, which is often optional. This leads to a labor-intensive and error-prone manual consolidation process, where staff must compile data from different sources, such as exporting survey results to XLSX files and manually adding emailed comments to interactive maps. A key difficulty is the lack of consistent geocoded addresses for participants, which makes it difficult to reliably and automatically cross-reference engagement inputs with census tract demographics to identify gaps. Furthermore, staff face challenges in verifying the residency and representation of commenters, leading to extra quality assurance work and questions about the validity of the input, especially when residents question whether commenters are from Richmond. This ad-hoc process prevents quick tract-level comparisons, hinders efficient outreach targeting, and makes it difficult to report findings succinctly to the City Planning Commission or City Council.

# Emotional And Trust Pain Points

Staff face significant emotional and trust-related challenges centered on the need for transparent and defensible metrics to prove that public engagement was equitable and inclusive. They are under pressure from public scrutiny, with residents and civic groups questioning the legitimacy of the process. For example, public emails allege that online interactive maps are difficult to use and susceptible to input from non-residents, forcing staff to defend the validity of the data. This is compounded by the use of inconsistent demographic baselines; reliance on ACS data, which has known sampling errors, and optional demographic capture at events leads to non-representative samples that are hard to defend. Planners are tasked with building a single, defensible narrative from a disjointed collection of sources like forums, emails, and map comments, which is a heavy synthesis effort. The fragility of these processes was exposed during the pandemic, which forced a pivot to virtual engagement, altering participation patterns and making historical comparisons difficult. The core challenge is the difficulty in producing consistent engagement metrics and equity KPIs from case to case, which creates reputational risk if the data is challenged publicly and undermines trust with the community and decision-makers.

# Systemic Pain Points For Program Leads

Program leads and managers face high-level, systemic challenges due to the lack of a shared, standardized infrastructure for public engagement analytics. A primary issue is the absence of a unified engagement data standard or shared schema, which results in each team creating ad-hoc spreadsheets and inconsistent data collection and outreach targeting across departments. This is exacerbated by synchronization gaps with other critical city systems; for instance, there is no indicated integration between the Online Permit Portal and engagement tools to pull participation data or feed KPIs. There is also a significant misalignment between the reporting cadence and operational needs: the Richmond 300 master plan suggests biennial updates for high-level metrics, which is far too slow for the near-real-time analytics required for case-by-case hearing timelines. Furthermore, data hygiene for civic associations is poor, with the master plan itself calling for improvements to maintain, share, and formalize registration for a civic association database, implying current data has gaps and duplicates. The lack of a shared dashboard perpetuates these issues, leading to duplicated efforts, inconsistent quality, and a reduced ability to coordinate equitable outreach effectively across the city, particularly for underrepresented groups as urged by the Richmond 300 plan.

# Current Workarounds And Inefficiencies

## Workaround Description

Planners and analysts manually merge and compile public engagement data from multiple, disconnected channels. This includes consolidating physical sign-in sheets from meetings, online comments from interactive maps, survey exports, and individual emails. Staff manually add comments from emails to map datasets, compile survey results into spreadsheets (XLSX), and visually compare participant addresses against census tract maps to approximate geographic representation. They also manually maintain lists of civic associations.

## Tools Used

The primary tools for these workarounds are ad-hoc spreadsheets (like XLSX) and maps. Staff also use various survey export tools, email clients to receive and process feedback, and interactive map datasets which they manually augment.

## Inefficiency

The current process is slow, labor-intensive, and highly prone to errors, particularly during manual data joining and reconciliation. It is not standardized, meaning each team or project may use a different ad-hoc system, preventing quick comparisons across cases. This fragmentation makes it difficult to get a reliable, real-time view of engagement, identify gaps in outreach, or verify the residency and representation of participants, leading to credibility questions from the public and decision-makers.


# Cost Of The Status Quo

## Operational Cost

Significant staff hours are wasted on manual, time-intensive data collation and reconciliation before deadlines for the City Planning Commission or City Council. The lack of a standardized system leads to duplicated data collection efforts, longer preparation times for staff reports, and inefficient workflows like manually maintaining civic association lists and uploading comments to various sites.

## Data Quality Cost

The integrity of the engagement data is compromised. Manual data joining introduces a high risk of errors. The use of multiple channels with non-standard intake forms and optional demographic fields results in fragmented, inconsistent, and incomplete datasets. This makes automated crosswalks to Census tracts unreliable and leads to non-representative samples, with reports cautioning against relying on exact numbers due to sampling errors.

## Reporting And Compliance Cost

It is difficult for staff to produce consistent case-to-case engagement metrics or succinctly report findings to bodies like the City Planning Commission. The city's high-level, biennial metrics reporting schedule is misaligned with the near-real-time analytical needs for individual development case hearings, meaning case-level disparities are not surfaced in time to be corrected.

## Strategic Cost

The city's ability to strategically and equitably conduct outreach is weakened. The poor data quality makes it difficult to efficiently target underrepresented groups as called for in the Richmond 300 plan. This creates a significant reputational risk, as the process faces public scrutiny and challenges to its legitimacy, particularly concerning whether participants are residents. This erodes community trust and weakens the city's ability to defend its outreach strategies and planning decisions.


# Cross Cutting Equity Analysis

The current system for collecting and analyzing public participation in Richmond's planning process has significant equity failings that disproportionately affect specific populations. Residents with limited digital access or English proficiency (LEP), renters, youth, and those in historically underrepresented neighborhoods are systematically excluded or undercounted. This occurs because the primary engagement methods rely heavily on online tools, such as interactive maps and surveys, and optional sign-ins at events. These methods create barriers for those without reliable internet, digital literacy, or the time and mobility to attend meetings. The structural gaps in the current process exacerbate these issues. There is a lack of standardized demographic data collection, no consistent identity or residency verification, and a failure to consistently geocode participant addresses. This makes it nearly impossible for city staff to accurately determine who is participating and, more importantly, who is not. The city's reliance on biennial, city-wide metrics, as mentioned in the Richmond 300 plan, is insufficient for surfacing engagement disparities at the individual project or neighborhood level in a timely manner. The implication of these failures is that planning decisions risk being skewed by the voices of more organized, digitally connected, and higher-resourced individuals and groups, while the needs and concerns of the most vulnerable residents are ignored. This not only leads to inequitable outcomes but also breeds deep community mistrust and fuels challenges to the legitimacy of the planning process during City Planning Commission and City Council hearings.

# Evidence From Richmond Public Comment Records

## Usability Complaints

Public comments from the Code Refresh process reveal significant resident frustration with the usability of online engagement tools. One resident stated, 'the electronic format for comments is not user-friendly.' Another echoed this sentiment, writing that they 'found the online map difficult to navigate and comment,' expressing hope that their emailed comments would 'hold the same weight.' These complaints indicate that the technology intended to broaden participation may in fact be a barrier for some residents, forcing them to revert to other channels and creating extra work for staff who must then manually integrate this feedback.

## Community Distrust Evidence

Evidence from public comments shows a clear lack of trust in the fairness and representativeness of the planning process. Residents raised concerns that the online map 'does not prevent people outside of Richmond from commenting on the map,' questioning the validity of the input being collected. This concern is compounded by observations of low participation, with one commenter noting, 'with only about 300 unique visitors to the draft maps across the entire city, the level of engagement so far has been limited.' The workflow where residents see 'that comments from emails have been added to the map by staff' also contributes to distrust, as it suggests a non-standardized, opaque process for handling public input, raising questions about how feedback is curated and represented.

## Perceived Bias Evidence

Public comments suggest a perception that the process is not equitable and may be biased. The combination of difficult-to-use online tools and a lack of verification for who is commenting leads to a belief that the system can be dominated by special interests or those with more resources and technical skills. The overarching concern about the legitimacy of the process, including whether the low number of participants is truly representative, implies a fear that decisions will be made based on a skewed and narrow set of inputs, rather than the broader community's needs. The analysis notes that decisions risk 'over-weighting organized, online, and higher-resourced voices,' which directly speaks to a perceived bias against less-resourced residents.

## Data Source

Public emails from the Code Refresh process, compiled in the document 'Module1_AllEmails_2025.pdf'.


# Lessons From Richmond 300 Engagement

## Engagement Methods

The Richmond 300 master planning process utilized a wide array of engagement methods to gather public input. These included traditional in-person events like open houses and stakeholder meetings, as well as digital tools such as an online survey which garnered 752 responses. The process also involved collecting feedback via email and interactive maps. A significant lesson came during the COVID-19 pandemic, which forced the engagement strategy to 'pivot to a virtual community engagement strategy,' leading to 11 virtual summits. This multi-channel approach, while broad, resulted in fragmented data that was difficult to consolidate.

## Demographic Data Collection

A key challenge highlighted by the Richmond 300 process was the inconsistent and optional nature of demographic data collection. At engagement events, 'PDR staff asked participants to provide demographic information... Providing this information was optional.' This optionality, applied across both in-person and online channels, meant that the resulting demographic data was incomplete and not representative of the city's population. The supporting documents explicitly caution that due to sampling errors in the underlying ACS data used for comparison, 'relying on exact numbers from survey data should be avoided,' underscoring the low confidence in the collected data.

## Participant Profile

The engagement methods and optional data collection resulted in a participant profile that was not representative of Richmond's overall demographics. The process created 'nonrepresentative samples' and the heavy reliance on online tools and optional sign-ins meant that residents with limited digital access, non-English speakers, renters, and youth were likely under-represented. The Richmond 300 Master Plan itself acknowledges this gap by calling for the development of 'unique and targeted engagement methods, beyond conventional surveys and town halls, to engage traditionally under-represented groups.'

## Key Precedent

The Richmond 300 process serves as a critical precedent for the participation-analytics-dashboard project by clearly illustrating the failures of the status quo. It highlights the immense staff effort required for 'manual consolidation across channels,' such as compiling survey data into XLSX files and manually adding email comments to maps. The fragmented, ad-hoc data capture with non-standard demographic fields prevents planners from easily and reliably comparing participant data against census tracts. The challenges in verifying residency and the public's questions about the legitimacy of the input demonstrate the need for a more robust and transparent system. The Master Plan's call for better metrics and targeted outreach provides the strategic justification for building the dashboard to address these exact problems.


# Practices In Comparable Cities

## City Name

Raleigh

## Practice Or Initiative

Reflecting Raleigh: A program that uses lottery-based representative assemblies to ensure that the group of participants providing feedback is demographically reflective of the city's overall population.

## Relevance To Richmond

This practice directly addresses Richmond's documented challenges with process legitimacy and ensuring representative participation. While Richmond staff manually collate data from optional sign-ins and defend against claims of non-resident input, Raleigh's structured process provides a model for achieving and demonstrating demographic reflectiveness, which could help solve Richmond's pain points around data validity and the need for standardized participant metadata.

## Equity Focus

True

## City Name

General (from equitable engagement playbooks)

## Practice Or Initiative

Moving beyond conventional town halls and surveys to implement multi-language, multi-channel, and physically accessible engagement methods to reach traditionally under-represented groups.

## Relevance To Richmond

This general best practice directly aligns with the Richmond 300 Master Plan's call to 'develop a set of unique and targeted engagement methods.' It reinforces the need for Richmond to move past its current online-heavy and fragmented approach, which risks excluding residents with limited digital access, limited English proficiency, or mobility limitations, as highlighted by the analysis of Richmond's current processes.

## Equity Focus

True


# Critical Open Questions For Implementation

## Data And Granularity Questions

What specific demographic fields (e.g., race, income, renter/owner status) will be collected, and will providing this information be mandatory or optional? How will participant addresses be collected and reliably geocoded to census tracts without creating privacy risks or barriers to entry? What is the exact format of data from current sources like sign-in sheets, online surveys, and emails, and how will this fragmented data be standardized into a single, usable schema for the dashboard? Given the known sampling errors in ACS data, how will the dashboard guide users to make appropriate comparisons and avoid false precision?

## User Workflows And Roles Questions

How will the PDR planner/analyst use the dashboard for the functional job of identifying engagement gaps on a case-by-case basis in near-real-time? What specific views, reports, and alerts are needed for this workflow? Conversely, how will the program lead/manager use the dashboard for the systemic job of tracking citywide metrics, coordinating outreach, and preparing biennial/annual reports as mentioned in the Richmond 300 plan? What are the distinct user roles and permissions required to manage data access, protect privacy, and tailor functionality for different staff levels?

## Technical Integration Questions

What are the specific technical pathways and APIs available for integrating with the city's existing Online Permit Portal to automatically link engagement data with specific development cases? How can the dashboard automate the ingestion of data from various third-party tools (e.g., survey software, interactive maps) to replace the current manual export/import processes? What is the technical strategy for handling and structuring qualitative data from sources like emails, automating the current manual process where staff add emailed comments to maps?

## Equity And Privacy Questions

What data governance and privacy protocols will be established to protect participants' personal and demographic information, especially for underrepresented groups? How will the city ensure the data is used to promote equitable outreach and not to target or misrepresent communities? What methods can be used to verify participant residency or stakeholder status without creating prohibitive barriers for renters, unhoused individuals, or those with non-traditional addresses? How will the dashboard itself be designed to be accessible and prevent the introduction of new biases in data interpretation by staff?

