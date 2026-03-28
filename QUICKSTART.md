> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](docs/methodology.md) for details.

# Quickstart

## Fastest path for teams
1. Read `00_core/00_pillar_overview.md`
2. Read `01_problem_space/02_targeted_problem_statements.md`
3. Read `02_data/00_index.md`
4. Pick one user and one problem
5. Read `04_build_guides/01_mvp_shapes.md`
6. Create your project brief using `99_templates/project_one_pager_template.md`

## Questions to answer before building
- Who is the user (resident, housing staff, planning staff, nonprofit)?
- What problem are they facing?
- What data or documents are you using?
- What can actually be built in a weekend?
- How will a judge understand the value in under 60–90 seconds?

## High-probability project types
- neighborhood development notifier or tracker (Legistar + GIS)
- Legistar plain-language translator for planning documents and council agendas
- affordable housing investment tracker or compliance dashboard
- development proposal map or explorer tied to address lookup
- neighborhood change visualizer using parcel and permit data

## Strongest starting point
**Neighborhood Development Notifier / Legistar plain-language tool** — Rubric score 26/32 (Strong). Clear user (Richmond resident). Public data exists (Legistar, Richmond GeoHub). Weekend-buildable. No confidential data required.

## Data first
Before picking a feature set, check `02_data/00_index.md`. If the dataset you need is not listed as verified-accessible, do not build that feature.

## What to avoid
- Tools that require confidential housing contract data
- Systems that tell users whether a project will be approved or denied
- Platforms implying official City endorsement
- Features that depend on resident or tenant PII
