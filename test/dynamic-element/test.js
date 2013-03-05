var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.Test = Montage.create(TestController, {

    dynamicElement: {
        value: null
    },

    dynamicElementClassList: {
        value: null
    },

    dynamicElementClassInMarkup: {
        value: null
    },

    class1: {
        value: true
    },

    class2: {
        value: false
    },

    self: {
        get: function() {
            return this;
        }
    }
});
