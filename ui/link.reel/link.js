/**
    module:"matte/ui/anchor.reel"
*/

/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    AbstractLink = require("montage/ui/base/abstract-link").AbstractLink;

/**
 * Montage Anchor
 * @class module:"matte/ui/anchor.reel".Anchor
 * @extends module:"native/ui/anchor.reel".Anchor
 */
exports.Link = Montage.create(AbstractLink, /** @lends AbstractLink# */{

    hasTemplate: {value: false},

    didCreate: {
        value: function() {
            if (AbstractLink.didCreate) {
                AbstractLink.didCreate.call(this); // super
            }
            this.classList.add("matte-Link");
        }
    },

    draw: {
        value: function() {
            this.element.href = this.src;
            this.element.textContent = this.label;
        }
    }
});
