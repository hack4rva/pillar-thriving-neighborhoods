# Executive Summary

Affordable housing compliance data for Richmond, Virginia, is fragmented across various city and federal sources, with significant differences in accessibility. Foundational datasets, such as the City Assessor's property data, are highly accessible, offered via both bulk Excel downloads and a public-facing ArcGIS REST API for parcel information. Similarly, essential federal data from HUD, including Fair Market Rents (FMRs), Small Area FMRs (SAFMRs), and Income Limits, are available with clear update schedules and APIs, providing crucial benchmarks for compliance. However, there are major gaps in city-specific compliance information. The city does not publish a consolidated public database or even a simple count of all properties currently under active compliance for its key affordable housing programs (AHTF, AHTEP, EAHP). Furthermore, while the rules for programs like the Affordable Housing Partial Tax Exemption Program (AHTEP) are public, the specific data fields tracked within the city's EnerGov management system remain undocumented. Linking City Council funding approvals from the Legistar system to specific properties is a manual process, as parcel identifiers are typically buried in PDF attachments rather than structured data fields. Therefore, achieving a complete picture of the affordable housing landscape requires significant manual effort to bridge data gaps and connect disparate sources.

# Energov Ahtep Data Fields

While the City of Richmond does not publicly document the specific data schema for its EnerGov system, the operational requirements of the Affordable Housing Partial Tax Exemption Program (AHTEP) indicate that the system must store data beyond simple application status. To manage compliance, EnerGov likely stores fields related to: the total number of units in a property, the number of units designated as affordable, the specific Area Median Income (AMI) tier for each restricted unit (e.g., up to 80% AMI), and tenant income verification to ensure rent does not exceed 30% of their adjusted gross income. Public-facing documents confirm that annual renewal applications are required to verify these conditions, meaning the system tracks application and compliance status over time. However, specific fields like 'unit_count_80_ami' or 'rent_level' are not explicitly published.

# Assessor Property Data Accessibility

## Api Access

True

## Api Details

Richmond GeoHub ArcGIS REST API

## Bulk Download

True

## Bulk Download Format

Excel

## Manual Lookup Portal Url

https://www.rva.gov/assessor-real-estate/property-search


# Hud Dataset Utility And Schedule

## Recommended Dataset For Validation

For general metro-level validation, the Fair Market Rents (FMR) dataset is recommended. For more granular, ZIP-level precision, the Small Area FMRs (SAFMRs) can be used, particularly if program rules or the local Public Housing Authority (PHA) have adopted them.

## Safmr Applicability

Richmond, VA is not listed among the metropolitan areas where HUD has mandated the use of Small Area FMRs (SAFMRs).

## Fy2026 Income Limits Release Date

May 2026

## Hud Data Api Availability

True


# Active Compliance Property Count

The City of Richmond does not publish a consolidated public count of properties under active compliance obligations for the AHTF, AHTEP, and EAHP programs. While program documents like the EAHP FY25 NOFA and AHTF funding requests describe program criteria and specific awards, they do not provide a citywide, active inventory. An official count is not publicly available and would likely require a direct query to city departments or a formal information request.

# Legistar To Parcel Mapping Reliability

## Direct Mapping Possible

False

## Parcel Identifier Location

PDF attachments

## Reliability Assessment

The mapping process is not reliable for automated extraction from structured Legistar data. Legistar records for AHTF awards primarily document the ordinance and appropriation details. Parcel identifiers are not typically included in the structured metadata fields. To link an award to a specific parcel, it is generally necessary to perform a manual review of the PDF attachments and supporting documents associated with the legislative file.


# Other Relevant Hud Datasets

Beyond AMI and FMR datasets, other relevant HUD datasets for housing compliance in Richmond, VA include the Low-Income Housing Tax Credit (LIHTC) Property-Level Data, which is useful for cross-referencing compliance for tax-credit properties, and the Comprehensive Housing Affordability Strategy (CHAS) data, which provides context on housing needs and eligibility. HUD also provides API access for its Income Limits and FMR data.

# Public Database Of Subsidized Units

## Database Name

No unified public database identified

## Platform

N/A

## Url

N/A

## Data Comprehensiveness Notes

The City of Richmond does not maintain a unified, comprehensive public database or data feed of all affordable housing units receiving public subsidies. While the city provides extensive GIS parcel layers and interactive mapping tools for property information and sales data, a specific, consolidated inventory or registry of subsidized affordable units is not published for public access.


# Richmond Affordable Housing Programs

## Acronym

AHTEP

## Full Name

Affordable Housing Partial Tax Exemption Program

## Purpose

Provides a partial tax exemption for properties to incentivize affordable housing. Program requirements include having a minimum of 30% of units affordable for individuals or families earning up to 80% of the Richmond-Petersburg MSA Area Median Income (AMI), with rents not exceeding 30% of the occupant's monthly adjusted gross income. The program requires annual renewal applications with verification of compliance.

## Acronym

AHTF

## Full Name

Affordable Housing Trust Fund

## Purpose

A city fund dedicated to supporting affordable housing projects. Awards and appropriations from this fund are approved through city ordinances, which are recorded in the Legistar system. Mapping these awards to specific parcels often requires reviewing PDF attachments within the legislative records.

## Acronym

EAHP

## Full Name

Equitable Affordable Housing Program

## Purpose

A program that makes funding available for affordable housing developments. According to its Notice of Funding Availability (NOFA), priority is given to projects that advance the city's strategic housing goals, with a particular emphasis on awarding points for rental projects that serve extremely low-income and very low-income households.


