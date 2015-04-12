import DS from 'ember-data';

export default DS.Model.extend({
  facts: DS.hasMany('fact'),
  title: DS.attr('string')
});
