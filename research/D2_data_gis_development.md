> **Note:** This research was generated using AI assistance (Claude + Parallel.ai) with human expert review. See [methodology](../docs/methodology.md) for details.

# Richmond GeoHub to Action — Building Neighborhood Development Apps Fast

## Executive Summary
Richmond’s GeoHub and ArcGIS Online organization expose a robust, public-facing set of Feature Services that can power neighborhood development and planning applications. The core data pillars—Parcels, Zoning Districts, Development Tracker, and Addresses—are highly structured and support rich export formats (GeoJSON, Shapefile, FGDB). However, developers must navigate specific technical nuances: the default spatial reference is StatePlane Virginia South (WKID 2284), pagination is capped at 2,000 records, and some city mappers are currently undergoing updates. By leveraging the underlying REST APIs rather than relying solely on the web viewers, teams can rapidly build automated notifiers and interactive proposal maps.

## Access and Discovery: Richmond GeoHub and ArcGIS Online
Finding the right data requires navigating between the City's curated portals and the underlying ArcGIS infrastructure. Start at the Hub and organization home to discover content, then pivot to the Feature Service REST endpoints for API access.

* **Richmond GeoHub**: The primary open data portal is located at `https://richmond-geo-hub-cor.hub.arcgis.com/`, where users can explore data, documents, apps, and maps, as well as export the public catalog as a CSV [1] [2].
* **ArcGIS Online Organization**: The city's ArcGIS Online home is `https://cor.maps.arcgis.com/` [3].
* **Interactive Mapping Tools**: The City of Richmond maintains a centralized portal for its web apps at `https://www.rva.gov/planning-development-review/interactive-mapping-tools` [4].
* **Services Host**: The underlying REST API endpoints are hosted on `https://services1.arcgis.com/k3vhq11XkBNeeOfM/` [5] [6] [7].

To find available layers, navigate to a dataset page on the GeoHub (e.g., the Addresses dataset) and look for the "View Data Source" link, which routes directly to the REST API FeatureServer endpoint [8].

## Core Layers for Development and Planning
Four primary layers cover the vast majority of neighborhood development use cases. All of these layers support querying and extraction in multiple formats.

| Layer | REST Endpoint | Geometry | SR (WKID) | Notable Fields |
| :--- | :--- | :--- | :--- | :--- |
| **Parcels** | `/Parcels/FeatureServer/0` | Polygon | 2284 | `ParcelID`, `PIN`, `OwnerName`, `MailAddress`, `TotalValue`, `CountOfPIN` [7] |
| **Zoning Districts** | `/ZoningDistricts/FeatureServer/0` | Polygon | 2284 | `Name`, `Conditional`, `Ordinance`, `AdoptionDate` [5] |
| **Development Tracker** | `/Development_Tracker/FeatureServer/0` | Polygon | 2284 | `Status`, `Date_Updated`, `Dwelling_Units`, `Address`, `SqFt_Commercial` [6] |
| **Addresses** | `/Addresses/FeatureServer/0` | Point | Likely 2284 | Full address fields for active addresses [8] |

*Key Takeaway*: Always account for the spatial reference (SR) 2284 (StatePlane feet) when querying these layers. Web applications typically require WGS84 (SR 4326), so developers must explicitly request coordinate reprojection in their API calls.

## Land Use Project Mapper
The Land Use Project Mapper is designed to display current and recent projects from the city's Land Use Administration Division, covering both by-right developments and those requiring special approval from the City Planning Commission and City Council [4].

* **What it contains**: Real estate parcels and current Land Use projects [4].
* **Update frequency**: The City explicitly notes, "NOTE: The Land Use Project Mapper is being updated" [4]. No guaranteed Service Level Agreement (SLA) for updates is currently provided.
* **Access method**: Accessible via a web viewer linked on the City's Interactive Mapping Tools page [4].
* **Strategic Action**: Because the app is in flux, treat it as non-authoritative for automated pipelines. Instead, rely on the stable underlying approvals layers (Special Use Permits, Plans of Development, Board of Zoning Appeals) found in the Zoning map.

## Development Activity Mapper
The Development Activity Mapper is the definitive citywide project layer, tracking significant real estate developments.

