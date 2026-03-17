# Hackathon Red Lines for Thriving Neighborhoods: 8 Do‑Not‑Builds and Safer Paths

## Executive Summary
Hackathons are engines for civic innovation, but building tools for "Thriving Neighborhoods" requires navigating strict legal, privacy, and operational boundaries. The fastest way to create harm is to automate legal judgments, misuse sensitive data, or imply official City status. 

Key constraints dictate what teams should avoid:
* **Unauthorized Practice of Law (UPL):** Automated "compliance determinations" and "eligibility verdicts" mimic legal advice. Under New York Judiciary Law §§ 478 and 484, providing legal services without a license is unlawful [1] [2] [3].
* **Data Confidentiality:** Tenant and rent data are legally confidential. Building-wide rent rolls can only be provided to the building owner or their authorized representative [4] [5].
* **Privacy Mandates:** The NYC Tenant Data Privacy Act (Local Law 63 of 2021) strictly regulates smart access data, requiring explicit consent, limiting data collection, and mandating the destruction of authentication data within 90 days [6] [7] [8].
* **Official Misrepresentation:** City tools like ZoLa explicitly disclaim accuracy and warranties, stating they are provided solely for informational purposes [9] [10]. Hackathon prototypes cannot claim to be authoritative.

## Why Red Lines Matter
Hackathon wins can backfire without legal, privacy, and trust guardrails. While teams are eager to solve complex housing and neighborhood challenges, deploying tools that issue deterministic "legal answers," expose confidential tenant data, or falsely claim official City endorsement can cause immediate harm to vulnerable residents. Staying useful means informing and guiding users, not deciding their legal or financial fates.

## Legal Boundaries That Trigger UPL
Determinations, not explanations, cross the line into the Unauthorized Practice of Law. New York Judiciary Law § 478 makes it unlawful for any natural person to practice or appear as an attorney-at-law without being admitted and registered [1] [3]. 

Courts have scrutinized legal tech companies that offer online platforms enabling customers to create legal documents by responding to prompts [11]. For example, in *Janson v. LegalZoom.com, Inc.*, a federal court found that branching computer programs created by human employees using state law to fill in documents went beyond mere self-help [11]. Hackathon teams must avoid building branching logic that outputs personalized legal or compliance determinations. Instead, teams should build general informational tools, checklists with citations to official sources, and warm handoffs to certified counselors.

## Data Confidentiality and Privacy
Tenant and rent data are restricted, and smart-access data is tightly regulated. Under 9 NYCRR § 2528.5, rent registration information filed with the DHCR is not subject to the Freedom of Information Law, and information relative to a tenant or owner is only available to that party or their authorized representative [12]. Furthermore, building-wide rent roll information can only be provided to the building owner or their authorized representative [4].

Additionally, the Tenant Data Privacy Act (Local Law 63 of 2021) imposes rigorous requirements on owners of smart access buildings [7] [8]. 
* **Data Destruction:** Authentication data must be destroyed no later than 90 days after collection, unless anonymized [6] [7] [8].
* **Prohibited Uses:** Data cannot be used to harass or evict a tenant, track relationship status, or track user location outside the building [6] [7] [8].
* **Security:** Systems must implement stringent security measures, including data encryption [6] [7] [8].

Hackathon teams must design for zero access to tenant-level data, utilizing public aggregates and privacy-preserving patterns instead.

## Avoiding "Official System" Pitfalls
Disclaimers mean your prototype cannot be authoritative. The City of New York explicitly protects its data and tools from liability. For instance, the Zoning and Land Use Application (ZoLa) states that it is "provided solely for informational purposes" and that the City "makes no representation as to the accuracy of the information or to its suitability for any purpose" [9]. Similarly, the Zoning Resolution website distributes materials "without warranties of any kind, either express or implied" [10]. 

A hackathon prototype branding itself as "official" or issuing "official findings" will erode trust and may be construed as misrepresentation. Teams should clearly brand their projects as community prototypes and link directly to official portals.

## Ranked Do‑Not‑Build Concepts

