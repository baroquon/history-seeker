import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('student-item', 'Unit | Component | student item', {
  // Specify the other units that are required for this test
  needs: ['component:liquid-if', 'component:grade-assignment', 'component:bootstrap-datepicker']
});

var student = {
    first_name: 'Bob',
    middle_name: 'the',
    last_name: 'Builder',
    assignments: [{id: 1, is_complete: true}, {id: 2, is_complete: false}]
  };

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();

  Ember.run(function() {
    component.set('student', student);
  });

  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
