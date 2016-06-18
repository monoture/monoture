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
  dashboard.get('/', auth, function(req, res, next){
    res.redirect('/dashboard/posts');
  });

  // Post
  dashboard.get('/post/new', auth, controller('dashboard/post.create'));
  dashboard.get('/post/:post.json', auth, controller('dashboard/post.json'));
  dashboard.get('/post/:post', auth, controller('dashboard/post.edit'));
  dashboard.get('/post/:post/delete', auth, controller('dashboard/post.delete'));
  dashboard.get('/post/:post/publish', auth, controller('dashboard/post.publish'));
  dashboard.post('/post', auth, controller('dashboard/post.update'));

  dashboard.get('/posts(.json)?', auth, controller('monoture/posts.view'), render);

  // Settings
  dashboard.get('/settings', auth, controller('dashboard/setting.edit'));
  dashboard.post('/settings', auth, controller('dashboard/setting.update'));

  dashboard.get('/login', controller('dashboard/login.login'));
  dashboard.post('/login', passport.authenticate('local', { successRedirect: '/dashboard/', failureRedirect: '/dashboard/login' }));
}
