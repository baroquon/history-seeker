import Ember from 'ember';

export default Ember.Component.extend(Ember.SortableMixin, {
  filter: '',
  isForm: true,
  viewType: 'list',
  listType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'list';
  }),
  mapType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'map';
  }),
  timeType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'time';
  }),
  minFromDate:new Date().setFullYear(01),
  maxToDate: new Date(),
  fromDate: Ember.computed('newFromDate', function() {
    return new Date(this.get('newFromDate'));
  }),
  toDate: Ember.computed('newToDate', function() {
    return new Date(this.get('newToDate'));
  }),

  // This function handles the search filter
  filteredContent: Ember.computed('arrangedContent', 'filter', function() {
    var filter = this.get('filter'),
        rx = new RegExp(filter, 'gi'),
        facts = this.get('arrangedContent');

    if(!!filter){
      return facts.filter(function(fact) {
        return fact.get('title').match(rx) || fact.get('description').match(rx);
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
  pageName: 'locations',
  zoom: 12,
  centerLat: 33.5206608,
  centerLng: -86.80249,
  locations: Ember.computed.alias('rangeFilteredContent'),
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
    switchView: function(viewType){
      this.set('viewType', viewType);
    }
  }
});
