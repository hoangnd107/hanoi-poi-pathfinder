<?php

function getAllPoints($myPoint, $level1, $level2, $radius, $district){
    $pdo = initDB();

    $lv1 = [
        'health' => ['hospital', 'pharmacy'],
    ];

    $sql = "
    SELECT p.gid, ST_AsGeoJSON(p.geom) as geo 
    FROM hanoi_pois p
    JOIN hanoi_district d ON ST_Contains(d.geom, p.geom)
    WHERE d.name_2 = '".$district."' and fclass = 'cafe'
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

        return [
            'type' => 'FeatureCollection',
            'features' => $geoFeatures,
        ];
    } else {
        return 'null';
    }
    closeDB($pdo);
}