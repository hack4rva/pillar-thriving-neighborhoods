<div align="center">

# Thriving Neighborhoods — Decision Funnel

Richmond Civic Hackathon • March 27–29, 2026

[![Pillar](https://img.shields.io/badge/Pillar-Thriving_Neighborhoods-4c68d7)](#)
[![Stage](https://img.shields.io/badge/Stage-Decision_Funnel-00a38f)](#)
[![Focus](https://img.shields.io/badge/Focus-From_Idea_%E2%86%92_MVP-ff7a59)](#)

</div>

This is a guided decision environment for teams working on the Thriving Neighborhoods pillar. It's designed to help you quickly choose a credible, source‑linked, weekend‑buildable MVP—and avoid fantasy software.

Journey stages: Land → Orient → Choose → Research → Compare MVPs → Lock Scope → Build → Validate → Demo → Hand‑off

Three questions to answer fast: 1) What problem are we actually solving? 2) Can we credibly demo by Sunday? 3) What should we refuse to build?

---

## The Challenge

**→ Full detail in [`CHALLENGE.md`](CHALLENGE.md).** Read it before anything else — it defines the two problems, the top blue sky vision, data constraints, how Pillar Award weights use the shared rubric, and optional per-problem prompts to help your team think about the categories (not a second judge rubric).

### Problem 1: Help Residents Discover and Understand Neighborhood Development — 26/32 — Strong ★ Recommended starting point

> How might we make it easier for residents to discover and understand development proposals in their neighborhoods so they can engage earlier and more meaningfully in the planning process?

Build toward: Neighborhood development tracker using Legistar data · Development proposal map with plain-language summaries · Public comment notifier · Legistar plain-language translator

⚠ Legistar API access for Richmond's instance must be confirmed before building a live integration. Do not imply a proposal is approved or rejected without official verification.

---

### Problem 2: Ensuring Affordable Housing Investments Stay Affordable — 22/32 — Needs work

> How might we use technology to improve how the City tracks and verifies compliance with affordable housing performance grant agreements—so that units funded through public investment remain affordable as promised, without overwhelming limited staff capacity?

Build toward: Staff-facing compliance tracker using AHPG project data and rent/occupancy reports · Affordable housing investment explorer · Rent vs. commitment monitor · Early warning tool for units approaching affordability period expiration

**Data is now available.** The City's Department of Housing & Community Development provided a full data package for this problem (see [City-Provided Data Package](#city-provided-data-package) below). The AHPG program is the designated pilot for compliance tooling.

---

### Top Blue Sky: Making Neighborhood Change Easier to Understand — 22/27 — Strong ★ Recommended

> How might we help Richmond residents understand how their neighborhoods are changing so that they can engage more meaningfully in planning and development decisions?

Scope to one neighborhood or one data layer — not a citywide dashboard. Problem 1 is the practical floor; this vision is the ceiling. A team that adds historical context and change-over-time to Problem 1 will have a compelling pitch for both the Pillar Award and the Moonshot Award.

---

### Pillar Award Rubric

| Category | Weight | Dominant question |
|----------|--------|-------------------|
| **Impact** | **5** | Does this directly address one of the two problems above? |
| User Value | 4 | Does the prototype improve a resident's ability to understand or engage with development? |
| Feasibility | 3 | Could this be piloted by a City planning department or housing team within a year? |
| Innovation | 3 | Fresh thinking on development transparency or housing compliance? |
| Execution | 3 | Does a working demo exist? Is the flow coherent? |
| Equity | 3 | Does it reach residents without planning expertise, particularly in rapidly changing neighborhoods? |

Official rubric — category definitions, scoring anchors, and judge-facing guidance: [`../RUBRIC.md`](../RUBRIC.md)

---

## Table of Contents

0. [The Challenge](#the-challenge)
1. Quick Start
2. Repo Map
3. Guardrails
4. Decision Phases
   - Phase 0: Landing & Framing
   - Phase 1: Rapid Orientation
   - Phase 2: Problem Selection
   - Phase 3: Research Spin‑Up
   - Phase 4: Opportunity Framing
   - Phase 5: Scope Lock
   - Phases 6–9: Build → Validate → Demo
5. Verification Workflow
6. Hackbot Helper
7. Appendix: Pillar Context & Rubric

---

## Quick Start

Do these first 15–30 minutes to get moving:

1) Read: `CHALLENGE.md` — the two problems, top blue sky, Pillar Award weights, and optional per-problem rubric prompts (start here, not QUICKSTART.md)
2) Read: `QUICKSTART.md`
2) Skim: `00_core/00_pillar_overview.md` and `01_problem_space/02_targeted_problem_statements.md`
3) Capture a 5‑bullet "Working Direction" using `99_templates/working_direction_note.md`
4) Decide your path:
   - Path A — already have a rough problem: jump to Phase 2 and Phase 4
   - Path B — need help choosing: start at Phase 1 and proceed in order

