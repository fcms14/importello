<?php
header("Content-Type: text/plain");
header('Content-Disposition: attachement; filename="bulk.csv"');
$pp = new NumberFormatter("en", NumberFormatter::SPELLOUT);
$client = 1;
for ($x = 1; $x <= 7978; $x++) {
    echo $client.','."The Shippin Description is: ".$pp->format($x).','.(rand(10,100)/100)+rand(10,100)."\n";
}
?>