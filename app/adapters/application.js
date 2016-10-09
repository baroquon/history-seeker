import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  //host: 'https://api.historyseeker.com',
  host: 'https://history-seeker-api.herokuapp.com',
  headers: {
    "Access-Control-Allow-Headers": "X-Requested-With",
    "contentType":"application/json; charset=utf-8",
  }
});
