/**
	module:"matte/ui/loading.reel"
*/
var Component = require("montage/ui/component").Component;
/**
 @class module:matte/ui/loading.Loading
 @extends module:montage/ui/component.Component
 */

exports.Loading = Component.specialize(/** @lends module:"matte/ui/loading.reel".Loading# */ {
/**
  Description TODO
  @private
*/
    _loading: {
        value: null
    },
/**
        Description TODO
        @type {Function}
        @default null
    */
    loading: {
        get: function() {
            return this._loading;
        },
        set: function(isloading) {
            if (this._loading !== isloading) {
                this._loading = isloading;
                this.needsDraw = true;
            }
        }
    },
/**
    Description TODO
    @function
    */
    draw: {
        value: function() {
            var classList = this.element.classList, exists = classList.contains("matte-Loading--loading");
            if (this.loading) {
                if (!exists) {
                    classList.add("matte-Loading--loading");
                }
            } else {
                if (exists) {
                    classList.remove("matte-Loading--loading");
                }

            }
        }
    }
});
