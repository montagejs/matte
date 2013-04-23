/**
    module:"matte/ui/anchor.reel"
    @requires montage
    @requires montage/ui/component
    @requires "montage/ui/native/anchor.reel"
*/

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeAnchor = require("native/ui/anchor.reel").Anchor;

/**
 * Montage Anchor
 * @class module:"matte/ui/anchor.reel".Anchor
 * @extends module:"native/ui/anchor.reel".Anchor
 */
exports.Anchor = Montage.create(NativeAnchor, /** @lends module:"matte/ui/anchor.reel".Anchor# */{

    hasTemplate: {value: false},

    didCreate: {
        value: function() {
            NativeAnchor.didCreate.call(this); // super
            this.classList.add("matte-Anchor");
        }
    }
});
