/*global require,exports,describe,it,expect */
var Montage = require("montage").Montage;
var Image = require("ui/image.reel").Image;
var MockDOM = require("montage-test/mocks/dom");

describe("ui/image-spec", function() {
    var anImage;

    beforeEach(function() {
        anImage = Image.create();
        anImage.element = MockDOM.element();
    });

    it("should have the proper className", function() {
        expect(anImage.classList.contains("matte-Image")).toBeTruthy();
    });
});
