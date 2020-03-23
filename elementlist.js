Vue.component('element-list', {
    props: {
        item: Object,
    },
    data: function () {
        return {
            ondragstart: `drag(event, ${this.item.id})`,
            onmousemove: `setPointer(event,${this.item.id})`
        }
    },
    computed: {

    },

    template:   '<div v-if=\'item.type === "label"\' class="cell" :ondragstart="ondragstart" :onmousemove="onmousemove"><p>{{item.value}}</p></div>' +
        '<input v-else-if=\'item.type === "text"\' :value="item.value" type="text" :style="gridarea":ondragstart="ondragstart" :onmousemove="onmousemove"/>' +
        '<input v-else-if=\'item.type === "button"\' :value="item.value" type="button" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"/>'
});