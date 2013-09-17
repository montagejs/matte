
/**
    @module "matte/ui/input-number.reel"
*/

var AbstractNumberField = require("montage/ui/base/abstract-number-field").AbstractNumberField;

/**
 * Wraps a <input type="number"> element with binding support for the element's standard attributes 
   and conversion support from a string to a valid number (integer or float). 
   @class module:"matte/ui/input-number.reel".InputNumber
   @extends module:"montage/ui/base/abstract-number-field".AbstractNumberField
 */
exports.InputNumber = AbstractNumberField.specialize(/** @lends module:"matte/ui/input-number.reel".InputNumber */{

    constructor: {
        value: function InputNumber() {
            this.super();
        }
    }

});
