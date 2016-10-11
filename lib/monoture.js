var theme = require('monoture-theme');
var connect = require('camo').connect;
var env = require('./env');
var app = require('./bootstrap');
var express = require('express');
var authMiddleware = require('./middleware/auth-rest');
var plugins = require('./plugins');

class Monoture {
  constructor(app) {
    this._app = app;
  }

  run() {
    var app = this._app;

    // 404 handler
    app.use(require('./middleware/not-found-handler'));

    connect(env.database).then(function(db) {
      app.listen(env.port, function () {
        console.log('Monoture started on port ' + env.port);
      });
    }).catch(function(err){
      console.error("Unable to start Monoture : ", err);
    });
  }

  setTheme(theme) {
    theme(this);
  }

  registerPlugin(plugin) {
    plugin(this);
  }

  registerPropertyAlias(name, property) {
    Object.defineProperty(this, name, property);
  }

  registerApiRoutes(endpoint, routes) {
    this.app.use(`/api/v1/${endpoint}`, authMiddleware, routes);
  }

  registerStaticDirectory(endpoint, dir) {
    this.app.use(endpoint, express.static(dir));
  }

  registerAngularPlugin(name) {
    plugins.push(name);
  }

  registerTheme(views, assets) {
    var appViews = this.app.get('views');
    appViews.push(views);
    this.app.set('views', appViews);

    this.app.use(express.static(assets));

    this.app.locals.basedir = views;
  }

  get app() {
    return this._app;
  }

  get post() {
    return require('./controllers/services/post/model');
  }

  get meta() {
    return require('./meta');
  }
}

var monoture = new Monoture(app);

// Set default theme
monoture.setTheme(theme);

module.exports = monoture;
