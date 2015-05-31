import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  is_complete: DS.attr('boolean'),
  user: DS.belongsTo('user', {
    async: true
  }),
});
