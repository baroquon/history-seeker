import DS from 'ember-data';

export default DS.Model.extend({
  exam_questions: DS.hasMany('exam-question')
});
