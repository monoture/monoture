var Post = require('../../models/post');

class PostsController {
  static view(req, res, next) {
    Post.find({}).then(function(posts) {
      res.view = {
        template : 'dashboard',
        data : {
          posts : posts
        }
      };

      next();
    }).catch(function(err){
      console.error(err);
      res.render('error');
    });
  }
}

module.exports = PostsController;
