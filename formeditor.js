function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev,id) {
    ev.dataTransfer.setData("text", id);
    //ev.dataTransfer.setData("text",ev.target.className)
}

function drop(ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("text");
    let x = ev.target.attributes.getNamedItem("data-x").value;
    let y = ev.target.attributes.getNamedItem("data-y").value;

    let item = app.gridlist.find(item => item.id == id);

    if(ev.shiftKey){
        if(x < item.x){
            let difference = item.x - x;
            item.x = x;
            item.w += difference;
            console.log(item.x,item.w);
        }else{
            item.w = x - item.x + 1;
            console.log(item.x,item.w);
        }
        if(y < item.y){
            let difference = item.y - y;
            item.y = y;
            item.h += difference;
        }else{
            item.h = y - item.y + 1;
        }
    }else {
        item.x = x;
        item.y = y;
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
        let ondragover = document.createAttribute("ondragover");
        let ondrop = document.createAttribute("ondrop");
        let style = document.createAttribute("style");


        x.value = (i % 12 + 1);
        y.value = 1 + (i - (x.value - 1)) / 12;
        cell.style.gridColumnStart = x.value;
        cell.style.gridRowStart = y.value;



        ondragover.value = 'allowDrop(event)';
        ondrop.value = 'drop(event)';

        cell.attributes.setNamedItem(x);
        cell.attributes.setNamedItem(y);
        cell.attributes.setNamedItem(ondragover);
        cell.attributes.setNamedItem(ondrop);

        document.getElementById("grid").prepend(cell);
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
    data: function () {
        return {
            ondragstart: `drag(event, ${this.item.id})`
        }
    },
    computed: {
        gridarea: function () {
            return `grid-area: ${this.item.y} / ${this.item.x} / span ${this.item.h} / span ${this.item.w};`;
        }
        },

    template:   '<p v-if=\'item.type === "label"\' :style="gridarea" draggable="true" :ondragstart="ondragstart">{{item.value}}</p>' +
                '<input v-else-if=\'item.type === "text"\' :value="item.value" type="text" :style="gridarea" draggable="true" :ondragstart="ondragstart"/>' +
                '<input v-else-if=\'item.type === "button"\' :value="item.value" type="button" :style="gridarea" draggable="true" :ondragstart="ondragstart"/>'
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
                h: 1,
                value: "Navn",
                type: "label",
            },
            {
                id: 2,
                x: 4,
                y: 2,
                w: 2,
                h: 1,
                value: "navn-input",
                type: "text",
            }
        ]
    }
});


