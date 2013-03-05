var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.ButtonTest = Montage.create(TestController, {

    handleAction: {
      value: function() {
        this.output.value += "pressed ";
      }
    }

});
