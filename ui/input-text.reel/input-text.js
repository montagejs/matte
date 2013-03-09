/**
    @module "matte/ui/input-text.reel"

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeInputText = require("native/ui/input-text.reel").InputText;

/**
 * Input Text
 * @class module:"matte/ui/input-text.reel".InputText
 * @extends module:"native/ui/input-text.reel".InputText
 */
exports.InputText = Montage.create(NativeInputText, /** @lends module:"matte/ui/input-text.reel".InputText# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeInputText.willPrepareForDraw.call(this);
            this.element.classList.add("matte-InputText");
        }
    }
});
