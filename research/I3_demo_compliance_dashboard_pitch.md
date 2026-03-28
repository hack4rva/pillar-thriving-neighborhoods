> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Turning Legistar Records into Actionable Compliance Alerts

## Executive Summary
Affordable housing compliance monitoring is currently under-resourced, highly manual, and heavily reliant on owner self-reporting. A county Grand Jury investigation found that monitoring is often "inconsistent and often inadequate," with on-site checks remaining rare due to insufficient personnel and budgetary limitations [1]. Meanwhile, the risk of losing affordable units is escalating; data from the National Housing Preservation Database (NHPD) previously highlighted that nearly 500,000 federally-assisted apartments were set to reach the end of their subsidy contracts and affordability restrictions within a five-year window [2]. 

This document provides a comprehensive 3–5 minute demo script and strategic pitch narrative for an affordable housing compliance monitoring tool. By leveraging public data from Legistar, HUD APIs, and the NHPD, this prototype delivers a centralized portfolio dashboard that tracks expiring covenants and benchmarks rents. It is explicitly designed as a workflow prototype—not a definitive compliance system—allowing cities to validate automated alerts and streamline cross-referencing without requiring immediate access to sensitive internal data.

## Audience Reality Check — Why this scenario resonates
City compliance officers are routinely forced to juggle 10 to 30 affordable housing developments using nothing more than static spreadsheets and a Legistar search bar. This fragmented approach makes critical expiration dates incredibly easy to miss and turns routine cross-referencing into a time-consuming burden. 

The current workflow is constrained by severe capacity limits. Monitoring requirements are largely met by accepting self-reported data from property owners and managers, while proactive, on-site monitoring is rarely conducted [1]. When compliance tracking is embedded in individual spreadsheets rather than a centralized system, institutional knowledge is siloed. If an officer misses an expiring affordability restriction, the city risks losing critical affordable housing stock and faces severe credibility damage with the public. The opening of this pitch directly targets this exact persona, validating their daily struggle and immediately offering a streamlined alternative.

## Problem Framing with Evidence — Three friction points we fix
The core frictions in municipal affordable housing compliance stem from disconnected systems and a lack of proactive alerting. 

First, staff suffer from manual cross-referencing fatigue. They must constantly dig through Legistar files and attachments to locate the original regulatory agreements and committed rent levels. Second, there are zero proactive alerts for expiring affordability or use restrictions. Developing a preservation inventory that tracks up-to-date subsidy expiration timelines is a critical first step toward monitoring expiring properties, yet many cities lack the tools to do this effectively [3]. Third, there is a significant benchmark gap. Compliance officers have no simple way to compare committed rents against public standards like HUD Fair Market Rents (FMR) or Area Median Income (AMI) limits. 

This combination of manual tracking and lack of alerts leads to the ultimate failure case: an over-reliance on owner self-reporting and low-priority monitoring that leaves cities vulnerable to sudden affordability losses [1].

## Data Sources We Can Use Today — Public, stable, auditable
To build a credible workflow prototype without touching sensitive internal city data, we rely entirely on public, stable, and auditable data sources. Legistar (Granicus) provides the foundational ordinance records, action histories, and critical attachments. For example, Seattle City Council Record CB 120058 explicitly includes attachments for a "Form of Affordable Housing Covenant" and a "Form of Restrictive Covenant" [4]. 

For rent benchmarking, HUD provides Fair Market Rents (FMRs) via an application programming interface (API) [5]. FMRs are gross rent estimates that include shelter rent and the cost of necessary utilities, serving as a primary operating parameter for programs like the Housing Choice Voucher program [6]. It is critical to distinguish FMRs from HUD Income Limits, which are calculated as a function of the area's Median Family Income (MFI) and are used to determine program eligibility [7]. Finally, the NHPD provides address-level data on federally assisted rental housing, including the earliest and latest subsidy expiration dates for specific properties [3].

