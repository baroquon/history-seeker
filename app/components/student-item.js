import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  actions: {
    updateStudent: function(){
      this.toggleProperty('isEditing');
    }
  }
});
