# Executive Summary

The City of Richmond, Virginia utilizes several public-facing data systems for legislative and development information. For its legislative data, Richmond uses Granicus's Legistar platform with the confirmed client slug 'richmondva'. The data is accessible via a public OData Web API without a mandatory token, with the base URL for legislative matters being https://webapi.legistar.com/v1/richmondva/Matters. The API has a documented limit of 1000 items per response, requiring pagination for complete data retrieval. For planning and development data, Richmond publishes information through its ArcGIS GeoHub. A direct REST endpoint for the 'Plans of Development' layer has been confirmed at https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/PlanOfDevelopment/FeatureServer/0. While direct REST endpoints for 'Special Use Permits' (SUP) and 'Board of Zoning Appeals' (BZA) were not immediately extracted, their corresponding item pages exist on Richmond's ArcGIS Online portal, from which the REST API endpoints can be accessed. For permits, the city uses Tyler Technologies' EnerGov system, accessible via a web-based Citizen Self Service portal at https://energov.richmondgov.com/EnerGov_Prod/selfservice. The provided documentation does not indicate the existence of a public API or automated data export capability for the EnerGov system; access is limited to the web user interface.

# Legistar Api Client Details

## Client Slug

richmondva

## Is Publicly Accessible

True

## Requires Token

False

## Odata Api Url

https://webapi.legistar.com/v1/richmondva/Matters


# Legistar Legislative Data Scope

## Total Matters Count

0.0

## Oldest Record Date

Not Available in Context


# Legistar Api Technical Parameters

## Cors Restrictions Enforced

False

## Rate Limit Details

The primary documented limit is a 1000-item maximum per API response. Users must implement pagination using OData parameters ($top, $skip) to retrieve more than 1000 records. Formal request-per-time-window rate limits are not publicly documented.


# Geohub Development Tracker Details

## Update Cadence

The update cadence is not formally documented. The provided information suggests treating the cadence as "as updated by data owners," indicating updates are performed on an ad-hoc basis rather than on a fixed schedule.

## Documented Sla

No documented Service Level Agreement (SLA) regarding the data's freshness or update frequency was found in the public ArcGIS item metadata or other reviewed documentation for the GeoHub Development Tracker layer.

## Last Updated Date

While the update date for the overarching 'Development Tracker' is not specified, the related 'Plans of Development' dataset on the GeoHub was last updated on June 29, 2022.


# Arcgis Planning And Zoning Layers

## Layer Name

Plans of Development

## Category

Plans of Development

## Rest Endpoint Url

https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/PlanOfDevelopment/FeatureServer/0

## Source Url

https://www.arcgis.com/home/item.html?id=3d63de08ef924513bbfa9448e6b66dd6

## Layer Name

Special Use Permits

## Category

Special Use Permits

## Rest Endpoint Url

The direct REST endpoint is not provided in the source material, but it can be accessed from the source URL by clicking on 'View Data Source' or 'View API Resources'.

## Source Url

https://www.arcgis.com/home/item.html?id=07a2463eaf27479e87262d3db5e2c1c1

## Layer Name

Board of Zoning Appeals

## Category

Board of Zoning Appeals

## Rest Endpoint Url

The direct REST endpoint is not provided. The source material indicates that the relevant item page(s) must first be located via the provided search URL, from which the FeatureServer REST endpoint can then be accessed.

## Source Url

https://www.arcgis.com/home/search.html?q=Board%20of%20Zoning%20Appeals%20owner%3ACity%20of%20Richmond


# Energov Permit System Data Access

## Has Public Api Or Export

False

## Access Method Details

The City of Richmond's EnerGov system does not expose a public API or a direct data export capability. Access to permit data is facilitated exclusively through the web-based user interface of the EnerGov Online Permit Portal, also known as the Citizen Self Service portal. Public documentation does not mention any available open JSON or CSV export functionality.

## Public Portal Url

https://energov.richmondgov.com/EnerGov_Prod/selfservice#/login

## Api Documentation Url




# Unconfirmed Information Summary

Several key operational details could not be definitively confirmed from the provided documentation. The exact total count of legislative matters in Richmond's Legistar system and the specific date of the oldest available record remain unknown, as this requires executing live API calls. The methods to retrieve this information are clear (using OData queries `$count=true` and `$orderby=MatterIntroDate asc`), but the values themselves were not obtained. Furthermore, there is no documented Service Level Agreement (SLA) or guaranteed update cadence for the GeoHub Development Tracker layer or other related ArcGIS planning and zoning layers; updates appear to be performed as needed by the data owners rather than on a fixed schedule. Finally, the official public documentation for the Legistar Web API does not specify its Cross-Origin Resource Sharing (CORS) policy for browser-based requests, nor does it define any specific rate limits beyond the 1000-item-per-page limit. Therefore, while the API is functional, its behavior regarding cross-origin access and high-volume request throttling is not officially guaranteed.
