# Richmond housing-development stakeholders: who matters, why, and how to build with them

## Executive Summary
As of March 2026, Richmond's housing and development ecosystem is undergoing a rapid transformation driven by new funding mechanisms, sweeping zoning reforms, and a heightened demand for transparency. City Council unanimously passed a new Affordable Housing Trust Fund (AHTF) ordinance in February 2026 [1], while the Department of Housing and Community Development (HCD) has approved 18 multifamily Performance Grants to date [2]. Simultaneously, the "Code Refresh" initiative is rewriting 50-year-old zoning laws to legalize "missing middle" housing like duplexes and accessory dwelling units (ADUs) by-right [3]. 

For a hackathon team building a civic tech prototype, decision power in Richmond is highly centralized but data remains siloed. The legislative backbone is Legistar [4], while spatial data lives in the city's GeoHub [5]. A successful prototype must bridge these systems to serve the three most critical users: **PDR Zoning Administration staff**, **HCD program staff**, and **vulnerable residents** (particularly given Richmond's historic 11.44% eviction rate) [6]. By securing executive sponsorship from champions like DCAO Sharon Ebert [7], PDR Director Kevin Vonck [8], and HCD Director Merrick Malone [9], teams can transition a weekend prototype into a sustainable, city-adopted tool.

## Purpose and moment — A fast-moving housing agenda needs a clear map
Richmond is in a critical policy window. The city is actively deploying new financial tools and rewriting the rules of land use to address a severe housing shortage. On February 23, 2026, City Council unanimously passed the new Affordable Housing Trust Fund Ordinance, championed by Mayor Danny Avula and Councilmember Ellen Robertson [1] [10]. Concurrently, the city is enforcing updated Short-Term Rental (STR) regulations (Ordinance No. 2023-235, adopted September 2023) [11] and advancing the Code Refresh to align zoning with the Richmond 300 Master Plan [12]. 

With these rapid changes, aligning the right stakeholders to the right data is paramount. A prototype that visualizes policy impacts (like ADU feasibility) or tracks AHTF pipeline projects will find immediate adoption if it serves the specific workflows of city staff and the transparency needs of residents.

## Stakeholder universe at a glance — Who interacts with development and compliance, and why they matter
Decisions in Richmond flow through a defined set of offices and boards, but the impacts land broadly across neighborhoods. Understanding the distinct roles, needs, and anxieties of each group is essential for designing a prototype that survives contact with reality.

| Stakeholder Category | Key Entities & Individuals | Relationship to Core Problem | Prototype "Must-Have" Value | Top Concerns & Risks |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Users** | Residents; PDR Zoning Administration (e.g., Colleen Dang for STRs) [8]; Permits & Inspections [8] | Directly impacted by development; responsible for enforcing complex, evolving codes. | Rapid zoning checks; plain-language explanations of nearby proposals. | Stale data leading to incorrect compliance actions; jargon alienating residents. |
| **Secondary Users** | Planning Commission [13]; Neighborhood Associations; RVA YIMBY [14]; Journalists (VPM News) [3] | Review proposals, advocate for/against density, and shape public narrative. | Shared dashboards tracking pipeline analytics and neighborhood-level impacts. | Misinterpretation of data; lack of context around zoning changes. |
| **Enablers** | Office of the City Clerk (Legistar) [15]; City IT/GIS (GeoHub) [5]; HUD Richmond Field Office [16] | Maintain the systems of record and ensure federal compliance. | Role-based access controls; authoritative source stamps linking to official databases. | FOIA violations; PII exposure; bypassing official IT governance. |
| **Partners** | PlanRVA [17]; 1717 Collective [18]; Better Housing Coalition [19]; RRHA [20] | Provide regional data, convene entrepreneurs, and develop affordable units. | Site-readiness scoring for gap financing; regional trend visualization. | Tools that duplicate existing efforts rather than integrating with them. |
| **Decision-Makers** | Sharon Ebert (DCAO) [7]; Kevin Vonck (PDR Dir.) [8]; Merrick Malone (HCD Dir.) [9]; City Council [4] | Control funding allocations, portfolio strategy, and final legislative approvals. | Executive pipeline visibility; tracking stalled projects and AHTF deployments. | Political blowback from inaccurate public-facing data. |
| **Potential Champions** | Ebert; Vonck; Malone; CM Ellen Robertson [10]; PlanRVA leadership [21] | Possess both the institutional authority and the political will to support civic tech. | A 10-minute demo proving ROI on 1-2 high-impact corridors. | Investing political capital in a tool that cannot be maintained post-hackathon. |

