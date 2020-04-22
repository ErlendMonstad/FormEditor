function allowDrop(ev) {
    ev.preventDefault();
}

// TODO: Add pointer change for resizing


function getItem(id) {
    return app.gridlist.find(item => item.id == id);
}

function getDomRect (){
    let domrect = document.getElementById("grid").getBoundingClientRect();
    return domrect;
}

function dimensions(){
    let domrect = getDomRect ();
    return { cWidth : (domrect.width / app.columns), rHeight:(domrect.height / app.rows) };
}

function gridCoords(event){
    let domrect = getDomRect ();
    let gridx = (event.pageX - domrect.x);
    let gridy = (event.pageY - domrect.y);
    return { x: gridx, y:gridy };
}

function cellCoord(event) {
    let domrect = getDomRect ();
    let grid_x = Math.floor((event.pageX - domrect.x) / (domrect.width / app.columns));
    let grid_y = Math.floor((event.pageY - domrect.y) / (domrect.height / app.rows));
    return {x: grid_x, y:grid_y};

}

// Checks if pointer is margin pixels within the edge of cell
function pointerDirection(item,margin, pageX,pageY){

    let horDirection = (gridCoords(event).x - margin <= item.x * dimensions().cWidth) ? "w" : ( gridCoords(event).x + margin >= (item.x + item.w)  * dimensions().cWidth) ? "e" : "";
    let verDirection = (gridCoords(event).y - margin <= item.y * dimensions().rHeight) ? "n" : ( gridCoords(event).y + margin >= (item.y + item.h)  * dimensions().rHeight) ? "s" : "";
    let direction =  verDirection + horDirection;
    return {verDirection: verDirection, horDirection: horDirection, direction : direction };
}

function setPointer(event,id){
    let item = getItem(id);
    let pd = pointerDirection(item,app.marginForResizing,event.pageX - window.scrollX,event.pageY - window.scrollY);

    // Temporary
    if(pd.direction === ""){
        event.target.style.cursor = "default"
    }else{
        let pointerType = pd.direction + "-resize";
        event.target.style.cursor = pointerType;
    }

}



function drag(event,id) {
    gridLines();
    let item = getItem(id);

    let domrect = document.getElementById("grid").getBoundingClientRect();

    // Dimensjoner.
    let columnwidth = dimensions().cWidth;
    let rowheight = dimensions().rHeight;


    // Henter ut hvor på elementet man drar.
    let x = Math.floor(gridCoords(event).x / columnwidth) - item.x;
    let y = Math.floor(gridCoords(event).y / rowheight) - item.y;

    // Henter rettningen på resize cursor.
    let pD = pointerDirection(item,app.marginForResizing,event.pageX  - window.scrollX,event.pageY  - window.scrollY);
    // Ingen rettning betyr move.
    let mode = (pD.direction === "") ? "move" : "resize";

    // Legger innformasjon til app.dragStorage som blir lest når elementet skal flyttes til et nytt sted.
    app.dragStorage = {id:id, x: x, y: y, mode: mode, verDirection: pD.verDirection, horDirection:pD.horDirection };


    //ev.dataTransfer.setData("text",ev.target.className)
}




function dropOnGrid(event) {
    event.preventDefault();
    
    let data = app.dragStorage;
    if(data.mode === "create"){
        app.gridlist.push(app.tempElement);
        data.x = 0;
        data.y = 0;
        data.id = app.tempElement.id;
        data.mode = "move";
    }

    let item = app.gridlist.find(item => item.id == data.id);

    // Coordinates on the grid
    let grid_x = cellCoord(event).x;
    let grid_y = cellCoord(event).y;

    if(data.mode === "move"){
        item.x = grid_x - data.x;
        item.y = grid_y - data.y;
    }else if(data.mode === "resize"){
        if(data.verDirection === "n"){
            item.h += (data.y + item.y) - grid_y;
            item.y = grid_y;

        }else if(data.verDirection === "s"){
            item.h = grid_y - item.y + 1;
        }
        if(data.horDirection === "w"){
            item.w += (data.x + item.x) - grid_x;
            item.x = grid_x;

        }else if(data.horDirection === "e"){
            item.w = grid_x - item.x + 1;
        }
        // Ensure that width and height isn't negative. Might be able to be moved to the component.
        item.w = Math.max(item.minWidth,item.w);
        item.h = Math.max(item.minHeight, item.h);

    }
    item.x = Math.max(0, item.x);
    item.y = Math.max(0, item.y);

    // TODO: prevent you from setting too high values.

}

//tegner linjer, blir kalt når man dragger elementer
function gridLines(){
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let gridWidth = document.getElementById("grid").offsetWidth;
    let gridHeight = document.getElementById("grid").offsetHeight;

    canvas.width = gridWidth;
    canvas.height = gridHeight;

    //henter antall kolonner og rader
    let htmlStyles = window.getComputedStyle(document.querySelector("html"));
    let colNum = parseInt(htmlStyles.getPropertyValue("--colNum"));
    let rowNum = parseInt(htmlStyles.getPropertyValue("--rowNum"));

    let columnWidth = gridWidth / colNum;
    let columnHeight = gridHeight / rowNum;
    
    context.beginPath();
    for(i = 1; i < colNum + 1; i++){
        context.moveTo((columnWidth * i) + (2 * (i-1)) + 1, 0);
        context.lineTo((columnWidth * i) + (2 * (i-1)) + 1, gridHeight);
    }
    for(i = 1; i < rowNum + 1; i++){
        context.moveTo(0, columnHeight * i);
        context.lineTo(gridWidth, columnHeight * i);
    }
    context.closePath();
    context.stroke();
}

function clearCanvas(){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//sette antall kolonner fra konsoll
//buggy etter forandring må fikse
function setColumn(n){
    document.documentElement.style.setProperty("--colNum", n);

    let percentage = 100 / n;
    document.documentElement.style.setProperty("--colWidthPercentage", percentage + "%");
}

document.addEventListener("dragstart", function( event ) {
    let img = new Image();
    event.dataTransfer.setDragImage(img, 0, 0);
}, false);