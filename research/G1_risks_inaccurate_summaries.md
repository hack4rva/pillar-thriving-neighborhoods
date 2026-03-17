# Designing Safe AI Planning Summaries: Risks, Thresholds, and Controls

## Executive Summary

Deploying AI-generated plain-language summaries for urban planning documents introduces significant civic risks, primarily because generative AI systems can produce hallucinations that seem highly plausible but are factually incorrect [1]. Microsoft's Guidelines for Human-AI Interaction explicitly acknowledge that AI systems operate under uncertainty and will be "inevitably wrong" [2], often producing false positives and unpredictable behaviors [3]. 

To safely implement this public-facing tool, the design must assume and contain error. Government and civic platforms already normalize a "not official" posture paired with direct source-of-truth linking. For example, the Washington State Department of Licensing and USCIS explicitly state that their English web content is the official version and that automated translations are not legally binding [4] [5]. Similarly, official legislative portals like Philadelphia's Legistar warn that their site contains "unofficial copies" meant only for informational purposes [6]. 

**Key Strategic Directives:**
* **Treat summaries as assistive, not authoritative:** Require a top-of-card "interpretation, not official" label and expose source links prominently.
* **Implement zero-tolerance for routing errors:** The highest-harm errors involve the "where, when, and what" (addresses, meeting times, proposal types). These critical fields must be gated with deterministic checks before publishing.
* **Adopt a defense-in-depth stack:** Disclaimers alone are insufficient. Combine deterministic field extraction, mandatory source linking, explicit labeling, and targeted human review.
* **Scope human review for high-risk items:** In a 48-hour build, implement a lightweight triage system that routes only high-risk or low-confidence summaries to a 2-minute human checklist, allowing low-risk items to auto-publish with guardrails.

## Purpose and Scope

The goal of this initiative is to enable accessible, plain-language urban planning information without creating actionable harm. Because AI models can generate nonsensical or incorrect data that appears completely plausible [1], we propose a defense-in-depth design. This approach assumes AI error, preserves official government sources as the canonical record, and gates the highest-risk facts with deterministic checks and targeted human review.

## Risk Taxonomy and Assessment

The most consequential errors in planning summaries are routing errors—mistakes regarding where, when, and what is happening. These errors directly misdirect civic action and require zero-tolerance gates.

### Error Types, Severity, and Likelihood

| Error type | Example | Severity (1–5) | Likelihood w/o controls (1–5) | Impact if acted upon | Evidence/Rationale |
| --- | --- | --- | --- | --- | --- |
| **Incorrect address/parcel ID** | 512 Main St vs 521 Main St | 5 | 2–3 | Resident shows up at wrong site; cannot appeal later. | Government disclaimers stress non-binding renderings [4]; routing harm is direct. |
| **Wrong meeting date/time/location** | "Tue 7 pm" vs "Thu 6 pm" | 5 | 2–3 | Missed comment period/hearing; due-process risk. | Direct attendance harm; Legistar warns of inaccuracies [7]. |
| **Missing comment deadline** | No date or wrong cutoff | 5 | 2–3 | Loss of standing to comment or appeal. | Discrepancies are not legally binding [4]; highlights need for canonical source. |
| **Wrong proposal type** | Variance vs. special exception; rezoning vs. text amendment | 5 | 2–3 | Organizes wrong coalition; misguides legal strategy. | AI inferences operate under uncertainty [3]; domain terms are highly confusable. |
| **Missed conditions/restrictions** | Omits "30% affordable" or "max height 35 ft" | 4 | 3–4 | Skews sentiment; legal consequences if relied upon. | Official text is the sole authority [5]. |
| **Wrong project description** | "New duplex" instead of "rear addition" | 3 | 3 | Misplaced opposition/support; less direct harm. | AI hallucinations look plausible but are incorrect [1]. |

*Note: Likelihood decreases materially with deterministic field extraction and cross-checks.*

### Consequences of Resident Reliance on Wrong Summaries

The practical harms of AI hallucinations in this context are severe and directly impact democratic participation:
* **Missed comment periods:** If a deadline is hallucinated or omitted, a resident loses their legal standing to object, and the planning decision proceeds unchallenged.
* **Wrong meeting location/time:** Residents waste trips, eroding trust in the tool and lowering overall civic attendance.
* **Opposing the wrong project:** Misunderstanding the proposal type or address causes reputational harm to community organizations and confusion at official hearings.
* **Policy misunderstanding:** Omitted conditions lead to ill-formed public comments and the potential spread of misinformation.

Government platforms mitigate this by legally distancing themselves from web-copy accuracy. The New York City Council's Legistar terms state that information is provided "as is" and may include inaccuracies [7]. USCIS notes that while they try to keep information accurate, they cannot guarantee there will be no errors due to volume and short deadlines [5].

## Mitigations Ranked by Effectiveness

To protect users, the tool must implement a layered safety net combining deterministic checks, provenance, explicit labeling, and human review.

