import Ember from 'ember';

export default Ember.ArrayController.extend({
  facts: Ember.computed('model', function(){
    if(this.get('model.length') < 2){
      return Ember.A(this.get('model'));
    } else {
      return this.get('model');
    }
  })
});
