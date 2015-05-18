import Ember from 'ember';

export default Ember.Controller.extend({
  teacher: function(){
    console.log(this.get('session'));
    return this.store.find('user', 1);
  }.property('session')
});