*Takeaway: The ecosystem is highly interdependent. A tool built solely for residents that ignores the City Clerk's Legistar workflows will fail, just as a staff-only tool will fail to address the Mayor's mandate for public transparency.*

## Systems and data rails — Build on Legistar + GeoHub + PDR tools
Do not reinvent the data pipes. Richmond already possesses robust, albeit disconnected, systems of record. A successful hackathon project will act as a crosswalk between these existing databases.

### Legistar is the legislative backbone
The Office of the City Clerk manages Legistar, which houses agendas, minutes, and legislation for City Council, the Planning Commission, and the Board of Zoning Appeals [4] [22] [15]. This is the single source of truth for the status of any development ordinance or special use permit.

### GeoHub's authoritative layers
Maintained by the city, the Richmond GeoHub provides the spatial data necessary for compliance and planning. Key datasets include Zoning Districts, the Richmond Zoning Map, Special Use Permits, and real estate parcels [23] [5] [24]. 

### PDR Interactive Mapping Tools
The Department of Planning and Development Review (PDR) utilizes the Richmond Parcel Mapper for land use projects, allowing staff and the public to query real estate parcels [25]. 

### Integration spec for hackathon teams
To create immediate value, teams should build a crosswalk that links Legistar file IDs, parcel IDs, and zoning districts. Furthermore, routing inquiries to the correct named staff in PDR's directory (e.g., Joshua Young for BZA cases, Colleen Dang for STRs) will drastically reduce triage time [8].

## Policy environment shaping demand — What rules and dollars are changing
New money and rewritten zoning codes create immediate, high-value use cases for site screening and public transparency tools.

### 2026 AHTF ordinance and pipeline needs
With the unanimous passage of the Affordable Housing Trust Fund Ordinance in February 2026 [1], HCD needs tools to track project pipelines and match shovel-ready sites with available funds.

### Performance Grants and missing middle housing
The city is utilizing Performance Grants for multifamily new construction, with 18 grants approved to date [2]. Simultaneously, the Code Refresh aims to legalize "middle housing" like duplexes and ADUs by-right [3]. Prototypes that can simulate the parcel-level impact of these by-right changes will be highly sought after by PDR.

### STR ordinance compliance
Richmond adopted revised Short-Term Rental regulations (Ordinance No. 2023-235) on September 25, 2023 [11]. Zoning Administration staff require tools to cross-reference active STR listings against permitted zoning districts and business licenses.

### HCD Annual Action Plan (FY26)
The city's FY26 plan allocates $788,123 in CDBG funds and $135,898 in HOME funds for administration [2]. The plan also notes continuous efforts to allow ADUs in all residential districts and explores the community benefit of Inclusionary Zoning [2].

## Community risks and equity — Where harms concentrate and how to mitigate
Richmond's push for development must be balanced against severe vulnerabilities in its tenant population. 

### Eviction Lab tracking and ZIP-level targeting
Richmond has historically ranked #2 in the nation for evictions, with an 11.44% eviction rate [6]. Eviction Lab actively tracks filings across Richmond ZIP codes [26]. Any housing tool must include a tenant-safety layer, flagging code enforcement cases and redevelopment sites in high-eviction areas.

### Gilpin Court transparency push
In November 2025, Mayor Avula publicly urged the Richmond Redevelopment and Housing Authority (RRHA) to put residents at the center of public housing decisions, specifically regarding the transformation of Gilpin Court's 781 units into voucher-based housing [27]. Advocates have raised deep concerns over displacement [27]. 

### Resident-facing features
To address these equity risks, prototypes must include plain-language timelines, multilingual access, SMS updates tied to Legistar items, and warm handoffs to legal aid or Greater Richmond Continuum of Care (GRCoC) providers [2].

## Media and narrative shapers — Who will scrutinize and explain the tool
Local journalists play a critical role in translating complex zoning changes to the public. Reporters like Shaban Athuman at VPM News (covering Code Refresh) [3] and George Copeland Jr. at the Richmond Free Press (covering RRHA and public housing) [27] will scrutinize new civic tech. Providing proactive, data-backed explainers and media kits will reduce misinterpretation and build community support.

## Most critical users for hackathon fit — 2–3 to optimize for first
To ensure the prototype survives beyond the weekend, optimize for these three users first:

