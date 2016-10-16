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

if (!fs.existsSync('./.env')) {

  console.info("Creating environment file");

  // Create session secret
  sessionHash.update(Math.random().toString());
  var secret = sessionHash.digest('hex');

  var defaultEnv = "";
  defaultEnv += `SECRET=${secret}\n`;
  defaultEnv += `PORT=3001\n`;
  defaultEnv += `DATABASE=nedb://./app/data\n`;
  defaultEnv += `SITE_NAME=My Blog\n`;
  defaultEnv += `TITLE_PREFIX=\n`;
  defaultEnv += `TITLE_SUFFIX=\n`;
  defaultEnv += `HOME_TITLE=My Blog\n`;
  defaultEnv += `HOME_DESCRIPTION=My Blog\n`;

  fs.writeFile('./.env', defaultEnv, function (err) {
    if (err) {
      console.error("Unable to create environment file : " + err);
    }
  });
}
