var theme = require('monoture-theme');
var connect = require('camo').connect;
var env = require('./env');
var app = require('./bootstrap');

class Monoture {
  constructor(app) {
    this._app = app;
  }

  setTheme(theme) {
    theme(this._app);
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
}

var monoture = new Monoture(app);

// Set default theme
monoture.setTheme(theme);

module.exports = monoture;
