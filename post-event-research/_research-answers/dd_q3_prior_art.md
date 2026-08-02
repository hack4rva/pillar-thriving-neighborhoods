# Executive Summary

While the City of Richmond does not operate its own dedicated, public-facing development tracker application, a regional tool does exist through a partnership between PlanRVA and Richmond BizSense, which maps major real estate projects across the region, including the city [1, 2, 3, 4]. There is no evidence of a past or current development tracker project from the Code for RVA brigade. However, the city provides the essential data infrastructure required to build such a tool. This includes machine-readable legislative data from its Legistar system via a Web API [8, 10], extensive geospatial data through the Richmond GeoHub (including a maintained, machine-readable layer of civic association boundaries [5]), and permit information via the EnerGov Online Permit Portal, which itself integrates ESRI map functionality [6, 7]. It is technically feasible for a third-party application to consume and cross-reference data from the Legistar and ArcGIS REST APIs to link legislative actions to specific map locations, a pattern successfully used by tools like Councilmatic [11]. The success of such a civic tech project hinges on factors that distinguish long-lived tools from defunct ones: the use of stable, official data APIs, a clear plan for institutional stewardship and maintenance, and a well-defined scope that serves a specific user need. National examples from New York City (ZoLa, ZAP), Boston (Article 80), and Seattle (SDCI permit portal) demonstrate successful models for address-based development discovery and notification systems, offering a blueprint for what could be built for Richmond [15, 16, 17].

# Richmond Development Tracker History

## Summary

Research into development tracking tools for Richmond, Virginia, reveals that while the city has not created its own end-to-end public tracker app, there are existing regional and commercial solutions. A partnership between PlanRVA and Richmond BizSense led to the creation of the 'Richmond Regional Development Tracker'. Concurrently, Richmond BizSense maintains its own ongoing 'BizSense Development Tracker' with interactive maps. The City of Richmond provides extensive data through its GeoHub and legislative records via Legistar, but has not integrated them into a singular public tracking tool. Furthermore, an investigation into the public repositories of the local civic tech group, Code for RVA, showed no evidence that they have launched or maintained such a tool.

## City Led Initiatives Found

False

## Code For Rva Initiatives Found

False

## Existing Regional Tracker

A regional development tracking tool exists as a result of a partnership between PlanRVA and Richmond BizSense. This tool, titled the 'Richmond Regional Development Tracker', is an ArcGIS Experience application that displays development projects across the Richmond Region, including within the City of Richmond itself.

## Existing Commercial Tracker

Richmond BizSense, a local business news outlet, operates the 'BizSense Development Tracker'. This is described as a robust, GIS-based interactive mapping system and a collection of maps that follow the progress of major real estate developments from the planning stage through to completion for the entire Richmond region.


# Civic Tech Sustainability Factors

## Success Factors

Civic tech tools that survive and are sustained long-term, such as Councilmatic and 2nd City Zoning, typically possess several key attributes. These include: having durable data pipelines that connect to official, stable APIs (like Legistar); being backed by institutional stewardship or a dedicated maintainer organization (e.g., DataMade, Open City); having a clearly defined scope that addresses a real user demand; and implementing robust deployment and hosting practices to ensure the service remains operational.

## Failure Factors

Common reasons for the discontinuation of civic tech projects, as seen with many forks of the Citygram platform, include a lack of stable, city-supported data feeds, which can lead to data drift and obsolescence. Another major factor is the absence of ongoing maintainers or a sustainable funding model, which often results in volunteer burnout and the eventual shutdown of the service.


# Api Integration Feasibility

## Is Feasible

True

## Technical Summary

It is technically feasible to connect a Legistar OData/Web API with an ArcGIS REST API. The integration works by having a third-party application consume the machine-readable data from both sources. Legislative items, such as ordinances or resolutions from the Legistar API, can be cross-referenced with geographic data from the ArcGIS API. This connection is typically made by using shared identifiers present in both datasets, such as property addresses or parcel IDs, allowing legislative actions to be displayed or spatially related on a map.

## Precedent Examples

A prominent example of a project that demonstrates this type of integration is Councilmatic. Applications based on the Councilmatic platform routinely ingest data from the Legistar Web API. It is a common and straightforward practice for these applications to then add map layers from an ArcGIS REST service to display or spatially analyze the legislative items by linking them to geographic features like addresses or parcels.


# Richmond System Integrations

## Energov Arcgis Integration Status

Richmond's Online Permit Portal (EnerGov) has a documented integration with ESRI's ArcGIS mapping functionality. According to the official user guide, this integration enables map-based search and display features within the portal, allowing users to interact with permit data geographically.

## Energov Legistar Integration Status

