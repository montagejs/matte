/**
    module:"matte/ui/textarea.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeTextarea = require("montage-native/ui/textarea.reel").Textarea;

/**
 * Textarea
 * @class module:"matte/ui/textarea.reel".Textarea
 * @lends module:"montage-native/ui/textarea.reel".Textarea
 */
exports.Textarea = Montage.create(NativeTextarea, /** @lends module:"matte/ui/textarea.reel".Textarea */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeTextarea.willPrepareForDraw.call(this);
            this.element.classList.add("montage-Textarea");
        }
    }
});
