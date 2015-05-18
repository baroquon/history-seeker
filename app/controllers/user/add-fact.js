import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createFact: function(){
      var title = this.get('newTitle'),
          description = this.get('newDescription'),
          start_date = this.get('newStartDate'),
          end_date = this.get('newEndDate'),
          lng = this.get('newLng'),
          lat = this.get('newLat');

      var new_fact = this.store.createRecord('fact', {
        title: title,
        description: description,
        start_date: start_date,
        end_date: end_date,
        lng: lng,
        lat: lat
      });

      new_fact.save();

      this.set('newTitle', '')
          .set('newDescription', '')
          .set('newStartDate', '')
          .set('newEndDate', '')
          .set('newLng', '')
          .set('newLat', '');
    }
  }
});
