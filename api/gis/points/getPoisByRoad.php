<?php

function getPoisByRoad() {
    $categories = ['bar', 'biergarten', 'cafe', 'fast_food', 'food_court', 'pub', 'restaurant'];
    
    $pointClick = $_POST['pointClick'];
    $option = $_POST['option'];

    $queryOption = '';
    if ($option === 'all') {
        foreach ($categories as $category) {
            $queryOption .= "fclass = '".$category."' OR ";
        }
        $queryOption = rtrim($queryOption, ' OR ');
    } else {
        $queryOption = "fclass = '".$option."'";
    }

    $pdo = initDB();
    
    $sql = "
        SELECT ST_AsGeoJSON(ST_Buffer(r.geom, 0.0005)) as road_buffer_geo
        FROM gis_osm_roads_free_1 r
        WHERE ST_Distance(ST_SetSRID(ST_GeomFromText('".$pointClick."'), 4326), r.geom) < 0.05
        ORDER BY ST_Distance(ST_SetSRID(ST_GeomFromText('".$pointClick."'), 4326), r.geom)
        LIMIT 1"
    ;

    $bufferResult = executeQuery($pdo, $sql);
    $buffer = json_decode($bufferResult[0]['road_buffer_geo']);

    $sqlPois = "
        SELECT p.gid, p.fclass, ST_AsGeoJSON(p.geom) as geo
        FROM hanoi_pois p
        WHERE ST_Contains(
            ST_SetSRID(
                ST_GeomFromGeoJSON('".$bufferResult[0]['road_buffer_geo']."'
            ), 4326),
            p.geom
        )
        AND (".$queryOption.")";

    $poisResult = executeQuery($pdo, $sqlPois);

    if ($poisResult != null) {
        $geoFeaturesPoints = [];
        $geoFeaturesRoads = [];

        foreach ($poisResult as $item) {
            $geoFeaturesPoints[] = [
                'type' => 'Feature',
                'geometry' => json_decode($item['geo']),
                'properties' => [
                    'id' => $item['gid'],
                    'type' => $item['fclass']
                ],
            ];
        }

        $geoFeaturesRoads[] = [
            'type' => 'Feature',
            'geometry' => $buffer,
        ];

        return [
            'points' => [
                'type' => 'FeatureCollection',
                'features' => $geoFeaturesPoints,
            ],
            'roadBuffer' => [
                'type' => 'FeatureCollection',
                'features' => $geoFeaturesRoads,
            ]
        ];
    } else {
        return 'null';
    }

    closeDB($pdo);
}