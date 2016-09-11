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
    connect(env.database).then(function(db) {
      app.listen(env.port, function () {
        console.log('Monoture started on port ' + env.port);
      });
    }).catch(function(err){
      console.error("Unable to start Monoture : ", err);
    });
  }

  setTheme(theme) {
    theme(this._app);
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

  }

  get app() {
    return this._app;
  }

  get post() {
    return require('./controllers/services/post/model');
  }
}

var monoture = new Monoture(app);

// Set default theme
monoture.setTheme(theme);

module.exports = monoture;
