import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  activate(){
    Ember.$('body').addClass('home-page');
  },
  deactivate(){
    Ember.$('body').removeClass('home-page');
  }
});
