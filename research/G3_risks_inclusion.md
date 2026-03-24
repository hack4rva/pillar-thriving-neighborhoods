# Making Development Transparency Equitable in Richmond: Designing Beyond the Digital Divide

## Executive Summary
Neighborhood development transparency tools hold immense potential to democratize city planning, but without intentional design, they risk amplifying the voices of those already in power. In Richmond, Virginia, current legal notice requirements structurally favor property owners over renters, while digital divides disproportionately impact lower-income Black and Brown communities. A web-only, English-only transparency tool will inevitably suffer from "homeowner capture," reinforcing existing civic inequities. To mitigate this, development tools must adopt a multi-channel approach that prioritizes SMS workflows, integrates with the City's Language Access Plan, and partners with on-the-ground community organizations. This report outlines the inclusion risks inherent in civic tech and provides a blueprint for building equitable, accessible development tools.

## 1) Who's Most Affected—and Currently Under-Reached
Renters, lower-income residents, and communities of color bear the brunt of development impacts, yet they are systematically under-reached by traditional notification methods.

### Legal notices structurally exclude renters by targeting property owners within 150 feet
Richmond's Special Use Permit (SUP) and rezoning processes rely on mechanisms that structurally miss renters. Public notice of a hearing is posted on the site and in a daily newspaper for a minimum of 15 days prior to the Planning Commission hearing [1]. Crucially, notices are mailed only to the owners of properties within 150 feet of the subject property, not the actual occupants or renters [2] [3] [4]. This creates a systemic information gap where the residents most likely to experience the daily impacts of neighborhood development are the last to know about it.

### Rising eviction rates in specific ZIP codes demand renter-first engagement
Richmond faces significant renter vulnerability. In 2024, Richmond's eviction filings reached 92% of their pre-pandemic levels [5]. Because renters are most at risk of displacement from neighborhood development, engagement strategies must prioritize high-filing ZIP codes and integrate with tenant networks rather than relying solely on property deed records. 

| Richmond ZIP Code | Q1 2025 Eviction Filings vs. Pre-Pandemic (2019) Baseline | Q1 2025 Eviction Judgments vs. Pre-Pandemic (2019) Baseline |
| :--- | :--- | :--- |
| **23230** | 234% | 243% |
| **23219** | 153% | 141% |
| **23224** | 118% | 98% |
| **23220** | 114% | 104% |
| **23225** | 103% | 89% |

*Takeaway:* Eviction filings have surged past pre-pandemic levels in several key Richmond ZIP codes [6] [7]. Civic tech tools must actively target these highly vulnerable neighborhoods (such as 23230 and 23219) to ensure development does not accelerate displacement without community input.

## 2) Digital Access Reality Check—Designing Beyond Broadband
Assuming universal broadband access is a critical failure point for civic technology in Richmond. Tools must be designed for "phone-first" users.

### City Council Resolution 2024-R026 recognizes broadband market failures for Black and Brown families
The Richmond City Council has explicitly recognized digital inequity, declaring that equal access to high-speed gigabit internet is a "public necessity" [8]. The Council noted that market failures have resulted in the exclusion of lower-income communities, particularly Black and Brown families, from the digital society and economy [8] [9]. 

### 34% of low-income Americans are smartphone-dependent, making SMS the optimal outreach channel
While home broadband lags, mobile phone usage is nearly universal. As of 2025, 98% of U.S. adults own a cellphone, and 91% own a smartphone [10]. However, reliance on smartphones for internet access is heavily skewed by income. 

| Annual Household Income | Share of Adults Who Are "Smartphone Dependent" (No Home Broadband) |
| :--- | :--- |
| **Less than $30,000** | 34% |
| **$30,000 - $69,999** | 19% |
| **$70,000 - $99,999** | 10% |
| **$100,000+** | 4% |

*Takeaway:* Lower-income residents are significantly more likely to rely exclusively on their phones for internet access [11] [10]. Furthermore, historical data indicates that Americans earning less than $30,000 a year send and receive roughly twice as many texts as those earning over $75,000 [12]. SMS is an ideal alternative to web-heavy platforms for reaching low-income populations.

## 3) Language Access—From Compliance to Trust
Language barriers prevent meaningful participation in complex zoning and development discussions.

### Richmond's Language Access Plan mandates free, professional interpretation services
The City of Richmond's Language Access Plan mandates that all residents be provided an interpreter at no charge, explicitly stating that the City does not require, request, or prefer residents to bring their own interpreters [13]. The policy also strictly prohibits the use of children under 18 as interpreters [13]. Spanish speakers represent the largest Limited English Proficient (LEP) group in the city, accounting for up to 10.5% of the total population [14]. Development tools must align with this baseline by offering Spanish content at launch, supporting additional top languages, and routing users to staffed hotlines with live interpreter services.

## 4) Don't Reinforce Civic Inequities—Mitigate "Homeowner Capture"
A tool that primarily serves digitally-connected, English-speaking homeowners will actively harm civic equity by giving disproportionate influence to an already privileged group.

