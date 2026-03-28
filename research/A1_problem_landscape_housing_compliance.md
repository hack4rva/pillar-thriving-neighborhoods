---
title: "Richmond, VA's Affordable Housing Compliance: Where Tracking Works — and Fails"
pillar: thriving-neighborhoods
section: A
problem_statement: housing-compliance
tags:
  - affordable housing
  - compliance monitoring
  - AHTF
  - AHTEP
  - EAHP
  - deed-restricted units
summary: "Analyzes Richmond's fragmented affordable housing compliance infrastructure across AHTF, AHTEP, and EAHP programs, identifying systemic monitoring gaps revealed by a 2026 City audit and opportunities for lightweight tracking tools using public data."
key_entities:
  - Affordable Housing Trust Fund (AHTF)
  - Affordable Housing Partial Tax Exemption Program (AHTEP)
  - Equitable Affordable Housing Program (EAHP)
  - Housing and Community Development (HCD)
datasets:
  - Richmond 2020 Affordable Housing Matrix
  - HUD LIHTC CSV
geography: Richmond, VA
source: parallel-ai
status: raw
related_reports:
  - A3_problem_landscape_compare_statements
  - D3_data_housing_programs
  - F3_opportunities_compliance_monitor
---

> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Richmond, VA's Affordable Housing Compliance: Where Tracking Works — and Fails

## Executive Summary

Richmond, Virginia manages a growing portfolio of affordable housing investments, but its compliance monitoring infrastructure is fragmented, manual, and vulnerable to governance gaps. The City deploys capital through three primary channels, each with distinct compliance clocks: the Affordable Housing Trust Fund (AHTF) requires annual certifications by January 15 [1]; the Affordable Housing Partial Tax Exemption Program (AHTEP) requires annual renewals by November 1 [2]; and the Equitable Affordable Housing Program (EAHP) enforces performance through ad-hoc "on hold" statuses [3]. 

Monitoring is currently human- and email-driven across siloed systems. Housing and Community Development (HCD) staff coordinate compliance across EnerGov portals, OneDrive uploads, and the City Assessor's back office without a unified system-of-record [2] [4] [3]. Furthermore, verification relies heavily on self-reported tenant income and rent levels, placing the burden of proof on property owners with no visible automated cross-checks [5]. 

A 2026 City audit revealed significant governance and accounting gaps, noting that the City failed to follow its own funding rules due to a lack of documented implementation plans and staff turnover [6] [7]. As production scales—with recent AHTF rounds funding over 1,400 units [1] —the 15-year monitoring tail will quickly outpace staff capacity. However, a wealth of public data (HUD limits, Assessor parcels, Legistar ordinances) presents an immediate opportunity to build lightweight, software-addressable tracking tools without requiring access to confidential City contracts.

## Purpose and Scope

This report investigates how the City of Richmond, Virginia, tracks whether developments receiving public investment honor their affordability commitments. The analysis relies exclusively on verifiable public information, including program guidelines, municipal audits, and official City portals. 

### Geography Clarified: Richmond, Virginia (RVA)
To avoid cross-city policy confusion, this report focuses strictly on Richmond, Virginia. While search parameters occasionally surface data from Richmond, California, the legal, regulatory, and programmatic contexts are entirely distinct. All findings, facts, and recommendations herein apply to RVA.

## Investment Channels and Typical Compliance Terms

Richmond utilizes a mix of below-market loans, ARPA-derived funds, and tax incentives to spur affordable housing development. Each program carries distinct affordability terms and reporting obligations.

### AHTF Loans: 15-Year Affordability and Annual Certifications
The Affordable Housing Trust Fund (AHTF) provides loans and grants for the creation and preservation of affordable housing [1]. Projects receiving AHTF rental funding must agree to a minimum 15-year affordability period [1]. During construction, recipients must submit quarterly progress reports; upon completion, they must submit a Final Report including a Certificate of Occupancy [1]. Throughout the 15-year period, owners must provide "annual certifications of compliance with all applicable affordability requirements" by January 15 of each year [1].

### EAHP: ARPA-Backed Awards with "On Hold" Enforcement
The Equitable Affordable Housing Program (EAHP) provides funding for affordable housing development and preservation [3]. HCD utilizes a strict enforcement lever for this program: projects by developers who are not progressing satisfactorily on other City-funded projects can be placed on "hold status" [3]. HCD reserves the right to place additional monitoring requirements on developers with poor past performance [3].

