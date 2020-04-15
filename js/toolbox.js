


function createNewElement(event,type,id){
    //let type = JSON.parse(_type);
    let value = "Default";
    console.log(type.minHeight,type.minWidth);
    let minHeight = (type.minHeight == undefined) ? 1 : type.minHeight;
    let minWidth = (type.minWidth == undefined) ? 1 : type.minWidth;
    if(type.name.toLowerCase() === "image"){
        value = "300x300";
    }
    let name = type.name;

    let object = {id:id, x: 0, y: 0, w:Math.max(2,minWidth), h:minHeight, value:value, minWidth:minWidth, minHeight:minHeight, type:name.toLowerCase()};
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
        type:Object,
        name:String
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
            return `createNewElement(event, ${JSON.stringify(this.type)},newID())`;
        }
    },

    template:   '<div class="button-static" :ondragstart="ondragstart"><p readonly>{{name}}</p></div>'
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
                    { name: "Image", minHeight: 4, minWidth: 4}
                ]
            },
        }
    },

    template:   '<div><h4>Elements</h4><toolbox-element class="tool button-static" v-for="item in treeData.children" :key="item.name" draggable="true" v-bind:type="item" :name="item.name"></toolbox-element></div>'
});