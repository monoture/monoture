var user = require('../../models/user');
var passport   = require('passport');

class LoginController {
  static login(req, res) {
    res.render('login');
  }
}

module.exports = LoginController;
