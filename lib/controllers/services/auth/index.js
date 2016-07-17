var router = require('express').Router();
var passport   = require('passport');
var auth = passport.authenticate('bearer', { session: false, failWithError : true });
var uid = require('uid');

router.post('/', passport.authenticate('local'), function(req, res, next){

  // 30 day token expiry
  var expiry = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);

  if (req.user.token == undefined || req.user.tokenCreated == undefined || req.user.tokenCreated < expiry) {
    req.user.token = uid(32);
    req.user.tokenCreated = new Date();
  }

  req.user.save().then(function(){
    res.json({
      user : {
        id : req.user._id,
        username : req.user.username,
        token : req.user.token
      }
    });
  });
});

module.exports = router;