There is no public documentation or evidence to suggest that Richmond's EnerGov permit system integrates with its Legistar legislative portal. The systems appear to operate independently for managing permits and legislative records, respectively.

## Documentation Source Url

https://www.rva.gov/sites/default/files/2021-11/OPP%202021%20User%20Guide%20Packet.pdf


# Richmond Civic Association Data

## Is Available

True

## Dataset Name

Civic Associations

## Source Platform

Richmond GeoHub (ArcGIS Hub)

## Direct Url

https://richmond-geo-hub-cor.hub.arcgis.com/datasets/civic-associations

## Data Format

Feature Service (accessible via ArcGIS REST API / GeoJSON export)


# National Development Notification Tools

## Tool Name

NYC ZoLa (Zoning and Land Use Map)

## Location

New York City, NY

## Description

The city's authoritative zoning and land-use map, providing a simple way for users to research zoning regulations, find the zoning for a specific property, and discover new proposals in their neighborhood.

## Url

https://zola.planning.nyc.gov/

## Tool Name

NYC ZAP (Zoning Application Portal)

## Location

New York City, NY

## Description

A portal paired with ZoLa that allows users to find and track individual development projects and follow specific cases through the city's planning process.

## Url

https://zap.planning.nyc.gov/

## Tool Name

Boston Article 80

## Location

Boston, MA

## Description

A system managed by the Boston Planning & Development Authority (BPDA) that provides project pages and subscription/alert mechanisms for large developments subject to Article 80 review.

## Url

https://richmondbizsense.com/bizsense-development-tracker/

## Tool Name

Seattle SDCI Permit Search

## Location

Seattle, WA

## Description

A city portal for address-based discovery of permit activity, allowing residents to search permit and property records, check the status of applications, and view related documents.

## Url

https://www.seattle.gov/sdci/permits

## Tool Name

Chicago Cityscape

## Location

Chicago, IL

## Description

A successful commercial/private example of a development tracking tool. It provides an interactive map and spreadsheet of building permits that can be filtered and searched, along with alerts.

## Url

https://www.chicagocityscape.com/permits.php

## Tool Name

Seattle in Progress

## Location

Seattle, WA

## Description

A private tool built on city data that offers project tracking and alerts, with subscription options to search by project type, status, architect, and developer.

## Url

https://www.seattleinprogress.com/


# Prior Art Civic Tech Tools

## Tool Name

Councilmatic

## Purpose

To ingest and standardize legislative data from sources like the Legistar Web API, making it accessible and understandable to the public.

## Creator

DataMade (for Chicago instance)

## Current Status

Active

## Tool Name

2nd City Zoning

## Purpose

An interactive map that allows users to look up zoning information for buildings, explore zoning patterns, and learn where to locate a business.

## Creator

Open City

## Current Status

Active

## Tool Name

Citygram

## Purpose

A geographic notification platform designed to work with open government data, allowing users to subscribe to updates for a specific area.

## Creator

Code for America

## Current Status

Archived

## Tool Name

Richmond Regional Development Tracker

## Purpose

An ArcGIS Experience app and mapping tool that displays and tracks development projects across the Richmond Region.

## Creator

PlanRVA and Richmond BizSense

## Current Status

Active

## Tool Name

NYC ZoLa

## Purpose

The city's official zoning and land use map for researching regulations and discovering new neighborhood proposals.

## Creator

NYC Planning

## Current Status

Active

## Tool Name

NYC ZAP (Zoning Application Portal)

## Purpose

A portal for finding, tracking, and following individual development projects and zoning applications.

## Creator

NYC Planning

## Current Status

Active

## Tool Name

Seattle in Progress

## Purpose

A private subscription service for tracking development projects and receiving alerts, built on city data.

## Creator

Private/Commercial

## Current Status

Active

## Tool Name

Chicago Cityscape

## Purpose

A private service providing an interactive map and alerts for building permits and development tracking.

## Creator

Private/Commercial

## Current Status

Active


# Richmond Data Sources And Apis

## Source Name

Legistar

## Data Type

Legislative data, including agendas, meeting minutes, and legislation details.

## Access Method

OData API / Web API, Web Portal

## Provider

City of Richmond / Granicus

## Url

https://richmondva.legistar.com/

## Source Name

EnerGov Online Permit Portal

## Data Type

Permit data, including plan submissions, permit applications, payments, inspection requests, and status checks.

## Access Method

Web Portal

## Provider

City of Richmond / Tyler Technologies

## Url

https://www.rva.gov/planning-development-review/online-permit-portal

## Source Name

Richmond GeoHub

## Data Type

Geospatial data, including datasets like civic association boundaries, parcels, and zoning.

## Access Method

