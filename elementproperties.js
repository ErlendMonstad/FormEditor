Vue.component('elementproperties', {
    props: ['item', 'value'],
    data: {
        value: ''
    },
    methods: {
        updateValue() {
            updateElement(event, this.item.id, this.value)
        }
    },
    template:
        '<div class="property">' +
        '<label for="newValue">{{item.id}} {{item.value}}</label>' +
        '<input class="newValue" type="text" id="newValue" @keyup.enter="updateValue" v-model="value">' +
        '</div>'
});