| Data Source | What it provides | Update cadence | Access path | Powers which screens |
| :--- | :--- | :--- | :--- | :--- |
| **Legistar (Granicus)** | Ordinance IDs, titles, actions; attachments including covenants [4] | Continuous (as adopted) | Public web; file detail URLs | Portfolio list, property drill-down, ordinance links |
| **HUD FMR** | Area FMRs (gross rent, by bedroom), effective FY [6] | Annual; posted ≥30 days pre-FY [5] | HUD API and site [5] | Rent benchmark card, timestamps |
| **HUD Income Limits** | AMI-based limits by area/family size [7] | Annual | HUD API and site [5] | Explanatory tooltip/disclaimer |
| **NHPD** | Property-level subsidy data; Earliest/Latest end dates [3] | Quarterly [3] | Gov/NP access (free) [3] | Expiring-use filter and flags |

*Key Takeaway: By combining Legistar's document repository with HUD's standardized APIs and NHPD's expiration tracking, the prototype delivers immediate, auditable value without requiring complex internal IT integrations.*

## Demo Flow — Screen states and beats mapped to value
This 3–5 minute script is designed to replace current pain points with a faster, auditable workflow. 

**Beat 1: The Hook**
* **Spoken Script:** "It’s Monday 8:30am. You’re managing 17 funded developments with a spreadsheet and a Legistar search bar."
* **Screen State:** A split screen showing a complex, color-coded Excel spreadsheet next to a browser window with a blank Legistar search bar.

**Beat 2: The Problem**
* **Spoken Script:** "Three things steal your time: manually cross-referencing ordinances to find rent commitments, digging for expiring affordability periods, and struggling to compare those committed rents to current HUD Fair Market Rents."
* **Screen State:** Callout animations highlight buried spreadsheet cells and multiple open browser tabs showing dense ordinance PDFs.

**Beat 3: Reveal the Dashboard**
* **Spoken Script:** "Here is the alternative. This portfolio dashboard consolidates your properties, sorting them automatically by their earliest subsidy end date."
* **Screen State:** A clean portfolio list view sorted by "Earliest End Date" with colored expiration chips (Red for <6 months, Yellow for <12 months).

**Beat 4: Filter Expirations**
* **Spoken Script:** "Instead of scrolling through rows, you click one filter to see exactly what needs your attention in the next six months, preventing silent expirations."
* **Screen State:** The user clicks a top filter labeled "Expiring in next 6 months." The list instantly narrows to 3 at-risk properties, with alert icons pulsing.

**Beat 5: Drill Into One Property**
* **Spoken Script:** "Let’s drill into one property. Instantly, you have the original Legistar ordinance link, the committed rent levels extracted from that text, and a side-by-side comparison with the current HUD FMR. FMR is a gross rent benchmark, not your AMI rent limit—this is an advisory check to spot glaring discrepancies."
* **Screen State:** A detailed property panel opens. It displays: (a) A clickable Legistar ordinance link, (b) Committed rent levels, (c) A HUD FMR card showing the Fiscal Year, bedroom mix, and gross rent, and (d) A text box for status notes.

**Beat 6: Data Provenance**
* **Spoken Script:** "To be completely transparent: this demo is seeded from Legistar ordinances and HUD data; this is a workflow prototype, not a compliance system."
* **Screen State:** A provenance sidebar slides in, showing source badges (Legistar, HUD API, NHPD) and exact timestamps for when the data was pulled.

**Beat 7: Limitations by Design**
* **Spoken Script:** "This tool does not make compliance determinations, and it does not access your internal City data. It provides advisory flags so your staff can confirm compliance faster."
* **Screen State:** A persistent banner appears at the top reading "Advisory flags only—staff confirm compliance." A button labeled "Request internal data" is visibly greyed out.

**Beat 8: The Close and Ask**
* **Spoken Script:** "We are looking for a City housing department partner. Give us read-only access to your public ordinance listings and 15 development IDs. We will validate this workflow, map the data fields, and pilot these alerts together."
* **Screen State:** A next-steps modal appears with a simple 3-step pilot checklist.

