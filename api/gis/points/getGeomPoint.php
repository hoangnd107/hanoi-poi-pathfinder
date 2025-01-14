<?php

function getGeomPoint($point) {
    $pdo = initDB();
    $sql = "
        SELECT *
        FROM hanoi_pois
        WHERE fclass = 'cafe'
        ORDER BY ST_Distance(
                geom,
                ST_GeomFromText('$point', 4326)
            ) ASC
        LIMIT 1;
    ";

    $paResult = executeQuery($pdo, $sql);

    if ($paResult != null) {
        return $paResult;
    } else {
        return 'null';
    }
    closeDB($pdo);
}