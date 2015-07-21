import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: 'gravatar-image',
  attributeBindings: ['gravatarUrl:src'],

  size: 200,
  email: '',

  gravatarUrl: Ember.computed('email', 'size', function() {
    var email = this.get('email'),
        size = this.get('size');

    return 'http://www.gravatar.com/avatar/' + md5( email ) + '?s=' + size;
  })
});
