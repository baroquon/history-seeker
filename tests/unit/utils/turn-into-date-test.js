import turnIntoDate from '../../../utils/turn-into-date';
import { module, test } from 'qunit';

module('Unit | Utility | turn into date');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = turnIntoDate('10/12/1212', 'BC');
  assert.deepEqual(result, '1212-10-12 BC');
});
