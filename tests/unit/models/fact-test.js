import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('fact', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user',
    'model:curriculum',
    'model:assignment'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('a fact can have a user', function(assert) {
  var fact = this.store().modelFor('fact');
  var user = Ember.get(fact, 'relationshipsByName').get('user');

  assert.equal(user.key, 'user');
  assert.equal(user.kind, 'belongsTo');
});

