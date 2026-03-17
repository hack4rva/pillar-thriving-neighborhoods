# Why Civic Tech Stalls in Housing: Lessons from Notification and Data Tools

## Executive Summary

Civic technology projects aimed at housing transparency and neighborhood change frequently fail not due to a lack of initial enthusiasm, but because of predictable operational and governance breakdowns. An analysis of historical civic tech deployments—specifically notification platforms like Citygram—reveals that tools die without dedicated operations budgets, as volunteer-hosted services are not durable at scale. Data pipeline brittleness leads to incorrect or missing alerts, which rapidly erodes resident trust. Furthermore, when city staff lack administrative features like branding and analytics, they cannot justify the internal political capital needed to sustain the tools. To prevent a Thriving Neighborhoods prototype from suffering the same fate, cities must secure vendor-backed hosting, establish strict data contracts with source systems, and centralize governance to avoid fragmented, unmaintained code forks.

## Scope and Purpose

This report pinpoints why housing and planning civic tech fails and how to avoid repeating these mistakes. The scope focuses on housing transparency, development tracking, and neighborhood-change tools, with a specific emphasis on notifications and data maintenance pitfalls. By examining the lifecycle of platforms like Citygram, we can identify the structural vulnerabilities that cause tools to be abandoned by residents or city staff, go stale due to unmaintained data pipelines, or fail to sustain their underlying infrastructure.

## Evidence File: Notification Platforms in the Wild

The history of Citygram across its core repository and local forks exposes critical maintainability, operations, and adoption gaps that are highly relevant to any resident alert system.

### Citygram core signals long-term maintenance gaps

The core `codeforamerica/citygram` repository demonstrates how unresolved issues accumulate over years, implying limited maintainer capacity. The repository shows 24 open issues and 106 closed issues [1]. Many of these open issues span several years without resolution, indicating that even widely celebrated civic tech projects struggle to maintain the developer momentum required for long-term sustainability.

### Delivery reliability and scaling problems surfaced repeatedly

Queueing and provider management are make-or-break for notification systems. Citygram maintainers documented critical scaling failures, such as a "Sequel::PoolTimeout on Digest Send" [1]. Local deployments faced similar infrastructure strain; the BetaNYC fork reported users "Still getting lots of duplicate/triplicate texts in no particular order" [2]. These delivery failures directly undermine the core promise of a notification platform.

### City adoption requirements went unmet

Lack of administrative value propositions slows institutional buy-in. City staff need branding and analytics to justify the use of external tools. In the Citygram core repository, feature requests for the "Ability to Add City Logo to Site" and a "minimal dashboard for cities to view usage statistics" remained open and unresolved [1]. Without these features, internal champions struggle to prove the tool's impact to department leadership.

## Ops and Hosting Sustainability

Without budgeted hosting and operations, civic tools inevitably decay or are forced offline. Volunteer hosting models collapse when faced with the realities of scaling and long-term maintenance.

### No central hosting support from CfA Brigades

Local teams must secure their own infrastructure and funding. In December 2019, Code for America explicitly clarified its stance on infrastructure, stating: "Currently, Code for America doesn't provide any resources for hosting your Brigade's website (financially or in terms of codebases)" [3]. This policy underscores that local deployments cannot rely on a national safety net for their cloud costs.

### Lifecycle management failures degrade service

Planned upgrades and provider SLAs are essential to prevent sudden outages. Infrastructure lifecycle risks silently break applications over time. The BetaNYC fork of Citygram documented critical hosting and database issues, including "DB EOL" (Database End of Life) and "Can't run migrations on heroku" [2]. When volunteer teams lack the capacity or permissions to manage database migrations and platform updates, the service eventually degrades and fails.

## Data Pipeline Brittleness

Maintainable "publishers" and strict data contracts are prerequisites for trustworthy alerts. When ETL (Extract, Transform, Load) processes break or schemas drift, residents receive misleading information.

### Maintainability flagged by maintainers

Codified schemas and contract tests are necessary to reduce breakage. Citygram maintainers explicitly flagged data pipeline vulnerabilities, opening an issue stating that "Publishers should be maintainable" [1]. When the scripts that pull data from city portals break due to upstream changes, the entire notification system goes stale.

