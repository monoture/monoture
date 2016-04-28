var post = require('../../models/post');

module.exports = {
  index : function(req, res) {
    post.find({}, function (err, posts) {
      res.render('dashboard', {
        posts : posts
      });
    });
  }
}
