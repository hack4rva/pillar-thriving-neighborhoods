# Building a Citywide Compliance Engine: Proven Tools to Monitor Affordable Housing Commitments

## Executive Summary
Cities that codify, fund, and digitize compliance processes preserve more affordable homes and reduce legal and financial risks. A review of municipal, state, and national compliance tools reveals that successful monitoring relies less on complex software and more on standardized reporting, clear governance, and public transparency. 

Key strategic insights for Richmond's housing staff include:
* **Owner reporting portals drive compliance:** Lightweight, annual compliance portals with pre-filled records and unit-level validations (like Denver's Affordable Housing Portal) standardize audits and reduce owner burden.
* **State HFA systems raise data quality:** Virginia Housing mandates online tenant event validation and uses HDS NextGen/WTCMS for compliance determinations. Richmond should integrate with these exports rather than duplicating data entry.
* **Transparency paired with fees sustains enforcement:** Los Angeles and San Francisco publish public covenant registries and fund internal monitoring through per-unit annual fees.
* **Preservation tools are "off the shelf":** The National Housing Preservation Database (NHPD) provides a ready-made foundation for tracking expiring subsidies, which can be localized with city data.
* **Organizational complexity outweighs technical gaps:** Overlapping programs and agreements cause more friction than IT limitations. Establishing a "compliance source of truth" and standard operating procedures (SOPs) must precede software development.

## Why Compliance Monitoring Matters Now
Preserving public value requires ensuring that funded developments honor their affordability commitments. Cities that fail to monitor covenants risk losing restricted units to the market, missing enforcement windows, and jeopardizing tenant protections. 

For Richmond, the stakes include covenant attrition and credibility with funders. Implementing a robust compliance engine directly ties to positive outcomes: reduced loss of restricted units, faster corrective actions for physical or financial deficiencies, and better pipeline planning for future affordable housing investments.

## Federal/HUD Interfaces
Local compliance cannot depend entirely on federal systems, which are often opaque or inaccessible to municipal staff. Instead, cities lean on their own portals, inspections, and regulatory agreements to fill the gaps.

While the Department of Housing and Urban Development (HUD) utilizes systems like the Housing Enterprise Management System (HEMS), REAC, and NSPIRE, direct programmatic access for cities remains limited. Municipalities often adapt federal standards for local use; for example, San Francisco's Mayor's Office of Housing and Community Development (MOHCD) utilizes HUD-aligned tenant file checklists and physical inspection forms for its periodic site visits [1]. Similarly, cities monitor Low-Income Housing Tax Credit (LIHTC) and HOME obligations locally to ensure continued affordability and habitability [2]. 

## State HFA Monitoring Systems
Aligning city compliance efforts with state Housing Finance Agency (HFA) workflows reduces the reporting burden on property owners and improves data quality. 

Virginia Housing (formerly VHDA) operates a rigorous compliance monitoring system for LIHTC and state-financed properties. Owners must validate all tenant certification events in an online Tenant Portal by March 1 of each year [3]. Virginia Housing relies heavily on tenant data entered into HDS NextGen or uploaded via XML to the Web Tenant Compliance Management System (WTCMS) to generate compliance reports [4]. 

Post-Year 15 (during the Extended Use Period), Virginia Housing reduces the frequency of physical inspections but still requires owners to maintain current tenant information, rents, and utility allowances in HDS NextGen [4]. The state enforces these requirements strictly: failure to submit accurate annual certifications within a 10-day correction period can trigger the filing of IRS Form 8823 (Noncompliance) [5]. Furthermore, uncorrected noncompliance can result in negative points on future Qualified Allocation Plan (QAP) applications [4]. 

Richmond can leverage this by building ingestion specifications for HDS NextGen/WTCMS XML exports, aligning city deadlines with Virginia Housing's March 1 deadline, and establishing a reciprocal data-sharing agreement.

## Municipal Compliance Tools
Cities blend owner portals, public covenant registries, compliance manuals, and inspection cadences to enforce affordability. 

| City/Agency | Owner Reporting Tool | Public Transparency | Fees | Inspections/File Review | Inclusionary/Covenant Rules |
|---|---|---|---|---|---|
| **Los Angeles (LAHD)** | Annual monitoring by LAHD or contractor; owner re-certs required [6]. | Covenants findable via LA City Clerk Connect [6]. | $173 per restricted unit annually [6]. | Annual monitoring; sanctions for noncompliance [6]. | Land Use Covenants; dispersed units; bedroom/amenity parity [6]. |
| **Denver** | Web portal; unit-level "as-of 09/01" snapshot; pre-populates prior year data [7]. | Not specified. | Not specified. | Data review via portal; utility allowance method captured [7]. | Covenant-restricted rental compliance process [7]. |
| **San Francisco (MOHCD)** | AOR-XL (Excel) interim tool for occupancy/rent data [1]. | MOHCD portfolio dataset published on DataSF [8]. | Not specified. | Periodic on-site inspections and tenant file reviews [1]. | 2024 Inclusionary Manual details precedence rules [9]. |
| **Boulder (Regional)** | Manual-driven owner responsibilities [10]. | Not specified. | Not specified. | Ensures standards across jurisdictions [10]. | Perpetual affordability; regional compliance via IGA [10]. |
| **Chicago (DOH)** | ARO Annual Owner Certification; Long-Term Monitoring division [11]. | ARO dashboard (public) [12]. | Not specified. | 30-year oversight; lease-up audits; appeals [11]. | ARO program with defined AMI/rent rules [13]. |

**Takeaways:** Richmond should build a blended model that incorporates Denver's user-friendly portal, Los Angeles's fee-backed enforcement, and San Francisco's public transparency.

## Preservation & Advocacy Tools
National datasets can quickly flag at-risk properties, while local overlays make this data actionable for municipal staff and advocates.

The National Housing Preservation Database (NHPD), created by the National Low Income Housing Coalition (NLIHC) and the Public and Affordable Housing Research Corporation (PAHRC), provides a de-duplicated list of federally assisted housing properties [14]. The NHPD features a mapping tool and a Preservation Dashboard that visualizes the number of federally assisted homes set to expire in the next five years [14]. The database allows users to download complete datasets and provides a documented workflow for communities to create a "Local Preservation Database" by matching NHPD data with state and local subsidies [14].

At the local level, Washington, D.C. utilizes "Housing Insights," an interactive data tool that replaced the DC Preservation Catalog [15] [16]. It integrates data from the DC Government, Urban Institute, and HUD to provide a dynamic view of affordable housing and neighborhood data [15]. In Los Angeles, the Neighborhood Data for Social Change (NDSC) platform publishes datasets on affordable housing covenants, tracking units by incentive type (e.g., Density Bonus, Transit Oriented Communities) [17].

## What's Technically Hard vs. Organizationally Hard
Designing a compliance system requires understanding that data pipelines are solvable, but governance and multi-program alignment are often the true bottlenecks.

**Technically Hard:**
* **Identity Resolution:** Matching property names and addresses across different datasets (e.g., fuzzy matching local records to NHPD or HFA data) [14].
* **Data Privacy:** Securely handling Personally Identifiable Information (PII), such as tenant income files, while maintaining public transparency for property-level compliance.
* **Dynamic Limits:** Normalizing rent and income limits annually across various programs and Area Median Income (AMI) tiers [1].

**Organizationally Hard:**
* **Precedence Rules:** Resolving conflicts among overlapping restrictions. San Francisco's Inclusionary Manual explicitly states that the Planning Code prevails over the manual, and individual recorded restrictions prevail over general requirements [9].
* **Cross-Department Routing:** Coordinating covenants across planning, building safety, city clerk, and legal departments [6].
* **Enforcement:** Enforcing deadlines and cures with owners, and aligning these with state HFA timelines to avoid IRS penalties [5].

## Patterns Richmond Can Reuse in a Staff-Support Tool
Richmond can start with a minimal, high-leverage feature set proven by other municipalities:
* **Owner Annual Snapshot Portal:** Modeled after Denver, a web portal with a unit-level grid, rent/utility allowance calculator, and validation rules [7].
* **Covenant Registry and Open Dataset:** Modeled after San Francisco and Chicago, a public dataset showing project names, restricted units by AMI, term lengths, and monitoring status (excluding PII) [8] [12].
* **Preservation Risk Dashboard:** Seeded with NHPD data to track 5-year expirations, owner types, and inspection flags [14].
* **Inspections & File-Review Module:** A system to track schedules, checklists, findings, and corrective actions, utilizing standardized forms like those used by SF MOHCD [1].
* **HFA Integration:** Workflows to import HDS NextGen/WTCMS exports and reconcile discrepancies with Virginia Housing [4].

## What Requires Internal City Data
True compliance decisions hinge on records that cannot be replicated externally and must be collected or accessed directly by the City:
* Executed regulatory agreements, recorded covenants, subordination agreements, and amendments (typically routed through the City Clerk or County Assessor) [6].
* Annual Owner Certifications, rent rolls, tenant income certifications, and utility allowance documentation [2] [11].
* Physical inspection results, tenant file reviews, corrective action plans, and enforcement letters [1] [11].

## Unknowns to Resolve Early
* **HUD HEMS:** The exact scope, data fields, and locality access for HUD's Housing Enterprise Management System remain unclear based on public documentation.
* **HUD Inspection Data:** The availability of programmatic access (APIs) for cities to ingest NSPIRE/REAC inspection data.
* **State Data Interfaces:** The availability of automated, backend data sharing with Virginia Housing, beyond relying on owner-provided XML exports.
* **Local Legal Framework:** Richmond's statutory authority to levy per-unit monitoring fees (similar to LAHD's $173/unit fee) to fund the compliance system [6].

