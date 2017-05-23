/*global require,exports,describe,it,expect */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;


TestPageLoader.queueTest("dynamic-element-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/dynamic-element/dynamic-element-spec", function() {

        describe("DynamicElement", function() {

            describe("setting innerHTML", function() {
                it("can be created", function() {
                    expect(test.dynamicElement).toBeDefined();
                });
                it("wipes out it's content in initialization if innerHTML is used", function(done) {
                    test.dynamicElement.innerHTML = void 0;
                    return testPage.nextDraw().then(function() {
                        expect(testPage.getElementById("bar2")).toBeNull();
                        done();
                    });
                });
                it("plain text value can be set", function(done) {
                    test.dynamicElement.innerHTML = "foo";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("foo");
                        done();
                    })
                });
                it("plain text value can be set when allowedElements is set to null", function(done) {
                    test.dynamicElement.allowedTagNames = null;
                    test.dynamicElement.innerHTML = "bar";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("bar");
                        done();
                    })
                });
                it("null value can be set when allowedElements is set to null", function(done) {
                    test.dynamicElement.allowedTagNames = null;
                    test.dynamicElement.innerHTML = null;
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("");
                        done();
                    })
                });
                it("plain text value can be set when allowedElements is set to a single tag", function(done) {
                    test.dynamicElement.allowedTagNames = ["b"];
                    test.dynamicElement.innerHTML = "bar";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("bar");
                        expect(test.dynamicElement._contentNode).toBeNull();
                        done();
                    })
                });
                it("null value can be set when allowedElements is set to a single tag", function(done) {
                    test.dynamicElement.allowedTagNames = ["b"];
                    test.dynamicElement.innerHTML = null;
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("");
                        expect(test.dynamicElement._contentNode).toBeNull();
                        done();
                    })
                });
                it("html value can be set", function(done) {
                    test.dynamicElement.allowedTagNames = ["span"];
                    test.dynamicElement.innerHTML = "<span>bar</span>";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual("<span>bar</span>");
                        done();
                    })
                });
                it("html value cannot be set if allowedTagNames is an empty array", function(done) {
                    test.dynamicElement.allowedTagNames = [];
                    test.dynamicElement.innerHTML = '<span>bar</span>';
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual('');
                        done();
                    })
                });
                it("html value cannot be set if an element isn't allowed", function(done) {
                    test.dynamicElement.allowedTagNames = ["span"];
                    test.dynamicElement.innerHTML = '<span><a href="#out">bar</a></span>';
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual('');
                        done();
                    })
                });
                it("html value can be set with multiple allowed tags", function(done) {
                    test.dynamicElement.allowedTagNames = ["span", "a"];
                    test.dynamicElement.innerHTML = '<span><a href="#out">bar</a></span>';
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual('<span><a href="#out">bar</a></span>');
                        done();
                    })
                });
            });
        });
    });
});
