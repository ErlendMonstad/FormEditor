Vue.component('grid-element', {
    props: ['item'],
    data: function () {
        return {
            ondragstart: `drag(event, ${this.item.id})`,
        }
    },
    computed: {
        gridarea: function () {
            return `grid-area: ${this.item.y + 1} / ${this.item.x + 1} / span ${this.item.h} / span ${this.item.w};`;
        }
    },

    template:   '<p v-if=\'item.type === "label"\' :style="gridarea" :ondragstart="ondragstart">{{item.value}}</p>' +
        '<input v-else-if=\'item.type === "text"\' :value="item.value" type="text" :style="gridarea":ondragstart="ondragstart"/>' +
        '<input v-else-if=\'item.type === "button"\' :value="item.value" type="button" :style="gridarea" :ondragstart="ondragstart"/>'
});