# Ship Honest Value in 54 Hours: Scope Boundaries for Two Civic MVPs

## Executive Summary

Successfully delivering a civic-tech prototype during a weekend hackathon requires ruthless prioritization and a clear understanding of what *not* to build. Techstars Startup Weekends operate on a 54-hour timeline from Friday pitches to Sunday demos [1]. To survive this constraint, teams must adopt a "fixed time, variable scope" mindset [2]. 

This report defines the scope boundaries for two "Thriving Neighborhoods" Minimum Viable Products (MVPs): a Neighborhood Development Notifier and a Housing Compliance Tool. The core strategy relies on building a "walking skeleton"—a tiny, end-to-end implementation that links major architectural components early [3] [4]. 

Key strategic decisions for this weekend include:
* **Cut push and email notifications entirely:** Web push via Firebase requires HTTPS, service workers, and VAPID keys [5], while email triggers CAN-SPAM compliance obligations [6]. Both are high-risk time sinks.
* **Avoid claims of "exhaustive coverage" or "official" status:** City open data portals explicitly disclaim data completeness and accuracy [7] [8] [9]. Furthermore, civic volunteer projects must not misrepresent themselves as official government services [10].
* **Leverage official APIs for credibility:** Use the Socrata Open Data API (SODA) for building permits [11] and the official HUD API for Fair Market Rents (FMR) [12] [13] to provide immediate, verifiable value without complex backend data engineering.
* **Enforce the 90-minute rule:** Using the MoSCoW prioritization method [14], only add features that a developer can build, test, and demo in 90 minutes.

## Purpose and Constraints — Two MVPs that ship honest value in 54 hours

### Timebox realities — Sunday demo or it doesn’t exist

Hackathons like Techstars Startup Weekend are 54-hour events that culminate in Sunday night demos and presentations [1]. This rigid timebox means that any feature not fully integrated and stable by Sunday afternoon effectively does not exist. Teams often fail by attempting ambitious integrations late in the weekend, resulting in broken demos. Designing for a finished, stable demo by Sunday requires locking the timebox immediately and pre-committing to cutting scope when technical trade-offs inevitably arise.

### Guiding principles — Shape Up, YAGNI, MoSCoW, walking skeleton

