module.exports = function(app, monoture, db) {

  app.param('post', function(req, res, next, slug){
    db.findOne({slug : slug}, function(err, post) {
      if (err) {
        next(err);
      } else if (post) {
        req.post = post;
        next();
      } else {
        next(new Error('failed to load post'));
      }
    })
  });

  // Index
  app.get('/', function (req, res) {
    db.find({}, function (err, posts) {
      res.render('home', {
        title : 'Home',
        posts : posts
      });
    });
  });

  app.get('/post/:post', function(req, res) {
    res.render('post', {
      post : req.post
    });
  });


  monoture.get('/', function(req, res) {
    res.render('home');
  })
}
