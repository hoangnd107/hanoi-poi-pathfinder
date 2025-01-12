<?php
function getNameByDistrict() {
    $pdo = initDB();
    $sql = "SELECT name_2 FROM hanoi_district";
    $result = executeQuery($pdo, $sql);
    closeDB($pdo);
    return $result;
}