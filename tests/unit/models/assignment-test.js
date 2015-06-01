import { moduleForModel, test } from 'ember-qunit';

moduleForModel('assignment', 'Unit | Model | assignment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:fact',
    'model:user',
    'model:exam',
    'model:exam-template',
    'model:exam-question',
    'model:curriculum'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
