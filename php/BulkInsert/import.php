<?php
include "db.php";
set_time_limit(300);

$path           = '../Upload/uploads/';
$importFile     =   $path . $_POST['importFile'];
$idBulkInsert   =   $_POST['idBulkInsert'];

if (($csvFile = fopen($importFile, "r")) === false) {
    echo "Não foi possível abrir o arquivo";
    return;
}

$rowsInserted   =   0;
$rowsPerQuerie  =   1000;
$insertQuery    =   "INSERT INTO `shipping` (`idClient`, `description`, `price`, `idBulkInsert`) VALUES ";
$bulkInsert     =   "";

while (($data = fgetcsv($csvFile, 1000, ",")) !== false) {
    
    $idClient       =   utf8_encode($data[0]);
    $description    =   utf8_encode($data[1]);
    $price          =   utf8_encode($data[2]);
    $bulkInsert     =   $bulkInsert . " ('$idClient', '$description', '$price', '$idBulkInsert') , ";
    $rowsInserted++;

    if ($rowsInserted % $rowsPerQuerie == 0) {        
        $bulkInsert =   $insertQuery . $bulkInsert;
        $bulkInsert  =  substr($bulkInsert, 0, strlen($bulkInsert) - 2);

        if (!mysqli_query($conn, $bulkInsert)) {
            echo "Error: " . mysqli_error($conn);
            return;
        }
        $bulkInsert =   "";
    }
}

if($bulkInsert == ""){
    mysqli_close($conn);
    return;
}

$bulkInsert  =  $insertQuery . $bulkInsert;
$bulkInsert  =  substr($bulkInsert, 0, strlen($bulkInsert) - 2);
if (!mysqli_query($conn, $bulkInsert)) {
    echo "Error: " . mysqli_error($conn);
    return;
}
mysqli_close($conn);
