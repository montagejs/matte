var Montage = require("montage").Montage,
    TestController = require("support/test-controller").TestController;

var Test = exports.TestController = Montage.create(TestController, {

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
exports.theTest = Test.create();
