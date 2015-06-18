import Ember from 'ember';

export default Ember.Controller.extend({
  loginErrorMessage: null,
  hasError: Ember.computed('loginErrorMessage', function(){
    return !!this.get('loginErrorMessage');
  })
});
