
/**
    @module "montage/ui/image.reel"
*/

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeImage = require("ui/native/image.reel").Image;

/**
 * Input Text
 * @class module:"montage/ui/image.reel".Image
 * @extends module:"montage/ui/native/image.reel".Image
 */
exports.Image = Montage.create(NativeImage, /** @lends module:"montage/ui/image.reel".Image */ {

    willPrepareForDraw: {
        value: function() {
            // Call super method
            NativeImage.willPrepareForDraw.call(this);
            this.element.classList.add("montage-image");
        }
    }

});
