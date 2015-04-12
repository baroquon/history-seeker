import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  start_date: DS.attr('date'),
  end_date: DS.attr('date'),
  testable: DS.attr('boolean'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),

  // relationships
  exam_questions: DS.hasMany('exam-question'),
  context: DS.belongsTo('fact', {
    inverse: 'historical_events'
  }),
  historical_events: DS.hasMany('fact', {
    inverse: 'context'
  }),
});
