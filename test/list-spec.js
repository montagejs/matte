var Montage = require("montage").Montage,
    TestPageLoader = require("support/testpageloader").TestPageLoader;

var testPage = TestPageLoader.queueTest("list-test", function() {
    describe("ui/list-spec", function() {
        it("should load", function() {
            expect(testPage.loaded).toBeTruthy();
        });

        var list;

        beforeEach(function() {
            list = testPage.test.list;
        });

        describe("when first loaded", function() {
            it("it should have no initial content", function() {
                var repetition = list._element.querySelector('*[data-montage-id="repetition"]').controller;
                expect(repetition).toBeDefined();
                expect(repetition.iterations.length).toBe(3);
                expect(list._element.querySelectorAll(".montage-InputRange").length).toBe(3);
            });
        });
    });
});
