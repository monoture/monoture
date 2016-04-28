var post = require('../../models/post');
var validate = require('../../validate');

// Post Controller
module.exports = {

  create : function(req, res) {
    res.render('edit', {
      post : {}
    });
  },

  edit : function(req, res) {
    post.findOne({_id : req.params.post}, function(err, post) {
      if (!err) {
        res.render('edit', {
          post : post
        });
      } else {
        res.render('error');
      }
    });
  },

  update : function(req, res) {

    if (validate({
      title : 'required|length:24',
      body  : 'required',
      slug  : 'required|length:150|slug'
    }, req)) {
      var data = {
        title : req.body.title,
        body  : req.body.body,
        slug  : req.body.slug
      }

      if (req.body.id) {
        post.update({'_id' : req.body.id}, data, function(err, newDoc) {
          res.redirect('/monoture');
        });
      } else {
        post.insert(data, function(err, newDoc) {
          res.redirect('/monoture');
        });
      }
    } else {
      res.render('error');
    }
  },

  delete : function(req, res){
    post.remove({'_id' : req.params.post}, {}, function(err, numRemoved){
      res.redirect('/monoture');
    });
  }
}
