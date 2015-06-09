import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'panel-default', 'card', 'fact-card'],
  classNameBindings: ['isEditing:editing'],
  isSelected: false,
  isEditing: false,
  isDeleting: false,
  justTheTags: Ember.computed('fact.tag_list', function(){
    return this.get('fact.tag_list').join(', ');
  }),
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
      if(!this.isEditing){
        this.sendAction('action', template, factObject);
      } else {
        return false;
      }
    },
    selectFact: function(){
      this.toggleProperty('isSelected');
    },
    toggleEdit: function(fact){
      let tagsChange = this.get('justTheTags') !== this.get('fact.tag_list').join(', ');
      if(fact.get('isDirty') || tagsChange){
        fact.set('tag_list', this.get('justTheTags'));
        fact.save();
      }
      this.toggleProperty('isEditing');
    },
    toggleDeleting: function(){
      this.toggleProperty('isDeleting');
    },
    confirmDelete: function(fact){
      fact.destroyRecord();
    },
    cancel: function (fact) {

      if(fact.get('isDirty')){
        fact.rollback();
      }
      this.toggleProperty('isEditing');
    }
  }
});
