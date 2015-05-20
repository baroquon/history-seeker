import Ember from 'ember';

export default Ember.Controller.extend({
  current_user: Ember.computed( 'session.content.secure.user_id', function(){
    let userID = this.get('session.content.secure.user_id');
    if(!!userID){
      return this.store.find('user', userID);
    }
  })
});
