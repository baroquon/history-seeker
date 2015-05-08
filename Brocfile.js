/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var app = new EmberApp();

var extraAssets = new Funnel('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: 'fonts/bootstrap'
});
app.import('bower_components/jquery.easing/js/jquery.easing.min.js');
module.exports = app.toTree(extraAssets);

