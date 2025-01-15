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
var startedLocation = false;

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
        layers: [layerBG, locationLayer, targetLayer, poisLayer, routeLayer, districtLayer, radiusLayer],
        view: viewMap,
    });

    function createJsonObj(result){
        console.log(result);
        let geoJsonObj = {
            type: "FeatureCollection",
            crs: 
                {
                    type: "name",
                    properties: {
                        name: "EPSG:4326"
                    }
                },
            features: [
                {
                    type: "Feature",
                    geometry: JSON.parse(result),
                }
            ]
        }
        return geoJsonObj;
    }


    // Map click handler
    // map.on('click', function(evt) {
    //     const coords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    //     let lon = coords[0];
    //     let lat = coords[1];
    //     let pointDestiny = 'POINT(' + lon + ' ' + lat + ')';
    //     console.log(pointDestiny);
    //     $.ajax({
    //         url: 'api/index.php',
    //         type: 'POST',
    //         data: {
    //             functionName: 'getInfoPoint',
    //             pointDestiny: pointDestiny
    //         },
    //         success: function(result) {
    //             console.log('HELLO WORLD')
    //             console.log('Result:', result.data);
    //             if (!result || result === 'null') {
    //                 console.log('No data found or invalid response');
    //                 return;
    //             }

    //             // Kiểm tra nếu result không rỗng hoặc không phải 'null'
    //             if (result && result.trim() !== 'null') {

    //                     // Hiển thị thông tin đối tượng trên giao diện
    //                     displayObjInfo(result, evt.coordinate);

    //                     // Gọi hàm highlight nếu có dữ liệu
    //                     highLightObj(result);
    //                 } else {
    //                     console.warn('No data found or invalid response.');
    //             }   
    //         }, error: function(status, error) {
    //             console.log('Error: ' + status + ' ' + error);
    //             // alert('Error: ' + status + ' ' + error);
    //         }
    //     })
    //     console.log('Clicked')
    //     if (isSelectingLocation) {
    //         const coords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    //         setLocation(coords[0], coords[1]);
    //         isSelectingLocation = false;
    //         map.getViewport().style.cursor = 'default';
    //     }
    // });
    map.on('singleclick', function(evt) {
        const coords = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        let lon = coords[0];
        let lat = coords[1];
        let pointDestiny = 'POINT(' + lon + ' ' + lat + ')';
        let option = document.getElementById('select-lv2').value;
      
        $.ajax({
            url: "api/index.php",
            type: "POST",
            data: { 
                functionName: "getGeomPoint",
                pointDestiny: pointDestiny,
                option: option
            },
            success: function (result) {
                console.log('Result:', result.data);
                if (result !== "null") {
                    targetX = result.data.exactPoint.coordinates[0]
                    targetY = result.data.exactPoint.coordinates[1]

                    let source = createVectorSource(result.data.geoJson);
                    document.getElementById('btn-show-details').disabled = false;
                    targetLayer.setSource(source);
                    poisLayer.getSource().clear();
                } else {
                    alert("No data found");
                }
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + status + ' ' + error);
            },
        });
    });
}

// function highLightObj(paObjJson) {
//     var vectorSource = new ol.source.Vector({
//         features: new ol.format.GeoJSON().readFeatures(paObjJson, {
//         dataProjection: "EPSG:4326",
//         featureProjection: "EPSG:3857",
//         }),
//     });

//     // Áp dụng style icon cho tất cả các điểm
//     var stylePoint = new ol.style.Style({
//         image: new ol.style.Icon({
//         anchor: [0.5, 0.5],
//         anchorXUnits: "fraction",
//         anchorYUnits: "fraction",
//         src: "./public/assets/icons/destination.svg",
//         }),
//     });

//     var vectorLayer = new ol.layer.Vector({
//         source: vectorSource,
//         style: stylePoint,
//     });

//     map.addLayer(vectorLayer);
// }

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
    startedLocation = true;
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