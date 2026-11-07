> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# User Journey Maps — Thriving Neighborhoods

Note: Journeys include observations from the working session and likely scenarios. Each friction point should reference an `evidence_log.md` entry when verified.

---

## Journey 1 — Resident who discovers a development proposal was approved near their home

### User goal
Understand what is being built near their home, whether they missed a chance to comment, and how to participate in the future.

### Background
A Richmond resident learns from a neighbor that a new development project was approved down the street. She had no idea it was being considered.

### Steps taken
1. Calls the City's main information line; gets transferred twice before reaching Planning.
2. Learns the project had a Planning Commission hearing four months ago and City Council approved it last month.
3. Asks how she could have known about it sooner; told that notices were mailed to properties within 300 feet and the agenda was posted on Legistar.
4. Tries to find similar upcoming proposals on Legistar; finds it difficult to navigate without knowing what to search for.
5. Eventually finds a list of upcoming Planning Commission cases but cannot determine which ones are near her home or what they involve without reading individual staff reports.
6. Gives up and waits to hear from a neighbor next time.

### Systems/pages touched
- City phone system
- City Planning Department website
- Legistar (Richmond City Council records)
- Planning Commission meeting agendas and case list

### Friction points
- Discovery is reactive; residents must already know to look
- Legistar navigation requires familiarity with planning terminology
- No location-based or address-based search for pending cases
- Staff reports are PDF attachments with technical language
- Comment periods close before most residents become aware
- Notifications rely on proximity mailings that may miss impacted residents

### User questions by step
- How do I find out about projects happening near my address?
- Is there anything I can still do, or is it too late?
- Where do I look in the future to not miss something like this?
- What does "special use permit" mean and how is it different from a rezoning?

### Prototype opportunities
- Address-based search for pending and recent Legistar development cases
- Plain-language summaries of Planning Commission staff reports
- Map view of active development proposals by neighborhood
- Comment deadline reminder or alert subscription
- Glossary of planning terms embedded in proposal summaries

---

## Journey 2 — City housing staff manually tracking affordable housing compliance across 15+ funded developments

### User goal
Verify that developers receiving City housing grants, loans, or other incentives are honoring their affordability commitments — rent limits, unit set-asides, and reporting requirements.

### Background
A City housing staff member is responsible for monitoring a portfolio of developments that received public funding. She must verify that rent levels, income restrictions, and loan repayment terms are being honored.

### Steps taken
1. Opens a shared spreadsheet with 17 funded developments and manually updates each row based on developer self-reports.
2. Cross-references developer-reported rents against HUD Fair Market Rents to estimate whether units remain affordable.
3. Checks Legistar for the original funding ordinance to confirm what affordability terms were approved.
4. Searches rental listing sites manually for active listings at a few properties to compare advertised rents.
5. Notes discrepancies but lacks a systematic way to flag and track them over time.
6. Prepares a quarterly status memo by pulling data from the spreadsheet and writing narrative summaries for each property.
7. Spends roughly 3–4 hours per property per quarter on this process.

### Systems/pages touched
- Internal Excel/Google Sheets tracker
- Legistar (to retrieve original funding ordinances)
- HUD Fair Market Rent tables (downloaded manually)
- Rental listing sites (Zillow, Apartments.com — informal spot-checking)
- Email correspondence with developers for self-reports

### Friction points
- No centralized system; data spread across spreadsheet, Legistar, email
- Developer self-reports are the primary source; hard to independently verify
- Manual cross-referencing of rents against HUD FMR tables is time-consuming
- No systematic alert when a property's affordability period is nearing expiration
- Scraping rental listing sites for monitoring is informal and unreliable
- Reporting format is custom per memo; not reusable across properties

### User questions by step
- Which properties have affordability periods expiring in the next 12 months?
- Which properties have rents that may be drifting above their commitment levels?
- Where is the original funding agreement or ordinance for this property?
- How do I quickly compare this property's current rents to HUD FMR?
- How can I present this data in a format useful to leadership?

### Prototype opportunities
- Affordable housing portfolio tracker with expiration date alerts
- Legistar ordinance lookup linked to funded development records
- HUD FMR comparison tool: enter committed rent and unit size, compare to current FMR
- Compliance status dashboard showing which properties are flagged for follow-up
- Document consolidation view: link Legistar records, HUD data, and manual notes for each property
