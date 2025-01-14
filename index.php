<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group 1 - WebGIS</title>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <link rel="stylesheet" href="public/assets/css/index.css">
</head>

<body onLoad="initMap();">
    <div class="map" id="map"></div>
    <div class="info" id="info"></div>
    <?php include 'src/menuStart.php'; ?>
    <?php include 'src/menuFeature.php'; ?>

    <script src="public/assets/js/index.js"></script>
</body>

</html>