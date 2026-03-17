# No-Hype Demo Playbook for Thriving Neighborhoods

## Executive Summary
To win over judges with a civic tech prototype, you must balance ambition with profound operational realism. Transparency alone does not drive action; civic technology must be embedded in existing community institutions and workflows to be effective [1]. This playbook provides the exact framing, scripts, and defensive Q&A needed to present the Thriving Neighborhoods prototype. 

The core strategy is to anchor your credibility in official sources while naming your limitations upfront. By framing the tool as a "staff-support prototype" rather than a magic bullet, you avoid the skepticism that plagues over-hyped tech pitches. You will demonstrate rigorous AI governance by aligning with the NIST AI Risk Management Framework (AI RMF), ensuring human oversight and transparency [2] [3]. Furthermore, by using Federal Plain Language guidelines—such as leading with the bottom line and using active voice [4] [5] —you will compress complex data provenance into 10-second micro-scripts that any non-technical judge can instantly grasp.

## 1) Demo North Star — A no-hype story judges can trust

Lead with resident impact and staff usability, not technology novelty. Use plain language and precise scoping to build immediate trust. Civic tech projects often fail when builders create what they want instead of what users actually need and use [6]. 

### 1.1 Opening Script (10–12 seconds) — Urgency without overclaiming
Name the problem’s stakes and who is affected, but avoid promising outcomes you cannot control. 

**Script:** *"City staff are overwhelmed by hundreds of pages of land-use agendas, making it hard to spot displacement risks before it's too late. We built a staff-support prototype that flags at-risk parcels early in the planning workflow, giving the City the head start they need to protect vulnerable neighborhoods."*

### 1.2 Problem Framing Do/Don’t

Replace sweeping claims with measurable, near-term staff and resident benefits.

