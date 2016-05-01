var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var user = require('./models/user');

module.exports = {
  setup : function(passport) {
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
      user.findOne({_id : id}, function(err, user){
        done(err, user);
      });
    });

    passport.use(new LocalStrategy(
      function(username, password, done) {
        user.findOne({username : username}, function(err, user){
          if (err) {
            return done(err);
          } else if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          } else if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
  },
  isAuthenticated : function loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/monoture/login');
    }
  }
}
