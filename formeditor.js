

var app = new Vue({
    el: '#app',
    data: {
        gridlist: [
            {
                id: 1,
                x: 1,
                y: 1,
                w: 1,
                h: 1,
                value: "Navn",
                type: "label",
            },
            {
                id: 2,
                x: 2,
                y: 1,
                w: 2,
                h: 1,
                value: "navn-input",
                type: "text",
            }
        ],
        dragStorage : {}

    }
});


