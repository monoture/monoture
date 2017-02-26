var Post = require('./model');
var router = require('express').Router();

function validatePost(req, res, next) {
  // Sanitize Input
  req.sanitizeBody('title').escape();
  req.sanitizeBody('description').escape();
  req.sanitizeBody('slug').escape();
  req.sanitizeBody('published').toBoolean();

  // Make the slug lower case
  req.body.slug = req.body.slug.toLowerCase();

  // Validate Input
  req.checkBody('title', 'Invalid title').notEmpty().isLength({min : 0, max : 120});
  req.checkBody('description', 'Invalid description').notEmpty().isLength({min : 0, max : 160});
  req.checkBody('body', 'Invalid content').notEmpty();
  req.checkBody('slug', 'Invalid slug').notEmpty().matches(/^[a-z0-9-]+$/).isLength({min : 0, max : 150});
  req.checkBody('published', 'Invalid published option').notEmpty().isBoolean();
  req.checkBody('featured', 'Invalid featured option').notEmpty().isBoolean();

  next(req.validationErrors(true));
}

function validatePostParam(req, res, next) {
  // Sanitize param
  req.sanitizeParams('post').escape();

  // Validate params
  req.checkParams('post').isAlphanumeric();

  next(req.validationErrors(true));
}

router.get('/', function(req, res, next){
  Post.find({}, {sort: ['-featured', '-created_at']}).then(function(posts) {
    res.json({
      meta : {},
      data : posts
    });
  }).catch(next);
});

router.get('/:post', validatePostParam, function(req, res, next){
  Post.findOne({_id : req.params.post}).then(function(post){
    if (post != null) {
      res.json({
        meta : {},
        data : post
      });
    } else {
      next('Unable to find resource');
    }
  }).catch(next);
});

router.post('/', validatePost, function(req, res, next){
  var post = Post.create({
    title : req.body.title,
    description : req.body.description,
    body  : req.body.body,
    slug  : req.body.slug,
    published : req.body.published,
    featured : req.body.featured
  });

  post.save().then(function(post){
    res.json({
      meta : {},
      data : post
    });
  }).catch(next);
});

router.put('/:post', validatePostParam, validatePost, function(req, res, next){
  Post.findOne({'_id' : req.params.post}).then(function(post) {
    post.title = req.body.title;
    post.description = req.body.description;
    post.body = req.body.body;
    post.slug = req.body.slug;
    post.published = req.body.published;
    post.featured = req.body.featured;

    return post.save();
  }).then(function(post){
    if (post != null) {
      res.json({
        meta : {},
        data : post
      });
    } else {
      next('Unable to find resource');
    }
  }).catch(next);
});

router.delete('/:post', validatePostParam, function(req, res, next){
  Post.findOneAndDelete({'_id' : req.params.post}).then(function(rows){
    res.json({
      meta : {},
      data : {
        rows : rows
      }
    });
  }).catch(next);
});

module.exports = router;
