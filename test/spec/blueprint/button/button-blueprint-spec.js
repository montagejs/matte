/* <copyright>
 </copyright> */
var Montage = require("montage").Montage;
var TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;
var Blueprint = require("montage/core/meta/blueprint").Blueprint;
var MontageSerializer = require("montage/core/serialization/serializer/montage-serializer").MontageSerializer;

TestPageLoader.queueTest("button-blueprint-test", function (testPage) {
    describe("meta/button-blueprint-spec", function () {
        var button;

        beforeEach(function () {
            button = testPage.test.button;
        });

        it("can create load button blueprint", function () {

            var blueprintPromise = button.blueprint;
            return blueprintPromise.then(function (blueprint) {
                expect(blueprint).not.toBeNull();
            });
        });

        it("can read inherited property blueprint", function () {

            var blueprintPromise = button.blueprint;
            return blueprintPromise.then(function (blueprint) {
                expect(blueprint).not.toBeNull();
                expect(blueprint.propertyDescriptorForName("identifier")).not.toBeNull();

            });
        });

        it("can create button blueprint", function () {
            var serializer = new MontageSerializer().initWithRequire(require);

            var newBlueprint = new Blueprint().initWithName(button.identifier);
            expect(newBlueprint).toBeTruthy();
            //
            var autofocus = newBlueprint.addToOnePropertyDescriptorNamed("autofocus");
            autofocus.valueType = "string";
            autofocus.helpString = "Specifies that a button should automatically get focus when the page loads";

            var enabled = newBlueprint.addToOnePropertyDescriptorNamed("enabled");
            enabled.valueType = "boolean";
            enabled.helpString = "Specifies that a button should be enabled";

            var formaction = newBlueprint.addToOnePropertyDescriptorNamed("formaction");
            formaction.valueType = "url";
            formaction.helpString = "Specifies where to send the form-data when a form is submitted. Only for type='submit'";

            var formmethod = newBlueprint.addToOnePropertyDescriptorNamed("formmethod");
            formmethod.valueType = "enum";
            formmethod.enumValues = ["get", "post"];
            formmethod.helpString = "Specifies how to send the form-data (which HTTP method to use). Only for type='submit'";

            //
            newBlueprint.addPropertyDescriptorToGroupNamed(newBlueprint.propertyDescriptorForName("enabled"), "base");
            newBlueprint.addPropertyDescriptorToGroupNamed(newBlueprint.propertyDescriptorForName("autofocus"), "base");
            newBlueprint.addPropertyDescriptorToGroupNamed(newBlueprint.propertyDescriptorForName("formaction"), "form");
            newBlueprint.addPropertyDescriptorToGroupNamed(newBlueprint.propertyDescriptorForName("formmethod"), "form");
            button.blueprint = newBlueprint;

            var blueprintPromise = button.blueprint;
            return blueprintPromise.then(function (blueprint) {
                expect(blueprint).toBeTruthy();
                var serializedDescription = serializer.serializeObject(blueprint);
                expect(serializedDescription).toBeTruthy();
                //console.log(serializedDescription);
            });
        });

    });
});
