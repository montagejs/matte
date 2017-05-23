/*global require,exports,describe,it,expect,runs */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;
var EventInfo = require("montage-testing/testpageloader").EventInfo;
var Promise = require("montage/core/promise").Promise;
var Popup = require("matte/ui/popup/popup.reel").Popup;
var ActionEventListener = require("montage/core/event/action-event-listener").ActionEventListener;


TestPageLoader.queueTest("popup-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    var getElementPosition = function(obj) {
            var curleft = 0, curtop = 0, curHt = 0, curWd = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                    curHt += obj.offsetHeight;
                    curWd += obj.offsetWidth;
                } while ((obj = obj.offsetParent));
            }
            return {
                top: curtop,
                left: curleft,
                height: curHt,
                width: curWd
            };
            //return [curleft,curtop, curHt, curWd];
    };

    describe("test/popup/popup-spec", function() {
        describe("once loaded", function() {

            describe("Popup", function() {

                describe("show/hide", function() {
                    var popup;
                    beforeEach(function () {
                        popup = test.popup;
                    });
                    it("should not initially be displayed", function() {
                        expect(popup.displayed).toBe(false);
                    });
                    //BAD these tests rely on sequential execution
                    it("should show", function(done) {
                        popup.show();
                        testPage.waitForComponentDraw(popup).then(function() {
                            //console.log('after initial show', popup.element);
                            expect(popup.element.classList.contains("montage-invisible")).toBe(false);
                            done();
                        });

                    });
                    it("should hide", function(done) {
                        popup.hide();
                        testPage.waitForComponentDraw(popup).then(function() {
                            //console.log('after first hide');
                            expect(popup.element.classList.contains("montage-invisible")).toBe(true);
                            done();
                        });

                    });
                    it("should show again", function(done) {
                        popup.show();
                        testPage.waitForComponentDraw(popup).then(function() {
                            //console.log('after show 1', popup.element);
                            // if this fails, it means that the popup.draw is not called after it was hidden once
                            expect(popup.element.classList.contains("montage-invisible")).toBe(false);
                            done();
                        });
                    });
                });

                it("non-modal popup is hidden when clicked outside the popup", function(done) {

                    var popup = test.popup;

                    expect(popup.displayed).toBe(false);
                    popup.show();

                    testPage.waitForDraw().then(function() {
                        expect(popup.displayed).toBe(true);
                        var eventInfo = new EventInfo().initWithElementAndPosition(null, 1, 1);
                        console.log('about to click outside the popup');
                        testPage.mouseEvent(eventInfo, 'click', function(evt) {
                            popup.needsDraw = true;
                            testPage.waitForDraw().then(function() {
                                console.log('after drawing');
                                expect(popup.displayed).toBe(false);
                                done();
                            });
                        });
                    });
                });

            });


            it("is positioned relative to anchor by default", function() {
                var popup = test.popup;
                var anchor = popup.anchorElement, anchorHt, anchorWd, anchorPosition;

                var anchorPosition = getElementPosition(anchor);
                anchorHt = parseFloat(anchor.style.height || 0) || anchor.offsetHeight || 0;
                anchorWd = parseFloat(anchor.style.width || 0) || anchor.offsetWidth || 0;

                var show = Promise.defer();

                popup.addEventListener('show', function(event) {
                    show.resolve(event);
                });

                popup.show();

                return show.promise.then(function() {
                    console.log('show -');
                    var popupPosition = getElementPosition(popup.element);
                    expect(popupPosition.top).toEqual(anchorPosition.top + anchorHt);
                    popup.hide();
                });
            });



            it("is positioned at specified position", function() {
                var popup = test.popup;
                popup.position = {top: 1, left: 10};

                var show = Promise.defer();

                popup.addEventListener('show', function() {
                    show.resolve(event);
                });

                popup.show();

                return show.promise.then(function() {
                    var popupPosition = getElementPosition(popup.element);
                    console.log('show -', popupPosition);
                    expect(popupPosition.top).toBe(1);
                    expect(popupPosition.left).toBe(10);
                    popup.hide();
                });
            });
        });
    });
});

TestPageLoader.queueTest("popup-in-window-test", {newWindow: true}, function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/popup/popup-in-window-spec", function() {
        if (!testPage.loaded) {
            it("TODO DISABLE POPUP BLOCKER TO RUN POPUP IN WINDOW TESTS", function() {
                expect(testPage.loaded).toBeTruthy();
            });
            return;
        }

        describe("once loaded", function() {
            describe("Popup", function() {
                it("should position based on delegate logic", function(done) {
                    testPage.testWindow.resizeTo(800, 600);
                    test.showPopup();
                    testPage.waitForDraw(2).then(function() {
                        var popupPosition = EventInfo.positionOfElement(test.testPopup.popup.element);
                        //console.log('popupPosition with 800,600', popupPosition);
                        expect(popupPosition.y).toBe(10);
                        done();
                    });
                });
                it("should continually determine position at every resize", function(done) {
                    testPage.testWindow.resizeTo(800,400);
                    testPage.waitForDraw(1).then(function() {
                        var element = test.testPopup.popup.element;
                        var popupPosition = EventInfo.positionOfElement(element);
                        //console.log('popupPosition with 800,400', popupPosition);
                        expect(element.offsetHeight).toBe(118);
                        expect(popupPosition.y).toBe(222);
                        done();
                    });
                });
            });
        });
    });
});
