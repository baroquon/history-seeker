/* global ga */

import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");
  this.route('user', function() {
    this.route('index', { path: '/' });
    this.route('curriculums');
    this.route('add-fact');
    this.route('add-curriculum');

    this.route('curriculum', function() {
      this.route('show', { path: ':curriculum_id'});
      this.route('edit-curriculum', { path: 'edit/:curriculum_id'});
    });
    this.route('all-facts', function(){
      this.route('fact', { path: ':fact_id' });
    });
    this.route('add-assignment');
    this.route('my-facts');
    this.route('student-facts', { path: 'student-facts/:user_id'});
    this.route('lessons');
  });
  this.route('account', function() {
    this.route('profile', { path: '/' });
    this.route('subscription');
  });
  this.route('session', function() {
    this.route('new', { path: '/' });
  });
  this.route('how-it-works');
  this.route('contact');
  this.route('terms-and-conditions');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

export default Router;
