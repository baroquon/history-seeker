import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    let allFacts = this.store.query('fact', {queryParams: {user_id: 'none'}}),
        myFacts  = this.modelFor('user').get('facts');
    return Ember.RSVP.hash({
      myFacts: myFacts,
      allFacts: allFacts
    });
  }
});
