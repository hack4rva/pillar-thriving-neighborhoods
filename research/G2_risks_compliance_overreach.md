> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Designing Housing Monitoring Tools That Inform—Not Decide

## Executive Summary
Compliance determinations in funded housing are formal government adjudications, not software outputs. When a municipal housing compliance monitoring tool inadvertently crosses the line from "surfacing information" to "making a determination," it exposes the City to significant legal, reputational, and operational risks. Federal guidelines, such as those from the IRS and HUD, mandate strict due-process sequences—including formal written notice and mandatory correction periods—before a property is officially deemed non-compliant. 

If a software tool preempts this sequence through poorly chosen language (e.g., "Pass/Fail"), color semantics (e.g., red/green stoplights), or uncontextualized thresholds, it risks triggering automation bias among staff and public defamation claims from developers. Furthermore, under federal AI risk management guidelines (OMB M-24-10), systems that serve as the principal basis for decisions regarding housing are considered "rights-impacting" and require heightened human oversight, notice, and appeal mechanisms. To mitigate these risks, the City must architect its monitoring tools to act strictly as advisory "review cockpits" that flag potential discrepancies for human verification, rather than verdict engines that dispense automated sanctions.

## 1) What constitutes a "compliance determination" and who can make one — formal authority and due process

### The Legal Sequence of Compliance Adjudication
In funded housing programs, a compliance determination is a formal, human act executed by authorized government officials after a prescribed due-process sequence. It is not a real-time software event. For example, under the Low-Income Housing Tax Credit (LIHTC) program, state and local housing credit agencies are responsible for monitoring properties, performing desk audits, and reviewing tenant files [1]. However, the monitoring agency does not make the final legal determination of non-compliance. 

When a potential issue is identified, the state agency must provide prompt written notice to the owner, initiating a formal correction period [1]. This correction period generally lasts up to 90 days, with the possibility of an extension up to 6 months for good cause [1]. Only after this period does the agency file Form 8823 with the IRS, and it is the IRS—not the monitoring body or its software—that is responsible for determining whether the owner is out of compliance for purposes of the tax code [1]. Similarly, HUD's CPD Monitoring Handbook relies on federal reviewers using structured exhibits to assess grantee compliance via documented procedures [2]. 

### Implications for Software Design
Because formal compliance status carries legal effect and follows a strict notice-and-cure sequence, software tools must not be treated or presented as binding adjudicators. If a tool preempts this sequence by labeling a property "non-compliant" before the owner has received written notice and a cure period, the City risks due-process challenges. The tool must be designed to mirror these workflows, gating any formal status changes behind authorized human sign-offs.

## 2) Overreach pathways — how tools inadvertently imply compliance/non-compliance

### The Danger of UI Semantics and Automation Bias
Software tools often inadvertently imply final determinations through user interface (UI) choices. "Stoplight" dashboards, "pass/fail" badges, and rigid threshold scores nudge both staff and the public to read advisory data as a final verdict. The U.S. Web Design System (USWDS) and Web Content Accessibility Guidelines (WCAG) explicitly warn against using color exclusively to convey meaning, noting that color is an unreliable signal that can be misinterpreted [3] [4]. 

Furthermore, the NIST AI Risk Management Framework (AI RMF 1.0) warns of automation bias, where humans overweight model outputs and lose necessary context [5]. When a system presents a red "X" next to a property, reviewers are psychologically primed to treat the flag as a fact, potentially skipping critical inquiry and accelerating erroneous enforcement actions.

### Language and UI Guardrails

| Element Type | Avoid These Patterns | Safer Alternatives | Rationale |
| :--- | :--- | :--- | :--- |
| **Terminology** | "Compliant," "Non-compliant," "Violation," "Pass/Fail," "Determination," "Strike" | "Needs staff review," "Potential discrepancy," "Awaiting documentation," "Preliminary indicator" | Prevents users from interpreting advisory flags as legally binding adjudications. |
| **Color Coding** | Red/green stoplights; color-only status indicators | Neutral info tags; USWDS-compliant status components with text labels | Complies with WCAG 1.4.1 [3] and prevents color-based misinterpretation [4]. |
| **Iconography** | Red X's, green checkmarks, warning sirens | Timestamps ("as of [Date]"), info tooltips, document icons | Shifts the focus from "verdict" to "data freshness and source." |
| **Workflows** | Auto-sent violation notices; auto-publishing to public portals | "View context/exceptions" links; supervisor approval gates | Ensures human-in-the-loop oversight and respects mandatory cure periods. |

