var post = require('../../models/post');

module.exports = {
  index : function (req, res) {
    post.find({}, function (err, posts) {
      res.render('home', {
        title : 'Home',
        posts : posts
      });
    });
  }
}
