import Ember from 'ember';

export default Ember.Controller.extend({
  factsToAdd: [],
  facts: Ember.computed(function(){
    return this.store.findAll('fact');
  }),
  actions: {
    addFactToCurriculum: function(fact, selected){
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
    }
  }
});