*Takeaway: Replacing verdict-oriented language and colors with neutral, workflow-oriented indicators reduces automation bias and aligns the UI with the tool's advisory nature.*

## 3) Legal and reputational consequences of incorrect flags

### Due Process, Equity, and Trust Risks
Premature or erroneous public flags can trigger severe legal and reputational harm. If a tool incorrectly flags a development as non-compliant on a public-facing dashboard, it effectively sanctions the developer without due process, inverting the legally required notice-and-cure order [1]. 

Federal guidance from the Office of Management and Budget (OMB M-24-10) classifies AI and automated systems used in housing access and tenant screening as presumptively "rights-impacting" [6]. Such systems require rigorous human oversight, notice to negatively affected individuals, and mechanisms for appeal [6]. Failing to provide these safeguards can lead to claims of arbitrary government action, chilled developer participation in municipal programs, and a severe erosion of regulatory trust.

### Risk Assessment Matrix

| Risk Scenario | Severity | Likelihood | Impact Description |
| :--- | :--- | :--- | :--- |
| **Premature public "non-compliant" label** | High | Medium | Conflicts with statutory notice-and-cure periods [1]; causes reputational damage to developers; invites defamation claims. |
| **Developer-City relationship erosion** | High | Medium-High | Premature public allegations create adversarial relationships and chill future participation in affordable housing programs. |
| **Automation bias leading to wrongful notice** | Medium-High | Medium-High | Staff over-rely on tool outputs [5], skipping manual verification and issuing erroneous enforcement letters. |
| **Threshold-driven disparate impact** | Medium-High | Medium | Rigid data triggers misfire due to latency or exceptions, potentially systematizing discrimination in rights-impacting contexts [6]. |
| **Accessibility noncompliance** | Medium | Medium-High | Use of color-only indicators violates WCAG 1.4.1 [3] and Section 508, creating separate legal exposure. |

*Takeaway: The highest severity risks stem from public misrepresentation and the erosion of developer trust, necessitating strict controls over what data is made public and how it is framed.*

## 4) Difference between "surfacing info" and "making a determination" — clear operational boundary

### Defining the Boundary
The operational boundary between a support tool and an automated adjudicator is crossed when the tool's output becomes the principal basis for an adverse action or is presented as final. OMB M-24-10 defines "rights-impacting AI" as systems whose output serves as a "principal basis for a decision or action" concerning an individual's or entity's access to housing or equal opportunities [6]. 

To remain safely on the "surfacing information" side of the boundary, the tool must be configured strictly as a triage signal. It should assemble dossiers, highlight data discrepancies, and track review workflows. Decisions must require a designated official's sign-off, accompanied by documented evidence and human rationale, ensuring the software informs the human rather than replacing them [5].

## 5) Required disclaimer language — templates you can adopt and adapt

### Mitigating Risk Through Clear Caveats
While disclaimers do not cure harmful workflows, they are essential for reducing misinterpretation on public portals and API endpoints. Best practices from federal agencies like the DOJ and HHS emphasize that online information is for "general informational purposes only," does not constitute legal advice, and carries no warranties regarding accuracy or completeness [7] [8]. NYC Open Data similarly disclaims warranties of accuracy for its public datasets [9].

**Recommended Disclaimer Template:**
* **Informational Use:** "This dashboard is for informational purposes only and does not constitute a compliance determination, legal advice, or a formal notice of violation."
* **Status Caveat:** "Displayed indicators are preliminary and subject to staff review. Determinations, if any, are issued only by authorized City officials via formal written notice following applicable cure periods."
* **No Warranties:** "The City makes no claims, promises, or guarantees about the accuracy, completeness, or timeliness of the data and expressly disclaims liability for errors or omissions."
* **Data Context:** "Values are as-of [Timestamp]. Sources and methodologies are described [Here]."

## 6) Designing a staff-support tool that helps without overreaching

### Building a Review Cockpit
To prevent overreach, the tool must be optimized for context, evidence, and workflow. It should feature evidence panels showing source documents and collection dates, alongside data quality and freshness badges. 

### Mitigation Mapping

