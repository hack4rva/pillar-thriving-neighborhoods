# Prior Art Research — Neighborhood Development Discovery

**Pillar:** Thriving Neighborhoods
**Problem Statement:** Make it easier for residents to find and understand development proposals near them so they can engage earlier in the planning process.
**Applies to:** RVA Plotlines, RVA Development Tracker, SIMBY
**Research Date:** April 1, 2026
**Method:** Synthesis of existing pillar research corpus (`pillar-repos/pillar-thriving-neighborhoods/research/`)

**Primary sources from existing corpus:**
- `E1_prior_art_dev_trackers.md` — Comparable development tracker tools nationally
- `E2_prior_art_legistar_tools.md` — Legistar-powered civic tools and the Councilmatic ecosystem
- `E4_prior_art_failures.md` — Why civic tech notification platforms stall and die
- `E5_prior_art_weekend_viable.md` — Weekend-build patterns that ship and survive
- `C1_services_legistar_landscape.md` — Richmond Legistar landscape and record types
- `C2_services_planning_process.md` — *Off-topic: covers military C2 services planning, not Richmond's planning process; not referenced below*
- `D1_data_legistar.md` — Legistar API access, endpoints, pagination, and data quality
- `D2_data_gis_development.md` — Richmond GeoHub layers, ArcGIS REST API, and Development Tracker

---

## 1. Comparable Tools Nationally

### Map-First Development Trackers

**NYC ZoLa + ZAP (New York City Planning)**
The most mature civic development tracker ecosystem in the US. ZoLa is an open-source Ember.js map application using MapboxGL layers to visualize zoning, land use, and development proposals across New York City. ZAP (Zoning Application Portal) exposes ~30,000 land use projects dating back to the late 1970s and links directly to ZoLa for geographic context, BISWeb for building permits, and ACRIS for property records. NYC Planning Labs found that **search is ZoLa's most used function**, leading them to build a custom geocoding stack (NYC GeoSearch) on the open-source Pelias engine using authoritative Property Address Directory data (`E1_prior_art_dev_trackers.md`).

**Boston Article 80 Development Projects**
Boston's planning department publishes a per-project timeline for development proposals filed since 2016, including milestones, documents, event dates, and embedded public comment forms. The underlying dataset is published openly under PDDL. The timeline-driven design makes the multi-step approval process legible to residents without requiring planning literacy (`E1_prior_art_dev_trackers.md`).

**2nd City Zoning (Chicago, Open City / DataMade)**
A static interactive map that answers "How is my building zoned?" using pre-fetched, gzipped GeoJSON exported from Chicago's ArcGIS REST Services. Built with Jekyll, Bootstrap, and MapLibre-GL JS. Uses a SimCity-inspired color scheme. Zero-ops architecture (GitHub Pages hosting, annual data snapshots). Demonstrates that a static-first approach can ship in a weekend and run for years with minimal maintenance (`E5_prior_art_weekend_viable.md`).

**OpenCounter ZoningCheck (Commercial)**
A commercial SaaS product that integrates with Esri ArcGIS REST APIs to give applicants instant zoning clearance results. Demonstrates what planning staff value: reducing a 30-minute manual lookup to a 10-second self-service search (`E5_prior_art_weekend_viable.md`).

### Legislative Tracker Tools

**Councilmatic (DataMade, multiple cities)**
The most proven open-source framework for building legislative trackers on top of Legistar. Originally conceived at a hackathon in March 2011, it survived through the `django-councilmatic` core and a starter template. Powers production sites including LA Metro Board Reports, which syncs data from the Legistar API "several times an hour" using a Dockerized scraper pipeline and an API token. The starter template (`councilmatic-starter-template`) allows new cities to bootstrap in days (`E2_prior_art_legistar_tools.md`, `E5_prior_art_weekend_viable.md`).

**Open-Source Legistar Clients**
The primary maintained tool is `opencivicdata/python-legistar-scraper` (Python, Web API + scrape fallback, active issues in 2025). The older `fgregg/legistar-scrape` is deprecated. An R wrapper (`legistarapi`) and a lightweight Python-to-SQLite tool (`legisearch`) also exist. All require pagination handling for the 1,000-record API cap (`E2_prior_art_legistar_tools.md`).

### Notification Platforms

**Citygram (Code for America / Code for Charlotte)**
A geographic notification platform that delivers alerts (email, SMS, webhook) when events occur in a subscribed area. Received a $35,000 Knight Prototype Fund grant. Concept is strong but operational sustainability proved fatal — the core repository has 24 open issues spanning years without resolution, and local forks (BetaNYC) documented database end-of-life failures, duplicate/triplicate SMS delivery, and Heroku migration breakdowns (`E4_prior_art_failures.md`, `E1_prior_art_dev_trackers.md`).

