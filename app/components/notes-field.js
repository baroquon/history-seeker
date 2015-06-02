import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'notes',
  isShowing: false,
  notes: Ember.computed.alias('user.notes'),
  actions: {
    toggleShowing: function(){
      this.toggleProperty('isShowing');
    },
    makeANote: function(){
      console.log(this.get('current_user.id'));
      let user = this.get('user'),
          notes = this.get('notes');

      user.set('notes', notes);

      if(!!user && user.isDirty){
        user.save();
      }

      this.toggleProperty('isShowing');
    }
  }
});
