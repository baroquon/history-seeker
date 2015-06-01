import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'current-user',
  current_user: Ember.computed.alias('controllers.current-user.current_user'),
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
          description = this.get('newDescription'),
          user = this.get('current_user');

      var curriculum = this.store.createRecord('curriculum', {
        title: title,
        description: description,
        user: user
      });

      this.get('factsToAdd').forEach(function(fact){
        curriculum.get('facts').addObject(fact);
      });

      curriculum.save();

      this.set('newTitle', '')
          .set('newDescription', '')
          .set('resetChecks', true)
          .set('factsToAdd', []);

      this.transitionTo('user.curriculums');
    }
  }
});
