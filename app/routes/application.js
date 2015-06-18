import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed: function(error) {
      this.controllerFor('application').set('loginErrorMessage', error.error);
      this.controllerFor('session.new').set('isLoading', false);
    },
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