### AHTEP: 15-Year Tax Exemption with Strict Rent/Income Verification
The Affordable Housing Partial Tax Exemption Program (AHTEP) offers a partial real estate tax exemption for up to 15 years to property owners who rehabilitate multi-family or single-family properties [2] [4]. To qualify, at least 30% of the units must be affordable to households earning up to 80% of the Area Median Income (AMI), and maximum rent cannot exceed 30% of the tenant's income [2]. Property owners must file a renewal application annually by November 1, bearing the "burden of proof" to demonstrate compliance with tenant income and monthly rent guidelines [2] [5].

### HOME-ARP Administration
The City's HOME-ARP program, which focuses on affordable rental housing for qualifying populations, is administered directly by the City of Richmond's Department of Housing & Community Development, which manages the program's administration, monitoring, and planning components [8].

### Program-by-Program Compliance Snapshot

| Program | Funding Type | Affordability Term | Annual Reporting Date | Verification Artifacts | Systems Touched | Enforcement Levers |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AHTF** | Loans/Grants | 15 Years (Rental) | January 15 | Annual Affordability Certification, COs | Email, Internal HCD | Recalling awards, repayment [1] |
| **AHTEP** | Partial Tax Exemption | 15 Years | November 1 | Rent/Income proof, Renewal Application | EnerGov, Assessor | Termination of eligibility [2] [5] |
| **EAHP** | ARPA Grants/Loans | Project-specific | Varies | Green building certs, project schedules | OneDrive, Email | "On hold" status, waitlist demotion [3] |

*Key Takeaway*: Compliance dates and evidence requirements vary drastically by program. The lack of a unified calendar increases the risk of missed deadlines and unenforced affordability covenants.

## Monitoring Structure Today

Compliance monitoring in Richmond is distributed across HCD program staff, the City Assessor, and property owners, coordinated primarily through disparate software portals and manual handoffs.

### HCD Roles and Processes
HCD is the primary engine for compliance. For AHTF projects, HCD monitors progress through site visits, status reports, and draw requests during construction [1]. Post-construction, HCD receives the annual affordability certifications [1]. For EAHP, HCD manages application intakes via OneDrive links sent directly to applicants [3]. 

### Assessor's Office Interfaces
The AHTEP workflow requires tight coordination between HCD and the City Assessor. Once HCD deems an AHTEP application eligible, it notifies the Assessor's Office, which schedules a Base Value inspection and issues a report within 10 business days [4]. After construction, the applicant must request a Final Inspection Report from the Assessor, which triggers the Director of HCD to grant the tax exemption [4].

### Systems in Use
There is no public, unified compliance registry. AHTEP applicants must create an account through the City's EnerGov online portal to process fees and applications [2] [4]. EAHP applications are handled via Microsoft OneDrive [3]. Routine communication and application submissions often default to a central email address (HCD@Richmondgov.com) [2].

## Where Monitoring Breaks Down

While the rules for affordability exist, the operational reality of monitoring is hindered by fragmented systems, manual verification processes, and documented governance gaps.

### Data Fragmentation and Siloed Systems
The reliance on EnerGov for tax exemptions, OneDrive for EAHP, and email for AHTF creates severe data fragmentation. Staggered due dates (November 1 for AHTEP, January 15 for AHTF) managed across different platforms create "dead zones" where multi-agency handoffs (e.g., between HCD and the Assessor) can easily be dropped [2] [4] [1].

### Manual, Self-Reported Rent and Income Verification
AHTEP explicitly places the "burden of proof" on applicants to demonstrate that their units meet program guidelines for tenant incomes and monthly rents [5]. Because the City relies on owner-supplied data to verify that rents do not exceed 30% of a tenant's income, HCD staff must manually review these submissions to detect misreporting. High verification costs and privacy limitations make this manual rent/income check highly prone to error.

### Governance and Accounting Gaps Impair Traceability
A February 2026 report from City Auditor Riad Ali revealed that Richmond did not consistently follow its own funding rules for the AHTF [6] [7]. The audit found that the City never created a formal plan or procedures to ensure legal compliance, and failed to set up a separate accounting fund for the trust fund until December 2025 [6]. For example, $2.4 million in expiring tax abatement revenues credited to a special reserve in 2022 was never transferred to the trust fund [6]. The audit explicitly cited "staff and leadership turnover" as a reason why policies could not be verified as implemented [7]. If upstream financial flows lack traceability and documented implementation plans, downstream unit-level compliance is likely suffering from similar systemic weaknesses.

