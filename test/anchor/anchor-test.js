var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.AnchorTest = Montage.create(TestController, {

    link1: {
        value: null
    },

    link2: {
        value: null
    },

    link3: {
        value: null
    }

});
