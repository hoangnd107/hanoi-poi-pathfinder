<?php
// function getGeomByDistrict() {
//     $pdo = initDB();
//     $sql = "SELECT geom FROM hanoi_district";
//     $result = executeQuery($pdo, $sql);
//     closeDB($pdo);
//     return $result;
// }
function getGeomByDistrict() {
    $pdo = initDB();
    $sql = "SELECT name_2, geom FROM hanoi_district WHERE name_2 = :districtName";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['districtName' => $_POST['districtName']]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    closeDB($pdo);
    return $result;
}