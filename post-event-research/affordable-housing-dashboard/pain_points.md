# Executive Summary

The primary pain point for users of Richmond's affordable housing compliance ecosystem is the fragmented nature of data and workflows stemming from divided oversight between city and state agencies. The City of Richmond's Department of Housing & Community Development (HCD) monitors HOME-funded projects, while Virginia Housing oversees LIHTC compliance statewide through its separate online portal, Procorem. This separation creates significant data silos and disjointed processes. The consequences are felt by key users: City HCD Compliance Officers are consumed by manual data wrangling and reconciliation; Affordable Property Managers are burdened by duplicate reporting and anxiety over navigating conflicting compliance rules; and Interagency Program Managers lack the consolidated portfolio view required for effective strategic oversight and coordination across different funding programs.

# Project Context

The project is an affordable housing compliance dashboard for the City of Richmond, Virginia, situated within the city's 'thriving-neighborhoods' strategic pillar. The primary objective of this civic tech project is to track and ensure the long-term affordability of publicly funded housing units. The scope of the dashboard encompasses units supported by a mix of federal, state, and local funding sources, specifically the federal HOME Investment Partnerships Program (HOME), the Low-Income Housing Tax Credit (LIHTC) program, and Richmond's own Equitable Affordable Housing Program (EAHP). The project's genesis lies in the need to address the fragmented and disjointed compliance monitoring processes that currently exist between city and state agencies.

# Key Personas Identified

## Persona Name

City HCD Compliance Officer

## Role Description

An employee of Richmond's Department of Housing & Community Development (HCD) responsible for monitoring compliance for projects funded by HOME and local programs like EAHP. Their duties include tracking owner certifications, scheduling and conducting inspections, requesting corrective actions from property owners, and documenting overall compliance for federal reports (CAPER). They are primarily challenged by fragmented data sources, manual processes, and difficulty in forecasting workloads.

## Persona Name

Affordable Property Manager/Owner

## Role Description

Manages or owns affordable housing properties with layered funding (e.g., LIHTC and HOME). This persona is responsible for submitting annual tenant and rent certifications and preparing for audits from multiple agencies, including Virginia Housing (for LIHTC) and the City of Richmond (for HOME/EAHP). They are burdened by duplicate data entry into different systems, the stress of navigating differing and sometimes conflicting compliance rules, and the anxiety of potential findings that could jeopardize funding.

## Persona Name

Interagency Program Manager

## Role Description

A role focused on system-level oversight and strategic coordination of the affordable housing portfolio. This persona needs a consolidated view of compliance data across all funding layers (HOME, LIHTC, EAHP) and agencies. Their primary responsibility is to manage risk, identify systemic issues, and ensure the long-term health and stability of the city's affordable housing stock, a task made difficult by the lack of an integrated data system.


# Hcd Officer Pain Points

## Pain Point

Splintered monitoring and reporting across different housing programs and systems.

## Evidence And Source

The City's HOME program requires annual rent/occupancy reports and periodic inspections, which are managed separately from the state-led LIHTC oversight conducted by Virginia Housing. This creates parallel workflows and data silos for projects with layered funding. Source: Virginia DHCD HOME compliance training; 24 CFR 92.504.

## Current Workaround

Maintaining parallel workflows and separate data records for each program. Manually collating owner annual reports, PDF attachments, and notes from inspections across spreadsheets, emails, and paper files.

## Cost Of Status Quo

High risk of missed deadlines and compliance findings, significant time spent on rework chasing documents, and limited portfolio-level visibility to trigger proactive actions.

## Pain Point

Irregular inspection schedules create a lumpy and unpredictable workload.

## Evidence And Source

The City of Richmond's PY2024/FY2025 CAPER report explicitly states, 'Based on the City of Richmond’s HOME Rental Monitoring Schedule, there were no housing units due for inspection during the CAPER period.' This reflects cyclical monitoring schedules that can bunch up in other years. Source: City of Richmond CAPER PY2024/FY2025.

