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
    return { cWidth : ((domrect.width + app.horizontalGutter * app.columns) / app.columns), rHeight:(domrect.height / app.rows) };
}

function gridCoords(event){
    let domrect = getDomRect ();
    let gridx = (event.pageX - domrect.x);
    let gridy = (event.pageY - domrect.y);
    return { x: gridx, y:gridy };
}

function cellCoord(event) {
    let domrect = getDomRect ();
    let grid_x = Math.floor((event.pageX - domrect.x) / (((domrect.width + (app.horizontalGutter * app.columns)) / app.columns)));
    let grid_y = Math.floor((event.pageY - domrect.y) / (((domrect.height + (app.verticalGutter * app.rows)) / app.rows)));
    return {x: grid_x, y:grid_y};

}

// Checks if pointer is margin pixels within the edge of cell
function pointerDirectionFull(item,margin,event){
    // Use DOMRect.
    let domrect = event.target.getBoundingClientRect();

    let horDirection = (event.pageX - margin <= domrect.x) ? "w" : ( event.pageX + margin >= domrect.x + domrect.width ? "e" : "");
    let verDirection = (event.pageY - margin <= domrect.y) ? "n" : ( event.pageY + margin >= domrect.y + domrect.height ? "s" : "");
    let direction =  verDirection + horDirection;
    return {verDirection: verDirection, horDirection: horDirection, direction : direction };
}

function pointerDirection(item,event) {
    return pointerDirectionFull(item,app.marginForResizing,event);
}

function setPointer(event,id){
    let item = getItem(id);
    let pD = pointerDirection(item,event);

    // Temporary
    if(pD.direction === ""){
        event.target.style.cursor = "default"
    }else{
        let pointerType = pD.direction + "-resize";
        event.target.style.cursor = pointerType;
    }

}



function drag(event,id) {
    gridLines();
    let item = getItem(id);

    let offset_x = cellCoord(event).x - item.x;
    let offset_y = cellCoord(event).y - item.y;

    // Henter rettningen på resize cursor.
    let pD = pointerDirection(item,event);
    // Ingen rettning betyr move.
    let mode = (pD.direction === "") ? "move" : "resize";

    // Legger innformasjon til app.dragStorage som blir lest når elementet skal flyttes til et nytt sted.
    app.dragStorage = {id:id, offset_x: offset_x, offset_y: offset_y, mode: mode, verDirection: pD.verDirection, horDirection:pD.horDirection };


    //ev.dataTransfer.setData("text",ev.target.className)
}


function setPos(item,x,y){
    item.x = x * 1;
    item.y = y * 1;
}

function setHeight(item, h) {
    item.h = h * 1;
}

function setWidth(item,w) {
    console.log(item,w);
    item.w = w * 1;
}

function dropOnGrid(event) {
    event.preventDefault();
    
    let data = app.dragStorage;
    if(data.mode === "create"){
        app.gridlist.push(app.tempElement);
        data.offset_x = 0;
        data.offset_y = 0;
        data.id = app.tempElement.id;
        data.mode = "move";
    }

    let item = app.gridlist.find(item => item.id == data.id);

    // Coordinates on the grid
    let grid_x = cellCoord(event).x;
    let grid_y = cellCoord(event).y;

    
    // Koordinater for move. 
    let new_x = grid_x - data.offset_x;
    let new_y = grid_y - data.offset_y;

    if(data.mode === "move"){
        setPos(item,new_x,new_y);
    }else if(data.mode === "resize"){
        if(data.verDirection === "n"){
            setHeight(item, item.h + (data.y + item.y) - grid_y);
            setPos(item, item.x,grid_y);

        }else if(data.verDirection === "s"){
            setHeight(item, grid_y - item.y + 1);
        }
        if(data.horDirection === "w"){
            setWidth(item, item.w + (data.x + item.x) - grid_x);
            setPos(item, grid_x,item.y);

        }else if(data.horDirection === "e"){
            setWidth(item,grid_x - item.x + 1);
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
        context.moveTo((columnWidth * i), 0);
        context.lineTo((columnWidth * i), gridHeight);
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