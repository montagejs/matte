/*global require,exports,describe,it,expect */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("token-field-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/token-field/token-field-spec", function() {

        describe("TokenField", function(){
           it("can be created", function() {
               expect(test.tokenField1).toBeDefined();
               expect(test.tokenField2).toBeDefined();
           });
           // … and more

           describe("Once loaded", function() {
               describe ("value and textValue testing", function() {

                   it("value from serialization has been set", function() {
                       expect(test.tokenField1.values).toBeNull();
                       expect(test.tokenField2.values).toBeNull();
                   });

                   it("can set a new value", function(done) {
                       setTimeout(function(){
                           var values = [{
                               name: 'California',
                               code: 'CA'
                           }];
                           test.states = values;
                           testPage.waitForDraw().then(function() {
                               expect(test.tokenField1.values).toBe(values);
                               done();
                           });
                       });
                   });
               });

               describe ("can pick a suggested value", function() {


                    it("can select a suggestion", function(done) {
                          var autocomplete2 = test.tokenField2._autocomplete;

                          autocomplete2.element.value = 'news';
                          // simulate the 'input' event on the textfield
                          autocomplete2._setValue();
                          // this is required as needsDraw is normally not set when user enters
                          // into the input field directly
                          autocomplete2.needsDraw = true;
                          testPage.waitForDraw().then(function() {
                              //console.log('autocomplete2.value after input event', autocomplete2.value);
                              testPage.keyEvent({target: autocomplete2.element, keyCode: 13}, 'keyup');
                              //console.log('tokenField1 suggestedValue', test.tokenField1.suggestedValue);
                              testPage.waitForDraw().then(function() {
                                    //console.log('tokenField1 value after accepting suggestion', test.tokenField1.value);
                                    expect(test.tokenField2.values[0]).toBe("news");
                                    expect(test.tags[0]).toBe("news");
                                    done();
                              });
                          });
                    });

                    it("can select a suggestion without existing values (gh-572)", function(done) {

                        var autocomplete2 = test.tokenField2._autocomplete;
                        var newToken = 'User Experience';

                        autocomplete2.element.value = newToken;
                        // simulate the 'input' event on the textfield
                        autocomplete2._setValue();
                        autocomplete2.needsDraw = true;
                        testPage.waitForDraw().then(function() {
                            console.log('draw after selecting a suggestion');
                            testPage.keyEvent({target: autocomplete2.element, keyCode: 13}, 'keyup');
                            testPage.waitForDraw().then(function() {
                                console.log('tokenField2 values after accepting suggestion', test.tokenField2.values);
                                expect(test.tokenField2.values[1]).toBe(newToken);
                                expect(test.tags[1]).toBe(newToken);
                                done();
                            });
                        });
                    });


                   it("cannot select a suggestion unless a match is found if ad-hoc values are not allowed", function(done) {
                       var autocomplete1 = test.tokenField1._autocomplete;

                       autocomplete1.element.value = 'ABCD';
                       // simulate the 'input' event on the textfield
                       autocomplete1._setValue();
                       autocomplete1.needsDraw = true;

                       testPage.waitForDraw().then(function() {

                           var event = document.createEvent('CustomEvent');
                           event.initEvent('keyup', true, true);
                           event.keyCode = 13;

                           var prevValues = test.tokenField1.values;

                           autocomplete1.handleKeyup(event);
                           testPage.waitForDraw().then(function() {
                               //console.log('tokenField1 value after accepting suggestion', test.tokenField1.value);
                               expect(test.tokenField1.values).toBe(prevValues);
                               expect(test.states).toBe(prevValues);
                               done();
                           });
                       });
                   });
               });
           });
        });
    });
});
