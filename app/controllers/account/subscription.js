import Ember from 'ember';

export default Ember.Controller.extend({
  formattedSubscriptionType: Ember.computed('model.account.subscription_type', function(){
    let subscription_type = this.get('model.account.subscription_type');
    switch (subscription_type) {
      case 'hs1':
        return 'Single Student';
      case 'hs2':
        return 'Two Student';
      case 'hs3':
        return 'Three Student';
      default:
        return 'Multi-Student';
    }
  }),
  actions: {
    deactivateAccount: function(){
      Ember.$.ajax({
        //url: 'http://localhost:3000/charges',
        url: 'https://history-seeker-api.herokuapp.com/charges',
        type: 'DELETE',
        success: function(result) {
          console.log(result);
        }
      });
    }
  }
});
