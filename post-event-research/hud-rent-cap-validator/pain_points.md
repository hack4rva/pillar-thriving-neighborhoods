# Executive Summary

City of Richmond Housing and Community Development (HCD) compliance analysts face significant challenges in their core function of monitoring affordable housing rent limits. Their current process is highly manual, fragmented, and prone to errors, relying on cross-checking scattered PDF documents, emails, and bespoke spreadsheets. Key pain points include managing fragmented and outdated compliance data, navigating the complexity of inconsistent utility allowance schedules, and bearing a high procedural burden to keep up with changing rules and reporting deadlines. These inefficiencies result in a high cost of the status quo, measured in wasted staff time, increased risk of non-compliance findings and late fees during audits, and potential equity risks where low-income tenants could be overcharged. The 'hud-rent-cap-validator' project is designed to directly address these issues by providing an automated tool to validate rent amounts against official limits, thereby increasing accuracy, efficiency, and the overall integrity of the city's affordable housing compliance monitoring.

# Compliance Analyst Persona Profile

The primary user is the City of Richmond Housing and Community Development (HCD) compliance analyst. This individual is responsible for ensuring that housing units designated as affordable, particularly those receiving City assistance or federal funds like LIHTC (Low-Income Housing Tax Credit) and HOME, remain in compliance with rent restrictions over their mandated periods. Their core job involves conducting annual or quarterly compliance reviews. In this situation, the analyst's primary motivation is to auto-validate reported rents from property managers against the current, correct HUD AMI-based rent limits, which vary by bedroom size and specific utility assumptions. The desired outcome is to quickly and accurately identify any out-of-compliance units, enabling them to trigger required notices to property owners and generate clear, defensible documentation of findings for internal records and external audits. They operate within the administrative framework of Richmond, Virginia, and their work directly supports the city's 'Thriving Neighborhoods' pillar and its Equitable Affordable Housing Plan.

# Analyst Pain Points

## Pain Point Title

Fragmented Data and Weak Internal Controls

## Description

Compliance data is scattered across various files and emails, with no centralized database for LIHTC/HOME-restricted units, their affordability expiration dates, or specific rent parameters. A 2021 City audit revealed significant internal control weaknesses, including missing contracts and award letters, a lack of standard operating procedures (SOPs), and no formal system for monitoring deliverables. This fragmentation and lack of procedural rigor makes reliable and timely compliance checks nearly impossible.

## Current Workaround

Analysts manually hunt for scattered files, emails, and contracts. They maintain bespoke spreadsheets to track properties, which may be incomplete or outdated. This often requires back-and-forth emails with property managers to clarify details that should be centrally documented.

## Cost Of Status Quo

Significant time is wasted chasing files, especially during peak audit periods. The lack of clear documentation and SOPs increases the risk of errors, leads to inconclusive audit support, and weakens the city's position when enforcing compliance or resolving findings.

## Pain Point Title

Utility Allowance Complexity and Inconsistency

## Description

Calculating the maximum allowable rent is complicated by utility allowances (UAs), which must be deducted from the base rent limit. The Richmond Redevelopment and Housing Authority (RRHA) issues its own annual UA schedules with changing figures by bedroom size and utility type. Furthermore, Virginia Housing, the state's housing finance agency, outlines multiple UA options and procedures. This creates variation and complexity, making it easy to misapply the correct UA and effective dates for a given property.

## Current Workaround

Staff must manually download the latest UA schedules from RRHA and guidance from Virginia Housing. They then perform hand calculations or use complex spreadsheet formulas to apply the correct deductions, a process that must be repeated for each unit and is highly susceptible to human error.

## Cost Of Status Quo

This process is error-prone and time-consuming. Misapplication of UAs can lead to incorrect compliance assessments, potentially allowing landlords to overcharge low-income tenants without detection. It also creates a significant risk of audit findings if calculations are proven incorrect.

## Pain Point Title

High Process Burden from Changing Rules and Deadlines

## Description

Compliance analysts face a heavy workload just to keep up with evolving rules and external system requirements. For instance, Virginia Housing mandates the use of its Procorem Tenant Portal for updating and validating all tenant certification events. This portal has strict annual reporting deadlines (e.g., March 1 for tenant events), with late fees assessed for any delays. This creates intense, peak-period workloads and high risk if the analyst's internal records are out of sync with the state's portal.

