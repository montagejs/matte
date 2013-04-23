/**
    @module "matte/ui/select.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    NativeSelect = require("native/ui/select.reel").Select;

/**
 * Select
 * @class module:"matte/ui/select.reel".Select
 * @extends module:"native/ui/select.reel".Select
 */
exports.Select = Montage.create(NativeSelect, /** @lends module:"matte/ui/select.reel".Select# */ {

    hasTemplate: {value: true},

    didCreate: {
        value: function() {
            if (NativeSelect.didCreate) {
                NativeSelect.didCreate.call(this);
            }
            this.classList.add("matte-Select");
        }
    }


});
