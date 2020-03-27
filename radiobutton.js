Vue.component('radio-element', {
    props: {
        value: String,
        items: Array,
    },
    data: function () {
        return {
        }
    },
    computed: {

    },

    template:   '<div class=""><span v-for="item in items" :key="item.value"><input type="radio" :id="item.value" :name="value" :value="item.value"><label :for="item.value">{{item.label}}</label></span></div>'
});