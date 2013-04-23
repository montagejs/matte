/*global require,exports */
/**
    module:"matte/ui/button.reel"
    @requires montage/core/core
    @requires montage/ui/component
    @requires "montage/ui/native/button.reel"
*/
var Montage = require("montage").Montage,
    NativeButton = require("native/ui/button.reel").Button;

/**
 * Montage Button
 @class module:"matte/ui/button.reel".Button
 @extends module:"native/ui/button.reel".Button
*/
exports.Button = Montage.create(NativeButton, /** @lends module:"matte/ui/button.reel".Button# */ {

    hasTemplate: {value: true},

    didCreate: {
        value: function() {
            NativeButton.didCreate.call(this);
            this.classList.add("matte-Button");
        }
    }
});
