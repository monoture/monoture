var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var passport   = require('passport');
var authentication = require('./authentication');

// Express
var app       = express();
var monoture  = express();

// Environment settings
var env = require.main.require('./env.json');

var exports = module.exports = {};

app.set('view engine', 'pug');
app.use(express.static('public'));

// Authentication setup
authentication.setup(passport);

// Monoture application setup
monoture.set('view engine', 'pug');
monoture.set('views', [__dirname + '/views/']);
monoture.use(express.static(__dirname + '/../dist/'));
monoture.use( bodyParser.json() );       // to support JSON-encoded bodies
monoture.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
monoture.use(session({
  secret: env.secret,
  resave: false,
  saveUninitialized: true
}));
monoture.use(passport.initialize());
monoture.use(passport.session());

require('./routes')(app, monoture);

// Bind monoture onto app
app.use('/monoture', monoture);

// Expose the Express application
exports.app = app;

exports.run = function(port) {
  app.listen(port, function () {
    console.log('App listening on port ' + port);
  });
}
