function createVectorSource(geojsonObject) {
    let vectorSource = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(geojsonObject, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
        }),
    })
    return vectorSource
}

function callAPI(endpoint, type, callback) {
    $.ajax({
        url: endpoint,
        type: type,
        success: function(response) {
            const data = response.data
            console.log(data);
            callback(response)
        },
        error: function(error) {
            console.error('Error fetching data:', error)
            alert('Error fetching data')
        }
    })
}