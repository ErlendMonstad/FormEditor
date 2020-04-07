
Vue.component('image-element', {
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

