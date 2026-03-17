# Closing the Digital Gap in Richmond’s Redeveloping Neighborhoods — What to Build, Who’s Left Out, and How to Fix It

## Executive Summary

Richmond’s rapid redevelopment in neighborhoods like Church Hill, Jackson Ward, Gilpin Court, and Southside is colliding with a hidden digital divide. While the city appears highly connected, relying on standard web-based civic tools like Legistar will systematically exclude the residents most affected by housing pressures. 

* **Hidden offline pocket in a "highly connected" city**: While 86.2% of Richmond households have a broadband subscription, this leaves approximately 14,600 households (out of 104,321 total) without home internet [1]. **Decision/Action**: Treat "no internet at home" as a primary user segment by building SMS/voice pathways and printable outputs into the tool from day one.
* **Smartphone-reliant users will hit Legistar friction**: Lower-income "covered households" are more likely to rely on mobile devices and lack the digital skills or processing power for complex web tasks [2]. **Decision/Action**: Make the tool mobile-first and low-bandwidth, avoiding heavy PDFs and rendering Legistar items as responsive, scannable cards.
* **Older residents need one-on-one support, not just a website**: Only 18% of older adults feel comfortable learning to use a new technology device on their own, and 77% report needing someone to help them [2]. Furthermore, older Virginians suffered over $60M in cybercrime financial losses in 2021 [2]. **Decision/Action**: Pair the tool with "digital navigator" slots at libraries and design trust elements (plain-language warnings, no log-in required) to combat scam fears.
* **Language access is material**: 12.1% of Richmond residents aged 5 and older speak a language other than English at home [1]. **Decision/Action**: Ship with at least English and Spanish UI parity, and schedule a discovery sprint to identify additional priority languages.
* **Public housing communities are in flux**: The Richmond Redevelopment and Housing Authority (RRHA) is planning the demolition and disposition of its "Big Six" public housing communities, including Gilpin, Mosby, Whitcomb, Hillside, Fairfield, and Creighton courts [3]. **Decision/Action**: Co-deploy the tool at RRHA's expanding STEM/computer labs [3] and ensure continuity for relocating residents via SMS change-of-address prompts.
* **Affordability programs underreach**: Less than a third of covered households in Virginia were using Affordable Connectivity Program (ACP) benefits, and even among eligible households at or below 200% of the Federal Poverty Level, less than 45% enrolled [2]. **Decision/Action**: Bake affordability wayfinding into the tool generically ("low-cost options") to route users to concrete help.

## Purpose and Scope — Reaching Residents Under Development Pressure

Reaching residents under development pressure requires mobile-first, multilingual, and offline pathways. This report translates city and regional digital equity data into concrete design, outreach, and measurement choices for Church Hill, Jackson Ward/Gilpin, and Southside Richmond. We aim to define the exact device and connectivity assumptions safe for a neighborhood development tool and outline how to mitigate the equity gaps inherent in Legistar-based civic platforms.

## Access Landscape: What Connectivity Richmond Actually Has—and Where it Breaks

Despite high top-line connectivity metrics, thousands of Richmond residents remain offline. Smartphone-only patterns and public housing transitions amplify access risks for the city's most vulnerable populations.

### Citywide Baselines Reveal a Substantial Offline Population

Richmond city has 104,321 households, with 86.2% holding a broadband Internet subscription and 94.4% having a computer [1]. However, this leaves nearly 14% of the city—over 14,000 households—without reliable broadband access. Additionally, 12.1% of persons aged 5 years and over speak a language other than English at home [1]. Establishing the size of this offline and non-English-speaking population is critical for baseline tool requirements.

### Public Housing and Redevelopment Realities in the "Big Six"

RRHA is actively repositioning its large public housing communities. Planned demolition and disposition activities target the "Big Six" developments: Gilpin Court (781 units), Hillside Court (472 units), Fairfield Court (447 units), Whitcomb Court (493 units), Mosby Court (458 units), and Creighton Court [3]. Because these communities serve as hubs for deployment and support, resident relocation requires continuity features in any civic tool, such as persistent subscriptions tied to phone numbers rather than physical addresses.

### Data We Must Add Now: Tract-Level S2801/B28002/B16001

To effectively target Church Hill, Jackson Ward, Gilpin, and Southside, we must move beyond citywide averages. We need tract-level data to finalize neighborhood targeting and language priorities.

