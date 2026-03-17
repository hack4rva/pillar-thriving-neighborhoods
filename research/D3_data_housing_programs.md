# Richmond Affordable Housing Data Playbook — Where to Find, Trust, and Apply Investment Data

## Executive Summary

Richmond’s affordable housing investment data does not exist in a single, unified "source of truth." Instead, building a comprehensive picture requires stitching together disparate datasets across federal, state, and local platforms. City-administered funding decisions live in unstructured legislative files within Legistar, federal assets are cataloged in the National Housing Preservation Database (NHPD) and HUD portals, and state investments are tracked by Virginia Housing. 

To build actionable tools—whether a public-facing investment dashboard or an internal compliance monitor—you must integrate these sources using property addresses and parcel IDs as join keys. Relying solely on federal databases like NHPD will result in undercounting local subsidies and Project-Based Vouchers (PBVs). Conversely, relying only on City data misses the massive footprint of federally backed properties and their critical expiration timelines.

## Scope and Outcomes

**Deliver a stitched dataset from City, state, and federal sources that powers a public dashboard and an internal compliance tool.**

This playbook inventories the publicly accessible data sources documenting affordable housing investments in Richmond, Virginia. It outlines what each source contains, how to access it, its limitations, and how to combine these datasets to track both financial investments and long-term affordability compliance.

## Data Landscape and Source Inventory

**Richmond’s housing investment data is fragmented across Legistar, NHPD/HUD, Virginia Housing, RRHA, and City pages; each contributes a distinct layer.**

To capture the full spectrum of affordable housing investments, data must be harvested from the following primary sources:

