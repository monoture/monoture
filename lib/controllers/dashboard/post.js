var Post = require('../../models/post');
var validate = require('../../validate');

// Post Controller
class PostController {
  static create(req, res) {
    res.render('edit', {
      post : {}
    });
  }

  static edit(req, res) {
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
  }

  static json(req, res) {
    Post.findOne({_id : req.params.post}).then(function(post){
      if (post != null) {
        res.json(post);
      } else {
        res.json({error : "Unable to retrieve post"});
      }
    }).catch(function(post){
      res.json({error : "Unable to retrieve post"});
    });
  }

  static update(req, res) {

    if (validate({
      title : 'required|length:120',
      body  : 'required',
      slug  : 'required|length:150|slug',
      published : 'required|boolean'
    }, req)) {
      Post.findOneAndUpdate({'_id' : req.body.id}, {
        title : req.body.title,
        body  : req.body.body,
        slug  : req.body.slug,
        published : req.body.published
      }, {upsert: true}).then(function(post){
        res.redirect('/dashboard');
      }).catch(function(post){
        res.render('error');
      });
    } else {
      res.render('error');
    }
  }

  static delete(req, res){
    Post.findOneAndDelete({'_id' : req.params.post}).then(function(){
      res.redirect('/dashboard');
    }).catch(function(post){
      res.render('error');
    });
  }

  static publish(req, res) {
    Post.findOne({_id : req.params.post}).then(function(post){
      if (post != null) {
        if (!post.published) {
          post.published = true;
        } else {
          post.published = false;
        }

        post.save().then(function(){
          res.redirect('/dashboard');
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

module.exports = PostController;
