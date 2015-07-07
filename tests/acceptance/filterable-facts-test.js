import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'historicity/tests/helpers/start-app';

var application;

module('Acceptance | filterable facts', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /user/all-facts', function(assert) {
  authenticateSession();
  visit('/user/all-facts');

  andThen(function() {

    assert.equal(currentURL(), '/user/all-facts');
  });
});
