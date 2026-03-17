# Richmond HUD Data Playbook: FMR, CHAS, and Voucher Insights You Can Use

## Executive Summary
For housing practitioners in Richmond, navigating HUD's affordability datasets requires understanding distinct update cycles, geographic granularities, and programmatic rules. Fair Market Rents (FMRs) and Income Limits drive compliance and feasibility, but their metro-wide nature often obscures neighborhood-level realities. 

Key strategic actions for Richmond include:
* **Prepare for Income Limit Delays:** FY 2026 Income Limits have been delayed to May 1, 2026, due to Census ACS data release delays [1] [2]. Continue using FY 2025 limits for near-term Richmond pro formas and eligibility checks.
* **Automate Data Retrieval:** HUD now offers robust API access for both FMR and Income Limits [3]. Transitioning from manual CSV downloads to API integrations will cut retrieval time to minutes and eliminate stale-data risks in compliance tools.
* **Bridge the Geographic Gap:** Standard FMRs are set at the 40th percentile for the entire metro area [4] [5]. To accurately assess neighborhood-level feasibility in Richmond's hot submarkets, pair FMR data with Small Area FMRs (SAFMRs) at the ZIP-code level and CHAS data at the census-tract level.
* **Understand HCV Data Lags:** While HUD provides a public Housing Choice Voucher (HCV) Data Dashboard, the data reflects an approximate 2-month delay [6]. Do not rely on it for real-time operational compliance.

## Purpose and Decision Context
This data inventory (D4) provides a comprehensive guide to HUD's publicly available housing affordability datasets and their direct application to Richmond, Virginia. Practitioners must align program compliance, analytics, and siting decisions to the strengths and limitations of FMR, CHAS, Income Limits, and HCV datasets. Each dataset serves a distinct purpose, operates on a different update cadence, and covers a specific geographic grain. Using the wrong dataset for a compliance check or market analysis can lead to inaccurate pro formas, compliance violations, or missed opportunities in high-opportunity neighborhoods.

## HUD Affordability Datasets
HUD provides a suite of datasets that together cover rents, incomes, housing needs, and voucher operations. 

| Dataset | What it Measures | Geography | Update Cadence | Richmond Relevance |
| :--- | :--- | :--- | :--- | :--- |
| **Fair Market Rents (FMR)** | 40th percentile gross rent (shelter + utilities) [4] [5] | Metro Area / HMFA | Annually (Effective Oct 1) [4] | Sets baseline for HCV payment standards and HOME/ESG rent ceilings in Richmond. |
| **Small Area FMRs (SAFMR)** | 40th percentile gross rent by ZIP code [4] [5] | ZIP Code | Annually | Crucial for submarket screening and mobility programs in specific Richmond neighborhoods. |
| **CHAS** | Housing needs (cost burden, overcrowding) by income/tenure | Tract, City, County | Multi-year ACS cycle | Used for spatial equity analysis and targeting specific Richmond tracts for development. |
| **Income Limits** | AMI-derived thresholds for program eligibility | Metro Area / HMFA | Annually (Usually April, delayed to May 1 for 2026) [1] | Determines tenant eligibility for affordable housing programs in the Richmond area. |
| **HCV Data Dashboard** | PHA-level leasing, per-unit costs, reserves, admissions [6] | PHA Level | Monthly (~2-month lag) [6] | Tracks Richmond Redevelopment and Housing Authority (RRHA) voucher utilization trends. |
| **Picture of Subsidized Households** | Characteristics of assisted housing units and residents [7] [8] | Tract, PHA, City, State [7] [8] | Periodic | Helps situate the existing subsidized housing stock within Richmond. |

*Takeaway: No single dataset provides a complete picture. Compliance tools must rely on FMR and Income Limits, while siting and equity analyses require SAFMR, CHAS, and Picture of Subsidized Households data.*

### Fair Market Rents (FMR)
FMRs represent the estimated cost of gross rent, which includes the cost of shelter plus all major utilities (except telephone, cable, and internet) [4] [5]. By regulation, FMRs are calculated at the 40th percentile of rents paid by recent movers [4] [5]. For FY 2026, HUD calculated FMRs using 2023 American Community Survey (ACS) data, applying statistical quality checks, a gross rent inflation adjustment factor, and a trend factor [9]. FMRs are primarily used to establish payment standard amounts for the Section 8 Housing Choice Voucher program, which must generally fall between 90 percent and 110 percent of the FMR [4] [5].

