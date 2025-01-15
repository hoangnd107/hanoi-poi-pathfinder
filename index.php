<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group 1 - WebGIS</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <link rel="stylesheet" href="public/assets/css/index.css">
    <link rel="stylesheet" href="public/assets/css/menuFeature.css">
    <link rel="stylesheet" href="public/assets/css/menuStart.css">
</head>

<body onLoad="initMap()">
    <div class="map" id="map">
        <button class="btn-show-details" id="btn-show-details" onclick="showDetailPoint()" disabled>Hiển thị chi tiết</button>
        <div class="info-container" id="info-container">
            <p class="info-title">Thông tin địa điểm:</p>
            <p class="info-content" id="info-content"></p>
        </div>
    </div>
    <?php include 'src/menuStart.php'; ?>
    <?php include 'src/menuFeature.php'; ?>
    
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <script src="public/assets/js/layer.js"></script>
    <script src="public/assets/js/index.js"></script>
    <script src="public/assets/js/menuFeature.js"></script>
    <script src="public/assets/js/menuStart.js"></script>
    <script src="public/assets/js/utils.js"></script>
    <script src="public/assets/js/showPoints.js"></script>
</body>

</html>