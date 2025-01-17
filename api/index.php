<?php

require_once __DIR__ . '/../helpers/functions.php';
require_once __DIR__ . '/gis/roads/getGeom.php';
require_once __DIR__ . '/gis/district/getNameByDistrict.php';
require_once __DIR__ . '/gis/district/getGeomByDistrict.php';
require_once __DIR__ . '/gis/points/getAllPoints.php';
require_once __DIR__ . '/gis/points/getInfoPoint.php';
require_once __DIR__ . '/gis/points/getGeomPoint.php';
require_once __DIR__ . '/gis/routes/getRoute.php';
require_once __DIR__ . '/gis/points/getPoisByRoad.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['functionName'])) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'functionName is required']);
        exit;
    }

    $functionName = $_POST['functionName'];
    $aResult = null;

    switch ($functionName) {
        case 'getGeomByDistrict':
            $aResult = getGeomByDistrict();
            break;
        case 'getNameByDistrict':
            $aResult = getNameByDistrict();
            break;
        case 'getGeomPoint':
            $aResult = getGeomPoint();
            break;
        case 'getAllPoints':
            $aResult = getAllPoints();
            break;
        case 'getInfoPoint':
            $aResult = getInfoPoint();
            break;
        case 'getRoute':
            $aResult = getRoute();
            break;
        case 'getPoisByRoad':
            $aResult = getPoisByRoad();
            break;
        default:
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['error' => 'Invalid function name']);
            exit;
    }

    header('Content-Type: application/json');
    echo json_encode(['data' => $aResult]);
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Invalid request method']);
}