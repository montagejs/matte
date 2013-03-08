
/**
    @module "matte/ui/image.reel"
*/

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeImage = require("montage-native/ui/image.reel").Image;

/**
 * Input Text
 * @class module:"matte/ui/image.reel".Image
 * @extends module:"montage-native/ui/image.reel".Image
 */
exports.Image = Montage.create(NativeImage, /** @lends module:"matte/ui/image.reel".Image */ {

    willPrepareForDraw: {
        value: function() {
            // Call super method
            NativeImage.willPrepareForDraw.call(this);
            this.element.classList.add("matte-image");
        }
    }

});
