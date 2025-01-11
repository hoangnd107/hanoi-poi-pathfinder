<?php
    if (isset($_POST['functionname'])) {
        $paPDO = initDB();
        $paSRID = '4326';
        $paPoint = $_POST['paPoint'];
        $functionname = $_POST['functionname'];

        $aResult = "null";
        closeDB($paPDO);
        echo $aResult;
    }
    function initDB() {
        $paPDO = new PDO('pgsql:host=localhost;port=5432;dbname=BTL_test;user=postgres;password=02032711');
        return $paPDO;
    }
    function closeDB($paPDO) {
        $paPDO = null;
    }
    function query($paPDO, $paSQLStr) {
        try {
            $paPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $paPDO->prepare($paSQLStr);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $paResult;
        } catch (PDOException $e) {
            echo "Loi thuc thi truy van: " . $e->getMessage();
            return null;
        }
    }
    function getInfoCMRToAjax($paPDO, $paSRID, $paPoint) {
        $paPoint = str_replace(',', ' ', $paPoint);
        $sql = "SELECT id_1, shape_leng, shape_area FROM hanoi_ward WHERE ST_Within('SRID=".$paSRID.";".$paPoint."'::geometry, geom)";
        $result = query($paPDO, $sql);
        if ($result != null) {
            $resFin = '<table>';
            foreach ($result as $item) {
                $resFin = $resFin.'<tr><td>id_1: '.$item['id_1'].'</td></tr>';
                $resFin = $resFin.'<tr><td>Chu vi: '.$item['shape_leng'].'</td></tr>';
                $resFin = $resFin.'<tr><td>Dien tich: '.$item['shape_area'].'</td></tr>';
                break;
            }
            $resFin = $resFin.'</table>';
            return $resFin;
        } else return 'null';
    }
?>