### Web-only tools risk overrepresenting high-income, digitally connected residents
Data shows that political activity is highly correlated with income; only 10% of adults making $20,000-$39,999 participated in two or more online political activities in a year, compared to 35% of adults with an income of $100,000 or more [15]. A desktop-first web tool will systematically overrepresent higher-income residents.

### 15-day legal notice windows compress the timeline for meaningful community deliberation
The minimum 15-day posting requirement for conditional and special use permits often leads to last-minute discovery by residents [1]. Tools must push proactive, continuous alerts rather than relying on residents to constantly check a website.

## 5) What Works: Multi-Channel Playbook with Proof Points
Blending SMS, phone hotlines, and community partnerships has been validated by civic tech case studies to expand reach and completion rates.

### Textizen's SMS platform reached 7,500 Philadelphia residents and mapped gaps via ZIP codes
Textizen, an SMS-based participatory governance app, successfully scaled to 40 U.S. cities by the end of 2014 and reached an estimated 7,500 individuals in Philadelphia [15]. By prompting users for their ZIP code, planners were able to map the concentration of responses and identify missing demographics in real-time, allowing them to evaluate the effectiveness of their outreach strategy [15] [16].

### mRelief RCTs demonstrate up to 27 percentage point lifts in application completion via mobile optimization
Reducing friction through phone-based flows significantly improves engagement for critical services. A randomized controlled trial (RCT) by Civis Analytics in Los Angeles found that simply providing an option to schedule a call increased the rate of completed SNAP applications by 18 percentage points [17]. A separate University of Utah RCT in Kentucky revealed that access to mRelief's simplified, mobile-friendly application led to a statistically significant increase in SNAP applications—jumping from 32% in the control group to 59% in the treated group (a 27 percentage point increase) [18].

## 6) Channel vs. Barrier Fit—Choose the Right Mix
No single channel reaches everyone. The table below outlines how different communication methods address specific inclusion barriers.

| Channel | Reaches Renters | Works w/o Broadband | LEP-Friendly | Depth of Input | Relative Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SMS Short Code** | High | Yes | Yes (with keywords) | Low (160 chars) | Low |
| **Phone Hotline (Interpreters)** | Medium-High | Yes | Yes | Medium-High | Medium |
| **Web Application** | Medium | No | Limited | High | Medium |
| **On-Site Signage/Door-Hangers** | High (multifamily) | Yes | Yes (translated) | Low | Low-Medium |
| **Newspaper/Legal Ads** | Low | Yes | Low | Low | Low |

*Takeaway:* SMS and on-site signage provide the highest reach for renters and those without broadband, but offer low depth of input. They must be paired with phone hotlines and web applications to allow for deeper deliberation.

## 7) Implementation Blueprint for a Hackathon-Stage Pilot
To build an inclusive MVP in a hackathon setting, teams should focus on a multi-channel approach rather than a complex web dashboard.

### MVP Scope: SMS project lookup, multilingual routing, and community partnerships
The prototype should feature an SMS "project lookup by address" function, a multilingual landing page, and a 311-style hotline menu with interpreter routing. Teams should plan to coordinate with tenant unions, neighborhood associations, and libraries to distribute printed flyers and SMS keywords, ensuring the tool reaches residents where they already are.

## 8) Equity Metrics, Feedback Loops, and Public Reporting
Inclusion must be measurable. Tools should track the share of subscribers who are renters, Limited English Proficiency (LEP) language share, and mobile vs. web usage. 

### Tracking engagement against eviction hotspots to trigger offline canvassing
By comparing ZIP code coverage against eviction filing hotspots (such as 23230, 23219, and 23224), administrators can trigger additional on-the-ground outreach where engagement lags. If digital responses from a high-displacement-risk neighborhood are low, the city must deploy physical door-hangers and community organizers to bridge the gap.

## 9) Risks, Limits, and How to Communicate Them in a Demo
Hackathon teams must be transparent about the limitations of their prototypes. 

### Transparently acknowledging the limitations of SMS for deep policy debate
*What a hackathon team should say in their demo:*
"A web-only tool inherently overrepresents property owners and English speakers. To mitigate this, our prototype includes SMS workflows, translations aligned with the City's Language Access Plan, and printable assets for offline distribution. We recognize that SMS is not a replacement for deep deliberation, which is why it serves as a funnel to connect residents with live interpreters and community meetings."

## 10) Required Outputs: Facts, Inferences, Unknowns, and Ranked Risks

### Facts
* Richmond City Council declared equal access to high-speed gigabit internet a public necessity, noting market failures excluding Black and Brown families [8].
* Richmond's Language Access Plan provides interpreters to all residents at no charge and prohibits the use of children as interpreters [13].
* Special Use Permit notices are mailed only to property owners within 150 feet, not renters [2] [4].
* 34% of U.S. adults earning under $30,000 are smartphone-dependent (lacking home broadband) [11] [10].
* Adding a call-scheduling option increased completed mRelief applications by 18 percentage points in Los Angeles [17].

