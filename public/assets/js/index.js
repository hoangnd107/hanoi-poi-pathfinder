var format = "image/png";
var map;

// Infomation of HaNoi
var minX = 105.28446960449219;
var minY = 20.56036949157715;
var maxX = 106.02372741699219;
var maxY = 21.389314651489258;
var cenX = (minX + maxX) / 2;
var cenY = (minY + maxY) / 2;

var ThuyLoiX = 105.82635310292142;
var ThuyLoiY = 21.006057858375527;

var mapLat = ThuyLoiY;
var mapLng = ThuyLoiX;
var mapDefaultZoom = 15;

var currentX = null;
var currentY = null;
var targetX = null;
var targetY = null;

var isSelectingLocation = false;
var locationLayer;

// LAYER DISTRICT
let districtStyles = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 2,
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255, 0, 0, 0.05)',
    }),
})

let districtLayer = new ol.layer.Vector({
    style: districtStyles,
})

// LAYER POIS
let poisStyles = {
    'bar': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/bar.svg',
        }),
    }),
    'restaurant': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/restaurant.svg',
        }),
    }),
    'pub': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/pub.svg',
        }),
    }),
    'cafe': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/cafe.svg',
        }),
    }),
    'fast_food': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/fast_food.svg',
        }),
    }),
    'food_court': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/food_court.svg',
        }),
    }),
    'biergarten': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/biergarten.svg',
        }),
    }),
    'default': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: './public/assets/icons/catering/restaurant.svg',
        }),
    }),
}

function getPoisStyle(feature) {
    const type = feature.get('type');
   
    return poisStyles[type] || poisStyles['default'];
}

let poisLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: getPoisStyle
})

let currentPosLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                anchorXUnits: "fraction",
                anchorYUnits: "fraction",
                src: "./public/assets/icons/destination.svg",
            }),
        })    
})

function initMap() {
    var layerBG = new ol.layer.Tile({
        source: new ol.source.OSM(),
    });
    
    var viewMap = new ol.View({
        center: ol.proj.fromLonLat([mapLng, mapLat]),
        zoom: mapDefaultZoom,
    });

    // Single vector layer for location
    locationLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });

    map = new ol.Map({
        target: "map",
        layers: [layerBG, locationLayer, poisLayer],
        view: viewMap,
    });

    // Map click handler
    map.on('click', function(evt) {
        if (isSelectingLocation) {
            const coords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            setLocation(coords[0], coords[1]);
            isSelectingLocation = false;
            map.getViewport().style.cursor = 'default';
        }
    });
}

function highLightGeoJsonObj(paObjJson) {
    var vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(paObjJson, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
        }),
    });

    // Áp dụng style icon cho tất cả các điểm
    var stylePoint = new ol.style.Style({
        image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "./public/assets/icons/destination.svg",
        }),
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: stylePoint,
    });

    map.addLayer(vectorLayer);
}

function showAllPoints() {
    $.ajax({
        url: "api/index.php",
        type: "POST",
        data: { functionName: "getAllPoints" },
        success: function (result) {
        if (result !== "null") {
            var objJson = JSON.parse(result.data);
            highLightGeoJsonObj(objJson);
        } else {
            alert("No data found");
        }
        },
        error: function () {
        alert("Không thể tải dữ liệu!");
        },
    });
}

function setLocation(longitude, latitude) {
    currentX = longitude;
    currentY = latitude;
    
    const coords = [longitude, latitude];
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(coords))
    });

    const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            src: './public/assets/icons/current.svg',
        })
    });

    feature.setStyle(iconStyle);
    
    // Update marker
    locationLayer.getSource().clear();
    locationLayer.getSource().addFeature(feature);

    // Center map
    map.getView().animate({
        center: ol.proj.fromLonLat(coords),
        zoom: 16,
        duration: 1000
    });
}

function startSelectLocation() {
    locationLayer.getSource().clear();
    isSelectingLocation = true;
    map.getViewport().style.cursor = 'crosshair';
}

function showCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        setLocation(position.coords.longitude, position.coords.latitude);
    }, function() {
        alert('Unable to get your location');
    });
}

// 
const btnTest = document.getElementById('test');

function test() {
    $.ajax({
        url: 'api/index.php',
        type: 'POST',
        data: {
            functionName: 'test',
        },
        success: function (result) {
            if (result !== 'null') {
                console.log('Result:', result.data);

                const pois = {
                    type: 'FeatureCollection',
                    features: result.data.map(poi => {
                        return {
                            type: 'Feature',
                            geometry: poi.geom,
                            properties: {
                                type: poi.type,
                            }
                        }
                    })
                }

                console.log(pois);

                let poisSource = new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(
                        pois, 
                        {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3857'
                        }
                    )
                })

                poisLayer.setSource(poisSource)

                console.log('Done!');
            } else {
                alert('Không tìm thấy POIs!');
            }
        },
        error: function () {
            alert('Lỗi: Không thể gọi API getPois!');
        }
    })
}

btnTest.addEventListener('click', test);