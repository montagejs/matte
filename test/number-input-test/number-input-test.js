var Montage = require("montage").Montage,
    NumberInput = require("montage/ui/input-number.reel").NumberInput;

var NumberInputTest = exports.NumberInputTest = Montage.create(Montage, {

    num1: {
        value: null
    },

    num2: {
        value: null
    },

    num3: {
        value: null
    }
});
