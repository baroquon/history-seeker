import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'panel-default', 'card'],
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
      if(this.get('isEditing')){
        this.set('isEditing', false);
      }
      if(this.get('assignmentDescription')){
        let store = this.get('store'),
            student = this.get('student'),
            description = this.get('assignmentDescription');

        let newAssignment = store.createRecord('assignment', {
          description: description,
          user: student
        });

        newAssignment.save();

        this.set('assignmentDescription', '');
      }

      this.toggleProperty('isAddingAssignment');
    }
  }
});
