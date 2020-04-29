Vue.component('text-input', {
    props: {
        item: Object,
    },
    data: function () {
        return {

        }
    },
    computed: {
        hasLabel: function () {
            return this.item.hasOwnProperty("label") && this.item.label.length > 0;
        },
        renderLabel: function () {
            return this.hasLabel && this.item.h > 1;
        },
        styleGrid: function () {
            return {
                'grid-template-rows': `repeat( ${this.item.h}, ${app.cellHeight}px)`
            };
        },
        styleLabel: function () {
            return {
                'grid-row': "1 / 1"
            }
        },
        styleInput: function () {
            if (this.renderLabel) {
                return {'grid-row': `2 / ${2 + this.item.h - 1}`};
            } else {
                return {'grid-row': `1 / ${1 + this.item.h - 1}`};
            }
        }
    },
    // TODO: Fiks dette rotet.
    template: '<span class="smallgrid" :style="styleGrid"><p v-if="renderLabel" :style="styleLabel">{{item.props.label}}</p><div :style="styleInput"><input readonly :value="item.props.value" type="text" /></div></span>'
});
