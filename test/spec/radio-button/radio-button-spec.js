var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;
var ActionEventListener = require("montage/core/event/action-event-listener").ActionEventListener;

TestPageLoader.queueTest("radio-button-test", function(testPage) {
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
    var change = function(el) {
        var changeEvent = document.createEvent("HTMLEvents");
        changeEvent.initEvent("change", true, true);
        el.dispatchEvent(changeEvent);
        return changeEvent;
    };

    describe("test/radio-button/radio-button-spec", function() {

        // The radio button uses the check-input class, which is pretty much
        // fully tested above. So fewer tests here.
        describe("radio button", function() {
            describe("checked property", function() {
                it("changes when the radio button is clicked", function(done) {
                    setTimeout(function() {
                        expect(test.radio1.checked).toBe(false);

                        click(test.radio1);

                        expect(test.radio1.checked).toBe(true);
                        done();
                    });
                });
            });
            describe("action event", function() {
                it("should fire when clicked", function() {
                    expect(click(test.radio2)).toHaveBeenCalled();
                });
                it("should not fire when another radio button in the same group is clicked", function() {
                    click(test.radio2);

                    var buttonSpy = {
                        doSomething: function(event) {
                            return 1+1;
                        }
                    };
                    spyOn(buttonSpy, 'doSomething');

                    var actionListener = new ActionEventListener().initWithHandler_action_(buttonSpy, "doSomething");
                    test.radio1.addEventListener("action", actionListener);

                    click(test.radio3);
                    expect(buttonSpy.doSomething).not.toHaveBeenCalled();
                });
            });
        });
    });
});
