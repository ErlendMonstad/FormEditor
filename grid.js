function allowDrop(ev) {
    ev.preventDefault();
}

// TODO: Add pointer change for resizing


// Checks if pointer is margin pixels within the edge of cell
function pointerDirection(item,margin, pageX,pageY){

    let coloums = 12; // TODO: Get these numbers from the actual source
    let rows = 20;

    let domrect = document.getElementById("grid").getBoundingClientRect();

    let gridx = (pageX - domrect.x);
    let gridy = (pageY - domrect.y);

    let columnwidth = (domrect.width / coloums);
    let rowheight = (domrect.height / rows);

    let horDirection = (gridx - margin <= item.x * columnwidth) ? "e" : ( gridx + margin >= (item.x + item.w)  * columnwidth) ? "w" : "";
    let verDirection = (gridy - margin <= item.y * rowheight) ? "s" : ( gridy + margin >= (item.y + item.h)  * rowheight) ? "n" : "";
    let direction =  verDirection + horDirection;
    return direction;

}

function setPointer(event,id){
    let item = app.gridlist.find(item => item.id == id);
    let pd = pointerDirection(item,5,event.pageX,event.pageY);

    console.log(pd);
    // Temporary
    if(pd === ""){
        event.target.style.cursor = "default"
    }else{
        let pointerType = pd + "-resize";
        event.target.style.cursor = pointerType;
    }

}

function drag(event,id) {
    let item = app.gridlist.find(item => item.id == id);
    let coloums = 12; // TODO: Get these numbers from the actual source
    let rows = 20;
    let margin = 5;

    let domrect = document.getElementById("grid").getBoundingClientRect();

    let gridx = (event.pageX - domrect.x);
    let gridy = (event.pageY - domrect.y);

    let columnwidth = (domrect.width / coloums);
    let rowheight = (domrect.height / rows);

    let x = Math.floor((event.pageX - domrect.x) / columnwidth) - item.x;
    let y = Math.floor((event.pageY - domrect.y) / rowheight) - item.y;

    let islastcolumn = x >= item.w - 1;
    let islastrow = y >= item.h - 1;

    let mode = (pointerDirection(item,margin,event.pageX,event.pageY) === "") ? "move" : "resize";

    event.dataTransfer.setData("text", JSON.stringify({id:id, x: x, y: y, mode: mode, islastrow:islastrow, islastcolumn: islastcolumn }));
    event.dataTransfer.dropEffect = "none";
    //ev.dataTransfer.setData("text",ev.target.className)
}

function drop(event) {
    event.preventDefault();

    let data = JSON.parse(event.dataTransfer.getData("text"));
    let id = data.id;
    /*
    let x = ev.target.attributes.getNamedItem("data-x").value;
    let y = ev.target.attributes.getNamedItem("data-y").value;
    */
    let item = app.gridlist.find(item => item.id == id);
    let coloums = 12; // TODO: Get these numbers from the actual source
    let rows = 20;
    let domrect = document.getElementById("grid").getBoundingClientRect();
    // let elementrect = document.getElementById(id).getBoundingClientRect();

    // Coordinates on the grid
    let grid_x = Math.floor((event.pageX - domrect.x) / (domrect.width / coloums));
    let grid_y = Math.floor((event.pageY - domrect.y) / (domrect.height / rows));

    let element_x = data.x;
    let element_y = data.y;

    console.log(data.mode);
    if(data.mode === "resize"){
        if(data.islastcolumn){
            if(grid_x < element_x.x){
                item.x = grid_x - data.x + item.w;
                item.w = item.w - (grid_x - item.x);
            }else{
                item.w = grid_x - item.x;
            }

        }
        if(data.islastrow){
            if(grid_y < element_y){
                item.y = grid_y + item.h;
                item.h = item.h - (grid_y - item.y);
            }else{
                item.h = grid_y - item.y;
            }
        }
    }else {
        item.x = grid_x - data.x;
        item.y = grid_y - data.y;
    }

}