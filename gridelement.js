Vue.component('grid-element', {
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
        gridarea: function () {
            return `grid-area: ${this.item.y + 1} / ${this.item.x + 1} / span ${this.item.h} / span ${this.item.w};`;
        }
    },

    template:   '<div v-if=\'item.type === "label"\' class="cell border" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><p>{{item.value}}</p></div>' +
        '<div v-else-if=\'item.type === "text"\' :style="gridarea":ondragstart="ondragstart" :onmousemove="onmousemove" ><input :value="item.value" type="text" /></div>' +
        '<div v-else-if=\'item.type === "button"\' :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><input :value="item.value" type="button" /></div>' +
        '<div v-else-if=\'item.type === "big-label"\' class="cell border" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><h1>{{item.value}}</h1></div>'
});