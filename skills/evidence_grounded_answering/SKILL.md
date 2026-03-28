> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# evidence_grounded_answering

Purpose: Answer user questions using only content actually present in this repository corpus, with explicit grounding and uncertainty marking.

## When To Use
- Any time a factual claim about Richmond programs, data, or services is being made
- When a user asks: "Does X exist?" "Is Y available?" "What does the City do about Z?"
- When an agent is about to state something it cannot directly verify from files it has read
- Before asserting that a dataset, program, service, or policy exists

## Inputs
- User question
- Files read in current context
- Optional: `evidence_log.md` for verified claims

## Outputs
- Answer grounded in specific file content
- Inline citations for each substantive claim
- Explicit uncertainty markers for unverified statements
- "Not found" statements when information is absent

## Process

### Step 1 — Establish What Has Been Read

Before answering, state (internally or explicitly) which files have been read. Only make claims from those files. Do not interpolate from general knowledge.

### Step 2 — Classify Each Claim

For every substantive claim in your answer, classify it:

| Status | Meaning | Marker |
|--------|---------|--------|
| `Confirmed` | Present in a source file AND verified in `evidence_log.md` | No marker needed; cite source |
| `Stated in corpus` | Present in a research file but not independently verified | `(per [filename])` |
| `Uncertain` | Implied or summarized but not directly stated in a file read | `[Uncertain: implied by X but not stated directly]` |
| `Not found` | Not present in any file read | `[Not found in files read]` |
| `Requires reading` | Likely in a specific file that has not been read | `[Requires reading: filename]` |

### Step 3 — Check the Evidence Log

For claims about:
- Specific portal URLs and their capabilities (Legistar, GeoHub, HUD portals)
- Processing timelines or program deadlines (e.g., AHTF January 15 submission deadline)
- Data update cadences (e.g., GeoHub update frequency)
- Program availability (e.g., AHTF, AHTEP, EAHP)
- API availability (e.g., Legistar Web API client slug for Richmond)

Cross-check `evidence_log.md`. If the claim has an `E-` entry with `Confirmed` status, you can cite it with high confidence. If the claim is not in the log, mark it `[Stated in corpus: not independently verified]`.

### Step 4 — Formulate the Answer

Structure:
1. Direct answer to the question
2. Supporting evidence with citations
3. Explicit uncertainty statements
4. What is NOT covered (to set expectations)

### Step 5 — Apply the Anti-Fabrication Check

Before finalizing the answer, run this check:

- Does every named government program actually appear in a file I have read?
- Does every dataset I mentioned actually appear in D section files or `02_data/`?
- Does every URL I mentioned appear in `evidence_log.md` or a research file?
- Am I inventing specificity (exact percentages, exact dates) not present in the source?

If any check fails → remove or mark the claim as `[Unverified]`.

### Step 6 — State Scope Limits

At the end of the answer, state:
- What files were used to answer this question
- What topics the answer does NOT cover because relevant files were not read

## Required Language

When information is absent, use:
- "This repository does not contain that information."
- "I cannot verify that from the files I have read in this session."
- "That would require reading [specific file] which I have not yet loaded."
- "[Unverified]: this appears in a summary but I have not read the source file."

Do NOT use:
- "Likely..." (without a citation)
- "Generally..." (as a hedge for an ungrounded claim)
- "It is common for cities to..." (implies external knowledge not in corpus)
- "I believe..." (implies opinion substituting for evidence)

## Example

**Question:** "Is Legistar data available for Richmond's planning cases?"

**Grounded answer:**

Yes. Richmond's legislative data is hosted on a standard Granicus InSite portal at `richmondva.legistar.com`, which publishes Planning Commission and Board of Zoning Appeals records (per `research/D1_data_legistar.md`; partially confirmed in `evidence_log.md` entry E-003 — note E-003 status is Unverified, URL TBD). The Legistar Web API follows the pattern `https://webapi.legistar.com/v1/{Client}/` and queries are capped at 1,000 responses (per `research/D1_data_legistar.md`).

However, the exact API client slug for Richmond requires immediate testing during the hackathon's first hour — prior teams have encountered 404 errors for some endpoint configurations (per `research/00_pillar_summary_context.md`). `[Stated in corpus: not independently verified via evidence_log.md E-011]`

*Files read for this answer: research/D1_data_legistar.md, research/00_pillar_summary_context.md, evidence_log.md*
*Not covered: D2 (GeoHub geocoding for development cases), D5 (data quality issues)*

## Anti-Patterns

- Never state a City program exists without a source file citation
- Never quote a statistic (percentage, dollar amount, processing time) without a source
- Never say "Richmond has X dataset" based only on index.json summaries
- Never blend confirmed and uncertain claims in the same sentence without differentiation
- Never assert Legistar API availability without noting the client slug must be verified