| Problem Phrase (Don't Say) | Why it Triggers Skepticism | Better Alternative (Say This) |
| :--- | :--- | :--- |
| "This tool will solve displacement in Richmond." | Overstates capability; displacement is a complex socioeconomic issue, not a software bug. | "This tool gives staff the early visibility needed to apply anti-displacement policies effectively." |
| "We are disrupting how the City handles zoning." | Government partners resist "disruption"; they need reliable augmentation. | "We are slotting into the City Clerk and Planning departments' existing agenda prep workflows." |
| "Citizens are completely in the dark." | Insults existing transparency efforts and community organizers. | "Residents and staff need a faster way to parse dense, 300-page council packets." |

*Takeaway:* Judges reward precise scoping. Frame the problem around workflow bottlenecks and information asymmetry, not systemic societal failures that a single app cannot fix.

## 2) Solution Description — Capabilities, limits, and who it’s for

Position the prototype as a "staff-support prototype" with deep link-backs and human oversight. Specify exactly what it does today versus what is planned for later.

### 2.1 What it does today vs not yet

Prevent scope creep by explicitly listing supports and exclusions.

**What it does today:**
* **Summarizes and Flags:** Generates plain-language summaries of dense agenda items and flags potential neighborhood impacts.
* **Provides Link-Backs:** Routes users directly to the official City Council record and open data portals.
* **Maintains Human Oversight:** Keeps staff in the decision-making seat, acting as an assistant, not an autonomous decider.

**What it does NOT do (and why):**
* **No Automated Determinations:** It does not approve or deny permits.
* **No PII Intake:** It does not collect Personally Identifying Information (PII) from residents, avoiding complex privacy liabilities and drop-off risks [7].
* **No Replacement of Official Records:** It does not serve as the legal system of record.

### 2.2 Trust and Risk Controls (NIST AI RMF-aligned)

To govern AI risk, the prototype aligns with the NIST AI Risk Management Framework's core functions: GOVERN, MAP, MEASURE, and MANAGE [3]. 

* **Human-in-the-loop:** AI systems lack human judgment and contextual awareness; human oversight is an essential safeguard [8]. Every AI summary is paired with a confidence flag and an easy "Report issue" button.
* **Accountability and Transparency:** Transparency reflects the extent to which information about an AI system and its outputs is available [3]. We provide clear documentation of data provenance and decision-making rationales [2].
* **Accuracy Sampling:** We commit to a review log and periodic accuracy sampling to ensure the model remains valid and reliable.

## 3) Data in 10 Seconds — Plain-language micro-scripts + provenance

Compress each data source into one sentence: what it is, why it matters, how fresh it is, and where to verify. Use common, everyday words and avoid technical jargon [9] [10].

### 3.1 Data Source Explainers

| Source | 10-sec explanation | Typical cadence | Known limits (with numbers) | Link-back language |
| :--- | :--- | :--- | :--- | :--- |
| **Legistar (Granicus)** | "The City’s official agenda/minutes system; we fetch item details and link back to the Council record." | Per agenda posting cycle | Not every attachment is structured; late add-ons happen. | "View in official City Council record" |
| **GeoHub (ArcGIS Hub)** | "The City’s open map library; we overlay zoning, parcels, and infrastructure from here." | As departments update layers | Layer freshness varies by department. | "Open layer in City GeoHub" |
| **HUD CHAS/AFFH/Income Limits** | "Neighborhood facts like cost burden and income bands from HUD; strong coverage with privacy protections." | Annual/multi-year | 96% of public housing/PBRA/multifamily and 84% of LIHTC have precise geocodes; <11-household data suppressed [11]. | "See HUD methodology" |

*Takeaway:* Acknowledging data limitations—such as HUD omitting properties with fewer than 11 households to ensure confidentiality [11] —builds immense credibility with technical judges.

## 4) Continuation Pathway — From demo to adoption without "pilotitis"

Many civic tech pilots stall without a concrete path to adoption. Propose a phased, 90-day co-design pilot with defined workflows, metrics, and an adoption decision gate.

### 4.1 90-Day Plan

| Phase | Objective | Owner | Output | Metric |
| :--- | :--- | :--- | :--- | :--- |
| **Day 1-30** | Install read-only in staff sandbox | Tech Team & City IT | Secure, read-only environment live | 100% uptime; zero PII exposure |
| **Day 31-60** | Co-design two staff workflows | Product Team & Planning Staff | Early flagging of at-risk parcels; agenda brief generation | ≥90% summary accuracy sampling |
| **Day 61-90** | Present adoption decision | Project Lead & City Leadership | Final pilot report and Go/No-Go decision | ≥30% staff time saved on packet prep |

*Takeaway:* Concrete responsibilities and measurable outputs show judges you understand enterprise software procurement and change management.

### 4.2 Success/Failure Criteria and Go/No-Go

* **Success Thresholds:** ≥90% summary accuracy sampling; ≥50% of flagged items acted upon by staff; ≥30% staff time saved on baseline packet prep.
* **Failure Modes & Remediations:** If accuracy drops below 90%, we revert to manual review and retrain the prompt logic. If staff adoption is low, we conduct usability testing to identify workflow friction.

## 5) Language That Signals Credibility vs Triggers Skepticism

Specific phrases earn trust; hype phrases raise red flags. Swap them deliberately.

### 5.1 Avoid–Use–Instead

| Problem phrase | Why it triggers skepticism | Better alternative (exact wording) |
| :--- | :--- | :--- |
| "Official City tool" | Implies a finalized procurement and legal endorsement that doesn't exist yet. | "This is a staff-support prototype." |
| "Real-time alerts" | Legislative data is scheduled, not real-time. Agendas post days in advance. | "Timely alerts when agendas post or change." |
| "AI makes the decisions" | Violates NIST AI RMF principles of human oversight and accountability [2] [3]. | "AI drafts the summary; staff remains the decision-maker." |
| "We collect all resident data" | Raises massive privacy, security, and PII compliance red flags [7]. | "We don't collect resident PII; we use only public records and published open data." |

*Takeaway:* Judges are listening for risk awareness. Using the "Better alternative" phrases proves you understand the regulatory and operational environment of local government.

## 6) Hard Judge Questions — Crisp, defensible answers

Pre-baked, 1–2 sentence answers that cite provenance, oversight, and adoption reality.

### 6.1 The Big Five Q&A

**1. What if the AI summary is wrong?**
"Every AI summary is paired with a direct link to the official source document, a confidence flag, and an easy 'Report issue' button. Staff always remain in the loop as the final reviewers, aligning with NIST AI Risk Management guidelines."

**2. What about data privacy?**
"We do not collect resident PII. We rely strictly on public records and open data. Where we use HUD data, small counts under 11 households are intentionally suppressed by design to protect privacy."

**3. Would the City actually use this?**
"Yes, because we aren't asking them to adopt a new destination platform. We are embedding this directly into their existing agenda prep and case triage workflows, which is how successful civic tech scales."

**4. Are these 'real-time' alerts?**
"They are 'timely' rather than real-time. We sync with the City's actual publishing cadence—fetching data as soon as agendas are officially posted to Legistar or layers are updated in GeoHub."

**5. Does this solve displacement?**
"No software solves displacement on its own. What this does is solve the *information bottleneck*, giving staff and organizers the early visibility they need to apply existing anti-displacement policies before a vote happens."

## 7) Word-for-Word Scripts — Open, Solution, Data, Close

Tight scripts, active voice, 10–12 seconds each, with embedded credibility cues.

### 7.1 Opening (problem)
"City staff and residents are overwhelmed by 300-page land-use agendas, making it hard to spot displacement risks early. We built a staff-support prototype that flags at-risk parcels during the planning workflow, giving the City a head start to protect vulnerable neighborhoods."

### 7.2 Solution (capabilities + limits)
"Our prototype uses AI to summarize dense packets in minutes, but it never replaces human judgment. Every summary includes a confidence score and links directly back to the official City Council record, ensuring staff remain the final decision-makers."

### 7.3 Data (10-second triad)
"We pull from three official sources: Legistar for the City's agenda system, GeoHub for the City's open map layers, and HUD for neighborhood facts. We refresh on the City's publishing cadence and respect all built-in privacy suppressions."

### 7.4 Close (continuation path)
"To move beyond a pilot, we are proposing a 90-day co-design phase with City Planning. We will test this in a read-only sandbox, measure staff time saved, and require a 90% accuracy threshold before any formal adoption decision."

## 8) Visual Aids — One-slide demo anatomy

When showing the UI, explicitly point out the features that mitigate risk and build trust.

* **"Link to official record":** Highlight the prominent button routing users to Legistar or GeoHub. Narrate: *"We never replace the source; we route you to it."*
* **"Data last updated":** Show the timestamp in the footer to set realistic expectations about data freshness.
* **"Confidence flag" & "Report issue":** Point to the AI transparency markers. Narrate: *"This is our human-in-the-loop safeguard, ensuring accountability."*
* **"Data source + known gaps":** Show the disclaimer line (e.g., "HUD data; <11 households suppressed").

## 9) Appendix — Evidence and Standards

### 9.1 Citations snapshot
* **HUD Data Coverage & Privacy:** Over 96% of Public Housing/PBRA/multifamily properties and 84% of LIHTC properties have precise spatial information; data on properties with fewer than 11 households are omitted to ensure confidentiality [11].
* **NIST AI RMF 1.0:** Emphasizes human oversight, accountability, and transparency. The core functions are GOVERN, MAP, MEASURE, and MANAGE [2] [3].
* **Plain Language:** Federal guidelines dictate writing for your audience, using active voice, keeping sentences short, and omitting unnecessary words [4] [10] [5].
* **Civic Tech Realities:** Civic technology must start with the citizen and embed tools in existing community institutions rather than creating new ones [1]. Projects often fail when they build what they want instead of what people actually use [6].
* **Data Privacy & Trust:** Providing additional explanation on *why* and *how* sensitive data is used is critical in building trust and assuaging anxiety [7].

## References

1. *Transparency is Insufficient: Lessons From Civic Technology for Anticorruption – Ash Center*. https://ash.harvard.edu/articles/transparency-is-insufficient-lessons-from-civic-technology-for-anticorruption/
2. *NIST AI Risk Management Framework (AI RMF) - Palo Alto Networks*. https://www.paloaltonetworks.com/cyberpedia/nist-ai-risk-management-framework
3. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*. https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf
4. *Principles of plain language | Digital.gov*. https://digital.gov/guides/plain-language/principles
5. *Federal Plain Language Guidelines*. https://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/static/companion.websites/9780199379996/pdf/ch2/FederalPLGuidelines.pdf
6. *Matt Stempeck on the Civic Tech Field Guide and why projects succeed or fail*. https://democracyinnovators.com/matt-stempeck-on-the-civic-tech-field-guide-and-why-projects-succeed-or-fail/
7. *Creating Government Forms that Build Trust — Code for America*. https://codeforamerica.org/news/creating-government-forms-that-build-trust/
8. *AI RMF 1.0: Human Oversight Principles Explained*. https://www.livingsecurity.com/blog/nist-ai-risk-management-oversight
9. *Plain Language*. https://www.opm.gov/information-management/plain-language/
10. *Plain Language Quick Reference Guide*. https://www.dol.gov/sites/dolgov/files/general/Plain-Language-Quick-Reference-Guide.pdf
11. *AFFH Data Documentation*. https://nhlp.org/files/FN%202037%20HUD,%20AFFH%20Data%20Documentation%20(Apr.%202016).pdf