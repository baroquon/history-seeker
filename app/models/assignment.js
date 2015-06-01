import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  is_complete: DS.attr('boolean'),
  grade: DS.attr('number'),
  user: DS.belongsTo('user', {
    async: true
  }),
});
