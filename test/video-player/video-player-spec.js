/*global require,exports,describe,it,expect */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("video-player-test", function(testPage) {
    var test,
        controller;

    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/video-player/video-player-spec", function() {
        describe("initialization", function() {
            it("should create a video player", function() {
                controller = test.videoPlayer1.controller;
                // Reset the video
                controller.stop();
                controller.position = 0.0;

                expect(test.videoPlayer1).toBeDefined();
                expect(test.videoPlayer1).not.toBeNull();
           });
           // … and more

           describe("once loaded", function() {
               it("position is 0", function() {
                   expect(controller.position).toBe(0.0);
               });
               it("duration is about 4.37 seconds", function() {
                   expect(Math.round(controller.duration * 100) / 100).toBe(4.37);
               });

               describe("after start playing", function() {
                   it("video has played a bit", function() {
                       controller.play();
                       waits(500);
                       runs(function(){
                           expect(controller.position).not.toBe(0.0);
                       });
                   });

                   it("video is still playing", function() {
                       expect(controller.status).toBe(controller.PLAYING);
                   });
               });

               describe("after stop playing", function() {
                   it("video is not playing", function() {
                       controller.stop();
                       expect(controller.status).toBe(controller.STOPPED);
                   });
               });

           });
        });
    });
});
