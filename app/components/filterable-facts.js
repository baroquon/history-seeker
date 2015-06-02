import Ember from 'ember';
/* global moment */

export default Ember.Component.extend({
  filter: '',
  isForm: true,
  viewType: 'list',
  maxToDate: new Date(),
  showFilters: false,
  myFacts: false,
  listType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'list';
  }),
  mapType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'map';
  }),
  timeType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'time';
  }),

  minDate: Ember.computed('sorted.arrangedContent.@each.start_date', function(){
    return moment(this.get('sorted.arrangedContent.firstObject.start_date')).subtract(1, 'years').format('YYYY');
  }),
  maxDate: Ember.computed('sorted.arrangedContent.@each.end_date', function(){
    return moment(this.get('sorted.arrangedContent.lastObject.end_date')).add(1, 'years').format('YYYY');
  }),
  newFromDate: Ember.computed('sorted.arrangedContent.@each.start_date', function(){
    return moment(this.get('sorted.arrangedContent.firstObject.start_date')).subtract(1, 'years').format('YYYY');
  }),
  newToDate: Ember.computed('', function(){
    return moment(this.get('sorted.arrangedContent.lastObject.end_date')).add(1, 'years').format('YYYY');
  }),
  fromDate: Ember.computed('newFromDate', function() {
    return new Date(this.get('newFromDate'));
  }),
  toDate: Ember.computed('newToDate', function() {
    return new Date(this.get('newToDate'));
  }),

  sorted: Ember.computed('content', function(){
    return Ember.ArrayController.create({
      content: this.get('content'),
      sortProperties: ["start_date"]
    });
  }),

  // This function handles the search filter
  filteredContent: Ember.computed('sorted.arrangedContent', 'filter', function() {
    var filter = this.get('filter'),
        rx = new RegExp(filter, 'gi'),
        facts = this.get('sorted.arrangedContent');

    if(!!filter){
      return facts.filter(function(fact) {
        let tags = fact.get('tag_list').join(' ');
        return fact.get('title').match(rx) || fact.get('description').match(rx) || tags.match(rx);
      });
    } else {
      return facts;
    }

  }),

  // This function handles the date range filter
  rangeFilteredContent:  Ember.computed('filteredContent', 'newFromDate', 'newToDate', function() {
    var fromDate = this.get('fromDate'),
        toDate = this.get('toDate'),
        newFromDate = this.get('newFromDate'),
        newToDate = this.get('newToDate'),
        facts = this.get('filteredContent');

    if(!!newFromDate && !!newToDate){
      return facts.filter(function(fact) {
        return fact.get('start_date') >= fromDate && fact.get('start_date') <= toDate;
      });
    } else {
      return facts;
    }
  }),

  actions: {
    // This action is triggered when one the facts is selected or unselected
    // the action is then sent up the chain to the controller with the fact object
    // and its selected state (checked = true, unchecked = false)
    addFactToCurriculum: function(fact, selected){
      this.sendAction('addFactToCurriculum', fact, selected);
    },
    // This action triggers the modal show on the application route and feeds it
    // the selected fact object as its model and the facts.show as its template
    showModal: function(template, factObject){
      this.sendAction('action', template, factObject);
    },
    // This switches between list view, map view, and timeline view.
    switchView: function(viewType){
      this.set('viewType', viewType);
    },

    //this toggles between showing and hiding the filters and date range options
    toggleFilters: function(){
      this.toggleProperty('showFilters');
    }
  },
});