| Neighborhood | Likely Tracts | Needed Tables | FCC Layers | Owner | Due Date |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Jackson Ward / Gilpin | TBD | ACS S2801, B28002, B16001 | Fixed Broadband Availability | Data Team | +2 Weeks |
| Church Hill | TBD | ACS S2801, B28002, B16001 | Fixed Broadband Availability | Data Team | +2 Weeks |
| Southside | TBD | ACS S2801, B28002, B16001 | Fixed Broadband Availability | Data Team | +2 Weeks |

*Takeaway: Citywide data masks neighborhood-level digital deserts. Pulling tract-level Census and FCC data is the immediate next step to validate local assumptions.*

## Digital Skills and Confidence: Who Can Actually Use a Web Civic Tool Today?

Older and lower-income residents face severe skill and time barriers. Pairing technology with human navigation and trust-building is essential for adoption.

### Older Adults Face Steep Learning Curves and Scam Fears

Developing digital proficiency is highly challenging for older adults. Only 18 percent of older adults feel comfortable learning to use a new technology device on their own, while 77 percent report needing someone to help them through the process [2]. Furthermore, caution surrounding internet use is exacerbated by cybercriminals; in 2021, approximately 3,000 aging individuals across Virginia suffered over $60M in cybercrime financial losses [2]. 
*Implication*: The tool must feature co-designed flows, large tap targets, phone support, and scam-aware messaging to build trust.

### Lower-Income Time Poverty and Mobile Reliance

Covered (low-income) households experience the digital divide through the lens of economic and time poverty. They are more likely to hold multiple jobs, limiting their time to engage online or develop new digital skills [2]. Furthermore, these households are more likely to rely on mobile devices to access the internet and lack the skills to access resources requiring additional processing power or larger screens [2]. They are also 20 percent less likely to report feeling confident navigating telehealth appointments compared to other respondents [2].
*Implication*: Civic discovery must be collapsed to under 60 seconds via SMS replies, asynchronous engagement, and plain-language summaries.

### Local Capacity for Help: Activating the Support Ecosystem

Richmond has existing infrastructure to support digital literacy. RRHA is expanding STEM/Computer labs to all Public Housing communities, with a goal of completing the large communities by December 2024 [3]. Other local assets include the Office of Community Wealth Building [4], Tech for Troops [2], and the Virginia Adult Learning Resource Center (VALRC) [5].

| Provider | Audience | Offering | Geography | Link |
| :--- | :--- | :--- | :--- | :--- |
| RRHA STEM Labs | Public Housing Residents | Computer access, education | RRHA "Big Six" | rrha.com [3] |
| Tech for Troops | Veterans & Families | Computers, skills, IT training | Richmond HQ | techfortroops.org [2] |
| Office of Community Wealth Building | Richmond Residents | Career services, workforce training | Citywide | rva.gov [4] |
| VALRC | Older Adults | Digital literacy case studies | Richmond | valrc.org [5] |
| ReEstablish Richmond | Multilingual/Refugees | Digital literacy, online tutorials | Richmond | reestablishrichmond.org [6] |

*Takeaway: Do not build support from scratch. Deploy instruction and tool distribution via these existing, trusted community nodes.*

## Language Access: From "We Should Translate" to Concrete Priorities

With 12.1% of Richmond residents speaking a non-English language at home [1], translation is a core requirement, not an edge case.

### Baseline and Unknowns

While we know the citywide percentage of non-English speakers [1], we lack the specific breakdown of top languages per target tract. Organizations like ReEstablish Richmond already provide multilingual tutorials on online platforms [6], indicating a clear local need for translated digital resources. We will pull ACS Table B16001 for Richmond tracts and triangulate with local partner organizations to identify the top non-English languages.

### Shipping Plan for Language Parity

The tool will launch with English and Spanish UI and content parity. We will develop a glossary for civic terms to ensure accurate translation of complex zoning and development jargon. Human QA will be required for meeting summaries, avoiding reliance on auto-translation for legal notices. Two additional languages will be added post-discovery.

## Program Inventory and Affordability: Who Lowers Costs and Builds Skills

Affordability programs exist but suffer from severe underutilization and fragmentation. The civic tool should actively route users to concrete help.

### The Affordability Gap

