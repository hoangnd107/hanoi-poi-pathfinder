<?php

function getGeom() {
    $pdo = initDB();
    $sql = "SELECT name_1, geom FROM hanoi_ward LIMIT 10";
    $result = executeQuery($pdo, $sql);
    closeDB($pdo);
    return $result;
}