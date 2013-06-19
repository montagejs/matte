var TestController = require("montage-testing/test-controller").TestController,
    Converter = require("montage/core/converter/converter").Converter;

exports.TextSliderTest = TestController.specialize({
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
    constructor: {
        value: function TextSliderTest() {
            this.super();
            this.hexConverter = new Converter();

            this.hexConverter.convert = function(value) {
                return value.toString(16).toUpperCase();
            };

            this.hexConverter.revert = function(value) {
                return parseInt(value, 16)
            };
        }
    }
});
