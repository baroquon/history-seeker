import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('curriculum', {
  // Specify the other units that are required for this test.
  needs: [
    'model:fact',
    'model:exam-question',
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
