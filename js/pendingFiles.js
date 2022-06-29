import { createElements } from "./createElements.js";

export async function pendingFiles(allowed_mime_types){
    const pendingFiles = await fetch("./php/Upload/index.php?getFiles=1", { method: 'GET' })
        .then((response) => response.json());
    
    for (let fileName of pendingFiles) {
        if ((fileName.slice(-3) == allowed_mime_types[0].slice(-3))) {        
            createElements({fileName});
        }
    }
}