In 2021, less than a third of covered households in Virginia were using ACP benefits to access broadband [2]. Even when expanding the group to include households at or below 200 percent of the Federal Poverty Level, less than 45 percent of eligible households used the program [2]. 
*Action*: The tool must include a "Get low-cost internet" finder and facilitate navigator bookings. Content must be resilient to funding shifts (e.g., the ACP wind-down).

### Local Assets to Activate

| Program | Eligibility | What Users Get | How to Access |
| :--- | :--- | :--- | :--- |
| RRHA STEM Labs | RRHA Residents | Device access, internet, training | On-site at RRHA communities [3] |
| Tech for Troops | Veterans | Free refurbished computers, training | Direct application [2] |
| Starry Connect | Public/Affordable Housing | Low-cost, no-contract broadband | Starry signup [7] |

*Takeaway: Embed these resources directly into the tool's onboarding flow for users who indicate connectivity struggles.*

## Device/Connectivity Assumptions for the Tool

To reach all affected residents, we must assume smartphone-first usage, intermittent connectivity, and low digital literacy. 

### Assumptions to Adopt
* **Mobile-first**: The primary interface must be optimized for small screens.
* **Low-bandwidth**: Pages must be under 1MB and load in under 2 seconds on a 3G connection.
* **Multi-channel**: SMS and IVR (Interactive Voice Response) parity is required.
* **Offline-ready**: Auto-generated A4/Letter PDFs must be available for printing.

### What to Avoid (Failure Cases)
* Mandatory account creation or logins just to view public information.
* Large, unoptimized PDFs (like standard city planning documents).
* English-only legal notices.
* Deep-linking to inaccessible Legistar tables that break on mobile browsers.

## Equity Implications of a Legistar-Based Tool

Legistar is a data source, not an interface for equity. Its default user experience is document-heavy and English-first.

### Risks and Who is Excluded
Relying solely on Legistar will systematically exclude seniors, Limited English Proficiency (LEP) residents, smartphone-only users, and time-poor workers [2]. The complexity of the interface also triggers scam-wary residents who lack confidence in navigating unfamiliar web portals [2].

### Mitigations to Implement
We must build an accessible layer on top of Legistar. This includes extracting data to create plain-language card summaries, pushing SMS notifications, enabling IVR playback of agenda summaries, and generating printable weekly bulletins for community posting.

## Offline and Phone-Based Alternatives to Include

Multi-channel delivery is a strict requirement for neighborhoods facing development pressure.

### Phone and SMS Pathways
* **SMS Short Codes**: Implement neighborhood-specific codes (e.g., "Text JWARD to 55555 for this week's zoning items").
* **IVR Hotline**: A dedicated phone number with a menu ("Press 1 for this week's items") and callback requests for residents needing help submitting public comments.

### Print and Place-Based Channels
* **Auto-Generated 1-Pagers**: Create weekly printable briefs designed for bulletin boards at libraries, RRHA management offices, churches, laundromats, and barbershops.
* **Physical Routing**: Include QR codes and SMS instructions on all physical flyers to bridge the offline-to-online gap.

## Measurement and Learning Plan

We must track equity metrics, not just overall web traffic, to ensure the tool is reaching its intended audience.

### KPIs
* Device mix (percentage of mobile vs. desktop users).
* Language selection rates.
* Completion rates on low-bandwidth connections.
* SMS engagement and IVR call volume.
* Assisted sessions logged via digital navigators.
* Geographic coverage across target neighborhoods.

### Validation Steps
* Execute the tract-level data pull (ACS S2801/B28002/B16001 and FCC map).
* Conduct 50 intercept surveys per target neighborhood to validate device assumptions.
* Run usability tests specifically with seniors and LEP users.

## Unknowns and How We'll Close Them

Neighborhood-specific device, connectivity, and language profiles are our biggest current gaps, but they are resolvable within 2–4 weeks.

| Unknown | Why it Matters | Data Source / Method | Owner | Due Date |
| :--- | :--- | :--- | :--- | :--- |
| Tract-level smartphone-only rates | Dictates strictness of mobile-first design | ACS S2801 | Data Team | +2 Weeks |
| Top 3 non-English languages per tract | Determines translation roadmap | ACS B16001 | Data Team | +2 Weeks |
| Real-world Legistar mobile usability | Proves the need for a custom UI layer | Usability Testing | UX Team | +4 Weeks |

