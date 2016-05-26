var Post = require('../../models/post');

// Post Controller
module.exports = {

  view : function(req, res) {
    Post.findOneOrFail({slug : req.params.post}).then(function(post){
      res.render('post', {
        post : post
      });
    }).catch(function(post){
      res.render('error');
    });
  }
}
