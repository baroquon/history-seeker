import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'current-user',
  current_user: Ember.computed.alias('controllers.current-user.current_user'),
  isTeacher: Ember.computed('current_user.role', function(){
    let role = this.get('current_user.role');
    return role==='teacher';
  }),
  curriculums: Ember.computed('current_user.curriculums', 'isTeacher', 'current_user.teacher', 'current_user.teacher.curriculums', function(){
    if(this.isTeacher){
      return this.get('current_user.curriculums');
    } else if(!!this.get('current_user.teacher')) {
      return this.get('current_user.teacher.curriculums');
    } else {
      return;
    }
  })
});

