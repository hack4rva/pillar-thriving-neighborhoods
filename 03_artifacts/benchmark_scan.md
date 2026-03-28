> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Benchmark Scan — Thriving Neighborhoods

National and civic comparables for development transparency and housing accountability tools.

Note: All entries are [Unverified] unless marked otherwise. Verify links and project status before citing in a demo.

---

## Development Tracking and Notification Tools

### Councilmatic (mySociety / Open City Chicago)
- What it does: Translates legislative records (Chicago City Council) into a searchable, human-readable web interface. Shows bills, voting records, and development-related items organized by type and location.
- Relevance: Closest pattern to a Legistar plain-language translator. Chicago's version is open source and has been adapted for other cities.
- Pattern to borrow: Plain-language bill summaries, neighborhood filtering, notification subscriptions.
- [Unverified] URL: https://chicago.councilmatic.org (confirm if active)

### Lookout SF (SPUR / San Francisco)
- What it does: Notifications for development proposals and planning activity in San Francisco, organized by neighborhood and project type.
- Relevance: Direct model for a neighborhood development notifier. Allows address-based or neighborhood-based subscription to planning activity.
- Pattern to borrow: Address-based lookup + comment deadline alerts.
- [Unverified] Status and current URL not confirmed.

### OpenPlans
- What it does: Civic technology organization focused on street design, transit, and land use. Has built public engagement tools for planning processes.
- Relevance: Track record of translating complex planning documents for public audiences.
- URL: https://openplans.org

### Civic Insight (formerly Civic Apps)
- What it does: Visualizes building permits, code enforcement, and development activity data sourced from city open data portals.
- Relevance: Pattern for permit-based neighborhood change visualization.
- Note: Company acquired; check current availability.

---

## Housing Compliance and Transparency Tools

### NLIHC National Housing Preservation Database
- What it does: Tracks federally subsidized affordable housing, including affordability expiration dates, unit counts, and property details.
- Relevance: Model for an affordable housing portfolio tracker. Aggregates multiple federal data sources into a searchable, mappable interface.
- URL: https://preservationdatabase.org (confirmed public)
- Pattern to borrow: Expiration date tracking, map view of portfolio, linkage to original program data.

### HUD Housing Choice Voucher and Public Housing Data
- What it does: HUD publishes a range of datasets on federally subsidized housing, including property inventory and program performance.
- Relevance: Publicly available data that could anchor a Richmond-specific housing investment dashboard.
- URL: https://www.huduser.gov/portal/datasets/

### California Housing Portal (CalHFA / State)
- What it does: Maps affordable housing production and tracks project status in California.
- Relevance: Model for a public-facing housing investment dashboard.
- Pattern to borrow: Portfolio map + affordability status + program type filters.

---

## Legistar-Based Tools

### Legistar Web API (Granicus)
- What it does: Granicus (the company behind Legistar) provides a documented REST API for accessing Legistar records including matters, meetings, agendas, and attachments.
- Relevance: This is the primary access path for building a neighborhood development notifier or Legistar translator in Richmond. The API returns JSON.
- URL: https://webapi.legistar.com/help (confirm Richmond's endpoint)
- Note: Richmond must be using Legistar and have the API enabled. Confirm endpoint before building.

### Councilmatic (Open Source)
- What it does: Open-source framework for building legislative record websites on top of Legistar data.
- Relevance: Could be used as a base for a Richmond-specific neighborhood development tool.
- URL: https://github.com/datamade/django-councilmatic

---

## Civic Tech Patterns That Apply Here

| Pattern | Relevance | Example |
|---|---|---|
| Plain-language agenda translation | High — Legistar translator | Councilmatic, mySociety |
| Address-based project lookup | High — development notifier | Lookout SF |
| Expiration date tracking | High — housing compliance | NLIHC Preservation Database |
| Portfolio map with status | High — housing dashboard | CalHFA portal |
| Before/after neighborhood change | Medium — neighborhood change visualizer | Civic Insight |
| Public comment deadline alerts | Medium — engagement tool | Various city apps |

---

## What has failed or been abandoned

- Tools that required real-time City data integration: typically fail because City systems do not have public APIs
- Comprehensive "everything in one app" approaches: scope too broad for volunteer or civic tech resources
- Tools that made eligibility or approval predictions: caused confusion and distrust when they were wrong
- Projects without a named City partner: often built but never adopted

## Weekend-viable from this scan

Most buildable in 48 hours:
1. Legistar API wrapper with address geocoding and plain-language summaries (Concept A + B)
2. Static or seeded portfolio tracker using HUD and Legistar data (Concept C + E)
3. Map using Richmond GeoHub + curated Legistar data (Concept D)