*Inference*: Based on statewide data showing high mobile reliance among lower-income populations [2], we infer that smartphone-only behavior is significantly elevated in Gilpin Court and Southside compared to the Richmond citywide average. We will confirm this via the tract-level ACS pull.

## Risks and Mitigations

Design for volatility, trust, and safety from the outset.

* **Risk**: Affordability program changes (e.g., the FCC ACP wind-down).
 * *Mitigation*: Use modular content design. Refer to "low-cost options" rather than specific program names in hard-coded text, and maintain a centralized, easily updatable directory of links.
* **Risk**: Misinformation and scam fears among seniors [2].
 * *Mitigation*: Include clear update dates, plain-language security tips, and partner validation (e.g., co-branding with RRHA or the Library).
* **Risk**: Data freshness from Legistar APIs.
 * *Mitigation*: Clearly timestamp all agenda items and provide a direct link to the official city record as a fallback.

## Appendices — Fact Base with URLs

| Claim | Metric | Geography/Year | Source URL |
| :--- | :--- | :--- | :--- |
| Broadband & Language | 86.2% broadband; 104,321 households; 12.1% non-English | Richmond city, VA (2020-2024) | [Census QuickFacts](http://census.gov/quickfacts/fact/table/richmondcityvirginia/PST045224) [1] |
| Older Adults Tech Comfort | 18% comfortable learning alone; 77% need help; $60M cyber losses | Virginia (2023) | [VA Digital Opportunity Plan](http://dhcd.virginia.gov/sites/default/files/DocX/vati/dop-appendix-files/virginia-digital-opportunity-plan.pdf) [2] |
| Low-Income Mobile Reliance | High mobile reliance; time poverty; lower telehealth confidence | Virginia (2023) | [VA Digital Opportunity Plan](http://dhcd.virginia.gov/sites/default/files/DocX/vati/dop-appendix-files/virginia-digital-opportunity-plan.pdf) [2] |
| ACP Enrollment Gap | < 1/3 covered households enrolled; <45% of eligible enrolled | Virginia (2021/2023) | [VA Digital Opportunity Plan](http://dhcd.virginia.gov/sites/default/files/DocX/vati/dop-appendix-files/virginia-digital-opportunity-plan.pdf) [2] |
| RRHA Repositioning | Demolition/Disposition of "Big Six" (Gilpin, Hillside, etc.) | Richmond (FY2025) | [RRHA Annual Plan](http://rrha.com/wp-content/uploads/2024/11/Approved-RRHA-Annual-Ageny-Plan-FY2025_and-Five-Year-Agency-Plan_2025_29_10-01-2024.pdf) [3] |
| RRHA STEM Labs | Expanding to all Public Housing communities by Dec 2024 | Richmond (FY2025) | [RRHA Annual Plan](http://rrha.com/wp-content/uploads/2024/11/Approved-RRHA-Annual-Ageny-Plan-FY2025_and-Five-Year-Agency-Plan_2025_29_10-01-2024.pdf) [3] |

## References

1. *U.S. Census Bureau QuickFacts: Richmond city, Virginia*. https://www.census.gov/quickfacts/fact/table/richmondcityvirginia/PST045224
2. *Virginia Digital Opportunity Plan*. https://www.dhcd.virginia.gov/sites/default/files/DocX/vati/dop-appendix-files/virginia-digital-opportunity-plan.pdf
3. *Table of Contents*. https://www.rrha.com/wp-content/uploads/2024/11/Approved-RRHA-Annual-Ageny-Plan-FY2025_and-Five-Year-Agency-Plan_2025_29_10-01-2024.pdf
4. *The Office of Community Wealth Building*. https://www.rva.gov/community-wealth-building/about-us
5. *Case Study 4: Digital Literacy for Older Adults – VALRC*. https://valrc.org/universal-design-for-learning-udl-tips/case-study-4-digital-literacy-for-older-adults/
6. *Digital Literacy — ReEstablish Richmond*. https://www.reestablishrichmond.org/digital-literacy
7. *Starry Connect: Better Internet for More People*. https://starry.com/starryconnect?srsltid=AfmBOorbhpMOpVuc5Q43O1RxxpgKJBCcVpHDEvaJBMYLOIsd4Cgu8tB9