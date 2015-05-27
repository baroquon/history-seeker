import Ember from 'ember';

export default Ember.Component.extend({
  isCreating: false,
  curriculum: undefined,
  actions: {
    createFact: function(){
      var self = this;
      var title = this.get('newTitle'),
          description = this.get('newDescription'),
          start_date = this.get('newStartDate'),
          end_date = this.get('newEndDate'),
          lng = this.get('newLng'),
          lat = this.get('newLat'),
          additional_info_link = this.get('newAdditionalInfoLink');

      var new_fact = this.store.createRecord('fact', {
        title: title,
        description: description,
        start_date: start_date,
        end_date: end_date,
        lng: lng,
        lat: lat,
        additional_info_link: additional_info_link
      });

      new_fact.save().then(function(resolvedFact){
        var curriculum = self.get('curriculum');

        if(curriculum){
          curriculum.get('facts').addObject(resolvedFact);
          curriculum.save();
        }
      });


      this.set('newTitle', '')
          .set('newDescription', '')
          .set('newStartDate', '')
          .set('newEndDate', '')
          .set('newLng', '')
          .set('newLat', '')
          .set('newAdditionalInfoLink', '');

      this.toggleProperty('isCreating');
    },
    toggleCreating: function(){
      this.toggleProperty('isCreating');
    }
  }
});
