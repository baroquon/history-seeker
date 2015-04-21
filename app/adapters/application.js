import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  host: 'http://localhost:3000',
  headers: {
    "Access-Control-Allow-Headers": "X-Requested-With",
    "contentType":"application/json; charset=utf-8",
  }
});
