import DS from 'ember-data';

export default DS.Model.extend({
  examTemplate: DS.belongsTo('exam-template'),
  examResponses: DS.hasMany('exam-response'),
  user: DS.belongsTo('user')
});
