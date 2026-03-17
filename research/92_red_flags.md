# De-risking Thriving Neighborhoods Hacks: Top Red Flags and Fixes

## Executive Summary

The fastest way to win—and avoid harm—at the upcoming Hack for RVA is to eliminate build-breakers and trust-breakers up front. For Pillar 2 ("Thriving Neighborhoods"), projects must navigate complex civic realities, from unpredictable planning commission votes to the ethical handling of housing data. 

Our analysis of the 10 identified red flags reveals that five pose high-severity risks that can cause a prototype to fail live or actively harm users (e.g., assuming open API access, claiming to monitor private compliance data, or misguiding users on housing eligibility). The remaining five are medium-severity risks that can be managed with strict design and copy guardrails (e.g., labeling AI summaries, avoiding causal claims in data visualizations). By shifting from "predicting and deciding" to "tracking and explaining," teams can ship scoped, truthful prototypes that residents and the City of Richmond could plausibly pilot.

## Why This Matters: Trust and Feasibility in 48 Hours

The City of Richmond is co-sponsoring the Hack for RVA from March 27–29, 2026, challenging participants to build community-centered solutions aligned with the Mayor's Action Plan [1]. The "Thriving Neighborhoods" pillar focuses on housing access and neighborhood amenities [2]. Because this is a 48-hour sprint [1], teams must ruthlessly prioritize feasibility. Furthermore, civic tech projects operate in a high-trust environment; deploying tools that mislead residents about housing eligibility or planning deadlines can cause real-world harm. Planning outcomes depend on public bodies and due process, not software algorithms.

## High-Severity Risks That Break Function or Cause Harm

These five flags represent architectural or scoping risks that require immediate pivots to avoid failing during the demo or causing user harm.

### API Availability: Don't Bet the Demo on webapi.legistar.com
Building a tool that assumes open, unauthenticated access to Richmond's Legistar API is a critical failure risk. While the Granicus Legistar Web API exposes legislative data over HTTPS [3], access varies significantly by client. Some municipalities require API tokens for read-only access, and queries are strictly capped at 1,000 responses [4]. If a team builds a live dependency on `https://webapi.legistar.com/v1/richmondva/` without a token, the app may return 401 Unauthorized errors during the demo [5].
* **Action**: Preflight the endpoint immediately. If unavailable, implement fallbacks: scrape the public Legistar HTML to flat JSON pre-demo, or ship a local JSON bundle seeded from public downloads. Design the app to run fully offline.

### Housing Compliance "Monitoring": Pivot from Oversight to Literacy
Claiming a tool can monitor real-time housing compliance is not credible. True compliance validation requires private materials—such as rent rolls, developer compliance reports, and private contract enforcement terms—that are not published in open data portals. 
* **Action**: Pivot to a "compliance explainer" or "document-finder." Index public ordinances and covenants, and teach residents what to request from landlords or developers. Include FOIA request templates rather than implying live monitoring.

### Notifications in 48 Hours: Replace Sending with Scheduling
Overpromising email or SMS alerts is a classic hackathon trap. Reliable delivery requires server infrastructure, sender reputation validation (SPF/DKIM), queueing, and privacy controls—well beyond a 48-hour scope [1].
* **Action**: Offer low-risk substitutes. Generate "Add to calendar" ICS links for Legistar hearing dates, use browser-based reminders (localStorage), or build a mock notification screen that shows what *would* send without executing a live delivery.

### PII in Demos: Default to Synthetic Data
Including real tenant, resident, or property owner personal data without consent creates severe privacy and equity risks. The Urban Institute's Do No Harm Guide emphasizes the need to approach data through a lens of diversity, equity, and inclusion, protecting vulnerable populations [6].
* **Action**: Use synthetic or fabricated records for the demo. If real data must be used, restrict fields, run a redaction pass (e.g., redact geocodes below parcel precision), and prominently display a "Data minimized—no PII stored" badge.

### Affordability Calculators: From Determination to Education
Building calculators that claim to definitively tell users if they qualify for housing programs is dangerous. Eligibility is highly complex, varying by household size, Area Median Income (AMI), assets, and immigration status. Incorrect guidance could cause a family to self-exclude from a program they actually qualify for.
* **Action**: Recast the tool as a "pre-screening explainer." Provide AMI tables and sliders, but force a mandatory gate stating: "This is not an eligibility determination—see [official intake link]." Output guidance and next steps, not binary yes/no decisions.

## Medium-Severity Risks Manageable with Guardrails

These risks can be mitigated without changing the core architecture, provided teams implement strict labeling, copy discipline, and design choices.

