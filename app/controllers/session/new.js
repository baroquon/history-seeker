import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'simple-auth-authenticator:devise',
  isLoading: false,
  actions: {
    toggleLoading: function(){
      this.controllerFor('application').set('loginErrorMessage', '');
      this.toggleProperty('isLoading');
      this.send('authenticate');
    }
  }
});
