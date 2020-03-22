function allowDrop(ev) {
    ev.preventDefault();
}

// TODO: Add pointer change for resizing

function drag(ev,id) {
    let item = app.gridlist.find(item => item.id == id);
    let coloums = 12; // TODO: Get these numbers from the actual source
    let rows = 20;
    let resizemargin = 6;

    let domrect = document.getElementById("grid").getBoundingClientRect();

    let gridx = (ev.pageX - domrect.x);
    let gridy = (ev.pageY - domrect.y);

    let columnwidth = (domrect.width / coloums);
    let rowheight = (domrect.height / rows);

    let x = Math.floor((ev.pageX - domrect.x) / columnwidth) - item.x;
    let y = Math.floor((ev.pageY - domrect.y) / rowheight) - item.y;

    let mode = ( gridx % columnwidth <= resizemargin || gridx % columnwidth >= columnwidth - resizemargin
        || gridy % rowheight <= resizemargin || gridy % rowheight >= rowheight - resizemargin ) ? "resize" : "move";

    ev.dataTransfer.setData("text", JSON.stringify({id:id, x: x, y: y, mode: mode }));
    ev.dataTransfer.dropEffect = "none";
    //ev.dataTransfer.setData("text",ev.target.className)
}

function drop(ev) {
    ev.preventDefault();

    let data = JSON.parse(ev.dataTransfer.getData("text"));
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
    let grid_x = Math.floor((ev.pageX - domrect.x) / (domrect.width / coloums));
    let grid_y = Math.floor((ev.pageY - domrect.y) / (domrect.height / rows));

    let element_x = data.x;
    let element_y = data.y;

    console.log(data.mode);
    if(data.mode === "resize"){
        if(data.x >= item.w - 1){
            if(grid_x < element_x.x){
                item.x = grid_x - data.x + item.w;
                item.w = item.w - (grid_x - item.x);
            }else{
                item.w = grid_x - item.x;
            }

        }else if(data.y >= item.h - 1){
            if(grid_y < element_y){
                item.y = grid_y + item.h;
                item.h = item.h - (grid_y - item.y);
            }else{
                item.h = grid_y - item.y;
            }
        }
    }else {
        console.log(item.x, item.y);
        item.x = grid_x - data.x;
        item.y = grid_y - data.y;
        console.log(item.x, item.y);
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
        let style = document.createAttribute("style");


        x.value = (i % 12 + 1);
        y.value = 1 + (i - (x.value - 1)) / 12;
        cell.style.gridColumnStart = x.value;
        cell.style.gridRowStart = y.value;


        cell.attributes.setNamedItem(x);
        cell.attributes.setNamedItem(y);


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

//populateGrid();

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
            ondragstart: `drag(event, ${this.item.id})`,
        }
    },
    computed: {
        gridarea: function () {
            return `grid-area: ${this.item.y + 1} / ${this.item.x + 1} / span ${this.item.h} / span ${this.item.w};`;
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
                x: 1,
                y: 1,
                w: 1,
                h: 1,
                value: "Navn",
                type: "label",
            },
            {
                id: 2,
                x: 2,
                y: 1,
                w: 7,
                h: 1,
                value: "navn-input",
                type: "text",
            }
        ]
    }
});