### Capacity Strain from Scaling Production
Early production wins mask a growing downstream monitoring burden. In FY2024, the AHTF awarded $7 million to produce 822 units; in FY2025, it awarded $5.9 million to produce 580 units [1]. Every closed deal adds a 15-year monitoring obligation to HCD's plate [1]. Without a scalable registry and automated reminders, cumulative compliance debt will inevitably outpace staff capacity.

## Public Data That Can Support Monitoring Now

Despite internal system fragmentation, a robust "outside-in" compliance baseline can be built using entirely public data, without requiring access to confidential City contracts.

### Data Inventory and Access Points
* **HUD AMI and FMR Limits**: The City publicly links to HUD's Area Median Income and Fair Market Rent datasets to define AHTEP eligibility [2].
* **Legistar Ordinance Data**: City Council ordinances, funding authorizations, and project approvals are publicly accessible via the City's Legistar system [7].
* **Assessor and Permit Data**: Base value inspections and Certificates of Occupancy act as milestone triggers for AHTEP and AHTF [4] [1]. Property assessment data is public.

### Quick-Win Uses
By scraping HUD AMI/FMR data, Legistar awards, and public parcel data, civic technologists can map properties with claimed exemptions against required affordability thresholds. This allows for the automated calculation of maximum allowed rents by bedroom size and the creation of a public-facing dashboard tracking renewal windows.

## Software Opportunity Assessment

### Weekend-Build, Public-Data Tools
Several high-impact tools can be built in a single weekend using public data:
* **Unified Compliance Calendar**: A centralized tracker that sends automated email reminders 60 and 30 days before the January 15 (AHTF) and November 1 (AHTEP) deadlines.
* **Rent Cap Calculator**: A web tool that ingests HUD AMI/FMR data to auto-calculate maximum allowable rents (30% of income at 80% AMI) by bedroom size, giving owners a clear target before they submit their renewals.
* **Legistar Scraper**: A script to compile all City Council affordable housing award ordinances, mapping them to specific parcels to create an open-source "compliance watch list."

### Requires Internal Data or Policy Changes
True end-to-end verification requires City intervention:
* **System Integration**: Scheduled data exports from the EnerGov portal and the Assessor's back-office systems.
* **Standardized Forms**: A unified, City-mandated tenant income certification form to replace ad-hoc owner submissions.
* **Document Access**: Access to internal loan agreements, regulatory agreements, and deed restrictions to verify exact unit-mix covenants.
* **Policy Updates**: Ordinance-backed implementation plans assigning a specific system-of-record owner for compliance data, as recommended by the 2026 audit [6].

## Action Plan

### 30 Days: Ship V1 Externals
* Publish the HUD AMI/FMR rent cap calculator and submission checklist.
* Stand up the public deadline tracker (Nov 1 / Jan 15).
* Scrape Legistar to compile a baseline list of awarded projects and their associated parcels.

### 60 Days: Integrate and Standardize
* Petition HCD and IT for read-only API access or scheduled CSV exports from EnerGov and the Assessor's database.
* Pilot a standardized annual certification form with a small cohort of cooperative AHTF developers.

### 90 Days: Institutionalize
* Advocate for City Council to codify Standard Operating Procedures (SOPs) for compliance monitoring.
* Assign a dedicated system-of-record owner within HCD to manage the unified compliance registry, directly addressing the governance gaps highlighted in the 2026 audit.

## Balanced Case Studies

### Success: Scaling AHTF Awards
The AHTF has successfully scaled its capital deployment, awarding $7 million to produce 822 units of affordable housing in FY2024, and another $5.9 million for 580 units in FY2025 [1]. This demonstrates strong front-end deal execution and a clear commitment to expanding the housing supply.

### Failure: 2026 Audit Findings on Revenue Flows
Conversely, the back-end administration of these funds has faltered. The 2026 City Auditor report found that $2.4 million in tax abatement revenues credited to a special reserve in 2022 was never transferred to the trust fund [6]. The audit highlighted that key requirements were "unclear or not adhered to, in part due to the absence of a documented implementation plan" and staff turnover [6] [7].

