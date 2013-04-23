
/**
    @module "matte/ui/image.reel"
*/

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeImage = require("native/ui/image.reel").Image;

/**
 * Input Text
 * @class module:"matte/ui/image.reel".Image
 * @extends module:"native/ui/image.reel".Image
 */
exports.Image = Montage.create(NativeImage, /** @lends module:"matte/ui/image.reel".Image */ {

    didCreate: {
        value: function() {
            // Call super method
            NativeImage.didCreate.call(this);
            this.classList.add("matte-image");
        }
    }

});
