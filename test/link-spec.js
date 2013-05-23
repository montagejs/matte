/*global require,exports,describe,it,expect */
var Montage = require("montage").Montage;
var Link = require("ui/link.reel").Link;
var MockDOM = require("montage-test/mocks/dom");

describe("ui/link-spec", function() {
    var aLink;

    beforeEach(function() {
        aLink = Link.create();
        aLink.element = MockDOM.element();
    });

    it("should have the proper className", function() {
        expect(aLink.classList.contains("matte-Link")).toBeTruthy();
    });

    describe("draw", function() {
        it("should change the href", function() {
            aLink.src = "http://montagejs.org/";

            aLink.draw();

            expect(aLink.element.href).toBe("http://montagejs.org/");
        });

        it("should change the textContent", function() {
            aLink.label = "MontageJS";

            aLink.draw();

            expect(aLink.element.textContent).toBe("MontageJS");
        });
    });
});
