import Ember from 'ember';

export default Ember.Route.extend({
  activate(){
    Ember.$('body').addClass('home-page');
  },
  deactivate(){
    Ember.$('body').removeClass('home-page');
  }
});
