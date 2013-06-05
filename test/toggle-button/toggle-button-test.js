var TestController = require("montage-testing/test-controller").TestController;

exports.ToggleButtonTest = TestController.specialize({

    handleAction: {
      value: function() {
        this.output.value += "pressed ";
      }
    }

});