### Small Area FMRs (SAFMR)
Small Area FMRs are set by ZIP codes within Metropolitan Areas [4] [5]. They are designed to provide tenants with greater mobility options to move to "Opportunity Neighborhoods" with better jobs, transportation, and schools, while reducing undue subsidies in lower-rent areas [4] [5]. 

### CHAS (Comprehensive Housing Affordability Strategy)
CHAS data is a special tabulation of ACS data provided to HUD. It measures the extent of housing problems and needs, particularly focusing on housing cost burden and overcrowding, broken down by household income level and tenure (renter vs. owner). Because it is available at the census tract level, it is highly effective for neighborhood-level targeting.

### HUD Income Limits
HUD annually calculates estimates of median family income and uses these to define low-income status and eligibility for housing assistance programs [1]. These limits are defined as percentages of median family income and vary by household size [1]. Income Limits data are now available via an application programming interface (API), allowing developers to easily access the data [3].

### HCV Data Dashboard and VMS
The public-facing Housing Choice Voucher (HCV) Data Dashboard shows budget and leasing trends, reserve balances, program admissions, and per-unit costs at the PHA level [6]. However, this aggregated data has an approximate 2-month delay [6]. The underlying Voucher Management System (VMS), which tracks detailed funding and unit leasing, is restricted to HUD employees and qualified PHA employees with valid credentials [10] [11].

## Richmond Application
To apply HUD data to Richmond, practitioners must use the correct geographic identifiers and current baseline metrics.

### Richmond HMFA and PHA Context
For FMRs and Income Limits, Richmond is classified under the Richmond, VA HUD Metro FMR Area (HMFA). When querying data, ensure you are selecting the HMFA rather than a broader CBSA if exceptions apply. For voucher data, the relevant entity is the Richmond Redevelopment and Housing Authority (RRHA).

### Richmond FY 2025 HOME Income Limits
Because the FY 2026 Income Limits are delayed until May 1, 2026 [1], practitioners must continue using the FY 2025 limits for near-term compliance. The FY 2025 Adjusted HOME Income Limits for the Richmond, VA HUD Metro FMR Area (effective June 1, 2025) are as follows [12]:

| Program Limit | 1 Person | 2 Person | 3 Person | 4 Person |
| :--- | :--- | :--- | :--- | :--- |
| **30% Limits** | $23,850 | $27,250 | $30,650 | $34,050 |
| **Very Low Income (50%)** | $39,750 | $45,400 | $51,100 | $56,750 |
| **60% Limits** | $47,700 | $54,480 | $61,320 | $68,100 |
| **Low Income (80%)** | $63,600 | $72,650 | $81,750 | $90,800 |

*Takeaway: Hardcode these FY 2025 values into interim eligibility checks and pro formas, but build parameterization to automatically switch to FY 2026 values once published on May 1.*

## Access & Update Cadence
Data governance requires tracking the distinct update cycles of each dataset to prevent stale-data errors.

| Dataset | Next Expected Update | Effective Date | Tooling Action |
| :--- | :--- | :--- | :--- |
| **FMR / SAFMR** | Annually (Late Summer) | October 1 [4] [5] | Calendar annual October refresh for rent caps. |
| **Income Limits** | May 1, 2026 (Delayed) [1] | Upon Publication | Add May 1 data-refresh task; use FY25 until then. |
| **HCV Dashboard** | Monthly | ~2 months prior [6] | Display vintage badges; do not use for real-time checks. |
| **CHAS** | Multi-year ACS cycle | Varies | Update spatial joins when new ACS 5-year data drops. |

## Developer Quick-Start
HUD's API infrastructure allows developers to pull Richmond FMR and Income Limit data in under 30 minutes [3]. 

**Steps to Access Richmond FMR Data:**
1. **Register for an API Key:** Visit the HUD USER API portal to generate a unique access token.
2. **Identify the Area Code:** Use the HUD FMR query tool to find the specific alphanumeric identifier for the Richmond, VA HMFA.
3. **Construct the API Call:** Make an HTTP GET request to the FMR endpoint, passing the Richmond HMFA code and the desired year (e.g., 2026) as parameters. Include your API key in the authorization header.
4. **Parse the Response:** The JSON response will contain the 40th percentile FMRs broken down by bedroom size (e.g., 0BR, 1BR, 2BR, 3BR, 4BR).
5. **Store and Validate:** Cache the data locally with a timestamp and verify the effective date (October 1) to ensure compliance tools are using the active fiscal year data.