## Current Workaround

Reactively managing inspection loads as they arise rather than proactively forecasting. Tracking due dates across disparate spreadsheets, emails, and paper files.

## Cost Of Status Quo

Complicates workload forecasting and resource allocation, leading to uneven inspection loads and potential for staff burnout or missed inspections in heavy years.

## Pain Point

Complex rule harmonization required at the project and unit level for stacked funding (e.g., HOME + LIHTC).

## Evidence And Source

Projects must simultaneously comply with different rules for recertification cadences, rent caps, utility allowance calculations, and monitoring schedules for both HOME and LIHTC programs. For example, HOME requires source document review every 6th year, while LIHTC often requires it annually. Source: Virginia DHCD HOME compliance training.

## Current Workaround

Manually verifying compliance against both sets of regulations. Staff must cross-check different rent limits, utility schedules, and documentation requirements for each unit.

## Cost Of Status Quo

Increased administrative burden, higher risk of errors in rent or eligibility calculations, and greater potential for compliance findings during audits.

## Pain Point

Manual and fragmented intake channels for locally funded projects like the Equitable Affordable Housing Program (EAHP).

## Evidence And Source

The EAHP FY25 NOFA specifies that applications and attachments are submitted via OneDrive uploads using city-provided Excel templates. The city may also request unlocked Excel files for stress-testing, creating one-off data files. Source: City of Richmond EAHP FY25 NOFA.

## Current Workaround

Managing applications and project data through a system of OneDrive folders and individual Excel files for each project.

## Cost Of Status Quo

Creates disparate data streams that must be manually reconciled later with federal (HUD IDIS) and state (Virginia Housing Procorem) reporting systems, increasing the likelihood of data entry errors and inconsistencies.


# Hcd Officer Workflow Analysis

The current workflow for a City HCD Compliance Officer in Richmond is fundamentally broken due to data fragmentation and manual processes. There is no single source of truth for housing compliance; key information is scattered across owner-submitted reports (often PDFs), HUD's IDIS system, Virginia Housing's Procorem portal (for LIHTC), and internal paper or email files. This forces officers to engage in time-consuming manual workarounds. They use ad hoc spreadsheets and email threads to track critical milestones like inspections and recertifications. Desk reviews rely on manually collating documents from property owners, and officers must perform manual cross-checks with state and federal systems to attempt to reconcile conflicting information. The cost of this status quo is significant: it creates a high risk of missing deadlines, which can lead to negative audit findings from HUD. It also results in substantial wasted staff time on 'rework'—chasing documents and correcting data inconsistencies. The lumpy, unpredictable nature of the inspection schedule, a direct result of poor tracking, complicates resource allocation. Ultimately, this fragmented system provides only limited portfolio-level visibility, preventing the officer from proactively identifying at-risk properties or expiring affordability periods.

# Hcd Officer Equity Dimensions

From the HCD Compliance Officer's perspective, the current fragmented and inefficient monitoring system has significant equity implications. The primary group affected are the tenants living in affordable housing units. When limited staff capacity and cyclical, hard-to-predict inspection schedules are the norm, it can lead to significant delays in identifying and remediating noncompliance issues, such as poor housing quality or incorrect rent calculations. This problem is often most acute in lower-resourced properties, which may have less capacity for proactive maintenance and compliance. Furthermore, the scattered and siloed nature of compliance records creates monitoring gaps. This fragmentation impedes the officer's ability to perform early identification of properties or neighborhoods with patterns of noncompliance, which can threaten the long-term affordability of those units. If problems are not caught early, they can escalate, potentially leading to the loss of affordable units from the city's housing stock, which disproportionately harms the low-income households who rely on them.

# Property Manager Pain Points

## Pain Point

Duplicate reporting into Virginia Housing’s Procorem Tenant Portal plus separate City reporting and requests.

## Evidence And Source

