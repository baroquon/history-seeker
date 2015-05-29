import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  user: DS.belongsTo('user'),
  facts: DS.hasMany('fact', { async: true })
});
