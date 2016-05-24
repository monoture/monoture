var Post = require('../../models/post');

// Post Controller
module.exports = {

  view : function(req, res) {
    Post.findOne({slug : req.params.post}).then(function(post){
      if (post != null) {
        res.render('post', {
          post : post
        });
      } else {
        res.render('error');
      }
    }).catch(function(post){
      res.render('error');
    });
  }
}
