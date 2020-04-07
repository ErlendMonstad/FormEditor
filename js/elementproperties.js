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
        '<div>' +
        '<label for="newValue">{{item.value}}</label>' +
        '<delete-element class="property" v-bind:item="this.item"></delete-element>' +
        '<input class="property" type="text" id="newValue" v-model="item.value">' +
        '</div>'
});