Virginia Housing mandates continuous tenant-event maintenance and annual validation in its Procorem portal by strict deadlines. Concurrently, the City of Richmond requires separate annual reporting and may request additional materials for HOME and local funds. This is supported by the Virginia Housing Compliance Monitoring page and the general description of fragmented compliance.

## Current Workaround

Property managers must first enter data for LIHTC compliance into the Procorem portal, and then repackage that same data into different formats (emails, Excel spreadsheets, PDFs) for City submissions. This also involves reconciling different utility allowance schedules, rent caps, and file checklists between the two systems.

## Cost Of Status Quo

This duplicate work leads to significant staff time expenditure, a higher risk of errors and data mismatches between systems, and considerable stress for staff over potential audits and findings (like IRS Form 8823 or HOME findings). There are also direct cash costs associated with monitoring fees and potential late fees if deadlines are missed.

## Pain Point

Anxiety over differing rules and audits between HOME and LIHTC programs.

## Evidence And Source

The rules for compliance differ significantly. For example, the HOME program allows for income self-certification in some years but mandates source documentation every sixth year. In contrast, the LIHTC program generally requires annual third-party income documentation and uses different calculations for rent and utilities. This information is derived from the VA DHCD HOME compliance training materials.

## Current Workaround

To manage this complexity, property managers maintain parallel spreadsheets to track different rent limits, utility allowances, and Affirmatively Furthering Fair Housing (AIT) set-asides. They also conduct internal quality assurance reviews before validating data in the state portal and before sending separate submissions to the City.

## Cost Of Status Quo

The primary cost is the uncertainty and anxiety surrounding pre-validation of compliance. Managers must ensure their properties are 'right' under both sets of rules simultaneously, leading to stress and a high administrative burden to avoid findings that could jeopardize funding and reputation.

## Pain Point

Shifting year-end requirements and changes to compliance portals.

## Evidence And Source

Virginia Housing has recently changed its reporting vendors and processes. For instance, the instructions for 2025 reporting were altered, telling managers to 'Validate' data rather than 'Submit' it, which was the process for the 2024 reporting year. These changes create moving targets for compliance teams. This is evidenced by the Virginia Housing Compliance Monitoring page.

## Current Workaround

Staff must stay constantly updated on changing instructions and perform internal quality assurance checks to ensure they are following the latest procedures before submitting any data to either the state or the city.

## Cost Of Status Quo

The constant changes increase the mental load on compliance staff, raise the risk of inadvertent errors, and contribute to the overall stress and anxiety of the compliance process. It requires continuous training and attention to detail, which consumes valuable staff time.

## Pain Point

Managing ongoing documentation for long-term affordability commitments.

## Evidence And Source

Locally funded programs like the City of Richmond's Equitable Affordable Housing Program (EAHP) impose a 30-year affordability period. This requires property managers to maintain durable, accessible records and perform periodic validations for decades, as stated in the EAHP FY25 NOFA.

## Current Workaround

The use of parallel spreadsheets and robust internal review processes are the primary methods for ensuring that long-term documentation is maintained correctly and can be produced for audits or validations over the multi-decade life of the affordability restrictions.

## Cost Of Status Quo

This creates a significant long-term administrative burden. The cost includes staff time dedicated to record-keeping, the risk of data loss or errors over a long period, and the stress associated with maintaining compliance over decades, with potential financial penalties for any lapses.


# Property Manager Workflow Analysis

The current workflow for an Affordable Property Manager in Richmond is fundamentally broken due to fragmented reporting systems between state (Virginia Housing) and city (Richmond HCD) agencies. The primary broken process involves duplicate data entry: managers must first input and maintain tenant and compliance data in Virginia Housing's Procorem portal for LIHTC requirements, and then manually repackage and re-submit similar data to the City via different channels like email, PDFs, or Excel files for HOME and local program compliance. This process is further complicated by the need to reconcile differing rules, such as varying utility allowance schedules and rent caps between the programs.

To cope with this, managers have developed several workarounds. The most common is the use of parallel spreadsheets to track the different requirements for rent limits, utilities, and income set-asides for each funding source. They also conduct extensive internal quality assurance reviews and pre-audits before validating information in the state portal and before sending separate submissions to the City. These workarounds are manual, time-consuming, and prone to error.

