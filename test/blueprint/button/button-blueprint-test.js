/* <copyright>
</copyright> */
var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.ButtonBlueprintTest = Montage.create(TestController, {

    button: {
        value: null
    }

});
