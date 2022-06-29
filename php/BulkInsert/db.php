<?php

$hostname='localhost';
$username='root';
$password='';
$database='importello';

$conn = mysqli_connect($hostname,$username,$password,$database);
if (!$conn) {
    die('Error In connection'.mysqli_connect_error());
	echo "	<script>
			alert('Erro de conexão. Tente novamente mais tarde.')
			window.history.back() </script>";
	echo "	<script>window.location.href='../index.html'</script>";
}
