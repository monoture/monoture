var post = require('./models/post');
var passport   = require('passport');
var auth = require('./authentication').isAuthenticated;
var controller = require('./controller');
var render = require('./render');

module.exports = function(app, dashboard, db) {
  // App
  app.get('/', controller('app/home.index'));
  app.get('/post/:post', controller('app/post.view'));

  // Dashboard
  dashboard.get('/', auth, controller('monoture/dashboard.index'));

  // Post
  dashboard.get('/post/new', auth, controller('monoture/post.create'));
  dashboard.get('/post/:post.json', auth, controller('monoture/post.json'));
  dashboard.get('/post/:post', auth, controller('monoture/post.edit'));
  dashboard.get('/post/:post/delete', auth, controller('monoture/post.delete'));
  dashboard.get('/post/:post/publish', auth, controller('monoture/post.publish'));
  dashboard.post('/post', auth, controller('monoture/post.update'));

  // Settings
  dashboard.get('/settings', auth, controller('monoture/setting.edit'));
  dashboard.post('/settings', auth, controller('monoture/setting.update'));

  dashboard.get('/login', controller('monoture/login.login'));
  dashboard.post('/login', passport.authenticate('local', { successRedirect: '/dashboard/', failureRedirect: '/dashboard/login' }));
}