To prevent feature creep, teams should rely on four established software development principles:
1. **Fixed time, variable scope:** Popularized by Basecamp's *Shape Up* methodology, this principle uses the deadline as a creative constraint, forcing teams to chisel the scope down to ensure quality [2].
2. **YAGNI (You Aren't Gonna Need It):** An Extreme Programming principle that emphasizes building only essential functionality and deferring speculative features [15] [16].
3. **MoSCoW Prioritization:** A matrix that categorizes requirements into Must have, Should have, Could have, and Won't have [14] [17].
4. **Walking Skeleton:** Coined by Alistair Cockburn, this is a tiny implementation of the system that performs a small end-to-end function, linking main architectural components so functionality can evolve safely [3] [4].

## MVP Shape A: Neighborhood Development Notifier — Thin slice on one permit feed

### Viable data sources — Socrata/SODA permits for a fast start

Public permit datasets are highly queryable and demo-friendly. Many municipalities use the Socrata Open Data API (SODA) to expose their data [11]. For example, San Francisco provides a comprehensive Building Permits dataset [18] [19], and NYC Open Data offers similar permit feeds [20]. By targeting a single, stable SODA endpoint, the team can bypass complex data scraping and focus entirely on the user experience.

### In-scope features (Required vs. Optional)

The goal is to deliver a browsable, filterable, and truthful view of neighborhood development without the overhead of automated alerts.

| Feature | Priority | Rationale |
| :--- | :--- | :--- |
| Single-city permit dataset (e.g., SF i98e-djp9) | Must | Stable open data via SODA [18] [11]; fast to query and filter. |
| Past-30-day filter & basic search | Must | Keeps the dataset small and improves the signal-to-noise ratio for the demo. |
| Neighborhood/ZIP filter + map/list toggle | Must | Core user need; trivial to implement with client-side filtering and Leaflet. |
| Record detail drawer | Must | Provides transparency by deep-linking to the authoritative city source page. |
| Manual refresh & "Last updated" timestamp | Must | Avoids cron jobs and backend scheduling; remains honest about data latency. |
| Data disclaimer & "not city-affiliated" notice | Must | Aligns with open-data disclaimers [7] [9] and non-endorsement norms [10]. |
| CSV export of current view | Should | Delivers simple, shareable value with zero backend complexity. |
| Saved filter presets (local storage) | Should | Fast UX win that requires no user authentication or database. |

*Takeaway:* Focus strictly on a read-only, client-side application that pulls from one reliable API. This guarantees a working demo.

### Out-of-scope and why

Alerts, multi-city federation, and claims of exhaustive coverage are high-risk time sinks that will derail a 48-hour build.

| Item | Reason to exclude (this weekend) |
| :--- | :--- |
| Push notifications | Firebase Cloud Messaging requires HTTPS, a `firebase-messaging-sw.js` service worker, and VAPID keys [5]. Too complex for a weekend. |
| Email subscriptions | Triggers CAN-SPAM Act compliance (unsubscribe links, accurate headers) [6] and requires mail infrastructure. |
| Exhaustive, citywide coverage | City portals explicitly state data is "as is" and do not warranty completeness or accuracy [7] [8] [9]. |
| Official City endorsement | Civic volunteer projects are not official government services; claiming otherwise is a misrepresentation [10]. |
| Multi-city aggregation | API heterogeneity and differing address standards make normalization impossible in 48 hours. |

*Takeaway:* Explicitly categorizing these as "Won't have" protects the team from mid-weekend scope creep and compliance risks.

### "By Sunday we will show" — Notifier template

Commit to one crisp, demoable story to align the team:

> "By Sunday we will show a working web app where a resident selects a neighborhood, sees building permits from the last 30 days on a map and list, filters by type (e.g., demolition/new construction), opens details that deep-link to the city source, and exports the filtered view to CSV. Data refresh is manual with visible timestamps. No alerts or emails; we will state this is not an official city service and data may be incomplete."

## MVP Shape B: Housing Compliance Tool — Portfolio + expirations + HUD FMR compare

### Viable reference data — HUD FMR API

To provide credible affordability checks without requiring access to privileged internal city databases, the MVP should leverage the official HUD Fair Market Rents (FMR) and Income Limits API [13]. This API allows developers to easily access and customize FMR data by entity or metro area [12] [13], instantly de-risking the core value proposition of the compliance tool.

### In-scope features (Required vs. Optional)

Keep the application offline-friendly and staff-centric, focusing on workflow improvements rather than complex automation.

| Feature | Priority | Rationale |
| :--- | :--- | :--- |
| Portfolio table (CSV upload or manual add) | Must | Requires no authentication or backend; allows fast list management for the demo. |
| Expiration tracking (30/60/90 day badges) | Must | Provides immediate staff value using simple date-math logic. |
| HUD FMR lookup by county/CBSA | Must | Establishes a credible baseline via the official HUD API [12] [13]. |
| Staff notes per property (local storage) | Must | Critical for workflow context; requires zero infrastructure to implement. |
| Basic analytics (count by status) | Should | Low-effort aggregates that provide high visual impact during the demo. |
| CSV export of portfolio with FMR flags | Should | Creates a shareable output without requiring external integrations. |

*Takeaway:* The core loop is simple: ingest data, compare it against a public baseline, allow annotations, and export the result.

### Out-of-scope and why

Avoid automation, privileged data access, and enforcement logic, which introduce legal and security risks.

| Item | Reason to exclude (this weekend) |
| :--- | :--- |
| Automated compliance findings/letters | Requires complex rules, legal authority, and perfectly accurate data. |
| Access to internal City databases | Blocked by credential requirements, data sharing agreements, and privacy concerns. |
| Developer penalty recommendations | Involves policy and legal judgments; carries high reputational risk. |
| User accounts / multi-tenant RBAC | Adds unnecessary authentication and database persistence complexity. |
| Integrations with case management | Fragile to build in 48 hours due to diverse and undocumented legacy APIs. |

*Takeaway:* The tool should act as a decision-support dashboard for staff, not an automated enforcement engine.

### "By Sunday we will show" — Compliance template

Commit to one crisp, demoable story to align the team:

> "By Sunday we will show a working tool where staff upload a CSV of properties with rents and expirations, instantly see which units exceed HUD Fair Market Rent for their county/CBSA, filter by expiration windows (30/60/90 days), add internal notes, and export a flagged CSV. We will not claim automated findings or access to internal City systems; recommendations and penalties are out of scope."

## Prioritization and Cutline — Decide Must/Should/Could/Won’t in minutes

### Decision framework for a 48-hour build

When a team member suggests a new feature on Saturday afternoon, use this strict gating framework to make a decision in under five minutes. Add only what strengthens the walking skeleton.

| Gate | Pass Criteria | Action if Failed |
| :--- | :--- | :--- |
| Is it critical to the walking skeleton? | Yes | Defer to "Could have" |
| Can it be built, tested, and demoed in 90 mins? | Yes | Defer to "Won't have" |
| Does it avoid new external accounts/keys? | Yes | Defer unless pre-provisioned |
| Does it work in an offline demo fallback? | Yes | Defer to "Won't have" |
| Does it require legal/compliance review? | No | Defer immediately |

*Takeaway:* If a feature takes more than 90 minutes or introduces external dependencies, it violates the YAGNI principle [15] and must be cut.

### MoSCoW mapping per MVP

Make trade-offs explicit and shared across the team using the MoSCoW method [14] [17].

| Priority Level | Neighborhood Notifier | Housing Compliance Tool |
| :--- | :--- | :--- |
| **Must Have** | Single dataset, map/list, filters, details, manual refresh, disclaimers | CSV upload, portfolio table, expirations, HUD FMR compare, notes, export |
| **Should Have** | CSV export, saved filters | Summary counts, simple charts |
| **Could Have** | Theming, basic trend chart (permits/week) | Tagging, preset views |
| **Won't Have** | Push/email, multi-city, "exhaustive coverage", official endorsement | Automated findings, internal City data, penalty recs, auth/RBAC |

*Takeaway:* "Won't have" features are explicitly recognized and dropped for the current timeline to manage stakeholder expectations [14].

## Demo Strategy and Risk Controls — Optimize for Sunday success

### Integration plan and fallbacks

Martin Fowler notes that a walking skeleton should consist of the entire MVP user journey, but with API integrations stubbed and data mocked to mitigate the risk of late integration [21]. 

* **Friday:** Verify API keys and queries. Fetch and cache a representative JSON sample for offline use.
* **Saturday AM:** Build the end-to-end skeleton using the cached data. Implement feature flags to switch between live API reads and the stubbed data [21].
* **Saturday PM:** Add "Should-have" features. Freeze scope entirely by 6:00 PM.
* **Sunday AM:** Polish the UX, finalize demo scripts, and record a 60–90 second screen capture as a backup in case the live demo fails.

### Failure modes and mitigations

Do not let infrastructure and compliance sink the weekend. Teams that attempt push notifications late often stall on HTTPS and service worker requirements [5]. Teams that attempt email notifications get bogged down in CAN-SPAM compliance [6]. Teams that over-scope data sources discover schema mismatches on Sunday morning. Mitigate these by strictly adhering to the "Won't have" lists and relying on cached JSON fallbacks.

## Disclaimers and Integrity — Be explicit about limits

Honesty increases credibility and survivability. Because open data portals explicitly state that data is provided without warranties of completeness or accuracy [7] [8] [9], your application must reflect this reality. 

Include the following template language prominently in both MVPs:
* "This is a volunteer prototype, not an official city service."
* "Data is provided 'as is' from public sources and may be incomplete, inaccurate, or delayed."
* "No alerts or emails are sent in this demo."

## Implementation Checklist — What to do, in what order

A simple, rigid sequence prevents thrashing and ensures the walking skeleton is standing by Saturday afternoon.

* **Friday (3–4h):** Choose the target city and dataset. Confirm HUD FMR endpoints [12]. Draft and freeze the "By Sunday we will show" sentences. Scaffold repositories, fetch/cache sample JSON data, and design a minimal UI.
* **Saturday AM (4–5h):** Build the walking skeletons. For the Notifier: render the map/list using cached JSON. For Compliance: build the CSV ingest to table flow and stub the FMR comparison [21].
* **Saturday PM (4–6h):** Wire live API reads behind feature flags. Add the "Must-have" features. Implement CSV exports. Add the required legal disclaimers. Run end-to-end tests.
* **Sunday AM (2–3h):** Final UX polish. Prepare demo scripts. Record the backup video. Freeze all code and rehearse the presentation.

## References

1. *Techstars Startup Weekend [Vertical] [City] - vFairs.com*. https://techstars.vfairs.com/en/registration-form
2. *Set Boundaries | Shape Up*. https://basecamp.com/shapeup/1.2-chapter-03
3. *Walking Skeleton - by Ben Christel*. https://bensguide.substack.com/p/walking-skeleton
4. *Walking Skeleton*. https://wiki.c2.com/?WalkingSkeleton
5. *Get started with Firebase Cloud Messaging in Web apps*. https://firebase.google.com/docs/cloud-messaging/web/get-started
6. *CAN-SPAM Act: A Compliance Guide for Business | Federal Trade Commission*. https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
7. *Terms of use - SF OpenData | DataSF*. https://data.sfgov.org/terms-of-use
8. *Data Policy | Open Data DC*. https://opendata.dc.gov/pages/data-policy
9. *Open Data Policy and Technical Standards Manual*. https://a860-gpp.nyc.gov/downloads/9p290c02z?locale=en
10. *Distinguishing Between Brigade "Sanctioned"/"Official" Projects and other Projects - Projects - Code for America Network*. https://discourse.codeforamerica.org/t/distinguishing-between-brigade-sanctioned-official-projects-and-other-projects/559
11. *Socrata Developers | Socrata - Data & Insights*. https://dev.socrata.com/
12. *FMR IL Dataset API Documentation | HUD USER*. https://www.huduser.gov/portal/dataset/fmr-api.html
13. *Fair Market Rents (40th PERCENTILE RENTS) | HUD USER*. https://www.huduser.gov/portal/datasets/fmr.html
14. *
	Understanding the MoSCoW prioritization | How to i... - Atlassian Community
*. https://community.atlassian.com/forums/App-Central-articles/Understanding-the-MoSCoW-prioritization-How-to-implement-it-into/ba-p/2463999
15. *YAGNI (“You Aren’t Gonna Need It,”): helps software engineers build with clarity, not clutter | by Saurabh Gupta | Medium*. https://medium.com/@saurabh.engg.it/yagni-you-arent-gonna-need-it-helps-software-engineers-build-with-clarity-not-clutter-02464d0b7a63
16. *What is Simple Design? | Agile Alliance*. https://agilealliance.org/glossary/simple-design/
17. *Prioritization frameworks | Atlassian*. https://www.atlassian.com/agile/product-management/prioritization-framework
18. *Building Permits | Socrata API Foundry - Data & Insights*. https://dev.socrata.com/foundry/data.sfgov.org/i98e-djp9
19. *PermitSF Permitting Data | DataSF*. https://data.sfgov.org/d/tyz3-vt28
20. *permits | NYC Open Data*. https://data.cityofnewyork.us/Housing-Development/permits/twmy-zd2n
21. *How to manage a program in a product-mode organization*. https://martinfowler.com/articles/programs-in-product-mode.html