

var app = new Vue({
    el: '#app',
    data: {
        columns: 12,
        rows: 30,
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
                type: "textbox",
            },
            {
                id: 3,
                x: 1,
                y: 1,
                w: 2,
                h: 1,
                value: "Skriv in stedsnavn",
                type: "headline",
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
                type: "textbox",
            },
            {
                id:6,
                x: 1,
                y: 5,
                w: 4,
                h: 4,
                items: [{value:"male",label:"Mann"},{value:"famale",label:"Kvinne"}],
                value: "gender",
                type: "radio-button"
            }
        ],
        dragStorage : {},
        tempElement: {},

        elementlist : [

        ]
    }
});


