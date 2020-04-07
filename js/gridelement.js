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
 // TODO: Fiks dette rotet.
    template:   '<div v-if=\'item.type === "label"\' class="cell border" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><p>{{item.value}}</p></div>' +
        '<div v-else-if=\'item.type === "textbox"\' class="cell" :style="gridarea":ondragstart="ondragstart" :onmousemove="onmousemove" ><input :value="item.value" type="text" /></div>' +
        '<div v-else-if=\'item.type === "button"\' :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><input :value="item.value" type="button" /></div>' +
        '<div v-else-if=\'item.type === "radio-button"\' class="cell border radio" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><radio-element :value="item.value"></radio-element></div>' +
        '<div v-else-if=\'item.type === "dropdown"\' class="cell border dropdown" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><dropdown-element :value="item.value"></dropdown-element></div>' +
        '<div v-else-if=\'item.type === "checkbox"\' class="cell border checkbox" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><checkbox-element :value="item.value"></checkbox-element></div>' +
        '<div v-else-if=\'item.type === "image"\' class="cell border checkbox" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><image-element :value="item.value"></image-element></div>' +
        '<div v-else-if=\'item.type === "headline"\' class="cell border" :style="gridarea" :ondragstart="ondragstart" :onmousemove="onmousemove"><h1>{{item.value}}</h1></div>'
});