var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;
var Converter = require("montage/core/converter/converter").Converter;

exports.TextSliderTest = Montage.create(TestController, {
    number: {
        value: null
    },
    percent: {
        value: null
    },
    multiple: {
        value: null
    },
    hex: {
        value: null
    },
    hexConverter: {
        value: null
    },
    didCreate: {
        value: function() {
            TestController.didCreate.apply(this, arguments);
            this.hexConverter = Converter.create();

            this.hexConverter.convert = function(value) {
                return value.toString(16).toUpperCase();
            };

            this.hexConverter.revert = function(value) {
                return parseInt(value, 16)
            };
        }
    }
});
