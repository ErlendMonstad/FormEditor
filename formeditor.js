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
    if(el.classList.contains("tool")){
        let newelement = el.cloneNode(true);
        //newelement.classList.add("copy");
        newelement.id = newId();
        newelement.classList.remove("tool");
        ev.target.appendChild(newelement);
    }else{
        ev.target.appendChild(document.getElementById(data));
    }


}

let idcounter = 0;

function newId(){
    return "id" + idcounter++;
}
