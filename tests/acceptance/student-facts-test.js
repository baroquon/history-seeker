import startApp from 'historicity/tests/helpers/start-app';
import Ember from 'ember';
import { module, test } from 'qunit';

var application;


module('Acceptance | student facts', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});


// This is not testing much right now
test('if there are no facts the big arrow shows up', function(assert) {
  assert.expect(1);
  authenticateSession();
  visit('/user/student-facts/1');

  andThen(function() {
    assert.equal(currentURL(), '/user/student-facts/1');
  });
});
