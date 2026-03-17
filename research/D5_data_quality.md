# De-risking Thriving Neighborhoods: Data Quality Pitfalls and Fast Fixes

## Executive Summary
Hackathon teams building prototypes for the "Thriving Neighborhoods" initiative face a landscape of rich but structurally flawed civic data. The most critical failure modes will not stem from missing data, but from silent mis-joins, stale statuses, and double-counted metrics. Legistar records suffer from late-arriving updates and bury critical location data inside PDF attachments. Richmond's GeoHub parcels duplicate geometries for multi-owner properties, threatening to inflate impact metrics. Meanwhile, HUD datasets provide excellent structural baselines but lag current market realities by years. 

None of these issues are hard blockers. With lightweight guardrails—such as versioned ingestion, geometry-based deduplication, and OCR-backed address resolvers—teams can build reliable, high-impact prototypes. This report outlines the specific data quality challenges across Legistar, GeoHub, and HUD sources, ranking their severity and providing actionable mitigation strategies.

## Why This Matters: Prevent "Beautiful But Wrong" Prototypes
When integrating municipal legislative data with spatial parcels and federal housing metrics, the risk of creating "beautiful but wrong" maps is exceptionally high. A naïve join between Legistar and GeoHub will drop records because addresses are trapped in PDFs. A simple count of parcels will overstate neighborhood density because of stacked ownership records. Most issues are workable with targeted engineering guardrails; the key is anticipating where the data models diverge from reality.

## Source-by-Source Quality Assessment

### Legistar: Late Updates and Addresses in PDFs Demand Versioned Ingestion
Municipal legislative systems are designed for clerks, not data scientists. Legistar deployments across thousands of jurisdictions consistently exhibit "daily deltas + late-arriving updates" [1]. 

* **Status Truth Lags Actions**: A legislative file's lifecycle can span months, with statuses and matter types shifting over time. For example, Richmond's ORD. 2025-259 was created on August 13, 2025, but not adopted until February 23, 2026 [2]. Relying on a single point-in-time scrape will yield stale or inaccurate statuses.
* **Addresses Live in Attachments**: Legistar's structured "Location" fields are often unreliable or blank. Critical parcel identifiers and addresses are typically embedded within attached Staff Reports (e.g., "1203 North 19th Street" in ORD. 2023-189 or "9040 Stony Point Pkwy" in ORD. 2025-252) [3] [4].
* **What to do**: Build idempotent, versioned ingestion pipelines keyed by GUID. Schedule post-meeting re-syncs for 14–30 days to catch late updates. Treat "Final action" as the authoritative source of truth [2].

### Richmond Parcels: "Stacked" Features Will Double-Count Unless Deduped
Richmond's GeoHub provides robust parcel geometry, but its relationship with the Computer Aided Mass Appraisal (CAMA) system introduces a critical trap for spatial aggregations.
* **The Stacking Problem**: The Richmond Parcels dataset (updated March 14, 2026) explicitly warns that in instances of multiple ownership records (PINs) for a single parcel, the parcel geometry will be duplicated or "stacked" [5].
* **What to do**: Always deduplicate by geometry or use a canonical parcel identifier before running aggregations. Failing to do so will double-count units, assessed values, and impacted residents in multi-owner buildings.

### Development Mapper: Periodic Updates and High Thresholds
The Richmond Development Mapper is highly valuable for landscape context but dangerous if treated as a live, comprehensive pipeline.
* **Currency and Scope Limits**: The city explicitly notes that the map is "updated periodically" and only tracks development projects "over $1.5 million" since 2016 [6]. 
* **What to do**: Display "as-of" dates and disclaimers in the UI. Avoid using this layer for near-real-time workloads like active permit monitoring or micro-scale neighborhood comparisons.

