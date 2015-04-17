import Ember from 'ember';

export default Ember.Controller.extend({
	facts: function(){
		return this.store.findAll('fact');
	}.property('')
});
