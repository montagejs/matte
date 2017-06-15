var Component = require("montage/ui/component").Component;

// Used for the Autocomplete example
var states = [
    {name: "Alabama", code: "AL" },
    {name: "Alaska", code: "AK"},
    {name: "Arizona", code: "AZ"},
    {name: "Arkansas", code: "AR"},
    {name: "California", code: "CA"},
    {name: "Colorado", code: "CO"},
    {name: "Connecticut", code: "CT"},
    {name: "Delaware", code: "DE"},
    {name: "District Of Columbia", code: "DC"},
    {name: "Florida", code: "FL"},
    {name: "Georgia", code: "GA"},
    {name: "Hawaii", code: "HI"},
    {name: "Idaho", code: "ID"},
    {name: "Illinois", code: "IL"},
    {name: "Indiana", code: "IN"},
    {name: "Iowa", code: "IA"},
    {name: "Kansas", code: "KS"},
    {name: "Kentucky", code: "KY"},
    {name: "Louisiana", code: "LA"},
    {name: "Maine", code: "ME"},
    {name: "Maryland", code: "MD"},
    {name: "Massachusetts", code: "MA"},
    {name: "Michigan", code: "MI"},
    {name: "Minnesota", code: "MN"},
    {name: "Mississippi", code: "MS"},
    {name: "Missouri", code: "MO"},
    {name: "Montana", code: "MT"},
    {name: "Nebraska", code: "NE"},
    {name: "Nevada ", code: "NV"},
    {name: "New Hampshire", code: "NH"},
    {name: "New Jersey", code: "NJ"},
    {name: "New Mexico", code: "NM"},
    {name: "New York", code: "NY"},
    {name: "North Carolina", code: "NC"},
    {name: "North Dakota", code: "ND"},
    {name: "Ohio", code: "OH"},
    {name: "Oklahoma ", code: "OK"},
    {name: "Oregon", code: "OR"},
    {name: "Pennsylvania", code: "PA"},
    {name: "Rhode Island", code: "RI"},
    {name: "South Carolina", code: "SC"},
    {name: "South Dakota", code: "SD"},
    {name: "Tennessee", code: "TN"},
    {name: "Texas", code: "TX"},
    {name: "Utah", code: "UT"},
    {name: "Vermont", code: "VT"},
    {name: "Virginia", code: "VA"},
    {name: "Washington", code: "WA"},
    {name: "West Virginia", code: "WV"},
    {name: "Wisconsin", code: "WI"},
    {name: "Wyoming", code: "WY"}
];


exports.Main = Component.specialize({
    // Autocomplete example
    json: {
      value: null
    },
    state: {
      value: null
    },
    selectedStates: {
      value: null
    },
    members: {
      value: null
    },
    info: {
      value: null
    },
    _cachedStates: {
      value: null
    },
    stateShouldGetSuggestions: {
       value: function(autocomplete, searchTerm) {
           var results = [];
           if(searchTerm) {
               var term = searchTerm.toLowerCase();
               if(this._cachedStates && this._cachedStates[term]) {
                   results = this._cachedStates;
               } else {
                   results = states.filter(function(item) {
                       // @todo - memoize
                       return (item.name.toLowerCase().indexOf(term) >= 0 || item.code.indexOf(term) >= 0);
                   });
                   this._cachedStates = results;
               }
           }
           autocomplete.suggestions = results.map(function(item) {
               return item.name;
           });
       }
    },

    handleAction: {
      value: function () {
       
        if (this.popup.displayed) {

        this.popup.hide();
        } else {

        this.popup.show();
        }
      }
    }
});

