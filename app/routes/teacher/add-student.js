import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', this.modelFor('teacher'));
    this._super(controller, model);
  }
});
