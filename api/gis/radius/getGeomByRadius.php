<?php

// function getGeomByRadius($x, $y, $radius, $fromCurrent = true) {
//     $pdo = initDB();
//     $srid = SRID;
//     $point = "ST_SetSRID(ST_MakePoint($x, $y), $srid)";
//     $sql = "SELECT id, geom
//             FROM hanoi_district
//             WHERE ST_DWithin(geom, $point, $radius)";
//     $result = executeQuery($pdo, $sql);
//     closeDB($pdo);
//     return $result;
// }
function getGeomByRadius($x, $y, $radius) {
    $pdo = initDB();
    $srid = SRID;
    $point = "ST_SetSRID(ST_MakePoint(:x, :y), $srid)";
    $sql = "SELECT id, geom
            FROM hanoi_district
            WHERE ST_DWithin(geom, $point, :radius)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['x' => $x, 'y' => $y, 'radius' => $radius]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    closeDB($pdo);
    return $result;
}