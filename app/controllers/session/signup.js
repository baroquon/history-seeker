import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'simple-auth-authenticator:devise',
  isLoading: false,
  actions: {
    signup: function(){
      let self = this;
      let user = this.store.createRecord('user', {
        first_name: this.get('firstname'),
        last_name: this.get('lastname'),
        email: this.get('email')
      });
      user.save();
   }
 }
});
