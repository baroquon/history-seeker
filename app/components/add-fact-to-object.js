import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  isSelected: false,

  // This function resets the checkboxes to unchecked if a new model is saved.
  resetOnSave: Ember.observer('resetChecks', function() {
    var reset = this.get('resetChecks');
    if(reset){
      this.set('isSelected', false);
    }
  }),

  observeSelected: Ember.observer('isSelected', function(){
    var fact = this.get('fact'),
        selected = this.get('isSelected');
    this.sendAction('addFactToCurriculum', fact, selected);
  }),

  actions: {
    showModal: function(template, factObject){
      this.sendAction('action', template, factObject);
    }
  }
});
