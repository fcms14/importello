<?php
$path = './uploads/';

if(isset( $_POST['deleteFile'])) {
    $deleteFile = $path . $_POST['deleteFile'];

    if (unlink($deleteFile)) {
        echo $_POST['deleteFile'] . ': removido.';        
        return;
    }

    echo $_POST['deleteFile'] .  ': não foi possível remover o arquivo.';
    exit;
}

if(isset($_FILES['file']['name'])) {
    $fileName    = $_FILES['file']['name'];
    $destination = $path . $fileName;

    if(move_uploaded_file($_FILES['file']['tmp_name'], $destination) == TRUE ) {
        echo 'Arquivo enviado com sucesso';
        return;
    }
    echo 'Erro: Falha ao salvar o arquivo enviado, tente novamente.';
}

if(isset($_GET['getFiles'])) {
    print_r(json_encode(scandir($path)));
}
