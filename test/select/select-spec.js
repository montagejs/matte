var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

var changeSelection = function(select, selectedIndex, multiple) {
    var options = select.options;

    if (multiple) {
        options[selectedIndex].selected = true;
    } else {
        for (var i = 0; i < options.length; i++) {
            options[i].selected = (i === selectedIndex);
        }
    }

    var event = document.createEvent('CustomEvent');
    event.initEvent('change', true, true);
    select.dispatchEvent(event);
};

TestPageLoader.queueTest("select-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/select/select-spec", function() {
        describe("initialization", function() {

            describe("once loaded", function() {

                it("select should have 'multiple' attribute", function() {
                    // these attributes are defined at the InputNumber/RangeInput
                    var instance = test.dept;
                    expect(instance.multiple).toBeDefined();

                });

                describe("Tests for Department select-input", function() {
                    it("dept's contentController is created", function() {
                        expect(test.dept.contentController).not.toBeNull();
                    });
                    it("dept should have values from content", function() {
                        expect(test.dept.contentController.content.length).toBe(6);
                    });


                });


                describe("Tests for Country select-input", function() {
                    it("country's contentController is created", function() {
                        expect(test.country.contentController).not.toBeNull();
                    });

                    it("country should get its possible values from the markup", function() {
                        expect(test.country.contentController.organizedContent.length).toBe(5);
                    });

                    // select a country via the contentController
                    //TODO francois disabled since the title doesn't match the test. This need to be revisited.
                    it("TODO country can be set via its contentController", function() {
                        var controller = test.country.contentController;
                        test.country.selectedIndexes = [2];
                        testPage.waitForDraw();
                        runs(function(){
                            expect(test.country.element.selectedIndex).toBe(2);
                        });
                    });

                    it("country's contentController must reflect selections", function() {
                        var select = test.country.element;
                        changeSelection(select, 1);
                        expect(test.country.value.label).toEqual("United States of America");
                    });
                });

                describe("Tests for State select-input", function() {
                    it("state's contentController is created", function() {
                        expect(test.state.contentController).not.toBeNull();
                    });

                    it("state should contain values for US when US is selected as the Country", function() {
                        // since US is selectedCountry by default
                        test.country.selectedIndexes = [1];  // US
                        expect(test.state.contentController.organizedContent.length).toBe(7);
                    });
                });

                describe("if no option is marked as selected", function() {
                    it("should set the first one as selected (gh-122)", function() {
                        var selectInput = test.noDefaultSelection;
                        expect(selectInput.element.selectedIndex).toBe(0);
                    });
                });

                //TODO NV: can't test 'value' bindings since two binding to the same target as not allowed ATM
                // https://github.com/montagejs/matte/issues/27#issuecomment-24681490
                describe("#208: Ability to bind to SelectInput.value", function() {

                });

                // TODO
                if (window.Touch) {

                    describe("when supporting touch events", function() {



                    });

                } else {

                    describe("when supporting mouse events", function() {


                    });

                }

            });
        });
    });
});
