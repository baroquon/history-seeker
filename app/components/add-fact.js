import Ember from 'ember';

export default Ember.Component.extend({
  isCreating: false,
  curriculum: undefined,
  addCreate: false,
  hideArrowClass: Ember.observer('isCreating', function(){
    if(this.get('isCreating')){
      $('body').addClass('isCreating');
    } else {
      $('body').removeClass('isCreating');
    }
  }),
  actions: {
    createFact: function(){
      var self = this;
      var title = this.get('newTitle'),
          description = this.get('newDescription'),
          start_date = this.get('newStartDate'),
          end_date = this.get('newEndDate'),
          lng = this.get('newLng'),
          lat = this.get('newLat'),
          tag_list = this.get('newTagList'),
          user = this.get('current_user'),
          additional_info_link = this.get('newAdditionalInfoLink');

      var new_fact = this.get('store').createRecord('fact', {
        title: title,
        description: description,
        start_date: start_date,
        end_date: end_date,
        lng: lng,
        lat: lat,
        tag_list: tag_list,
        user: user,
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
          .set('newTagList', '')
          .set('newAdditionalInfoLink', '');

      this.toggleProperty('isCreating');

      if(this.get('addCreate')){
        this.sendAction('addFactToCurriculum', new_fact, true);
      }

    },
    toggleCreating: function(){
      this.toggleProperty('isCreating');
    },
    setLngLat: function(lnglat){
      this.set('newLng', lnglat[0]);
      this.set('newLat', lnglat[1]);
    }
  }
});
