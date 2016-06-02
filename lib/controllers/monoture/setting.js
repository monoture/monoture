var env = require.main.require(process.cwd() + '/env.json');
var fs = require('fs');
var validate = require('../../validate');

class Setting {
  static edit(req, res) {
    res.render('setting', {
      site : env.site
    });
  }

  static update(req, res) {

    var isValid = validate({
      siteName : 'required|length:24'
    }, req);

    if (isValid) {
      // Only change the inputs we want
      env.site.name = req.body.siteName;

      // Write changes to the environment file
      fs.writeFile('./env.json', JSON.stringify(env), function (err) {
        if (!err) {
          // Update the global locals for the root app
          req.app.locals.parent.locals.site = env.site;
        }
        res.redirect('/monoture/settings');
      });
    } else {
      res.redirect('/monoture/settings');
    }
  }
}

module.exports = Setting;
