# Prior Art Research — Affordable Housing Compliance Monitoring

**Pillar:** Thriving Neighborhoods
**Problem Statement:** Help City staff track whether publicly funded affordable housing stays affordable over time.
**Applies to:** Affordable Housing Compliance Dash
**Research Date:** April 1, 2026
**Method:** Synthesis of existing pillar research corpus (`pillar-repos/pillar-thriving-neighborhoods/research/`)

**Primary sources from existing corpus:**
- `E3_prior_art_housing_compliance.md` — Compliance monitoring tools nationally
- `E4_prior_art_failures.md` — Why civic tech stalls
- `E5_prior_art_weekend_viable.md` — Weekend-build patterns
- `C3_services_housing_programs.md` — Richmond housing programs
- `D3_data_housing_programs.md` — Housing program data sources
- `D4_data_hud_rental.md` — HUD rental data for Richmond
- `A1_problem_landscape_housing_compliance.md` — Core problem landscape

---

## 1. Comparable Compliance Monitoring Tools Nationally

The research corpus (`E3_prior_art_housing_compliance.md`) documents a range of municipal compliance tools, from lightweight owner portals to full covenant registries. The landscape divides into three tiers:

### Owner Reporting Portals
**Denver's Affordable Housing Portal** requires property owners to submit unit-level compliance snapshots annually (as of September 1), with the portal pre-populating prior-year data and capturing rent levels, utility allowance methods, and tenant eligibility. This is the closest analog to what Richmond needs — a structured intake that replaces ad-hoc PDF and email submissions.

**San Francisco's MOHCD** uses an interim Excel-based tool (AOR-XL) for occupancy and rent data collection, paired with periodic on-site inspections and tenant file reviews. SF also publishes its affordable housing portfolio as an open dataset on DataSF — a transparency model Richmond currently lacks entirely.

**Chicago's Department of Housing** runs a Long-Term Monitoring division for its Affordable Requirements Ordinance (ARO), with a 30-year oversight period, lease-up audits, and a public ARO dashboard showing compliance status.

### Fee-Funded Enforcement Models
**Los Angeles LAHD** charges $173 per restricted unit annually to fund compliance monitoring, publishes covenants via City Clerk Connect, and conducts annual monitoring with sanctions for noncompliance. This fee model is notable — it creates a sustainable funding stream for dedicated compliance staff and software, rather than relying on general fund appropriations.

### Preservation and Risk Dashboards
The **National Housing Preservation Database (NHPD)**, maintained by NLIHC and PAHRC, provides a de-duplicated list of federally assisted properties with a Preservation Dashboard that visualizes homes set to expire in the next five years. NHPD explicitly excludes state and locally funded programs — meaning it will miss Richmond's AHTF and AHTEP properties entirely — but provides a ready-made foundation for tracking federally subsidized properties at risk.

**Washington, D.C.'s Housing Insights** tool integrates data from DC Government, Urban Institute, and HUD to provide a dynamic view of affordable housing and neighborhood data, replacing the earlier DC Preservation Catalog.

### Key Takeaway for Judging
The corpus concludes: "Organizational complexity outweighs technical gaps. Overlapping programs and agreements cause more friction than IT limitations. Establishing a 'compliance source of truth' and standard operating procedures (SOPs) must precede software development" (`E3_prior_art_housing_compliance.md`). This frames the challenge correctly — the demo should be evaluated on whether it addresses the organizational fragmentation, not just the technical build.

---

## 2. HUD Data Sources Available for Richmond

The corpus (`D4_data_hud_rental.md`) provides a detailed inventory of HUD datasets applicable to Richmond compliance monitoring:

### Fair Market Rents (FMR) and Small Area FMRs
FMRs represent the 40th percentile gross rent (shelter + utilities) for the Richmond HMFA, updated annually effective October 1. These set the baseline for HCV payment standards and HOME/ESG rent ceilings. **Small Area FMRs** break this down by ZIP code, which is critical for neighborhood-level rent-cap validation. Both are available via HUD API — a compliance tool could automate rent-limit lookups without manual table references.

### Income Limits
HUD Income Limits define AMI-derived eligibility thresholds by household size. The FY2025 limits for Richmond set 80% AMI for a 4-person household at $90,800, with 30% AMI at $34,050. **FY2026 limits are delayed to May 1, 2026** due to Census ACS data release delays — any tool built at the hackathon must use FY2025 values and be parameterized to update.

### LIHTC and NHPD Property Data
The HUD LIHTC database provides property-level data on tax credit projects. NHPD consolidates this with Section 8, HOME, and public housing data but caps filtered exports at 1,000 records and excludes state/local-only subsidies. For Richmond's local programs (AHTF, AHTEP, EAHP), NHPD data must be augmented with Legistar award records and Assessor parcel data (`D3_data_housing_programs.md`).

### CHAS Housing Needs Data
CHAS data provides census-tract-level housing cost burden and needs metrics. The most recent release (December 2025) uses 2018–2022 ACS data — a 2-3 year lag makes it useful for structural context but not current-year compliance monitoring (`D5_data_quality.md`).

### Practical Application
The corpus recommends: "Hardcode FY2025 values into interim eligibility checks and pro formas, but build parameterization to automatically switch to FY2026 values once published on May 1" (`D4_data_hud_rental.md`). For a hackathon build, this means the rent-cap calculator should fetch AMI/FMR data from HUD's API rather than embedding static values.

---

## 3. Richmond-Specific Data and Systems Today

### The Three Programs and Their Systems
Richmond's compliance monitoring is fragmented across three programs, each with its own submission channel and enforcement mechanism (`A1_problem_landscape_housing_compliance.md`):

