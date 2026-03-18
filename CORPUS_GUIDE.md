# Research Corpus Guide

**Thriving Neighborhoods Pillar — Richmond Civic Hackathon**

This file is the canonical orientation document for both human readers and AI agents using this research corpus. Read it before diving into individual reports.

---

## What This Corpus Is

This repository contains a structured research corpus on Richmond's neighborhood development and housing accountability problem space, organized to support a weekend civic hackathon. It includes:

- **51 deep research reports** generated via Parallel.ai (in `research/`)
- **Evidence-synthesized artifacts** (in `03_artifacts/`)
- **Data source inventory** (in `02_data/`)
- **Build and demo guides** (in `04_build_guides/`)
- **Skills** — executable procedural guides for AI agents (in `skills/`)
- **Templates** — team and project scaffolding (in `99_templates/`)

The corpus focuses on two candidate problem statements: **neighborhood development discovery** (helping residents find and understand planning proposals) and **affordable housing compliance monitoring** (tracking whether publicly funded units stay affordable). It is grounded in publicly verifiable claims about Richmond, VA. It does not contain invented data, unverified program descriptions, or fabricated citations.

---

## Canonical Source of Truth

| Priority | File | What It Contains |
|----------|------|-----------------|
| 1 (highest) | `research/[SECTION][N]_*.md` | Primary research reports — authoritative content |
| 2 | `evidence_log.md` | Verified claims with official URLs |
| 3 | `03_artifacts/` | Synthesized artifacts (user journeys, prototype recommendations) |
| 4 | `02_data/` | Data inventory and source catalog |
| 5 (lowest) | Index and manifest files | Navigation aids — not authoritative for claims |

**Rule:** Navigation aids (README, index.json, manifest.json, CORPUS_GUIDE.md) reduce search scope. They are not substitutes for reading original reports. Before making substantive claims, read the source report.

---

## How the Corpus Is Organized

### Top-Level Directories

```
research/         ← 51 deep research files (the core corpus)
03_artifacts/     ← synthesized artifacts (user journeys, feasibility, benchmarks)
02_data/          ← data source inventory and index
04_build_guides/  ← MVP shapes, architectures, demo advice
00_core/          ← pillar overview and MAP alignment
01_problem_space/ ← problem statements (scored)
skills/           ← agent skill definitions
99_templates/     ← team and project templates
evidence_log.md   ← verified claims tracker
```

### Research Section Structure

The `research/` directory is organized into labeled sections:

| Section | Topic | Files |
|---------|-------|-------|
| `00–01` | Context & Framing | 2 files |
| `90–93` | Cross-Cutting Analysis | 4 files |
| `A` | Problem Landscape | A1–A5 |
| `B` | Users & Stakeholders | B1–B5 |
| `C` | Services & Programs | C1–C5 |
| `D` | Data Sources | D1–D5 |
| `E` | Prior Art & Benchmarks | E1–E5 |
| `F` | Opportunities | F1–F5 |
| `G` | Risks & Guardrails | G1–G5 |
| `H` | MVP Feasibility | H1–H5 |
| `I` | Demo Guidance | I1–I5 |

---

## How to Navigate the Corpus

### Start With Navigation Artifacts (Always)

**Before reading any research report, use navigation files to narrow scope:**

1. **`manifest.json`** (root) — machine-readable index of all significant files with summaries and tags
2. **`research/index.json`** — structured metadata for all 51 research files (id, section, title, summary, key_terms)
3. **`research/INDEX.md`** — human-readable table of contents for the research directory
4. **`README.md`** (root) — decision phases and overall repo map

### Navigation Decision Tree

```
User question received
        ↓
Is it about the hackathon process?
  YES → README.md, QUICKSTART.md, 04_build_guides/
  NO ↓
Is it about a specific problem domain?
  Development discovery → research/A2, A3, B1, C1, D1, D2, F2, H2
  Housing compliance → research/A1, A3, B2, C3, D3, D4, F3, H3
  Both → read 00_pillar_summary_context first
        ↓
Narrow to section using research/index.json
        ↓
Read original .md files for claims
        ↓
Verify against evidence_log.md if needed
```

### Question-to-Section Mapping

| User Question Type | Start Here |
|-------------------|-----------|
| What problems exist? | `A` section (A1–A5) |
| Who are the users? | `B` section (B1–B5) |
| What services exist already? | `C` section (C1–C5) |
| What data is available? | `D` section (D1–D5), `02_data/` |
| What has been built elsewhere? | `E` section (E1–E5) |
| What should we build? | `F` section (F1–F5) |
| What could go wrong? | `G` section (G1–G5) |
| Is this feasible in a weekend? | `H` section (H1–H5) |
| How do we demo this? | `I` section (I1–I5) |
| What datasets are mentioned? | `D1`, `D2`, `D3`, `02_data/source_inventory.csv` |
| What is the executive summary? | `research/00_pillar_summary_context.md` |
| What are the top risks? | `research/92_red_flags.md`, `G` section |

---

## How to Use the Metadata Files

### `research/index.json`

A JSON array with one entry per research file. Each entry has:
- `id` — file basename (e.g., `A1_problem_landscape_housing_compliance`)
- `section` — section label (e.g., `A`, `B`, `cross-cutting`)
- `title` — display title
- `summary` — 1–2 sentence grounded summary
- `key_terms` — 6 relevant terms for keyword search

**Use it to:** find which files are relevant before reading them. Do not answer questions from summaries alone — read the source `.md` file.

