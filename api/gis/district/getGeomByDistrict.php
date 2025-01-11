<?php

function getGeomByDistrict() {
    $pdo = initDB();
    $sql = "SELECT name_2, geom FROM hanoi_district";
    $result = executeQuery($pdo, $sql);
    closeDB($pdo);
    return $result;
}