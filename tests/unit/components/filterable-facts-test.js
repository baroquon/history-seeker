import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

var facts = [
  {
    id: 1,
    title: 'foo1',
    description: 'Some other stuff.',
    tag_list: ['some', 'tags'],
    start_date: '0322-12-12 BC',
    end_date: '0322-12-12 BC',
    start_year: '-322',
    end_year: '-322',
    additional_info_link: 'http://www.baroquon.com',
    testable: false,
    lat: 1,
    lng: 1,
  },
  {
    id: 2,
    title: 'foo1',
    description: 'Some other stuff.',
    tag_list: ['some', 'tags'],
    start_date: '0012-12-12 BC',
    end_date: '0012-12-12 BC',
    start_year: '-12',
    end_year: '-12',
    additional_info_link: 'http://www.baroquon.com',
    testable: false,
    lat: 1,
    lng: 1,
  },
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

    // This tests that the filteredContent filters the facts properly
    assert.equal(component.get('facts')[0], component.get('rangeFilteredContent')[1]);
  });

  // The template renders appropriately
  assert.equal(this.$().find('.btn-group').length, 1);

  // The appropriate number of cards render
  assert.equal(this.$().find('.card-grid').length, 2);

  // It's in the DOM - this is a meaningless test :D
  assert.equal(component._state, 'inDOM');

});
