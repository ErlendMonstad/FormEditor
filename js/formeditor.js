

var app = new Vue({
    el: '#app',
    data: {
        columns: 12,
        rows: 30,
        cellHeight: 32,
        marginForResizing: 5,
        selectedElement: null,
        verticalGutter: 2,
        horizontalGutter: 5,
        gridlist: [

        ],
        lastId:0,
        dragStorage : {},
        tempElement: {},

        elementlist : [

        ]
    }
});


