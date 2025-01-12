console.log("Menu feature");

function toggleMenuFeature() {
    const sidebar = document.getElementById('sidebar');
    const map = document.getElementById('map');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        map.classList.remove('shift');
    } else {
        sidebar.classList.add('open');
        map.classList.add('shift');
    }
}
function loadDistrictOptions() {
    $.ajax({
        url: './api/index.php',
        type: 'POST',
        data: { functionName: 'getNameByDistrict' },
        success: function (response) {
            const districts = response.data;
            const districtSelect = document.getElementById('select-district');
            districtSelect.innerHTML = '<option value="" disabled selected>Chọn Quận/Huyện</option>';
            districts.forEach((district) => {
                const option = document.createElement('option');
                option.value = district.name_2;
                option.textContent = district.name_2;
                districtSelect.appendChild(option);
            });
        },
        error: function () {
            alert("Không thể tải danh sách Quận/Huyện!");
        }
    });
}
function drawDistrictBoundary(districtName) {
    $.ajax({
        url: './api/index.php',
        type: 'POST',
        data: { functionName: 'getGeomByDistrict', districtName },
        success: function (response) {
            const geom = response.data[0]?.geom;
            if (geom) {
                const format = new ol.format.GeoJSON();
                const feature = format.readFeature(geom, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                });
                const vectorSource = new ol.source.Vector({
                    features: [feature]
                });
                const vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 2
                        })
                    })
                });
                map.addLayer(vectorLayer);
            }
        },
        error: function () {
            alert('Không thể tải boundary của quận/huyện!');
        }
    });
}
function drawRadiusCircle(x = 105.824163, y = 21.006762, radius) {
    const circleFeature = new ol.Feature({
        geometry: new ol.geom.Circle(ol.proj.fromLonLat([x, y]), radius * 1000)
    });

    const vectorSource = new ol.source.Vector({
        features: [circleFeature]
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        })
    });

    map.addLayer(vectorLayer);
}
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.querySelector('.btn-reset');
    const sidebar = document.querySelector('.sidebar-content');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const selects = sidebar.querySelectorAll('select');
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
            const inputs = sidebar.querySelectorAll('select-radius');
            inputs.forEach(input => {
                input.value = '';
            });
            const resultText = sidebar.querySelector('result-text');
            if (resultText) {
                resultText.textContent = 'Kết quả tìm được: ';
            }
        });
    };
    loadDistrictOptions();
});