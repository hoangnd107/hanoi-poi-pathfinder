<?php

function getGeomByDistrict() {
    $districtName = $_POST['districtName'];
    $pdo = initDB();
    $sql = "SELECT ST_AsGeoJSON(geom) AS geom FROM hanoi_district WHERE name_2 = :districtName";
    $result = executeQuery($pdo, $sql, ['districtName' => $districtName]);
    closeDB($pdo);
    return $result ? $result : [];
}