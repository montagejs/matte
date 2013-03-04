var Montage = require("montage").Montage;
var Component = require("montage/ui/component").Component;

var ListTest = exports.ListTest = Montage.create(Component, {
    list: {value: null}
});
