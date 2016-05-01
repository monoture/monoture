var user = require('../../models/user');
var passport   = require('passport');

module.exports = {
  login : function(req, res) {
    res.render('login');
  }
}
