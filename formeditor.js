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
    div.classList.add("cell");


    for(let i = 0; i < 12 * 20; i++){
        let cell = div.cloneNode(true);
        cell.ondrop = (() => drop(event));
        cell.ondragover = (() => allowDrop(event));
        cell.id = newId();
        let x = document.createAttribute("data-x");
        let y = document.createAttribute("data-y");
        x.value = i % 12;
        y.value = (i - x.value) / 12;
        cell.attributes.setNamedItem(x);
        cell.attributes.setNamedItem(y);
        document.getElementById("grid").appendChild(cell);
    }
}

function setSize(id){
    let element = document.getElementById(id);
    

}

let idcounter = 0;

function newId(){
    return "id" + idcounter++;
}

populateGrid();

/*
Vue.component('text-element', {
    props: ['item'],
    template: '<input type="text" style="grid-area: {{item.y}} / {{ grid.x}} / span {{ grid.h}} / grid {{ grid.w}} "/>'
});

Vue.component('button-element', {
    props: ['item'],
    template: '<input type="text" style="grid-area: {{item.y}} / {{ grid.x}} / span {{ grid.h}} / grid {{ grid.w}} "/>'
});

Vue.component('label-element', {
    props: ['item'],
    template: '<p style="grid-area: {{item.y}} / {{ grid.x}} / span {{ grid.h}} / grid {{ grid.w}} "/>'
});
*/

Vue.component('grid-element', {
    props: ['item'],
    data : function() {
        return {
            gridarea: `grid-area: ${this.item.y} / ${this.item.x} / span ${this.item.h} / span ${this.item.w};`,
        }
    },
    template:   '<p v-if=\'item.type === "label"\' :style="gridarea">{{item.value}}</p>' +
                '<input v-else-if=\'item.type === "text"\' :value="item.value" type="text" :style="gridarea"/>' +
                '<input v-else-if=\'item.type === "button"\' :value="item.value" type="button" :style="gridarea"/>'
});

var app = new Vue({
    el: '#app',
    data: {
        gridlist: [
            {
                id: 1,
                x: 2,
                y: 2,
                w: 2,
                h: 2,
                value: "HELLO WORLD",
                type: "button",
            }
        ]
    }
});