---

## 2. Open-Source Tools and Vendor Solutions

### Reusable Open-Source Components

| Capability | Reuse Candidate | What It Provides | Maintenance Status |
|---|---|---|---|
| **Legislative ETL** | `python-legistar-scraper` | API-aware ingestion for Legistar data | Active (issues in 2025) |
| **Web App Framework** | `django-councilmatic` | Proven UX patterns for legislation browsing | Last release Feb 2023; usable for hackathon |
| **Starter Template** | `councilmatic-starter-template` | Bootstrap for new city deployments | Maintained by DataMade |
| **Map UI** | ZoLa front-end patterns (Ember.js, MapboxGL) | Modular map layers with cross-linking | Active (NYC Planning Labs) |
| **Geocoding** | Pelias (open-source engine) | Address-to-coordinate search | Active open-source project |
| **GIS Data Pipeline** | `pyesridump` / `esri2geojson` | ArcGIS REST to GeoJSON export | Active |
| **Static Map Hosting** | Jekyll + MapLibre-GL JS | Zero-ops interactive maps | Established pattern |

Sources: `E1_prior_art_dev_trackers.md`, `E2_prior_art_legistar_tools.md`, `E5_prior_art_weekend_viable.md`

### Vendor Platforms

| Vendor | Product | Relevance |
|---|---|---|
| **Granicus** | Legistar + InSite portal | Richmond's existing legislative management system; provides Web API |
| **Tyler Technologies** | EnerGov | Richmond's permit application system (no confirmed public API) |
| **Esri** | ArcGIS Online / GeoHub | Richmond's GIS infrastructure (REST API confirmed accessible) |
| **OpenCounter** | ZoningCheck | Commercial zoning lookup; demonstrates the staff time-savings pitch |

---

## 3. Richmond-Specific Prior Work

### Confirmed Data Systems and Access

**Legistar (Legislative Data)**
Richmond's Legistar instance is publicly readable without authentication using the client slug `richmondva`. The API base URL is `https://webapi.legistar.com/v1/richmondva/`. Development-related records are dispersed across multiple matter types: Ordinances (for rezonings and SUPs), Board of Zoning Appeals Cases, Applications for Certificates of Appropriateness, Tentative Subdivisions, and City Planning Commission Resolutions. There is no dedicated "development" or "rezoning" matter type — teams must filter by `MatterTypeName` and title keywords. Addresses are embedded in `MatterTitle` strings rather than stored in a dedicated field. Attachments (staff reports, location maps) are gated by a `MatterAttachmentShowOnInternetPage` visibility flag. The API is hard-capped at 1,000 results per query (`C1_services_legistar_landscape.md`, `D1_data_legistar.md`).

**GeoHub and ArcGIS (Geospatial Data)**
Richmond's GeoHub at `richmond-geo-hub-cor.hub.arcgis.com` exposes Feature Services for Parcels, Zoning Districts, Development Tracker, and Addresses via `services1.arcgis.com/k3vhq11XkBNeeOfM/`. The Development Tracker layer tracks projects valued over $1.5 million since 2016 with fields including Status, Project_Name, Developer_Name, Address, ParcelID, Dwelling_Units, and Date_Updated. Native spatial reference is StatePlane Virginia South (WKID 2284); web apps must request reprojection to WGS84 (4326). Parcels are paginated at a 2,000-record maximum. The Land Use Project Mapper is "being updated" with no published SLA (`D2_data_gis_development.md`).

**EnerGov (Permit Data)**
The Online Permit Portal handles building permits, plan reviews, and inspections. It has a known bug preventing searches for single-digit addresses. No confirmed public API. The system is designed for applicants, not residents asking "What is being built near me?" (`A4_problem_landscape_root_causes.md`).

### System Fragmentation — The Core Richmond Problem
Legislative agendas live in Legistar, permits live in EnerGov, and maps live in GIS — with no cross-linking to tie a neighborhood address to an upcoming Planning Commission vote. A resident cannot search an address and see case status, zoning impacts, and upcoming meeting dates in one place. This is the fundamental gap all three demos attempt to fill (`A4_problem_landscape_root_causes.md`).

---

## 4. Patterns That Work vs. Patterns That Fail

### What Works