## Current Workaround

Analysts must manually reconcile their internal spreadsheets with the data in the Procorem portal. This involves double data entry and painstaking validation to ensure all certification events are correctly logged and errors are corrected before deadlines, consuming a large portion of their time.

## Cost Of Status Quo

The primary costs are time and compliance risk. The manual reconciliation process is inefficient and stressful. Missing a deadline results in direct financial penalties in the form of late fees. Furthermore, noncompliance discovered during an official audit, rather than self-corrected, can be reportable to the IRS, posing a significant risk to the property's tax credit status.

## Pain Point Title

Communication and Trust Challenges with External Partners

## Description

The credibility of compliance analysts is undermined when communicating findings to property managers, funders, and leadership due to internal documentation gaps. Missing signed agreements, lapses in records retention, and historical conflict-of-interest issues (as noted in the 2021 audit) weaken the department's authority and create challenges when trying to enforce corrective actions or recoup funds.

## Current Workaround

Analysts must spend extra time building a case for each finding, often re-gathering documentation that should have been readily available. They engage in extended back-and-forth communication to justify their findings, which can become adversarial without a strong, unimpeachable record.

## Cost Of Status Quo

This erodes trust with external partners and weakens the city's enforcement position. It can delay or prevent the resolution of non-compliance, prolonging periods where tenants may be overcharged or units are out of compliance. It also damages the department's reputation and credibility with funders and community stakeholders.


# Richmond Virginia Specific Evidence

Evidence from Richmond, Virginia, highlights several critical pain points for affordable housing compliance analysts. Firstly, there is significant data fragmentation and weak internal controls. A 2021 City Auditor's report on the Department of Housing and Community Development (HCD) found systemic issues, including missing signed contracts and award letters, a failure to monitor deliverables specified in agreements, and a lack of standard operating procedures (SOPs). These record-keeping and process gaps hinder reliable and timely compliance checks, making audit preparation difficult and inconclusive. This is further supported by the 'One Richmond: An Equitable Affordable Housing Plan,' which explicitly recommends creating a LIHTC monitoring database to track affordability expirations, indicating that no such centralized system currently exists.

Secondly, the complexity and inconsistency of utility allowances (UA) make rent-cap calculations prone to error. The Richmond Redevelopment and Housing Authority (RRHA) issues annual UA schedules with fluctuating figures based on bedroom size and utility type. Analysts must correctly select and apply the appropriate UA and its effective dates, a critical and easily mishandled task. Compounding this, Virginia Housing, which oversees the LIHTC program, requires UA deductions from maximum tax credit rents and provides multiple UA options and procedures, introducing further variation that must be meticulously tracked and documented for each property.

Thirdly, analysts face a high process burden due to evolving rules, multiple portals, and strict deadlines, which carry the risk of findings and late fees. Virginia Housing mandates the use of its Procorem Tenant Portal for all tenant certification events, requires strict annual reporting for mechanisms like the Average Income Test (AIT), and assesses late fees for missed deadlines. This creates intense workload pressures, especially if the analyst's internal spreadsheets are not perfectly synchronized with the state's system.

Finally, communication and trust with external partners are challenged during the resolution of findings. The documentation gaps and records retention lapses identified in the city audit, along with identified conflict-of-interest issues, undermine the city's credibility when notifying property owners, managers, and funders of violations or required recoupments.

# Analysis Of Comparable Cities

## City Name

Pittsburgh

## Key Finding

The city's housing authority (HACP) publishes frequent and highly detailed utility allowance schedules, broken down by utility, appliance, and bedroom size. This underscores the complexity common to Public Housing Authorities and highlights the risk of misapplication, which is a parallel challenge to what is experienced in Richmond.

## Source Document Type

Utility Allowance Schedule

## City Name

Louisville

## Key Finding

The city's HOME Compliance Guide reflects the heavy and continuous documentation, monitoring, and recordkeeping requirements imposed on recipients of federal HOME funds. This mirrors the significant administrative burden and process demands placed on compliance staff in Richmond.

## Source Document Type

Compliance Manual

## City Name

National (LIHTC Context)

## Key Finding

