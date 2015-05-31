import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  // Attributes
  first_name: DS.attr('string'),
  middle_name: DS.attr('string'),
  last_name: DS.attr('string'),
  notes: DS.attr('string'),
  date_of_birth: DS.attr('date'),
  role: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr(), // this isn't right
  password_confirmation: DS.attr(),
  createdAt: DS.attr('date', {
    defaultValue: function() { return new Date(); }
  }),

  // Relationships
  teacher: DS.belongsTo('user', {
    async: true,
    inverse: 'students',
  }),
  students: DS.hasMany('user', {
    inverse: 'teacher',
    async: true
  }),
  assignments: DS.hasMany('assignment', {
    async: true
  }),
  exams: DS.hasMany('exam', {async: true}),
  exam_templates: DS.hasMany('exam-template'),
  curriculums: DS.hasMany('curriculum', { async: true }),

  // Computed Properties
  fullName: Ember.computed('first_name', 'last_name', function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }),
  isTeacher: Ember.computed('role', function() {
    return this.get('role')==='teacher';
  }),
  hasAssignment: Ember.computed('assignments', 'assignments.@each.is_complete', function() {
    var assignmentActive = false;

    if(!!this.get('assignments')){
      let assignments = this.get('assignments').filterBy('is_complete', false);
      if(assignments.get('length')> 0){
        assignmentActive = true;
      } else {
        assignmentActive = false;
      }
    } else {
      assignmentActive = false;
    }
    return assignmentActive;
  }),
  assignmentsComplete: Ember.computed('assignments.@each.is_complete',function(){
    return this.get('assignments').filterBy('is_complete', true).get('length') || 0;
  }),
  assignmentsPending: Ember.computed('assignments.@each.is_complete', function(){
    return this.get('assignments').filterBy('is_complete', false).get('length') || 0;
  }),
  grade: Ember.computed('assignments', 'assignments.@each.is_complete', 'assignments.@each.grade', function() {
    if(!!this.get('assignments')){
      var count = 0,
          gradeSum = 0;
      let assignments = this.get('assignments').filterBy('is_complete', true);

      assignments.forEach(function(assignment){
        if(!!assignment.get('grade')){
          count++;
          gradeSum = Number(gradeSum + assignment.get('grade'));
        }
      })
    }
    if(count>0){
      return (gradeSum/count).toFixed(2);
    } else {
      return 'No Grades Yet'
    }
  }),

});