* **What it contains**: Development projects valued over $1.5 million since 2016 in the City of Richmond [4].
* **How current it is**: The City warns that "This map is updated periodically so some information may have changed" [4].
* **Field structure**: The underlying `Development_Tracker` service contains highly actionable fields, including `Status` (Pipeline, Under Construction, Completed), `Project_Name`, `Project_Summary`, `Developer_Name`, `Address`, `ParcelID`, `Dwelling_Units`, `SqFt_Commercial`, `SqFt_Residential`, `Approval_Date`, and `Date_Updated` [4] [6].
* **Strategic Action**: For notification apps, filter by `Status IN ('Pipeline', 'Under Construction')` and use `Date_Updated` to trigger alerts. Always surface the `Date_Updated` field to end-users to mitigate the risk of stale data.

## Zoning Parcel Mapper
Zoning in Richmond is highly structured, utilizing base districts combined with various overlays to dictate land use.

* **Current vs. Base Zoning**: Base zoning is defined by the `ZoningDistricts` layer [5]. "Current zoning," as displayed in the Zoning Parcel Mapper, is a composite of the base district intersected with overlay layers such as Special Use Permits, Plans of Development, Board of Zoning Appeals Cases, and City Old & Historic Districts [4] [9].
* **Zoning Classifications**: The `Name` field in the `ZoningDistricts` layer uses a coded domain. Examples include residential (R-1 through R-8, R-63), commercial (B-1 through B-7), industrial (M-1, M-2), and specialized zones like TOD-1 and UB [5].
* **Structure**: The layer includes a `Conditional` field (Yes/No) and an `Ordinance` field [5]. The web map utilizes Arcade expressions to dynamically generate HTML tables in popups that link directly to ordinance PDFs (`https://apps.richmondgov.com/services/ordinanceapi/api/pdf/`) [9].

## Parcels and Boundaries
The Parcels layer combines geographic boundaries with land ownership data from the city's Computer Aided Mass Appraisal (CAMA) system [7].

* **Geometry format**: `esriGeometryPolygon` [7].
* **Address and Ownership fields**: `ParcelID` (unique identifier), `PIN`, `OwnerName`, `AsrLocationBldgNo`, `MailAddress`, `MailCity`, `MailState`, `MailZip`, `LandValue`, `DwellingValue`, and `TotalValue` [7].
* **Data Nuance**: In instances of multiple ownership records for one parcel, the geometry is duplicated or "stacked," indicated by the `CountOfPIN` field [7].
* **How to query by location**: Use a spatial query with `geometryType=esriGeometryPoint` or `esriGeometryEnvelope`, setting `spatialRel=esriSpatialRelIntersects` [7].

## How to Geocode and Find Nearby Development
To find development activity near a specific address, chain together the Addresses, Parcels, and Development Tracker layers.

1. **Find the Address Point**: Query the Addresses layer (`/Addresses/FeatureServer/0`) using a SQL `LIKE` clause on the address string to get the exact point geometry [8].
2. **Intersect with Parcels**: Pass the retrieved point geometry to the Parcels layer (`/Parcels/FeatureServer/0/query`) using `spatialRel=esriSpatialRelIntersects` to retrieve the specific `ParcelID` and `PIN` [7].
3. **Buffer and Query Development**: Buffer the parcel geometry (ensure you are calculating the buffer in SR 2284 feet, not WGS84 degrees) by the desired distance (e.g., 500 feet). Pass this buffered polygon to the `Development_Tracker` layer (`/Development_Tracker/FeatureServer/0/query`) using `spatialRel=esriSpatialRelIntersects` [6].

## ArcGIS REST API Basics
Interacting with Richmond's GeoHub requires understanding standard ArcGIS REST API parameters.

* **Attribute Queries**: Use the `where` parameter with standard SQL-92 syntax. 
 ```text
 /query?where=Status='Pipeline'&outFields=Project_Name,Dwelling_Units&f=json
 ```
* **Bounding Box Queries**: Use the `geometry` parameter with `geometryType=esriGeometryEnvelope`.
 ```text
 /query?where=1=1&geometry={"xmin":-77.5,"ymin":37.5,"xmax":-77.4,"ymax":37.6}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&f=json
 ```
* **Pagination**: The maximum record count for Parcels and Zoning is 2,000 [5] [7]. To retrieve more records, use `resultRecordCount=2000` and increment `resultOffset` (0, 2000, 4000) until `exceededLimitFeatures` returns false.
* **Projections**: Always specify `inSR=4326` (if passing GPS coordinates) and `outSR=4326` (to receive GPS coordinates back) to handle the conversion from the native 2284 StatePlane projection [5] [7].

