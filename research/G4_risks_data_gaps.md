# Don't Let Data Gaps Lie: Designing Richmond's Tools to Be Honest, Fresh, and Verifiable

## Executive Summary

When civic technology tools present data without explicit boundaries, users naturally assume the information is complete, real-time, and authoritative. In Richmond, relying on single data sources like Legistar, GeoHub, or HUD IDIS creates significant risks of misleading residents and staff. Legistar queries can miss early-stage development filings that live in EnerGov. Stale GIS layers on GeoHub can misrepresent project statuses. HUD IDIS dashboards only capture specific federal grant programs, omitting local investments. Furthermore, human factors research demonstrates that users suffer from "automation bias," routinely over-trusting automated systems and committing errors of omission and commission. To mitigate these risks, Richmond's data tools must implement W3C metadata standards, explicitly state coverage limitations, and design interfaces that actively calibrate user trust.

## Why This Matters Now

Residents and staff are at real risk of acting on incomplete data without explicit transparency. Split workflows (EnerGov filings vs. Legistar agendas), unclear GeoHub freshness, and IDIS scope limits create predictable blind spots. If a resident uses a development notifier that only queries Legistar, they may miss a crucial proposal because it was not yet docketed. If staff rely on a housing dashboard powered solely by HUD data, they will undercount local investments. UI/UX design must neutralize these risks by making data gaps transparent.

## Source-by-Source Risk Deep Dive

Each primary data source has a characteristic failure mode that must be addressed through design and aggregation.

### Legistar's 7-Day Creation-to-Agenda Window Shows Real Recency Gaps

A resident searching "today" can miss items added "tomorrow"; single point-in-time pulls are unsafe. In Richmond, the Planning Commission directs agendas and minutes to Legistar [1]. However, the actual applications and statuses flow through the EnerGov Online Permit Portal [2] [3]. There is a documented lag between these systems. For example, Legistar file PDRMIN 2026.004 was created on 2/25/2026 but did not appear on an agenda until 3/3/2026 [4]. A notifier relying solely on Legistar would miss this 7-day window.

### GeoHub "Plans of Development" Metadata Visibility Gap Increases Status Risk

Without visible last-updated and accrual periodicity metadata, users infer a level of freshness that may not exist. The Richmond GeoHub hosts a "Plans of Development" dataset [5]. However, if the update cadence is unclear, a project approved yesterday may still show as "Pending" today. The W3C Data on the Web Best Practices strongly recommend providing descriptive metadata, including the date of last modification and the expected update schedule [6].

### HUD IDIS Is Powerful but Partial

Dashboards implying "all housing investments" mislead users if they rely solely on HUD's Integrated Disbursement and Information System (IDIS). IDIS is the reporting system for specific CPD formula grant programs: CDBG, HOME, HTF, ESG, and HOPWA [7]. It does not include local or state funds. Furthermore, end-of-year reporting for these programs is only required within 90 days after the end of the program year [8]. 

## Human Factors: Automation Bias and Trust Calibration

Users predictably over-rely on automated tools. Empirical reviews show that "automation bias" causes both omission and commission errors, even among experts [9] [10]. One aviation study found a 55% omission rate when automation failed to cue events [10]. While training can reduce some errors, it does not eliminate them [11]. Interface design must counteract this by adding persistent "Not comprehensive/verify" cues, visible provenance, and data confidence badges.

## Design for Data Gap Transparency

Transparency is a standard, not a nice-to-have. W3C Best Practices call for descriptive metadata including last modified dates, spatial/temporal coverage, update frequency (`dct:accrualPeriodicity`), and provenance [6]. Every data view should feature a baked-in metadata panel detailing the last updated timestamp, expected refresh frequency, covered time window, sources, and explicit exclusions.

## Data Gap Risk Matrix and Prioritization

| Source | Gap Type | Severity | Mitigation |
| :--- | :--- | :--- | :--- |
| **Legistar (Richmond)** | Recency gap (late additions); coverage gap (items not yet docketed) | High | Re-poll Legistar on a schedule; integrate EnerGov search; display "As of" timestamps; add coverage note "Items may be added after this time". |
| **Richmond GeoHub** | Staleness/unknown freshness; status drift | Medium-High | Require and display dataset- and record-level Last Updated and Data as-of; show expected update frequency; amber-flag stale records. |
| **HUD IDIS** | Scope/coverage gap; timeliness lag | High | Explicit scope labels; "Included/Excluded" legend; integrate additional local/state/private sources; show program year coverage. |
| **All UIs** | Over-trust/automation bias | High | Prominent non-authoritative banner; confidence/freshness badges; provenance panel; "Verify on source" buttons. |

