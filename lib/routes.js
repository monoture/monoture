var post = require('./models/post');
var passport   = require('passport');
var auth = require('./authentication').isAuthenticated;

function controller(ref) {
  ref = ref.split('.');
  var controller = ref[0];
  var method = ref[1];
  return require('./controllers/' + controller)[method];
}

module.exports = function(app, monoture, db) {
  // App
  app.get('/', controller('app/home.index'));
  app.get('/post/:post', controller('app/post.view'));

  // Dashboard
  monoture.get('/', auth, controller('monoture/dashboard.index'));

  // Post
  monoture.get('/post/new', auth, controller('monoture/post.create'));
  monoture.get('/post/:post.json', auth, controller('monoture/post.json'));
  monoture.get('/post/:post', auth, controller('monoture/post.edit'));
  monoture.get('/post/:post/delete', auth, controller('monoture/post.delete'));
  monoture.get('/post/:post/publish', auth, controller('monoture/post.publish'));
  monoture.post('/post', auth, controller('monoture/post.update'));

  // Settings
  monoture.get('/settings', auth, controller('monoture/setting.edit'));
  monoture.post('/settings', auth, controller('monoture/setting.update'));

  monoture.get('/login', controller('monoture/login.login'));
  monoture.post('/login', passport.authenticate('local', { successRedirect: '/monoture/', failureRedirect: '/monoture/login' }));
}
