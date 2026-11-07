# Post-Event Research Index — Thriving Neighborhoods

**Pillar:** Thriving Neighborhoods
**GitHub:** [hack4rva/pillar-thriving-neighborhoods](https://github.com/hack4rva/pillar-thriving-neighborhoods)
**Problem Statements:**
- PS1: Neighborhood Development Discovery — Help residents find and understand development proposals near them
- PS2: Affordable Housing Compliance Monitoring — Help City staff track whether publicly funded housing stays affordable

**For AI agents:** Read this file to locate any post-event research artifact. Do not list the directory.

---

## Shared Research (Cross-Demo, Per Problem Statement)

| Dir | JTBD | Pain Points | Prior Art |
|-----|:----:|:-----------:|:---------:|
| [`_shared-dev-discovery/`](_shared-dev-discovery/) | ✅ | ✅ | ✅ |
| [`_shared-housing-compliance/`](_shared-housing-compliance/) | ✅ | ✅ | ✅ |

These files synthesize the problem statement across all demos in that PS. Read them before reading any per-project file.

---

## Per-Project Research Inventory

| Project | Problem Statement | JTBD | Pain | Prior Art | Solution Ideas |
|---------|------------------|:----:|:----:|:---------:|:--------------:|
| [`affordable-housing-dashboard/`](affordable-housing-dashboard/) | PS2: Housing Compliance | ✅ | ✅ | — | — |
| [`hud-rent-cap-validator/`](hud-rent-cap-validator/) | PS2: Housing Compliance | ✅ | ✅ | — | — |
| [`participation-analytics-dashboard/`](participation-analytics-dashboard/) | PS1: Dev Discovery | ✅ | ✅ | — | — |
| [`renter-aware-notifications/`](renter-aware-notifications/) | PS2: Housing Compliance | ✅ | ✅ | — | — |
| [`rva-development-tracker/`](rva-development-tracker/) | PS1: Dev Discovery | ✅ | ✅ | — | — |
| [`rva-neighborhood-watch/`](rva-neighborhood-watch/) | PS1: Dev Discovery | ✅ | ✅ | — | — |
| [`rva-plotlines/`](rva-plotlines/) | PS1: Dev Discovery | ✅ | ✅ | — | — |
| [`rva-transformers/`](rva-transformers/) | Misaligned | ✅ | ✅ | — | — |
| [`simby/`](simby/) | PS1: Dev Discovery | ✅ | ✅ | — | — |

**Note:** `rva-transformers` was misaligned — 311 Bridge belongs in City Hall, Biz Navigator in Economy.

---

## Research Answers (`_research-answers/`)

Parallel AI queries that answered the JTBD open questions. Read `QUERY_MAP.md` to see which file answers which question.

| File | Problem Statement | Questions Answered |
|------|------------------|-------------------|
| [`QUERY_MAP.md`](_research-answers/QUERY_MAP.md) | Both | Full map of JTBD questions → query files |
| [`dd_q1_system_data.md`](_research-answers/dd_q1_system_data.md) | PS1 | Legistar API, GeoHub layers, EnerGov, rate limits |
| [`dd_q2_usage_equity.md`](_research-answers/dd_q2_usage_equity.md) | PS1 | Hearing demographics, digital divide, language, renters |
| [`dd_q3_prior_art.md`](_research-answers/dd_q3_prior_art.md) | PS1 | Cross-linking, civic associations, comparable tools |
| [`hc_q1_system_data.md`](_research-answers/hc_q1_system_data.md) | PS2 | EnerGov fields, Assessor API, HUD datasets, property counts |
| [`hc_q2_staffing_equity.md`](_research-answers/hc_q2_staffing_equity.md) | PS2 | Staff headcount, workflow, neighborhood impacts |
| [`hc_q3_prior_art.md`](_research-answers/hc_q3_prior_art.md) | PS2 | National tools, audit recommendations, Virginia Housing |

---

## Agent Reading Sequence

```
1. Read this file (INDEX.md) — orient
2. For PS1 context: _shared-dev-discovery/jtbd_analysis.md
3. For PS2 context: _shared-housing-compliance/jtbd_analysis.md
4. For a specific project: <project>/jtbd_analysis.md → <project>/pain_points.md
5. For answered research questions: _research-answers/QUERY_MAP.md → relevant query file
```
