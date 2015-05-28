import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("about");
  this.route('user', function() {
    this.route('index', { path: '/' });
    this.route('curriculums');
    this.route('add-fact');
    this.route('add-curriculum');

    this.route('curriculum', function() {
      this.route('show', { path: ':curriculum_id'});
    });
    this.route('all-facts');
    this.route('add-assignment');
  });
  this.route('session', function() {
    this.route('new', { path: '/' });
    this.route('signup');
  });
  this.route('how-it-works');
  this.route('contact');
});
