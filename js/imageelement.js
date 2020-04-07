
Vue.component('image-element-unrestricted', {
    props: {
        value: String
    },
    data: function () {
        return {
        }
    },
    computed: {
        image: function () {
            let t = this.value.split("x");
            let x = t[0];
            let y = t[1];
            return `http://placekitten.com/${x}/${y}`;
        }
    },

    template: '<img :src="image" alt="Cat">'
});


Vue.component('image-element', {
    props: {
        value: String,
        item: Object
    },
    data: function () {
        return {
        }
    },
    computed: {
        image: function () {
            let parameters = this.value.split(",");
            let size = parameters[0].split("x");
            let x = size[0];
            let y = size[1];
            return `http://placekitten.com/${x}/${y}`;
        },
        label: function () {
            let parameters = this.value.split(",");
            let label = parameters[1];
            return label;
        }
    },

    template: '<span><img class="imagecontroller" :src="image" alt="Cat"><p>{{label}}</p></span>'
});

