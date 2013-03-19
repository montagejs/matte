var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.VideoPlayerTest = Montage.create(TestController, {

    videoPlayer1: {
        value: null
    }

});
