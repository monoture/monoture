var Post = require('./services/post/model');
var router = require('express').Router();

router.get('/', function(req, res, next) {
  Post.find({published : true}).then(function(posts) {
    res.render('home', {
      title : 'Home',
      posts : posts
    });
  }).catch(function(post){
    res.render('error');
  });
});

router.get('/post/:post', function(req, res, next) {
  Post.findOne({slug : req.params.post, published : true}).then(function(post){
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
});

module.exports = router;
