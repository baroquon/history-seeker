/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

var app = new EmberApp();

app.import('vendor/ol/ol.js');
app.import('vendor/ol/ol.css');
app.import('bower_components/moment/moment.js');


module.exports = app.toTree();
