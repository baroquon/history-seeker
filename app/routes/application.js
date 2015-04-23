import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showModal: function(template, factObject){
      return this.render(template, {
        into: 'application',
        outlet: 'modal',
        model: factObject
      });
    },
    closeModal: function(){
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
