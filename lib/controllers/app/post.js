var post = require('../../models/post');

// Post Controller
module.exports = {

  view : function(req, res) {
    post.findOne({slug : req.params.post}, function(err, post) {
      if (!err) {
        res.render('post', {
          post : post
        });
      } else {
        res.render('error');
      }
    });
  }
}