```bash
# Example conceptual API call structure
curl -H "Authorization: Bearer YOUR_API_KEY" \
 "https://www.huduser.gov/hudapi/public/fmr/data/RICHMOND_HMFA_CODE?year=2026"
```

## Compliance Comparison Tool Example
When building a compliance tool to check if a committed rent level is within HCV bounds, you must compare the *Gross Rent* against the allowable Payment Standard (90% to 110% of the FMR) [4] [5].

**Example Calculation for a 2-Bedroom Unit in Richmond:**
1. **Fetch FMR:** Assume the API returns an FY 2026 2BR FMR of $1,500 for the Richmond HMFA.
2. **Calculate Payment Standard Bounds:** 
 * Minimum (90%): $1,350
 * Maximum (110%): $1,650 [4] [5]
3. **Determine Gross Rent:** The landlord's contract rent is $1,400. The PHA-determined tenant utility allowance (for electricity and water) is $150. 
 * Gross Rent = $1,400 + $150 = $1,550 [4] [5].
4. **Evaluate Compliance:** The Gross Rent ($1,550) falls within the $1,350 to $1,650 band. The unit is compliant and eligible for standard voucher approval without requiring a special exception.

## Joining to Parcels and Neighborhoods
To make HUD data spatially useful for Richmond parcel-level analysis, you must execute specific geographic joins.

### Practical Join Recipes
* **Parcels to CHAS:** Perform a spatial join (point-in-polygon) matching Richmond parcel coordinates to Census Tract boundaries, then join the tract GEOID to the CHAS dataset to append neighborhood cost-burden metrics.
* **Parcels to SAFMR:** Spatially join parcels to ZIP Code Tabulation Areas (ZCTAs). Use the ZIP code to join the SAFMR table, revealing the localized rent cap for that specific parcel.
* **Parcels to FMR/Income Limits:** Overlay parcels with county boundaries. Map the county to the Richmond HMFA definition to apply the correct metro-wide FMR and AMI limits.
* **PHA Dashboard to Geography:** Link the RRHA data from the HCV dashboard to the PHA office locations and jurisdictional boundaries provided in the HUD Public Housing Authorities GIS dataset [13].

### Edge Cases and Cautions
Be cautious of parcels located on the borders of ZIP codes or census tracts, as spatial inaccuracies can assign a property to the wrong SAFMR tier. Additionally, recognize that ZIP Code Tabulation Areas (ZCTAs) used for mapping do not always perfectly align with USPS postal delivery routes. Always document the vintage of the shapefiles used for the join.

## Limitations & Risk Management
HUD data is powerful but has strict limitations that a compliance tool must account for:

* **Percentile Biases:** FMRs are set at the 40th percentile metro-wide [4] [5]. In highly desirable Richmond submarkets, actual market rents may vastly exceed the FMR, creating false negatives where a unit appears "unaffordable" for a voucher but is priced correctly for the immediate neighborhood.
* **Data Lag:** The HCV Data Dashboard operates on an approximate 2-month delay [6]. It cannot be used to verify if a PHA has available funds *today*.
* **Restricted Microdata:** Tenant-level voucher data and real-time HAP (Housing Assistance Payment) expenses are locked within the VMS and are not publicly accessible [10].
* **Utility Allowances:** FMRs represent *Gross Rent* (contract rent + utilities) [4] [5]. A compliance tool cannot determine feasibility based on contract rent alone; it must have access to the specific PHA's utility allowance schedule, which is not provided in the FMR dataset.

## Facts, Inferences, and Unknowns

