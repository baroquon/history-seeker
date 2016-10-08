import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    // let userID = this.get('session.content.secure.user_id');
    //return { role: 'teacher', account: { active: true } };
    return this.store.find('user', userID);
  }
});
