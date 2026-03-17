# Data Index — Thriving Neighborhoods

This index lists the primary datasets relevant to this pillar. Verify access before building. See `02_data/source_inventory.csv` for the full machine-readable inventory.

---

## Tier 1 — Confirmed Public, Likely Accessible

### Legistar (Richmond City Council Legislative Records)
- What it contains: City Council agendas, meeting minutes, ordinances, resolutions, development proposals, zoning cases, land use actions, housing funding approvals
- Access: Richmond's Legistar instance is publicly accessible via web browser. An API (the Legistar Web API / Granicus API) may be available depending on Richmond's configuration.
- URL: [Unverified — confirm exact URL for Richmond's Legistar instance]
- Key uses: development proposal discovery, neighborhood development notifier, housing funding records, plain-language translator input
- Risk: API availability for Richmond's specific Legistar instance must be confirmed before building

### Richmond GeoHub / ArcGIS
- What it contains: Land Use Project Mapper, Development Activity Mapper, Zoning Parcel Mapper, parcel boundaries, zoning districts
- Access: Public web viewer and likely open data downloads via ArcGIS REST API
- URL: https://www.arcgis.com/apps/webappviewer/index.html (confirm Richmond-specific layers)
- Key uses: development proposal map, neighborhood change visualizer, address-based project lookup
- Risk: Layer availability and data freshness vary; confirm which layers are current vs. static snapshots

### Richmond Open Data Portal (Socrata / data.richmondgov.com)
- What it contains: Various city datasets including permits, business licenses, geographic data
- Access: Public Socrata portal with SODA API
- URL: https://data.richmondgov.com (verify active status)
- Key uses: permit activity, building data, supplementary neighborhood data
- Risk: Dataset catalog may be incomplete; verify which datasets are active and current

---

## Tier 2 — Public Federal Data, Confirmed Accessible

### HUD CHAS Data (Comprehensive Housing Affordability Strategy)
- What it contains: Housing need estimates by income, tenure, cost burden, and geographic area; based on Census ACS
- Access: HUD website, downloadable tables; data.hud.gov API
- URL: https://www.huduser.gov/portal/datasets/cp.html
- Key uses: housing affordability context, AMI calculations, cost burden analysis
- Risk: Data is 2–3 years lagged; not real-time

### HUD Fair Market Rents
- What it contains: Annual FMR estimates by unit size for Richmond MSA and Richmond City
- Access: HUD website, downloadable; API available
- URL: https://www.huduser.gov/portal/datasets/fmr.html
- Key uses: baseline for comparing actual rents against affordable housing commitments
- Risk: FMRs are MSA-level; neighborhood-level rent data is not available from this source

### HUD Affordable Housing Preservation Data
- What it contains: Federally subsidized housing properties, affordability end dates, unit counts
- Access: HUD HPAMS and preservation catalog; some public downloads
- URL: https://www.huduser.gov/portal/datasets/pis.html
- Key uses: identifying housing at risk of losing affordability restrictions
- Risk: Does not include City-funded programs; only federally subsidized properties

---

## Tier 3 — Potentially Useful, Access Uncertain

### Richmond Parcel Mapper / City Assessor Data
- What it contains: Property ownership, assessed values, parcel geometry
- Access: City of Richmond GIS portal; access method uncertain
- Key uses: ownership patterns, development site analysis
- Risk: Access method and terms of use need confirmation

### Virginia Housing Development Authority (VHDA) Data
- What it contains: Tax credit projects, loan programs, housing production data statewide
- Access: Some public reports and data; API availability unknown
- URL: https://www.vhda.com
- Key uses: affordable housing production context for Richmond
- Risk: Data is not parcel-level; mostly report-format

### Richmond Planning Commission Agendas and Staff Reports
- What it contains: Staff reports, site plans, narrative descriptions of development proposals
- Access: Available via City website and Legistar; PDF format
- Key uses: content for plain-language summaries of development proposals
- Risk: PDFs are harder to parse programmatically; content varies by proposal

---

## Data Not Available / Out of Scope

- Individual housing compliance contract data (confidential; not publicly available)
- Internal City monitoring databases (internal systems; no public API)
- Tenant-level rent data (private; PII concerns)
- Developer financial performance data (proprietary)

---

## Quick reference: which data supports which project

| Project type | Primary data |
|---|---|
| Neighborhood development notifier | Legistar, Richmond GeoHub |
| Legistar plain-language translator | Legistar (agendas, staff reports) |
| Affordable housing tracker (staff tool) | Legistar funding records, HUD FMR, CHAS |
| Development proposal map | Richmond GeoHub, Legistar |
| Neighborhood change visualizer | Richmond GeoHub, Parcel Mapper, Socrata |
| Housing investment dashboard | HUD data, VHDA data, Legistar funding records |
