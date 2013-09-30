var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("input-number-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    var DATE_CLASS = '[object Date]';
    var FUNCTION_CLASS = '[object Function]',
        BOOLEAN_CLASS = '[object Boolean]',
        NUMBER_CLASS = '[object Number]',
        STRING_CLASS = '[object String]',
        ARRAY_CLASS = '[object Array]',
        DATE_CLASS = '[object Date]';
    var _toString = Object.prototype.toString;

    // TODO much like Array.isArray these should probably be moved into a shim i.e. Foo.isFoo(obj)

    var isNumber = function(object) {
        return _toString.call(object) === NUMBER_CLASS;
    };


    describe("ui/number-input-spec", function() {
        describe("initialization", function() {
            it("should load", function() {
                expect(testPage.loaded).toBeTruthy();
            });

            describe("once loaded", function() {

                it("num1 should have no value by default", function() {
                    expect(testPage.test.num1.value).toBeNull();
                });
                it("num1 should be required", function() {
                    expect(testPage.test.num1.required).toBe(true);
                });
                it("num2 should have default value", function() {
                    expect(testPage.test.num2.value).toBe(9);
                });
                it("num2 should be disabled", function() {
                    expect(testPage.test.num2.disabled).toBe(true);
                });

                it("num1 should have the min/max/step element attributes", function() {
                    // these attributes are defined at the InputNumber/AbstractNumberField
                    var instance = testPage.test.num1;
                    console.log('test min/max');
                    expect(instance._getElementAttributeDescriptor('min')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('max')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('step')).toBeDefined();

                });

                xit("num1 should have the element attributes defined by TextInput and NativeControl", function() {
                    // these attributes are defined at the AbstractControl
                    var instance = testPage.test.num1;

                    expect(instance._getElementAttributeDescriptor('name')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('placeholder')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('pattern')).toBeDefined();

                    expect(instance._getElementAttributeDescriptor('contenteditable')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('title')).toBeDefined();
                    expect(instance._getElementAttributeDescriptor('style')).toBeDefined();


                });

                describe("when setting the value", function() {

                    it("should accept the value when set programmatically", function() {
                        var field = testPage.test.num1,
                        value = "10";
                        field.value = value;

                        expect(field.value).toBe(10);
                        testPage.waitForDraw();
                        runs(function(){
                            // browser empties the content if value is invalid
                            expect(field.element.value).toBe(10);
                        });
                    });

                    it("should accept float values", function() {
                        var field = testPage.test.floatTest,
                        value = "10.5";
                        field.value = value;

                        expect(field.value).toBe(10.5);
                        testPage.waitForDraw();
                        runs(function(){
                            // browser empties the content if value is invalid
                            expect(field.element.value).toBe(10.5);
                        });
                    });

                    it("should reject changes to value if the user enters a string", function() {
                        var field = testPage.test.num2,
                        value = 232;
                        field.value = value;
                        value = "foo10";
                        field.value = value;

                        expect(field.value).toBe(232);
                        testPage.waitForDraw();
                        runs(function(){
                            // browser empties the content if value is invalid
                            expect(field.element.value).toBe(232);
                        });
                    });

                    it("should mark empty value as invalid for required fields", function() {
                        var field = testPage.test.valueless;

                        runs(function(){
                            expect(field.checkValidity()).toBe(false);
                        });
                    });

                    it("should accept the value even if disabled", function() {
                        var field = testPage.test.num2,
                        value = 15;
                        field.value = value;

                        expect(field.value).toBe(value);
                        testPage.waitForDraw();
                        runs(function(){
                            // browser empties the content if value is invalid
                            expect(field.element.value).toBe(value);
                        });
                    });

                    it("should set the value to the min if out of range", function() {
                        var field = testPage.test.num4,
                        value = -5;
                        field.value = value;

                        expect(field.value).toBe(0);
                        testPage.waitForDraw();
                        runs(function(){
                            // browser empties the content if value is invalid
                            expect(field.element.value).toBe(0);
                        });
                    });

                    it("should set the value to the max if out of range", function() {
                        var field = testPage.test.num4,
                        value = 105;
                        field.value = value;

                        expect(field.value).toBe(100);
                        testPage.waitForDraw();
                        runs(function(){
                            // browser empties the content if value is invalid
                            expect(field.element.value).toBe(100);
                        });
                    });

                    it("should  accept the value even if its not at a step", function() {
                        var field = testPage.test.num4,
                        value = 14;
                        field.value = value;

                        expect(field.value).toBe(14);
                        testPage.waitForDraw();
                        runs(function(){
                            // browser empties the content if value is invalid
                            expect(field.element.value).toBe(14);
                        });
                    });

                    describe("when using converter for the value", function() {
                        // English thousands
                        it("should accept a valid value with commas", function() {
                            var field = testPage.test.converterTest,
                            value = "2,000,000.99";
                            field.value = value;

                            expect(isNumber(field.value)).toBe(true);
                            expect(field.error).toBeFalsy();
                            expect(field.value).toBe(2000000.99);
                        });
                        // Common International formats http://en.wikipedia.org/wiki/Decimal_mark
                        xit("should accept a valid value with an international numer format", function() {
                            var field = testPage.test.converterTest,
                            value = "2.111.111,99";
                            field.value = value;

                            expect(isNumber(field.value)).toBe(true);
                            expect(field.error).toBeFalsy();
                            expect(field.value).toBe(2111111.99);

                            // Thin space  ISO 31-0
                            value = "2 333 333,99";
                            field.value = value;

                            expect(isNumber(field.value)).toBe(true);
                            expect(field.error).toBeFalsy();
                            expect(field.value).toBe(2333333.99);

                            // ASCII  ISO 31-0
                            value = "2 444 444,99";
                            field.value = value;

                            expect(isNumber(field.value)).toBe(true);
                            expect(field.error).toBeFalsy();
                            expect(field.value).toBe(2444444.99);

                            // Crore 
                            value = "25,55,555.99";
                            field.value = value;

                            expect(isNumber(field.value)).toBe(true);
                            expect(field.error).toBeFalsy();
                            expect(field.value).toBe(2555555.99);
                        });
                        // Invalid decimal points
                        it("should correct an invalid value with too many decimal points", function() {
                            var field = testPage.test.converterTest,
                            value = "2,000.32.99";
                            field.value = value;

                            expect(isNumber(field.value)).toBe(true);
                            expect(field.error).toBeFalsy();
                            expect(field.value).toBe(2000.32);
                        });

                    });

                });

                describe("when setting disabled and readonly flags", function() {
                    it("should accept boolean values for disabled", function() {
                        var field = testPage.test.num2;
                        field.disabled = true;
                        expect(field.disabled).toBe(true);
                    });
                    it("should accept truthy values for disabled", function() {
                        var field = testPage.test.num2;
                        field.disabled = "true";
                        expect(field.disabled).toBe(true);

                    });
                    it("should accept boolean values for disabled 2", function() {
                        var field = testPage.test.num2;
                        field.disabled = "disabled";
                        expect(field.disabled).toBe(true);

                    });
                    it("should accept falsy values for disabled", function() {
                        var field = testPage.test.num2;
                        field.disabled = false;
                        expect(field.disabled).toBe(false);
                    });
                    it("should accept falsy values for disabled 2", function() {
                        var field = testPage.test.num2;
                        field.disabled = null;
                        expect(field.disabled).toBe(false);
                    });

                    // readonly
                    it("should accept boolean values for readonly", function() {
                        var field = testPage.test.num2;
                        field.readonly = true;
                        expect(field.readonly).toBe(true);
                    });
                    it("should accept truthy values for readonly", function() {
                        var field = testPage.test.num2;
                        field.readonly = "true";
                        expect(field.readonly).toBe(true);
                    });
                    it("should accept boolean values for readonly 2", function() {
                        var field = testPage.test.num2;
                        field.readonly = "readonly";
                        expect(field.readonly).toBe(true);
                    });
                    it("should accept falsy values for readonly", function() {
                        var field = testPage.test.num2;
                        field.readonly = false;
                        expect(field.readonly).toBe(false);
                    });
                    it("should accept falsy values for readonly 2", function() {
                        var field = testPage.test.num2;
                        field.readonly = null;
                        expect(field.readonly).toBe(false);
                    });
                });

                // test set/get of standard and global attributes
                describe("when setting standard attributes", function() {
                    it("should use values from binding if provided", function() {
                        var field = testPage.test.num3;

                        expect(field.width).toBe("200");
                        expect(field.height).toBe("200");
                    });

                    it("should accept values from markup if provided", function() {
                        var field = testPage.test.num3;

                        expect(field.step).toBe(2);
                        expect(field.min).toBe(0);
                        expect(field.max).toBe(20);

                    });
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