ArcGIS Hub, ArcGIS REST API, GeoJSON

## Provider

City of Richmond / ESRI

## Url

https://richmond-geo-hub-cor.hub.arcgis.com/


# Code For Rva Activities

## Summary

An analysis of the public code repositories belonging to the Code for RVA civic technology brigade shows no evidence of a clear, maintained development-tracker project specifically for the City of Richmond. The research concluded that the organization has not launched such a tool.

## Development Tracker Project Found

False

## Github Organization Url

URL not provided in the source material.

## Repository Count

0.0


# Technical Analysis Of Apis

## Legistar Api Details

The Legistar API, provided by Granicus, is a Web API that exposes legislative data over HTTPS using the OData (Open Data Protocol) standard. It provides machine-readable endpoints for accessing data such as city council agendas, meeting details, and specific legislative items. This allows third-party applications to programmatically retrieve and process information from the legislative management system, as demonstrated by the existence of official API documentation and examples.

## Arcgis Api Details

The ArcGIS API is a REST (Representational State Transfer) API used for accessing and manipulating geographic data. In the context of Richmond, it is used by the Richmond GeoHub to publish datasets as feature services, such as the 'Civic Associations' layer, which can be consumed in machine-readable formats like GeoJSON. Furthermore, Richmond's Online Permit Portal (EnerGov) integrates ESRI map functionality, which is powered by ArcGIS, enabling map-based searching and display of permit information.

## Integration Strategy

A high-level strategy for combining data from the Legistar and ArcGIS APIs involves creating an application that queries both services. The application would first fetch legislative data from the Legistar Web API. For each legislative item that has a geographic component (e.g., a rezoning case tied to a specific address), the application would then use that address or parcel ID to query the ArcGIS REST API. This could involve geocoding the address to get coordinates or querying a specific parcel layer to retrieve its boundary. The final step is to join the legislative information with the geographic data, allowing the application to display legislative actions on an interactive map or perform spatial analysis.


# Key Takeaways For Builders

For a developer or organization looking to build a development tracking tool for Richmond, the research provides several key actionable insights:

1.  **Acknowledge and Differentiate from Existing Tools:** A regional development tracker already exists, maintained by PlanRVA and Richmond BizSense [1, 2, 3, 4]. A new tool should not simply replicate this. Instead, it should offer a unique value proposition, such as providing resident-focused notifications, tracking smaller-scale permits not covered by the regional map, or integrating legislative context (e.g., zoning case status) with development projects.

2.  **Leverage Richmond's Robust Data Ecosystem:** The city provides the necessary building blocks through stable, machine-readable formats. A builder can and should utilize:
    *   **Legistar Web API:** To programmatically access data on City Council meetings, agendas, and legislative files like special use permits and zoning reclassifications [8, 9, 10]. This is the source for tracking the decision-making process.
    *   **Richmond GeoHub (ArcGIS):** This is the source for essential geographic data. Crucially, it contains a maintained feature service for **Civic Association boundaries** [5], which is the key to building neighborhood-specific notification features. It also provides parcel data for linking projects to specific properties.
    *   **EnerGov Online Permit Portal:** While a direct API is not documented, the portal allows for searching and status checking of permits [7]. It also integrates ESRI map functionality [6]. This can be a source for project data, potentially via web scraping if no API is available.

3.  **Follow Proven Integration Patterns:** The technical path is clear. A tool can ingest legislative data from the Legistar API and cross-reference it with geospatial data from the ArcGIS REST API using addresses or parcel IDs. This is not a novel challenge; civic tech projects like Chicago's Councilmatic have successfully used this model to connect legislative actions to geographic locations [11].

4.  **Prioritize Sustainability from Day One:** The difference between enduring tools like Councilmatic and 2nd City Zoning [12, 13] and defunct ones like many Citygram forks [14] is maintenance. A successful project requires a durable data pipeline built on official APIs (which Richmond provides) and, critically, a long-term plan for hosting and maintenance by an individual or organization.

5.  **Model Features on Successful National Examples:** Instead of starting from scratch, builders can implement features proven effective elsewhere:
    *   **Address-Based Discovery:** Allow users to enter an address to see all associated permits, zoning information, and proposed projects, similar to NYC's ZoLa [15] and the commercial tool Chicago Cityscape [18].
    *   **Project-Specific Subscriptions:** Enable users to 'follow' a specific development project to receive email updates on its status, mirroring functionality in NYC's ZAP (Zoning Application Portal) [16] and Boston's Article 80 tracker.
    *   **Geographic Area Notifications:** Combine the Civic Associations data layer [5] with new permit/project data to allow residents to subscribe to all new activity within their neighborhood's boundaries, fulfilling the original promise of platforms like Citygram.
