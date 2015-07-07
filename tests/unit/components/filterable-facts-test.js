import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

var obj1 = Ember.Object.create({
  id: 1,
  title: 'foo1',
  description: 'Some other stuff.',
  tag_list: ['some', 'tags'],
  start_date: '1922-12-12',
  end_date: '1922-12-12',
  additional_info_link: 'http://www.baroquon.com',
  testable: false,
  lat: 1,
  lng: 1,
});
var obj2 = Ember.Object.create({
  id: 2,
  title: 'foo1',
  description: 'Some other stuff.',
  tag_list: ['some', 'tags'],
  start_date: '1922-12-12',
  end_date: '1922-12-12',
  additional_info_link: 'http://www.baroquon.com',
  testable: false,
  lat: 1,
  lng: 1,
});
var facts = [
  {obj2},
  {obj1},
];

moduleForComponent('filterable-facts', {
  needs: [
    'component:empty-notice',
    'component:add-fact-to-object',
    'component:bootstrap-datepicker',
    'component:liquid-if'
  ]
});

test('it renders with data', function(assert) {
  // Creates the component instance
  var component = this.subject();

  assert.equal(component._state, 'preRender');

  Ember.run(function() {
    component.set('facts', facts);
  });

  // The template renders appropriately
  assert.equal(this.$().find('.btn-group').length, 1);

  // The appropriate number of cards render
  assert.equal(this.$().find('.card-grid').length, 2);

  // It's in the DOM - this is a meaningless test :D
  assert.equal(component._state, 'inDOM');

  // failing test for new, simplified search/sort of facts
  assert.equal(component.facts[0].id, component.rangeFilteredContent[1].id);
});
