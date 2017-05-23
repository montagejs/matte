/*global require,exports,describe,it,expect */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

var testPage = TestPageLoader.queueTest("autocomplete-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/autocomplete/autocomplete-spec", function() {

        describe("AutocompleteTest", function(){
            it("can be created", function() {
                expect(test.autocomplete1).toBeDefined();
                expect(test.autocomplete2).toBeDefined();
            });

            describe("Once loaded", function() {
                describe ("value and textValue testing", function() {
                    it("original content has been injected", function() {
                        expect(test.autocomplete1.value).toBe("hello1,");
                    });

                    it("value from serialization has been set", function() {
                        expect(test.autocomplete2.value).toBe("Montage Rocks!,");
                    });

                    it("can set a new value", function(done) {
                        setTimeout(function(){
                            var text = "Do you speak HTML?";
                            test.autocomplete1.value = text;
                            testPage.waitForDraw();
                            setTimeout(function() {
                                expect(test.autocomplete1.value).toBe(text + ",");
                                expect(test.selectedValue1).toBe(text + ",");
                                done();
                            }, 1000);
                        });
                    });
                });

                describe ("suggestions popup tests", function() {
                    it("can show suggestions", function(done) {
                        setTimeout(function(){
                            test.autocomplete1.element.value = 'Cal';
                            // simulate the 'input' event on the textfield
                            test.autocomplete1._setValue();

                            setTimeout(function() {
                                //console.log('test.autocomplete1', test.autocomplete1);
                                expect(test.autocomplete1.suggestions.length).toBe(1);
                                expect(test.autocomplete1.showPopup).toBe(true);
                                done();
                            }, 1000);

                        });
                    });

                    it("does not show popup if no matches found", function(done) {
                        setTimeout(function(){
                            test.autocomplete1.element.value = 'ABCD';
                            // simulate the 'input' event on the textfield
                            test.autocomplete1._setValue();

                            setTimeout(function() {
                                //console.log('test.autocomplete1', test.autocomplete1);
                                expect(test.autocomplete1.suggestions.length).toBe(0);
                                expect(test.autocomplete1.showPopup).toBe(false);
                                done();
                            }, 1000);

                        });
                    });

                    it("can select a suggestion", function(done) {
                        setTimeout(function(){
                            test.autocomplete1.element.value = 'Cal';
                            // simulate the 'input' event on the textfield
                            test.autocomplete1._setValue();

                            setTimeout(function() {
                                expect(test.autocomplete1.suggestions.length).toBe(1);
                                expect(test.autocomplete1.showPopup).toBe(true);

                                var event = document.createEvent('CustomEvent');
                                event.initEvent('keyup', true, true);
                                event.keyCode = 13;

                                test.autocomplete1.handleKeyup(event);
                                testPage.waitForDraw();
                                //console.log('autocomplete1 suggestedValue', test.autocomplete1.suggestedValue);

                                setTimeout(function() {
                                    //console.log('autocomplete1 value after accepting suggestion', test.autocomplete1.value);
                                    expect(test.autocomplete1.value).toBe("California,");
                                    expect(test.selectedValue1).toBe("California,");
                                    done();
                                });

                            }, 1000);

                        });
                    });

                });

                it("can select a suggestion and bind the selected value", function(done) {
                    setTimeout(function(){
                        test.autocomplete1.element.value = 'Cal';
                        // simulate the 'input' event on the textfield
                        test.autocomplete1._setValue();

                        setTimeout(function() {
                            var event = document.createEvent('CustomEvent');
                            event.initEvent('keyup', true, true);
                            event.keyCode = 13;

                            test.autocomplete1.handleKeyup(event);
                            testPage.waitForDraw();

                            setTimeout(function() {
                                expect(test.selectedValue1).toBe("California,");
                                done();
                            });

                        }, 1000);

                    });
                });

                describe ("read only testing", function() {
                    it("set the autocomplete read only", function(done) {
                        test.autocomplete1.readOnly = true;
                        setTimeout(function() {
                            expect(test.autocomplete1.readOnly).toBeTruthy();
                            done();
                        }, 150);
                    });

                    it("set the autocomplete writable", function(done) {
                        test.autocomplete1.readOnly = false;
                        setTimeout(function() {
                            expect(test.autocomplete1.readOnly).toBeFalsy();
                            done();
                        }, 150);
                    });

                });
            });
        });
    });
});
