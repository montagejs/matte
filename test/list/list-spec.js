var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("list-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/list/list-spec", function() {
        var list;

        beforeEach(function() {
            list = test.list;
        });

        describe("when first loaded", function() {
            it("it should have no initial content", function() {
                var repetition = list._element.querySelector('*[data-montage-id="repetition"]').controller;
                expect(repetition).toBeDefined();
                expect(repetition.iterations.length).toBe(3);
                expect(list._element.querySelectorAll(".matte-InputRange").length).toBe(3);
            });
        });
    });
});