Sector analysis from Shelterforce indicates that while industry insiders claim high compliance rates for the LIHTC program, tenant advocates report noncompliance as a significant problem. This suggests that there are national enforcement gaps and questions about how well rules are monitored across jurisdictions, strengthening the case for more rigorous and automated local validation tools.

## Source Document Type

Sector Analysis Article


# Current Workarounds And Status Quo Costs

The current workflow for compliance staff is a collection of inefficient and high-risk workarounds. Lacking a centralized database, analysts are forced to manually download rent and income limit tables from HUD and state agency websites, along with separate utility allowance schedules from the Richmond Redevelopment and Housing Authority (RRHA). This information is then used to populate and maintain bespoke, often outdated, spreadsheets where rent ceilings are hand-calculated. When discrepancies arise, the process devolves into a series of emails with property managers to seek clarification. This system is fragile and breaks down easily: deliverables and contract terms are not consistently monitored, records retention is poor, and the application of utility allowances is inconsistent across properties. The cost of maintaining this status quo is substantial. In terms of staff resources, an enormous amount of time is consumed by chasing files, reconciling spreadsheets, and performing manual rework, especially during stressful audit windows. The compliance risk is high, with the potential for late reporting fees from state agencies and, more seriously, reportable noncompliance to the IRS if issues are discovered during audits. Most importantly, there is a significant equity risk, as the slow, error-prone process can lead to delayed detection of non-compliant units, potentially causing low-income tenants to be overcharged without timely recourse.

# Cross Cutting Equity Dimensions

The challenges in affordable housing compliance have profound equity implications, disproportionately affecting the most vulnerable residents and undermining broader community goals. The primary group affected are extremely low- and very low-income households. Richmond's own housing plan documents severe rent burdens and large affordability gaps for households at 30-50% of the Area Median Income (AMI). For these residents, an error in applying a utility allowance or a failure to enforce the correct rent cap is not a minor administrative issue; it can result in illegal overcharges that consume a significant portion of their limited income, increasing housing instability. Accurate and timely rent-cap validation serves as a direct financial protection for these households.

Beyond individual tenants, the current system's inefficiencies exclude or fail to adequately serve entire communities. Fragmented monitoring and the lack of a central database create a high risk of missing affordability expiration dates on LIHTC properties. This means the city may lose opportunities to intervene and preserve affordable units, particularly in neighborhoods targeted in the city's equitable housing goals. This failure to act can accelerate displacement and undermine efforts to create mixed-income, thriving neighborhoods.

Furthermore, the documentation gaps, lack of SOPs, and conflict-of-interest issues noted in the city audit can erode trust among tenants, community partners, and non-profit developers. This breakdown in trust undermines the collaborative foundation needed for equitable program delivery and robust tenant protections, making it harder to implement housing solutions that truly serve the community.

# Audit Findings Summary

## Finding Id

Deficiencies in Grant/Loan Monitoring, SOPs, and Record Retention

## Title

Lack of Standard Operating Procedures and Failure to Monitor Grant/Loan Deliverables

## Description

The 2021 audit of the Department of Housing and Community Development (HCD) found that upon becoming a new department in 2018, management did not develop standard operating procedures (SOPs) to guide staff. This led to significant operational failures, including staff being unable to locate signed award letters or contracts for multiple grants. Furthermore, the audit revealed that HCD staff did not monitor the deliverables specified in grant and loan agreements. These issues were compounded by a failure to adhere to the official Records Retention and Disposition Schedule, creating gaps in documentation crucial for audits and compliance verification.

## Source Audit

City of Richmond HCD Audit 2021


# Data And Systems Challenges

A primary operational failure for Richmond's HCD compliance analysts is the absence of a centralized database for monitoring LIHTC and HOME-restricted housing units. This systemic issue is highlighted in the city's own 'One Richmond: An Equitable Affordable Housing Plan,' which explicitly calls for creating a database to track expiring affordability. In its place, analysts are forced to rely on a fragmented and unreliable system of scattered files, emails, and bespoke spreadsheets. This manual workaround involves downloading numerous PDFs for HUD, HOME, and LIHTC rent/income limits and then manually cross-checking them against rent rolls provided by property managers. This process is not only time-consuming and inefficient but also highly susceptible to errors from using outdated data or making calculation mistakes. The reliance on these outdated systems creates significant delays, especially during peak audit windows, and makes it difficult to track units consistently throughout their compliance periods, thereby increasing compliance risk and weakening the city's ability to provide conclusive documentation for audits.