## Handling "Is this data real?" — Honest, confident responses
Judges and stakeholders will inevitably ask if the data on the screen is real. The most effective strategy is to anchor every screen element to a real data source while being completely transparent about synthetic elements. 

Use this exact phrasing: *"This demo is seeded from Legistar ordinances and HUD data. Where we use placeholders, they’re clearly marked. It’s a workflow prototype to validate what to automate before we connect to City systems."* 

During the demo, physically point to the real anchors on the screen. Highlight the HUD Fiscal Year stamp on the FMR card and click the live Legistar URL to prove the provenance of the regulatory agreement. By offering a 30–60 day pilot plan using only public data, you demonstrate a clear path to swapping in actual City data once trust and utility are established.

## FMR vs AMI — Use the right benchmark, say it out loud
A common pitfall in housing tech pitches is conflating Fair Market Rents (FMR) with Area Median Income (AMI) limits. FMRs are designed to set a rent subsidy limit that allows households to access modestly priced rental units, representing gross rent estimates that include utilities [6]. Conversely, HUD calculates Income Limits as a function of the area's Median Family Income (MFI), which the industry generally refers to as AMI; these limits determine program eligibility and are adjusted for family size [7].

The demo must respect this boundary. The on-screen FMR comparison card must include a safeguard disclaimer: "Comparison is advisory; not a rent-limit determination." Verbally acknowledge this distinction during the pitch, and note that a future iteration of the tool will include a toggle to AMI-based local limits once the City provides its official, localized schedules.

## Feature-Not-Bug — Why "prototype, not system" builds trust
Framing the tool's lack of internal data integration as a feature rather than a limitation is a critical strategic maneuver. By explicitly stating that the tool is a "workflow prototype, not a compliance system," you immediately de-risk the proposition for city IT and legal departments. 

Starting exclusively with public data means there is no Personally Identifiable Information (PII) to protect, which drastically accelerates the procurement and pilot phases. It lowers liability and allows the city to co-define canonical fields and alert rules in a sandbox environment. This approach ensures that when the time comes for Phase 2 internal integration, the integration specifications and UI are already battle-tested and perfectly aligned with the compliance officers' actual workflows.

## Pain Points to Features — Direct mapping with proof
Every feature in the dashboard is directly mapped to a documented municipal pain point and supported by external precedent. Cities like San Francisco and Los Angeles already utilize public dashboards to track affordable housing portfolios and land use covenants, signaling a clear demand for centralized visibility [8] [9].

| Pain point | Demo feature | Evidence/precedent |
| :--- | :--- | :--- |
| **Manual cross-referencing** | Portfolio list + ordinance links | Legistar attachments routinely include covenants (e.g., Seattle CB 120058) [4] |
| **No alerts for expirations** | "Upcoming expirations" filter and badges | NHPD highlights expiring-use risk and updates data quarterly [3] |
| **Benchmark ambiguity** | HUD FMR comparison card | HUD FMR defines gross rent and is accessible via API [5] [6] |
| **Capacity constraints** | 3-click workflow, timestamps | Sonoma CGJ found insufficient staff and reliance on self-reporting [1] |

*Key Takeaway: The prototype does not invent new workflows; it automates and centralizes the exact manual steps compliance officers are currently failing to keep up with due to capacity constraints.*

## Risks and Guardrails — What we won't do
Clear scope boundaries reduce legal risk and simplify adoption. The pitch must explicitly state what the tool will *not* do. It will not make final compliance determinations, it will not access internal city systems or PII during the pilot, and it will not overwrite official systems of record. 

Instead, the tool will flag review needs, link directly to public source documents, log timestamps for auditability, and capture staff notes. To reinforce this visually, the user interface includes a persistent legal banner ("Advisory flags only—staff confirm compliance"), clear source badges, and an immutable audit trail for all data pulls.

## Call to Partnership — What we need and what you get
The pitch concludes with a highly specific, low-friction ask for a 60–90 day co-development sprint. 