The cost of this status quo is substantial. It creates a high administrative burden, consuming significant staff time that could be used for other property management duties. It introduces a high risk of errors and data mismatches across the different reporting systems, which can lead to compliance findings. This situation generates significant stress and anxiety for staff who worry about audits and potential negative consequences, such as IRS Form 8823 findings or loss of funding. Finally, there are direct financial costs, including annual monitoring fees and the risk of late fees if the complex, multi-step deadlines are missed.

# Property Manager Equity Dimensions

From the Property Manager's perspective, the high administrative burden of the current compliance system has significant equity implications. The complexity of dual-reporting, keeping up with portal changes and shifting requirements, and maintaining documentation for multi-decade affordability periods creates a disproportionate burden on smaller and BIPOC-led owners and management companies. These smaller entities often have fewer back-office resources and less staff capacity to dedicate to navigating these complex and fragmented systems. The high fixed costs of compliance can act as a barrier to entry and sustainability for these groups, potentially favoring larger, better-resourced developers and managers. This can inadvertently limit the diversity of affordable housing providers in the city and concentrate control in the hands of larger organizations.

# Interagency Manager Pain Points

## Pain Point

No consolidated view across different funding layers.

## Evidence And Source

Federal regulations (24 CFR 92.504) require the participating jurisdiction (PJ) to have written systems for monitoring. However, in practice, the data is siloed: HOME program monitoring and documentation are managed by the City of Richmond, while LIHTC tenant data and audits are handled by Virginia Housing through its separate Procorem portal. This fragmentation prevents a unified portfolio view.

## Current Workaround

Manually stitching together narratives from the City's CAPER, reports from property owners, and data exports from Virginia Housing's Procorem portal into spreadsheets. This also involves creating ad hoc crosswalks to align HOME and LIHTC unit designations.

## Cost Of Status Quo

This fragmented approach leads to slower corrective action cycles when issues are found, a higher risk of missing early warnings about expiring affordability periods, and significant staff time wasted on duplicating analytical work.

## Pain Point

Asynchronous and differing monitoring schedules and standards between programs.

## Evidence And Source

The monitoring cadences are not aligned. HOME projects undergo an annual desk review, with on-site inspections occurring every 1 to 3 years depending on project size. In contrast, LIHTC properties are monitored annually, with on-site inspections of at least a 20% sample every 3 years using different standards (UPCS/NSPIRE). This makes it difficult to align compliance triggers and follow-up actions across the different funding regimes, as noted in the VA DHCD HOME training materials.

## Current Workaround

Portfolio managers must manually track these separate and inconsistent schedules, likely using spreadsheets or calendar systems. They must also reconcile the different inspection standards (e.g., UPCS/NSPIRE for LIHTC vs. other standards for HOME) after the fact.

## Cost Of Status Quo

The lack of alignment complicates resource planning for inspections and monitoring. It creates inefficiencies and increases the cognitive load on staff who must constantly switch between different sets of rules and timelines, raising the risk of oversight and non-compliance.

## Pain Point

The local EAHP pipeline introduces another separate set of data streams and requirements.

## Evidence And Source

The City of Richmond's Equitable Affordable Housing Program (EAHP) has its own distinct application, underwriting, and monitoring conditions. As detailed in the EAHP NOFA for FY25, the city uses its own scoring criteria, a separate submission process via OneDrive, and may even require unlocked Excel files for its own feasibility stress tests. This creates yet another data stream that must be manually integrated with federal (HUD) and state (Virginia Housing) systems.

## Current Workaround

Data from EAHP applications and monitoring must be manually integrated with information from HUD and state systems. This likely involves manual data entry and reconciliation between the City's Excel templates and other systems of record.

## Cost Of Status Quo