| Source | Coverage | Access Method / URL | Key Fields | Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **City Council Legistar** | City-administered grants, loans, and affordability covenants. | [richmondva.legistar.com](https://richmondva.legistar.com/Legislation.aspx) | Ordinance/Resolution text, Fiscal Impact Statements, loan terms, AMI targets. | Unstructured data; requires parsing PDF attachments. |
| **NHPD** | Federally assisted properties (LIHTC, Section 8, HOME, etc.). | [nhpd.preservationdatabase.org](https://nhpd.preservationdatabase.org/) | Property ID, subsidy types, start/end dates, total units, assisted units. | Excludes state/local-only subsidies; partial PBV list; 1,000-record export cap on filtered grids [1]. |
| **HUD Assisted Multifamily** | PBRA, 202/811, and Section 8 contracts. | [hudgis-hud.opendata.arcgis.com](https://hudgis-hud.opendata.arcgis.com/) | Contract IDs, assisted units, expiration dates, owner/agent. | Contract status latency; requires joining to NHPD. |
| **Virginia Housing (VHDA)** | State-backed LIHTC awards and multifamily loans. | [virginiahousing.com/partners/developers/multifamily](https://www.virginiahousing.com/partners/developers/multifamily) | Project names, LIHTC allocations, state loan amounts. | Scattered formats (PDFs/maps); publication lag. |
| **RRHA Communities** | Public housing and Project-Based Voucher (PBV) sites. | [rrha.com/housing/communities](https://www.rrha.com/housing/communities/) | Community names, unit counts, management contacts. | Not a structured database; requires manual scraping/updates [2]. |
| **HUD CHAS** | Housing needs (cost burden, overcrowding) by income. | [hudexchange.info/programs/chas](https://www.hudexchange.info/programs/chas/) | Cost burden %, severe burden %, demographic cross-tabs. | Measures needs, not investments; ACS sampling lag. |
| **RVA Open Data / Assessor** | Parcels, zoning, and property transfers. | [data.richmondgov.com](https://data.richmondgov.com/) [3] | Parcel IDs, assessed values, zoning districts [4]. | Does not track affordability covenants directly. |

## City Council Legistar

**Legistar holds the authoritative City record; you need disciplined queries and attachment parsing to turn it into data.**

### Why Legistar Matters
Legistar is the official repository for City-administered funding and affordability covenants [5]. While the Affordable Housing Trust Fund (AHTF) provides financial resources for housing support and production [6], the actual approval of these funds, along with HOME and CDBG allocations, occurs through City Council ordinances and resolutions.

### Search Workflow
To surface housing actions efficiently in Legistar:
1. Set **File Type** to "Ordinance" or "Resolution".
2. Set **Department** to "Housing & Community Development".
3. Use targeted keywords: "Affordable Housing Trust Fund," "HOME," "CDBG," "loan," "grant," "affordability agreement," or "deed of trust."
4. Filter by specific Fiscal Year date ranges and use the "Enactment Date" to capture final approvals.

### Extracting Data from Attachments
The core metadata does not live in the summary text; it lives in the attachments. You must parse Fiscal Impact Statements, loan agreements, and affordability agreements to extract the fund source, exact dollar amount, loan term, Area Median Income (AMI) targets, affordability period (years), and recordation requirements.

## HUD Affordable Housing Preservation Assets

**HUD’s asset datasets add contract IDs, assisted units, and expiration dates crucial for compliance.**

### Coverage and Access
HUD's Assisted Multifamily Properties dataset covers programs like Project-Based Rental Assistance (PBRA), Section 202/811, and 236/221(d)(3). Unlike NHPD, which aggregates subsidies at the property level, HUD's datasets provide granular contract-level details. This data is accessed via the HUD Open Data/eGIS catalog by filtering for the City of Richmond.

### Richmond Filtering and Field Structure
When filtering for Richmond, key export fields include property name, address, program/contract type, assisted units, expiration/renewal dates, and owner/agent information. These expiration dates are the primary drivers for identifying properties at risk of losing affordability.

## National Housing Preservation Database (NHPD)

**Use NHPD as the foundation for the property list; know the PBV/local gaps and the 1,000-record export constraint.**

### Coverage and Access Specifics
The NHPD provides a de-duplicated list of federally assisted housing properties [1]. It includes programs like Section 8 PBRA, Section 202, LIHTC, HOME, and Public Housing [1]. However, it explicitly excludes state and locally funded housing subsidy programs and only contains a partial list of Project-Based Vouchers (PBVs) [1]. Access requires a free registered login [1].

### Download Options and Field Caveats
Users can download a "Filtered Grid" (capped at 1,000 records) or a "Complete Database" prepackaged extract by state [1]. The prepackaged extracts place subsidy information on the same row as property data, but due to space constraints, they only provide details on the two most recent subsidies of a given type per property [1]. 

### Reliability for Richmond
Because NHPD misses local-only subsidies and undercounts PBVs, it must be augmented. The NHPD User Guide recommends creating a "Local Database ID" and adding columns for local subsidies to merge NHPD data with local records [1].

## HUD CHAS

**Use CHAS to target funding and evaluate alignment with need; don’t use it for property counts.**

### What CHAS Measures
The Comprehensive Housing Affordability Strategy (CHAS) data measures household needs, including cost burden, severe cost burden, overcrowding, and incomplete plumbing/kitchen facilities, broken down by tenure and income level. It is based on 5-year ACS data.

### Known Limitations
CHAS does not enumerate properties or investments. It suffers from ACS sampling lags and data suppression for small geographies. It should be used to provide contextual KPIs (e.g., percentage of renters cost-burdened) on a dashboard, rather than for tracking compliance.

## Virginia Housing (VHDA)

**State awards and financing frequently pair with City/federal dollars — they’re key to a full investments picture.**

Virginia Housing (formerly VHDA) publishes data on LIHTC allocations and multifamily loan portfolios. This data is crucial because state allocations often pair with City and federal funds. Analysts should scrape or download LIHTC awards and map them to Richmond parcels, tracking "Year 15" flags (using NHPD LIHTC start dates) to anticipate when properties might undergo restructuring or refinancing [1].

## RRHA, City Open Data, and Other Confirming Sources

**RRHA and City portals confirm/currentize public housing and PBV; open data aids geocoding and QA.**

### RRHA Communities
The Richmond Redevelopment and Housing Authority (RRHA) manages nearly 4,000 units in various family developments [7]. Their public listings provide exact unit counts that serve as a truth set for validating federal data. For example, RRHA lists Gilpin Court at 781 units, Fairfield Court at 447 units, Mosby Court at 458 units, and Whitcomb Court at 447 units [2]. They also list specific PBV communities like Afton Avenue Apartments and Winchester Forest [2].

### City Open Data
The Richmond Open Data Portal [3] and the Assessor's Property Search [5] provide the necessary parcel IDs and geographic coordinates to map these investments accurately.

## Fit-for-Purpose Selection

**Different tools need different sources; pair NHPD/HUD for compliance timelines and Legistar/VH for investment flows.**

| Tool Type | Primary Purpose | Most Useful Sources | Key Data Elements |
| :--- | :--- | :--- | :--- |
| **Investment Dashboard** (Public) | Show where money is going and what it produces. | Legistar, Virginia Housing, NHPD, RRHA, HUD CHAS. | Funding amounts, units created/preserved, geographic distribution, community need (CHAS). |
| **Compliance Monitor** (Internal) | Track expiring subsidies and enforce affordability covenants. | HUD Assisted Multifamily, NHPD Complete Extract, Legistar Attachments. | Contract expiration dates, AMI targets, affordability term lengths, inspection scores. |

## ETL Architecture and Data Model

**Normalize around parcel/address and property IDs; attach funding transactions and compliance obligations as first-class tables.**

To build a reliable system, establish a relational data model:
1. **Keys**: Standardize addresses and use City Parcel IDs as the ultimate geographic join key. Use the NHPD Property ID for federal cross-referencing and generate a "Local Database ID" for City-only projects [1].
2. **Core Tables**: 
 * *Properties* (Location, total units)
 * *Subsidies* (Federal/State/Local program tags)
 * *Contracts* (HUD expiration dates)
 * *City Transactions* (Legistar/AHTF financial awards)
 * *Covenants* (Affordability terms from Legistar PDFs)
3. **Cadence**: Pull HUD/NHPD data monthly. Harvest Legistar quarterly. Cross-check public housing unit counts against RRHA site lists to catch variances.

## Facts, Inferences, and Unknowns

### Facts (with URLs)
* **NHPD Export Limits**: The NHPD filtered grid export is limited to 1,000 records, and prepackaged state extracts only show the two most recent subsidies of a given type per property [1]. (URL: https://preservationdatabase.org/wp-content/uploads/2025/09/National-Housing-Preservation-Database-User-Guide.pdf)
* **NHPD Exclusions**: NHPD explicitly excludes state and locally funded housing subsidy programs and only contains a partial list of Project-Based Vouchers [1]. (URL: https://preservationdatabase.org/wp-content/uploads/2025/09/National-Housing-Preservation-Database-User-Guide.pdf)
* **RRHA Unit Counts**: RRHA manages nearly 4,000 public housing units [7], including specific large-scale sites like Gilpin Court (781 units) and Fairfield Court (447 units) [2]. (URL: https://www.rrha.com/housing/communities/)
* **City Open Data**: Richmond provides an Open Data Portal and Assessor Data Requests for property and parcel information [3] [8]. (URL: https://data.richmondgov.com/)

### Inferences (Clearly Labeled)
* *Inference (Data Integration)*: Because no single database contains both local financial investments and federal compliance dates, a custom ETL pipeline joining Legistar, NHPD, and VHDA via parcel IDs is the only viable strategy for a complete inventory.
* *Inference (Legistar Parsing)*: Because City Council resolutions do not store financial terms in structured database fields, automated or manual PDF parsing of Fiscal Impact Statements and Affordability Agreements is required to track local compliance.
* *Inference (Dashboard vs. Compliance)*: HUD CHAS data is highly effective for public-facing dashboards to justify investment locations based on need, but is entirely useless for internal compliance monitoring since it does not track property-level restrictions.

### Unknowns
| Data Gap / Unknown | Impact | Resolution Path |
| :--- | :--- | :--- |
| **Historical Legistar Completeness** | May miss older affordability covenants executed before the current system was adopted. | Cross-reference older properties with manual Assessor deed searches. |
| **AHTF Machine-Readable Rosters** | Relying on PDFs for AHTF awards slows down data ingestion. | Request direct CSV exports from the Housing & Community Development department. |
| **Virginia Housing Release Cadence** | State LIHTC awards may not appear in public datasets immediately upon approval. | Establish a quarterly manual check of VHDA board meeting minutes. |

## Deliverables and Timeline

A credible Version 1 dashboard can be delivered in 4–6 weeks by prioritizing structured federal data and RRHA lists, followed by the more labor-intensive Legistar parsing.
* **Weeks 1–2**: Harvest NHPD state extracts, HUD Assisted Multifamily layers, and RRHA community lists. Establish the property baseline.
* **Weeks 3–4**: Build the Legistar parser to extract City transactions and integrate HUD CHAS context metrics.
* **Weeks 5–6**: Integrate Virginia Housing LIHTC data, perform QA against RRHA counts, and finalize the internal compliance views (expiration watchlists).

## References

1. *National-Housing-Preservation-Database-User-Guide.pdf*. https://preservationdatabase.org/wp-content/uploads/2025/09/National-Housing-Preservation-Database-User-Guide.pdf
2. *Communities | Richmond Redevelopment & Housing Authority*. https://www.rrha.com/housing/communities/
3. *Open Data Portal | City of Richmond, Virginia | Open Data Portal | City of Richmond, Virginia*. https://data.richmondgov.com/
4. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
5. *Open Data Portal | Richmond*. https://www.rva.gov/information-technology/open-data-portal
6. *Affordable Housing Trust Fund | Richmond*. https://www.rva.gov/housing-and-community-development/affordable-housing-trust-fund
7. *Public Housing Program | Richmond Redevelopment & Housing Authority*. https://www.rrha.com/housing/public-housing/
8. *Data Request | Richmond*. https://www.rva.gov/assessor-real-estate/data-request