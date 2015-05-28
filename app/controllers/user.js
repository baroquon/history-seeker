import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'current-user',
  dismissed: false,
  current_user: Ember.computed.alias('controllers.current-user.current_user'),
  isTeacher: Ember.computed('current_user.role', function(){
    let role = this.get('current_user.role');
    return role==='teacher';
  }),
  alertPresent: Ember.computed('isTeacher', 'dismissed', 'current_user.hasAssignment', function(){
    return !this.get('isTeacher') && this.get('current_user.hasAssignment') && !this.get('dismissed');
  }),
  actions: {
    dismissAlert: function(){
      this.toggleProperty('dismissed');
    }
  }
});
