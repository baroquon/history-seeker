import Ember from 'ember';

export default Ember.Controller.extend({
  markers: Ember.computed('model', function(){
    let fact = this.get('model');
    return [
      fact
    ]
  })
});
