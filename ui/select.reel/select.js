/**
    @module "matte/ui/select.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeSelect = require("montage-native/ui/select.reel").Select;

/**
 * Select
 * @class module:"matte/ui/select.reel".Select
 * @extends module:"montage-native/ui/select.reel".Select
 */
exports.Select = Montage.create(NativeSelect, /** @lends module:"matte/ui/select.reel".Select# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeSelect.willPrepareForDraw.call(this);
            this.element.classList.add("matte-Select");
        }
    }


});
