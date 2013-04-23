/**
    @module "matte/ui/input-checkbox.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeInputCheckbox = require("native/ui/input-checkbox.reel").InputCheckbox;

/**
 * Input Checkbox
 * @class module:"matte/ui/input-checkbox.reel".InputCheckbox
 * @extends module:"native/ui/input-checkbox.reel".InputCheckbox
 */
exports.InputCheckbox = Montage.create(NativeInputCheckbox, /** module:"matte/ui/input-checkbox.reel".InputCheckbox */ {

    hasTemplate: {value: true},

    didCreate: {
        value: function() {
            NativeInputCheckbox.didCreate.call(this);
            this.classList.add("matte-InputCheckbox");
        }
    }

});
