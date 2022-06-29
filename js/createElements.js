import { div } from "./div.js";
const ul = document.querySelector('ul')

export function createElements({fileName, size = 0, file = ""}){
    const uniq = 'id' + btoa(fileName).replace(/=/g, '').substring(0, 7) + Math.floor(Math.random() * 15379) + 1;
    const li = document.createElement('li')
    li.dataset.fileName = fileName;
    li.setAttribute("id", uniq);
    li.className = "file-list ";
    
    li.innerHTML = div(uniq);

    if (file) {
        ul.append(li);
        addStyles(uniq, size, fileName, true)

        const data = new FormData;
        data.append('file', file);
        const request = new XMLHttpRequest();
        request.open('POST', './php/Upload/index.php');

        request.upload.addEventListener('progress', function (e) {
            const li = document.querySelector('#' + uniq);
            const percent = Math.ceil((e.loaded / e.total) * 100);
            li.querySelector('.buffer').style.width = percent + '%';
            li.querySelector('.percentage').innerHTML = percent + '%';
            li.querySelector('.percentage').style.left = percent + '%';
        });

        request.addEventListener('load', function (e) {            
            li.querySelector('.completed').style.display = li.querySelector('.remove').style.display = li.querySelector('.import').style.display = 'flex';
            addButtons(li, uniq, fileName);
            alert(request.response);
        });
        request.send(data);
        return;
    }

    addButtons(li, uniq, fileName);
    ul.append(li);
    addStyles(uniq, size, fileName)
}

function addButtons(li, uniq, file){
    li.querySelector('#remove-' + uniq).onclick = () => {
        const data = new FormData();
        data.append('deleteFile', file);
        const requestDelete = new XMLHttpRequest();
        requestDelete.open('POST', './php/Upload/index.php', true);
        requestDelete.onload = function () {
            alert(this.responseText);
            li.remove();
        }
        requestDelete.send(data);
    };
    
    li.querySelector('#import-' + uniq).onclick = () => {
        const idBulkInsert = Math.floor(Math.random() * 15379) + 1;
        li.querySelector('.remove').style.display = li.querySelector('.import').style.display = 'none';
        li.querySelector('.loading').style.display = 'flex';

        const data = new FormData();
        data.append('importFile', file);
        data.append('idBulkInsert', idBulkInsert)
        const requestImport = new XMLHttpRequest();
        requestImport.open('POST', './php/BulkInsert/import.php', true);

        requestImport.addEventListener('load', function (e) {
            li.querySelector('.loading').style.display = 'none';
            alert("Erros: " + "\n" + JSON.parse(requestImport.response));

            const result = new FormData();
            result.append('importFile', file);
            result.append('idBulkInsert', idBulkInsert)
            const requestResult = new XMLHttpRequest();
            requestResult.open('POST', './php/BulkInsert/result.php', true);
            
            requestResult.addEventListener('load', function (e) {
                alert("ID: " + idBulkInsert + "\n" + requestResult.response);
                li.remove();
            });

            requestResult.send(data);

        });
        requestImport.send(data);
    };
}    

function addStyles(uniq, size, file, loading = false){
    const li       = document.querySelector('#' + uniq);
    const name_el     = li.querySelector('.title strong');
    const size_el     = li.querySelector('.size');
    size_el.innerHTML = size == 0 ? "&nbsp;" : bytesToSize(size);
    name_el.innerHTML = file;
    li.querySelector('.buffer').style.width = 100 + '%';
    li.querySelector('.percentage').innerHTML = 100 + '%';
    li.querySelector('.percentage').style.left = 100 + '%';
    li.querySelector('.completed').style.display = li.querySelector('.remove').style.display = li.querySelector('.import').style.display = loading ? 'none': 'flex';
}

function bytesToSize(bytes) {
    const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
    const unit = Math.floor(Math.log(bytes) / Math.log(2014));
    return new Intl.NumberFormat("en", { style: "unit", unit: units[unit] }).format(bytes / 1024 ** unit);
}
