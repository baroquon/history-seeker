import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'panel-default', 'card'],
  classNameBindings: ['showFullDetails:full-details:less-details'],
  isEditing: false,
  showFullDetails: false,
  showGrades: false,
  showPending: false,
  showComplete: false,
  isAddingAssignment: false,
  pendingAssignments: Ember.computed('student.assignments.@each.is_complete', function(){
    return this.get('student.assignments').filterBy('is_complete', false);
  }),
  completeAssignments: Ember.computed('student.assignments.@each.is_complete', function(){
    return this.get('student.assignments').filterBy('is_complete', true);
  }),
  actions: {
    toggleFullDetails: function(){
      this.toggleProperty('showFullDetails');
    },

    //This toggles the edit student action
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


    //This toggles the add assignment action
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
    },
    toggleComplete: function(){
      if(this.get('showPending')){
        this.set('showPending', false);
      }
      if(this.get('showGrades')){
        this.set('showGrades', false);
      }
      this.toggleProperty('showComplete');
    },
    togglePending: function(){
      if(this.get('showComplete')){
        this.set('showComplete', false);
      }
      if(this.get('showGrades')){
        this.set('showGrades', false);
      }
      this.toggleProperty('showPending');
    },
    toggleGrades: function(){
      if(this.get('showComplete')){
        this.set('showComplete', false);
      }
      if(this.get('showPending')){
        this.set('showPending', false);
      }
      this.toggleProperty('showGrades');
    }
  }
});
