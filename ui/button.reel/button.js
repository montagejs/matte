/*global require,exports */
/**
    module:"matte/ui/button.reel"
    @requires montage/core/core
    @requires montage/ui/component
    @requires "montage/ui/native/button.reel"
*/
var Montage = require("montage").Montage,
    NativeButton = require("montage-native/ui/button.reel").Button;

/**
 * Montage Button
 @class module:"matte/ui/button.reel".Button
 @extends module:"montage-native/ui/button.reel".Button
*/
exports.Button = Montage.create(NativeButton, /** @lends module:"matte/ui/button.reel".Button# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeButton.willPrepareForDraw.call(this);
            this.element.classList.add("matte-Button");
        }
    }
});
