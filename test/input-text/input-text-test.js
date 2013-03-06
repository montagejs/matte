var Montage = require("montage").Montage;
var Converter = require("montage/core/converter/converter").Converter;
var TestController = require("montage-testing/test-controller").TestController;

exports.TextValidator = Montage.create(Converter, {
    possibleValues: {
        value: null
    },

    convert: {
        value: function(value) {
            return value;
        }
    },
    revert: {
        value: function(value) {
            for(var i=0; i< this.possibleValues.length; i++) {
                if(this.possibleValues[i] === value) {
                    return value;
                }
            }
            throw new Error('Invalid text');
        }
    }

});

exports.InputTextTest = Montage.create(TestController, {

    txt1: {
        value: null
    },

    txt2: {
        value: null
    },

    date1: {
        value: null
    }
});