| Rank | Mitigation | Why it works | Risk types addressed | Effort | 48h feasible? |
| --- | --- | --- | --- | --- | --- |
| **1** | **Deterministic extraction + cross-check** | Removes model hallucination from route-critical data (address, datetime, type, deadlines). | Address, datetime, type, deadlines | Medium | Yes |
| **2** | **Prominent "interpretation" label + source CTA** | Sets expectations and drives verification behavior, mirroring government disclaimer standards [4] [5]. | All | Low | Yes |
| **3** | **Confidence/uncertainty cues** | Prevents false certainty and halts risky publishing. Aligns with Microsoft guidelines to make clear how well the system functions [3]. | All, esp. critical | Low–Med | Yes |
| **4** | **User flagging and rollback** | Enables rapid correction at scale. Aligns with Microsoft guidelines to encourage granular feedback [3]. | All | Medium | Yes |
| **5** | **Scope-limited human review** | Catches residual critical errors via a 2-minute, 4-field checklist for high-risk items. | Critical fields | Medium | Yes |
| **6** | **Change log + "What's new" banner** | Provides transparency during data shifts or scraper breakages [8] [3]. | Trust, expectations | Low | Yes |
| **7** | **Minimal narrative constraints** | Reduces invention in prose by forbidding opinions and verifying numbers to the source. | Narrative errors | Low | Yes |

## Required Disclaimer Language

Short, clear, and consistent language is required to steer users to the official record. This language is modeled on established government and civic tech standards [7] [4] [5] [6].

* **Short banner (always visible):**
 "Plain-language summary generated by AI. This is an interpretation, not the official notice. For legally binding information, read the official record."
* **Inline summary header (above the AI text):**
 "Source: [Planning Authority] • View the official record → • Last updated: [timestamp]
 *Important: Dates, locations, and conditions are binding only as stated in the official notice.*"
* **Translation variant (if summarizing into other languages):**
 "This translation is provided for convenience. The English version of the official notice is the authoritative source. Any discrepancies are not legally binding."
* **Issue state (when scraper/ingest is degraded):**
 "Data status: Degraded. Some items may be incomplete or outdated. Check the official record before taking action."

## Decision Framework: Auto-Publish vs. Human Review

Auto-publish should only occur when critical facts are verified and the risk profile is low. Everything else must be routed to a 2-minute human check.

### Gating Rules (All must pass for auto-publish)
1. **Critical-field verification:** Address/parcel ID, meeting datetime, proposal type, and comment deadline exactly match the official record via deterministic parsing.
2. **Provenance present:** Source URL resolves, timestamp is recorded, and the "official record" CTA is functional.
3. **Confidence/uncertainty:** Model confidence for critical fields is above the set threshold; no unresolved ambiguity flags.
4. **Time buffer:** The hearing or decision is ≥7 days away.
5. **Proposal risk:** The item is not a high-impact type (e.g., rezoning, variance, special exception, citywide text amendment) and is not marked "controversial" by the authority.

### Decision Matrix

| Condition | Auto-publish | Human review |
| --- | --- | --- |
| All critical fields verified; hearing ≥7 days; low-risk type | Yes | No |
| Any critical field unverified or low-confidence | No | Yes (2-min checklist) |
| Hearing/decision <7 days | No | Yes (expedite) |
| High-impact type (rezoning, variance, special exception) | No | Yes |
| Source link unavailable or 4xx/5xx error | No | Yes (or withhold) |
| Model flags ambiguity/uncertainty in title or scope | No | Yes |

## Accuracy Standards

Agencies assert the official record as canonical rather than promising web accuracy [5]. Our thresholds must make that posture operational.

* **Unacceptable (Auto-fail, require fix/review):**
 * Any mismatch in address/parcel ID, meeting datetime/location, proposal type, or comment deadline.
 * Any invented condition, restriction, or numeric figure not present in the source.
* **Sufficient for auto-publish (When all gates pass):**
 * 100% match on critical fields to the source.
 * Narrative uses only facts present in the official notice (minor omissions of non-routing details are acceptable).
 * Includes functional source link and timestamp.
* **Recommended Quality Targets:**
 * Critical fields: 100% precision and 100% recall relative to official metadata.
 * Narrative: 0% fabricated facts; style clarity prioritized over exhaustive completeness.

## 48-Hour Human-Review Scope

A lightweight queue and checklist can be built in two days to review only what truly needs it.

* **Build Components (Day 1):**
 * *Ingest/Verifier:* Deterministic parser for address, datetime, type, and deadlines.
 * *Admin Queue:* List items failing gates. Show a side-by-side view of the official snippet vs. extracted fields.
 * *Rollback:* One-click unpublish and restore prior version.
 * *Notifications:* Slack/email routing for urgent (<7 days) items.
* **Process (Day 2):**
 * *Staffing:* 1–2 reviewers; 2 minutes per item; batch windows twice daily.
 * *Checklist (4 items):* Address/parcel, meeting datetime/location, proposal type, comment deadline.
 * *SLA:* High-risk within 8 hours; others within 24 hours.
