var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

/**
* A Delegate to position the popup using custom logic
*/
var TestPopupPositionDelegate = Montage.create(Montage, {
    willPositionPopup: {
       value: function(popup, anchorPosition) {
           if(anchorPosition) {
               console.log('anchorPosition : ', anchorPosition);
               if(window.innerHeight > 500 ){
                   return {
                       top: 10,
                       left: anchorPosition.left
                   };
               } else {
                   return {
                       bottom: 10,
                       left: anchorPosition.left
                   };
               }
           }
           return {top: 0, left: 0};
       }
    }
});
var aTestPopupPositionDelegate = Montage.create(TestPopupPositionDelegate);

exports.PopupInWindowTest = Montage.create(TestController, {
    deserializedFromTemplate: {
        value: function() {
            return this;
        }
    },

    popup: {
        value: null
    },

    testPopup: {
        value: null
    },

    popupButton: {
        value: null
    },

    /**

     @param
         @returns
     */
    showPopup:{
        value:function () {
            var popup = this.testPopup.popup;
            if(!popup) {
                popup = Popup.create();
                popup.content = this.testPopup;
                popup.anchor = this.popupButton.element;
                popup.delegate = aTestPopupPositionDelegate;
            }
            popup.show();
        }
    }

});
