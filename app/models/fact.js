import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  additional_info_link: DS.attr('string'),
  testable: DS.attr('boolean'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  start_date: DS.attr(),
  end_date: DS.attr(),
  tag_list: DS.attr(),

  // relationships
  user: DS.belongsTo('user', {
    async: true
  }),

  // computed
  hasLink: Ember.computed('additional_info_link', function(){
    return !!this.get('additional_info_link');
  }),
  // It doesn't handle dates with five digits in the year
  // field so in the year 10000 we'll be screwed.
  start_year: Ember.computed('start_date', function(){
    try{
      if(Number(this.get('start_date').substring(0, 4)) < 0){
        return Number(this.get('start_date').substring(0, 5));
      } else {
        return Number(this.get('start_date').substring(0, 4));
      }
    } catch(e) {
      console.log(e);
    }
  }),
  end_year: Ember.computed('end_date', function(){
    try{
      if(Number(this.get('end_date').substring(0, 4)) < 0){
        return Number(this.get('end_date').substring(0, 5));
      } else {
        return Number(this.get('end_date').substring(0, 4));
      }
    } catch(e) {
      console.log(e);
    }
  }),
  formattedDate: Ember.computed('start_date', function(){
    try{
      if(Number(this.get('start_date').substring(0, 4)) < 0){
        return Number(this.get('start_date').substring(1, 5)) + ' B.C.';
      } else if(Number(this.get('start_date').substring(0, 4)) < 1500){
        return Number(this.get('start_date').substring(0, 4)) + ' A.D.';
      } else {
        return this.get('start_date');
      }
    } catch(e) {
      console.log(e);
    }
  })
});