---

## Repo Map

- **City-provided data package (March 25, 2026): see [City-Provided Data Package](#city-provided-data-package) below — use this for Problem 2**
- Research corpus: `research/` (51 deep research reports — see `research/INDEX.md`)
- Research hub: `research_notes.md`
- Evidence tracker: `evidence_log.md`
- Data index: `02_data/00_index.md`
- Source inventory (CSV): `02_data/source_inventory.csv`
- Artifacts: `03_artifacts/`
  - Journeys: `03_artifacts/user_journeys.md`
  - Housing data feasibility: `03_artifacts/housing_data_feasibility.md`
  - Benchmark scan: `03_artifacts/benchmark_scan.md`
  - Prototype recommendations: `03_artifacts/prototype_recommendations.md`
  - Continuation plan: `03_artifacts/continuation_plan.md`
- Build guides: `04_build_guides/`
- Prompts + runners: `05_prompts/`
- Templates: `99_templates/`

### Navigation files

| File | Purpose |
|------|---------|
| `CORPUS_GUIDE.md` | Canonical guide for navigating the research corpus (humans and AI agents) |
| `manifest.json` | Machine-readable index of all significant files with summaries and tags |
| `research/index.json` | Machine-readable index of all 51 research reports |
| `research/INDEX.md` | Human-readable table of contents for the research corpus |
| `MAINTENANCE.md` | How to add, update, and sync reports and metadata |

---

## City-Provided Data Package

Provided by Rachel Hightman (Policy & Special Projects Manager, Richmond Department of Housing & Community Development) on March 25, 2026. These five files are the official dataset for **Problem 2**. The Affordable Housing Performance Grant (AHPG) program is designated as the pilot for any compliance tooling built at this hackathon.

The AHPG program provides a rebate of the incremental real estate tax increase — in the form of an annual grant from the City's Economic Development Authority — for up to 30 years. Projects must hit three milestones (Plan of Development, Commencement of Construction, Certificate of Occupancy) and submit annual rent/occupancy reports to receive grant payments. Compliance review is currently manual and entirely staff-driven.

| File | What it is | Use it for |
|------|-----------|------------|
| [`2026.03.24 - HCD Projects - Hackathon.xlsx`](2026.03.24%20-%20HCD%20Projects%20-%20Hackathon.xlsx) | Master HCD housing project dataset for the hackathon. Two sheets: all affordable housing projects by award year, funding source, developer, address, and council district; plus a reference sheet of funding types, construction statuses, and program codes. | Starting point for the full portfolio — understand scale and funding mix before narrowing to AHPG |
| [`AHPG Information.docx`](AHPG%20Information.docx) | Program overview and key questions for participants. Describes how the grant works, the three compliance milestones, the annual reporting cycle, and the three core questions Rachel's team wants answered: (1) best process for milestone tracking; (2) best process for affordability compliance; (3) best practices for maintaining project data over a 30-year lifespan. | **Read this first** — it defines the problem space and the questions judges expect your tool to address |
| [`Affordable Housing Performance Grant Projects.xlsx`](Affordable%20Housing%20Performance%20Grant%20Projects.xlsx) | Roster of all active AHPG projects. Fields include: Award Year, Developer, Project Name, City Council District, Parcel PIN, and Project Description (e.g. "Multifamily New Construction (Rental)"). Projects span FY2023–FY2026. | Core dataset for any compliance tracker — parcel PINs enable GIS integration |
| [`Affordable Housing Performance Grant Rent and Occupancy Report (2024 Limits) - FINAL.xlsx`](Affordable%20Housing%20Performance%20Grant%20Rent%20and%20Occupancy%20Report%20%282024%20Limits%29%20-%20FINAL.xlsx) | The annual compliance form grantees complete and submit with their grant payment request. Tracks units by bedroom count and AMI tier; flags whether each unit is in compliance. Virginia Housing income/rent limits for the Richmond MSA (2024 median income: $110,300) are embedded as a reference sheet. | Understanding the compliance data structure — what staff review manually today is what your tool should help organize or automate |
| [`Template - AHPG Agreement.docx`](Template%20-%20AHPG%20Agreement.docx) | Standard grant agreement between the City of Richmond, the grantee entity, and the Economic Development Authority. Defines affordability obligations, AMI thresholds, milestone requirements, and the 30-year compliance period. Each project has a customized version. | Understanding what compliance actually means legally — what commitments are made and what the City can verify |

**Key questions from HCD (Rachel Hightman) — your tool should address at least one:**
1. What is the best process for notifying, receiving, and ensuring compliance with Plan of Development, Commencement of Construction, and Certificate of Occupancy milestones?
2. What is the best process for notifying, receiving, and ensuring affordability compliance (currently: grantees submit the Rent and Occupancy Report annually alongside their grant payment request; staff review manually)?
3. What are best practices for maintaining and updating key project data in a database over a 30-year project lifespan with annual compliance requirements?

**Also available (Problem 1 — Neighborhood Development):** Brian Mercer (PDR) published an interactive development mapper web app at [https://cor.maps.arcgis.com/apps/instant/basic/index.html?appid=dfc426012992439b9f25d0f1e7397697](https://cor.maps.arcgis.com/apps/instant/basic/index.html?appid=dfc426012992439b9f25d0f1e7397697) and accompanying page at [https://www.rva.gov/planning-development-review/interactive-mapping-tools](https://www.rva.gov/planning-development-review/interactive-mapping-tools). An Excel export of that mapper data may also be available — ask your pillar lead.

---

## Guardrails

- Pick one user, one workflow, and one credible data/doc base.
- Avoid eligibility/legal determinations and policy/integration dependencies.
- Always cite official sources. Log every claim in `evidence_log.md`.
- Keep AI constrained to explanation, retrieval, comparison, and guidance.

---

## Decision Phases

<details open>
<summary><strong>Phase 0 — Landing & Framing</strong></summary>

Goal: understand what this repo is and how to use it without "exploring" for two hours.

What this pillar is about:
- Neighborhood development transparency, housing accountability, resident engagement in planning, and making development information easier to discover and understand.

Success patterns:
- Source‑linked, narrow scope, credible demo, explicit limits.

Anti‑patterns:
- Platform claims; eligibility/legal decisions; policy/integration dependencies; confidential data needs.

Admin quick links:
- Research hub: `research_notes.md`
- Evidence tracker: `evidence_log.md`
- Source inventory (CSV): `02_data/source_inventory.csv`
- Artifacts: see Repo Map below

Call to action: choose Path A or Path B.

</details>

<details open>
<summary><strong>Phase 1 — Rapid Orientation (20–30 min)</strong></summary>

Read just enough to build a shared mental model:
- `QUICKSTART.md`
- `00_core/00_pillar_overview.md`
- `00_core/01_map_alignment.md`
- `01_problem_space/02_targeted_problem_statements.md`

Filter for:
- user groups; pain points; what the City actually cares about
- problems that are software‑shaped vs policy‑shaped

Team checkpoint — Working Direction (use `99_templates/working_direction_note.md`):

```
## Working Direction
- Pillar: Thriving Neighborhoods
- Candidate problem:
- Likely user:
- Why it matters:
- Why it seems weekend‑buildable:
- Biggest uncertainty:
```

</details>

<details>
<summary><strong>Phase 2 — Problem Selection (30–45 min)</strong></summary>

Files:
- `01_problem_space/01_bluesky_problem_statements.md`
- `01_problem_space/02_targeted_problem_statements.md`
- `05_prompts/01_problem_selection_prompt.md`

Decision rule — choose only if the problem has:
- a real user and understandable workflow
- a plausible public data/document base
- a demoable artifact by Sunday

**Rubric summary:**
| Statement | Score | Band | Quick-kill flags |
|---|---|---|---|
| Neighborhood Development Discovery | 26/32 | Strong | Lacks named continuation champion |
| Housing Compliance Monitoring | 22/32 | Needs work | Lacks continuation champion; AHPG data package now available |

Output: Decision Memo (`99_templates/decision_memo.md`)

```
## Chosen Problem
## User
## Why this one
## Why not the others
## Risks
```

</details>

<details>
<summary><strong>Phase 3 — Research Spin‑Up (60–90 min)</strong></summary>

Goal: gather just enough evidence to avoid fantasy software.

Use the runner to execute targeted prompts and capture findings:
- Perplexity runner: `05_prompts/perplexity_runner/` (see its README)
- Data index: `02_data/00_index.md`
- Housing data feasibility: `03_artifacts/housing_data_feasibility.md`

Evidence Log structure (log in `evidence_log.md`):

```
## Evidence Log
### Confirmed
### Likely but unverified
### Missing
### Useful datasets
### Useful source documents
### Prior art
### Risks
```

Tip: parse URLs from API metadata; don't ask for URLs in prompt text.

</details>

<details>
<summary><strong>Phase 4 — Opportunity Framing (45–60 min)</strong></summary>

Compare at least two MVP shapes before choosing.

Files:
- `04_build_guides/01_mvp_shapes.md`
- `04_build_guides/02_recommended_architectures.md`
- `05_prompts/06_risk_review_prompt.md`

Output:

```
## MVP Options
1. …
2. …
3. …

## Recommended MVP
## Why
## What we are explicitly not building
```

</details>

<details>
<summary><strong>Phase 5 — Scope Lock (45–60 min)</strong></summary>

Pin down must‑haves, mockables, data, AI role, limits, and demo path.

Files:
- `99_templates/project_one_pager_template.md`

Key sentence:

> By Sunday, we will show a prototype that helps [user] do [specific thing] using [specific data/docs], without pretending to do [dangerous overclaim].

</details>

<details>
<summary><strong>Phases 6–9 — Build → Validate → Demo</strong></summary>

Build:
- Break work into FE/BE/data/content; assign source verification and demo owner.
- Keep AI constrained to explanation, retrieval, comparison, and guidance.

Validate:
- Use risk review prompts and red flags; check source links and clarity.

Demo:
- Follow `04_build_guides/05_demo_advice.md`.

</details>

---

## Verification Workflow

1) Add official URLs and dates in `evidence_log.md`; flip status to Verified.
2) Mirror verified sources into `02_data/source_inventory.csv` with access mode and key fields.
3) After verification, promote findings into the Executive Brief inside `research_notes.md`.

