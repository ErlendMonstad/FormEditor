

var app = new Vue({
    el: '#app',
    data: {
        columns: 12,
        rows: 30,
        marginForResizing: 5,
        selectedElement: null,
        verticalGutter: 2,
        gridlist: [

        ],
        lastId:0,
        dragStorage : {},
        tempElement: {},

        elementlist : [

        ]
    }
});


