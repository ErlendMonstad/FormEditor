


function createNewElement(type){
    let object = {id:app.gridlist.length + 1, x: 0, y: 0, w:2, h:1, value:"Default", type:type};
    app.tempElement = object;
    app.dragStorage = {mode:"create"};
}


Vue.component('toolbox', {
    props: {
        item: Object,
    },
    computed: {
        ondragstart: function () {
            return 'ondragstart=createNewElement("label")';
        }
    },
    data: function () {
        return {
            treeData : {
                children: [
                    { name: "Headline" },
                    { name: "Label" },
                    { name: "Textbox"},
                    { name: "Radiobutton"}
                ]
            }
        }
    },

    template:   '<div><h4>Elements</h4><div class="tool"  v-for="item in treeData.children" :key="item.name" draggable="true" :ondragstart="ondragstart"><p readonly>{{item.name}}</p></div></div>'
});