var post = require('./models/post');

// Controllers
var appControllers = {
  home : require('./controllers/app/home'),
  post : require('./controllers/app/post')
};

var monotureControllers = {
  dashboard : require('./controllers/monoture/dashboard'),
  post : require('./controllers/monoture/post')
}

module.exports = function(app, monoture, db) {
  // App
  app.get('/', appControllers.home.index);
  app.get('/post/:post', appControllers.post.view);

  // Dashboard
  monoture.get('/', monotureControllers.dashboard.index);

  // Post
  monoture.get('/post/new',           monotureControllers.post.create);
  monoture.get('/post/:post',         monotureControllers.post.edit);
  monoture.get('/post/:post/delete',  monotureControllers.post.delete);
  monoture.post('/post',              monotureControllers.post.update);
}
