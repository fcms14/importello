<?php
include "db.php";

$path           = '../Upload/uploads/';
$importFile     =   $path . $_POST['importFile'];
$idBulkInsert   =   $_POST['idBulkInsert'];

$q = " SELECT 
                TIMEDIFF(max(dateCreated), min(dateCreated)) AS timeSpent,
                count(*) AS rowsInserted
            FROM shipping 
            where idBulkInsert = $idBulkInsert
            LIMIT 1;
        ";

$q = mysqli_query($conn, $q);
$r = mysqli_fetch_assoc($q);
mysqli_close($conn);
unlink($importFile);

echo $r['rowsInserted'] . " linhas inseridas em " . $r['timeSpent'] ;
