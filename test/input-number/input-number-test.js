var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.InputNumberTest = Montage.create(TestController, {

    num1: {
        value: null
    },

    num2: {
        value: null
    },

    num3: {
        value: null
    }
});
