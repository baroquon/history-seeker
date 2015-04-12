import DS from 'ember-data';

export default DS.Model.extend({
  response: DS.belongsTo('exam-answer')
});
