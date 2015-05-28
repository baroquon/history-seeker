import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: 'list-group-item',
  isEditing: false,
  isAddingAssignment: false,
  actions: {
    updateStudent: function(){
      let student = this.get('student');
      if(student.get('isDirty')){
        student.save();
      }
      if(this.get('isAddingAssignment')){
        this.set('isAddingAssignment', false);
      }
      this.toggleProperty('isEditing');
    },
    giveAssignment: function(){
      let student = this.get('student');
      if(student.get('isDirty')){
        student.save();
      }
      if(this.get('isEditing')){
        this.set('isEditing', false);
      }
      this.toggleProperty('isAddingAssignment');
    }
  }
});
