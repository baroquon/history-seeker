/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

var app = new EmberApp();

app.import('vendor/ol/ol.js');
app.import('vendor/ol/ol.css');
app.import('bower_components/moment/moment.js');
app.import('bower_components/bootstrap-material-design/fonts/Material-Design-Icons.woff');
app.import('bower_components/bootstrap-material-design/fonts/Material-Design-Icons.ttf');


var materialAssets = new Funnel('bower_components/bootstrap-material-design/fonts', {
    srcDir: '/',
    destDir: '/assets/material-font-path'
});

module.exports = app.toTree(materialAssets);

