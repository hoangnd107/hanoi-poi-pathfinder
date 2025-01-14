var format = "image/png";
var map;
// var minX = 105.28446960449219;
// var minY = 20.56036949157715;
// var maxX = 106.02372741699219;
// var maxY = 21.389314651489258;
var cenX = 105.82635310292142;
var cenY = 21.006057858375527;
var mapLat = cenY;
var mapLng = cenX;
var mapDefaultZoom = 15;

//Biến toàn cục
var currentX = null;
var currentY = null;
var targetX = null;
var targetY = null;

var isSelectingLocation = false;
var locationLayer;

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
        layers: [layerBG, locationLayer],
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

    function highLightObj(result){
        var objJson = createJsonObj(result);
        highLightGeoJsonObj(objJson);
    }

    function displayObjInfo(info, coordinate) {
        // Tìm element để hiển thị thông tin
        var infoDiv = document.getElementById('info');
        if (infoDiv) {
            // Cập nhật nội dung
            infoDiv.innerHTML = `
            <div style="position: absolute;z-index:1;background-color: white; padding: 10px; border: 1px solid black; top: 10px; left: 10px;"
                <p style="font-size: 12px; line-height: 1.5; margin: 0; word-wrap: break-word;"><strong>Thông tin địa điểm:</strong></p>
                <p style="font-size: 12px; line-height: 1.5; margin: 0; word-wrap: break-word;">${info}</p>
            </div>
            `;
        } else {
            console.warn('Info element not found!');
        }
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
        console.log(pointDestiny);
        $.ajax({
            url: "api/index.php",
            type: "POST",
            data: { 
                functionName: "getGeomPoint",
                pointDestiny: pointDestiny
            },
            success: function (result) {
                console.log('Result:', result.data);
                if (result !== "null") {
                    var objJson = JSON.parse(result.data);
                    highLightAllPoints(objJson);
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

function highLightObj(paObjJson) {
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

function highLightAllPoints(paObjJson) {
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
        src: "./public/assets/icons/general.svg",
        }),
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: stylePoint,
    });

    map.addLayer(vectorLayer);
}

let selectLv1 = document.getElementById('select-lv1');
let selectLv2 = document.getElementById('select-lv2');
let selectDistrict = document.getElementById('select-district');
let selectRadius = document.getElementById('select-radius');

function showAllPoints() {
    let level1 = selectLv1.value;
    let level2 = selectLv2.value;
    let district = selectDistrict.value;
    let radius = selectRadius.value;

    if(!level1 && !level2) {
        alert('Chọn loại điểm cần hiển thị');
    } else {
        if(!district && !radius) {
            alert('Chọn Quận/Huyện hoặc bán kính tìm kiếm');
        }
    }

    $.ajax({
        url: "api/index.php",
        type: "POST",
        data: { 
            functionName: "getAllPoints",
            myPoint: 'POINT(' + currentX + ' ' + currentY + ')',
            level1: level1,
            level2: level2,
            district: district,
            radius: radius
        },
        success: function (result) {
        if (result.data !== "null") {
            // console.log(result.data);
            // var objJson = JSON.parse(result.data);
            // console.log(objJson);
            highLightAllPoints(result.data);
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