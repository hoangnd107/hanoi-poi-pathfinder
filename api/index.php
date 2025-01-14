<?php
require_once __DIR__ . '/../helpers/functions.php';
require_once __DIR__ . '/gis/roads/getGeom.php';
require_once __DIR__ . '/gis/district/getNameByDistrict.php';
require_once __DIR__ . '/gis/district/getGeomByDistrict.php';
require_once __DIR__ . '/gis/radius/getGeomByRadius.php';
require_once __DIR__ . '/gis/points/getAllPoints.php';
require_once __DIR__ . '/gis/points/getInfoPoint.php';
require_once __DIR__ . '/gis/points/getGeomPoint.php';

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
        case 'getGeomPoint':
            $point = $_POST['pointDestiny'];
            $aResult = getGeomPoint($point);
            break;
        case 'getAllPoints':
            $myPoint = $_POST['myPoint'];
            $level1 = $_POST['level1'];
            $level2 = $_POST['level2'];
            $radius = $_POST['radius'];
            $district = $_POST['district'];

            $aResult = getAllPoints($myPoint, $level1, $level2, $radius, $district);

            // $aResult = [
            //     'myPoint' => $myPoint,
            //     'level1' => $level1,
            //     'level2' => $level2,
            //     'radius' => $radius,
            //     'district' => $district,
            // ];
            // $aResult = getAllPoints();
            break;
        case 'getInfoPoint':
            $pointDestiny = $_POST['pointDestiny'];
            $aResult = getInfoPoint($pointDestiny);
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