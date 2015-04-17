import Ember from 'ember';

export default Ember.Component.extend({
	filter: '', 
	filteredContent: function(){ 
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
		
	}.property('facts', 'filter')
});