### HUD Datasets: CHAS Lag and FMR Coarse Geography
Federal housing data provides the structural backbone for affordability metrics, but its timeliness and geographic granularity require careful handling.
* **CHAS Data Lag**: The Comprehensive Housing Affordability Strategy (CHAS) data relies on ACS 5-year estimates. The most recent update, released on December 23, 2025, is based on 2018–2022 data [7]. This introduces a 2–3 year lag, making it unsuitable for tracking current-year affordability shocks.
* **FMR Granularity**: Fair Market Rents (FMRs) are calculated for broad metropolitan and non-metropolitan areas. HUD updates these using regional CPI factors, which can diverge sharply from local realities (e.g., between 2013–2016, Austin's gross rent changed by 5.8% while the South region CPI factor was only 2.6%) [8].
* **What to do**: Use CHAS for structural need patterns, but pair it with local, recent signals (permits, rent listings). Never downscale FMRs to compare individual neighborhoods within Richmond; use them only as city-wide benchmarks.

### Preservation Databases: Breadth with Known Scope Limits
The National Housing Preservation Database (NHPD) consolidates federal subsidies (PBRA, LIHTC, etc.) [9]. However, properties often contain multiple overlapping subsidies [10], and purely local or municipal preservation efforts are generally excluded.
* **What to do**: Use NHPD as the backbone, but annotate gaps. Invite local housing partners to contribute program overlays to prevent undercounting preservation candidates at the neighborhood scale.

## Cross-Source Linkage and Document Processing Risks

Linking Legistar records to GeoHub parcels is the most technically demanding challenge. Because Legistar rarely exposes parcel PINs and addresses are locked in PDFs [3] [4], teams must rely on natural language extraction. 

Furthermore, PDF variability degrades automated summarization. Attachments range from born-digital staff reports to mixed-format packets with embedded images. Fortunately, Richmond staff reports utilize consistent headers (e.g., "Purpose," "Findings of Fact," "Master Plan") [3] [4]. Teams should detect scan vs. text, run OCR when needed, and extract structured sections via regex templates tuned to these headers.

## Ranked Data Quality Risks for Hackathon Teams

| Rank | Risk | Severity | Impact on Prototype | Practical Mitigation | Blocker? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Cross-source join: Legistar to Parcels** | High | Inaccurate parcel mapping; wrong neighborhood attribution; broken maps. | PDF/OCR extraction; USPS standardization; fuzzy geocode to spatial join; human review for low-confidence matches. | Workaround (requires effort) |
| **2** | **Legistar late-arriving updates** | High | Status inaccuracies (introduced vs adopted); stale summaries. | Versioned ingestion; 14–30 day re-sync; show status timestamps; treat "Final action" as authoritative. | Workaround |
| **3** | **Development layers currency** | Med-High | Stale project statuses; misinforms users about the current pipeline. | Display "as-of" dates; use as context only; avoid KPIs from these layers. | Workaround |
| **4** | **Parcel stacking and duplication** | Medium | Double counting in metrics; incorrect totals for multi-owner lots. | Dedupe by geometry or unique parcel ID before aggregations. | Workaround |
| **5** | **PDF attachment variability** | Medium | Unreliable plain-language summaries; missed addresses/conditions. | Detect scan vs text; OCR fallback; regex templates for standard Richmond headers. | Workaround |
| **6** | **HUD CHAS 2–3 year lag** | Medium | Misalignment with current affordability stress; policy misread. | Label vintage; use for structural segmentation; pair with fresh local indicators. | Workaround |
| **7** | **FMR geographic coarseness** | Medium | Neighborhood comparisons can be misleading; allocation errors. | Use FMR only as an area-wide benchmark; avoid downscaling. | Workaround |
| **8** | **Projection/CRS mismatch** | Low-Med | Subtle spatial offsets; bad joins. | Read REST spatialReference; reproject on ingest to a locked project CRS. | Workaround |
| **9** | **Preservation DB coverage gaps** | Low-Med | Under-counting at-risk assets; incomplete maps. | Annotate scope; solicit local program overlays; flag "unknown" status. | Workaround |

## Output Requirements: Facts, Inferences, and Unknowns

### Facts (with URLs)
* Richmond GeoHub Parcels were updated March 14, 2026, and the dataset explicitly warns of duplicated ("stacked") parcel features when multiple ownership records exist. (https://www.arcgis.com/home/item.html?id=fbfce2aab2a44c05bc0abc2d6ea7e54a)
* The Richmond Development Mapper is "updated periodically" and scoped strictly to "projects (over $1.5 million) since 2016." (https://www.rva.gov/planning-development-review/interactive-mapping-tools)
* Richmond Legistar files have long lifecycles; for example, ORD. 2025-259 was created on 8/13/2025 and adopted on 2/23/2026. (https://richmondva.legistar.com/LegislationDetail.aspx?From=RSS&GUID=30C4D9D9-9797-4747-9AFB-F082EF1A447A&ID=7731683)
* Richmond staff report attachments contain critical addresses and utilize structured headings like "Purpose" and "Findings of Fact." (https://richmondva.legistar.com/gateway.aspx?ID=6111f717-e589-406d-9809-fefea10182bc.pdf&M=F)
* HUD released the 2018–2022 ACS-based CHAS data on December 23, 2025. (https://www.huduser.gov/portal/datasets/cp.html)
* HUD FMRs rely on regional CPI adjustments that can differ significantly from local rent changes (e.g., Austin 5.8% vs South region 2.6% from 2013-2016). (https://www.huduser.gov/portal/sites/default/files/pdf/Proposals-To-Update-the-Fair-Market-Rent-Formula.pdf)
* Legistar ecosystems experience "daily deltas + late-arriving updates," requiring time-aware data ingestion. (https://govdataconsulting.com/ai.html)

### Inferences (Clearly Labeled)
* **Inference**: Legistar "Location" fields alone will be insufficient for parcel-precise joining. *Rationale*: Addresses are inconsistently present in structured fields and are more reliably found buried in staff report PDFs.
* **Inference**: Richmond Legistar matter type classifications likely suffer from category drift. *Rationale*: Variability and late updates are endemic to Legistar ecosystems, and files are frequently amended or re-referred over their multi-month lifecycles.
* **Inference**: Richmond ArcGIS Online layers are likely projected in Web Mercator (EPSG:3857). *Rationale*: This is the ArcGIS Online default, meaning projection mismatches will surface if teams mix this with local engineering datasets without transforming inputs.

### Unknowns
* The exact update latency SLA for Richmond Legistar after Council actions (e.g., the specific window for minutes/votes posting).
* The consistency and completeness of Richmond Legistar structured "Location" fields across all historical matter types.
* The exact spatial reference and datum for every individual GeoHub layer used in prototypes (must be confirmed via REST endpoints).
* The specific refresh cadence for development activity layers beyond the vague "periodic" disclaimer.
* The geocoding success rate for Richmond addresses extracted via OCR from older, scanned staff report PDFs.
* The exact extent of coverage gaps in the NHPD regarding locally funded preservation efforts within Richmond.

## References

1. *GovData - Municipal Decision Dataset for AI Training, Grounding & Evaluation*. https://govdataconsulting.com/ai.html
2. *
	City of Richmond - File #: ORD. 2025-259
*. https://richmondva.legistar.com/LegislationDetail.aspx?From=RSS&ID=7731683&GUID=30C4D9D9-9797-4747-9AFB-F082EF1A447A
3. *ORD. 2023-189 - Staff Report*. https://richmondva.legistar.com/gateway.aspx?M=F&ID=6111f717-e589-406d-9809-fefea10182bc.pdf
4. *ORD. 2025-252 - Staff Report*. https://richmondva.legistar.com/View.ashx?M=F&ID=14978174&GUID=C6A862A5-A2B1-4DEE-926C-51DA18E3CF71
5. *Parcels - Overview*. https://www.arcgis.com/home/item.html?id=fbfce2aab2a44c05bc0abc2d6ea7e54a
6. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
7. *Consolidated Planning/CHAS Data | HUD USER*. https://www.huduser.gov/portal/datasets/cp.html
8. *Proposals To Update the Fair Market Rent Formula*. https://www.huduser.gov/portal/sites/default/files/pdf/Proposals-To-Update-the-Fair-Market-Rent-Formula.pdf
9. *Picture of Preservation 2021*. https://preservationdatabase.org/wp-content/uploads/2021/10/NHPD_2021Report.pdf
10. *Data Dictionary August 2025*. https://preservationdatabase.org/wp-content/uploads/2025/09/Data-Dictionary-August-2025.pdf