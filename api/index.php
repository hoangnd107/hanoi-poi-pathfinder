<?php
require_once __DIR__ . '/../helpers/functions.php';
require_once __DIR__ . '/gis/roads/getGeom.php';
require_once __DIR__ . '/gis/district/getGeomByDistrict.php';
require_once __DIR__ . '/gis/district/getNameByDistrict.php';
require_once __DIR__ . '/gis/radius/getGeomByRadius.php';

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
        case 'getGeomByRadius':
            $x = $_POST['x'] ?? null;
            $y = $_POST['y'] ?? null;
            $radius = $_POST['radius'] ?? null;
            if ($x && $y && $radius) {
                $aResult = getGeomByRadius($x, $y, $radius);
            } else {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['error' => 'Missing parameters']);
                exit;
            }
            break;
        case 'test':
            $aResult = getGeom();
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