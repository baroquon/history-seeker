import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('exam', {
  // Specify the other units that are required for this test.
  needs: [
    'model:exam-template',
    'model:exam-answer',
    'model:exam-response',
    'model:exam-question',
    'model:curriculum',
    'model:assignment',
    'model:user'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
