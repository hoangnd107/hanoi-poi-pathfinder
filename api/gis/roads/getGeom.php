<?php

function getGeom() {
    $pdo = initDB();
    $sql = "SELECT ST_AsGeoJson(geom) as geo, fclass as type FROM hanoi_pois WHERE fclass = 'cafe' LIMIT 10";
    $result = executeQuery($pdo, $sql);
    closeDB($pdo);

    $pois = [];
    foreach ($result as $row) {
        $pois[] = [
            'geom' => json_decode($row['geo']),
            'type' => $row['type']
        ];
    }

    return $pois;
}