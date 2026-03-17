# Recommended Architectures — Thriving Neighborhoods

---

## Address Lookup + Map (Development Notifier / Proposal Explorer)
- Fetch Legistar development cases via API or curated JSON → geocode addresses using Richmond GeoHub parcel API → plot on a Leaflet or Mapbox map → display result cards with plain-language summaries and source links → official Legistar links for each case.
- Tech: lightweight web app (React/Vue/vanilla JS), JSON data layer seeded from Legistar, no backend required for demo if data is pre-fetched and static.
- Tip: pre-fetch and cache Legistar data as a static JSON file to avoid API rate limits and confirm demo reliability.

---

## LLM-Assisted Plain-Language Translator
- Fetch Legistar item text (API or manually extracted) → pass to LLM (OpenAI/Claude/Gemini) with a structured prompt → display plain-language summary alongside the original → link to official source.
- Tech: Node/Python backend to call LLM API, simple frontend to display side-by-side view.
- Tip: use a fixed template for summaries (what, where, who, when, how to comment) to ensure consistent output and easier quality review. Show the template structure to judges.

---

## Portfolio Dashboard (Staff Compliance Tool)
- Load seed data from a JSON or CSV file representing funded developments → display sortable/filterable table with expiration dates, commitment levels, and status flags → drill-down to property detail page → link to Legistar ordinance → HUD FMR comparison lookup from a pre-built table.
- Tech: simple static site or lightweight React app with a JSON data file. No backend required for demo.
- Tip: Build the UI around a realistic staff workflow, not just a data display. The value proposition is "saves time vs. a spreadsheet."

---

## Content-First Explainer Hub (Plain-Language Glossary / Guide)
- Source-backed glossary of planning and zoning terms relevant to Richmond residents → curated links to Legistar, Planning Commission, and comment submission pages → FAQ format driven by real resident questions from the working session.
- Tech: static site (Markdown-driven). No API dependencies.
- Tip: this shape is the most reliable to demo but has less technical wow-factor. Combine with one of the above for a stronger demo.
