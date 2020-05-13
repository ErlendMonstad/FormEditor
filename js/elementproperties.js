function updateElement(event, id, value){
    let item = app.gridlist.find(item => item.id == id);
    item.value = value;
}

Vue.component('elementproperties', {
    props: ['item'],
    data: function() {
        return{

        }
    },
    methods: {
    },
    template:
        '<div class="element-property">' +
        '<label class="label" for="newValue">{{item.type}}: </label>' +
        '<delete-element class="property" v-bind:item="this.item" onclick="clearCanvas()"></delete-element>' +
        '<input class="property" type="text" id="newValue" v-model="item.props.value" onkeyup="clearCanvas()">' +
        '</div>'
});