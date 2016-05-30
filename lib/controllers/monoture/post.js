var Post = require('../../models/post');
var validate = require('../../validate');

// Post Controller
module.exports = {

  create : function(req, res) {
    res.render('edit', {
      post : {}
    });
  },

  edit : function(req, res) {
    Post.findOne({_id : req.params.post}).then(function(post){
      if (post != null) {
        res.render('edit', {
          post : post
        });
      } else {
        res.render('error');
      }
    }).catch(function(post){
      res.render('error');
    });
  },

  update : function(req, res) {

    if (validate({
      title : 'required|length:24',
      body  : 'required',
      slug  : 'required|length:150|slug'
    }, req)) {
      Post.findOneAndUpdate({'_id' : req.body.id}, {
        title : req.body.title,
        body  : req.body.body,
        slug  : req.body.slug
      }, {upsert: true}).then(function(post){
        res.redirect('/monoture');
      }).catch(function(post){
        res.render('error');
      });
    } else {
      res.render('error');
    }
  },

  delete : function(req, res){
    Post.findOneAndDelete({'_id' : req.params.post}).then(function(){
      res.redirect('/monoture');
    }).catch(function(post){
      res.render('error');
    });
  },

  publish : function(req, res) {
    Post.findOne({_id : req.params.post}).then(function(post){
      if (post != null) {
        if (!post.published) {
          post.published = true;
        } else {
          post.published = false;
        }

        post.save().then(function(){
          res.redirect('/monoture');
        });
      } else {
        console.log("No post");
        res.render('error');
      }
    }).catch(function(post){
      res.render('error');
    });
  }
}
