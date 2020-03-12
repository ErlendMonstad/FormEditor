function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    //ev.dataTransfer.setData("text",ev.target.className)
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var newelement = document.getElementById(data).cloneNode(true);
    //newelement.classList.add("copy");
    ev.target.appendChild(newelement);
}

