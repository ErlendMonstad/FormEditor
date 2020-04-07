Vue.component('delete-element', {
    props: {
        item: Object
    },
    data: function () {
        return {
        }
    },
    methods: {
        deleteItem: function () {
            let index = app.gridlist.indexOf(this.item);
            if (index !== -1) app.gridlist.splice(index, 1);
        }
    },

    template: '<img v-on:click="deleteItem" id="delete" src="resources/delete.png" alt="delete" style="width:15px;height:15px;">'
});