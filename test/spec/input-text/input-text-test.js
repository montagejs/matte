var Converter = require("montage/core/converter/converter").Converter,
    TestController = require("montage-testing/test-controller").TestController;

exports.TextValidator = Converter.specialize({
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

exports.InputTextTest = TestController.specialize({

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
