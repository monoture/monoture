var install   = require('./install');
var express   = require('express');
var Datastore = require('nedb');

// Express
var app       = express();
var monoture  = express();

// Database
var db = new Datastore({ filename: './app/data/cms.db', autoload: true });

// Install the application
install();

var exports = module.exports = {};

app.set('view engine', 'pug');
app.use(express.static('public'));

// Monoture application setup
monoture.set('view engine', 'pug');
monoture.set('views', [__dirname + '/../views/']);
monoture.use(express.static(__dirname + '/../dist/'));

require('./routes')(app, monoture, db);

app.use('/monoture', monoture);

// Expose the Express application
exports.app = app;

exports.run = function(port) {
  app.listen(port, function () {
    console.log('App listening on port ' + port);
  });
}
