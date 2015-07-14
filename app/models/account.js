import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  users: DS.hasMany('user', { async: true })
});

