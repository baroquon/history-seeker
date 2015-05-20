import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  host: 'https://intense-castle-9219.herokuapp.com',
  headers: {
    "Access-Control-Allow-Headers": "X-Requested-With",
    "contentType":"application/json; charset=utf-8",
  }
});
