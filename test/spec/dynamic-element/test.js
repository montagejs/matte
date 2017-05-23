var TestController = require("montage-testing/test-controller").TestController;

exports.Test = TestController.specialize({

    dynamicElement: {
        value: null
    },

    self: {
        get: function() {
            return this;
        }
    }
});
