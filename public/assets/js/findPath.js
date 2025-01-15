function findPath() {
    if(!currentX || !currentY) {
        alert('Chọn điểm xuất phát');
        return;
    }

    if(!targetX || !targetY) {
        alert('Chọn điểm đích');
        return;
    }
    
    console.log('Bắt đầu tìm đường đi');

    $.ajax({
        url: "api/index.php",
        type: "POST",
        data: { 
            functionName: "getRoute",
            currentX,
            currentY,
            targetX,
            targetY
        },
        success: function (result) {
            if (result.data !== "null") {
                console.log('Result: ', result.data);
                let totalLength = result.data.totalLength;
                if (totalLength >= 1000) {
                    totalLength = (totalLength / 1000).toFixed(2) + " km";
                } else {
                    totalLength = Math.round(totalLength) + " m";
                }
                document.getElementById('path-length').innerText = "Chiều dài đường đi: " + totalLength;
                source = createVectorSource(result.data.route);
                routeLayer.setSource(source);
            } else {
                alert("Không tìm thấy đường đi");
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            console.log(status + error);
        },
    });
}