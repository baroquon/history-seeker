import DS from 'ember-data';

export default DS.Model.extend({
  active: DS.attr('boolean'),
  active: DS.attr('boolean'),
  subscription_type: DS.attr('string'),
  users: DS.hasMany('user', { async: true })
});

