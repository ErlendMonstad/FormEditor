

var app = new Vue({
    el: '#app',
    data: {
        columns: 12,
        rows: 30,
        marginForResizing: 5,
        selectedElement: null,
        gridlist: [

        ],
        lastId:0,
        dragStorage : {},
        tempElement: {},

        elementlist : [

        ]
    }
});


