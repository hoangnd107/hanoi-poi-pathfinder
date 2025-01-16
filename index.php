<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGIS</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <link rel="stylesheet" href="public/css/index.css">
    <link rel="stylesheet" href="public/css/menuFeature.css">
    <link rel="stylesheet" href="public/css/menuStart.css">
</head>

<body onload="initMap()">
    
    <div class="map" id="map">
        <button class="btn-show-details" id="btn-show-details" onclick="showDetailPoint()" disabled>Hiển thị chi tiết</button>
        <div class="info-container" id="info-container">
            <p class="info-title">Thông tin địa điểm:</p>
            <p class="info-content" id="info-content"></p>
            <div class="find-path">
                <p id="path-length"></p>
                <button id="btn-find-path" class="btn-find-path" onclick="findPath()">Tìm đường đi</button>
            </div>
        </div>
    </div>

    <?php include 'public/php/menuStart.php'; ?>
    <?php include 'public/php/menuFeature.php'; ?>
    
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    
    <script src="public/js/layer.js"></script>
    <script src="public/js/index.js"></script>
    <script src="public/js/location.js"></script>
    <script src="public/js/menuFeature.js"></script>
    <script src="public/js/menuStart.js"></script>
    <script src="public/js/utils.js"></script>
    <script src="public/js/showPoints.js"></script>
    <script src="public/js/findPath.js"></script>
</body>

</html>
