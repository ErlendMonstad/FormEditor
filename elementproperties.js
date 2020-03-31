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
        '<div class="property">' +
        '<label for="newValue">{{item.id}} {{item.value}}</label>' +
        '<input class="newValue" type="text" id="newValue" v-model="item.value">' +
        '</div>'
});