The following table outlines the top 8 concepts teams should avoid, why they are tempting, the associated risks, and safer alternatives that provide similar value.

| Rank | Concept (Do‑Not‑Build) | Why It's Tempting | What Goes Wrong (Evidence) | Safer Alternative (Similar Value) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Automated compliance determination tools that generate "official City findings" | Feels like high leverage: instant clarity for developers/residents. | Resembles legal determinations, risking UPL under NY Judiciary Law §§ 478, 484 [1] [3]. City tools disclaim official status/warranties [9] [10]. | Build a compliance checklist wizard that outputs "research notes" with links to ZR/ZoLa sections; include "not legal advice" disclaimers. |
| 2 | Tools that tell residents whether they qualify for affordable housing programs | Clear user ask; perceived to save time. | Personalized eligibility advice equals legal advice risk. Complex rules change; wrong answers cause severe harm. | "Pre‑screening explainer": show required documents, typical thresholds, and direct links to Housing Connect/intake. |
| 3 | Tools that predict whether a development proposal will be approved or denied | AI/ML allure; "insider" feel. | Approvals are discretionary/multi‑body. Predictions mislead the public and investors, creating reputational risk. | "ULURP/CEQR navigator": steps, timelines, common issues, and links to current ZAP entries without predicting outcomes. |
| 4 | Tools requiring confidential housing contract data or tenant‑level rent rolls | "Better data → better insights." | 9 NYCRR § 2528.5 and HCR REC‑1 restrict rent rolls to owners/authorized reps [4] [12]. Violates tenant privacy. | Use public aggregates and synthetic data; design analyses at the building‑class or neighborhood level. |
| 5 | Real‑time displacement risk scores for neighborhoods | Signals urgency and "early warning." | Can be weaponized or stigmatize communities. TDPA bans using access data to harass/evict [6] [7]. | Publish an "early‑warning checklist" and indicator dashboard with transparent methods; avoid building‑level scores. |
| 6 | Comprehensive citywide development platforms claiming to be "official City systems" | Ambitious, funder‑friendly. | Misrepresentation; conflicts with City disclaimers (ZoLa/ZR) [9] [10]. Creates an unmanageable support burden. | Scope narrow "sidecar" modules that link to ZoLa/ZR/ZAP; implement clear versioning and data freshness labels. |
| 7 | Tools needing real‑time data pipelines, push notifications, and user accounts without a maintenance plan | Habitual product patterns. | TDPA adds consent, encryption, and 90‑day deletion duties [6] [7]. Abandonment harms users. | Build static sites or periodic email digests with minimal PII; publish a maintenance owner and sunset plan. |
| 8 | Affordability calculators that "decide" if someone can afford a home or "qualifies" for workforce housing | Simple UX, popular. | Oversimplifies costs, risks discriminatory signaling, and veers into advisory/UPL territory. | Provide transparent budgeting worksheets with adjustable assumptions; link to HUD/NYC definitions. |

*Key Takeaway:* Shifting from definitive verdicts to informational navigators protects both the builders and the end-users from legal and financial harm.

## Safer Patterns that Preserve Value
Shift from verdicts to navigators, from microdata to aggregates, from real‑time to periodic, and from official claims to sourced explainers. Safe, buildable concepts for a hackathon include:
* **Zoning/Process Navigator:** A step‑by‑step ULURP/CEQR explainer with links to ZAP and ZR.
* **Compliance Research Notes Generator:** Cites relevant ZR sections and past actions without issuing determinations.
* **Housing Program Prep Guide:** Document checklists, glossaries, timelines, and intake links to local counselors.
* **Early‑Warning Community Toolkit:** Neighborhood‑level indicators using public, aggregate data with transparent methods.
* **Neighborhood Meetings Radar:** Aggregates public calendars with reminders via RSS/email (no accounts required).
* **Data Freshness Labels:** A widget teams can reuse to show data provenance and link to official sources.
* **Privacy‑by‑Design Template:** Pre‑built consent copy, data minimization defaults, and a 90‑day deletion toggle for prototypes collecting PII.

