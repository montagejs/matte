var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;
var UndoManager = require("montage/core/undo-manager").UndoManager;

exports.RichTextEditorTest = Montage.create(TestController, {

    editor1: {
        value: null
    },

    editor2: {
        value: null
    },

    getSelectedElement: {
        value: function(editor) {
            var element = editor._selectedRange.startContainer;
            if (element.nodeType == 3) {
                element = element.parentNode;
            }
            return element;
        }
    },

    getStyleOfSelectedElement: {
        value: function(editor) {
            return window.getComputedStyle(this.getSelectedElement(editor));
        }
    },

    resetUndoManager: {
        value: function(editor) {
            editor.undoManager = UndoManager.create();
        }
    }
});
