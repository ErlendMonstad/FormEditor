


function createNewElement(event,type,id){
    let value = "Default";
    if(type.toLowerCase() === "image"){
        value = "300x300";
    }

    let object = {id:id, x: 0, y: 0, w:2, h:1, value:value, type:type.toLowerCase()};
    app.tempElement = object;
    app.dragStorage = {mode:"create"};
}

function newID(){
    app.lastId += 1;
    return app.lastId;
}


Vue.component('toolbox-element', {
    props: {
        item: Object,
        type:String,
    },
    data: function () {
        return {

        }
    },
    methods: {

    }
    ,
    computed: {
        ondragstart: function () {
            return `createNewElement(event,"${this.type}",newID())`;
        }
    },

    template:   '<div :ondragstart="ondragstart"><p readonly>{{type}}</p></div>'
});

Vue.component('toolbox', {
    props: {
        item: Object,
    },
    computed: {

    },
    data: function () {
        return {
            treeData : {
                children: [
                    { name: "Headline" },
                    { name: "Label" },
                    { name: "Textbox"},
                    { name: "Radio-Button"},
                    { name: "Dropdown"},
                    { name: "Checkbox"},
                    { name: "Image"}
                ]
            },
        }
    },

    template:   '<div><h4>Elements</h4><toolbox-element class="tool" v-for="item in treeData.children" :key="item.name" draggable="true" v-bind:type="item.name"></toolbox-element></div>'
});