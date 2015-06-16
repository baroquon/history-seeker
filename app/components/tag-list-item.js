import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'tag',
  classNameBindings: ['lowerTagName'],
  lowerTagName: Ember.computed('tag', function(){
    return this.get('tag').toLowerCase();
  })
});