---

## Hackbot Helper

You can use Hackbot to reconstruct context, run research, and shape an MVP.

- Boot prompt: `HACKBOT_BOOT_PROMPT.md`
- Team profile (recommended): `99_templates/team_profile_template.md`

**Team skills:** `repo_memory`, `problem_scoping`, `research_runner`, `dataset_mapper`, `opportunity_mapper`, `mvp_designer`, `risk_review`, `demo_coach`, `repo_librarian`, `continuity_planner`, `research_search`

**Research corpus skills:** `research_corpus_navigation`, `cross_report_synthesis`, `evidence_grounded_answering`, `report_update_protocol`

**Hackbot resources:**

| Resource | File |
|----------|------|
| Boot prompt | `HACKBOT_BOOT_PROMPT.md` |
| Agent specification | `AGENTS.md` |
| Corpus guide | `CORPUS_GUIDE.md` |
| Full file manifest | `manifest.json` |
| Research corpus index | `research/index.json` |

Notes:
- Hackbot never invents government programs or legal eligibility. It cites official sources and encourages verification.
- For best results, create a team profile so Hackbot can map tasks to roles and follow your communication preferences.

---

## Appendix: Pillar Context & Rubric

<details>
<summary>Open context from the Pillar Committee session (February 18, 2026)</summary>

