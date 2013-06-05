var TestController = require("montage-testing/test-controller").TestController;

exports.ButtonTest = TestController.specialize({

    handleAction: {
      value: function() {
        this.output.value += "pressed ";
      }
    }

});
