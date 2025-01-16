var format = "image/png";
var map;

var TLU_x = 105.82635310292142;
var TLU_y = 21.006057858375527;
var mapLat = TLU_y;
var mapLng = TLU_x;
var mapDefaultZoom = 15;

var currentX = null;
var currentY = null;
var targetX = null;
var targetY = null;

var isSelectingLocation = false;
var locationLayer;
var startedLocation = false;

var mode;

function initMap() {

  map = new ol.Map({
	target: "map",
	layers: [
	  layerBG,
	  locationLayer,
	  targetLayer,
	  districtLayer,
	  radiusLayer,
	  poisLayer,
	  roadsLayer,
	  routeLayer,
	  roadsBufferLayer,
	],
	view: new ol.View({
	  center: ol.proj.fromLonLat([mapLng, mapLat]),
	  zoom: mapDefaultZoom,
	}),
  });

  map.on("singleclick", function (evt) {
	if (mode === "click-road") {
	  mode = "do-nothing";
	  roadsLayer.setSource(null);
	  getPoisByRoad(evt.coordinate);
	  return;
	}

	if (isSelectingLocation) {
	  const coords = ol.proj.transform(
		evt.coordinate,
		"EPSG:3857",
		"EPSG:4326"
	  );
	  setLocation(coords[0], coords[1]);
	  isSelectingLocation = false;
	  map.getViewport().style.cursor = "default";
	  return;
	}
	
	const coords = ol.proj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
	let lon = coords[0];
	let lat = coords[1];
	let pointDestiny = "POINT(" + lon + " " + lat + ")";
	let option = document.getElementById("select-lv2").value;

	$.ajax({
	  url: "api/index.php",
	  type: "POST",
	  data: {
		functionName: "getGeomPoint",
		pointDestiny: pointDestiny,
		option: option,
	  },
	  success: function (result) {
		console.log("Result:", result.data);
		if (result !== "null") {
		  targetX = result.data.exactPoint.coordinates[0];
		  targetY = result.data.exactPoint.coordinates[1];

		  let source = createVectorSource(result.data.geoJson);
		  document.getElementById("btn-show-details").disabled = false;
		  targetLayer.setSource(source);
		  poisLayer.getSource().clear();
		} else {
		  alert("No data found");
		}
	  },
	  error: function (xhr, status, error) {
		console.log("Error: " + status + " " + error);
	  },
	});
  });
}