Working Session: February 18, 2026, 12:00 PM – 2:00 PM

Key contact: Sharon Ebert, Deputy CAO (DCAO) — attended working session; potential departmental champion.

Rubric Score Summary
| Statement | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Total | Band |
|---|---|---|---|---|---|---|---|---|---|---|
| Neighborhood Development Discovery | — | — | — | — | — | — | — | — | 26 | Strong |
| Housing Compliance Monitoring | — | — | — | — | — | — | — | — | 22 | Needs work |

Dimension key: D1 Clarity | D2 Scope | D3 Data readiness | D4 Champion | D5 Population & impact | D6 Operating environment | D7 Success criteria | D8 Accessibility

Quick‑kill flags: Both targeted statements lack a continuation pathway. Housing Compliance data gap is resolved — AHPG data package provided by HCD (March 25, 2026).

**Targeted Statement 1: Ensuring Affordable Housing Investments Stay Affordable (Score 22/32 — Needs work)**
- Full detail: `01_problem_space/02_targeted_problem_statements.md`
- Key constraint: much compliance data is fragmented or non-public; Housing Compliance has a data-readiness flag.

**Targeted Statement 2: Help Residents Discover and Understand Neighborhood Development (Score 26/32 — Strong)**
- Full detail: `01_problem_space/02_targeted_problem_statements.md`
- Recommended for weekend teams. Legistar and GeoHub data are publicly accessible.

**Blue Sky Statements**
- See `01_problem_space/01_bluesky_problem_statements.md`.
- Recommended: Making Neighborhood Change Easier to Understand (22/27 Strong)

Prioritized Actions Before March 27, 2026
1) Name a departmental champion (Sharon Ebert, DCAO, attended working session)
2) Link data sources: Legistar, Land Use Project Mapper, HUD Fair Market Rent, CHAS data
3) Document the housing compliance monitoring workflow
4) Specify output types

</details>
