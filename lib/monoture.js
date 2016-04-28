var install    = require('./install');
var express    = require('express');
var bodyParser = require('body-parser')

// Express
var app       = express();
var monoture  = express();

// Install the application
install();

var exports = module.exports = {};

app.set('view engine', 'pug');
app.use(express.static('public'));

// Monoture application setup
monoture.set('view engine', 'pug');
monoture.set('views', [__dirname + '/views/']);
monoture.use(express.static(__dirname + '/../dist/'));
monoture.use( bodyParser.json() );       // to support JSON-encoded bodies
monoture.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

require('./routes')(app, monoture);

app.use('/monoture', monoture);

// Expose the Express application
exports.app = app;

exports.run = function(port) {
  app.listen(port, function () {
    console.log('App listening on port ' + port);
  });
}