## Use-Case Design: Notifier vs. Proposal Map
Different applications require different layer stacks and polling cadences.

| Application Type | Primary Purpose | Must-Have Layers | Polling / Update Strategy |
| :--- | :--- | :--- | :--- |
| **Neighborhood Notifier** | Alert residents to new projects and zoning changes | Development Tracker, Special Use Permits, Plans of Development, Board of Zoning Appeals [6] [9] | Poll daily/weekly. Filter by `Date_Updated` or new `Status` changes. |
| **Development Proposal Map** | Provide context and rules for a specific site | Parcels, Zoning Districts, Existing Land Use, Master Plan Future Land Use [4] [5] [7] | Render on-demand. Emphasize `Conditional` zoning flags and Ordinance PDF links. |

## Facts, Inferences, and Unknowns

### Facts (with URLs)
* The GeoHub base URL is `https://richmond-geo-hub-cor.hub.arcgis.com/` [1].
* The maximum record count for Parcels and Zoning queries is 2,000 [5] [7].
* The native spatial reference for Parcels, Zoning, and Development is WKID 2284 (StatePlane VA South feet) [5] [6] [7].
* The Development Mapper tracks projects over $1.5 million since 2016 [4].

### Inferences (Clearly Labeled)
* *Inference*: The Addresses layer is likely projected in SR 2284, matching the rest of the city's cadastral and zoning data.
* *Inference*: "Current Zoning" is not a standalone layer but a composite UI concept built by intersecting the base `ZoningDistricts` layer with various permit and overlay layers.

### Unknowns That Require Testing
* The exact underlying Feature Services and field schemas for the Land Use Project Mapper while it is "being updated."
* The precise update schedule (SLA) for the `Development_Tracker` layer, beyond the vague "updated periodically" warning.
* The complete field schemas for the Special Use Permits (SUP), Plans of Development (POD), and Board of Zoning Appeals (BZA) layers referenced in the Zoning web map.

## Developer Quick-Start: First 2 Hours
Follow this timeline to rapidly prototype against Richmond's GeoHub during a hackathon.

**Hour 0.0 - 0.5: Environment Setup**
Set up your HTTP client (Postman, curl, or Python requests). Define your base URL variable: `https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services`.

**Hour 0.5 - 1.0: Sanity Queries**
Test the core endpoints to understand the JSON structure.
* Fetch one parcel: `/Parcels/FeatureServer/0/query?where=1=1&outFields=ParcelID,PIN,OwnerName&resultRecordCount=1&f=json`
* Fetch active pipeline projects: `/Development_Tracker/FeatureServer/0/query?where=Status='Pipeline'&outFields=Project_Name,Dwelling_Units&resultRecordCount=5&f=json`

**Hour 1.0 - 1.5: Spatial Joins and Reprojection**
Implement the coordinate transformation. Query a parcel using a WGS84 bounding box by explicitly setting `inSR=4326` and `outSR=4326`. Verify that the returned geometry matches your expected location on a web map.

**Hour 1.5 - 2.0: Handle Duplicates and Pagination**
Write a deduplication function for the Parcels layer. Because parcels with multiple owners return stacked duplicate geometries (indicated by `CountOfPIN` > 1), group your results by `ParcelID` before rendering them on the map to avoid visual clutter and inaccurate analytics [7]. Implement a pagination loop using `resultOffset` to pull full neighborhood datasets.

## References

1. *Richmond GeoHub*. https://richmond-geo-hub-cor.hub.arcgis.com/
2. *Dataset - Richmond GeoHub - ArcGIS*. https://richmond-geo-hub-cor.hub.arcgis.com/search
3. *Richmond, VA - ArcGIS Online*. https://cor.maps.arcgis.com/
4. *Interactive Mapping Tools | Richmond*. https://www.rva.gov/planning-development-review/interactive-mapping-tools
5. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/ZoningDistricts/FeatureServer/0?f=pjson
6. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Development_Tracker/FeatureServer/0?f=pjson
7. *Fetched web page*. https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Parcels/FeatureServer/0?f=pjson
8. *Addresses | Richmond GeoHub - ArcGIS Online*. https://richmond-geo-hub-cor.hub.arcgis.com/datasets/674d645c444f4191998f0ebb96e56047_0/about
9. *Fetched web page*. https://www.arcgis.com/sharing/rest/content/items/803e41f50adf4f3ca6e71f95823e6b87/data?f=pjson