

var app = new Vue({
    el: '#app',
    data: {
        columns: 20,
        rows: 12,
        marginForResizing: 5,
        gridlist: [
            {
                id: 1,
                x: 1,
                y: 2,
                w: 1,
                h: 1,
                value: "Sted",
                type: "label",
            },
            {
                id: 2,
                x: 2,
                y: 2,
                w: 2,
                h: 1,
                value: "sted-input",
                type: "text",
            },
            {
                id: 3,
                x: 1,
                y: 1,
                w: 2,
                h: 1,
                value: "Skriv in stedsnavn",
                type: "big-label",
            },
            {
                id: 4,
                x: 1,
                y: 3,
                w: 1,
                h: 1,
                value: "Land eller fylke (valgfritt)",
                type: "label",
            },
            {
                id: 5,
                x: 2,
                y: 3,
                w: 2,
                h: 1,
                value: "land-input",
                type: "text",
            }
        ],
        dragStorage : {},

        elementlist : [

        ]
    }
});


