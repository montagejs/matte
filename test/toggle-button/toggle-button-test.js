var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.ToggleButtonTest = Montage.create(TestController, {

    handleAction: {
      value: function() {
        this.output.value += "pressed ";
      }
    }

});
