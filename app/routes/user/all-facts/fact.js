import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('fact', params.fact_id);
  },
  renderTemplate: function() {
    this.render({ outlet: 'modal', into: 'application' });
  },
  actions: {
    willTransition(){
      this.disconnectOutlet({
        outlet: "modal",
        parentView: "application"
      });
    }
  }
});
