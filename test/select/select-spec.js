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

                it("select should have the Select element attributes", function() {
                    // these attributes are defined at the InputNumber/RangeInput
                    var instance = test.dept;

                    expect(instance._getElementAttributeDescriptor('multiple')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('name')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('size')).toBeDefined();

                });

                it("select should have the element attributes defined by NativeControl", function() {
                    // these attributes are defined at the InputNumber/RangeInput
                    var instance = testPage.test.dept;

                    expect(instance._getElementAttributeDescriptor('placeholder')).not.toBeDefined();
                    expect(instance._getElementAttributeDescriptor('pattern')).not.toBeDefined();

                    expect(instance._getElementAttributeDescriptor('contenteditable')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('title')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('style')).toBeDefined();

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
                        expect(test.country.selectedIndexes[0]).toBe(1);
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
                        expect(selectInput._selectedIndexes.length).toBe(1);
                    });
                });

                //TODO francois: This needs to revisited once selection is solid in range-controller
                describe("#208: Ability to bind to SelectInput.value", function() {
                    it("Value should be set to the bound value initially", function() {
                        var justifySelect = test.justifySelect;
                        test.justify = 'center';

                        testPage.waitForDraw();

                        runs(function(){
                            expect(justifySelect.value).toBe("center");
                        });

                    });


                    it("Verify Select.value changes when bound value changes", function() {
                        var justifySelect = test.justifySelect;
                        test.justify = 'right';
                        expect(justifySelect.value).toBe("right");

                    });


                    it("Verify bound value (justify) to change when Selection changes", function() {
                        var justifySelect = test.justifySelect;

                        changeSelection(justifySelect.element, 1);
                        expect(justifySelect.value).toBe("left");

                        changeSelection(justifySelect.element, 2);
                        expect(justifySelect.value).toBe("center");
                        expect(test.justify).toBe("center");

                    });


                });

                //TODO francois: This needs to revisited once selection is solid in range-controller
                describe("#208: Ability to bind to SelectInput.values", function() {
                    it("Value should be set to the bound value initially", function() {
                        var dept = test.dept;
                        dept.values = ['SWE', 'IT'];

                        testPage.waitForDraw();
                        runs(function() {
                            expect(dept.values.length).toBe(2);
                            expect(dept._selectedIndexes[1]).toBe(5);
                        });
                    });

                    it("Verify Select.values changes when bound value changes", function() {
                        var dept = test.dept;
                        dept.selectedIndexes = [2, 4, 5];

                        testPage.waitForDraw();

                        runs(function(){
                            expect(dept.values[2]).toBe('IT');
                        });
                    });


                    it("Verify bound value (justify) to change when Selection changes", function() {
                        var dept = test.dept;

                        changeSelection(dept.element, 1);
                        expect(dept.values[0]).toBe("HRD");

                        changeSelection(dept.element, 2);
                        expect(dept.values[0]).toBe("SWE");

                    });


                });

                // test set/get of standard and global attributes
                describe("when setting standard attributes", function() {



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
