var Montage = require("montage").Montage;

var ButtonTest = exports.ButtonTest = Montage.create(Montage, {
  handleAction: {
    value: function() {
      this.output.value += "pressed ";
    }
  }
});
