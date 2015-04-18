import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	isSelected: false,
	observeSelected: Ember.observer('isSelected', function(){
	  var fact = this.get('fact'),
		    selected = this.get('isSelected');
		this.sendAction('addFactToCurriculum', fact, selected);
	}),
});
