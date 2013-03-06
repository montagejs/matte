var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.ListTest = Montage.create(TestController, {
    list: {
        value: null
    }
});
