/*global require,exports */
/**
    @module "montage/ui/button.reel"
    @requires montage/core/core
    @requires montage/ui/component
    @requires "montage/ui/native/button.reel"
*/
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeButton = require("ui/native/button.reel").Button;

/**
 * Montage Button
 @class module:"montage/ui/button.reel".Button
 @extends module:"montage/ui/native/button.reel".Button
*/
exports.Button = Montage.create(NativeButton, /** @lends module:"montage/ui/button.reel".Button# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeButton.willPrepareForDraw.call(this);
            this.element.classList.add("montage-Button");
        }
    }
});