This adds another layer of complexity and administrative burden, increasing the time and effort required to get a holistic view of a project that might be funded by EAHP in addition to HOME or LIHTC. It further fragments the data landscape, making comprehensive strategic planning more difficult.

## Pain Point

Differing and conflicting rules for rent, income, and utility calculations across programs.

## Evidence And Source

For projects with combined HOME and LIHTC funding, compliance requires reconciling different methodologies for setting rent caps and calculating utility allowances. As highlighted in the VA DHCD HOME training, errors in these calculations can easily propagate if the underlying systems and data are not unified, leading to compliance risks for both programs.

## Current Workaround

Staff must manually create and maintain ad hoc crosswalks and spreadsheets to reconcile the different program rules for each property. This involves double-checking calculations against both sets of regulations to ensure the most restrictive rules are followed.

## Cost Of Status Quo

This manual reconciliation is time-consuming and highly prone to error. A mistake in calculation can lead to significant compliance findings, potential financial penalties, and a threat to the long-term affordability of the units. It represents a major operational risk.


# Interagency Manager Workflow Analysis

The current state for an Interagency Program Manager is defined by significant data fragmentation and manual, inefficient workflows. The core breakdown is the lack of a single, unit-resolved data layer that provides a consolidated view across all funding programs (HOME, LIHTC, EAHP). This means that critical risk flags, such as a property falling out of compliance or an affordability period nearing expiration, must be identified manually. The primary workaround is a labor-intensive process of stitching together disparate data sources: narrative reports from the City's CAPER, individual owner-submitted reports, and data exports from Virginia Housing's Procorem portal are all manually combined into spreadsheets. Staff must also create ad hoc crosswalks to reconcile unit designations between the HOME and LIHTC programs. The cost of this status quo is substantial, resulting in slower cycles for corrective action, a high risk of missing early warnings on critical issues like expiring affordability, and a significant drain on staff time due to the duplication of analytical efforts. This prevents effective strategic planning and proactive resource allocation for the city's affordable housing portfolio.

# Interagency Manager Equity Dimensions

From the Interagency Program Manager's viewpoint, the fragmented data landscape has significant equity implications. The inability to get a holistic, cross-program view of compliance and property status obscures where noncompliance issues are clustering geographically or by property type. This fragmentation can delay the identification of and response to problems, meaning mitigation efforts are slower to reach neighborhoods with higher vulnerability. Furthermore, this weak cross-program coordination and lack of a unified oversight system create a higher risk of accidental or premature loss of affordability for units, disproportionately impacting the low-income residents who rely on them.

# Systemic Issue Data Fragmentation

The data landscape for affordable housing compliance in Richmond is highly fragmented, creating significant operational pain and systemic risk. This fragmentation manifests as distinct data silos between the City of Richmond's Department of Housing and Community Development (HCD), the statewide Virginia Housing authority, and the various property managers. The core of the issue lies in the different systems used for different funding sources. Virginia Housing mandates the use of its online Procorem portal for Low-Income Housing Tax Credit (LIHTC) compliance, where property managers must continuously update tenant information. However, for projects also funded by the federal HOME program (administered by the City) or local funds like the Equitable Affordable Housing Program (EAHP), compliance data does not flow from this system. Instead, property managers must repackage and separately submit similar information to the City HCD, often through manual channels like email, PDFs, and specific Excel templates uploaded to OneDrive. This creates a system of duplicate data entry and parallel reporting tracks. For City HCD staff, there is no single source of truth; they must manually collate and reconcile information from owner-submitted reports, spreadsheets, email threads, and paper files, and cross-check them with other systems like HUD IDIS. This splintered approach means that tracking unit-level compliance, inspection schedules, and affordability end-dates is a manual, labor-intensive process, leading to what the context describes as 'lumpy' workloads and a higher risk of missed deadlines or findings. The lack of a consolidated data layer prevents a holistic, portfolio-level view, hindering proactive risk management and strategic oversight.

# Systemic Issue Regulatory Complexity

