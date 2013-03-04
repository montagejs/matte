/**
    @module "montage/ui/input-checkbox.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeInputCheckbox = require("ui/native/input-checkbox.reel").InputCheckbox;

/**
 * Input Checkbox
 * @class module:"montage/ui/input-checkbox.reel".InputCheckbox
 * @extends module:"montage/ui/native/input-checkbox.reel".InputCheckbox
 */
exports.InputCheckbox = Montage.create(NativeInputCheckbox, /** module:"montage/ui/input-checkbox.reel".InputCheckbox */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeInputCheckbox.willPrepareForDraw.call(this);
            this.element.classList.add("montage-InputCheckbox");
        }
    }

});
