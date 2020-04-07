function allowDrop(ev) {
    ev.preventDefault();
}

// TODO: Add pointer change for resizing


// Checks if pointer is margin pixels within the edge of cell
function pointerDirection(item,margin, pageX,pageY){

    let domrect = document.getElementById("grid").getBoundingClientRect();

    let gridx = (pageX - domrect.x);
    let gridy = (pageY - domrect.y);

    let columnwidth = (domrect.width / app.columns);
    let rowheight = (domrect.height / app.rows);

    let horDirection = (gridx - margin <= item.x * columnwidth) ? "w" : ( gridx + margin >= (item.x + item.w)  * columnwidth) ? "e" : "";
    let verDirection = (gridy - margin <= item.y * rowheight) ? "n" : ( gridy + margin >= (item.y + item.h)  * rowheight) ? "s" : "";
    let direction =  verDirection + horDirection;
    return {verDirection: verDirection, horDirection: horDirection, direction : direction };
}

function setPointer(event,id){
    let item = app.gridlist.find(item => item.id == id);
    let pd = pointerDirection(item,app.marginForResizing,event.pageX,event.pageY);

    // Temporary
    if(pd.direction === ""){
        event.target.style.cursor = "default"
    }else{
        let pointerType = pd.direction + "-resize";
        event.target.style.cursor = pointerType;
    }

}



function drag(event,id) {
    let item = app.gridlist.find(item => item.id == id);

    let domrect = document.getElementById("grid").getBoundingClientRect();


    // Kordinater i relasjon til gridet.
    let gridx = (event.pageX - domrect.x);
    let gridy = (event.pageY - domrect.y);


    // Dimensjoner.
    let columnwidth = (domrect.width / app.columns);
    let rowheight = (domrect.height / app.rows);


    // Henter ut hvor på elementet man drar.
    let x = Math.floor(gridx / columnwidth) - item.x;
    let y = Math.floor(gridy/ rowheight) - item.y;

    // Henter rettningen på resize cursor.
    let pD = pointerDirection(item,app.marginForResizing,event.pageX,event.pageY);
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
    let domrect = document.getElementById("grid").getBoundingClientRect();

    // Coordinates on the grid
    let grid_x = Math.floor((event.pageX - domrect.x) / (domrect.width / app.columns));
    let grid_y = Math.floor((event.pageY - domrect.y) / (domrect.height / app.rows));

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
        item.w = Math.max(1,item.w);
        item.h = Math.max(item.minHeight, item.h);
    }

}