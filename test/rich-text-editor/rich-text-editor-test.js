var TestController = require("montage-testing/test-controller").TestController,
    UndoManager = require("montage/core/undo-manager").UndoManager;

exports.RichTextEditorTest = TestController.specialize({

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
            editor.undoManager = new UndoManager();
        }
    }
});