## Implementation Roadmap
* **0–30 Days:** Draft a Compliance Data Dictionary and SOP Manual. Select MVP features (owner snapshot portal, covenant registry). Define fee policies and initiate outreach to Virginia Housing for data-sharing MOUs.
* **31–60 Days:** Build the owner portal MVP with basic validations. Publish the initial public registry. Pilot the portal with 10 properties. Import NHPD data to create the first preservation dashboard view.
* **61–90 Days:** Stand up the inspections and file-review module. Finalize enforcement SOPs (cure periods, penalties). Launch training for property owners and managers.
* **Months 4–12:** Expand integrations to accept HFA exports, add risk-scoring analytics, and iterate on open data feeds.

## KPIs & Governance
To measure the success of the compliance engine, Richmond should track:
* **Compliance Timeliness:** Percentage of properties submitting complete annual reports by the deadline; average days to cure deficiencies.
* **Data Quality:** Error rates on tenant/rent validations; reconciliation rates with Virginia Housing data.
* **Enforcement Efficacy:** Number of issues identified; number cured within the designated window.
* **Preservation Impact:** Number of units with restrictions extended before expiration; number of at-risk properties engaged 12+ months pre-expiration.

## Appendices

### Facts (with URLs)
* Virginia Housing requires owners to validate tenant certification events in an online Tenant Portal by March 1. (http://virginiahousing.com/partners/rental-housing/compliance-monitoring) [3]
* Virginia Housing charges a $20 per unit annual compliance monitoring fee during the Extended Use Period ($10 for Rural Development). (http://s-www.virginiahousing.com/-/media/docs/partners/rental-housing/compliance-monitoring/compliance-monitoring-guidelines) [4]
* Los Angeles Housing Department (LAHD) charges an annual monitoring fee of $173 per restricted unit. (http://housing.lacity.gov/partners/land-use-covenants) [6]
* Denver's Affordable Housing Portal requires data submitted as a snapshot in time as of 09/01. (http://denvergov.org/files/assets/public/v/1/housing-stability/documents/2023-rental-compliance-user-guide-1.pdf) [7]
* San Francisco MOHCD uses an Annual Occupancy Report XL (AOR-XL) to collect occupancy, demographic, and eviction data. (http://sf.gov/resource--2022--compliance-monitoring) [1]
* Chicago's Affordable Requirements Ordinance (ARO) mandates a 30-year affordability period monitored by DOH. (http://chicago.gov/city/en/sites/affordable-requirements-ordinance/home.html) [13]
* The National Housing Preservation Database (NHPD) tracks federally assisted rental properties and provides a dashboard for homes expiring in the next 5 years. (http://preservationdatabase.org/wp-content/uploads/2025/09/National-Housing-Preservation-Database-User-Guide.pdf) [14]

### Inferences (Clearly Labeled)
* *Inference:* Organizational complexity (navigating overlapping local and federal rules) is a higher barrier to effective compliance than technical software limitations.
* *Inference:* Relying on manual spreadsheets (like SF's interim AOR-XL) increases the risk of data entry errors and delays in identifying noncompliance.
* *Inference:* Implementing a per-unit monitoring fee is a standard municipal practice that can sustainably fund dedicated compliance staff and software tools.

### Preservation Tools Comparison

| Tool | Coverage/Programs | Primary Users | Access/Export | Notable Uses |
|---|---|---|---|---|
| **NHPD (NLIHC/PAHRC)** | Broad federal programs (PBRA, LIHTC, HOME, USDA, Public Housing); 5-year expirations [14]. | Advocates, planners, researchers, agencies [14]. | Mapping, dashboard; downloadable extracts by state [14]. | Build local preservation DBs; risk targeting [14]. |
| **HousingInsights (DC)** | DC assisted housing integrated from multiple sources (Urban, DHCD, HUD) [15]. | Advocates, government officials [15]. | Public interactive tool [15]. | Replaced DC Preservation Catalog; filters, overlays [15] [16]. |
| **LA NDSC Covenant Dataset** | LA affordable housing covenants and incentive metrics [17]. | Public, advocacy [17]. | Download and map [17]. | Track covenant production trends by incentive type [17]. |

**Takeaways:** National tools like NHPD provide the necessary baseline data for federal subsidies, but local tools like HousingInsights and LA NDSC are required to track municipal-specific covenants and zoning incentives effectively.

## References

1. *Compliance monitoring | SF.gov*. https://www.sf.gov/resource--2022--compliance-monitoring
2. *Tax Credit and HOME Compliance - HPD*. https://www.nyc.gov/site/hpd/services-and-information/tax-credit-and-home-compliance.page
3. *Rental Housing Compliance Monitoring*. https://www.virginiahousing.com/partners/rental-housing/compliance-monitoring
4. *VIRGINIA HOUSING Post Year 15 Compliance Monitoring ...*. https://s-www.virginiahousing.com/-/media/docs/partners/rental-housing/compliance-monitoring/compliance-monitoring-guidelines
5. *Annual Reporting*. https://s-www.virginiahousing.com/-/media/docs/partners/rental-housing/compliance-monitoring/annual-pkg-user-instructions.pdf
6. *Land Use Covenants - LAHD - City of Los Angeles*. https://housing.lacity.gov/partners/land-use-covenants
7. *USER GUIDE AFFORDABLE HOUSING PORTAL*. https://denvergov.org/files/assets/public/v/1/housing-stability/documents/2023-rental-compliance-user-guide-1.pdf
8. *Mayor's Office of Housing and Community Development Affordable Housing Portfolio | DataSF*. https://data.sfgov.org/Housing-and-Buildings/Mayor-s-Office-of-Housing-and-Community-Developmen/pyxv-n29e
9. *Inclusionary Affordable Housing Program Monitoring and ...*. https://www.sf.gov/sites/default/files/2024-08/Inclusionary%20Affordable%20Housing%20Monitoring%20and%20Procedures%20Manual%20Final%207.25.24.pdf
10. *Regional Affordable Housing Rental Compliance Manual | City of Boulder*. https://bouldercolorado.gov/guide/regional-affordable-housing-rental-compliance-manual
11. *Long-Term Monitoring ARO Application Compliance Training*. https://www.chicago.gov/content/dam/city/sites/affordable-requirements-ordinance/2025%20ARO%20Income%20Eligibility%20%20LTM%20Compliance%20Training.pdf
12. *
    City of Chicago :: Chicago Department of Housing Creates New Interactive, Use-Friendly Affordable Housing Research Tool
*. https://www.chicago.gov/city/en/depts/doh/provdrs/housing_resources/news/2019/november/chicago-department-of-housing-creates-new-interactive--use-frien.html
13. *Affordable Requirements Ordinance*. https://www.chicago.gov/city/en/sites/affordable-requirements-ordinance/home.html
14. *National-Housing-Preservation-Database-User-Guide.pdf*. https://preservationdatabase.org/wp-content/uploads/2025/09/National-Housing-Preservation-Database-User-Guide.pdf
15. *Housing Insights Tool*. https://housinginsights.org/
16. *Cataloging where DC should preserve affordable housing as the city’s population continues to grow | Urban Institute*. https://www.urban.org/urban-wire/cataloging-where-dc-should-preserve-affordable-housing-citys-population-continues-grow
17. *Affordable Housing Covenants – Neighborhood Data for Social Change*. https://la.myneighborhooddata.org/2024/07/affordable-housing-covenants/