// Dependencies
var express = require('express')
    dashboard = require('monoture-dashboard')
    bodyParser = require('body-parser')
    session = require('express-session')
    passport = require('passport')
    LocalStrategy = require('passport-local').Strategy
    BearerStrategy = require('passport-http-bearer').Strategy
    bcryptjs = require('bcryptjs')
    User = require('./controllers/services/user/model')
    expressValidator = require('express-validator');

// Environment Settings
require('dotenv').config({silent: true});

// Passport Initalisation
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id : id}).then(function(user){
    if (user != null) {
      user.lastActivity = new Date();
      user.save().then(function(user){
        done(null, user);
      });
    } else {
      done(err, null);
    }
  }).catch(function(err){
    done(err, null);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username : username}).then(function(user){
      if (user == null) {
        return done(null, false, { message: 'Incorrect username.' });
      } else if (!bcryptjs.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }).catch(function(err){
      return done(err);
    });
  }
));

passport.use(new BearerStrategy(
  function(token, done) {

    // 30 day token expiry
    var expiry = new Date();
    expiry.setDate(expiry.getDate() - 30);

    User.findOne({token : token, tokenCreated : {$gt : expiry}}).then(function(user){
      if (user == null) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    }).catch(function(err){
      return done(err);
    });
  }
));

// Express.js Application
var app = express();

app.set('view engine', 'pug');
app.set('views', [
  process.cwd() + '/views/',
  dashboard
]);
app.use('/dashboard', express.static(dashboard));
app.use(express.static('public'));
app.locals.site = {name : process.env.SITE_NAME};
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

// Load routes
require('./routes')(app);

module.exports = app;
