/*global require,exports,describe,it,expect,runs */

var Montage = require("montage").Montage,
    TestPageLoader = require("support/testpageloader").TestPageLoader,
    EventInfo = require("support/testpageloader").EventInfo,
    Popup = require("montage/ui/popup/popup.reel").Popup,
    ActionEventListener = require("montage/core/event/action-event-listener").ActionEventListener;

var testPage = TestPageLoader.queueTest("popup-in-window-test", {newWindow: true}, function() {
    var test = testPage.test;

    describe("ui/popup-in-window-spec", function() {
        if (!testPage.loaded) {
            it("TODO DISABLE POPUP BLOCKER TO RUN POPUP IN WINDOW TESTS", function() {
                expect(testPage.loaded).toBeTruthy();
            });
            return;
        }

        it("should load", function() {
            expect(testPage.loaded).toBeTruthy();
        });

        describe("once loaded", function() {
            describe("Popup", function() {
                it("should position based on delegate logic", function() {
                    testPage.testWindow.resizeTo(800, 600);
                    test.showPopup();

                    testPage.waitForDraw(2);
                    runs(function() {
                        var popupPosition = EventInfo.positionOfElement(test.testPopup.popup.element);
                        //console.log('popupPosition with 800,600', popupPosition);
                        expect(popupPosition.y).toBe(10);
                    });
                });
                it("should continually determine position at every resize", function() {
                    testPage.testWindow.resizeTo(800,400);
                    testPage.waitForDraw(1);
                    runs(function() {
                        var element = test.testPopup.popup.element;
                        var popupPosition = EventInfo.positionOfElement(element);
                        //console.log('popupPosition with 800,400', popupPosition);
                        expect(element.offsetHeight).toBe(118);
                        expect(popupPosition.y).toBe(222);
                    });
                });
            });
        });
    });
});
