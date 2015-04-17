import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  user_id: DS.belongsTo('user'),
  facts: DS.hasMany('fact')
});
