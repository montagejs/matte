/**
    @module "montage/ui/anchor.reel"
    @requires montage
    @requires montage/ui/component
    @requires "montage/ui/native/anchor.reel"
*/

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeAnchor = require("ui/native/anchor.reel").Anchor;

/**
 * Montage Anchor
 * @class module:"montage/ui/anchor.reel".Anchor
 * @extends module:"montage/ui/native/anchor.reel".Anchor
 */
exports.Anchor = Montage.create(NativeAnchor, /** @lends module:"montage/ui/anchor.reel".Anchor# */{

    hasTemplate: {value: false},

    willPrepareForDraw: {
        value: function() {
            NativeAnchor.willPrepareForDraw.call(this);
            this.element.classList.add("montage-anchor");
        }
    }
});
