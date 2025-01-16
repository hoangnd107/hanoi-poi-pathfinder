// !LAYER BACKGROUND
let layerBG = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

// !LAYER LOCATION
locationLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
});

// !LAYER TARGET
let targetLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "./public/icons/destination.svg",
    }),
  }),
});

// !LAYER DISTRICT
let districtStyles = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: "red",
    width: 2,
  }),
  fill: new ol.style.Fill({
    color: "rgba(255, 0, 0, 0.05)",
  }),
});

let districtLayer = new ol.layer.Vector({
  style: districtStyles,
});

// !LAYER RADIUS
let radiusStyles = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: "blue",
    width: 2,
  }),
  fill: new ol.style.Fill({
    color: "rgba(0, 0, 255, 0.05)",
  }),
});

let radiusLayer = new ol.layer.Vector({
  style: radiusStyles,
});

// !LAYER POIS
let poisStyles = {
  bar: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/bar.svg",
    }),
  }),
  restaurant: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/restaurant.svg",
    }),
  }),
  pub: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/pub.svg",
    }),
  }),
  cafe: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/cafe.svg",
    }),
  }),
  fast_food: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/fast_food.svg",
    }),
  }),
  food_court: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/food_court.svg",
    }),
  }),
  biergarten: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/biergarten.svg",
    }),
  }),
  default: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: "./public/icons/restaurant.svg",
    }),
  }),
};

function getPoisStyle(feature) {
  const type = feature.get("type");

  return poisStyles[type] || poisStyles["default"];
}

let poisLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: getPoisStyle,
});

// !LAYER ROUTE
let routeLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "blue",
      width: 4,
    }),
  }),
});

// !LAYER ROADS
let roadsLayer = new ol.layer.Image({
  source: null,
});

// !LAYER ROADS BUFFER
let roadsBufferLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "green",
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: "rgba(0, 255, 0, 0.1)",
    }),
  }),
});