* **Post-launch:**
 * Weekly sample audit of 50 auto-published items. Track flag rates and time-to-fix.

## Comparable Tools

Civic tools emphasize provenance and disclaimers over interpretive authority. Emulate their pattern, not their prose.

| Tool | Approach | Disclaimer/Positioning | Source Linking | Update Cadence |
| --- | --- | --- | --- | --- |
| **Councilmatic (Chicago)** | Surfaces official legislation metadata. | Explains data comes from Clerk's eLMS/Legistar; not official [9]. | Yes, link on each item [9]. | Nightly [9]. |
| **Legistar (NYC)** | Official legislative portal. | Terms state it may include inaccuracies and is provided "as is" [7]. | N/A (it is the source). | Ongoing. |
| **Legistar (Philadelphia)** | Official legislative portal. | Contains "unofficial copies" for "information purposes only" [6]. | N/A (it is the source). | Ongoing. |
| **TheyWorkForYou (UK)** | Aggregates debates/records, adds features. | Publicly states it is "not an official source" but uses official feeds [10]. | Yes (official feeds) [10]. | Continuous. |
| **PlanningAlerts (AU)** | Scrapes local planning sites; emails alerts. | Admits scrapers can break; invites users to help fix them [8]. | Yes. | Daily/varies. |

*Insight:* TheyWorkForYou serves 175,000 monthly users and sees roughly 5,000 visits from within Parliament itself [10]. Despite this massive reach, they faced controversies over simplified metrics and had to adjust by adding explanatory text [11]. This proves that even highly trusted civic tools must strictly limit interpretive framing and rely heavily on raw, official data.

## Product UX and Copy

Design choices should drive users to confirm details in the official record before taking any action.
* **Top-of-card components:** Label, official source CTA, timestamp, and data-status badge.
* **In-text cues:** Use inline footnotes that deep-link to relevant sections of the official notice.
* **Uncertainty indicators:** Display "Some details may be incomplete" when parsing is partial.
* **Feedback affordances:** Include "Report an issue" and "Was this accurate?" buttons with reason codes.

## Monitoring, Incident Response, and Continuous Improvement

Close the loop with metrics, alerts, and transparent communications.
* **Metrics:** Track the percentage of auto-published vs. reviewed items, user flag rates, unpublish counts, and field-level error rates.
* **Alerts:** Set up monitoring for spikes in parsing failures, source site changes, or surges in user flags.
* **Communications:** Utilize "What's new" and known-issues banners to inform users of system updates or degraded states, aligning with Microsoft's guideline to notify users about changes [3].

## Legal and Trust Posture

Adopt widely used `.gov` disclaimer constructs to reduce liability and user confusion.
* Use language modeled on USCIS and WA DOL translate disclaimers [4] [5] and Legistar's "unofficial/as is" terms [7] [6].
* Avoid implying legal sufficiency; never use the word "accurate" without qualification.
* Maintain a clear "How we get this data" page describing update cadences and sources, similar to Councilmatic's About page [9].

## Go/No-Go and Launch Checklist

Do not launch auto-publish until the critical-field gates and official-link CTAs are live.

* **Must-have before launch:**
 * Deterministic checks for address/parcel, meeting datetime, type, and deadlines.
 * Persistent "interpretation, not official" banner.
 * "Open official record" CTA + timestamp.
 * Admin queue + rollback functionality.
* **Nice-to-have within first week:**
 * User flagging; known-issues banner; uncertainty cues.
* **No-go conditions:**
 * Missing source links or timestamps.
 * Inability to parse and verify critical fields with high confidence.
 * Hearing windows <7 days without human review capacity.

## References

1. *AI Hallucinations: What Designers Need to Know - NN/G*. https://www.nngroup.com/articles/ai-hallucinations
2. *Guidelines for Human-AI Interaction*. https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/
3. *Guidelines for Human-AI Interaction*. https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf
4. *Google™ Translate disclaimer | Washington State Department of Licensing*. https://dol.wa.gov/google-translate-disclaimer
5. *Website Policies | USCIS*. https://www.uscis.gov/website-policies
6. *
	City of Philadelphia - Welcome
*. https://phila.legistar.com/
7. *
	The New York City Council - Terms Of Use
*. https://nyc.legistar.com/Terms.aspx
8. *
    Help | Planning Alerts
*. https://www.planningalerts.org.au/faq
9. *About - Chicago Councilmatic*. https://chicago.councilmatic.org/about/
10. *TheyWorkForYou strives to be unbiased, reliable and truthful. Here’s how. / mySociety*. https://www.mysociety.org/2017/09/19/theyworkforyou-strives-to-be-unbiased-reliable-and-truthful-heres-how/
11. *TheyWorkForYou - Wikipedia*. https://en.wikipedia.org/wiki/TheyWorkForYou