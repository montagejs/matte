var Montage = require("montage").Montage,
    UndoManager = require("montage/core/undo-manager").UndoManager;

var RichTextEditorTest = exports.RichTextEditorTest = Montage.create(Montage, {

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