### AI Summaries: Label, Link, and Human-Review
Presenting AI-generated development summaries as official is highly risky. Governments are moving toward mandatory AI disclosures; the EU AI Act Article 50 sets transparency rules for generative AI [7], and the proposed U.S. REAL Act would prohibit federal agencies from distributing AI-generated content without clear labels or human oversight [8]. Furthermore, the NIST AI Risk Management Framework emphasizes transparency and accuracy [9].
* **Action**: Prominently label any AI-assisted summaries as "Unofficial, AI-assisted. Verify with City sources." Link directly to the original agenda matter in Richmond's Legistar, and require a visible "Reviewed by [Name], [Date]" tag.

### Don't Predict Planning Outcomes: Orient Users to Process
Implying a development proposal will be approved or denied ignores the reality of civic governance. In Richmond, Special Use Permits (SUP) require a recommendation from the City Planning Commission and six affirmative votes from the City Council to be adopted [10]. The typical approval process takes between 120 to 180 days, with multiple review steps and potential continuances [10]. Software cannot forecast these democratic outcomes.
* **Action**: Reframe tools as "process trackers." Show the current status, the next hearing date, and the decision-making bodies involved. Ban probability or "likely to pass" language in the UX copy.

### Correlation ≠ Causation in Visuals
Implying that a neighborhood change visualization shows causal relationships (e.g., "this development caused displacement") when the data only shows correlation is a major data ethics violation. Research by Xiong et al. (2019) demonstrates that visualization design heavily influences causal interpretation: participants perceived text descriptions and bar graphs as highly causal, while scatter plots and line graphs were viewed as less causal [11]. Furthermore, higher levels of data aggregation tend to increase perceived causality [11].
* **Action**: Prefer scatterplots with modest aggregation. Explicitly annotate charts with "Correlation only—many factors not shown." Avoid loaded verbs like "caused" or "led to."

### No Implied City Endorsement
Presenting a tool as "the City's development tracker" invites backlash. While the City of Richmond sponsors the hackathon [1], individual projects are independent prototypes.
* **Action**: Use neutral names (e.g., "Richmond Development Explorer"). Add an explicit "Independent civic prototype—no official endorsement" statement, and never use the City seal without written authorization.

### Timestamps and Source Labels Everywhere
Failing to include last-updated dates and data sources misleads users. Government analysis guidelines stress the importance of communicating quality, uncertainty, and change to users [12]. Stale data can cause residents to miss critical public comment deadlines.
* **Action**: On every card and chart, display "Source: [Legistar/City]" and "Last updated: [ISO 8601 date]." Disable share buttons if the demo dataset is more than 30 days stale.

## Build-Safe Patterns for a Weekend Prototype

To survive the 48-hour constraint while maintaining ethical standards, teams should adopt these build-safe patterns:
* **Data Seams**: Build a single "DataService" with in-memory JSON that can be switched to a live API later.
* **No Live Writes**: Keep the prototype read-only. Have forms end in a safe surrogate action, like "email yourself this checklist."
* **Explain, Don't Decide**: Output action checklists and educational materials rather than definitive determinations.
* **Testable Stubs**: Design the UI to show a notification preview rather than attempting a live send.

## Richmond-Specific Data Strategy

Anchor your prototype to Richmond's official processes to ensure accuracy and build trust.
* **Confirm Official Sources**: Use `richmondva.legistar.com` for calendar and legislative files [13], and the Land Use Administration pages for SUP and rezoning documentation [14].
* **Embed Process Facts**: Hardcode the reality that a Planning Commission recommendation precedes Council action, and that an SUP requires six affirmative votes and 120–180 days [10].
* **Implementation**: Pre-scrape the next 60 days of meetings. Map complex matter types to plain-English statuses (e.g., "hearing scheduled"), and always provide a "Verify on Legistar" link.

## Ethics, Disclosure, and Copy Checklist

Implement this checklist to catch preventable harms before judging:
* **Headers**: Include Data Source, Last Updated, AI Usage Label, Human Reviewer, and Non-Endorsement Notice.
* **Banned Words**: Predict, approve, deny, guaranteed, qualify.
* **Required Copy**: "Correlation only," verification links, and process ownership statements (e.g., "Decided by City Council").
* **Data Handling**: No PII; use synthetic datasets; state "Data will be deleted after event."

## Demo-Day Risk Drills and Test Plan

