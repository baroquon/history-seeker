import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('user', {
  // Specify the other units that are required for this test.
  needs: [
    'model:curriculum',
    'model:assignment',
    'model:account',
    'model:fact',
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('fullName should equal firstName and lastName', function(assert) {
  var user = this.subject({ first_name: 'Brandon', last_name: 'Blaylock' });

  assert.equal(user.get('fullName'), 'Brandon Blaylock');
});

test('A Teacher can have many students', function(assert) {
  var user = this.store().modelFor('user');
  var relationship = Ember.get(user, 'relationshipsByName').get('students');

  assert.equal(relationship.key, 'students');
  assert.equal(relationship.kind, 'hasMany');
});

test('A Student can have one teacher', function(assert) {
  var user = this.store().modelFor('user');
  var relationship = Ember.get(user, 'relationshipsByName').get('teacher');

  assert.equal(relationship.key, 'teacher');
  assert.equal(relationship.kind, 'belongsTo');
});

test('A User can have many curriculums', function(assert) {
  var user = this.store().modelFor('user');
  var relationship = Ember.get(user, 'relationshipsByName').get('curriculums');

  assert.equal(relationship.key, 'curriculums');
  assert.equal(relationship.kind, 'hasMany');
});