# Procedural And Policy Deficiencies

A 2021 audit of Richmond's Department of Housing and Community Development (HCD) identified profound gaps in its formal policies and procedures, which create significant hurdles for compliance staff. The audit found that the department failed to develop Standard Operating Procedures (SOPs) to guide its staff, resulting in inconsistent and unreliable practices. Specific deficiencies noted included the inability to locate signed award letters or contracts for grants and a complete lack of monitoring for deliverables specified in grant and loan agreements. These procedural failures are exacerbated by poor records management, with the audit citing non-compliance with the city's Records Retention and Disposition Schedule. Such gaps not only make daily compliance tasks difficult but also undermine the city's credibility during audits and in communications with property managers and funders, weakening its position in enforcement actions.

# Utility Allowance Calculation Complexity

A specific and highly error-prone pain point for compliance analysts is the calculation and application of utility allowances (UAs). This task is essential for determining the correct rent ceiling, as the UA must be subtracted from the maximum allowable rent. The complexity arises from multiple, frequently updated sources. For instance, the Richmond Redevelopment and Housing Authority (RRHA) issues annual UA schedules with detailed and changing dollar amounts based on bedroom size and specific utility types. Analysts must ensure they are using the correct schedule and figures for the correct time period. Compounding this, Virginia Housing, the state monitoring agency, has its own set of rules and procedures for UAs, including multiple options for their calculation. This forces analysts to track and document variations across different properties and programs, significantly increasing the risk of miscalculation. An incorrect UA application can lead directly to an incorrect rent ceiling, potentially resulting in non-compliance findings or, more critically, tenant overcharges.

# Governance And Oversight Issues

## Issue Type

Conflict of Interest and Lack of Internal Controls

## Description

A 2021 audit of Richmond's Housing and Community Development (HCD) department revealed significant governance failures. These included a specific conflict of interest where the Richmond Redevelopment and Housing Authority (RRHA) was awarded funding from the Affordable Housing Trust Fund (AHTF) in FY20, an action prohibited by the governing ordinance. The audit also uncovered a broader lack of internal controls, such as the absence of standard operating procedures (SOPs) for staff, a failure to monitor deliverables for grant and loan agreements, and inadequate records management, evidenced by the inability to locate signed contracts and award letters. These issues collectively weaken the city's ability to ensure compliance and steward public funds, undermining credibility with partners and the public.

## Source

City of Richmond HCD Audit 2021: Findings on conflict of interest (AHTF Board), lack of standard operating procedures, and failure to monitor deliverables.


# Impact On Stakeholders

## Stakeholder Group

Low-Income Tenants

## Impact Description

The direct impact of compliance monitoring failures on low-income tenants is significant and multifaceted. Errors in calculating maximum allowable rents, often stemming from the misapplication of complex utility allowances, can lead to tenants being illegally overcharged. For households already facing severe rent burdens, particularly those at 30-50% of the Area Median Income, these overages can create immense financial strain and increase the risk of housing instability. Furthermore, delays in identifying and correcting non-compliant units, caused by fragmented data and manual review processes, mean that tenants may live in and pay for units that do not meet the affordability standards they are entitled to for extended periods. This 'equity risk' represents a fundamental failure to protect the city's most vulnerable residents and ensure the integrity of its affordable housing programs.


# Implications For Validator Tool Design

## Feature Recommendation

Automated Utility Allowance (UA) Integration and Calculation

## Justification

The research highlights that a critical and error-prone pain point for compliance analysts is manually looking up and applying the correct utility allowances from various sources like the RRHA. These allowances change annually and vary by bedroom size and utility type. An automated feature that integrates the latest UA schedules and automatically deducts the correct allowance from the maximum rent limit would directly solve the problem of 'inconsistent utility allowances' and 'error-prone manual lookups.' This would significantly increase the accuracy and speed of compliance validation, reducing the risk of overcharging low-income tenants and freeing up analyst time during busy audit periods.

## Priority

High

