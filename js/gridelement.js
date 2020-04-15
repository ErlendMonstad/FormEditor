
function copyElement (event,item) {
    console.log("COPY2",item);
    event.clipboardData.setData("text",JSON.stringify(item));
    event.preventDefault();
}

Vue.component('grid-element', {
    props: {
        item: Object,
    },
    data: function () {
        return {

        }
    },
    computed: {

    },
 // TODO: Fiks dette rotet.
    template:   '<div v-if=\'item.type === "label"\' class="border" ><p>{{item.value}}</p></div>' +
        '<div v-else-if=\'item.type === "textbox"\' ><input :value="item.value" type="text" /></div>' +
        '<div v-else-if=\'item.type === "button"\' ><input :value="item.value" type="button" /></div>' +
        '<div v-else-if=\'item.type === "radio-button"\' class="border radio" ><radio-element :value="item.value"></radio-element></div>' +
        '<div v-else-if=\'item.type === "dropdown"\' class="border dropdown" ><dropdown-element :value="item.value"></dropdown-element></div>' +
        '<div v-else-if=\'item.type === "checkbox"\' class="border checkbox" ><checkbox-element :value="item.value"></checkbox-element></div>' +
        '<div v-else-if=\'item.type === "image"\' class="border checkbox" ><image-element :value="item.value"></image-element></div>' +
        '<div v-else-if=\'item.type === "imagewithoutlabel"\' class="border checkbox" ><image-element :value="item.value"></image-element></div>' +
        '<div v-else-if=\'item.type === "headline"\' class="border" ><h1>{{item.value}}</h1></div>'
});

Vue.component('grid', {
    props: {
        list: Array,
    },
    data: function () {
        return {

        }
    },
    computed: {

    },
    methods: {
        oncopy: function (item) {
            console.log("COPY");
            return `copyElement(event,${JSON.stringify(item)})`;
        },
        ondragstart: function(item){
            return `drag(event, ${item.id})`;
        },
        onmousemove: function(item) {
            return `setPointer(event, ${item.id})`;
        }
    },

    template:   '<div><grid-element v-for="(item) in list" v-bind:item="item" v-bind:key="item.id" v-bind:draggable="true" v-bind:readonly="true"' +
        ' :ondragstart="ondragstart(item)" :onmousemove="onmousemove(item)" :oncopy="oncopy(item)" class="cell" ' +
        `:style="{ 'grid-area' : (item.y + 1) + '/' + (item.x + 1) + '/ span ' + item.h + '/ span ' + item.w }"`  +
        '></grid-element></div>'
});