## Implementation Guardrails
A small set of defaults prevents most harm. Hackathon teams should implement minimal viable governance:
* **Consent & Minimization:** Only collect data necessary for the immediate function.
* **Retention:** Implement a strict 90-day deletion policy for any authentication or personal data, aligning with Local Law 63 [6] [7].
* **Security:** Ensure any stored data is encrypted [7] [8].
* **Disclaimers:** Prominently display that the tool is a prototype, is not official City policy, and does not constitute legal advice.
* **Stewardship:** Name a project steward and define a sunset plan for the application post-hackathon.

## Drift Detection
Teams should monitor for early signals that their project is drifting into dangerous territory. Common warning signs include:
* The tool outputs a yes/no "verdict" on eligibility, compliance, or approvals.
* It uses tenant‑level, lease‑level, or rent roll data without a signed agency/owner authorization.
* It claims to be "official," uses City logos, or implies endorsement without written permission.
* It requires real‑time feeds, push notifications, or user accounts but lacks a named maintainer and security plan.
* It profiles individuals/buildings with risk scores or tracks behavior over time.
* It stores PII without explicit, revocable consent, a retention schedule, or encryption.
* The primary value proposition is "we predict what City decision‑makers will do."

## Appendix: Statutes, Policies, and Official Resources
Build with the grain of current law and City infrastructure:
* **UPL:** NY Judiciary Law §§ 478, 484 [1] [2] [3].
* **Confidentiality:** 9 NYCRR § 2528.5 [12]; HCR REC‑1 [4].
* **Privacy:** NYC Tenant Data Privacy Act (Local Law 63 of 2021) [6] [7] [8].
* **City Disclaimers:** ZoLa [9] and Zoning Resolution [10].

## References

1. * New York Judiciary Law § 478 (2025) - Practicing or Appearing as Attorney-at-Law Without Being Admitted and Registered. :: 2025 New York Laws :: U.S. Codes and Statutes :: U.S. Law :: Justia*. https://law.justia.com/codes/new-york/jud/article-15/478/
2. *PROHIBITIONS ON NONLAWYER PRACTICE*. https://www2.nycbar.org/pdf/report/uploads/95033-ProhibitionsonNon-LawyerPractice.pdf
3. *New York Consolidated Laws, Judiciary Law - JUD § 478 | FindLaw*. https://codes.findlaw.com/ny/judiciary-law/jud-sect-478/
4. *Request for Records Access - Homes and Community Renewal*. https://hcr.ny.gov/system/files/documents/2023/04/rec-1-04-2023-fillable.pdf
5. *Most Common Rent Regulation Issues for Tenants | Homes and Community Renewal*. https://hcr.ny.gov/most-common-rent-regulation-issues-tenants
6. *Tenant Data Privacy Law - HPD*. https://www.nyc.gov/site/hpd/services-and-information/tenant-data-privacy-law.page
7. *Local Laws of the City of New York for the Year 2021*. https://intro.nyc/local-laws/2021-63
8. *Privacy Law Essentials: New York City's Tenant Data Privacy Act | Hinshaw & Culbertson LLP*. https://www.hinshawlaw.com/en/insights/privacy-cyber-and-ai-decoded-alert/privacy-law-essentials-new-york-citys-tenant-data-privacy-act
9. *ZoLa | NYC's Zoning & Land Use Map - NYC.gov*. https://zola.planning.nyc.gov/
10. *Disclaimer | Zoning Resolution - NYC.gov*. https://zoningresolution.planning.nyc.gov/disclaimer
11. *Virtually Unclear: Will Legal Tech Companies Bridge Justice Gap or Fall into UPL Abyss? — Frankfurt Kurnit Klein & Selz*. https://fkks.com/news/virtually-unclear-will-legal-tech-companies-bridge-justice-gap-or-fall-into
12. *N.Y. Comp. Codes R. & Regs. Tit. 9 § 2528.5 - Confidentiality | State Regulations | US Law | LII / Legal Information Institute*. https://www.law.cornell.edu/regulations/new-york/9-NYCRR-2528.5