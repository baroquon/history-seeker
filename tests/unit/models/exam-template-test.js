import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('exam-template', {
  // Specify the other units that are required for this test.
  needs: [
    'model:exam-question',
    'model:exam-answer',
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
