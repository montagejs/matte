
/**
    @module "matte/ui/input-number.reel"
    @requires montage/ui/component
    @requires montage/ui/text-input
*/

var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeInputNumber = require("native/ui/input-number.reel").InputNumber;

/**
 * Wraps the a &lt;input type="date"> element with binding support for the element's standard attributes.
   @class module:"matte/ui/input-number.reel".InputNumber
   @extends module:"native/ui/input-number.reel".InputNumber
 */
exports.InputNumber = Montage.create(NativeInputNumber, /** @lends module:"matte/ui/input-number.reel".InputNumber */{

    hasTemplate: {
        value: true
    },

    didCreate: {
        value: function() {
            NativeInputNumber.didCreate.call(this);
            this.classList.add("matte-InputNumber");
            this.classList.add("matte-InputText");
        }
    }

});
