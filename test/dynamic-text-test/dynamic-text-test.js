var Montage = require("montage").Montage,
    TestController = require("support/test-controller").TestController;

var Test = exports.TestController = Montage.create(TestController, {

    dynamictext: {
        value: null
    },

    plainText: {
        value: null
    }

});
exports.theTest = Test.create();
