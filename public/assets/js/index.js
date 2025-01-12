//Hiệu chỉnh map
var format = "image/png";
var map;
var minX = 105.28446960449219;
var minY = 20.56036949157715;
var maxX = 106.02372741699219;
var maxY = 21.389314651489258;
var cenX = (minX + maxX) / 2 + 0.17;
var cenY = (minY + maxY) / 2 + 0.03;
var mapLat = cenY;
var mapLng = cenX;
var mapDefaultZoom = 15;

//Biến toàn cục
var targetX = null;
var targetY = null;
var targetGeom = null;


// Add current location variables
var currentX = null;
var currentY = null;
var currentLocationLayer;

// Add these variables at the top with other variables
var isSelectingLocation = false;
var selectedLocationLayer;

var selectionMode = null; // 'current' or 'custom' or null

function initMap() {
    var layerBG = new ol.layer.Tile({
        source: new ol.source.OSM(),
    });
    var viewMap = new ol.View({
        center: ol.proj.fromLonLat([mapLng, mapLat]),
        zoom: mapDefaultZoom,
    });
    map = new ol.Map({
      target: "map",
      layers: [layerBG, currentLocationLayer, selectedLocationLayer],
      view: viewMap,
    });

    currentLocationLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });

    selectedLocationLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });

    // Add click handler for map
    map.on('click', function(evt) {
        if (isSelectingLocation) {
            const coords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            setSelectedLocation(coords[0], coords[1]);
            isSelectingLocation = false;
            map.getViewport().style.cursor = 'default';
        }
    });
}

function showCurrentLocation() {
    if (selectionMode === 'current') {
        // Deactivate if already active
        selectionMode = null;
        currentLocationLayer.getSource().clear();
        return;
    }

    // Clear other mode
    if (selectionMode === 'custom') {
        selectedLocationLayer.getSource().clear();
        isSelectingLocation = false;
        map.getViewport().style.cursor = 'default';
    }

    selectionMode = 'current';
    
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        currentX = position.coords.longitude;
        currentY = position.coords.latitude;
        
        const coords = [currentX, currentY];
        
        const feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coords))
        });

        const iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: "../icons/currentLocation.svg",
            scale: 1.5,
          }),
        });

        feature.setStyle(iconStyle);

        // Clear previous location and add new one
        currentLocationLayer.getSource().clear();
        currentLocationLayer.getSource().addFeature(feature);

        // Center map on location
        map.getView().animate({
            center: ol.proj.fromLonLat(coords),
            zoom: 16,
            // duration: 1000
        });
    }, function() {
        alert('Unable to get your location');
    });
}

// Helper function to check if we have current location
function hasCurrentLocation() {
    return currentX !== null && currentY !== null;
}

function someLocationBasedFeature() {
    if (!hasCurrentLocation()) {
        alert('Please select your location first');
        return;
    }
    alert('Current location: ' + currentX + ', ' + currentY);
}

function startSelectLocation() {
    if (selectionMode === 'custom') {
        // Deactivate if already active
        selectionMode = null;
        selectedLocationLayer.getSource().clear();
        isSelectingLocation = false;
        map.getViewport().style.cursor = 'default';
        return;
    }

    // Clear other mode
    if (selectionMode === 'current') {
        currentLocationLayer.getSource().clear();
    }

    selectionMode = 'custom';
    isSelectingLocation = true;
    map.getViewport().style.cursor = 'crosshair';
}

function setSelectedLocation(longitude, latitude) {
    currentX = longitude;
    currentY = latitude;
    
    const coords = [longitude, latitude];
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(coords))
    });

    const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: '../icons/currentLocation.svg',
            scale: 1.5
        })
    });

    feature.setStyle(iconStyle);

    // Clear previous selection and add new one
    selectedLocationLayer.getSource().clear();
    selectedLocationLayer.getSource().addFeature(feature);

    // Center map on selected location
    map.getView().animate({
        center: ol.proj.fromLonLat(coords),
        zoom: 16,
        // duration: 1000
    });
}