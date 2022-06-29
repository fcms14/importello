<?php
include "db.php";

$path           = '../Upload/uploads/';
$importFile     =   $path . $_POST['importFile'];
$idBulkInsert   =   $_POST['idBulkInsert'];

$result = " SELECT 
                TIMEDIFF(max(dateCreated), min(dateCreated)) AS timeSpent,
                count(*) AS rowsInserted
            FROM shipping 
            where idBulkInsert = $idBulkInsert
            LIMIT 1;
        ";

$q = mysqli_query($conn, $result);
while($r = mysqli_fetch_assoc($q)){
    $result = $r;
}

mysqli_close($conn);
unlink($importFile);

echo $result['rowsInserted'] . " linhas inseridas em " . $result['timeSpent'] ;
