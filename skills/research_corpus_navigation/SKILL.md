# research_corpus_navigation

Purpose: Map a user question to the correct section and specific research reports in the Thriving Neighborhoods corpus before attempting to answer.

## When To Use
- A user asks any research question about Richmond's neighborhood development or housing accountability landscape
- A user asks about a specific problem domain (development transparency, housing compliance, resident engagement, data sources)
- A user asks what reports to read
- An agent needs to determine which files are relevant before answering

## Inputs
- User question or information need (natural language)

## Outputs
- Identified section(s) from the research corpus
- List of specific files to read (in recommended order)
- Brief explanation of why each file is relevant
- Any files that must be read before answering (prerequisites)

## Process

### Step 1 — Load Navigation Artifacts

Before looking at any research file, load:
1. `research/index.json` — scan all summaries and key_terms
2. If the corpus is unfamiliar: read `CORPUS_GUIDE.md` first

Do NOT skip this step and dive directly into research files.

### Step 2 — Classify the Question

Determine which category the user question falls into:

| Question Category | Relevant Sections |
|------------------|------------------|
| "What problems exist in this space?" | Section A (A1–A5) |
| "Who are the users or stakeholders?" | Section B (B1–B5) |
| "What services or programs exist?" | Section C (C1–C5) |
| "What public data is available?" | Section D (D1–D5), `02_data/` |
| "What has been built elsewhere?" | Section E (E1–E5) |
| "What should we build?" | Section F (F1–F5) |
| "What could go wrong?" | Section G (G1–G5) |
| "Is this feasible for a weekend?" | Section H (H1–H5) |
| "How should we demo this?" | Section I (I1–I5) |
| "What is the overall picture?" | `research/00_pillar_summary_context.md` |
| "What datasets or APIs are mentioned?" | D1, D2, D3, `02_data/source_inventory.csv` |
| "Development discovery specific" | A2, A3, B1, C1, D1, D2, F2, H2 |
| "Housing compliance specific" | A1, A3, B2, C3, D3, D4, F3, H3 |
| "Which problem should we choose?" | A3, F1, H1 |

### Step 3 — Search `research/index.json`

Scan the `key_terms` and `summary` fields for matches to the user's question. Identify:
- High-confidence matches (3+ matching key_terms)
- Medium-confidence matches (1–2 matching key_terms)
- Files worth reading despite no term match (based on section relevance)

### Step 4 — Build a Reading List

Order files by:
1. Direct relevance to the question
2. Section order (earlier sections provide context for later ones)
3. Files mentioned in `CORPUS_GUIDE.md` recommended reading orders

Limit the initial reading list to 5 files maximum. If more are needed after reading, say so.

### Step 5 — Identify Prerequisites

Some questions require reading prerequisite files:
- Any question requiring Richmond context → read `00_pillar_summary_context.md` first
- Any question about specific services → read C1 before C2–C5
- Any question about data → read D1 before D2–D5
- Any question requiring problem framing → read A1 or A2 before F or H sections
- Any question comparing the two problems → read A3 first

Flag prerequisites explicitly.

### Step 6 — Output the Navigation Result

Return:
```
Relevant section(s): [X, Y]
Files to read (in order):
  1. research/[FILE].md — [one-sentence reason why]
  2. research/[FILE].md — [one-sentence reason why]
  3. ...

Prerequisites (read these first if not yet read):
  - research/[FILE].md — [reason]

Files to skip (and why):
  - [Section] — not relevant because [reason]
```

### Step 7 — Confirm Scope Boundaries

After delivering the reading list, state:
- What sections were NOT included and why (to confirm you didn't miss something)
- Whether cross-report synthesis will be needed
- Whether any answer requires verified facts from `evidence_log.md`

## Example

**Question:** "What data can we use to build a development notification tool?"

**Navigation result:**
```
Relevant sections: D (Data Sources), F (Opportunities)

Files to read (in order):
  1. research/D1_data_legistar.md — primary source on Legistar API access and data structure
  2. research/D2_data_gis_development.md — GeoHub endpoints for geocoding development proposals
  3. research/F2_opportunities_development_notify.md — design spec for the notification tool
  4. 02_data/source_inventory.csv — verified data source list with access details

Prerequisites: research/00_pillar_summary_context.md (if Richmond context not yet loaded)

Files to skip: B, C, E, G, H, I — not directly relevant to data availability question

Verified facts to check: evidence_log.md (E-010 through E-012 cover Legistar and GeoHub availability)
```
