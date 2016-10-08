import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    let userID = 1; //this.get('session.content.secure.user_id');
    return this.store.find('user', userID);
  }
});
