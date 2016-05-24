var Post = require('../../models/post');

module.exports = {
  index : function(req, res) {
    Post.find({}).then(function(posts) {
      res.render('dashboard', {
        posts : posts
      });
    }).catch(function(post){
      res.render('error');
    });
  }
}
