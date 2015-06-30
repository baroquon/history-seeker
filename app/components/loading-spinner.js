import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'loader',
  classNameBindings: 'fullPage:full-page',
  tagName: 'span',
  fullPage: false,
  size: 25,
  cx: Ember.computed.alias('size'),
  cy: Ember.computed.alias('size'),
  radius: 20,
  cssSize: Ember.computed('size', function(){
    return this.get('size') + "px";
  }),
  cssParentSize: Ember.computed('cx', function(){
    return (Number(this.get('size'))*2) + "px";
  })
});
