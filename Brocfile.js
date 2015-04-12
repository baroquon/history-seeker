/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var app = new EmberApp();

var extraAssets = new Funnel('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: 'fonts/bootstrap'
});

module.exports = app.toTree(extraAssets);

