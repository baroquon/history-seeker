import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    let userID = this.get('session.content.secure.user_id');
    return this.store.find('user', userID);
  }
});
