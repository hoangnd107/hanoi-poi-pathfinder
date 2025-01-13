<?php
// function getGeomByDistrict() {
//     $pdo = initDB();
//     $sql = "SELECT geom FROM hanoi_district";
//     $result = executeQuery($pdo, $sql);
//     closeDB($pdo);
//     return $result;
// }
function getGeomByDistrict() {
    $pdo = initDB();
    $sql = "SELECT ST_AsGeoJSON(geom) AS geom FROM hanoi_district WHERE name_2 = ".$_POST['districtName'];
    $result = executeQuery($pdo, $sql);

    closeDB($pdo);

    if ($result) {
        return $result;
    } else {
        return [];
    }
}