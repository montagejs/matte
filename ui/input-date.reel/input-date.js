
/**
    @module "montage/ui/input-date.reel"
    @requires montage/ui/component
    @requires montage/ui/text-input
*/

var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeInputDate = require("ui/native/input-date.reel").InputDate;

/**
 * Wraps the a &lt;input type="date"> element with binding support for the element's standard attributes.
   @class module:"montage/ui/input-date.reel".InputDate
   @extends module:"montage/ui/native/input-date.reel".InputDate
 */
exports.InputDate = Montage.create(NativeInputDate, {

    hasTemplate: {
        value: true
    },

    willPrepareForDraw: {
        value: function() {
            NativeInputDate.willPrepareForDraw.call(this);
            this.element.classList.add("montage-InputDate");
            this.element.classList.add("montage-InputText");
        }
    }

});