### Inferences (Clearly Labeled)
* *Inference:* Because legal notices are mailed only to property owners, renters are systematically unaware of development projects until physical signs are posted 15 days before a hearing.
* *Inference:* A web-only transparency tool will disproportionately capture feedback from wealthier, white homeowners, skewing city planning data.
* *Inference:* SMS tools are excellent for initial awareness but insufficient for nuanced policy debate due to character limits.

### Unknowns
* The exact percentage of Richmond renters who currently participate in Planning Commission hearings.
* The specific cost of integrating live interpreter routing into a new civic tech SMS/phone platform in Richmond.
* How frequently physical zoning signs are ignored or removed before the 15-day window expires.

### Ranked List of Inclusion Risks
1. **Homeowner Capture:** The tool becomes an echo chamber for wealthy property owners, actively marginalizing renter voices.
2. **Digital Exclusion:** Broadband requirements lock out low-income residents who rely on cellular data.
3. **Language Isolation:** English-only interfaces prevent LEP residents from understanding neighborhood impacts.
4. **Shallow Engagement:** Over-reliance on SMS leads to "checkbox" participation without meaningful community deliberation.

### Mitigations and Design Recommendations
* **Design for Phone-First:** Build SMS short-codes for project lookups and alerts.
* **Renter-Targeted Outreach:** Create printable door-hangers for multifamily buildings to bypass owner-only mailings.
* **Integrated Translation:** Provide Spanish UI at launch and route phone users to the City's free interpreter services.
* **Feedback Heatmaps:** Track engagement by ZIP code and deploy offline canvassing to underrepresented neighborhoods.

## References

1. *ZONING ORDINANCE*. https://www.rva.gov/sites/default/files/2020-06/City%20of%20Richmond%20-%20Zoning%20Ordinance%20-%20July%202020.pdf
2. *2025 Special Use Permit Application Form.pdf*. https://www.rva.gov/sites/default/files/2025-04/2025%20Special%20Use%20Permit%20Application%20Form.pdf
3. *Rezoning-Conditional Rezoning Application Form*. https://rva.gov/sites/default/files/2025-10/Rezoning-Conditional%20Rezoning%20Application%20Form%20-%202025.pdf
4. *Zoning Ordinance*. https://rva.gov/sites/default/files/2025-11/Richmond_ZoningCode-DRAFT2_Nov18%20%281%29.pdf
5. *Update on RECENT EVICTION NUMBERS IN VIRGINIA*. https://vhc.virginia.gov/FINALEviction%20Update%20December%202025.pdf
6. *2025 1st Semiannual Report - RVA EVICTION LAB*. https://rvaevictionlab.org/2025/12/03/2025-1st-semiannual-report/
7. *Fetched web page*. https://rvaevictionlab.org/wp-content/uploads/2025/12/RVAEL_2025Q1Q2SemiAnnualReport.pdf
8. *
	City of Richmond - File #: RES. 2024-R026
*. https://richmondva.legistar.com/LegislationDetail.aspx?ID=6791846&GUID=7A3D4E77-4A39-4BAE-AB85-985C3B881BA5&FullText=1
9. *
	City of Richmond - File #: RES. 2024-R026
*. https://richmondva.legistar.com/LegislationDetail.aspx?ID=6791846&GUID=7A3D4E77-4A39-4BAE-AB85-985C3B881BA5
10. *Demographics of Mobile Device Ownership and Adoption in the United States | Pew Research Center*. https://www.pewresearch.org/internet/fact-sheet/mobile/
11. *Internet use, smartphone ownership, digital divides in the US: What we know | Pew Research Center*. https://www.pewresearch.org/short-reads/2026/01/08/internet-use-smartphone-ownership-digital-divides-in-u-s/
12. *Americans and text messaging*. https://www.pewresearch.org/internet/wp-content/uploads/sites/9/media/Files/Reports/2011/Americans-and-Text-Messaging.pdf
13. *1 Revised Version April 2020 LANGUAGE ACCESS PLAN ...*. https://rva.gov/sites/default/files/2022-05/LANGUAGE%20ACCESS%20PLAN%20FINAL-%20APR2020.pdf
14. *Fetched web page*. https://rva.gov/sites/default/files/2026-01/City%20of%20Richmond%20Language%20Access%20Plan%202025.pdf
15. *Textizen: Application for Participatory Governance in Philadelphia – Participedia*. https://participedia.net/case/4351
16. *Leveraging Technology to Improve Participation: Textizen and Oregon’s Kitchen Table | by Harvard Ash Center | Challenges to Democracy | Medium*. https://medium.com/challenges-to-democracy/leveraging-technology-to-improve-participation-textizen-and-oregons-kitchen-table-9a58cbbdbd71
17. *New research quantifies the value of food stamp application improvements*. https://www.mrelief.com/press/mrelief_civis
18. *MRELIEF SIMPLIFIES SNAP APPLICATIONS*. https://www.mrelief.com/briefs/mRelief%20simplifies%20SNAP%20applications_University%20of%20Utah.pdf