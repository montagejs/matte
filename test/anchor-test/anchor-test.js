var Montage = require("montage").Montage,
    Anchor = require("montage/ui/anchor.reel").Anchor;

var AnchorTest = exports.AnchorTest = Montage.create(Montage, {

    link1: {
        value: null
    },

    link2: {
        value: null
    },

    link3: {
        value: null
    }
});
