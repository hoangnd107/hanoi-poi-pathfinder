<?php

function getAllPoints(){
    $pdo = initDB();
    $sql = "
    SELECT p.gid, ST_AsGeoJSON(p.geom) as geo 
    FROM hanoi_pois p
    JOIN hanoi_district d ON ST_Contains(d.geom, p.geom)
    ";
    $result = executeQuery($pdo, $sql);
    if ($result != null) {
        $geoFeatures = [];
        foreach ($result as $item) {
            $geoFeatures[] = [
                'type' => 'Feature',
                'geometry' => json_decode($item['geo']),
                'properties' => [
                    'id' => $item['gid'],
                ],
            ];
        }

        return json_encode([
            'type' => 'FeatureCollection',
            'features' => $geoFeatures,
        ]);
    } else {
        return 'null';
    }
    closeDB($pdo);
}