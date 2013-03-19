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
                it("wipes out it's content in initialization if innerHTML is used", function() {
                    test.dynamicElement.innerHTML = void 0;
                    return testPage.nextDraw().then(function() {
                        expect(testPage.getElementById("bar2")).toBeNull();
                    });
                });
                it("plain text value can be set", function() {
                    test.dynamicElement.innerHTML = "foo";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("foo");
                    })
                });
                it("plain text value can be set when allowedElements is set to null", function() {
                    test.dynamicElement.allowedTagNames = null;
                    test.dynamicElement.innerHTML = "bar";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("bar");
                    })
                });
                it("null value can be set when allowedElements is set to null", function() {
                    test.dynamicElement.allowedTagNames = null;
                    test.dynamicElement.innerHTML = null;
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("");
                    })
                });
                it("plain text value can be set when allowedElements is set to a single tag", function() {
                    test.dynamicElement.allowedTagNames = ["b"];
                    test.dynamicElement.innerHTML = "bar";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("bar");
                        expect(test.dynamicElement._contentNode).toBeNull();
                    })
                });
                it("null value can be set when allowedElements is set to a single tag", function() {
                    test.dynamicElement.allowedTagNames = ["b"];
                    test.dynamicElement.innerHTML = null;
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.textContent).toEqual("");
                        expect(test.dynamicElement._contentNode).toBeNull();
                    })
                });
                it("html value can be set", function() {
                    test.dynamicElement.allowedTagNames = ["span"];
                    test.dynamicElement.innerHTML = "<span>bar</span>";
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual("<span>bar</span>");
                    })
                });
                it("html value cannot be set if allowedTagNames is an empty array", function() {
                    test.dynamicElement.allowedTagNames = [];
                    test.dynamicElement.innerHTML = '<span>bar</span>';
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual('');
                    })
                });
                it("html value cannot be set if an element isn't allowed", function() {
                    test.dynamicElement.allowedTagNames = ["span"];
                    test.dynamicElement.innerHTML = '<span><a href="#out">bar</a></span>';
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual('');
                    })
                });
                it("html value can be set with multiple allowed tags", function() {
                    test.dynamicElement.allowedTagNames = ["span", "a"];
                    test.dynamicElement.innerHTML = '<span><a href="#out">bar</a></span>';
                    return testPage.nextDraw().then(function() {
                        expect(test.dynamicElement.element.innerHTML).toEqual('<span><a href="#out">bar</a></span>');
                    })
                });
            });
        });
    });
});
