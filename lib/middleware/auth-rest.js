var passport   = require('passport');

module.exports = passport.authenticate('bearer', { session: false, failWithError : true });