### 1. PDR Zoning Administration/Enforcement
Staff need speed-to-accuracy on what is allowed where. A rules engine that cross-references the new Code Refresh drafts with GeoHub parcel data will save hours of manual lookup [5] [3].

### 2. HCD Program Staff
Staff managing the AHTF and Performance Grants need pipeline visibility [1] [2]. A site-readiness scoring feature that identifies parcels eligible for gap financing will directly accelerate affordable housing deployment.

### 3. Residents near active cases
Residents need clarity on proposals and how to weigh in. Translating dense Legistar PDFs into SMS alerts or plain-language web pages will fulfill the Mayor's mandate for community-centered transparency [27].

## Potential champions and sponsors — Who can unblock adoption
To move from prototype to pilot, teams must secure buy-in from leaders with both interest and institutional authority:
* **Sharon Ebert**: DCAO for Economic and Community Development, overseeing the broader portfolio [7].
* **Kevin Vonck**: Director of PDR, leading the Code Refresh implementation [8] [12].
* **Merrick Malone**: Director of HCD, controlling federal entitlement funds and the AHTF [28] [9].
* **Ellen Robertson**: City Councilmember (6th District) and co-sponsor of the AHTF ordinance [10] [3].

## Prototype value propositions by stakeholder — What each group actually needs
Tailoring the "jobs to be done" for each group ensures daily utility and mitigates adoption blockers.

| Stakeholder Group | Top 2 Jobs | Prototype Feature | Success Metric | Key Concern | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PDR Staff** | Rapid zoning checks; STR compliance | Rules engine + parcel crosswalk | <2 min to answer zoning queries | Stale data | Weekly auto-sync with GeoHub/Legistar |
| **HCD Staff** | Fundable-site triage; grant tracking | Site-readiness scoring dashboard | 20% faster grant awards | Equity blind spots | Add eviction/displacement risk overlays |
| **Residents** | Understand proposals; track Gilpin updates | Legistar-linked explainers & SMS | 2x increase in informed public comment | Jargon & accessibility | Plain language + translation integration |
| **City Clerk / IT** | Maintain governance; manage records | Access controls + audit logs | Zero FOIA or PII issues | Data security | Strict redaction + retention policies |
| **PlanRVA / Advocates** | Regional trends; housing analytics | Pipeline analytics & shared dashboards | Unified regional reporting | Misuse of data | Clear caveats + authoritative source stamps |

*Takeaway: Every feature must be paired with a specific mitigation strategy. A brilliant UI will be rejected by City IT if it lacks basic audit logs or exposes PII.*

## Post-hackathon continuation — Who to contact and why
To ensure the project doesn't die on demo day, establish a lightweight stewardship model with the following contacts:

### City Ownership
* **DCAO Sharon Ebert**: For portfolio-wide strategic alignment [7].
* **PDR Director Kevin Vonck**: For integration into zoning workflows and Code Refresh [8].
* **HCD Director Merrick Malone**: For alignment with AHTF and federal grant tracking [9].

### City Systems Integration
* **Office of the City Clerk**: To ensure Legistar API/scraping compliance [15].
* **City IT / GIS**: To establish automated data pipelines from GeoHub [5].

### Regional Partners & Conveners
* **PlanRVA**: To serve as the regional data synthesizer and housing analytics partner [17] [21].
* **1717 Collective**: Located at the Michael Wassmer Center for Innovation, they hired a Director of Entrepreneurial Ecosystems in October 2024 and can serve as the convening hub for civic tech showcases [29] [18].
* **HUD Richmond Field Office**: For federal compliance advisement (located at 400 N 8th Street) [16].

## Adoption risks and guardrails — What can go wrong and how to prevent it
Hackathon failure modes are highly predictable in local government. Tools that ignore FOIA, misstate zoning, or bypass IT governance will not be adopted. 

**Risks:**
* **Policy Churn:** Static tools will be outdated within months due to ongoing Code Refresh drafts and STR updates [11] [3].
* **Governance:** Bypassing the City Clerk or IT departments will result in the tool being blocked on city networks.
* **Equity:** Building tools that accelerate development without tracking eviction risks (11.44% rate) could inadvertently accelerate displacement [6].

**Guardrails:**
* Bake in an "Update Manager" that ingests Legistar/GeoHub deltas weekly.
* Apply authoritative data stamps to all outputs so users know exactly when the data was last synced.
* Implement strict role-based access and mandate FOIA reviews for any communication features.

## 30-60-90 day plan — From prototype to pilot
To transition from a weekend hackathon to a deployed civic tool, follow this structured rollout:

