var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

exports.ResultsList = Montage.create(Component, {

    textPropertyPath: {value: null},

    // contentController -> this.repetition.contentController
    contentController: {value: null},

    activeIndexes: {value: null}
});
