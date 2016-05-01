var post = require('./models/post');
var passport   = require('passport');
var authentication = require('./authentication');

// Controllers
var appControllers = {
  home : require('./controllers/app/home'),
  post : require('./controllers/app/post')
};

var monotureControllers = {
  dashboard : require('./controllers/monoture/dashboard'),
  post : require('./controllers/monoture/post'),
  login : require('./controllers/monoture/login')
}

module.exports = function(app, monoture, db) {
  // App
  app.get('/', appControllers.home.index);
  app.get('/post/:post', appControllers.post.view);

  // Dashboard
  monoture.get('/', authentication.isAuthenticated, monotureControllers.dashboard.index);

  // Post
  monoture.get('/post/new', authentication.isAuthenticated, monotureControllers.post.create);
  monoture.get('/post/:post', authentication.isAuthenticated, monotureControllers.post.edit);
  monoture.get('/post/:post/delete', authentication.isAuthenticated, monotureControllers.post.delete);
  monoture.post('/post', authentication.isAuthenticated, monotureControllers.post.update);

  monoture.get('/login', monotureControllers.login.login);
  monoture.post('/login', passport.authenticate('local', { successRedirect: '/monoture/', failureRedirect: '/monoture/login' }));
}
