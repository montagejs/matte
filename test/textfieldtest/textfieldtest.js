var Montage = require("montage").Montage,
Converter = require("montage/core/converter/converter").Converter;

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

var TextfieldTest = exports.TextfieldTest = Montage.create(Montage, {

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
