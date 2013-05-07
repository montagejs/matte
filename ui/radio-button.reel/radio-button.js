/**
    @module "matte/ui/radio-button.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    AbstractRadioButton = require("montage/ui/base/abstract-radio-button").AbstractRadioButton;

/**
 * Input Radio
 * @class module:"matte/ui/radio-button.reel".RadioButton
 * @extends module:"native/ui/radio-button.reel".RadioButton
 */
exports.RadioButton = Montage.create(AbstractRadioButton, /** @lends RadioButton# */ {
    hasTemplate: {
        value: true
    },

    didCreate: {
        value: function() {
            if (AbstractRadioButton.didCreate) {
                AbstractRadioButton.didCreate.call(this);
            }
            this.classList.add("matte-RadioButton");
        }
    }
});
