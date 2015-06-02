/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'historicity',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' cdnjs.cloudflare.com api.tiles.mapbox.com",
      'font-src': "'self' data: fonts.gstatic.com",
      'connect-src': "'self' intense-castle-9219.herokuapp.com",
      'img-src': "'self' developer.mapquest.com otile0-s.mqcdn.com otile1-s.mqcdn.com otile2-s.mqcdn.com otile3-s.mqcdn.com otile4-s.mqcdn.com data:",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com localhost:4200 cdnjs.cloudflare.com",
      'frame-src': "www.youtube.com"
    }
  };

  ENV['simple-auth'] = {
    crossOriginWhitelist: ['*'],
    routeIfAlreadyAuthenticated: 'user',
    authenticationRoute: 'session.new',
    authorizer: 'simple-auth-authorizer:devise'
  }

  ENV['simple-auth-devise'] = {
    tokenAttributeName: 'token',
    identificationAttributeName: 'email',
    serverTokenEndpoint: 'https://intense-castle-9219.herokuapp.com/users/sign_in',
    authorizer: 'devise'
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
