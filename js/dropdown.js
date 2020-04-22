Vue.component('dropdown-element', {
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

    template:   '<select><option v-for="item in list" @click="" :key="item.value">{{item.label}}</option></select>'
});