## Facts, Inferences, Unknowns

### Facts (with URLs)
* AHTF requires a 15-year affordability period for rental projects, with annual certifications due January 15 (https://rva.gov/sites/default/files/2025-11/AHTF%20Program%20Guidelines%20%28upd%2011.5.25%29.pdf) [1].
* AHTEP requires annual renewal by November 1, mandating that 30% of units are affordable to those at or below 80% AMI, with rent not exceeding 30% of income (https://rva.gov/housing-and-community-development/partial-tax-exemption) [2].
* AHTEP applicants must use the EnerGov portal and coordinate with the Assessor's Office for Base Value Reports within 10 days (http://rva.gov/sites/default/files/2021-11/Affordable%20Housing%20Partial%20Tax%20Exemption%20Flow%20Chart.pdf) [4].
* EAHP applications are submitted via OneDrive, and HCD can place underperforming developers on "hold status" (https://rva.gov/sites/default/files/2025-04/EAHP%20FY25%20NOFA%20Packet.pdf) [3].
* A 2026 audit found the City failed to transfer $2.4 million to the AHTF in 2022 and lacked documented implementation plans (https://www.richmonder.org/audit-finds-city-fell-short-on-paying-required-revenues-into-affordable-housing-trust-fund/) [6].
* HCD directly administers and monitors the HOME-ARP program (https://rva.gov/sites/default/files/2023-03/Draft%20HOME-ARP%20Allocation%20Plan%20-%20Richmond.pdf) [8].

### Inferences (Clearly Labeled)
* *Inference*: There is no unified compliance registry. Because AHTEP uses EnerGov, EAHP uses OneDrive, and AHTF relies on email/PDFs, compliance data is highly siloed.
* *Inference*: HCD faces severe capacity strain. The addition of 1,400+ AHTF units in just two years, combined with the staff turnover noted in the 2026 audit, suggests that manual monitoring of 15-year covenants is unsustainable.
* *Inference*: Rent verification is highly vulnerable to inaccuracies. Because the "burden of proof" is on the owner and there is no automated cross-check mentioned in public docs, misreported tenant incomes likely go undetected.

### Unknowns (What Cannot Be Verified Publicly)
* Whether Richmond currently utilizes Section 108 loans specifically for affordable housing, and what exact compliance terms those carry.
* The exact number of active AHTEP properties currently receiving the tax exemption and their unit-level affordability mix.
* The internal Standard Operating Procedures (SOPs) HCD staff use to validate self-reported tenant income documents.
* Whether the City's EnerGov and Assessor databases have accessible APIs that could be utilized for automated compliance tracking.

## References

1. *[PDF] GUIDELINES - RVA.gov*. https://rva.gov/sites/default/files/2025-11/AHTF%2520Program%2520Guidelines%2520%2528upd%252011.5.25%2529.pdf
2. *Affordable Housing Partial Tax Exemption Program (AHTEP)*. https://www.rva.gov/housing-and-community-development/partial-tax-exemption
3. *Equitable Affordable Housing Program (EAHP)*. https://rva.gov/sites/default/files/2025-04/EAHP%20FY25%20NOFA%20Packet.pdf
4. *[PDF] Department of Housing and Community Development (HCD)*. http://rva.gov/sites/default/files/2021-11/Affordable%20Housing%20Partial%20Tax%20Exemption%20Flow%20Chart.pdf
5. *[PDF] City of Richmond - RVA.gov*. https://rva.gov/sites/default/files/2021-11/The%20Affordable%20Housing%20Partial%20Tax%20Exemption%20Program%20Fact%20Sheet_0.pdf
6. *Audit finds city fell short on paying required revenues into Affordable Housing Trust Fund*. https://www.richmonder.org/audit-finds-city-fell-short-on-paying-required-revenues-into-affordable-housing-trust-fund/
7. *Richmond audit finds city didn’t follow Affordable Housing Trust Fund rules*. https://www.vpm.org/news/2026-02-11/rva-city-council-avula-robertson-affordable-housing-trust-fund-ali-audit
8. *HOME-ARP Allocation Plan*. https://rva.gov/sites/default/files/2023-03/Draft%20HOME-ARP%20Allocation%20Plan%20-%20Richmond.pdf