*Takeaway:* High-severity items like Legistar recency and IDIS scope messaging must be tackled immediately to prevent users from missing critical civic interventions or misunderstanding city investments.

## Implementation Plan

Ship iteratively over 90 days to ensure honest, fresh, and verifiable data:
* **Week 0-2:** Add "As of" timestamps, coverage boxes, verify links, and implement non-authoritative banners.
* **Week 3-6:** Implement Legistar re-polling, EnerGov linking, and freshness badges.
* **Week 7-10:** Surface GeoHub metadata; implement stale-status flags; publish machine-readable DCAT/PROV metadata.
* **Week 11-12:** Launch SLA dashboards, public pipeline status, and user feedback loops.

## Governance and QA

Assign data stewards to monitor freshness Service Level Objectives (SLOs) and audit high-impact changes. Set source-specific SLOs (e.g., Legistar sync ≤2h, EnerGov ≤6h, GeoHub ≤24h, HUD monthly) and show live pipeline status and breach alerts directly in the UI.

## Success and Failure Scenarios

* **Success:** A user views a development map, sees "Pending (as-of 2 days ago)" with a "Verify on EnerGov" button, and clicks through to find the newly approved status, avoiding an outdated assumption.
* **Failure:** A dashboard titled "All City Housing Investments" is built solely on IDIS. It under-reports local funds during budget season, leading advocates to falsely accuse the city of under-investing in affordable housing.

## Appendices: Facts, Inferences, Unknowns, and UI Checklists

### Facts
* IDIS covers CPD programs (CDBG, HOME, HTF, ESG, HOPWA) [7].
* IDIS end-of-year reporting is due within 90 days [8].
* Richmond Planning Commission directs agendas to Legistar [1].
* Richmond uses EnerGov for online permits and plans [2] [3].
* W3C Data on the Web Best Practices require metadata like last modified and update frequency [6].
* Automation bias causes omission and commission errors [9] [10].

### Inferences (Clearly Labeled)
* *Inference:* A resident using a Legistar-only notifier could miss proposals filed in EnerGov that are not yet docketed.
* *Inference:* GeoHub layers likely update on a schedule not visible on the public page, leading users to assume false recency.
* *Inference:* Dashboards built from HUD IDIS alone will systematically under-represent total City housing investments.

### Unknowns
* Legistar API/feed refresh frequency and latency for Richmond.
* Whether all Planning Commission-relevant filings are guaranteed to appear in Legistar prior to meeting publication.
* Update cadence for the specific Richmond "Plans of Development" GIS layer.

### Required UI Elements for Any Data-Dependent Tool
* **Freshness and provenance:** Dataset-level "Last updated" and record-level "Data as-of" timestamps.
* **Coverage and limitations:** "What's included / What's excluded" boxes.
* **Trust calibration:** Persistent "Not comprehensive—verify before action" banners and "Verify on source" buttons.
* **Change awareness:** "New/changed since your last visit" flags.

## References

1. *Planning Commission | Richmond*. https://www.rva.gov/planning-development-review/planning-commission
2. *Online Permit Portal | Richmond*. https://www.rva.gov/planning-development-review/online-permit-portal
3. *Permits and Inspections | Richmond*. https://www.rva.gov/planning-development-review/permits-and-inspections
4. *
	City of Richmond - File #: PDRMIN 2026.004
*. https://richmondva.legistar.com/Gateway.aspx?M=LD&From=RSS&ID=7929491&GUID=AF5178B4-776D-441F-A097-2BC27A3538EB
5. *Plans of Development | Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/plans-of-development-3
6. *Data on the Web Best Practices*. https://www.w3.org/TR/dwbp/
7. *IDIS: Integrated Disbursement and Information System - HUD Exchange*. https://www.hudexchange.info/programs/idis/
8. *IDIS Reporting - HUD Exchange*. https://www.hudexchange.info/programs/idis/idis-reporting/
9. *Complacency and bias in human use of automation: an attentional integration - PubMed*. https://pubmed.ncbi.nlm.nih.gov/21077562/
10. *
            Automation bias: a systematic review of frequency, effect mediators, and mitigators - PMC
        *. https://pmc.ncbi.nlm.nih.gov/articles/PMC3240751/
11. *Automation bias and errors: are crews better than individuals? - PubMed*. https://pubmed.ncbi.nlm.nih.gov/11543300/