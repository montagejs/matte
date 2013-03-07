var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

var Converter = require("montage/core/converter/converter").Converter;

exports.JustifyConverter = Montage.create(Converter, {
    justify: {value: null},

    convert: {
        value: function(value) {
            return (value === this.justify);
        }
    },

    revert: {
        value: function(value) {
            return (value === true ? this.justify : "");
        }
    }
});

exports.SelectTest = Montage.create(TestController, {

    dept: {
        value: null
    },

    state: {
        value: null
    },

    country: {
        value: null
    },

    justifySelect: {
        value: null
    },

    departments: {
        value: [
            {name: 'Please select a Department', code: ''},
            {name: 'Human Resources', code: 'HRD'},
            {name: 'Software Engineering', code: 'SWE'},
            {name: 'Hardware Engineering', code: 'HWE'},
            {name: 'Finance', code: 'FIN'},
            {name: 'Information Technology', code: 'IT'}
        ]
    },

    states: {
        value: {
            'USA': [
                {name: 'Arizona', code: 'AZ'},
                {name: 'Colorado', code: 'CO'},
                {name: 'California', code: 'CA'},
                {name: 'New York', code: 'NY'},
                {name: 'Washington', code: 'WA'},
                {name: 'Oregon', code: 'OR'},
                {name: 'Georgia', code: 'GA'}
            ],
            'INR': [
                {name: 'Kerala', code: 'KL'},
                {name: 'Karnataka', code: 'KA'},
                {name: 'Tamil Nadu', code: 'TN'},
                {name: 'Andhra Pradesh', code: 'AP'},
                {name: 'Goa', code: 'GO'}
            ]
        }
    },


    _selectedCountry: {value: null},
    selectedCountry: {
        get: function() {return this._selectedCountry;},
        set: function(value) {
            if(value && this._selectedCountry !== value) {
                this._selectedCountry = value;
                // update states list
                var code = this._selectedCountry.value;
                this.statesController.content = this.states[code];
                // select the first option in the States dropdown
                this.statesController.selectedIndexes = [0];
            }
        }
    },

    _selectedState: {value: null},
    selectedState: {
        get: function() {return this._selectedState;},
        set: function(value) {
            if(this._selectedState !== value) {
                this._selectedState = value;
            }
        }
    },

    _selectedDept: {value: null},
    selectedDept: {
        get: function() {return this._selectedDept;},
        set: function(value) {
            if(this._selectedDept !== value) {
                this._selectedDept = value;
            }
        }
    },

    justify: {value: null},

    deptValues: {value: null},

    didCreate: {
        value: function() {
            TestController.didCreate.apply(this, arguments);
            this.justify = "center";
            this.deptValues = ['HRD', 'SWE'];
        }
    }
});
