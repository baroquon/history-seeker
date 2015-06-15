import Ember from 'ember';

export default Ember.Component.extend({
  filter: '',
  isForm: true,
  viewType: 'card',
  maxToDate: new Date(),
  showFilters: false,
  myFacts: false,
  cardType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'card';
  }),
  mapType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'map';
  }),
  timeType: Ember.computed('viewType', function(){
    return this.get('viewType') === 'time';
  }),

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
    var newFromDate = this.get('newFromDate'),
        newToDate = this.get('newToDate'),
        facts = this.get('filteredContent');

    if(!!newFromDate && !!newToDate){
      let filteredFacts = facts.filter(function(fact) {
        return fact.get('start_year') >= newFromDate && fact.get('end_year') <= newToDate;
      });
      if(filteredFacts.length===0){
        return [{title: 'Nothing Matches Here.', description: 'There are no facts that match this date query.', lat: '33.5250', lng: '-86.8130'}];
      } else {
        return filteredFacts;
      }
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
    // This switches between card view, map view, and timeline view.
    switchView: function(viewType){
      this.set('viewType', viewType);

      this._super();
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },

    //this toggles between showing and hiding the filters and date range options
    toggleFilters: function(){
      this.toggleProperty('showFilters');
    }
  },
  afterRenderEvent: function(){
    let factsCont = Ember.$('.facts-list-container'),
        docHeight = Ember.$(window).height(),
        offsetTop = Ember.$('.facts-list-container').offset().top + 50;

    factsCont.height(docHeight - offsetTop);
  }
});
