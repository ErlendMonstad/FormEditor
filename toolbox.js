


function createNewElement(event,type){

    let object = {id:app.gridlist.length + 1, x: 0, y: 0, w:2, h:1, value:"Default", type:type.toLowerCase()};
    app.tempElement = object;
    app.dragStorage = {mode:"create"};
}


Vue.component('toolbox-element', {
    props: {
        item: Object,
        type:String,
    },
    computed: {
        ondragstart: function () {
            return `createNewElement(event,"${this.type}")`;
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
                    { name: "Textbox"}
                ]
            }
        }
    },

    template:   '<div><h4>Elements</h4><toolbox-element class="tool" v-for="item in treeData.children" :key="item.name" draggable="true" v-bind:type="item.name"></toolbox-element></div>'
});