The burden on property managers and compliance officers is significantly amplified by the complex and sometimes conflicting regulatory requirements of the different funding sources used in affordable housing. A single property may be funded by a combination of the federal HOME program, the Low-Income Housing Tax Credit (LIHTC), and the local Equitable Affordable Housing Program (EAHP), each with its own set of rules. For instance, the Virginia DHCD's HOME compliance training highlights key differences between HOME and LIHTC. On-site inspection schedules differ: HOME requires inspections on a 1- to 3-year cycle depending on project size, while LIHTC requires them at least every 3 years. Income recertification rules also vary; HOME allows for tenant self-certification in certain years but mandates a review of source documents every sixth year, whereas LIHTC generally requires annual third-party documentation. Furthermore, the methodologies for calculating utility allowances can differ between the programs, forcing property managers to reconcile these figures to ensure they do not exceed the limits of either program. The local EAHP adds another layer of complexity, imposing a minimum 30-year affordability period which requires durable record-keeping over decades, and has its own unique application and underwriting process. This regulatory maze creates significant 'anxiety over surprise findings' for property managers, who must maintain parallel tracking systems to ensure they are compliant under each separate regime simultaneously. For city staff, it means compliance verification is not a single check, but a multi-layered analysis against different, non-harmonized standards.

# Evidence From Comparable Cities

The provided research materials focus exclusively on the affordable housing compliance landscape within Richmond, Virginia, and the state-level systems managed by Virginia Housing and the Virginia Department of Housing and Community Development (DHCD). While the initial research prompt mentioned comparable US cities such as Baltimore, Pittsburgh, Louisville, Raleigh, Durham, and Chattanooga as potential sources of insight, the final analysis and cited evidence do not contain any specific information, practices, challenges, or solutions from these or any other comparable cities. The entire analysis is based on primary and secondary sources directly related to Richmond and Virginia's programs and processes.

# Cross Cutting Equity Analysis

The failures and fragmentation of the current affordable housing compliance system have significant and inequitable impacts on the most vulnerable stakeholders. The administrative complexity, characterized by multiple reporting portals, differing regulatory standards, and long-term documentation requirements, imposes high fixed costs. These costs disproportionately burden smaller and BIPOC-led property owners and managers who often have fewer back-office resources and less capacity to absorb the staff time and financial risk associated with navigating this system. The process for local funding like EAHP, which involves technical submission formats and rapid 7-day response windows for information requests, may further tilt access toward larger, more established developers, potentially excluding smaller, community-rooted organizations.

This systemic friction ultimately harms tenants and the city's most vulnerable populations. The fragmented data landscape obscures where noncompliance is clustering, delaying mitigation efforts in neighborhoods with higher vulnerability. Limited city staff capacity, when combined with irregular inspection cycles, can mean that issues in lower-resourced properties are not identified or remediated promptly. This not only affects tenant quality of life but also impedes the city's ability to proactively identify and address noncompliance, which can threaten the long-term affordability of housing units that are most at risk. In essence, the system's inefficiencies are not neutral; they create higher barriers for those with fewer resources and make it harder for the city to protect affordable housing where it is needed most.

# Jobs To Be Done Synthesis

The core motivations and desired outcomes for the key personas center on overcoming the friction caused by a fragmented compliance system. The City HCD Compliance Officer's functional job is to obtain a clear, real-time, unit-level view of compliance status across all programs, enabling them to efficiently manage inspections, enforcement, and reporting with minimal manual data manipulation. The Affordable Property Manager's emotional job is to achieve confidence and peace of mind; they want clear, consistent, and pre-validated compliance checklists to submit accurate reports to multiple agencies without the constant anxiety of triggering unforeseen penalties or findings. Finally, the Interagency Program Manager's systems job is to gain a consolidated, cross-program portfolio view, allowing for strategic coordination, holistic risk assessment, and proactive management of affordability across different funding streams and agency jurisdictions. Collectively, all users are seeking a unified, authoritative system that streamlines workflows, reduces administrative burden, and ultimately protects the integrity of Richmond's long-term affordable housing commitments.
