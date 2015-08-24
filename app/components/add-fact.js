import Ember from 'ember';
import turnIntoDate from './../utils/turn-into-date';

export default Ember.Component.extend({
  isCreating: false,
  curriculum: undefined,
  addCreate: false,
  dateStartError: false,
  dateEndError: false,
  startSuffix: 'AD',
  endSuffix: 'AD',
  dateSuffix: [
    'BC',
    'AD'
  ],
  formattedStartDate: '',
  formattedEndDate: '',
  startDateFormatter: Ember.observer('newStartDate', function(){
    let dateLength = this.get('newStartDate').length;
    this.checkForNumbers(this.newStartDate, 'start');

    if( dateLength === 2 || dateLength === 5){
      this.set('newStartDate', this.newStartDate + '/');
    }
  }),
  endDateFormatter: Ember.observer('newEndDate', function(){
    let dateLength = this.get('newEndDate').length;
    this.checkForNumbers(this.newEndDate, 'end');

    if( dateLength === 2 || dateLength === 5){
      this.set('newEndDate', this.newEndDate + '/');
    }
  }),
  hideArrowClass: Ember.observer('isCreating', function(){
    if(this.get('isCreating')){
      Ember.$('body').addClass('isCreating');
    } else {
      Ember.$('body').removeClass('isCreating');
    }
  }),
  actions: {
    createFact: function(){
      let self = this;

      let preStartDate = this.get('newStartDate');
      let preStartSuffix = this.get('startSuffix');
      let preEndDate = this.get('newEndDate');
      let preEndSuffix = this.get('endSuffix');

      let title = this.get('newTitle'),
          description = this.get('newDescription'),
          start_date = turnIntoDate(preStartDate, preStartSuffix),
          end_date = turnIntoDate(preEndDate, preEndSuffix),
          lng = this.get('newLng'),
          lat = this.get('newLat'),
          tag_list = this.get('newTagList'),
          user = this.get('current_user'),
          additional_info_link = this.get('newAdditionalInfoLink');

      let new_fact = this.get('store').createRecord('fact', {
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
  },
  checkForNumbers: function(date, range){
    // Here we are removing the slashes so that we can check
    // to see that only numbers are entered
    var internalValue = (date).replace(/-|\//g, '');

    // If the date passed in is NaN we set the proper error to true
    if(range === 'start'){
      this.set('dateStartError', isNaN(internalValue));
    } else {
      this.set('dateEndError', isNaN(internalValue));
    }
  }
});
