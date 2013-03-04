/**
    @module "montage/ui/input-radio.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeInputRadio = require("ui/native/input-radio.reel").InputRadio;

/**
 * Input Radio
 * @class module:"montage/ui/input-radio.reel".InputRadio
 * @extends module:"montage/ui/native/input-radio.reel".InputRadio
 */
exports.InputRadio = Montage.create(NativeInputRadio, /** @lends module:"montage/ui/input-radio.reel".InputRadio# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeInputRadio.willPrepareForDraw.call(this);
            this.element.classList.add("montage-InputRadio");
        }
    }

});
