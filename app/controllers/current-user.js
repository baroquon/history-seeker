import Ember from 'ember';

export default Ember.Controller.extend({
  current_user: function(){
    let userID = this.get('session.content.secure.user_id')
    if(!!userID){
      return this.store.find('user', userID);
    }
  }.property('session.content.secure.user_id')
});
