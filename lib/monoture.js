var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var passport   = require('passport');
var authentication = require('./authentication');
var theme = require('monoture-theme');
var connect = require('camo').connect;

// Express
var app       = express();
var dashboard  = express();

// Environment settings
var env = require.main.require(process.cwd() + '/env.json');

var exports = module.exports = {};

app.set('view engine', 'pug');
app.use(express.static('public'));
app.locals.site = env.site;

// Authentication setup
authentication.setup(passport);

// Monoture application setup
dashboard.set('view engine', 'pug');
dashboard.set('views', [__dirname + '/views/']);
dashboard.use(express.static(__dirname + '/../dist/'));
dashboard.use( bodyParser.json() );       // to support JSON-encoded bodies
dashboard.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
dashboard.use(session({
  secret: env.secret,
  resave: false,
  saveUninitialized: true
}));
dashboard.use(passport.initialize());
dashboard.use(passport.session());

// Makes the parent application available to monoture admin
dashboard.on('mount', function(parent){
  dashboard.locals.parent = parent;
});

require('./routes')(app, dashboard);

// Bind dashboard onto app
app.use('/dashboard', dashboard);

// Sets the main theme
theme(app);

// Expose the Express application
exports.app = app;

exports.run = function() {
  connect(env.database).then(function(db) {
    app.listen(env.port, function () {
      console.log('Monoture started on port ' + env.port);
    });
  });
}
