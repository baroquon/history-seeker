import DS from 'ember-data';

export default DS.Model.extend({
  active: DS.attr('boolean'),
  users: DS.hasMany('user', { async: true })
});

