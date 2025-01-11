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
        layers: [layerBG],
        view: viewMap,
    });
}