| Pattern | Evidence | Why It Works |
|---|---|---|
| **Static-first data architecture** | 2nd City Zoning runs for years on pre-fetched GeoJSON and GitHub Pages hosting (`E5_prior_art_weekend_viable.md`) | Eliminates live API dependency during demos; near-zero operational cost |
| **Replicable templates** | Councilmatic powers instances in multiple cities from a shared core (`E2_prior_art_legistar_tools.md`) | Teams ship faster by forking rather than building from scratch |
| **Search as primary UX** | NYC Planning Labs found search is ZoLa's most-used feature (`E1_prior_art_dev_trackers.md`) | Residents start with "Where am I?" not "What committee handles this?" |
| **Per-project timelines** | Boston Article 80 displays milestones, documents, and comment windows (`E1_prior_art_dev_trackers.md`) | Makes opaque bureaucratic process legible to residents |
| **Named steward for continuity** | Councilmatic survived because DataMade maintained it; 2nd City Zoning because its data refresh is a documented script (`E5_prior_art_weekend_viable.md`) | Projects without an organizational owner die within months |

### What Fails

| Failure Pattern | Evidence | Root Cause |
|---|---|---|
| **Underfunded ops/hosting** | Code for America explicitly provides no hosting resources for brigade projects; Citygram suffered timeout errors and DB end-of-life (`E4_prior_art_failures.md`) | Volunteer hosting is not durable at scale |
| **Data pipeline breakage** | Citygram maintainers flagged "Publishers should be maintainable"; schema drift causes wrong/missed alerts (`E4_prior_art_failures.md`) | Upstream data changes break ETL silently |
| **UX reliability defects** | BetaNYC Citygram fork: duplicate texts, malformed digests, DB migration failures (`E4_prior_art_failures.md`) | Small delivery bugs destroy trust rapidly |
| **Missing admin value props** | Citygram feature requests for city logos and usage dashboards were never resolved (`E4_prior_art_failures.md`) | Without analytics, city staff can't justify maintaining the tool |
| **Fragmented forks with no owner** | Core Citygram (170 stars) vs. dead local forks (0 stars, 0 issues) (`E4_prior_art_failures.md`) | Fork enthusiasm without operational capacity equals abandonment |
| **Multi-agency data joins in a weekend** | AEMP Worst Evictors required months of volunteer labor to sanitize eviction data (`E5_prior_art_weekend_viable.md`) | Dirty cross-agency data kills hackathon demos |

---

## 5. Confirmed Available Data Sources for Richmond

| Data Source | Access Method | Confirmed Available | Key Limitation |
|---|---|---|---|
| **Legistar Matters** | REST API (`webapi.legistar.com/v1/richmondva/Matters`) | Yes — public, no auth required | 1,000-record pagination cap; no address field |
| **Legistar Attachments** | REST API (`/Matters/{id}/Attachments`) | Yes | Visibility gated by admin checkbox |
| **Legistar Bodies/Events** | REST API (`/Bodies`, `/Events`) | Yes | Publication latency up to 30 min for PDFs |
| **GeoHub Parcels** | ArcGIS REST (`/Parcels/FeatureServer/0`) | Yes | 2,000-record pagination; SR 2284 native |
| **Zoning Districts** | ArcGIS REST (`/ZoningDistricts/FeatureServer/0`) | Yes | Base zoning only; "current zoning" is a composite |
| **Development Tracker** | ArcGIS REST (`/Development_Tracker/FeatureServer/0`) | Yes | Projects >$1.5M only; "updated periodically" |
| **Addresses** | ArcGIS REST (`/Addresses/FeatureServer/0`) | Yes | Field schema not fully documented |
| **EnerGov Permits** | Web portal only (`rva.gov/planning-development-review/online-permit-portal`) | Partial — no confirmed API | Single-digit address bug; applicant-focused UX |
| **Richmond 300 / Code Refresh** | PDF documents on rva.gov | Yes — static documents | Not machine-readable |

Sources: `D1_data_legistar.md`, `D2_data_gis_development.md`, `C1_services_legistar_landscape.md`

---

## Synthesis: What This Means for the Three Demos

All three demos (RVA Plotlines, RVA Development Tracker, SIMBY) are building on a foundation with strong national precedent and confirmed Richmond data access. The critical patterns to watch:

1. **Data integration is the hard part.** The national tools that survive cross-link legislative data with map data and property records. Richmond's data lives in three unlinked silos. Teams that successfully bridge Legistar and GeoHub — geocoding addresses from `MatterTitle` fields and spatially joining with parcel boundaries — will produce the most valuable prototypes.

2. **Static snapshots beat live APIs for demos.** The weekend-viable pattern is clear: pre-fetch data, cache it locally, and build against the snapshot. Teams that depend on live API calls during demos risk pagination bugs, CORS issues, and publication latency.

3. **Notifications are a trap for hackathons.** Citygram's failure pattern is well-documented. Alert systems require robust data pipelines, reliable delivery infrastructure, and long-term hosting. Teams should demonstrate awareness of this pattern and scope alerts as a future feature, not a weekend deliverable.

4. **Search and timelines are the proven UX.** NYC and Boston demonstrate that address-based search and per-project timelines are the features residents actually use. Fancy map layers are secondary to "I searched my address and saw what's happening."
