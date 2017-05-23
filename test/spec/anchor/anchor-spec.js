var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("anchor-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/anchor/anchor-spec", function() {
        describe("initialization", function() {

            describe("once loaded", function() {

                it("link1 should have no value by default", function() {
                    expect(test.link1.textContent).toBe('');
                });
                it("link2 should have textContent from the markup", function() {
                    expect(test.link2.textContent).toBe('Foo');
                });
                it("link3 should have textContent from the markup", function() {
                    expect(test.link3.textContent).toBe('Bar');
                });
                it("link1 should have no href", function() {
                    expect(test.link1.href).toBeNull();
                });
                it("link2 should have default target", function() {
                    expect(test.link2.target).toBe('_blank');
                });

                describe("when setting the textContent", function() {

                    it("should accept the value when set programmatically", function(done) {
                        var field = test.link1,
                        value = 'Foo';
                        field.textContent = value;

                        expect(field.textContent).toBe(value);
                        testPage.waitForDraw();
                        setTimeout(function(){
                            expect(field.element.textContent == value).toBe(true);
                            done();
                        });
                    });
                    /*
                    // TODO: No support for converter for Anchor.textContent

                    describe("when using converter for the value", function() {
                        // date field
                        it("should a valid value", function() {
                            var field = test.date1,
                            value = "01-01-2010";
                            field.value = value;

                            expect(isDate(field.value)).toBe(true);
                            expect(field.error).toBeFalsy();
                        });
                        it("should reject an invalid value", function() {
                            var field = test.date1,
                            value = "01/01/2010";
                            field.value = value;

                            expect(field.error).not.toBeNull();
                        });

                    });
                    */

                });

                // test set/get of standard and global attributes
                describe("when setting standard attributes", function() {
                    it("should use values from binding if provided", function() {
                        var field = test.link2;
                        expect(field.href).toBe("http://www.google.com");
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
