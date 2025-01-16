<?php

function getInfoPoint(){
    $pointDestiny = $_POST['pointDestiny'];

    $pdo = initDB();

    $sql = "
        SELECT p.name, w.name_3, w.name_2, w.name_1, ST_AsText(p.geom) AS geom
        FROM hanoi_pois p JOIN hanoi_ward w ON ST_Contains(w.geom, p.geom)
        WHERE ST_AsText(p.geom) = '".$pointDestiny."'";

    $paResult = executeQuery($pdo, $sql);

    if ($paResult != null) {
        $item = $paResult[0];
        $locationInfo = $item['name'] . ' - ' . $item['name_3'] . ' - ' . $item['name_2'] . ' - ' . $item['name_1'];
        return $locationInfo;
    } else return 'null';
    
    closeDB($pdo);
}