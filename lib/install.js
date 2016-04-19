var fs = require('fs');

var dirs = ['./app',
            './app/data',
            './views',
            './views/layouts',
            './public',
            './public/img',
            './public/css',
            './public/js'];

module.exports = function() {
  var installed = true;

  for (var i = 0; i < dirs.length; i++) {
    var dir = dirs[i];

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);

        if (installed) {
          installed = false;
        };
    }
  }

  if (installed) {
    console.info("Application already installed");
  } else {
    console.info("Application installation complete");
  }
}