### UI–data boundary mismatches cause wrong subscriptions

Product UX must align with data geometry, and tools must be tested with real city layers. Citygram developers noted a "Mismatch between user interface and subscription boundaries" [1]. If a user subscribes to a specific neighborhood but the underlying data pipeline misinterprets those geographic boundaries, the resident will receive incorrect information about development proposals, destroying the tool's credibility.

## Adoption and Trust Dynamics

Small user experience bugs carry massive legitimacy costs. Duplicates, malformed links, and poor unsubscribe flows drive user churn and generate complaints to city staff.

### Duplicate texts and malformed digests

Investing in message QA, canary deployments, and user controls is vital. The BetaNYC Citygram instance logged numerous user-facing bugs between 2015 and 2022, including "Email/Website bug," "Email Digest Showing All Collisions Occurring at Same Time," and complaints about duplicate texts [2]. The core repository also noted that "URLs for online digest are malformed" [1].

### Missing analytics stalls internal champions

Providing adoption and impact dashboards is necessary to sustain executive sponsorship. As noted earlier, the open request for a "minimal dashboard for cities to view usage statistics" [1] highlights a critical gap. If city staff cannot see how many residents are using the tool or whether messages are successfully delivered, they cannot justify dedicating staff time to maintain the underlying data feeds.

## Governance and Fragmentation

A single maintained core with a plugin architecture is vastly superior to scattered, unmaintained forks. Fork sprawl without clear owners undermines continuity and introduces security risks.

### Comparison: Core vs local forks

| Repository | Stars | Forks | Open Issues Signals | Notable Problems | Implication | URL |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| codeforamerica/citygram | 170 | 88 | 24 open / 106 closed; unresolved maintainability | Delivery timeouts, missing admin features | Needs a funded core team | https://github.com/codeforamerica/citygram/issues |
| BetaNYC/citygram-nyc | 12 | 4 | Longstanding user-facing bugs | Duplicate texts, DB EOL, Heroku migration failures | Local capacity limits hinder ops | https://github.com/BetaNYC/citygram-nyc/issues |
| lfucg/citygram-services | 0 | 0 | Empty issues board | Unknown activity | Potentially unmaintained/abandoned | https://github.com/lfucg/citygram-services/issues |

The disparity between the core repository and local forks demonstrates that while it is easy to fork a project, maintaining it locally requires dedicated operational capacity that volunteer brigades often lack.

### Actionable governance model

To prevent fragmentation, projects should centralize around a single maintained core with a robust plugin API. Governance must include a designated maintainer of record, clear contribution guidelines, and explicit Service Level Agreements (SLAs) with participating city departments to ensure data continuity.

## Gaps and Unknowns Requiring Targeted Research

While the Citygram ecosystem provides robust evidence regarding notification and infrastructure failures, several priority topics requested in the research scope lack verified, citable cases in the current corpus.

