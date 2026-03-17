# Hackathon-Ready Civic Tools: Ranking LA Neighborhood Development Opportunities by Buildability and Credibility

## Executive Summary
When building civic tech under a 48-hour hackathon constraint, maps beat models. Los Angeles provides robust, production-ready spatial datasets—including planning cases, building permits, and affordable housing portfolios—that allow teams to build highly credible, factual tools without the risks associated with generative AI or complex predictive modeling. 

The most viable path for the "Thriving Neighborhoods" pillar is to prioritize visualizing official data. The **Development Proposal Map** emerges as the top recommendation because it leverages natively geocoded, frequently updated data to solve a clear user problem with zero risk of hallucination. Conversely, tools relying on ungrounded LLMs or speculative neighborhood change indices carry high risks of misleading users and should be heavily modified or avoided entirely.

## Data Landscape and Reliability
The foundation of any credible hackathon project is the underlying data. Los Angeles currently offers several high-quality, authoritative datasets that are ready for immediate integration:

* **LA City Planning Cases**: Available via an ArcGIS FeatureServer, this dataset tracks discretionary planning applications [1] [2]. It is natively geocoded using the SRID 2868 (feet-based) projection and has a maximum record count of 2,000 per query [2].
* **LADBS Building Permits**: The Department of Building and Safety provides comprehensive permit data via Socrata. The dataset containing permits issued from 2020 to present includes over 379,000 rows and 38 columns (including address, council district, and permit type), last updated on March 9, 2026 [3].
* **LAHD Affordable Housing Projects**: The Los Angeles Housing Department maintains a highly curated list of financed projects from 2003 to present. Updated monthly (last updated March 16, 2026), it contains 615 rows and 30 columns detailing development stage, funding, units, and location [4].
* **Existing Dashboards**: LA already publishes a Prop HHH Progress Dashboard [5] [6]. Other jurisdictions, like King County, also publish robust regional affordable housing dashboards [7]. Any new dashboard must offer unique value to avoid appearing redundant.

## Technical Feasibility by Idea
Understanding the technical constraints of these datasets is critical for a successful 48-hour build:

* **Development Proposal Map**: Highly feasible. The primary hurdle is the ArcGIS PlanningCases service limit of 2,000 records and its specific spatial reference (SRID 2868) [2]. Teams must query by time window or geometry, transform the coordinates to WGS84 for standard web maps, and cache a recent slice of data to ensure a fast, offline-proof demo.
* **Affordable Housing Portfolio Tracker**: Extremely straightforward. The LAHD dataset is clean, low-volume (615 rows), and natively geocoded [4]. It requires minimal transformation and can easily power a staff-facing table and map interface.
* **Neighborhood Development Notifier**: Feasible but requires careful scoping. Relying on Legistar for address matching is risky due to inconsistent data quality. Instead, teams should use the natively geocoded PlanningCases and LADBS datasets as the primary triggers for notifications.
* **Legistar Plain-Language Translator**: Technically easy to implement via APIs, but carries significant risk. 
* **Housing Investment Dashboard**: Technically feasible using LAHD data, but strategically difficult. To stand out from the existing Prop HHH dashboard [5], teams would need to credibly integrate non-HHH capital, which is challenging in 48 hours.
* **Neighborhood Change Visualizer**: Not feasible. A credible index requires multi-source longitudinal socioeconomics (ACS, evictions, rents) that are not readily available or easily combined in a weekend.

## Risks, Ethics, and Trust
When building tools that interpret legal or policy text, the risk of misleading users is paramount. Regulatory bodies and standards organizations explicitly warn against the unmitigated use of Large Language Models (LLMs) in these contexts.

The European Data Protection Board (EDPB) notes that LLMs can generate inaccurate or misleading responses (hallucinations) and exhibit inadequate calibration, where poorly calibrated models assign high confidence scores to incorrect predictions [8]. Similarly, the NIST AI Risk Management Framework highlights the pervasive risks of hallucinations and biases in generative AI [9]. 

If a team pursues the Legistar Translator, they must constrain the LLM to extractive summaries, mandate a "show your sources" feature linking directly to official documents, highlight uncertainty, and include prominent disclaimers stating the output is not legal advice.

## Prioritized Opportunity Ranking

The following table ranks the opportunity spaces from most to least hackathon-viable based on clarity, data availability, buildability, credibility, risk, and continuation pathway.

