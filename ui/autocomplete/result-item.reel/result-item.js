
/**
    @module "montage/ui/autocomplete/result-item.reel"
    @requires montage
    @requires montage/ui/component
    @requires "montage/ui/dynamic-text.reel"
*/
var Montage = require("montage").Montage,
    Component = require("ui/component").Component,
    DynamicText = require("ui/dynamic-text.reel").DynamicText;

/**
    @class module:"montage/ui/autocomplete/result-item.reel".ResultItem
    @extends module:"montage/ui/dynamic-text.reel".DynamicText
*/
exports.ResultItem = Montage.create(DynamicText, {

    textPropertyPath: {value: null},

    _object: {value: null},
    object: {
        get: function() {
            return this._object;
        },
        set: function(aValue) {
            if(aValue) {
               this._object = aValue;
            }
            if(this._object) {
                if(this.textPropertyPath) {
                    this.value = this._object[this.textPropertyPath];
                } else {
                    this.value = this._object;
                }
            }
        }
    }

});
