var Post = require('../../models/post');

class HomeController {
  static index(req, res) {
    Post.find({published : true}).then(function(posts) {
      res.render('home', {
        title : 'Home',
        posts : posts
      });
    }).catch(function(post){
      res.render('error');
    });
  }
}

module.exports = HomeController;
