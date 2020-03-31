function updateElement(event, id, value){
    let item = app.gridlist.find(item => item.id == id);
    item.value = value;
}

Vue.component('elementproperties', {
    props: ['item'],
    data: function() {
        return{
            value: this.item.value
        }
    },
    methods: {
        updateValue() {
            updateElement(event, this.item.id, this.value)
        }
    },
    template:
        '<div class="property">' +
        '<label for="newValue">{{item.id}} {{value}}</label>' +
        '<input class="newValue" type="text" id="newValue" @keyup="updateValue" v-model="value">' +
        '</div>'
});