**The Ask:** We need a City housing department partner to provide read-only access to public ordinance listings (or a simple CSV export), 10 to 25 development IDs for validation, and time for workflow interviews with compliance staff. 

**The Deliverables:** In return, the partner city receives validated alert rules, a mapped data dictionary, a dashboard tuned specifically to their local workflows, and a comprehensive integration specification ready for a Phase 2 internal rollout.

## Q&A Prep — Likely objections and crisp answers
Anticipating judge and stakeholder questions ensures the pitch ends on a confident note.

* **Is this real data?** "Yes, the provenance is real. We pull from live HUD APIs and Legistar links. Where we use placeholders for a specific property's internal status, they are clearly labeled."
* **Why use FMR instead of AMI?** "FMR provides an immediate, standardized gross rent benchmark via API. AMI limits govern eligibility and require local calculation rules. We will add an AMI toggle when the partner city provides their specific schedules."
* **How accurate are the alerts?** "We start with conservative rules based on NHPD's 'Earliest End Date' logic. The City will validate and adjust these thresholds during the pilot, and every alert includes an audit trail."
* **What about data governance and security?** "Phase 1 uses strictly public-source data. There is zero PII. This allows us to validate the workflow immediately while preparing a SOC2-ready environment for Phase 2."
* **Is this sustainable?** "Yes. HUD updates FMRs and Income Limits annually [5], NHPD updates quarterly [3], and Legistar updates continuously as ordinances are passed. The dashboard runs on a scheduled refresh."

## Timing Guide — Hitting 3–5 minutes with intent
To ensure the pitch remains punchy and respects the time limit, follow this strict pacing guide. The structure allocates 60% of the time to the demo itself, 20% to addressing limitations and provenance, and 20% to the closing ask.

* **0:00–0:30:** Opening scenario (The spreadsheet + Legistar reality check).
* **0:30–1:15:** Problem framing (The three frictions: cross-referencing, expirations, benchmarks).
* **1:15–2:45:** Demo beats (Portfolio view → Expiration filter → Property drill-down → FMR card).
* **2:45–3:20:** Data provenance + the "prototype, not system" feature-not-bug framing.
* **3:20–4:10:** What it doesn’t do (Guardrails and legal boundaries).
* **4:10–5:00:** Partnership ask and the 60-day pilot plan.

## References

1. *Affordable Housing: Monitoring and Compliance*. https://sonoma.courts.ca.gov/system/files/affordable-housing-monitoring-and-compliance.pdf
2. *Identifying Expiring Affordable Homes with the National Housing Preservation Database Webinar - National Housing Preservation Database (NHPD)*. https://preservationdatabase.org/preservation-resources/identifying-expiring-affordable-homes-national-housing-preservation-database-webinar/
3. *How to Identify and Preserve Expiring Affordable Housing Units*. https://www.localhousingsolutions.org/analyze/identifying-expiring-affordable-housing-properties-and-units/
4. *
	SEATTLE CITY COUNCIL - Record No: CB 120058
*. https://seattle.legistar.com/LegislationDetail.aspx?ID=4930082&GUID=8BED9C2F-DD2C-4DB4-A32F-EC8C2F1708AA&Options=ID%7CText%7C&Search=120058&FullText=1
5. *Fair Market Rents (40th PERCENTILE RENTS) | HUD USER*. https://www.huduser.gov/portal/datasets/fmr.html
6. *HUD’s Fair Market Rents and Income Limits | HUD USER*. https://www.huduser.gov/archives/portal/pdredge/pdr-edge-pdrat50-041823.html
7. *Income Limits | HUD USER*. https://www.huduser.gov/portal/datasets/il.html
8. *Land Use Covenants - LAHD - City of Los Angeles*. https://housing.lacity.gov/partners/land-use-covenants
9. *MOHCD and OCII Affordable Housing Pipeline and Portfolio Projects Dashboard | SF.gov*. https://www.sf.gov/mohcd-and-ocii-affordable-housing-pipeline-and-portfolio-projects-dashboard