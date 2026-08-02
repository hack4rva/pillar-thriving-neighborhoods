> **Note:** This tool was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../../docs/methodology.md) for details.

# Architecture

## Rendering library decision

**Chosen renderer: [`3d-force-graph`](https://github.com/vasturiano/3d-force-graph) 1.80.0** (Three.js/WebGL with d3-force-3d physics).

Options evaluated:

| Option | Verdict |
|--------|---------|
| **3d-force-graph** (chosen) | Actively maintained (last release April 2026), MIT license, purpose-built for interactive 3D force-directed graphs. Ships directed-edge arrows, per-link width, directional particles (used for money-flow animation), full `nodeThreeObject`/`linkThreeObject` customization, orbit controls, and `zoomToFit`. Small API surface over Three.js. |
| Raw Three.js / WebGL | Maximum control but we would re-implement force layout, picking, camera fit, and link geometry — poor value for this dataset size. Three.js is still present underneath `3d-force-graph`, so we use it directly where needed (custom dashed-line materials, node geometries). |
| React Three Fiber | Adds a React dependency the app does not otherwise need; the UI is panels/tables driven by one small state store, which vanilla TypeScript handles with fewer moving parts. |
| D3 (2D) | Not 3D. Used anyway for what it is best at: the Sankey flow diagram (`d3-sankey`) and the 2D SVG fallback graph. |
| Babylon.js | General-purpose engine; no graph layer, heavier runtime, no advantage over Three.js here. |
| deck.gl / Cosmograph | GPU-fast but 2D-oriented (deck.gl's graph layers) or opinionated/closed layout (Cosmograph); weaker fit for orbiting a 3D force layout with custom per-node meshes. |

**WebGPU note:** `3d-force-graph` renders through Three.js WebGL. WebGPU is not exposed by this library. WebGL2 runs in every Chrome that would run WebGPU, so WebGL is the primary and only path; the stats box in the sidebar reports the active context (`WebGL2` in validation). If the library adopts Three.js WebGPURenderer later, the app code is unaffected.

## Pinned dependencies

Runtime: `3d-force-graph` 1.80.0, `three` 0.185.1, `three-spritetext` 1.10.0, `d3` 7.9.0, `d3-sankey` 0.12.3.
Dev/build: `vite` 8.2.0, `typescript` 7.0.2, `vitest` 4.1.10, `ajv` 8.20.0, `ajv-formats` 3.0.1, `csv-parse` 7.0.1, `playwright` 1.62.1, plus `@types/*` (see `package.json`, all exact versions, `package-lock.json` committed).

## Application structure

```
extraction/          Node-based pipeline (no LLM at runtime)
  parsers/           deterministic parsers for structured files
  records/           curated, provenance-verified extraction records for prose
  aliases.json       alias → canonical entity resolution
  metrics.js         data-quality metrics (shared by pipeline and tests)
scripts/
  extract.js         runs parsers + records → data/ and public/data/
  validate.js        Ajv schema validation + referential integrity + financial sanity
  screenshot.js      Playwright Chrome validation + screenshots
  smoke.js           quick headless load check
src/
  main.ts            boot + event wiring
  data.ts            dataset loading, indexes, graph algorithms (BFS paths, downstream financial traversal)
  state.ts           single AppState store with pub/sub; filters, selection, mode
  graph3d.ts         3d-force-graph view: custom node meshes, dashed links, highlights, camera
  graph2d.ts         d3-force SVG fallback mirroring the 3D semantics
  panels.ts          detail panel: node/edge/flow inspectors, Sankey, path view
  ui.ts              sidebar: filters, legend, force sliders, stats
  tables.ts          bottom drawer: summary, entities, flows, questions, quality, review
  modes.ts           Money Flow / Beneficiary / Problem-Space / Timeline / Fog of War logic
  needsboard.ts      Needs vs Money orphan board (HTML/SVG, replaces the 3D canvas in that mode)
  visual.ts          the visual language (shape/color/dash per type and evidence status)
data/                generated outputs (committed for reproducibility)
tests/               Vitest suites + fixtures/scenarios.json
docs/                this documentation + screenshots/
```

Data flows one way: repository corpus → `extract.js` → `data/*.json` (copied to `public/data/` for the app) → browser. The browser never re-derives facts; it only indexes, filters, and traverses what the pipeline produced.

## Performance strategy

The current graph is 296 nodes / 547 edges — well inside comfortable WebGL territory, validated at interactive frame rates in headless Chromium (SwiftShader, the slowest realistic case). For growth, the app includes:

- **Label culling**: sprite labels render only for highlighted/selected nodes or below a node-count threshold; past `LARGE_GRAPH_THRESHOLD` (combined nodes+links) a warning suggests filtering and labels are culled automatically.
- **Focus neighborhood**: any node can become the center of an N-hop subgraph, cutting rendered objects instead of the whole graph.
- **Cheap materials**: one geometry per node type, `MeshLambertMaterial`, no shadows; dashed links use `LineDashedMaterial` only for non-solid evidence statuses.
- **Reduced motion**: flow-particle animation is disabled when `prefers-reduced-motion` is set, and can be toggled off manually.
- Charge force `distanceMax` is capped so disconnected components do not repel to infinity (keeps `zoomToFit` framing useful).

Above ~10k nodes the honest next steps would be instanced meshes and a Web Worker layout; neither is needed for this corpus and both are noted here rather than speculatively built.

## Commands

`make install | extract | validate | test | dev | build | preview | screenshots` — thin wrappers over the npm scripts of the same names. `make build` runs extraction first so the served data always matches the corpus.
