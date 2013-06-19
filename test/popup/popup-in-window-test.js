var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

/**
* A Delegate to position the popup using custom logic
*/
var TestPopupPositionDelegate = Montage.specialize({
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
var aTestPopupPositionDelegate = new TestPopupPositionDelegate();

exports.PopupInWindowTest = TestController.specialize({
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
                popup = new Popup();
                popup.content = this.testPopup;
                popup.anchor = this.popupButton.element;
                popup.delegate = aTestPopupPositionDelegate;
            }
            popup.show();
        }
    }

});
