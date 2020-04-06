

Vue.component('radio-element', {
    props: {
        value: String
    },
    data: function () {
        return {
        }
    },
    computed: {
        list: function () {
            return this.value.split(",").map(x => new SubElement(x,x));
        }
    },

    template:   '<div class=""><span v-for="item in list" :key="item.value"><input type="radio" :id="item.value" :name="value" :value="item.value"><label :for="item.value">{{item.label}}</label></span></div>'
});



