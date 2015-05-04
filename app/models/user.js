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
  createdAt: DS.attr('date', {
    defaultValue: function() { return new Date(); }
  }),

  // Relationships
  teacher: DS.belongsTo('user', {
    inverse: 'students',
  }),
  students: DS.hasMany('user', {
    inverse: 'teacher',
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

});
