import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  start_date: DS.attr('date'),
  end_date: DS.attr('date'),
  additional_info_link: DS.attr('string'),
  testable: DS.attr('boolean'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  tag_list: DS.attr(),

  // relationships
  user: DS.belongsTo('user', {
    async: true
  }),

  // computed
  hasLink: Ember.computed('additional_info_link', function(){
    return !!this.get('additional_info_link');
  })
});
