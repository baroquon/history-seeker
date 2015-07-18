import Ember from 'ember';

export default Ember.Controller.extend({
  formattedSubscriptionType: Ember.computed('model.account.subscription_type', function(){
    let subscription_type = this.get('model.account.subscription_type');
    switch (subscription_type) {
      case 'hs1':
        return 'Single Student';
        break;
      case 'hs2':
        return 'Two Student';
        break;
      case 'hs3':
        return 'Three Student';
        break;
      default:
        return 'Multi-Student';
        break;
    }
  })
});
