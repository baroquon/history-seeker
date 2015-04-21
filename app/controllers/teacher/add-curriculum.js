import Ember from 'ember';

export default Ember.Controller.extend({

  facts: Ember.computed(function(){
    return this.store.findAll('fact');
  }),
  actions: {
    saveNewCurriculum: function(){
      var title = this.get('newTitle'),
          teacher = this.get('model');

      var curriculum = this.store.createRecord('curriculum', {
        title: title,
        user_id: teacher
      });

      curriculum.save();
    }
  }
});
