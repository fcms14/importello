import { createElement } from "./createElement.js";

export async function pendingFiles(allowed_mime_types){
    const pendingFiles = await fetch("./php/Upload/index.php?getFiles=1", { method: 'GET' })
        .then((response) => response.json());
    
    for (let file of pendingFiles) {
        if ((file.slice(-3) == allowed_mime_types[0].slice(-3))) {        
            createElement(file);
        }
    }
}
