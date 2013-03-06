/**
    @module "matte/ui/input-radio.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeInputRadio = require("montage-native/ui/input-radio.reel").InputRadio;

/**
 * Input Radio
 * @class module:"matte/ui/input-radio.reel".InputRadio
 * @extends module:"montage-native/ui/input-radio.reel".InputRadio
 */
exports.InputRadio = Montage.create(NativeInputRadio, /** @lends module:"matte/ui/input-radio.reel".InputRadio# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeInputRadio.willPrepareForDraw.call(this);
            this.element.classList.add("matte-InputRadio");
        }
    }

});
