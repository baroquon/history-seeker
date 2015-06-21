import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'current-user',
  current_user: Ember.computed.alias('controllers.current-user.current_user'),
  curentUserOwnsCurriculum: Ember.computed('current_user', 'model.user.id', function(){
    console.log('current user id', + this.get('current_user.id'));
    return this.get('current_user.id') === this.get('model.user.id');
  }),
  facts: Ember.computed('model.facts', function(){
    if(this.get('model.facts.length') < 2){
      return Ember.A(this.get('model.facts'));
    } else {
      return this.get('model.facts');
    }
  })
});
