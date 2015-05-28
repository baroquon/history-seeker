import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-custom', 'navbar-fixed-top'],
  mobileShow: false,
  isTeacher: Ember.computed('current_user.role', function(){
    let role = this.get('current_user.role');
    return role==='teacher';
  }),
  actions: {
    mobileToggle: function(){
      this.toggleProperty('mobileShow');
    }
  }
});
