var Post = require('./services/post/model');
var router = require('express').Router();
var markdown = require('markdown-it')();
var meta = require('../meta');

router.get('/', function(req, res, next) {
  Post.find({published : true}).then(function(posts) {

    var title = process.env.SITE_NAME;
    var description = process.env.SITE_NAME;

    if (process.env.meta != undefined) {
      title = process.env.HOME_TITLE;
      description = process.env.HOME_DESCRIPTION;
    }

    res.render('home', {
      title : meta.title(title),
      description : meta.description(description),
      posts : posts,
      markdown : markdown
    });
  }).catch(function(post){
    res.render('error');
  });
});

router.get('/post/:post', function(req, res, next) {
  Post.findOne({slug : req.params.post, published : true}).then(function(post){
    if (post != null) {
      res.render('post', {
        title : meta.title(post.title),
        description : meta.description(post.description),
        post : post,
        markdown : markdown
      });
    } else {
      res.render('error');
    }
  }).catch(function(post){
    res.render('error');
  });
});

module.exports = router;
