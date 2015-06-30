import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  host: 'https://intense-castle-9219.herokuapp.com',
  //host: 'http://localhost:3000',
  headers: {
    "Access-Control-Allow-Headers": "X-Requested-With",
    "contentType":"application/json; charset=utf-8",
  }
});
