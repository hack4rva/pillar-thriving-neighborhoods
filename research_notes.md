> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](docs/methodology.md) for details.

# Research Notes — Thriving Neighborhoods

## Executive Brief

[Populate after running research prompts. Promote verified findings here from evidence_log.md.]

---

## Working Notes

### Problem landscape

Richmond faces two software-addressable transparency gaps in the Thriving Neighborhoods pillar. The stronger problem (rubric 26/32) is development discovery: residents cannot easily find or understand proposals affecting their neighborhoods before comment periods close. Development proposals are publicly posted in Legistar, but Legistar is designed for insiders, not general residents. Residents who do find Legistar must know what to search for, understand planning terminology, and identify which items are near their home.

The second problem (rubric 22/32, data-not-ready flag) is housing compliance monitoring: the City's affordable housing portfolio is growing and manual monitoring is resource-intensive. However, much of the relevant compliance data is either internal to the City or not publicly available in structured form. Teams choosing this problem must scope carefully to what is actually accessible from public sources.

[Unverified] Both problems were surfaced in a February 18, 2026 working session. Sharon Ebert (DCAO) attended and may be a potential champion.

### Key data findings

[Unverified] Legistar: Richmond uses the Legistar/Granicus platform. The Granicus Web API may be available (endpoint: webapi.legistar.com/{client}/). Confirm API access before building.

[Unverified] Richmond GeoHub: ArcGIS-based portal with planning-related layers including Land Use Project Mapper and Development Activity Mapper. REST API access is likely but must be confirmed and checked for data freshness.

Confirmed: HUD Fair Market Rents are publicly available, downloadable, and current for Richmond MSA. Useful baseline for housing affordability comparisons.

Confirmed: NLIHC National Housing Preservation Database covers federally subsidized properties in Richmond and is publicly accessible.

### Prior art summary

Councilmatic (Chicago/DataMade) is the closest national model for a Legistar-based development tracker. It is open source and has been adapted for other cities. The django-councilmatic repository is a potential starting point.

Lookout SF (San Francisco) is the closest model for an address-based development notification tool, though its current status is [Unverified].

The NLIHC National Housing Preservation Database is a model for the housing investment dashboard concept.

### Key uncertainties

1. Is Richmond's Legistar API enabled? (Must confirm before building)
2. Are GeoHub development layers current and accessible via REST? (Must confirm before building)
3. Is there a departmental champion willing to support continuation? (Sharon Ebert is a candidate)
4. How are development case addresses structured in Legistar? (Affects geocoding strategy)

---

## Research prompt outputs

[Run prompts in 05_prompts/research/ using the Perplexity runner. Save outputs to 05_prompts/research-output/. Summarize key findings here.]

### Completed prompts
- [ ] 00_pillar_summary_context
- [ ] 01_master_research_prompt
- [ ] A1–A5 (problem landscape)
- [ ] B1–B5 (users)
- [ ] C1–C5 (services)
- [ ] D1–D5 (data)
- [ ] E1–E5 (prior art)
- [ ] F1–F5 (opportunities)
- [ ] G1–G5 (risks)
- [ ] H1–H5 (MVP feasibility)
- [ ] I1–I5 (demo strategy)
- [ ] 90–93 (cross-cutting questions)