### `manifest.json`

A comprehensive machine-readable index of all significant files in the repository. Each entry includes:
- `id`, `path`, `type`, `title`, `summary`
- `pillar`, `tags`, `recommended_audience`
- `read_after` — what to read first
- `source_of_truth` — whether this file is authoritative

**Use it to:** build a retrieval index, understand the full scope of the corpus, or identify which file type to use for a given purpose.

### `evidence_log.md`

A table of verified and unverified claims with official source URLs, access dates, and verification status. Status values: `Confirmed`, `Likely`, `Unverified`.

**Use it to:** check whether a specific factual claim has been verified. Do not invent claims that are not in this log.

---

## How AI Agents Should Use This Corpus

### Required Behavior

1. **Always read navigation artifacts before raw reports.** Start with `research/index.json` or `manifest.json` to identify relevant files. Do not dive into arbitrary `.md` files without knowing their scope.

2. **Read original reports before making substantive claims.** The summaries in index files are useful for navigation, not for citation. If a question requires a specific fact, find it in the source `.md` file.

3. **Scope before answering.** Identify the relevant section(s) first. A question about Legistar data belongs to sections `D` and `C1`. A question about demo strategy belongs to section `I`.

4. **Acknowledge when files have not been read.** If a report appears relevant but has not been read in the current context, say so rather than guessing from summaries.

5. **Cite the source file.** When presenting findings, reference the file they came from (e.g., "Per `research/A1_problem_landscape_housing_compliance.md`...").

6. **Distinguish navigation files from source-of-truth files.** `manifest.json`, `README.md`, `research/INDEX.md`, and `index.json` are navigation aids. They are not authoritative for factual claims.

7. **Mark uncertainty explicitly.** If a claim cannot be verified from the files that have been read, use: `[Unverified]` or `[Requires reading: filename]`.

### How to Answer Cross-Report Questions

When a question requires synthesis across multiple reports:
1. Use `research/index.json` to identify all potentially relevant files
2. Read the summaries, then decide which reports need full reading
3. Read the source files
4. Synthesize from source content, citing each report separately
5. Note any tensions or contradictions between reports
6. Do not blend claims from different sections without acknowledging the synthesis

### When to Read Additional Files

You MUST read additional files before answering if:
- The question involves a specific dataset or data format → read D section
- The question involves a specific user persona → read B section
- The question requires a factual claim about Richmond programs → check `evidence_log.md`
- The answer requires citing prior art → read E section
- The question is about risk or guardrails → read G section

---

## What This Corpus Does NOT Contain

- Legal advice or eligibility determinations
- Official City positions or policy commitments
- Private business data, tenant information, or PII
- Authoritative regulatory guidance on housing compliance
- Verified program availability (programs change; always encourage users to verify)
- Official permit or zoning status determinations

When information is absent, say: "This repository does not contain that information."

---

## Recommended Reading Order for Common Scenarios

### New team at hackathon start
1. `README.md` → `QUICKSTART.md` → `00_core/00_pillar_overview.md`
2. `01_problem_space/02_targeted_problem_statements.md`
3. `research/00_pillar_summary_context.md` (executive brief)
4. `04_build_guides/01_mvp_shapes.md`

### Team choosing between Development Discovery and Housing Compliance
1. `research/A3_problem_landscape_compare_statements.md`
2. `research/A1_problem_landscape_housing_compliance.md`
3. `research/A2_problem_landscape_development_transparency.md`
4. `research/F1_opportunities_ranked.md`
5. `research/H1_mvp_48hr_framework.md`

### Team deep-diving on data availability
1. `02_data/source_inventory.csv` and `02_data/00_index.md`
2. `research/D1_data_legistar.md`
3. `research/D2_data_gis_development.md`
4. `research/D3_data_housing_programs.md`
5. `evidence_log.md`

### Team building the development tracker MVP
1. `research/F2_opportunities_development_notify.md`
2. `research/H2_mvp_development_tracker.md`
3. `research/D1_data_legistar.md`
4. `research/D2_data_gis_development.md`
5. `research/I2_demo_development_tracker_pitch.md`

### Team building the compliance dashboard MVP
1. `research/F3_opportunities_compliance_monitor.md`
2. `research/H3_mvp_compliance_dashboard.md`
3. `research/D3_data_housing_programs.md`
4. `research/D4_data_hud_rental.md`
5. `research/I3_demo_compliance_dashboard_pitch.md`

### Agent answering research questions
1. `research/index.json` → identify relevant section
2. Section table in `research/INDEX.md` → narrow to specific files
3. Source `.md` files → read for claims
4. `evidence_log.md` → verify specific facts

---

## File Naming Conventions

Research files follow the pattern: `[SECTION][NUMBER]_[TOPIC_SLUG].md`

Examples:
- `A1_problem_landscape_housing_compliance.md` — Section A, file 1, topic: housing compliance
- `G5_risks_guardrails.md` — Section G, file 5, topic: guardrails
- `90_top_10_research_questions.md` — Cross-cutting file 90

Sections run A through I. Numbers within sections run 1–5. Cross-cutting files use 90–93. Context files use 00–01.

---

## See Also

- `AGENTS.md` — Hackbot agent specification and research corpus navigation instructions
- `MAINTENANCE.md` — How to add, update, and synchronize reports and metadata
- `manifest.json` — Machine-readable index of all significant files
- `research/index.json` — Machine-readable index of all research reports
- `research/INDEX.md` — Human-readable table of contents
