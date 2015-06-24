import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('tag-list-item', 'Unit | Component | tag list item', {
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);
  // Creates the component instance
  var component = this.subject({tag: 'test'});
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
