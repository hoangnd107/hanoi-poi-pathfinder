<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'config/constants.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group 1 - WebGIS</title>
    <script src="<?= OPENLAYERS_JS_URL ?>" type="text/javascript"></script>
    <script src="<?= JQUERY_JS_URL ?>"></script>
    <link rel="stylesheet" href="<?= OPENLAYERS_CSS_URL ?>" type="text/css">
    <script src="<?= AJAX_GGAPIS_JS_URL ?>"></script>

    <script src="<?= BASE_ASSETS_URL ?>/js/index.js"></script>
    <link rel="stylesheet" href="<?= BASE_ASSETS_URL ?>/css/index.css">
</head>

<body onLoad="initMap();">
    <div class="map" id="map"></div>
    <?php include 'src/menuStart.php'; ?>
    <?php include 'src/menuFeature.php'; ?>
</body>

</html>