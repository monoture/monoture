var LocalStrategy = require('passport-local').Strategy;
var bcryptjs = require('bcryptjs');
var User = require('./models/User');

module.exports = {
  setup : function(passport) {
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
      User.findOne({_id : id}).then(function(user){
        if (user != null) {
          done(null, user);
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
  },
  isAuthenticated : function loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/dashboard/login');
    }
  }
}
