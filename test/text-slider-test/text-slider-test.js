var Montage = require("montage").Montage,
    Converter = require("montage/core/converter/converter").Converter;

var TextSliderTest = exports.TextSliderTest = Montage.create(Montage, {
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
