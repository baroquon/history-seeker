import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  isEditingGrade: false,
  hasGrade: Ember.computed('assignment.grade', function(){
    return !!this.get('assignment.grade');
  }),
  actions: {
    saveGrade: function(){
      let assignment = this.get('assignment'),
          newGrade = this.get('newGrade');

      assignment.set('grade', newGrade);
      assignment.save();
    },
    updateGrade: function(){
      let assignment = this.get('assignment');
      if(assignment.get('isDirty')){
        assignment.save();
      }
      this.toggleProperty('isEditingGrade');
    }
  }
});
