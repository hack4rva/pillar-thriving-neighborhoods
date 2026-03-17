# repo_librarian

Purpose: Help users navigate repository knowledge quickly.

## When To Use
- The user asks "where is X?" or needs specific files.

## Inputs
- Natural language query from the user.

## Outputs
- List of relevant file paths with 1‑line descriptions.
- Pointers to next actions or related skills.

## Process
1) Search repo for filenames/paths and key phrases.
2) Return the smallest set of relevant artifacts first.
3) Offer to open/run a related skill if appropriate.

## Common queries for this pillar
- "Where is the data index?" → `02_data/00_index.md`
- "Where are the problem statements?" → `01_problem_space/02_targeted_problem_statements.md`
- "Where are the MVP shapes?" → `04_build_guides/01_mvp_shapes.md`
- "Where is the housing data analysis?" → `03_artifacts/housing_data_feasibility.md`
- "Where are the Legistar research prompts?" → `05_prompts/research/C1_services_legistar_landscape.txt`, `D1_data_legistar.txt`
- "Where is the demo advice?" → `04_build_guides/05_demo_advice.md`
