/**
 @module "matte/ui/image.reel"
 */

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    AbstractImage = require("montage/ui/base/abstract-image").AbstractImage;

/**
 * Image
 * @class module:"matte/ui/image.reel".Image
 * @extends module:"native/ui/image.reel".Image
 */
exports.Image = Montage.create(AbstractImage, /** @lends module:"matte/ui/image.reel".Image */ {

    hasTemplate: {
        value: false
    },

    didCreate: {
        value: function () {
            // Call super method
            if (AbstractImage.didCreate) {
                AbstractImage.didCreate.call(this);
            }
            this.classList.add("matte-Image");
        }
    }

});
