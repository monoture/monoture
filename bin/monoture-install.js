#!/usr/bin/env node

var fs = require('fs');
var User = require('../lib/controllers/services/user/model');
var bcryptjs = require('bcryptjs');
var crypto = require('crypto');
var passwordHash = crypto.createHash('sha256');
var sessionHash = crypto.createHash('sha256');
var connect = require('camo').connect;

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

connect('nedb://./app/data').then(function(db) {
  User.findOne({username : 'admin'}).then(function(user){
    if (user == null) {

      // No admin user found
      console.info("Admin user not found");

      // Generate random password
      passwordHash.update(Math.random().toString());
      var pass = passwordHash.digest('hex').substring(0, 10);

      console.info("Admin password is : " + pass);

      var hash = bcryptjs.hashSync(pass, 10);

      var admin = User.create({
        username : 'admin',
        password : hash
      });

      admin.save().then(function(){
        console.info("Admin account created");
      });
    }
  });
});

// Create environment file
console.info("Checking for environment file");

if (!fs.existsSync('./env.json')) {

  console.info("Creating environment file");

  // Create session secret
  sessionHash.update(Math.random().toString());
  var secret = sessionHash.digest('hex');

  var defaultEnv = {
    secret : secret,
    port   : '3000',
    database : 'nedb://./app/data',
    site : {
      name : 'My Blog'
    },
    meta : {
      titlePrefix : '',
      titleSuffix : '',
      homeTitle : '',
      homeDescription : ''
    },
    plugin : {}
  }

  fs.writeFile('./env.json', JSON.stringify(defaultEnv), function (err) {
    if (err) {
      console.error("Unable to create environment file : " + err);
    }
  });
}
