let addedLayers = [];
function toggleMenuFeature() {
    const sidebar = document.getElementById('sidebar');
    const map = document.getElementById('map');
    const btnToggle = document.getElementById('btn-toggle-sidebar');
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
function clearAllLayers() {
    poisLayer.getSource().clear();
    roadsBufferLayer.getSource().clear();
    targetLayer.getSource().clear();
    routeLayer.getSource().clear();

    addedLayers.forEach((layer) => {
        map.removeLayer(layer);
    });
    addedLayers = [];
}
function drawDistrictBoundary(districtName) {
    $.ajax({
        url: './api/index.php',
        type: 'POST',
        data: { functionName: 'getGeomByDistrict', districtName },
        success: function (response) {
            try {
                console.log(response);
                if (response.error) {
                    alert(response.error);
                    return;
                }
                const geom = response.data[0]?.geom;
                if (geom) {
                    const format = new ol.format.GeoJSON();
                    const feature = format.readFeature(geom, {
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857',
                    });
    
                    const vectorSource = new ol.source.Vector({
                        features: [feature],
                    });
    
                    const vectorLayer = new ol.layer.Vector({
                        source: vectorSource,
                        style: new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'red',
                                width: 2,
                            }),
                            fill: new ol.style.Fill({
                                color: 'rgba(255, 0, 0, 0.05)',
                            }),
                        }),
                    });
    
                    map.addLayer(vectorLayer);
                    addedLayers.push(vectorLayer);
                } else {
                    alert('Không thể tải boundary của quận/huyện!');
                }
            } catch (error) {
                console.error('Lỗi khi xử lý dữ liệu trả về:', error);
                alert('Dữ liệu trả về không hợp lệ.');
            }
        },
    });
}
function drawRadiusCircle(x, y, radius) {
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
                color: 'rgba(0, 0, 255, 0.05)'
            })
        })
    });
    map.addLayer(vectorLayer);
    addedLayers.push(vectorLayer);
}
function handleSearch() {
    const districtSelect = document.getElementById('select-district');
    const radiusInput = document.getElementById('select-radius');

    const selectedDistrict = districtSelect.value;
    const radiusValue = radiusInput.value;

    clearAllLayers();
    if (selectedDistrict && radiusValue) {
        drawDistrictBoundary(selectedDistrict);
        drawRadiusCircle(currentX, currentY, radiusValue);
    } else if (selectedDistrict) {
        drawDistrictBoundary(selectedDistrict);
    } else if (radiusValue) {
        drawRadiusCircle(currentX, currentY, radiusValue);
    } else {
        alert('Vui lòng chọn Quận/Huyện hoặc nhập Bán kính hoặc cả hai!');
    }
}
function handleReset() {
    const sidebar = document.querySelector('.sidebar-content');
    const selects = sidebar.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
    const inputs = sidebar.querySelectorAll('.select-radius');
    inputs.forEach(input => {
        input.value = '';
    });
    const resultText = sidebar.querySelector('.result-text');
    if (resultText) {
        resultText.textContent = 'Kết quả tìm được: ';
    }
    
    document.getElementById('info-container').style.display = 'none';
    document.getElementById('info-content').innerText = '';
    document.getElementById('btn-show-details').style.display = 'block';
    document.getElementById('btn-show-details').disabled = true;

    clearAllLayers();
    loadDistrictOptions();
} 

document.addEventListener('DOMContentLoaded', function () {
    loadDistrictOptions();

    var selectRadius = document.getElementById('select-radius');
    var btnReset = document.getElementById('btn-reset');
    var selectDistrict = document.getElementById('select-district');
    var selectOption = document.getElementById('select-lv2');

    // Thêm sự kiện input cho select-radius
    selectRadius.addEventListener('input', function () {
        if (selectRadius.value) {
            selectRadius.disabled = true;
        }
    });
    selectDistrict.addEventListener('change', function () {
        if (selectDistrict.value) {
            selectDistrict.disabled = true;
        }
    });
    selectOption.addEventListener('change', function () {
        if (selectOption.value) {
            selectOption.disabled = true;
        }
    });

    // Cập nhật hàm handleReset để kích hoạt lại select-radius
    btnReset.addEventListener('click', function () {
        selectOption.disabled = false;
        selectDistrict.disabled = false;
        selectRadius.disabled = false;
        selectRadius.value = ''; // Xóa giá trị trong input
    });
    const districtSelect = document.getElementById('select-district');
    const radiusInput = document.getElementById('select-radius');
    districtSelect.addEventListener('change', handleSearch);
    radiusInput.addEventListener('input', handleSearch);
});


function showRoad() {
    if(mode === 'click-road') {
        roadsLayer.setSource(null)
        mode = 'do-nothing'
    }
    else {
        mode = 'click-road'
        roadsLayer.setSource(new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.0',
                'STYLES': '',
                'LAYERS': 'thuchanh:hanoi_roads',
            }
        }));
    }
}

function getPoisByRoad(evtCoordinate) {
    const coords = ol.proj.transform(evtCoordinate, 'EPSG:3857', 'EPSG:4326');
    let lon = coords[0];
    let lat = coords[1];
    let pointClick = 'POINT(' + lon + ' ' + lat + ')';

    let option = document.getElementById('select-lv2').value;
    $.ajax({
        url: "api/index.php",
        type: "POST",
        data: { 
            functionName: "getPoisByRoad",
            pointClick: pointClick,
            option: option
        },
        success: function (result) {
            if (result.data !== "null") {
                let sourcePoints = createVectorSource(result.data.points);
                poisLayer.setSource(sourcePoints);

                let sourceRoadBuffer = createVectorSource(result.data.roadBuffer);
                roadsBufferLayer.setSource(sourceRoadBuffer);
            } else {
                alert("Không có kết quả nào được tìm thấy!");
            }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + status + ' ' + error);
        },
    });
}
