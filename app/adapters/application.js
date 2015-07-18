import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  //host: 'https://api.historyseeker.com',
  host: 'http://localhost:3000',
  headers: {
    "Access-Control-Allow-Headers": "X-Requested-With",
    "contentType":"application/json; charset=utf-8",
  }
});
