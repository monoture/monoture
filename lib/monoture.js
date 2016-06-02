var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var passport   = require('passport');
var authentication = require('./authentication');
var theme = require('monoture-theme');
var connect = require('camo').connect;

// Express
var app       = express();
var monoture  = express();

// Environment settings
var env = require.main.require(process.cwd() + '/env.json');

var exports = module.exports = {};

app.set('view engine', 'pug');
app.use(express.static('public'));
app.locals.site = env.site;

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

// Makes the parent application available to monoture admin
monoture.on('mount', function(parent){
  monoture.locals.parent = parent;
});

require('./routes')(app, monoture);

// Bind monoture onto app
app.use('/monoture', monoture);

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
