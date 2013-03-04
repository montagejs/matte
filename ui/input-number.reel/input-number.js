
/**
    @module "montage/ui/input-number.reel"
    @requires montage/ui/component
    @requires montage/ui/text-input
*/

var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeInputNumber = require("ui/native/input-number.reel").InputNumber;

/**
 * Wraps the a &lt;input type="date"> element with binding support for the element's standard attributes.
   @class module:"montage/ui/input-number.reel".InputNumber
   @extends module:"montage/ui/native/input-number.reel".InputNumber
 */
exports.InputNumber = Montage.create(NativeInputNumber, /** @lends module:"montage/ui/input-number.reel".InputNumber */{

    hasTemplate: {
        value: true
    },

    willPrepareForDraw: {
        value: function() {
            NativeInputNumber.willPrepareForDraw.call(this);
            this.element.classList.add("montage-InputNumber");
            this.element.classList.add("montage-InputText");
        }
    }

});