| Category | Item | Source / Note |
| :--- | :--- | :--- |
| **Fact** | FY 2026 FMRs are calculated using 2023 ACS data. | [9] |
| **Fact** | FMRs equal Gross Rent (cost of shelter plus utilities). | [4] [5] |
| **Fact** | HCV Payment standards are between 90% and 110% of the FMR. | [4] [5] |
| **Fact** | FY 2026 Income Limits release is delayed to May 1, 2026. | [1] |
| **Fact** | HCV Data Dashboard has an approximately 2-month delay. | [6] |
| **Fact** | Income Limits data are available via API. | [3] |
| **Inference** | Because FMRs are metro-wide 40th percentiles, high-demand Richmond neighborhoods will likely require SAFMRs or exception payment standards for voucher feasibility. | Derived from FMR methodology [4] [5]. |
| **Inference** | Pro formas closing in April 2026 must underwrite using FY 2025 Income Limits due to the May 1 delay. | Derived from delay announcement [1]. |
| **Unknown** | Real-time, daily voucher issuance and exact HAP reserves for RRHA. | Restricted to VMS internal users [10]. |
| **Unknown** | Exact utility allowance schedules for specific Richmond properties. | Must be sourced directly from RRHA, not HUD datasets. |

## Appendices: Source Links
* **FMR Homepage:** https://www.huduser.gov/portal/datasets/fmr.html
* **FY 2026 FMR Methodology:** https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY26-Public-FMR-Methodology.pdf
* **FMR Overview Deck:** https://www.huduser.gov/portal/sites/default/files/pdf/fmr-overviewFY24.pdf
* **SAFMR:** https://www.huduser.gov/portal/datasets/fmr/smallarea/index.html
* **Income Limits:** https://www.huduser.gov/portal/datasets/il.html
* **FY 2026 IL Delay Statement:** https://www.huduser.gov/portal/datasets/il/il26/Statement-on-FY-2026-Income-Limits.pdf
* **HOME Income Limits (VA PDF):** https://www.huduser.gov/portal/datasets/home-datasets/files/HOME_IncomeLmts_State_VA_2025.pdf
* **CHAS:** https://www.huduser.gov/portal/datasets/cp.html
* **HCV Dashboard:** https://www.hud.gov/helping-americans/public-indian-housing-hcv-dashboard
* **VMS Manual:** https://www.hud.gov/sites/dfiles/PIH/documents/INSTRUCTIONS.pdf
* **Picture of Subsidized Households:** https://www.huduser.gov/portal/datasets/assthsg.html
* **HUD GIS PHAs:** https://hudgis-hud.opendata.arcgis.com/datasets/HUD::public-housing-authorities-1/about

## References

1. *Statement on FY 2026 Median Family Income Estimates ...*. https://www.huduser.gov/portal/datasets/il/il26/Statement-on-FY-2026-Income-Limits.pdf
2. *
            
                
                    What to Expect with 2026 Income Limits
                
            
            
                
                | Novogradac
            
        *. https://www.novoco.com/notes-from-novogradac/what-to-expect-with-2026-income-limits
3. *Income Limits | HUD USER*. https://www.huduser.gov/portal/datasets/il.html
4. *Fair Market Rents Introductory Overview*. https://www.huduser.gov/portal/sites/default/files/pdf/fmr-overviewFY24.pdf
5. *Fair Market Rents Introductory Overview*. https://www.huduser.gov/portal/sites/default/files/pdf/fmr-overview.pdf
6. *Housing Choice Voucher (HCV) Data Dashboard | HUD.gov / U.S. Department of Housing and Urban Development (HUD)*. http://www.hud.gov/helping-americans/public-indian-housing-hcv-dashboard
7. *Assisted Housing: National and Local | HUD USER*. https://www.huduser.gov/portal/datasets/assthsg.html
8. *Picture of Subsidized Households - Dataset - Catalog*. https://catalog.data.gov/dataset/a-picture-of-subsidized-households-2009
9. *Calculation of HUD Fair Market Rents*. https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY26-Public-FMR-Methodology.pdf
10. *Voucher Management Systems (VMS) User Manual*. https://www.hud.gov/sites/dfiles/PIH/documents/INSTRUCTIONS.pdf
11. *Housing Voucher Program Support Division (PSD) | HUD.gov / U.S. Department of Housing and Urban Development (HUD)*. http://www.hud.gov/helping-americans/public-indian-housing-program-support-division
12. *FY2025 ADJUSTED HOME INCOME LIMITS*. https://www.huduser.gov/portal/datasets/home-datasets/files/HOME_IncomeLmts_State_VA_2025.pdf
13. *Public Housing Authorities | HUD Open Data Site*. https://hudgis-hud.opendata.arcgis.com/datasets/HUD::public-housing-authorities-1/about?share=link