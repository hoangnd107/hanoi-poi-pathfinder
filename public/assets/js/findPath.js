function findPath() {
    if(!currentX || !currentY) {
        alert('Chọn điểm xuất phát');
        return;
    }

    if(!targetX || !targetY) {
        alert('Chọn điểm đích');
        return;
    }
    
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
                source = createVectorSource(result.data.route);
                routeLayer.setSource(source);
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