/**
    @module "montage/ui/select.reel"
*/
/*global require,exports */
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    NativeSelect = require("ui/native/select.reel").Select;

/**
 * Select
 * @class module:"montage/ui/select.reel".Select
 * @extends module:"montage/ui/native/select.reel".Select
 */
exports.Select = Montage.create(NativeSelect, /** @lends module:"montage/ui/select.reel".Select# */ {

    hasTemplate: {value: true},

    willPrepareForDraw: {
        value: function() {
            NativeSelect.willPrepareForDraw.call(this);
            this.element.classList.add("montage-Select");
        }
    }


});
