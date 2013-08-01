/**
	@module "matte/ui/list.reel"
*/
var Component = require("montage/ui/component").Component,
    observeProperty = require("montage/frb/observers").observeProperty;

/**
 @class module:"matte/ui/list.reel".List
 @extends module:montage/ui/component.Component
 */
exports.List = Component.specialize(/** @lends module:"matte/ui/list.reel".List# */ {

    constructor: {
        value: function List () {
            this.super();

            this.defineBinding("_repetition.content", {"<-": "content"});

            // Only use a contentController if content is not defined
            this.defineBinding("content.defined() ? null : _repetition.contentController", {
                "<-": "contentController"
            });

        }
    },

    /**
      Description TODO
      @private
    */
    _repetition: {
        value: null
    },
    /**
        Description TODO
        @type {Property}
        @default null
    */
    delegate: {
        value: null
    },

    content: {value: null},

    contentController: {value: null},

    axis: {
        value: null
    },

/**
  Description TODO
  @private
*/
    isSelectionEnabled: {
        value: null
    },

    // Initialization

    // TODO we should probably support the programmatic initialization of a list; forwarding the childComponents
    // along to the repetition
    // I want to say that if somebody knows enough to do that they know enough to append the child components' elements
    // into the repetition, not the list

    observeProperty: {
        value: function (key, emit, source, parameters, beforeChange) {
            if (key === "objectAtCurrentIteration" || key === "currentIteration") {
                if (this._repetition) {
                    return this._repetition.observeProperty(key, emit, source, parameters, beforeChange);
                }
            } else {
                return observeProperty(this, key, emit, source, parameters, beforeChange);
            }
        }
    }

});
