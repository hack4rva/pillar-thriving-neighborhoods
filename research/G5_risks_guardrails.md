# Demo-Safe by Design: Non-Negotiable Guardrails for Thriving Neighborhoods Prototypes

## Executive Summary
Municipal data prototypes carry inherent risks when presented to the public and judges. If a tool implies official authority, users may make real-world housing or development decisions based on incomplete or outdated information. To prevent this, hackathon teams building Thriving Neighborhoods prototypes must implement seven non-negotiable guardrails: source transparency, AI summary labeling, scope claims, compliance neutrality, eligibility neutrality, data completeness, and official deference. 

By adopting the same disclaimer standards used by major cities like Boston, New York, and San Francisco, teams can convert risky demos into responsible, civic-grade applications. This report provides the evidence base, failure scenarios, copy-paste disclaimer templates, and a pre-demo pass/fail checklist to ensure your prototype is safe to showcase.

## Why These Guardrails Matter Now

Municipal disclaimers set a high bar for neutrality and provenance; adopting them converts risky demos into responsible ones. When building civic tech, the line between a helpful prototype and a harmful misrepresentation is thin. 

### Rapid-risk profile for civic demos
Most failures stem from implied official determinations, stale data, and unlabeled AI text. If your UI defaults to a single "answer" without uncertainty language (e.g., a parcel highlighted as "Compliant"), users infer approval. Municipal disclaimers explicitly reject this inference. Replacing deterministic language with conditional phrasing and citing data currency protects residents from misinformation, protects judges from endorsing non-compliant tools, and protects your team from disqualification.

## The Seven Non-Negotiables

What your prototype must do to be demo-safe. Implement all 7 guardrails to ensure compliance with civic tech standards.

### Guardrail definitions with do/don't examples
Concrete, UI-level examples make compliance unambiguous for the team:
* **Source transparency:** Every piece of information must show where it came from and when it was last updated. *Do:* "Source: NYC Open Data (Updated: 2026-02-01)." *Don't:* "Zoning: R7A."
* **AI summary labeling:** Any AI-generated content must be labeled as an interpretation and linked to the original official document. *Do:* "AI-generated interpretation—verify against official document." *Don't:* "Here is the zoning rule."
* **Scope claims:** Tools must state explicitly what they do and do not cover. *Do:* "Covers 2025 building permits; excludes historical data." *Don't:* Leave users guessing if the map shows all active permits.
* **Compliance neutrality:** No tool should imply a development is compliant or non-compliant without official City determination. *Do:* "Potentially relevant rules identified." *Don't:* "Project is Compliant."
* **Eligibility neutrality:** No tool should imply a person qualifies or does not qualify for housing programs. *Do:* "You may be eligible—official screening required." *Don't:* "You qualify for affordable housing."
* **Data completeness:** Tools must state explicitly that data may not be complete or current. *Do:* "Data is provided 'as is' and may not be complete." *Don't:* Present the data as a flawless single source of truth.
* **Official deference:** All tools must direct users to official City sources for authoritative information. *Do:* "Go to official source for determinations." *Don't:* Bury the city link in a footer.

## Evidence Base from Cities and Open Data

City disclaimers consistently require informational-only use, accuracy caveats, and official deference. The quality and completeness of metadata must have the same importance as the quality of the data itself [1].

| Source | Key Disclaimer Theme | Evidence Snippet |
| :--- | :--- | :--- |
| **Boston Zoning Viewer** | Official deference; not authoritative for discrepancies | "The signed Code Maps... remain the official Zoning documents. If discrepancies exist, the official signed Code Maps shall be considered correct." [2] |
| **City of Perrysburg Zoning** | Compliance neutrality; consult officials | "For reference purposes only... consult the Planning and Zoning Division directly for official determinations... assumes no liability..." [3] |
| **Mass.gov Compilation** | Not legal description; accuracy not guaranteed | "Not a legal document... cannot guarantee accuracy... departments will not necessarily approve applications based solely on GIS data." [4] |
| **NYC DataPortal Terms** | Mandatory third-party disclaimer text | "Users... must include: 'The City of New York can not vouch for the accuracy or completeness...'" [5] |
| **Socrata Dataset Primer** | Exposes Updated, Data Last Updated, Metadata Last Updated | "Updated - This will use the most recently updated time of Data Last Updated, Metadata Last Updated, and Date Created." [6] |

These precedents demonstrate that "informational only" is the municipal norm, not a nice-to-have.

## Failure Cases and How to Avoid Them

Most risks can be neutralized with wording, links, and metadata in minutes.

### Scenario 1: The "Compliant" Badge
* **Failure:** A parcel is highlighted with a green "Compliant" badge.
* **Fix:** Replace with "Potentially applicable rules; confirm with [Dept]" and add a link to the official zoning office.

### Scenario 2: The "You Qualify" AI Message
* **Failure:** A chatbot tells a user, "You qualify for the housing lottery."
* **Fix:** Replace with "You may be eligible; official screening required" and link directly to the official housing portal.

### Scenario 3: The Stale Dataset
* **Failure:** A map shows eviction data without a date, leading users to think it is real-time.
* **Fix:** Show "Data last updated: [date]" prominently on the card and add a "Report an issue" link.

## Pre-Demo Guardrail Checklist

A single-page checklist with pass/fail and prescribed fixes catches 90% of issues before judges do. Run this final gate checklist with binary outcomes and quick fixes.

