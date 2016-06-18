var Post = require('../../models/post');

class DashboardController {
  static index(req, res) {
    Post.find({}).then(function(posts) {
      res.render('dashboard', {
        posts : posts
      });
    }).catch(function(post){
      res.render('error');
    });
  }
}

module.exports = DashboardController;
