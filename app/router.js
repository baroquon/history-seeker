import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("about");
  this.route("signup");
  this.route("login");
  this.route('teacher', { path: 'teacher/:user_id' }, function() {
    this.route('index', { path: '/' }, function(){
      this.route('index', { path: '/' });
      this.route('contexts');
      this.route('curriculums');
    });
    this.route('add-student');
    this.route('add-fact');
    this.route('add-curriculum');
  });
  this.route('student', { path: 'student/:user_id' }, function() {
    this.route('index', { path: '/' }, function(){
      this.route('index', { path: '/' });
    });
    this.route('curriculums', function() {
      this.route('show', { path: ':curriculum_id' });
    });
    this.route('facts');
  });
  this.resource('facts', function() {
    this.route('show', { path: ':fact_id' });
  });
});
