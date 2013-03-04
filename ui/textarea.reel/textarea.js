/**
    @module "montage/ui/textarea.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeTextarea = require("ui/native/textarea.reel").Textarea;

/**
 * Textarea
 * @class module:"montage/ui/textarea.reel".Textarea
 * @lends module:"ui/native/textarea.reel".Textarea
 */
exports.Textarea = Montage.create(NativeTextarea, /** @lends module:"montage/ui/textarea.reel".Textarea */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeTextarea.willPrepareForDraw.call(this);
            this.element.classList.add("montage-Textarea");
        }
    }
});
