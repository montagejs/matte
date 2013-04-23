/**
    module:"matte/ui/textarea.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeTextarea = require("native/ui/textarea.reel").Textarea;

/**
 * Textarea
 * @class module:"matte/ui/textarea.reel".Textarea
 * @lends module:"native/ui/textarea.reel".Textarea
 */
exports.Textarea = Montage.create(NativeTextarea, /** @lends module:"matte/ui/textarea.reel".Textarea */ {

    hasTemplate: {value: true},

    didCreate: {
        value: function() {
            if (NativeTextarea.didCreate) {
                NativeTextarea.didCreate.call(this);
            }
            this.classList.add("matte-Textarea");
        }
    }
});