### 30 Days: Secure and Schema
Secure executive sponsors (Vonck, Malone). Define the database schema to successfully ingest Legistar cases and GeoHub parcel data. Deliver a Minimum Viable Product (MVP) rules engine focused strictly on ADU and duplex feasibility under the proposed Code Refresh.

### 60 Days: Pilot and Pipeline
Launch a closed pilot with PDR and HCD staff focusing on 1-2 high-impact neighborhoods. Introduce the resident SMS update feature for active BZA cases. Deploy the AHTF and Performance Grant pipeline view for HCD leadership.

### 90 Days: Governance and Expansion
Achieve formal governance sign-off from City IT and the Office of the City Clerk. Release a media explainer kit to local journalists (VPM, RTD). Expand the tool's capabilities to include STR compliance tracking and comprehensive BZA case management.

## References

1. *Mayor Danny's Plan for Affordable Housing | Richmond*. https://rva.gov/mayors-office/more-homes-more-people
2. *PY 2025/FY 2026 Annual Action Plan*. https://rva.gov/sites/default/files/2025-04/PY25FY26%20AAP%20for%20Public%20Comment%20-%204-8-25.pdf
3. *Richmond’s Code Refresh aims to rewrite rules that restrict growth*. https://www.vpm.org/news/2025-09-18/richmond-zoning-code-refresh-update-housing-development-vonck-robertson
4. *
	City of Richmond - Calendar
*. https://richmondva.legistar.com/
5. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/
6. *Eviction Rankings*. https://evictionlab.org/rankings/
7. *Mayor Appoints DCAO for Economic and Community Development, Director of Housing and Community Development, Director of Community Wealth Building | Richmond*. https://www.rva.gov/mayors-office/news/mayor-appoints-dcao-economic-and-community-development-director-housing-and
8. *Staff Directory Department of Planning and Development ...*. http://www.rva.gov/sites/default/files/2024-02/PDR%20Website%20Staff%20Contact%20Directory%20-%20February%2013%202024.pdf
9. *City of Richmond announces staffing updates  | Richmond*. https://www.rva.gov/press-releases-and-announcements/news/city-richmond-announces-staffing-updates
10. *Joint Effort to Address Affordable Housing Crisis: Councilmember Robertson and Mayor Avula Support New Affordable Housing Trust Fund Ordinance | Richmond*. https://rva.gov/press-releases-and-announcements/news/joint-effort-address-affordable-housing-crisis-councilmember
11. *Short-Term Rentals | Richmond*. https://www.rva.gov/planning-development-review/short-term-rentals
12. *Code Refresh | Richmond*. https://www.rva.gov/planning-development-review/code-refresh
13. *Planning Commission | Richmond*. https://www.rva.gov/planning-development-review/planning-commission
14. *
      
        
          RVA YIMBY
        
      
    *. https://rvayimby.org/
15. *Office of City Clerk | Richmond*. https://www.rva.gov/office-city-clerk
16. *Virginia | HUD.gov / U.S. Department of Housing and Urban Development (HUD)*. http://www.hud.gov/states/virginia
17. *Plan RVA*. https://planrva.org/
18. *The 1717 Collective — Bridging Virginia*. https://www.bridgingvirginia.com/resources/1717-collective
19. *Better Housing Coalition | Find a Place to Call Home*. https://www.betterhousingcoalition.org/
20. *Leadership | Richmond Redevelopment & Housing Authority*. https://www.rrha.com/about/leadership/
21. *Housing Work*. https://planrva.org/community-development/housing-work/
22. *City of Richmond - Legislation*. https://richmondva.legistar.com/Legislation.aspx
23. *Zoning Districts | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/zoning-districts-1/about
24. *Richmond Zoning Map*. https://richmond-geo-hub-cor.hub.arcgis.com/search?tags=zoning
25. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
26. *Richmond, Virginia | Eviction Tracking System*. https://evictionlab.org/eviction-tracking/richmond-va/
27. *
			
				Avula proposes collaborative approach to Richmond public housing |  Richmond Free Press | Serving the African American Community in Richmond, VA
			
		*. https://m.richmondfreepress.com/news/2025/nov/26/avula-proposes-collaborative-approach-to-richmond-public-housing/
28. *Staff Directory | Richmond*. https://www.rva.gov/housing-and-community-development/staff-directory
29. *1717 Innovation Center*. https://1717innovationcenter.capitalone.com/