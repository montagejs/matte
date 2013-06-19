/**
    module:"matte/ui/textarea.reel"
*/
/*global require,exports */
var NativeTextarea = require("native/ui/textarea.reel").Textarea;

/**
 * Textarea
 * @class module:"matte/ui/textarea.reel".Textarea
 * @lends module:"native/ui/textarea.reel".Textarea
 */
exports.Textarea = NativeTextarea.specialize(/** @lends module:"matte/ui/textarea.reel".Textarea */ {

    hasTemplate: {value: true},

    constructor: {
        value: function Textarea() {
            this.super();
            this.classList.add("matte-Textarea");
        }
    }
});
