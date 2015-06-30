import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'historicity/tests/helpers/start-app';

var application;

module('Acceptance | login', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('see if we can sign in successfully', function(assert){
  assert.expect(1);
  authenticateSession();
  visit('/user');

  andThen(function () {
    assert.equal(currentURL(), '/user' , "we are not redirected when we are already signed in");
  });
});

