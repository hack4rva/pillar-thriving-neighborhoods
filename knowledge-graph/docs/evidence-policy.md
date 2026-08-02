> **Note:** This document was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Evidence Policy

Every material node, edge, and financial flow carries an `evidenceStatus`. This
document is the assignment policy; [ontology.md](ontology.md) defines the types the
statuses attach to.

## Classifications

| Status | Assigned when | Current count (elements) |
|--------|---------------|--------------------------|
| `documented` | The claim is stated in a repository source file; provenance excerpt verified at build time | 755 |
| `externally_verified` | Confirmed against an official external source: either an `admin/evidence_log.md` entry with Confirmed status, or an external-research record with an official government URL (`extraction/records/external.json`, ev:W-\*) | 29 |
| `proposed` | A solution pattern, plan, or idea — something someone suggests should exist (hackathon MVP patterns, Richmond 300 goals) | 16 |
| `reported_but_unverified` | A source repeats a claim it did not originate and no official confirmation exists (e.g. Fall Line Trail cost/raised figures from the project organization and news) | 25 |
| `inferred` | A reasonable inference stated nowhere; the inference reasoning is written into the record's note (e.g. ARPA's federal origin; Southside Community Center serving Southside residents) | 5 |
| `hypothetical` | A scenario used for illustration only | 0 in the live graph (exercised in test fixtures) |
| `disputed` | Sources conflict, or a source's relevance is contested (the D3 Harvard-report anomaly) | 5 |
| `unknown` | Explicit unknowns — `UnknownEntity` endpoints and flows whose facts neither the corpus nor external research states | 8 |

External research (2026-08-01) upgraded several records: the street-sweeping pause
and neighborhood-calendar claims are now `externally_verified` against rva.gov, and
the ARPA community-center allocations carry externally verified amounts. Official
government sources (rva.gov, transportation.gov) earn `externally_verified`;
organization/news figures stay `reported_but_unverified`. URL provenance cannot be
file-verified at build time and is counted separately as `external` in the
provenance-verification report.

Assignment rules of thumb:

- Default is **never** `documented`; a record starts unclassified and earns
  `documented` only by passing provenance verification.
- When in doubt between `inferred` and `documented`, choose `inferred` and write the
  reasoning down.
- Nothing is deleted for being uncertain: uncertain records are either downgraded in
  status or routed to `data/review_queue.json` for a human.

## Visual encoding (not color-only)

Evidence status is encoded redundantly so it survives color-blindness and grayscale:

- **Line style**: solid = documented/externally_verified; dashed = proposed;
  dotted = inferred/hypothetical; long-dash = reported_but_unverified.
- **Badges**: every panel and table row shows the status as a text badge.
- **Opacity**: unverified statuses render at reduced opacity.
- **Warning marker**: disputed elements get a warning border/badge in panels and an
  entry in the Review Queue tab.
- Node **shape and icon** encode entity type (money = cube, problem = octahedron, …),
  so type and evidence are never conflated.

## Confidence vs. evidence status

`confidence` (high/medium/low) is the extractor's judgment about *extraction quality*
(was the sentence ambiguous?), orthogonal to `evidenceStatus`, which is about the
*claim's* epistemic standing. A clearly-written proposal is `proposed` + `high`.
