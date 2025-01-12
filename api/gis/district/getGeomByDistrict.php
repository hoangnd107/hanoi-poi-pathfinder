<?php
require_once __DIR__ . '/../../../helpers/functions.php';
function getGeomByDistrict() {
    $pdo = initDB();
    $sql = "SELECT geom FROM hanoi_district";
    $result = executeQuery($pdo, $sql);
    closeDB($pdo);
    return $result;
}
header('Content-Type: application/json');
echo json_encode(getGeomByDistrict());