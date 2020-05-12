// TODO: Fix it so it is defined once.
function clearAndSetSelected(item){
    for(i = 0; i < app.gridlist.length; i++){
        app.gridlist[i].selected = false;
    }
    app.gridlist[item - 1].selected = true;
}


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
        classes : function (){
            let item = this.item;
            /*
            let out = "";
            let borderArray = ["label","radio-button","dropdown","checkbox","image","imagewithoutlabel","headline"];
            if(borderArray.includes(item.type)){
                out += "border ";
            }*/
            return (this.item.hasOwnProperty("selected") || this.selected === true) ? "selectedItem" : "";
        },
    },
    // TODO: Fiks dette rotet.
    template:   '<div v-if=\'item.type === "label"\' class="border element" ><p>{{item.props.value}}</p></div>' +
        '<div v-else-if=\'item.type === "textbox"\' class="element"><text-input :item="item"></text-input></div>' +
        '<div v-else-if=\'item.type === "button"\' class="element" ><input readonly :value="item.props.value" type="button" /></div>' +
        '<div v-else-if=\'item.type === "radio-button"\' class="border radio element" ><radio-element :value="item.props.value"></radio-element></div>' +
        '<div v-else-if=\'item.type === "dropdown"\' class="border dropdown element" ><dropdown-element :value="item.props.value"></dropdown-element></div>' +
        '<div v-else-if=\'item.type === "checkbox"\' class="border checkbox element" ><checkbox-element :value="item.props.value"></checkbox-element></div>' +
        '<div v-else-if=\'item.type === "image"\' class="border checkbox element" ><image-element :value="item.props.value"></image-element></div>' +
        '<div v-else-if=\'item.type === "imagewithoutlabel"\' class="border checkbox element" ><image-element :value="item.props.value"></image-element></div>' +
        '<div v-else-if=\'item.type === "headline"\' class="border element" ><h1>{{item.props.value}}</h1></div>' +
        '<div v-else-if=\'item.type === "box"\' class="box"></div>'
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
            return `copyElement(event,${JSON.stringify(item)})`;
        },
        ondragstart: function(item){
            return `drag(event, ${item.id})`;
        },
        onmousemove: function(item) {
            // Ensure only the current element gets triggered.
            return `setPointer(event, ${item.id})`;
        },
        onmousedown: function(id){
            return `clearAndSetSelected(${id})`;
        }


    },

    template:   '<div><grid-element v-for="(item) in list" v-bind:item="item" v-bind:key="item.id" v-bind:draggable="true" v-bind:readonly="true"' +
        ' :ondragstart="ondragstart(item)" ondrop="clearCanvas()" :onmousedown="onmousedown(item.id)" :onmousemove="onmousemove(item)" :oncopy="oncopy(item)" :class="{ cell:true, selectedItem: item.selected}" ' +
        `:style="{ 'grid-area' : (item.y * 2 + 1  + item.offset) + '/' + (item.x * 2 + 1 + item.offset) + '/ span ' + (item.h * 2 - 1) + '/ span ' + (item.w * 2 - 1) }"`  +
        '></grid-element></div>'
});

