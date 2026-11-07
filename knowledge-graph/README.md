# Knowledge Graph and Evidence Explorer

An evidence-backed knowledge graph of the **Thriving Neighborhoods** pillar research
corpus, with an interactive explorer for tracing claims, sources, gaps, and the
organizations behind them.

## Where the graph comes from

Extraction is deterministic and reads two files in this repository:

- `admin/evidence_log.md` — claims, documented gaps, and risks
- `data/source_inventory.csv` — inventoried data sources

Claims become Evidence nodes, gaps become ResearchQuestion nodes, risks become
Risk nodes, and inventoried sources become Dataset nodes. Publishers named in
the corpus become Organization nodes, and a claim is linked to a source only
when the two share a URL, when the claim names the source, or when both cite
the same distinctive domain — every edge traces back to a literal match you can
check by reading the rows.

## No funding layer

This pillar's corpus contains no financial dataset, so the graph has no funding
layer and the money-based views (Overview, Money Flow, Timeline, Needs vs
Money) are hidden rather than shown empty. Only the Built Environment pillar
has a capital-projects export.

## Running it

```bash
cd knowledge-graph
npm install
npm run dev      # http://localhost:5173
```

Other targets: `npm run validate` (schema and referential integrity),
`npm test`, `npx vite build`. The generated `data/` is committed, so the app
runs without re-extraction; `node scripts/extract.js` regenerates it.

## Curated records

`extraction/records/*.json` are empty here. They hold hand-authored entities
and relationships with excerpt-level provenance, verified against source files
at build time. Populating them is how this graph gets richer — never copy
another pillar's records.
