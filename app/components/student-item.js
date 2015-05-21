import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  actions: {
    updateStudent: function(){
      let student = this.get('student');
      if(student.get('isDirty')){
        student.save();
      }
      this.toggleProperty('isEditing');
    }
  }
});
