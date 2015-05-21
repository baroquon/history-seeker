import Ember from 'ember';

export default Ember.Controller.extend({
  markers: Ember.computed('model', function(){
    let fact = this.get('model');
    return [
      fact
    ];
  }),
  unboundLat: Ember.computed('model.lat', function(){
    return this.get('model.lat');
  }),
  unboundLng: Ember.computed('model.lng', function(){
    return this.get('model.lng');
  }),
});
