<?php

function getAllPoints(){
    $categories = ['bar', 'biergarten', 'cafe', 'fast_food', 'food_court', 'pub', 'restaurant'];
    $currentX = $_POST['currentX'];
    $currentY = $_POST['currentY'];
    $option = $_POST['option'];
    $radius = $_POST['radius'];
    $district = $_POST['district'];

    $queryOption = '';
    if($option === 'all'){
        foreach($categories as $category)
            $queryOption .= "fclass = '".$category."' OR ";
        $queryOption = rtrim($queryOption, ' OR ');
    } else $queryOption = "fclass = '".$option."'";

    $queryRegion = '';
    if($district) $queryRegion = "d.name_2 = '".$district."'";
    
    if ($radius) {
        if($queryRegion != '') $queryRegion .= " AND ";
        $queryRegion .= "ST_Distance(ST_Transform(p.geom, 3857), ST_Transform(ST_SetSRID(ST_MakePoint(".$currentX.",".$currentY." ), 4326), 3857)) < ".$radius."000";
    }

    $pdo = initDB();

    $sql = "
        SELECT p.gid, ST_AsGeoJSON(p.geom) as geo, fclass
        FROM hanoi_pois p
        JOIN hanoi_district d ON ST_Contains(d.geom, p.geom)
        WHERE ".$queryRegion." AND (".$queryOption.")
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
                    'type' => $item['fclass'],
                ],
            ];
        }

        return [
            'type' => 'FeatureCollection',
            'features' => $geoFeatures,
        ];
    } else return 'null';
    
    closeDB($pdo);
}