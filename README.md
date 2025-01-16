# Points of Interest Finder - Hanoi City

A web-based GIS application for finding points of interest (POIs) and determining optimal routes in Hanoi city. The application provides an interactive map interface with various search and filtering capabilities.

## Features

### Location management
- Get current user location
- Manual location selection on map
- Display current location marker

### POI Search Features
- Search POIs by district
- Search within radius from current location
- Filter POIs by categories

### Route Features
- Find shortest path between current location and selected POI
- Display route visualization
- Show route distance
- Road-based POI search with buffer zone visualization

### Map Features
- Interactive OpenLayers map interface
- District boundary visualization
- Search radius visualization
- Multiple map layers support

## Getting Started

1. Clone the repository
2. Set up database configuration:
- Copy constants.example.php to config/constants.php
- Configure database settings
- Run the SQL script in the `db` folder to create tables and populate data
3. Set up GeoServer: Configure WMS layers for roads layer
4. Start your PHP server

## Project structure

```bash
├── api/                # Backend API endpoints
├── config/             # Configuration files
├── db/                 # Database filter files
├── helpers/            # Helper functions
├── public/             # Frontend assets
│   ├── css/            # Stylesheets
│   ├── icons/          # Icon assets
│   ├── js/             # JavaScript files
│   └── php/            # PHP template files
└── index.php           # Main entry point
```

## Authors

  - **Thang Vu Ba**
  - **Huyen Trinh Phuong**
  - **Hoang Nguyen Duy**
  - **Tu Ha Anh**
