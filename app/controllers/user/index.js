import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'current-user',
  current_user: Ember.computed.alias('controllers.current-user.current_user'),
  isCreating: false,
  isTeacher: Ember.computed('current_user.role', function(){
    let role = this.get('current_user.role');
    return role==='teacher';
  }),
  actions: {
    toggleCreating: function(){
      this.toggleProperty('isCreating');
    }
  }
});