| Program | System | Deadline | Submission Method |
|---------|--------|----------|-------------------|
| **AHTF** | Email / HCD internal | January 15 | Annual affordability certification via email/PDF |
| **AHTEP** | EnerGov portal + Assessor | November 1 | Renewal application through EnerGov; Assessor coordinates inspections |
| **EAHP** | OneDrive | Varies | Application intake via OneDrive links |

There is no unified compliance registry, no shared calendar, and no system that gives a portfolio-wide view.

### Available Public Data for a Compliance Tool
The corpus (`D3_data_housing_programs.md`) identifies what can be built from public sources without internal City data access:

- **Legistar**: Council ordinances approving AHTF awards, HOME/CDBG allocations, and affordability covenants — but financial terms are buried in PDF attachments, not structured fields.
- **HUD AMI/FMR**: Publicly available via API for automated rent-limit calculations.
- **NHPD**: Federal property baseline, but excludes local-only subsidies.
- **Richmond Open Data / Assessor**: Parcel IDs and property data for geographic mapping, but no affordability covenant tracking.
- **RRHA Communities**: Public housing and PBV site listings for cross-reference, but not a structured database.

### What Requires Internal City Data
True compliance verification requires records that are not publicly accessible: executed regulatory agreements, recorded covenants, annual owner certifications, tenant rent rolls and income documentation, and physical inspection results (`E3_prior_art_housing_compliance.md`, `C3_services_housing_programs.md`).

---

## 4. The 2026 Audit Findings and Their Implications

The February 2026 audit by City Auditor Riad Ali is the most significant piece of context for evaluating any compliance monitoring tool (`A1_problem_landscape_housing_compliance.md`). Key findings:

- **The City did not follow its own funding rules.** Ordinances passed in 2019 and 2021 to fund the AHTF were "unpredictable and never fully implemented."
- **$2.4 million was never transferred.** Tax abatement revenues credited to a special reserve in 2022 sat unallocated for three years.
- **No separate accounting fund existed.** The AHTF did not have its own accounting structure until December 2025.
- **No documented implementation plan.** Key requirements were "unclear or not adhered to, in part due to the absence of a documented implementation plan."
- **Staff turnover was cited as a root cause.** Policies could not be verified as implemented because institutional knowledge left with departing staff.

### Implications for a Compliance Dashboard
The audit reveals a governance gap that software alone cannot fix — but software can make the gap visible and harder to ignore. A compliance dashboard that tracks ordinance-to-outcome chains, surfaces missed deadlines, and persists institutional knowledge beyond staff tenure directly addresses the audit's findings. The root cause analysis (`A4_problem_landscape_root_causes.md`) ranks "manual compliance workflows" and "siloed systems without cross-links" as high software-addressability problems, while "weak ordinance execution controls" requires policy reform that software can support but not replace.

### The New Ordinance Changes the Stakes
Ordinance 2026-045 dedicates 2.5% of real estate tax revenue to the AHTF and requires a quadrennial performance evaluation (`C3_services_housing_programs.md`). This means the City is now legally obligated to report on compliance outcomes — the informal, spreadsheet-based approach is no longer viable.

---

## 5. What Works for Weekend-Build Compliance Dashboards

The corpus (`E5_prior_art_weekend_viable.md`) identifies patterns that succeed in hackathon settings and patterns that fail:

### Patterns That Work
- **Static-first architecture**: Pre-fetch data before the hackathon; build against local snapshots rather than live API dependencies. 2nd City Zoning in Chicago has run for years on annually refreshed GeoJSON.
- **Single high-signal question**: Scope to one clear user need. "Which properties have certifications due in the next 60 days?" is weekend-viable. "Build a full compliance management system" is not.
- **Public data seeding**: Use HUD AMI/FMR via API, NHPD property lists, and Legistar award data to build a baseline inventory without needing internal City access.
- **Pre-populated demo data**: Denver's portal model (pre-fill prior-year data, validate against current limits) translates to a hackathon context — seed the tool with realistic Richmond property data and demonstrate the validation logic.

### Patterns That Fail
- **Multi-agency data joins under time pressure**: The Anti-Eviction Mapping Project in NYC required months of volunteer labor to clean and geocode raw data. Attempting this during a hackathon guarantees failure (`E5_prior_art_weekend_viable.md`).
- **Live API dependencies during demo**: If the demo depends on a live EnerGov or Assessor API call, it will break during the presentation. Snapshot everything.
- **Scope creep into enforcement**: A compliance *dashboard* is weekend-viable. A compliance *enforcement system* with automated notices, cure-period tracking, and legal letter generation is not.

### Sustainability Signals
The corpus warns that civic tech tools die without dedicated operations budgets, and volunteer-hosted services are not durable at scale (`E4_prior_art_failures.md`). Key continuation factors: named organizational steward, minimal hosting costs (static sites or managed platforms), and documented data refresh processes. The compliance overreach research (`G2_risks_compliance_overreach.md`) adds that the tool must be framed as advisory — surfacing information for staff review — rather than making compliance determinations, to avoid legal and reputational risk.

### What a Realistic Weekend Build Looks Like
Based on the corpus, a credible hackathon compliance dashboard would:
1. Seed a property inventory from NHPD + Legistar AHTF awards + simulated AHTEP/EAHP data
2. Calculate rent caps using HUD AMI/FMR API data
3. Display a deadline calendar with 60/30-day warning thresholds
4. Show portfolio-level compliance metrics (% certified, % overdue, % at risk)
5. Flag properties needing staff review without labeling them "non-compliant"

This matches the prior art pattern: Denver's portal for structured intake, NHPD for property baseline, and Chicago's ARO dashboard for public-facing status reporting.
