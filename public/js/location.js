function setLocation(longitude, latitude) {
  currentX = longitude;
  currentY = latitude;

  const coords = [longitude, latitude];
  const feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(coords)),
  });

  const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      src: "./public/icons/current.svg",
    }),
  });

  feature.setStyle(iconStyle);

  // Update marker
  locationLayer.getSource().clear();
  locationLayer.getSource().addFeature(feature);

  // Center map
  map.getView().animate({
    center: ol.proj.fromLonLat(coords),
    zoom: 16,
    duration: 1000,
  });
  startedLocation = true;
}

function startSelectLocation() {
  locationLayer.getSource().clear();
  isSelectingLocation = true;
  map.getViewport().style.cursor = "crosshair";
}

function showCurrentLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      setLocation(position.coords.longitude, position.coords.latitude);
    },
    function () {
      alert("Unable to get your location");
    }
  );
}
