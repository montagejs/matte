var TestController = require("montage-testing/test-controller").TestController;

exports.SelectTest = TestController.specialize({

    dept: {
        value: null
    },

    state: {
        value: null
    },

    country: {
        value: null
    },

    departments: {
        value: [
            {label: 'Please select a Department', code: ''},
            {label: 'Human Resources', code: 'HRD'},
            {label: 'Software Engineering', code: 'SWE'},
            {label: 'Hardware Engineering', code: 'HWE'},
            {label: 'Finance', code: 'FIN'},
            {label: 'Information Technology', code: 'IT'}
        ]
    },

    states: {
        value: {
            'USA': [
                {label: 'Arizona', code: 'AZ'},
                {label: 'Colorado', code: 'CO'},
                {label: 'California', code: 'CA'},
                {label: 'New York', code: 'NY'},
                {label: 'Washington', code: 'WA'},
                {label: 'Oregon', code: 'OR'},
                {label: 'Georgia', code: 'GA'}
            ],
            'INR': [
                {label: 'Kerala', code: 'KL'},
                {label: 'Karnataka', code: 'KA'},
                {label: 'Tamil Nadu', code: 'TN'},
                {label: 'Andhra Pradesh', code: 'AP'},
                {label: 'Goa', code: 'GO'}
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
                var code = this._selectedCountry.code;
                this.statesController.content = this.states[code];
                // select the first option in the States dropdown
                this.statesController.selectedIndexes = [0]; //FIXME
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

    deptValues: {value: null},

    constructor: {
        value: function SelectTest() {
            this.super();
            this.deptValues = ['HRD', 'SWE'];
        }
    }
});
