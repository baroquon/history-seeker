import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('user', {
  // Specify the other units that are required for this test.
  needs: [
    'model:exam',
    'model:exam-template',
    'model:curriculum',
    'model:exam-answer',
    'model:exam-response',
    'model:exam-question',
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

test('A User can have many exams', function(assert) {
  var user = this.store().modelFor('user');
  var relationship = Ember.get(user, 'relationshipsByName').get('exams');

  assert.equal(relationship.key, 'exams');
  assert.equal(relationship.kind, 'hasMany');
});

test('A User can have many exam templates', function(assert) {
  var user = this.store().modelFor('user');
  var relationship = Ember.get(user, 'relationshipsByName').get('exam_templates');

  assert.equal(relationship.key, 'exam_templates');
  assert.equal(relationship.kind, 'hasMany');
});

test('A User can have many curriculums', function(assert) {
  var user = this.store().modelFor('user');
  var relationship = Ember.get(user, 'relationshipsByName').get('curriculums');

  assert.equal(relationship.key, 'curriculums');
  assert.equal(relationship.kind, 'hasMany');
});
