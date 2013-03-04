/**
    @module "montage/ui/input-text.reel"

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeInputText = require("ui/native/input-text.reel").InputText;

/**
 * Input Text
 * @class module:"montage/ui/input-text.reel".InputText
 * @extends module:"montage/ui/native/input-text.reel".InputText
 */
exports.InputText = Montage.create(NativeInputText, /** @lends module:"montage/ui/input-text.reel".InputText# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeInputText.willPrepareForDraw.call(this);
            this.element.classList.add("montage-InputText");
        }
    }
});
