

Vue.component('checkbox-element', {
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

    template:   '<span><input type="checkbox" :id="value" :name="value" :value="value" readonly><label :for="value">{{value}}</label></span>'

});