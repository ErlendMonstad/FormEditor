Vue.component('elementproperties', {
    props: ['item'],
    data: function() {
        return{
            message: this.item.value
        }
    },
    methods: {
        updateValue() {
            updateElement(event, this.item.id, this.message)
        }
    },
    template:
        '<div class="property">' +
        '<label for="newValue">{{item.id}} {{message}}</label>' +
        '<input class="newValue" type="text" id="newValue" @keyup="updateValue" v-model="message">' +
        '</div>'
});