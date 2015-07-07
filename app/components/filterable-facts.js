import Ember from 'ember';

export default Ember.Component.extend({
  filter: '',
  isForm: true,
  viewType: 'card',
  maxToDate: new Date(),
  showFilters: false,
  myFacts: false,
  hasArrow: true,
  personalReference: "this student does",
  emptyNotice: Ember.computed('personalReference', function(){
    return 'It looks like ' + this.get('personalReference') + ' not have any personal facts yet.';
  }),
  factsNotice: undefined,
  isANotice: Ember.computed('factsNotice', function(){
    return !!this.get('factsNotice');
  }),
  cardType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'card';
  }),
  mapType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'map';
  }),
  timeType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'time';
  }),

  // perhaps this needs to be removed and all calls to this component should replace content with facts
  facts: Ember.computed.alias('content'),

  rangeTriggerFrom: Ember.observer('newFromDate', function(){
    let from = Number(this.get('newFromDate')),
        to   = Number(this.get('newToDate'));

    Ember.removeObserver(this, 'newToDate', this, 'rangeTriggerTo');

    if(from >= to){
      this.set('newToDate', (from + 1));
    }

    Ember.addObserver(this, 'newToDate', this, 'rangeTriggerTo');

  }),
  rangeTriggerTo: Ember.observer('newToDate', function(){
    let from = Number(this.get('newFromDate')),
        to   = Number(this.get('newToDate'));

    Ember.removeObserver(this, 'newFromDate', this, 'rangeTriggerFrom');

    if(to <= from){
      this.set('newFromDate', (to + 1));
    }

    Ember.addObserver(this, 'newFromDate', this, 'rangeTriggerFrom');
  }),
  // This is maybe a little too complex --- must refactor
  maxDate: 2100,
  minDate: -2900,
  newFromDate: -2900,
  newToDate: 2100,
  // This is maybe a little too complex --- must refactor

  sortedFacts: Ember.computed('facts', 'facts.@each.start_year', function(){
    return this.get('facts').sortBy('start_year');
  }),

  // This function handles the search filter
  filteredContent: Ember.computed('sortedFacts', 'filter', function() {
    var filter = this.get('filter'),
        rx = new RegExp(filter, 'gi'),
        facts = this.get('sortedFacts');

    if(!!filter){
      let filteredFacts = facts.filter(function(fact) {
        let tags = fact.get('tag_list').join(' ');
        return fact.get('title').match(rx) || fact.get('description').match(rx) || tags.match(rx);
      });
      if(filteredFacts.length===0){
        this.set('factsNotice', 'There are no matching facts.');
        return facts;
      } else {
        this.set('factsNotice', undefined);
        return filteredFacts;
      }
    } else {
      return facts;
    }
  }),

  // This function handles the date range filter
  rangeFilteredContent:  Ember.computed('filteredContent', 'newFromDate', 'newToDate', function() {
    var newFromDate = this.get('newFromDate'),
        newToDate = this.get('newToDate'),
        facts = this.get('filteredContent');

    if(!!newFromDate && !!newToDate){
      let filteredFacts = facts.filter(function(fact) {
        try{
          return fact.get('start_year') >= newFromDate && fact.get('end_year') <= newToDate;
        } catch(e){
          return fact;
        }
      });
      if(filteredFacts.length===0){
        this.set('factsNotice', 'There are no matching facts.');
        return facts;
      } else {
        this.set('factsNotice', undefined);
        return filteredFacts;
      }
    } else {
      this.set('factsNotice', undefined);
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
    // This switches between card view, map view, and timeline view.
    switchView: function(viewType){
      this.set('viewType', viewType);
    },
    //this toggles between showing and hiding the filters and date range options
    toggleFilters: function(){
      this.toggleProperty('showFilters');
    }
  },
  didInsertElement: function(){
    this.set('factsNotice', undefined);
  }
});
