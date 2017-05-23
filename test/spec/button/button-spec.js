var Montage = require("montage").Montage;
var Bindings = require("montage/core/core").Bindings;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("button-test", function(testPage) {
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

    describe("test/button/button-spec", function() {

        describe("button", function(){

            it("can be created from a div element", function() {
                testButton(test.divbutton, "div button");
            });
            it("can be created from an input element", function() {
                testButton(test.inputbutton, "input button");
            });
            it("can be created from a button element", function() {
                testButton(test.buttonbutton, "button button");
            });

            it("fires a 'hold' event when the button is pressed for a long time", function(done) {
                var el = test.inputbutton.element;
                var holdListener = testPage.addListener(test.inputbutton, null, "hold");
                var actionListener = testPage.addListener(test.inputbutton, null, "action");

                testPage.mouseEvent({target: el}, "mousedown", function () {
                    setTimeout(function () {
                        testPage.mouseEvent({target: el}, "mouseup", function () {
                            expect(holdListener).toHaveBeenCalled();
                                testPage.mouseEvent({target: el}, "click", function () {
                                expect(actionListener).not.toHaveBeenCalled();
                                done(); 
                            });
                        }); 
                    }, 1010);
                });

                    
            });

            describe("disabled property", function(){
                it("is taken from the element's disabled attribute", function() {
                    expect(test.disabledbutton.disabled).toBe(true);
                    expect(click(test.disabledbutton)).not.toHaveBeenCalled();
                    expect(test.disabledinput.disabled).toBe(true);
                    expect(click(test.disabledinput)).not.toHaveBeenCalled();
                    expect(test.inputbutton.disabled).toBe(false);
                });
                it("can be set", function(){
                    expect(test.disabledbutton.disabled).toBe(true);
                    test.disabledbutton.disabled = false;
                    expect(test.disabledbutton.disabled).toBe(false);
                    // TODO click the button and check that it wasn't pressed

                    expect(test.disabledinput.disabled).toBe(true);
                    test.disabledinput.disabled = false;
                    expect(test.disabledinput.disabled).toBe(false);
                    // TODO click the button and check that it wasn't pressed
                });
                it("can be set in the serialization", function(){
                    expect(test.disabledinputszn.disabled).toBe(true);
                    // TODO check button pressibility
                });
                it("is the inverse of the enabled property", function(){
                    expect(test.enabledinputszn.disabled).toBe(false);
                    expect(test.enabledinputszn.enabled).toBe(true);
                    test.enabledinputszn.enabled = false;
                    expect(test.enabledinputszn.disabled).toBe(true);
                    expect(test.enabledinputszn.enabled).toBe(false);
                    // TODO click the button and check that it wasn't pressed
                });
            });

            describe("label property", function() {
                it("is set from the serialization on a button", function(done) {
                    expect(test.buttonlabelszn.label).toBe("pass");
                    testPage.waitForDraw().then(function(){
                        expect(test.buttonlabelszn.element.firstChild.data).toBe("pass");
                        done();
                    });
                });
                it("is set from the serialization on an input", function() {
                    expect(test.inputlabelszn.label).toBe("pass");
                    expect(test.inputlabelszn.element.value).toBe("pass");
                });
                it("sets the value on an input", function() {
                    expect(test.inputbutton.label).toBe("input button");
                    test.inputbutton.label = "label pass";
                    expect(test.inputbutton.label).toBe("label pass");
                    expect(test.inputbutton.value).toBe("label pass");
                    test.inputbutton.label = "input button";
                });
                it("sets the first child on a non-input element", function(done) {
                    expect(test.buttonbutton.label).toBe("button button");
                    test.buttonbutton.label = "label pass";
                    expect(test.buttonbutton.label).toBe("label pass");

                    testPage.waitForDraw().then(function(){
                        expect(test.buttonbutton.element.firstChild.data).toBe("label pass");
                        test.buttonbutton.label = "button button";
                        done();
                    });
                });
            });

            describe("value property", function() {
                it("is set from the value on an input", function() {
                    expect(test.inputbutton.element.value).toBe("input button");
                    expect(test.inputbutton.value).toBe("input button");
                });
                it("is set by the label property in the serialization", function() {
                    expect(test.inputlabelszn.label).toBe("pass");
                    //expect(test.inputlabelszn.value).toBe("pass");
                });
                it("sets the label property when using an input element", function() {
                    expect(test.inputbutton.label).toBe("input button");
                    test.inputbutton.value = "value pass";
                    expect(test.inputbutton.value).toBe("value pass");
                    expect(test.inputbutton.label).toBe("value pass");
                    test.inputbutton.value = "input button";
                });
                it("doesn't set the label property when using a non-input element", function(done) {
                    expect(test.buttonbutton.label).toBe("button button");
                    test.buttonbutton.value = "value fail";
                    expect(test.buttonbutton.label).toBe("button button");
                    testPage.waitForDraw().then(function(){
                        expect(test.buttonbutton.element.firstChild.data).toBe("button button");
                        test.buttonbutton.value = "button button";
                        done();
                    });
                });

            });


            describe("action event detail property", function() {
                var detailButton, testHandler;
                beforeEach(function() {
                    detailButton = test.detailbutton;
                    testHandler = {
                        handler: function(event) {
                            testHandler.event = event;
                        },
                        event: null,
                        valueToBeBound: "aValue"
                    };
                });
                it("is undefined if not used", function() {
                    spyOn(testHandler, 'handler').and.callThrough();
                    detailButton.addEventListener("action", testHandler.handler, false);

                    testPage.clickOrTouch({target: detailButton.element});
                    expect(testHandler.handler).toHaveBeenCalled();
                    expect(testHandler.event.detail).toBeNull();
                });
                it("is is populated if used in a binding", function() {
                    spyOn(testHandler, 'handler').and.callThrough();
                    detailButton.addEventListener("action", testHandler.handler, false);
                    Bindings.defineBinding(detailButton, "detail.get('prop')", {
                        "<->": "valueToBeBound",
                        "source": testHandler
                    });

                    testPage.clickOrTouch({target: detailButton.element});
                    expect(testHandler.handler).toHaveBeenCalled();
                    expect(testHandler.event.detail.get("prop")).toEqual(testHandler.valueToBeBound);
                    //cleanup
                    Bindings.cancelBindings(detailButton);
                });
                it("is is populated if used programatically", function() {
                    spyOn(testHandler, 'handler').and.callThrough();
                    detailButton.addEventListener("action", testHandler.handler, false);
                    detailButton.detail.set("prop2", "anotherValue");

                    testPage.clickOrTouch({target: detailButton.element});
                    expect(testHandler.handler).toHaveBeenCalled();
                    expect(testHandler.event.detail.get("prop2")).toEqual("anotherValue");
                });
            });


            it("responds when child elements are clicked on", function(){
                expect(click(test.buttonnested, test.buttonnested.element.firstChild)).toHaveBeenCalled();
            });

            it("supports converters for label", function(done){
                test.converterbutton.label = "pass";
                expect(test.converterbutton.label).toBe("PASS");
                testPage.waitForDraw().then(function(){
                    expect(test.converterbutton.element.value).toBe("PASS");
                    done();
                });
            });

            // TODO should be transplanted to the press-composer-spec
            // it("correctly releases the pointer", function() {
            //     var l = testPage.addListener(test.scroll_button);

            //     testpage.mouseEvent({target: test.scroll_button.element}, "mousedown");;
            //     expect(test.scroll_button.active).toBe(true);
            //     test.scroll_button.surrenderPointer(test.scroll_button._observedPointer, null);
            //     expect(test.scroll_button.active).toBe(false);
            //     testPage.mouseEvent({target: test.scroll_button.element}, "mouseup");;

            //     expect(l).not.toHaveBeenCalled();

            // });

            if (window.Touch) {

                describe("when supporting touch events", function() {

                    it("should dispatch an action event when a touchend follows a touchstart on a button", function() {

                    });

                });

            } else {

                describe("when supporting mouse events", function() {
                    it("dispatches an action event when a mouseup follows a mousedown", function() {
                        expect(click(test.inputbutton)).toHaveBeenCalled();
                    });

                    it("does not dispatch an action event when a mouseup occurs after not previously receiving a mousedown", function() {
                        // reset interaction
                        // test.inputbutton._endInteraction();
                        var l = testPage.addListener(test.inputbutton);
                        testPage.mouseEvent({target: test.inputbutton.element}, "mouseup");;
                        expect(l).not.toHaveBeenCalled();
                    });

                    it("does not dispatch an action event when a mouseup occurs away from the button after a mousedown on a button", function() {
                        var l = testPage.addListener(test.inputbutton);

                        testpage.mouseEvent({target: test.inputbutton.element}, "mousedown");;
                        // Mouse up somewhere else
                        testPage.mouseEvent({target: test.divbutton.element}, "mouseup");;

                        expect(l).not.toHaveBeenCalled();
                    });
                });
            }

            var testButton = function(component, value) {
                expect(component).toBeDefined();
                expect(click(component)).toHaveBeenCalled();
                expect(component.label).toBe(value);
            };

            describe("inside a scroll view", function() {
                it("fires an action event when clicked", function() {
                    testButton(test.scroll_button, "scroll button");
                });
                it("doesn't fire an action event when scroller is dragged", function(done) {
                    var el = test.scroll_button.element;
                    var scroll_el = test.scroll.element;

                    var listener = testPage.addListener(test.scroll_button);

                    var press_composer = test.scroll_button.composerList[0];

                    // mousedown
                    testPage.mouseEvent({target: el}, "mousedown");

                    expect(test.scroll_button.active).toBe(true);
                    expect(test.scroll_button.eventManager.isPointerClaimedByComponent(press_composer._observedPointer, press_composer)).toBe(true);

                    // Mouse move doesn't happen instantly
                    setTimeout(function() {
                        // mouse move up
                        var moveEvent = document.createEvent("MouseEvent");
                        // Dispatch to scroll view, but use the coordinates from the
                        // button
                        moveEvent.initMouseEvent("mousemove", true, true, scroll_el.view, null,
                                el.offsetLeft, el.offsetTop - 100,
                                el.offsetLeft, el.offsetTop - 100,
                                false, false, false, false,
                                0, null);
                        scroll_el.dispatchEvent(moveEvent);

                        expect(test.scroll_button.active).toBe(false);
                        expect(test.scroll_button.eventManager.isPointerClaimedByComponent(press_composer._observedPointer, press_composer)).toBe(false);

                        // mouse up
                        testPage.mouseEvent({target: el}, "mouseup");;

                        expect(listener).not.toHaveBeenCalled();
                        done();
                    }, 10);
                });
            });

        });
    });
});
