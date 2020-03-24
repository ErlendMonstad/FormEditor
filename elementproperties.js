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
        '<div id="property"><h2>Element Properties</h2>' +
        '<p>{{item.value}}</p>' +
        '<label for="newValue">Value:</label>' +
        '<input type="text" id="newValue" @keyup.enter="updateValue" v-model="value">' +
        '</div>'
});