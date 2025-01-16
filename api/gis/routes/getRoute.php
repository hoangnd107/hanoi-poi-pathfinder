<?php

function getRoute() {
    $currentX = $_POST['currentX'];
    $currentY = $_POST['currentY'];
    $targetX = $_POST['targetX'];
    $targetY = $_POST['targetY'];

    $pdo = initDB();
    
    $sql = "
        SELECT ST_AsGeoJSON(geom) as geo, ST_Length(geom::geography) as length
        FROM pgr_fromAtoB('hanoi_roads', ".$currentX.", ".$currentY.", ".$targetX.", ".$targetY.")
        ORDER BY seq";
    
    $result = executeQuery($pdo, $sql);

    if ($result != null) {
        $geoJsonArray = [];
        $totalLength = 0;
        foreach ($result as $item) {
            $geoJsonArray[] = [
                'type' => 'Feature',
                'geometry' => json_decode($item['geo'])
            ];
            $totalLength += $item['length'];
        }

        $geoJson = [
            'type' => 'FeatureCollection',
            'features' => $geoJsonArray
        ];

        return [
            'route' => $geoJson,
            'totalLength' => $totalLength
        ];
    } else {
        return null;
    }
    
    closeDB($pdo);
}