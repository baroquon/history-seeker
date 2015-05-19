import Ember from 'ember';

export default Ember.Route.extend({
  needs: 'current-user',
  current_user: Ember.computed.alias('controllers.current-user.current_user'),
});
