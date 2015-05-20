import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'navbar-custom'],
  classNameBindings: ['navClass'],
  navClass: Ember.computed('session', function(){
    if(this.get('session').isAuthenticated){
      return '';
    } else{
      return 'navbar-fixed-top';
    }
  }),
  isTeacher: Ember.computed('current_user.role', function(){
    let role = this.get('current_user.role');
    return role==='teacher';
  }),
  containerClass: Ember.computed('session', function(){
    if(this.get('session').isAuthenticated){
      return 'container-fluid';
    } else{
      return 'container';
    }
  })
});