| Guardrail | Pass/Fail | Risk if Violated | Fix if Failing |
| :--- | :--- | :--- | :--- |
| **1. Source Transparency** | [ ] Pass [ ] Fail | Users make decisions on outdated data; undermines trust. | Auto-pull and render "Last updated: [Date]" next to each data point. |
| **2. AI Summary Labeling** | [ ] Pass [ ] Fail | AI hallucinations are taken as official city policy. | Use a distinct icon + tooltip: "AI summary—verify against official document." |
| **3. Scope Claims** | [ ] Pass [ ] Fail | Users assume the tool covers edge cases it actually ignores. | Add a "Scope" drawer: "Covers A/B datasets; Excludes C; Not for legal use." |
| **4. Compliance Neutrality** | [ ] Pass [ ] Fail | Legal misrepresentation of zoning/building codes. | Replace binary badges with "Potentially relevant rules identified." |
| **5. Eligibility Neutrality** | [ ] Pass [ ] Fail | False hope or wrongful discouragement for housing applicants. | Replace outcomes with "You may be eligible—official screening required." |
| **6. Data Completeness** | [ ] Pass [ ] Fail | Disqualification for violating Open Data Terms of Use. | Embed required city disclaimers verbatim; add a "Report a data issue" link. |
| **7. Official Deference** | [ ] Pass [ ] Fail | Tool acts as a false authoritative source. | Add inline "Go to official source" CTAs where decisions are likely. |

## Disclaimer Language Templates

Use battle-tested wording aligned to city precedents to minimize interpretation risk. Copy and paste these into your prototype.

### Informational-Only & Official Deference (Boston/Perrysburg Style)
> "This tool is for informational and reference purposes only and does not constitute an official determination. The official signed Code Maps and documents maintained by the City remain the authoritative sources. If discrepancies exist, the official City documents shall be considered correct. Consult the relevant City Department for official determinations." [2] [3]

### Open Data Accuracy & Completeness (NYC Mandated)
> "The City of New York can not vouch for the accuracy or completeness of data provided by this web site or application or for the usefulness or integrity of the web site or application. This site provides applications using data that has been modified for use from its original source, NYC.gov, the official web site of the City of New York." [5]

### AI-Generated Interpretation Label
> "⚠️ **AI-Generated Interpretation:** This summary was generated by artificial intelligence and may contain errors. It is not a legal or official document. Always verify information against the [Link to Official Source]."

### Scope & Eligibility Neutrality
> "This tool covers [Dataset X] and [Dataset Y] only. It does not guarantee accuracy or completeness. Information provided does not determine eligibility for housing programs or compliance with zoning codes. You may be eligible—official screening and application approval by the City is required." [4]

## Implementation Recipes by Stack

Hardwire guardrails into your code so they’re impossible to forget.

### Socrata / Open Data API
Pull the `Updated`, `Data Last Updated`, and `Metadata Last Updated` fields via the API [6]. Render these in your component headers so provenance is visible-by-default.

### Web Map (Leaflet/Mapbox)
Implement a global disclaimer banner on load. For every feature click (info panel), include the source name, the updated date, and a primary button linking to the "Official source."

### Content / LLM
Wrap all AI outputs with a custom React/Vue component that automatically injects the "AI interpretation" label and requires a prop for the `originalDocLink`.

## QA and Sign-Off Workflow

Assign a "guardrail captain" and require two-person sign-off 60 minutes pre-demo.
1. **Assign:** One teammate owns the checklist.
2. **Review:** Walk through the UI, clicking every decision touchpoint.
3. **Verify:** Ensure no deterministic language ("Compliant", "Approved", "Eligible") exists without conditional modifiers ("Potentially", "May be").
4. **Sign-off:** Captain and Team Lead initial the checklist.

## Appendix: Guardrail-to-Evidence Mapping

Each guardrail maps to at least one municipal precedent or open data term so judges can verify alignment.

* **Official Deference:** Boston Zoning Viewer ("official signed Code Maps shall be considered correct") [2].
* **Compliance Neutrality:** City of Perrysburg ("consult the Planning and Zoning Division directly for official determinations") [3].
* **Scope Clarity & Data Completeness:** Mass.gov compilation ("cannot guarantee accuracy... departments will not necessarily approve applications based solely on GIS data") [4]; DataSF ("subject to error, and cannot be relied upon without verification") [7].
* **Mandatory Disclaimers:** NYC DataPortal Terms of Use (requires specific disclaimer text for third-party apps) [5].
* **Source Transparency:** Socrata Dataset Primer (exposes Data Last Updated and Metadata Last Updated) [6].

## References

1. *The Critical Role of Metadata Management in Open Data ...*. https://www.mdpi.com/2071-1050/10/2/545
2. *Zoning Viewer | City Of Boston Planning Department*. https://maps.bostonplans.org/zoningviewer/
3. *Planning & Zoning - Perrysburg*. https://maps.ci.perrysburg.oh.us/portal/apps/experiencebuilder/experience/?id=b084202135104ff0ad7f88a794918fec
4. *Disclaimers for maps and data | Mass.gov*. https://www.mass.gov/info-details/disclaimers-for-maps-and-data
5. *NYC DataPortal Terms of Use*. https://www.nyc.gov/html/datamine/html/data/terms.html?dataSetJs=raw
6. *Data & Insights "Primer", a Dataset's Landing Page – Data & Insights Client Center*. https://support.socrata.com/hc/en-us/articles/221691947-Data-Insights-Primer-a-Dataset-s-Landing-Page
7. *Data Policies - San Francisco*. https://www.sfgov.org/data-policies