Practice these failure modes before the judges find them:
1. **Airplane Mode Test**: Ensure the app runs fully offline from a fresh laptop.
2. **Fresh Browser Test**: Clear cookies and localStorage to ensure content still loads.
3. **Source-of-Truth Test**: Click every "View on Legistar" link to ensure it resolves correctly.
4. **Stale Data Banner**: Manually set the last-updated variable to >30 days and verify the warning banner appears.
5. **Roadmap Slide**: Prepare a "What we'd build next" slide detailing alert architecture, privacy controls, and API integration plans.

## Appendix — Red Flags x Mitigations Matrix

| # | Red Flag (Short) | Severity | Evidence / Notes | 48h-Safe Mitigation | Guardrail Sufficient? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | AI summary presented as official | Medium | NIST AI RMF [9]; EU AI Act [7]; REAL Act [8] | Prominent "Unofficial, AI-assisted" label; link to source; human review | Yes, with labels/review |
| 2 | Tool implies approval/denial | Medium | Richmond SUP requires PC rec + 6 Council votes; takes 120-180 days [10] | Process tracker only; no predictions; show next hearings and bodies | Yes, with strict UX copy |
| 3 | Legistar API assumed but unavailable | High | Granicus API varies; tokens sometimes required; 1,000 item cap [4] | Preflight endpoint; scrape-to-JSON; ship offline dataset; no live dependency | No, needs architecture change |
| 4 | "Real" housing compliance monitoring | High | Private compliance artifacts not public; no Legistar endpoints | Pivot to explainer/docs index; FOIA templates; do not claim monitoring | No, change scope |
| 5 | Overpromised notifications/alerts | High | 48-hour event [1]; infra and deliverability complexity | ICS/calendar exports; local reminders; demo-only mock sends | Partly (if scope reduced) |
| 6 | Real PII in demos | High | Do No Harm Guide [6]; equity/privacy harm | Synthetic data; consent; redaction; retention policy | Yes, with strong guardrails |
| 7 | Causal claims from correlational visuals | Medium | Xiong et al. (bar graphs increase causal perception) [11]; OSR guidance [15] | Scatterplots; "Correlation only" labels; avoid causal verbs | Yes, with design + copy |
| 8 | Affordability calculators imply eligibility | High | Eligibility complexity across programs | Pre-screen explainer; mandatory disclaimers; route to official intake | No, avoid binary outputs |
| 9 | Implying City endorsement | Medium | City sponsors event [1]; projects are independent | Neutral naming; explicit non-endorsement statement | Yes, with branding guardrails |
| 10 | Missing last-updated/source labels | Medium | Government guidance on quality/timeliness [12] | Always show Source + Last updated; flag stale data | Yes, simple guardrail |

*Takeaway*: All ten risks have a specific, testable guardrail or scope change. Five require fundamental scope or architecture changes to be safe, while the other five can be managed with strict labeling and design discipline.

## References

1. *City of Richmond to Partner in City’s First-Ever Civic Hack-a-thon | Richmond*. https://www.rva.gov/press-releases-and-announcements/news/city-richmond-partner-citys-first-ever-civic-hack-thon
2. *Richmond Civic Hackathon: Richmond's best hustlers, hackers, and artists solving the city's toughest challenges. - Devpost*. https://hack-for-rva.devpost.com/?ref_feature=challenge&ref_medium=discover
3. *Legistar Web API Help Page*. https://webapi.legistar.com/Help
4. *Examples - Legistar Web API - Granicus*. https://webapi.legistar.com/Home/Examples
5. *Legistar Web API | Granicus Support*. https://support.granicus.com/s/article/Legistar-Web-API
6. *Do No Harm Guide: Applying Equity Awareness in Data ...*. https://www.urban.org/research/publication/do-no-harm-guide-applying-equity-awareness-data-visualization
7. *AI content labelling - House of Commons Library*. https://commonslibrary.parliament.uk/research-briefings/cbp-10467/
8. *Bipartisan House bill asks agencies to label AI-generated content | FedScoop*. https://fedscoop.com/bipartisan-house-bill-disclosure-ai-content-label-requirement/
9. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*. https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf
10. *Special Use Permit Application Form*. https://rva.gov/sites/default/files/2025-10/Special%20Use%20Permit%20Application%20Form%20-%202025.pdf
11. *Illusion of Causality in Visualized Data*. https://mucollective.northwestern.edu/files/2019-Correlation%20Causation-VIS.pdf
12. *Communicating quality, uncertainty and change – Government Analysis Function*. https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/
13. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
14. *Land Use Administration | Richmond*. https://www.rva.gov/planning-development-review/land-use-administration
15. *How to communicate uncertainty in statistics – Office for Statistics Regulation*. https://osr.statisticsauthority.gov.uk/blog/how-to-communicate-uncertainty-in-statistics/