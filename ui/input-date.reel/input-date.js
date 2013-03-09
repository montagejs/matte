
/**
    @module "matte/ui/input-date.reel"
    @requires montage/ui/component
    @requires montage/ui/text-input
*/

var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeInputDate = require("native/ui/input-date.reel").InputDate;

/**
 * Wraps the a &lt;input type="date"> element with binding support for the element's standard attributes.
   @class module:"matte/ui/input-date.reel".InputDate
   @extends module:"native/ui/input-date.reel".InputDate
 */
exports.InputDate = Montage.create(NativeInputDate, {

    hasTemplate: {
        value: true
    },

    willPrepareForDraw: {
        value: function() {
            NativeInputDate.willPrepareForDraw.call(this);
            this.element.classList.add("matte-InputDate");
            this.element.classList.add("matte-InputText");
        }
    }

});