| Rank | Idea | Build Hours | Primary Data & Risk | User Value | Status | Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Development proposal map** | 16–24 | PlanningCases (max 2,000 records; SRID 2868) [2] + LADBS permits [3]. Risk: Service limits require paging. | One map to see all recent planning proposals and permits near you with links to official records. | **Pursue** | Clear user problem; data is accessible and current; highly credible demo using official data; low risk of misleading users. |
| **2** | **Affordable housing portfolio tracker (staff tool)** | 16–22 | LAHD Affordable Housing Projects (615 rows, monthly refresh) [4]. Low risk. | Track pipeline, milestones, and units by council district and housing type with exports for briefings. | **Pursue** | Clean, small dataset; easy to ship with filters; highly credible; strong continuation pathway for LAHD handoff. |
| **3** | **Neighborhood development notifier** | 24–32 | PlanningCases + LADBS for triggers. Risk: Legistar address quality is inconsistent. | Get notified when a new planning case or permit is filed within X feet of your address. | **Modify** | Modify to avoid Legistar address dependence; use geocoded cases/permits instead. Good continuation for subscriptions. |
| **4** | **Legistar plain-language translator** | 12–18 | LLM with retrieval from PDIS/agenda PDFs. Risk: Hallucinations and overconfidence [8] [9]. | Turn dense agenda/case text into a short, source-linked plain-language summary. | **Modify** | Trust-sensitive. Must mitigate risks with extractive, source-linked summaries and strict disclaimers. |
| **5** | **Housing investment dashboard (public-facing)** | 24–36 | LAHD portfolio [4] + HHH dashboard [5]. Risk: Duplication. | Public view of where and how the City is investing in affordable housing. | **Deprioritize** | Overlaps with existing HHH dashboard [5]; hard to compile non-HHH dollars credibly in 48h. |
| **6** | **Neighborhood change visualizer** | 32–48+ | Requires ACS, evictions, rents, deeds. Risk: Misleading causal claims. | See neighborhood "change pressures" over time and place. | **Do not build** | Problem is contested; data not assembled; high risk of harm/overclaim; weak continuation. |

## 48-Hour Build Plan: Development Proposal Map
**Recommendation:** Build the Development Proposal Map first. Design it to unlock the Notifier next and accommodate source-linked short summaries later.

A scoped map with filters, source links, and cached data is safely deliverable within 48 hours and highly resilient for demos.

* **Data Ingestion**: 
 * Query the PlanningCases FeatureServer for the last 30–90 days. Use a geometry or date filter to stay under the 2,000 record cap [2]. Convert SRID 2868 to WGS84 and cache as GeoJSON.
 * Pull the last 60–90 days of LADBS permits via Socrata, filtering for residential/commercial categories [3].
* **UI/UX**: Build a map (Maplibre/Leaflet) with filters for time window, case/permit type, and Council District. Include a detail drawer showing project descriptions, addresses, and direct links to official PDIS or LADBS records.
* **Credibility**: Add source badges (LA Planning, LADBS) and update timestamps to prove data lineage.
* **Extensions (if time permits)**: Build a Notifier MVP (email webhook for "new within X feet") using the cached dataset.

## Continuation Pathway
Evolve the project from viewing, to alerts, to summaries, and finally to policy context:

* **30 Days**: Productionize the ETL pipeline. Add area-based subscriptions (email/webhooks) and basic analytics (e.g., counts by district/type).
* **60 Days**: Add zoning overlays (linking to ZIMAS) and enrich the data with unit counts where available. Implement access controls for staff-specific views.
* **90 Days**: Introduce grounded, source-linked LLM summaries for complex cases, ensuring compliance with AI risk frameworks. Pilot the tool with Neighborhood Councils and LAHD.

## Demo Narrative for Judges
Focus the demo on a specific resident or staff story to show immediate impact. 

**Script Outline:** "Enter an address to see what's happening nearby. Filter for the last 30 days. Click on a new planning case to open the detail drawer, then jump directly to the official PDIS record to verify the data. Export this filtered list as a CSV for tonight's Neighborhood Council meeting. Finally, click 'Subscribe' to get an alert the next time a permit is filed on this block."

Emphasize that credibility beats flash: the tool relies entirely on official sources, respects update cadences, and uses a low-risk design that avoids AI hallucinations.

## Do-Not-Build and Why
To save time and avoid reputational harm, teams should explicitly avoid the following:

* **Neighborhood Change Visualizer**: This carries high methodological risk. It requires multi-source, longitudinal socioeconomic data that is out of scope for a weekend. There is a high potential for harm via misclassification and misleading causal claims.
* **Housing Investment Dashboard (Generic)**: This is redundant with the existing Prop HHH Progress Dashboard [5]. Unless a team can credibly integrate non-HHH investments and establish clear definitions in 48 hours, it will read as a clone and underwhelm the judges.

## References

1. *Case Reports and Mapping | Los Angeles City Planning*. https://planning.lacity.gov/resources/case-reports
2. *PlanningCases (FeatureServer)*. https://services1.arcgis.com/sixrqw8b8BHDvWq2/ArcGIS/rest/services/PlanningCases/FeatureServer
3. *Building and Safety - Building Permits Issued from 2020 to Present (N) | Los Angeles - Open Data Portal*. https://data.lacity.org/City-Infrastructure-Service-Requests/Building-and-Safety-Building-Permits-Issued-from-2/pi9x-tg5x
4. *LAHD Affordable Housing Projects List (2003 to Present) | Los Angeles - Open Data Portal*. https://data.lacity.org/Housing-and-Real-Estate/LAHD-Affordable-Housing-Projects-List-2003-to-Pres/mymu-zi3s
5. *HHH Progress Dashboard - LAHD - City of Los Angeles*. https://housing.lacity.gov/housing/hhh-progress-dashboard
6. *Supportive Housing (Prop HHH) - LAHD*. https://housing.lacity.gov/housing/supportive-housing-prop-hhh
7. *Regional Affordable Housing Dashboard - King County, Washington*. https://kingcounty.gov/en/dept/dchs/human-social-services/housing-homeless-services/affordable-housing-committee/regional-affordable-housing-dashboard
8. *AI Privacy Risks & Mitigations – Large Language Models (LLMs)*. https://www.edpb.europa.eu/system/files/2025-04/ai-privacy-risks-and-mitigations-in-llms.pdf
9. *Artificial Intelligence Risk Management Framework*. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf