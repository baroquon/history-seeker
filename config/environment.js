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
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' maps.gstatic.com maps.googleapis.com mt0.googleapis.com mt1.googleapis.com",
      'font-src': "'self' data: fonts.gstatic.com",
      'connect-src': "'self' localhost:3000 intense-castle-9219.herokuapp.com",
      'img-src': "'self' maps.gstatic.com csi.gstatic.com maps.googleapis.com mt0.googleapis.com mt1.googleapis.com mt.googleapis.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com localhost:4200",
      'frame-src': ""
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
    serverTokenEndpoint: 'http://localhost:3000/users/sign_in',
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
