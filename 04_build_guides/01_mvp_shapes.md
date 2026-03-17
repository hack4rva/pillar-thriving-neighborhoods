# MVP Shapes — Thriving Neighborhoods

---

## Shape A — Neighborhood Development Notifier
### Best for
Teams with API/data skills and a frontend developer.

### Inputs
- Legistar development cases (API or web scrape)
- Richmond GeoHub parcel/address data for geocoding
- Plain-language glossary of planning terms (team-created)

### Core user flow
1. User enters a Richmond address or selects a neighborhood
2. Tool returns nearby pending and recent development proposals
3. Each proposal shows: plain-language summary, proposal type, meeting date, comment deadline, link to Legistar

### Demo
Enter a Richmond address → see 3–5 nearby development cases with summaries, map pins, and comment deadlines.

### Scope limits
- Do not claim completeness; explicitly note data comes from Legistar and may not include all proposals
- Do not predict whether a proposal will be approved
- Do not collect user email or personal data for notifications unless using a very simple opt-in

---

## Shape B — Legistar Plain-Language Translator
### Best for
Teams interested in content design, LLM-assisted summarization, and civic communication.

### Inputs
- Legistar matter records and agenda items (API or manual extraction)
- Planning Commission staff report PDFs (sample set)
- Plain-language summary template (team-created)

### Core user flow
1. User pastes a Legistar URL or selects from a list of recent items
2. Tool generates a plain-language summary: what is proposed, where, who is affected, timeline, how to comment
3. Summary links back to the official Legistar record

### Demo
Side-by-side view: original Legistar item (or staff report excerpt) and plain-language summary. Show 3–4 different case types (rezoning, SUP, housing funding).

### Scope limits
- Clearly label summaries as "plain-language interpretation"
- Always link to the original official document
- Include a prominent disclaimer that the original official record controls
- Do not imply AI summaries are authoritative or comprehensive

---

## Shape C — Affordable Housing Compliance Monitor (Staff Tool)
### Best for
Teams with UX design skills and interest in staff workflow tools. Note: data-limited; scope carefully.

### Inputs
- Sample funded development records (extracted from Legistar housing ordinances or manually created for demo)
- HUD Fair Market Rent tables (current year)
- Simple status tracking fields (manually populated for demo)

### Core user flow
1. Staff member opens portfolio dashboard: list of funded developments with affordability terms and expiration dates
2. Filters to show properties expiring in the next 12 months or flagged for follow-up
3. Drills into a property to see: original Legistar ordinance link, committed rent levels, HUD FMR comparison, status notes
4. Marks property for follow-up or adds a note

### Demo
Show a staff portfolio view with 8–10 seeded developments. Filter to expiring-soon. Drill into one property. Show HUD FMR comparison. Mark for follow-up.

### Scope limits
- This is a staff-support tool, not an automated compliance engine
- Do not make compliance determinations (only surface information for staff review)
- Use demo/seeded data clearly labeled as synthetic
- Do not expose any real confidential housing agreement data

---

## Shape D — Development Proposal Map / Explorer
### Best for
Teams with GIS/mapping and frontend skills.

### Inputs
- Richmond GeoHub layers (parcel geometry, zoning)
- Legistar development cases with address data
- Case type classification (rezoning, SUP, variance, new construction)

### Core user flow
1. User opens a map of Richmond
2. Map shows development proposal pins color-coded by type and status
3. User clicks a pin: sees proposal type, address, hearing date, comment deadline, link to Legistar
4. User filters by neighborhood or case type

### Demo
Map of a Richmond neighborhood with 8–12 development proposal pins. Click on one. Filter by type. Show the link to official Legistar record.

### Scope limits
- Label data freshness prominently
- Do not claim the map is complete or official
- Link all pins to their Legistar source

---

## Shape E — Housing Investment Dashboard (Public Transparency)
### Best for
Teams with data research skills and interest in housing accountability.

### Inputs
- Legistar housing funding ordinances (manually extracted or small sample)
- HUD Affordable Housing Preservation database
- HUD Fair Market Rent tables
- NLIHC National Housing Preservation Database

### Core user flow
1. User opens a public-facing dashboard showing City-funded affordable housing properties
2. Each property shows: investment type, investment year, affordability requirement, expiration year, current status
3. Map view shows geographic distribution across Richmond neighborhoods
4. User can filter by investment type, expiration year, or neighborhood

### Demo
Map with 10–15 funded developments pinned. Click a pin for investment details. Filter to properties expiring before 2030. Show one property with HUD FMR comparison context.

### Scope limits
- Clearly label data source (Legistar + HUD; not a complete City inventory)
- Include last-updated date on all data
- Do not imply the dashboard is the official City housing investment record
