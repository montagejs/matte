var Montage = require("montage").Montage;
var Bindings = require("montage/core/core").Bindings;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("toggle-button-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    var click = function(component, el, fn) {
        el = el || component.element;
        var listener = testPage.addListener(component, fn);
        testPage.clickOrTouch({target: el});
        // Return this so that it can be checked in tha calling function.
        return listener;
    };
    var testButton = function(component, value) {
        expect(component).toBeDefined();
        expect(click(component)).toHaveBeenCalled();
        expect(component.label).toBe(value);
    };

    describe("test/toggle-button/toggle-button-spec", function() {

        describe("togglebutton", function() {
            it("alternates between unpressed and pressed", function() {
                expect(test.toggleinput.pressed).toBe(false);
                expect(test.toggleinput.label).toBe("off");

                click(test.toggleinput);
                expect(test.toggleinput.pressed).toBe(true);
                expect(test.toggleinput.label).toBe("on");

                click(test.toggleinput);
                expect(test.toggleinput.pressed).toBe(false);
                expect(test.toggleinput.label).toBe("off");
            });

            describe("toggle()", function() {
                it("swaps the state", function() {
                    test.toggleinput.pressed = false;
                    test.toggleinput.toggle();
                    expect(test.toggleinput.pressed).toBe(true);
                    test.toggleinput.toggle();
                    expect(test.toggleinput.pressed).toBe(false);
                    test.toggleinput.toggle();
                    expect(test.toggleinput.pressed).toBe(true);
                });
            });

            describe("label property", function() {
                it("alternates between unpressed and pressed", function(done) {
                    test.toggleinput.pressed = false;

                    // The expectations are in a closure because the draw can
                    // happen at any point after we click on the button
                    var checker = function(e) {
                        return function(){
                            expect(test.toggleinput.pressed).toBe(e);
                            expect(test.toggleinput.element.value).toBe((e)?"on":"off");
                        };
                    };

                    checker(false);
                    click(test.toggleinput);
                    testPage.waitForDraw().then(function () {
                        checker(true);
                        done();
                    });
                });
                it("changes pressed state when set to unpressedLabel or pressedLabel", function(){
                    test.toggleinput.pressed = false;
                    test.toggleinput.label = "on";
                    expect(test.toggleinput.pressed).toBe(true);
                    test.toggleinput.label = "off";
                    expect(test.toggleinput.pressed).toBe(false);
                });
                it("doesn't change pressed state when set to a non-matching string", function(){
                   expect(test.toggleinput.pressed).toBe(false);
                   test.toggleinput.label = "random";
                   expect(test.toggleinput.pressed).toBe(false);
                   expect(test.toggleinput.label).toBe("random");

                   test.toggleinput.pressed = true;
                   expect(test.toggleinput.label).toBe("on");
                });
            });
            describe("unpressedLabel", function() {
                it("is set as the value when the button is unpressed", function() {
                    test.toggleinput.pressed = false;
                    expect(test.toggleinput.label).toBe("off");
                    test.toggleinput.unpressedLabel = "unpressed";
                    expect(test.toggleinput.label).toBe("unpressed");

                    testPage.waitForDraw().then(function(){
                        expect(test.toggleinput.element.value).toBe("unpressed");
                    });
                });
                it("is taken from `value` on init if the button is unpressed and unpressedLabel isn't set", function() {
                    expect(test.toggleinput2.unpressedLabel).toBe(test.toggleinput2.label);
                });
            });

            describe("pressedLabel", function() {
                it("is set as the value when the button is pressed", function() {
                    test.toggleinput.pressed = true;
                    expect(test.toggleinput.label).toBe("on");
                    test.toggleinput.pressedLabel = "pressed";
                    expect(test.toggleinput.label).toBe("pressed");

                    testPage.waitForDraw().then(function(){
                        expect(test.toggleinput.element.value).toBe("pressed");
                    });
                });
                it("is taken from `value` on init if the button is pressed and pressedLabel isn't set", function() {
                    expect(test.toggleinput3.pressedLabel).toBe(test.toggleinput3.label);
                });
            });

            describe("pressedClass", function() {
                it("is not in the classList when the button is unpressed", function() {
                    test.toggleinput.pressed = false;

                    testPage.waitForDraw().then(function(){
                        expect(test.toggleinput.element.className).not.toContain("pressed");
                    });
                });
                it("is added to the classList when the button is pressed", function() {
                    test.toggleinput.pressed = true;

                    testPage.waitForDraw().then(function(){
                        expect(test.toggleinput.element.className).toContain("pressed");
                    });
                });
            });
        });
    });
});
