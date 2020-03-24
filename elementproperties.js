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
        '<p>{{item.value}}</p>' +
        '<label for="newValue">Value:</label>' +
        '<input type="text" id="newValue" @keyup.enter="updateValue" v-model="value">' +
        '</div>'
});