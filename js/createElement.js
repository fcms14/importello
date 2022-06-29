const ul = document.querySelector('ul')

export function createElement(fileName, size = 0, loading = false, file = ""){
    const uniq = 'id' + btoa(fileName).replace(/=/g, '').substring(0, 7) + Math.floor(Math.random() * 15379) + 1;
    const li = document.createElement('li')
    li.dataset.fileName = fileName;
    li.setAttribute("id", uniq);
    li.className = "file-list ";
    
    li.innerHTML = `    
        <div class="thumbnail">
            <ion-icon name="document-outline"></ion-icon>
            <span class="completed">
                <ion-icon name="checkmark-done-outline"></ion-icon>
            </span>
        </div>
        <div class="properties">
            <span class="title"><strong></strong></span>
            <span class="size"></span>
            <span class="progress">
                <span class="buffer"></span>
                <span class="percentage">0%</span>
            </span>
        </div>
        <button class="remove" id="remove-${uniq}">
            <ion-icon name="close-outline"></ion-icon>
        </button>
        <button class="import" id="import-${uniq}">
            <ion-icon name="swap-horizontal-outline"></ion-icon>
        </button>
        <button class="loading">
            <ion-icon name="reload-outline"></ion-icon>
        </button>    
    `;

    if (loading) {
        ul.append(li);
        addStyles(uniq, size, fileName, true)

        var data = new FormData;
        data.append('file', file);
        var request = new XMLHttpRequest();
        request.open('POST', './php/Upload/index.php');

        request.upload.addEventListener('progress', function (e) {
            const li = document.querySelector('#' + uniq);
            const percent = Math.ceil((e.loaded / e.total) * 100);
            li.querySelector('.buffer').style.width = percent + '%';
            li.querySelector('.percentage').innerHTML = percent + '%';
            li.querySelector('.percentage').style.left = percent + '%';
        });

        request.addEventListener('load', function (e) {
            alert(request.response);
            
            li.querySelector('.completed').style.display = li.querySelector('.remove').style.display = li.querySelector('.import').style.display = 'flex';
            addButtons(li, uniq, fileName);
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
        var data = new FormData();
        data.append('deleteFile', file);
        var requestDelete = new XMLHttpRequest();
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

        var data = new FormData();
        data.append('importFile', file);
        data.append('idBulkInsert', idBulkInsert)
        var requestImport = new XMLHttpRequest();
        requestImport.open('POST', './php/BulkInsert/import.php', true);

        requestImport.addEventListener('load', function (e) {
            li.querySelector('.loading').style.display = 'none';


            var result = new FormData();
            result.append('importFile', file);
            result.append('idBulkInsert', idBulkInsert)
            var requestResult = new XMLHttpRequest();
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
    const li_el       = document.querySelector('#' + uniq);
    const name_el     = li_el.querySelector('.title strong');
    const size_el     = li_el.querySelector('.size');
    size_el.innerHTML = size == 0 ? "&nbsp;" : bytesToSize(size);
    name_el.innerHTML = file;
    li_el.querySelector('.buffer').style.width = 100 + '%';
    li_el.querySelector('.percentage').innerHTML = 100 + '%';
    li_el.querySelector('.percentage').style.left = 100 + '%';
    li_el.querySelector('.completed').style.display = li_el.querySelector('.remove').style.display = li_el.querySelector('.import').style.display = loading ? 'none': 'flex';
}

function bytesToSize(bytes) {
    const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
    const unit = Math.floor(Math.log(bytes) / Math.log(2014));
    return new Intl.NumberFormat("en", { style: "unit", unit: units[unit] }).format(bytes / 1024 ** unit);
}
