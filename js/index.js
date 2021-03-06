import { pendingFiles } from "./pendingFiles.js";
import { createElements } from "./createElements.js";

const allowed_mime_types = ['text/csv'];
const allowed_size_mb = 2048 * 1024 * 1024;

pendingFiles(allowed_mime_types);

document.querySelector('.file-input').addEventListener('change', function () {
    const inputFiles = document.querySelector('.file-input').files;

    if (inputFiles.length == 0) {
        alert('Erro: Nenhum arquivo selecionado');
        return;
    }

    for (let i = 0; i < inputFiles.length; i++) {
        const file = inputFiles[i];

        if (!(file.type == allowed_mime_types)) {
            alert("Arquivo inválido. \nApenas arquivos .CSV são aceitos.");
            return;
        }

        if (file.size > allowed_size_mb) {
            alert('Erro: O arquivo é maior que o permitido => ' + file.name);
            return;
        }
        
        createElements({fileName: file.name, size: file.size, loading: true, file});
    }
});
