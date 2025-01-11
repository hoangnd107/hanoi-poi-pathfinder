<?php

function getGeomByRadius($x, $y, $radius, $fromCurrent = true) {
    $pdo = initDB();
    $srid = SRID;
    $point = "ST_SetSRID(ST_MakePoint($x, $y), $srid)";
    $sql = "SELECT id, geom
            FROM hanoi_district
            WHERE ST_DWithin(geom, $point, $radius)";
    $result = executeQuery($pdo, $sql);
    closeDB($pdo);
    return $result;
}