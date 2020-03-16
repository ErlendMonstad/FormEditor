function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    //ev.dataTransfer.setData("text",ev.target.className)
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let el = document.getElementById(data);
    if(el.classList.contains("cell")){
        let x = el.getAttribute("data-x");
        let y = el.getAttribute("data-y");

    }

    if(el.classList.contains("tool")){
        let newelement = el.cloneNode(true);
        //newelement.classList.add("copy");
        newelement.id = newId();
        newelement.classList.remove("tool");
        ev.target.appendChild(newelement);
    }else{

        document.getElementById("grid").appendChild(document.getElementById(data));
    }


}


function populateGrid(){
    let div = document.createElement('div');
    div.outerHTML = '<div class="cell" ondrop="drop(event)" ondragover="allowDrop(event)" />';
    for(let i = 0; i < 12 * 20; i++){
        let cell = div.cloneNode(true);
        let x = document.createAttribute("data-x");
        let y = document.createAttribute("data-y");
        x.value = i % 12;
        y.value = (i - x.value) / 12;
        cell.attributes.setNamedItem(x);
        cell.attributes.setNamedItem(y);
        document.getElementById("grid").appendChild(cell);
    }


}

let idcounter = 0;

function newId(){
    return "id" + idcounter++;
}

populateGrid();