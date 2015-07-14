import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['panel', 'panel-default', 'card', 'pull-right', 'create-card'],
  actions: {
    createStudent: function(){
      var store = this.get('store');
      var firstName = this.get('newFirstName'),
          lastName = this.get('newLastName'),
          middleName = this.get('newMiddleName'),
          date_of_birth = this.get('newDateOfBirth'),
          email = this.get('newEmail'),
          password = this.get('newPassword'),
          teacher = this.get('current_user'),
          account = this.get('current_user.account');

      var new_student = store.createRecord('user', {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        date_of_birth: date_of_birth,
        email: email,
        password: password,
        password_confirmation: password,
        role: 'student',
        teacher: teacher,
        account: account
      });

      new_student.save();

      this.set('newFirstName', '')
          .set('newLastName', '')
          .set('newMiddleName', '')
          .set('newEmail', '')
          .set('newPassword', '')
          .set('newDateOfBirth', '');
      this.sendAction();
    }
  }
});
