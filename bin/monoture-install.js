var fs = require('fs');
var user = require('../lib/models/user');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var passwordHash = crypto.createHash('sha256');
var sessionHash = crypto.createHash('sha256');

console.info("Installing Monoture...");

// Directory Installation
console.info("Checking directories");

var dirs = ['./app',
            './app/data',
            './views',
            './views/layouts',
            './public',
            './public/img',
            './public/css',
            './public/js'];

for (var i = 0; i < dirs.length; i++) {
  var dir = dirs[i];

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.info("Created directory : " + dir);
  }
}

// Create admin user
console.info("Checking for admin user");

if (user.findOne({username : 'admin'}, function(err, admin){

  if (!admin) {

    // No admin user found
    console.info("Admin user not found");

    // Generate random password
    passwordHash.update(Math.random().toString());
    var pass = passwordHash.digest('hex').substring(0, 10);

    console.info("Admin password is : " + pass);

    bcrypt.hash(pass, 10, function(err, hash) {
      if (!err) {
        user.insert({username : 'admin', password : hash}, function(err, user) {
          if (err) {
            console.error("Unable to create admin account");
          }
        });
      } else {
        console.error("Unable to create admin account")
      }
    });
  }
}));

// Create environment file
console.info("Checking for environment file");

if (!fs.existsSync('./env.json')) {

  console.info("Creating environment file");

  // Create session secret
  sessionHash.update(Math.random().toString());
  var secret = sessionHash.digest('hex');

  fs.writeFile('./env.json', JSON.stringify({
    secret : secret,
    port   : '3000'
  }), function (err) {
    if (err) {
      console.error("Unable to create environment file : " + err);
    }
  });
}
