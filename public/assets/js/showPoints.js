let selectLv2 = document.getElementById('select-lv2');
let selectDistrict = document.getElementById('select-district');
let selectRadius = document.getElementById('select-radius');

function showAllPoints() {
    let option = selectLv2.value;
    let district = selectDistrict.value;
    let radius = selectRadius.value;
    if(!district && !radius) {
        alert('Chọn Quận/Huyện hoặc bán kính tìm kiếm');
    }else if(startedLocation === false) {
        alert('Chưa chọn vị trí trên bản đồ');
        return;
    }

    $.ajax({
        url: "api/index.php",
        type: "POST",
        data: { 
            functionName: "getAllPoints",
            currentX,
            currentY,
            option,
            district,
            radius
        },
        success: function (result) {
            if (result.data !== "null") {
                source = createVectorSource(result.data);
                poisLayer.setSource(source);
            } else {
                alert("Không có kết quả nào được tìm thấy");
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            console.log(status + error);
        },
    });
}

function showDetailPoint() {
    console.log('Start show detail point');
    
    $.ajax({
        url: "api/index.php",
        type: "POST",
        data: { 
            functionName: "getInfoPoint",
            pointDestiny: 'POINT(' + targetX + ' ' + targetY + ')'
        },
        success: function (result) {
            if (result.data !== "null") {
                document.getElementById('info-container').style.display = 'block';
                document.getElementById('info-content').innerText = result.data;
                document.getElementById('btn-show-details').style.display = 'none';
                // displayObjInfo(result.data, [targetX, targetY]);
            } else {
                alert("No data found");
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            console.log(status + error);
        },
    });
}
function displayObjInfo(info, coordinate) {
    // Tìm element để hiển thị thông tin
    var infoDiv = document.getElementById('btn-show-details');
    if (infoDiv) {
        infoDiv.innerHTML = `
        <div class="info-container">
            <p class="info-title">Thông tin địa điểm:</p>
            <p class="info-content">${info}</p>
        </div>
        `;
    } else {
        console.warn('Info element not found!');
    }
}
