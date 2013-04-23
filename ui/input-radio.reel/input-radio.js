/**
    @module "matte/ui/input-radio.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeInputRadio = require("native/ui/input-radio.reel").InputRadio;

/**
 * Input Radio
 * @class module:"matte/ui/input-radio.reel".InputRadio
 * @extends module:"native/ui/input-radio.reel".InputRadio
 */
exports.InputRadio = Montage.create(NativeInputRadio, /** @lends module:"matte/ui/input-radio.reel".InputRadio# */ {

    hasTemplate: {value: true},

    didCreate: {
        value: function() {
            if (NativeInputRadio.didCreate) {
                NativeInputRadio.didCreate.call(this);
            }
            this.classList.add("matte-InputRadio");
        }
    }

});
