console.log('montage-testing', 'Start');
module.exports = require("montage-testing").run(require,[
    // Please keep in alphabetical order
    "spec/anchor/anchor-spec",
    "spec/autocomplete/autocomplete-spec",
    "spec/blueprint/button/button-blueprint-spec",
    "spec/button/button-spec",
    "spec/dynamic-element/dynamic-element-spec",
    "spec/input-checkbox/input-checkbox-spec",
    "spec/input-number/input-number-spec",
    "spec/radio-button/radio-button-spec",
    "spec/input-range/input-range-spec",
    "spec/input-text/input-text-spec",
    "spec/list/list-spec",
    {name: "spec/popup/popup-spec", karma: false, browser: false},
    {name: "spec/rich-text-editor/rich-text-editor-spec", karma: false},
    "spec/scroller/scroller-spec",
    "spec/select/select-spec",
    "spec/text-slider/text-slider-spec",
    "spec/toggle-button/toggle-button-spec",
    "spec/token-field/token-field-spec",
    {name: "spec/video-player/video-player-spec", karma: false}
]).then(function () {
    console.log('montage-testing', 'End');
}, function (err) {
    console.log('montage-testing', 'Fail', err, err.stack);
    throw err;
});