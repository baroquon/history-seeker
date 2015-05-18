import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
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
