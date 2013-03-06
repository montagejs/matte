var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.InputRangeTest = Montage.create(TestController, {
    range_input1: {
        value: null
    },

    range_input2: {
            value: null
    },

    scroll: {
            value: null
    },

    scroll_range: {
            value: null
    }
});
