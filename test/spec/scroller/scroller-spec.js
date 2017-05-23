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

            it("can be scrolled", function(done) {
                testPage.dragElementOffsetTo(test.scroller1.element, 0, -20, null, null, function() {
                    testPage.waitForDraw(1, true).then(function() {
                        expect(test.scroller1.scrollY).toBe(20);
                        expect(testPage.getElementById("list").parentNode.style.webkitTransform).toMatch("translate3d\\(0(px)?, -20px, 0(px)?\\)");
                        done();
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

                it("calls didSetMaxScroll delegate", function(done) {
                    test.scroller1.needsDraw = true
                    testPage.waitForComponentDraw(test.scroller1, 1, true).then(function() {
                        expect(delegate).toHaveBeenCalled();
                        done();
                    });
                });

                it("can have the content expand", function(done) {
                    test.scroller1.needsDraw = true;
                    testPage.waitForComponentDraw(test.scroller1, 1, true).then(function() {
                        expect(test.scroller1._maxTranslateY).toBeGreaterThan(originalMaxY);
                        done();
                    });
                });
            });

        });
    });
});
