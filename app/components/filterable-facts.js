import Ember from 'ember';

export default Ember.Component.extend({
	filter: '',
	minFromDate:new Date().setFullYear(01),
	maxToDate: new Date(),
	fromDate: Ember.computed('newFromDate', function() {
    return new Date(this.get('newFromDate'));
  }),
	toDate: Ember.computed('newToDate', function() {
    return new Date(this.get('newToDate'));
  }),
	
	// This function handles the search filter
	filteredContent: Ember.computed('facts', 'filter', function() {
		var filter = this.get('filter'); 
		var rx = new RegExp(filter, 'gi'); 
		var facts = this.get('facts'); 
		
		if(!!filter){
			return facts.filter(function(fact) { 
				return fact.get('title').match(rx) || fact.get('description').match(rx); 
			}); 
		} else {
			return facts;
		}
		
	}),
	
	// This function handles the date range filter
	rangeFilteredContent:  Ember.computed('filteredContent', 'newFromDate', 'newToDate', function() {
		var fromDate = this.get('fromDate'),
		    toDate = this.get('toDate'),
        newFromDate = this.get('newFromDate'),
		    newToDate = this.get('newToDate'),
		    facts = this.get('filteredContent'); 
		
		if(!!newFromDate && !!newToDate){
			return facts.filter(function(fact) { 
				return fact.get('start_date') >= fromDate && fact.get('start_date') <= toDate; 
			}); 
		} else {
			return facts;
		}
	})
});
