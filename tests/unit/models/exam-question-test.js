import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('exam-question', {
  // Specify the other units that are required for this test.
  needs: ['model:exam-answer']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
