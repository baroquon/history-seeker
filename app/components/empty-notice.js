import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',
  classNames: 'empty-text',
  hasArrow: true,
  emptyNotice: 'It looks like you do not have any items yet. Why not try adding some?'
});
