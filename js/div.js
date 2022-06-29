export function div(uniq){
    return `    
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
}