import Ember from 'ember';

export default Ember.Controller.extend({
	facts: Ember.computed(function(){
		return this.store.findAll('fact');
	})
});
