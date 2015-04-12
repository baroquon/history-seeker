import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('fact', {
  // Specify the other units that are required for this test.
  needs: [
    'model:exam-template',
    'model:exam-answer',
    'model:exam-response',
    'model:exam-question',
    'model:user'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('an event can have context', function(assert) {
  var fact = this.store().modelFor('fact');
  var relationship = Ember.get(fact, 'relationshipsByName').get('context');

  assert.equal(relationship.key, 'context');
  assert.equal(relationship.kind, 'belongsTo');
});

test('A Context fact can have many events', function(assert) {
  var fact = this.store().modelFor('fact');
  var relationship = Ember.get(fact, 'relationshipsByName').get('historical_events');

  assert.equal(relationship.key, 'historical_events');
  assert.equal(relationship.kind, 'hasMany');
});
