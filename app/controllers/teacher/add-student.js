import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'current-user',
  current_user: Ember.computed.alias('controllers.current-user.current_user'),
  actions: {
    createStudent: function(){
      // This no longer works since I implemented authentication for users
      var firstName = this.get('newFirstName'),
          lastName = this.get('newLastName'),
          middleName = this.get('newMiddleName'),
          date_of_birth = this.get('newDateOfBirth'),
          email = this.get('newEmail'),
          password = this.get('newPassword'),
          teacher = this.get('current_user');

      var new_student = this.store.createRecord('user', {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        date_of_birth: date_of_birth,
        email: email,
        password: password,
        password_confirmation: password,
        role: 'student',
        teacher: teacher
      });

      new_student.save();

      this.set('newFirstName', '')
          .set('newLastName', '')
          .set('newMiddleName', '')
          .set('newEmail', '')
          .set('newPassword', '')
          .set('newDateOfBirth', '');
    }
  }
});
