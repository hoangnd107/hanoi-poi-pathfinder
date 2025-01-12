<?php
require_once __DIR__ . '/../../../helpers/functions.php';
function getNameByDistrict() {
    $pdo = initDB();
    $sql = "SELECT name_2 FROM hanoi_district";
    $result = executeQuery($pdo, $sql);
    closeDB($pdo);
    return $result;
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
echo json_encode(getNameByDistrict());