var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("list-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/list/list-spec", function() {
        var list1,
            list2;

        beforeEach(function() {
            list1 = test.list1;
            list2 = test.list2;
        });

        describe("when first loaded", function() {
            it("it should have no initial content", function() {
                var repetition = list1._element.querySelector('*[data-montage-id="repetition"]').component;
                expect(repetition).toBeDefined();
                expect(repetition.iterations.length).toBe(3);
                expect(list1._element.querySelectorAll(".matte-InputRange").length).toBe(3);
            });
        });
        it("should scroll with the mouse", function() {
            // a point inside list2
            var element = testPage.document.elementFromPoint(10, 50);

            // The first dragElementOffsetTo is only needed because the Scroller
            // only scrolls after the first draw, the first one is used to
            // calculate the maxTranslateY
            testPage.dragElementOffsetTo(element, 0, 0, null, null, function() {
                testPage.waitForDraw();
                runs(function() {

                    testPage.dragElementOffsetTo(element, 0, -40, null, null, function() {
                        testPage.waitForDraw();
                        runs(function() {
                            expect(testPage.document.elementFromPoint(10, 50)).not.toBe(element);
                        });
                    }, {pointerType: "mouse"});

                });
            }, {pointerType: "mouse"});
        });
        it("should scroll with touch", function() {
            // a point inside list2
            var element = testPage.document.elementFromPoint(10, 50);

            // The first dragElementOffsetTo is only needed because the Scroller
            // only scrolls after the first draw, the first one is used to
            // calculate the maxTranslateY
            testPage.dragElementOffsetTo(element, 0, 0, null, null, function() {
                testPage.waitForDraw();
                runs(function() {

                    testPage.dragElementOffsetTo(element, 0, -40, null, null, function() {
                        testPage.waitForDraw();
                        runs(function() {
                            expect(testPage.document.elementFromPoint(10, 50)).not.toBe(element);
                        });
                    }, {pointerType: "touch"});

                });
            }, {pointerType: "touch"});
        });
        describe("when scrolling", function() {
            it("it should fire when scroll reaches the end", function() {
                list1.listEndEventThreshold = 1;
                list1._scroller._maxTranslateY = 200;
                var expectation = expectationToDispatch(list1, "listEnd");
                list1._scroller.scrollY = 200;
                expectation();
            });
            it("it should fire when scroll goes beyond threshold", function() {
                list1.listEndEventThreshold = .5;
                list1._scroller._maxTranslateY = 200;
                var expectation = expectationToDispatch(list1, "listEnd");
                list1._scroller.scrollY = 101;
                expectation();
            });
            it("it should not fire when scroll doesn't go beyond threshold", function() {
                list1.listEndEventThreshold = .5;
                list1._scroller._maxTranslateY = 200;
                var expectation = expectationToDispatch(list1, "listEnd");
                list1._scroller.scrollY = 99;
                expectation(true);
            });
            it("it should not fire when list doesn't scroll", function() {
                list1.listEndEventThreshold = .5;
                list1._scroller._maxTranslateY = 0;
                var expectation = expectationToDispatch(list1, "listEnd");
                list1._scroller.scrollY = 0;
                expectation(true);
            });
        });

        describe("currentIteration property", function () {
            it("should cause a deprecation warning", function () {
                expectConsoleCallsFrom(function () {
                    list1.observeProperty("currentIteration", Function.noop, Function.noop );
                }, testPage.window, "warn").toHaveBeenCalledWith("currentIteration is deprecated, use :iteration.object instead.", "");
            });
        });

        describe("objectAtCurrentIteration property", function () {
            it("should cause a deprecation warning", function () {
                expectConsoleCallsFrom(function () {
                    list1.observeProperty("objectAtCurrentIteration", Function.noop, Function.noop );
                }, testPage.window, "warn").toHaveBeenCalledWith("objectAtCurrentIteration is deprecated, use :iteration.object instead.", "");
            });
        });

    });
});
