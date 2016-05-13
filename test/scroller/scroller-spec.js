/*global require,exports,describe,it,expect,runs */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("scroller-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/scroller/scroller-spec", function() {

        describe("Scroller", function(){
            it("can be created", function() {
                expect(test.scroller1).toBeDefined();
            });

            it("can be scrolled", function() {
                testPage.dragElementOffsetTo(test.scroller1.element, 0, -20, null, null, function() {
                    testPage.waitForDraw();
                    runs(function() {
                        expect(test.scroller1.scrollY).toBe(20);
                        expect(testPage.getElementById("list").parentNode.style.webkitTransform).toMatch("translate3d\\(0(px)?, -20px, 0(px)?\\)");
                    });

                });
            });

            describe("adding content", function() {
                var delegate, originalMaxY;
                beforeEach(function() {
                    var delegateSpy = {
                        didSetMaxScroll: function(event) {
                            var x = 2;
                        }
                    };
                    delegate = spyOn(delegateSpy, 'didSetMaxScroll');

                    test.scroller1.delegate = delegateSpy;

                    originalMaxY = test.scroller1._maxTranslateY;
                    for (var i = 0; i < 5; i++) {
                        var li = document.createElement("li");
                        li.textContent = "new item " + i;
                        testPage.getElementById("list").appendChild(li);
                    }
                });

                it("calls didSetMaxScroll delegate", function() {
                    test.scroller1.needsDraw = true;
                    testPage.waitForComponentDraw(test.scroller1, 1, true);
                    runs(function() {
                        expect(delegate).toHaveBeenCalled();
                    });
                });

                it("can have the content expand", function() {
                    test.scroller1.needsDraw = true;
                    testPage.waitForComponentDraw(test.scroller1, 1, true);
                    runs(function() {
                        expect(test.scroller1._maxTranslateY).toBeGreaterThan(originalMaxY);
                    });
                });
            });

            describe("determining if it canScroll", function() {
                it("is true if it has content to scroll", function() {
                    expect(test.scroller1.canScroll).toBe(true);
                });

                it("is false if it has enough space to hold its content", function() {
                    test.scroller1._element.style.height = "1000000px";
                    test.scroller1.needsDraw = true;
                    testPage.waitForComponentDraw(test.scroller1, 1, true);
                    runs(function() {
                        expect(test.scroller1.canScroll).toBe(false);
                    });
                });
            });
        });
    });
});
