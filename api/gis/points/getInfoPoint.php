<?php

function getInfoPoint($pointDestiny){
    $pdo = initDB();
    $sql = "
        SELECT p.name, w.name_3, w.name_2, w.name_1, r.name AS road_name, ST_Distance(p.geom, r.geom) AS distance
        FROM hanoi_pois p JOIN hanoi_ward w ON ST_Contains(w.geom, p.geom)
            LEFT JOIN hanoi_roads r ON ST_Distance(p.geom, r.geom) IS NOT NULL
        WHERE
            
        ORDER BY 
            distance ASC
        LIMIT 1
    ";
    $paResult = executeQuery($pdo, $sql);

    if ($paResult != null) {
        
        $item = $paResult[0];
        $locationInfo = $item['name'] . ' - ' . $item['name_3'] . ' - ' . $item['name_2'] . ' - ' . $item['name_1'];

        if ($item['road_name'] != null) {
            $locationInfo = $item['name'] . ' - ' . $item['road_name']  . ' - ' . $item['name_3'] . ' - ' . $item['name_2'] . ' - ' . $item['name_1'];
        }

        return $locationInfo;
    } else {
        return 'null';
    }
    closeDB($pdo);
}