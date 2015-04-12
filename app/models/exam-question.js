import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.attr('string'),
  exam_answers: DS.hasMany('exam-answer'),
  correct_response: DS.belongsTo('exam-answer'),
  question_type: DS.attr('string')
});
