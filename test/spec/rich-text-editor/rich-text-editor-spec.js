/*global require,exports,describe,it,expect */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("rich-text-editor-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("test/rich-text-editor/rich-text-editor-spec", function() {

        describe("RichTextEditor", function(){
            it("can be created", function() {
                expect(test.editor1).toBeDefined();
                expect(test.editor2).toBeDefined();
            });

            describe("Once loaded", function() {
                describe ("value and textValue testing", function() {
                    it("origal content has been injected", function() {
                        expect(test.editor1.value).toBe("Hello Montage");
                    });

                    it("value from serialization has been set", function() {
                        expect(test.editor2.value).toBe("Montage Rocks!");
                    });

                    it("can set a new value", function(done) {
                        var text = "Do you speak HTML?";
                        test.editor1.value = text;
                        testPage.waitForDraw().then(function () {
                            expect(test.editor1.value).toBe(text);
                            done(); 
                        });
                    });

                    it("can set a value as plain text and retrieve it as HTML", function(done) {
                        test.editor1.textValue = "This is not a an HTML <tag>";
                        testPage.waitForDraw().then(function(){
                            expect(test.editor1.value).toBe("This is not a an HTML &lt;tag&gt;");
                            done();
                        });
                    });

                    it("can set a value as HTML and retrieve it as plain text", function(done) {
                        var text = "Can you convert HTML to plain text?";
                        test.editor1.value = "<b>" + text + "</b>";
                        testPage.waitForDraw().then(function(){
                            expect(test.editor1.textValue).toBe(text);
                            done();
                        });
                    });
                });

                describe ("style properties testing", function() {
                    it("set to bold", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.bold = true;
                            expect(test.editor1.bold).toBeTruthy();
                            expect(test.getStyleOfSelectedElement(test.editor1).fontWeight).toMatch(/bold|700/);
                            done();
                        });
                    });
                    it("remove bold", function() {
                        test.editor1.selectAll();
                        test.editor1.bold = false;
                        expect(test.editor1.bold).toBeFalsy();
                        expect(test.getStyleOfSelectedElement(test.editor1).fontWeight).toMatch(/normal|400/);
                    });

                    it("set to italic", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.italic = true;
                            expect(test.editor1.italic).toBeTruthy();
                            expect(test.getStyleOfSelectedElement(test.editor1).fontStyle).toBe("italic");
                            done();
                        });
                    });
                    it("remove italic", function(done) {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.italic = false;
                            expect(test.editor1.bold).toBeFalsy();
                            expect(test.getStyleOfSelectedElement(test.editor1).fontStyle).toBe("normal");
                            done();
                        });
                    });

                    it("set to underline", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.underline = true;
                            expect(test.editor1.underline).toBeTruthy();
                            expect(test.getStyleOfSelectedElement(test.editor1).textDecoration).toBe("underline solid rgb(0, 0, 0)");
                            done();
                        });
                    });
                    it("remove underline", function(done) {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.underline = false;
                            expect(test.editor1.underline).toBeFalsy();
                            expect(test.getStyleOfSelectedElement(test.editor1).textDecoration).toBe("none solid rgb(0, 0, 0)");
                            done();
                        });
                    });

                    it("set to strikethrough", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.strikeThrough = true;
                            expect(test.editor1.strikeThrough).toBeTruthy();
                            expect(test.getStyleOfSelectedElement(test.editor1).textDecoration).toBe("line-through solid rgb(0, 0, 0)");
                            done();
                        });
                    });
                    it("remove strikethrough", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.strikeThrough = false;
                            expect(test.editor1.strikeThrough).toBeFalsy();
                            expect(test.getStyleOfSelectedElement(test.editor1).textDecoration).toBe("none solid rgb(0, 0, 0)");
                        });
                    });
                    it("set baselineShift to subscript", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.baselineShift = "subscript";
                            expect(test.editor1.baselineShift).toBe("subscript");
                            expect(test.getStyleOfSelectedElement(test.editor1).verticalAlign).toBe("sub");
                            done();
                        });
                    });
                    it("set baselineShift to superscript", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.baselineShift = "superscript";
                            expect(test.editor1.baselineShift).toBe("superscript");
                            expect(test.getStyleOfSelectedElement(test.editor1).verticalAlign).toBe("super");
                        });
                    });
                    it("set baselineShift to baseline", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.baselineShift = "baseline";
                            expect(test.editor1.baselineShift).toBe("baseline");
                            expect(test.getStyleOfSelectedElement(test.editor1).verticalAlign).toBe("baseline");
                        });
                    });

                    it("indent", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.indent();
                            expect(test.getStyleOfSelectedElement(test.editor1).marginLeft).toBe("40px");
                        });
                    });
                    it("outdent", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.outdent();
                            expect(test.getStyleOfSelectedElement(test.editor1).marginLeft).toMatch(/0|0px/);
                        });
                    });

                    it("set listStyle to unordered", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.listStyle = "unordered";
                            expect(test.editor1.listStyle).toBe("unordered");
                            var element = test.getSelectedElement(test.editor1);
                            // Safari add an extra span
                            if (element.nodeName == "SPAN") {
                                element = element.parentNode.parentNode;
                            } else {
                                element = element.parentNode;
                            }
                            expect(element.nodeName).toBe("UL");
                        });
                    });
                    it("set listStyle to ordered", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.listStyle = "ordered";
                            expect(test.editor1.listStyle).toBe("ordered");
                            var element = test.getSelectedElement(test.editor1);
                            // Safari add an extra span
                            if (element.nodeName == "SPAN") {
                                element = element.parentNode.parentNode;
                            } else {
                                element = element.parentNode;
                            }
                            expect(element.nodeName).toBe("OL");
                        });
                    });
                    it("set listStyle to none", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.listStyle = "none";
                            expect(test.editor1.listStyle).toBe("none");
                            var element = test.getSelectedElement(test.editor1);
                            // Safari add an extra span
                            if (element.nodeName == "SPAN") {
                                element = element.parentNode;
                            }
                            expect(element.nodeName).not.toBe("IL");
                        });
                    });

                    it("set justify to center", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.justify = "center";
                            expect(test.editor1.justify).toBe("center");
                            expect(test.getStyleOfSelectedElement(test.editor1).textAlign).toBe("center");
                            done();
                        });
                    });

                    it("set justify to right", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.justify = "right";
                            expect(test.editor1.justify).toBe("right");
                            expect(test.getStyleOfSelectedElement(test.editor1).textAlign).toBe("right");
                        });
                    });

                    it("set justify to full", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.justify = "full";
                            expect(test.editor1.justify).toBe("full");
                            expect(test.getStyleOfSelectedElement(test.editor1).textAlign).toBe("justify");
                        });
                    });

                    it("set justify to left", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.justify = "left";
                            expect(test.editor1.justify).toBe("left");
                            expect(test.getStyleOfSelectedElement(test.editor1).textAlign).toBe("left");
                        });
                    });

                    it("set font name to Arial Black", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.fontName = "Arial Black";
                            expect(test.editor1.fontName).toBe("Arial Black");
                            expect(test.getStyleOfSelectedElement(test.editor1).fontFamily).toBe('"Arial Black"');
                            done();
                        });
                    });

                    it("set font size to 7", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.fontSize = "7";
                            expect(test.editor1.fontSize).toBe("7");
                            expect(test.getStyleOfSelectedElement(test.editor1).fontSize).toBe("48px");
                            done();
                        });
                    });

                    it("set foreColor to red", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.foreColor = "red";
                            expect(test.editor1.foreColor).toBe("rgb(255, 0, 0)");
                            expect(test.getStyleOfSelectedElement(test.editor1).color).toBe("rgb(255, 0, 0)");
                            done();
                        });
                    });
                    it("set foreColor to rgb(0, 139, 0)", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.foreColor = "rgb(0, 139, 0)";
                            expect(test.editor1.foreColor).toBe("rgb(0, 139, 0)");
                            expect(test.getStyleOfSelectedElement(test.editor1).color).toBe("rgb(0, 139, 0)");
                        });
                    });
                    it("set foreColor to #888", function() {
                        setTimeout(function(){
                            test.editor1.selectAll();
                            test.editor1.foreColor = "#888";
                            expect(test.editor1.foreColor).toBe("rgb(136, 136, 136)");
                            expect(test.getStyleOfSelectedElement(test.editor1).color).toBe("rgb(136, 136, 136)");
                        });
                    });

                    it("set backColor to red", function(done) {
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.backColor = "red";
                            expect(test.editor1.backColor).toBe("rgb(255, 0, 0)");
                            expect(test.getStyleOfSelectedElement(test.editor1).backgroundColor).toBe("rgb(255, 0, 0)");
                            done();
                        });
                    });

                    it("set backColor to rgb(0, 139, 0)", function() {
                        test.editor1.selectAll();
                        test.editor1.backColor = "rgb(0, 139, 0)";
                        expect(test.editor1.backColor).toBe("rgb(0, 139, 0)");
                        expect(test.getStyleOfSelectedElement(test.editor1).backgroundColor).toBe("rgb(0, 139, 0)");
                    });
                    
                    it("set backColor to #888", function() {
                        test.editor1.selectAll();
                        test.editor1.backColor = "#888";
                        expect(test.editor1.backColor).toBe("rgb(136, 136, 136)");
                        expect(test.getStyleOfSelectedElement(test.editor1).backgroundColor).toBe("rgb(136, 136, 136)");
                    });

                });

                describe ("undo/redo testing", function() {
                    var text = "sample text";

                    it("reset the undoManager's stacks", function() {
                        test.resetUndoManager(test.editor1);
                        expect(test.editor1.undoManager.undoCount).toBe(0);
                        expect(test.editor1.undoManager.redoCount).toBe(0);
                    });

                    it("set content bold", function(done) {
                        test.editor1.value = text;
                        testPage.waitForDraw().then(function(){
                            test.editor1.selectAll();
                            test.editor1.bold = true;
                            expect(test.editor1.bold).toBeTruthy();
                            expect(test.editor1.value).not.toBe(text);
                            done();
                        });
                    });
                    it("undo bold", function(done) {
                        test.editor1.undo();
                        setTimeout(function(){
                            test.editor1.selectAll();
                            expect(test.editor1.bold).toBeFalsy();
                            expect(test.editor1.value).toBe(text);
                            done();
                        }, 150);
                    });
                    it("redo bold", function(done) {
                        test.editor1.redo();
                        setTimeout(function(){
                            test.editor1.selectAll();
                            expect(test.editor1.bold).toBeTruthy();
                            done();
                        }, 150);
                    });

                    it("test undo/redo stacks consistency", function(done) {
                        setTimeout(function(){
                            expect(test.editor1.undoManager.undoCount).toBe(1);
                            expect(test.editor1.undoManager.redoCount).toBe(0);
                            done();
                        });
                    });
                });

                describe ("focus testing", function() {
                    it("set focus on editor 1", function(done) {
                        test.editor1.focus();
                        setTimeout(function() {
                            expect(test.editor1.hasFocus).toBeTruthy();
                            expect(test.editor1.isActiveElement).toBeTruthy();
                            expect(test.editor2.hasFocus).toBeFalsy();
                            expect(test.editor2.isActiveElement).toBeFalsy();
                            done();
                        }, 150);
                    });
                    it("set focus on editor 2", function(done) {
                        test.editor2.focus();
                        setTimeout(function() {
                            expect(test.editor1.hasFocus).toBeFalsy();
                            expect(test.editor1.isActiveElement).toBeFalsy();
                            expect(test.editor2.hasFocus).toBeTruthy();
                            expect(test.editor2.isActiveElement).toBeTruthy();
                            done();
                        }, 150);
                    });
                    it("blur editor 2", function(done) {
                        var testwindow = window.open("about:blank","testWindow", "height=0, width=0");
                        if (testwindow) {
                            testwindow.moveTo(0, 0);
                            testwindow.focus();
                            setTimeout(function() {
                                expect(test.editor1.hasFocus).toBeFalsy();
                                expect(test.editor1.isActiveElement).toBeFalsy();
                                expect(test.editor2.hasFocus).toBeFalsy();
                                expect(test.editor2.isActiveElement).toBeTruthy();
                                testwindow.close();
                                done();
                            }, 150);   
                        } else {
                            fail('Failed to to create new focus via window.open');
                            done();
                        }
                    });
                });

                describe ("read only testing", function() {
                    it("set the editor read only", function(done) {
                        test.editor1.readOnly = true;
                        setTimeout(function() {
                            expect(test.editor1.readOnly).toBeTruthy();
                            done();
                        }, 150);
                    });
                    it("check if the innerElement is read only", function(done) {
                        setTimeout(function() {
                            expect(test.editor1.innerElement).toBeDefined();
                            expect(test.editor1.innerElement.getAttribute("contenteditable")).toBe("false");
                            done();
                        });
                    });
                    it("set the editor writable", function(done) {
                        test.editor1.readOnly = false;
                        setTimeout(function() {
                            expect(test.editor1.readOnly).toBeFalsy();
                            done();
                        }, 150);
                    });
                    it("check if the innerElement is editable", function(done) {
                        setTimeout(function() {
                            expect(test.editor1.innerElement).toBeDefined();
                            expect(test.editor1.innerElement.getAttribute("contenteditable")).toBe("true");
                            done();
                        });
                    });
                });

                describe ("editor events testing", function() {
                    var receiveEvent = false,
                        method = function(event) {receiveEvent = true;},
                        sampleText = "let's move the selection...";

                    it("install editorChange event", function(done) {
                        test.editor1.addEventListener("editorChange", method);
                        test.editor1.value = "sample text";
                        testPage.waitForDraw().then(function() {
                            done();
                        });
                    });
                    it("make sure we receive and editorChange event", function() {
                        setTimeout(function() {
                            expect(receiveEvent).toBeTruthy();
                            test.editor1.removeEventListener("editorChange", method);
                        }, 150);
                    });

                    it("install editorSelect event", function(done) {
                        receiveEvent = false;
                        test.editor1.value = "";
                        testPage.waitForDraw().then(function() {
                            test.editor1.focus();
                            test.editor1.addEventListener("editorSelect", method);
                            test.editor1.execCommand("inserthtml", false, sampleText);
                            done();
                        });
                    });
                    it("make sure the html fragment has been inserted to the correct editor and that we have receive an editorSelect event", function(done) {
                        setTimeout(function() {
                            expect(test.editor1.textValue).toBe(sampleText);
                            expect(receiveEvent).toBeTruthy();
                            test.editor1.removeEventListener("editorSelect", method);
                            done();
                        }, 150);
                    });
                });
                describe ("overlays testing", function() {
                    it("reset the editor and make sure we have the right overlays installed", function(done) {
                        test.editor1.focus();
                        test.editor1.value = '<img src="http://www.w3.org/html/logo/downloads/HTML5_Logo_64.png"><div><a href="http://www.w3.org/">www.W3.org</a></div><span>need some text to positioning the caret in a neutral element</span>';
                        testPage.waitForDraw().then(function() {
                            expect(test.editor1.overlays).toBeDefined();
                            expect(test.editor1.overlays.length).toBe(2);
                            // console.log(test.editor1.value);
                            // console.log(test.editor1.overlays[0]);
                            // console.log(test.editor1);
                            // console.log(test.editor1._overlays[0]);
                            // console.log(test.editor1._overlays[1]);
                        
                            // expect(test.editor1.overlays[0]._montage_metadata.objectName).toBe("RichTextResizer");
                            // expect(test.editor1.overlays[1]._montage_metadata.objectName).toBe("RichTextLinkPopup");
                            done();
                        });
                    });
                    it("click on an image, test the image overlay is active", function(done) {
                        // console.log(test.editor1.innerElement.getElementsByTagName("IMG")[0]);
                        var element = test.editor1.innerElement.getElementsByTagName("IMG")[0],
                            eventInfo = {
                               target: element,
                               clientX: element.offsetLeft + 5,
                               clientY: element.offsetTop + 5
                            };
                        testPage.clickOrTouch(eventInfo, function() {
                            expect(test.editor1.activeOverlay).toBe(test.editor1._overlays[0]);
                            done();
                        });
                    });
                    it("hide the resizer overlay", function(done) {
                        test.editor1.hideOverlay();
                        testPage.waitForDraw().then(function() {
                            expect(test.editor1.activeOverlay).toBeNull();
                            done();
                        });
                    });
                    xit("select an anchor, test the link popup overlay is active", function(done) {
                        
                        var element = test.editor1.innerElement.getElementsByTagName("A")[0],
                            range;
                            
                        range = document.createRange();
                        range.selectNodeContents(element);
                        range.collapse(true);

                        test.editor1._selectedRange = range;
                        testPage.waitForDraw().then(function() {
                            expect(test.editor1.activeOverlay).toBe(test.editor1.overlays[1]);
                            done();
                        });
                    });
                    it("hide the link popup overlay", function(done) {
                        test.editor1.hideOverlay();
                        testPage.waitForDraw().then(function() {
                            expect(test.editor1.activeOverlay).toBeNull();
                            done();
                        });
                    });
                });
            });
        });
    });
});