# Data Systems And Portals

## System Name

EnerGov

## Function

Permitting and Plan Review

## Data Held

Manages applications for programs like the AHTEP. Public documentation indicates it stores application/renewal status and required verifications, but specific data fields such as unit counts, AMI tiers, or rent levels are not publicly documented.

## Url

https://energov.richmondgov.com/

## System Name

City Assessor's Data Request Portal

## Function

Bulk Property Data Export

## Data Held

Provides a 'Public Data Set' in Excel format, updated monthly. This dataset includes detailed information on each parcel in the city, such as address/legal description, land and building characteristics, ownership information, and assessment history.

## Url

https://www.rva.gov/assessor-real-estate/data-request

## System Name

Richmond GeoHub (ArcGIS)

## Function

Geographic Information System (GIS) Data Portal

## Data Held

Hosts city property ownership information mapped by land parcels. This data is exposed as a public ArcGIS Feature Service, which can be queried via a standard REST API for programmatic access.

## Url

https://richmond-geo-hub-cor.hub.arcgis.com/datasets/parcels-1

## System Name

City Assessor's Property Search

## Function

Manual Property Data Lookup

## Data Held

An interactive web application that allows users to search the city's property database using various criteria, including Parcel ID, Address, Land Value, and Consideration Amount.

## Url

https://www.rva.gov/assessor-real-estate/property-search

## System Name

Legistar

## Function

Legislative Tracking

## Data Held

Contains city ordinances and appropriations, including records of funding approvals for the Affordable Housing Trust Fund (AHTF). Parcel identifiers are generally not available in structured metadata and must be found within attached PDF documents.

## Url

https://richmondva.legistar.com/LegislationDetail.aspx?ID=7868926&GUID=3ECE1988-CA4F-4699-8BD3-242D6AAC6906&Options=&Search=

## System Name

HUD USER Portal

## Function

Federal Housing Data and Research

## Data Held

A source for key datasets used in housing compliance, including Fair Market Rents (FMR), Small Area FMRs (SAFMRs), annual Income Limits, Low-Income Housing Tax Credit (LIHTC) property-level data, and Consolidated Planning/CHAS data. Data is available via downloads and APIs.

## Url

https://www.huduser.gov/portal/datasets/update-schedule.html


# Data Accessibility Overview

The accessibility of Richmond's housing-related data varies significantly by dataset and can be categorized as follows:

**API Access:**
*   **City Assessor Parcel Data:** The city's parcel data, which includes property ownership information, is exposed as a public ArcGIS Feature Service. This service can be queried via a standard REST API, allowing for automated and programmatic access to geographic and property data.
*   **HUD Datasets (FMRs & Income Limits):** The U.S. Department of Housing and Urban Development (HUD) provides an API for accessing Fair Market Rents and Income Limits data, which is essential for validating rent and income eligibility for affordable housing programs.

**Bulk Download:**
*   **City Assessor Public Data Set:** The Richmond Assessor's Office provides a comprehensive Public Data Set available for free download in Excel format. This dataset is updated monthly and includes three files containing detailed information on every parcel, such as address, legal description, land and building characteristics, ownership information, and assessment history.
*   **Other HUD Datasets:** Datasets like the Low-Income Housing Tax Credit (LIHTC) property-level data and Consolidated Planning/CHAS data are also available for download from the HUD USER portal.

**Manual Search / Document Review:**
*   **EnerGov System:** Access to information within the city's EnerGov system is limited to manual lookups on its public portal. There is no public documentation on the database schema, nor is there an option for bulk data export or API access.
*   **Legistar Records:** While City Council ordinances approving Affordable Housing Trust Fund (AHTF) awards are public on Legistar, mapping these awards to specific parcels requires manually opening and reviewing attached PDF documents, as parcel identifiers are not typically included in the structured metadata of the records.
*   **Property Search Tools:** The city offers interactive web applications for property and parcel tax searches, but these are designed for manual, one-off lookups by users.

# Identified Data Gaps And Limitations

Despite the availability of some datasets, several critical data gaps and limitations prevent a complete and automated analysis of affordable housing compliance in Richmond:

*   **No Consolidated Compliance Count:** The city does not publish a consolidated public count or a comprehensive list of properties that are under active compliance obligations for its major housing programs, including the Affordable Housing Trust Fund (AHTF), the Affordable Housing Partial Tax Exemption Program (AHTEP), and the Equitable Affordable Housing Program (EAHP). Program documents describe funding criteria but do not provide a running inventory of active properties, meaning this information would likely require a direct query to city departments or a Freedom of Information Act (FOIA) request.

*   **Undocumented EnerGov Data Fields:** While the public can see the eligibility and renewal requirements for the AHTEP program (e.g., 30% of units at or below 80% AMI), the specific data fields that the city's EnerGov system stores to track this compliance are not publicly documented. It is unknown what level of detail is stored for unit counts, AMI tiers, or rent levels within the system, making it impossible to assess the granularity of the city's own compliance data from the outside.

*   **Manual Mapping of Funding to Parcels:** Legislative records in the city's Legistar system, which document the appropriation of funds for programs like the AHTF, do not contain structured parcel identifiers. To link a specific ordinance to a specific property, one must manually download and read through attached PDF documents, a process that is inefficient and not scalable for large-scale analysis.

*   **Absence of a Central Affordable Unit Registry:** There is no single, city-maintained public database, data feed, or GIS layer that identifies all affordable housing units receiving public subsidies. While parcel and assessment data are robust, there is no attribute or flag within these public datasets to denote a property's status as a subsidized affordable housing unit.
