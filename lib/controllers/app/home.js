var Post = require('../../models/post');

module.exports = {
  index : function (req, res) {
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