* **Unknowns:**
 * Specific housing affordability calculators that provided misleading eligibility guidance (URLs and case studies needed).
 * Tools that gave residents incorrect information about specific development proposals (beyond general boundary mismatches).
 * Platforms that were shut down specifically because they were perceived as threatening by city staff or developers.
 * Detailed shutdown timelines and impacts for specific platforms like EveryBlock, BuildingEye, and Rentlogic (though REBNY's lobbying against rent stabilization laws is documented [4], specific tech platform takedowns require further targeted searches).

## Top 5 Failure Patterns Likely to Affect a Thriving Neighborhoods Prototype

Most risks to civic tech prototypes are operational and governance-related, rather than purely technical.

| Failure Pattern | Evidence | Why it matters | Mitigations |
| :--- | :--- | :--- | :--- |
| **Underfunded ops/hosting leading to outages** | CfA provides no hosting [3]; Citygram timeout issues [1] | Breaks resident trust and introduces compliance/security risks. | Budget for SRE/monitoring; use managed queues/email; establish an on-call plan and uptime SLOs. |
| **Data pipeline breakage and schema drift** | "Publishers should be maintainable" [1] | Wrong or missed alerts misinform residents about neighborhood changes. | Establish data contracts; implement schema versioning; use contract tests; provide public audit logs. |
| **UX reliability defects** | Duplicate texts, malformed digests [1] [2] | Drives user churn and generates complaints to city staff. | Implement canary testing; add deduplication logic; enforce rate-limits; ensure one-click unsubscribe. |
| **Fragmented forks with no owner** | Core vs. forks disparity [1] [5] [2] | Results in no security updates and eventual platform decay. | Maintain a single core with plugins; designate a maintainer of record; establish city SLAs. |
| **Missing admin value props** | Branding/analytics requests left open [1] | Fails to secure an internal champion or budget from city leadership. | Build white-label branding; create an admin dashboard; conduct quarterly adoption reviews. |

## Actions for Richmond Context

Even without Richmond-specific case studies in this corpus, the failure patterns observed in other cities translate directly into necessary setup decisions for a Thriving Neighborhoods prototype. Design for sustainability and trust from day zero.

### Immediate setup decisions

* **Hosting:** Choose a managed cloud provider with a dedicated budget line and a clear vendor of record. Do not rely on volunteer cloud credits.
* **Ops:** Define Service Level Objectives (SLOs), set up automated monitoring and alerts, and create incident response playbooks.
* **Data:** Establish Memorandums of Understanding (MOUs) with Planning and Permitting departments for data schemas and SLAs. Use staging environments and contract tests.
* **Product:** Implement a white-label theme, build administrative analytics dashboards, and maintain public audit logs so residents can verify why an alert was triggered.

### Pilot plan and guardrails

Start small to validate the infrastructure. Begin with a single dataset and one notification channel. Cap the subscription area and volume to manage costs and load. Run a 60–90 day pilot with shadow audits, and publicly publish delivery and accuracy metrics before expanding to broader neighborhood use cases.

## Appendices

### Facts (with URLs)

* The `codeforamerica/citygram` core repository has 24 open issues and 106 closed issues, including unresolved requests for city logos, usage dashboards, and fixes for malformed URLs and timeout errors (http://github.com/codeforamerica/citygram/issues) [1].
* The `BetaNYC/citygram-nyc` fork documented critical operational issues, including "DB EOL," Heroku migration failures, and duplicate/triplicate text messages (http://github.com/BetaNYC/citygram-nyc/issues) [2].
* Code for America stated in December 2019 that it does not provide financial or codebase hosting resources for Brigade websites (http://discourse.codeforamerica.org/t/hosting-your-brigades-website-some-options-to-consider/672) [3].
* The `lfucg/citygram-services` repository shows 0 open and 0 closed issues, indicating a lack of active issue tracking (http://github.com/lfucg/citygram-services/issues) [5].

### Inferences (clearly labeled)

* **INFERENCE:** Citygram deployments likely suffered severe adoption and sustainability challenges because critical administrative features (analytics, branding) and infrastructure stability (timeouts, database migrations) were left unresolved.
* **INFERENCE:** The fragmentation of civic tech projects across multiple local forks reflects a systemic governance and ownership gap, where local teams have the enthusiasm to launch a tool but lack the long-term operational capacity to maintain it.

### Unknowns

* Documented cases of housing affordability calculators providing misleading guidance.
* Specific examples of tools giving incorrect development proposal information (beyond general boundary errors).
* Instances of tools shut down due to perceived threats by staff or developers.
* Detailed timelines and post-mortems for EveryBlock, BuildingEye, and Rentlogic.

## References

1. *Issues · codeforamerica/citygram · GitHub*. https://github.com/codeforamerica/citygram/issues
2. *GitHub · Where software is built*. https://github.com/BetaNYC/citygram-nyc/issues
3. *Hosting your Brigade's Website: Some Options to Consider - Organizer Skillsharing / Organizing a Brigade - Code for America Network*. https://discourse.codeforamerica.org/t/hosting-your-brigades-website-some-options-to-consider/672
4. *In NYC, the fight for rent stabilization continues - Prism*. https://prismreports.org/2025/04/03/nyc-rent-stabilization-tenants-landlords/
5. *Issues · lfucg/citygram-services · GitHub*. https://github.com/lfucg/citygram-services/issues