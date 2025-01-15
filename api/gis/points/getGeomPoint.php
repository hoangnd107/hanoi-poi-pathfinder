<?php

function getGeomPoint() {
    $categories = ['bar', 'biergarten', 'cafe', 'fast_food', 'food_court', 'pub', 'restaurant'];
    $point = $_POST['pointDestiny'];

    $option = $_POST['option'];

    $queryOption = '';
    if($option === 'all'){
        foreach($categories as $category){
            $queryOption .= "fclass = '".$category."' OR ";
        }
        $queryOption = rtrim($queryOption, ' OR ');
    } else {
        $queryOption = "fclass = '".$option."'";
    }


    $pdo = initDB();
    $sql = "
        SELECT ST_AsGeoJSON(geom) as geo
        FROM hanoi_pois
        WHERE ".$queryOption."
        ORDER BY ST_Distance(ST_Transform(geom, 3857), ST_Transform(ST_SetSRID(ST_GeomFromText('".$point."'), 4326), 3857)) ASC
        LIMIT 1";

    // return $sql;
    $paResult = executeQuery($pdo, $sql);

    $geoJson = 'null';
    if ($paResult != null) {
        $geoJson =  [
            'type' => 'FeatureCollection',
            'features' => [
                [
                    'type' => 'Feature',
                    'geometry' => json_decode($paResult[0]['geo']),
                ]
            ]
        ];
    } 
    
    closeDB($pdo);

    return [
        'geoJson' => $geoJson,
        'exactPoint' => json_decode($paResult[0]['geo'])
    ];
    
}