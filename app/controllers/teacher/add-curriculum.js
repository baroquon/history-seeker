import Ember from 'ember';

export default Ember.Controller.extend({
  factsToAdd: [],
  resetChecks: false,
  facts: Ember.computed(function(){
    return this.store.findAll('fact');
  }),
  returnChecksToDefault: function(){
    // If a new curriculum has already been saved we need to reset this value to false
    // so that when we save again we can once again clear the selected checkboxes..
    if(this.get('resetChecks')){
      this.set('resetChecks', false);
    }
  },
  actions: {
    addFactToCurriculum: function(fact, selected){
      this.returnChecksToDefault();
      if(selected){
        this.get('factsToAdd').pushObject(fact);
      } else {
        this.get('factsToAdd').removeObject(fact);
      }
    },
    saveNewCurriculum: function(){
      var title = this.get('newTitle'),
          teacher = this.get('model');

      var curriculum = this.store.createRecord('curriculum', {
        title: title,
        user: teacher
      });

      this.get('factsToAdd').forEach(function(fact){
        curriculum.get('facts').addObject(fact);
      });

      curriculum.save();

      this.set('newTitle', '')
          .set('resetChecks', true)
          .set('factsToAdd', []);
    },
  }
});
