import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createStudent: function(){
      var firstName = this.get('newFirstName'),
          lastName = this.get('newLastName'),
          middleName = this.get('newMiddleName'),
          date_of_birth = this.get('newDateOfBirth'),
          teacher = this.get('model');

      var new_student = this.store.createRecord('user', {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        date_of_birth: date_of_birth,
        role: 'student',
        teacher_id: teacher
      });

      new_student.save();

      this.set('newFirstName', '')
          .set('newLastName', '')
          .set('newMiddleName', '')
          .set('newDateOfBirth', '');
    }
  }
});