| Overreach Risk | Targeted Mitigations |
| :--- | :--- |
| **Implicit determinations via language** | Implement strict content design reviews; restrict vocabulary to neutral terms (e.g., "Needs review"); conduct pre-launch copy audits. |
| **Color semantics implying verdicts** | Adopt USWDS status components; mandate icon + text labels; prohibit red/green binary indicators [3] [4]. |
| **Threshold misclassification** | Provide context tooltips and exception catalogs; establish a threshold review board; display "common false positive reasons" next to flags. |
| **Automation bias** | Require staff to enter written rationale before advancing cases; implement second-reader checks and supervisor review queues [5]. |
| **Public misinterpretation** | Restrict project-level views to authenticated internal staff; limit public dashboards to aggregate trends only; require approvals to publish. |

*Takeaway: Technical controls, such as role-based access and mandatory rationale fields, are required to enforce the tool's advisory nature and prevent staff from rubber-stamping automated flags.*

## 7) Safe framing patterns for compliance-adjacent information

### Framing Data as Quality Checks
When presenting compliance-adjacent information, the framing must emphasize data quality and monitoring rather than compliance ratings. 

* **Data Quality Checks:** "This check compares reported rents to current limits as of [Date]. Differences may reflect timing or exceptions; staff review is required."
* **Preliminary Indicators:** "Preliminary indicator based on [Source]. Not reviewed. Do not contact owner based on this indicator."
* **Awaiting Documentation:** "Document [Name] not found as of [Date]. Owner may have submitted via alternate channel."
* **Public Views:** Show aggregate counts (e.g., "% of projects with missing documents last quarter") with methodology notes, completely omitting project names.

## 8) Accessibility and UX compliance essentials

### Accessibility as a Risk Mitigant
Accessibility compliance is not just a legal mandate; it directly mitigates the risk of implied determinations. WCAG 2.1 Success Criterion 1.4.1 strictly prohibits using color as the only visual means of conveying information, indicating an action, or prompting a response [3]. The USWDS reinforces that color insensitivity affects a significant portion of the population, making color an unreliable primary signal [4]. By requiring text labels and programmatic indicators alongside any color cues, the City ensures that statuses are read as specific data states rather than generalized "pass/fail" verdicts.

## 9) Alignment with AI risk management best practices

### Applying Rights-Impacting Safeguards
Even if the monitoring tool is not strictly "AI," it operates in a high-stakes domain. OMB M-24-10 presumes that systems influencing housing access or tenant monitoring are "rights-impacting" [6]. Agencies using such systems must conduct impact assessments, ensure adequate human training, provide notice to negatively affected individuals, and maintain human consideration and remedy processes (appeals) [6]. Similarly, the NIST AI RMF emphasizes the need to clearly define human roles in decision-making to combat systemic biases and automation overreliance [5].

## 10) Rollout, training, and continuous assurance

### Phased Implementation and Auditing
To safely deploy the tool, the City should begin with a phased internal pilot in "shadow mode," where the tool operates without triggering any owner contact until false-positive rates are measured and deemed acceptable. 

Staff training modules must cover due process steps, how to read uncertainty and data freshness indicators, and the recognition of policy exceptions. Key Performance Indicators (KPIs) should include the false-positive rate, time-to-staff-review, and the reversal rate after owner input. Finally, the City should establish a quarterly threshold review board to audit the system for drift and ensure it remains a supportive instrument rather than an automated adjudicator.

## References

1. *Guide for Completing Form 8823*. https://www.irs.gov/pub/irs-pdf/p5913.pdf
2. *CPD Monitoring Handbook (6509.2) | HUD.gov / U.S. Department of Housing and Urban Development (HUD)*. http://www.hud.gov/hudclips/handbooks/cpd-6509-2
3. *Understanding Success Criterion 1.4.1: Use of Color | WAI | W3C*. https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
4. *Using color | U.S. Web Design System (USWDS)*. https://designsystem.digital.gov/design-tokens/color/overview/
5. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*. https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf
6. *M-24-10 MEMORANDUM FOR THE HEADS OF ...*. https://www.whitehouse.gov/wp-content/uploads/2024/03/M-24-10-Advancing-Governance-Innovation-and-Risk-Management-for-Agency-Use-of-Artificial-Intelligence.pdf
7. * Department of Justice |  Legal Policies and Disclaimers*. https://www.justice.gov/legalpolicies
8. *Website Disclaimers | HHS.gov*. https://www.hhs.gov/web/policies-and-standards/hhs-web-policies/disclaimer/index.html
9. *NYC Open Data -   Page not found*. https://opendata.cityofnewyork.us/terms-of-use/