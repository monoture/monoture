#!/usr/bin/env node
var connect = require('camo').connect;
var User = require('../lib/controllers/services/user/model');
var bcryptjs = require('bcryptjs');
var program = require('commander');

program.parse(process.argv);

var username = program.args[0];
var password = program.args[1];

if (username && password) {
  connect('nedb://./app/data').then(function(db) {
    var hash = bcryptjs.hashSync(password, 10);

    user = User.create({
      username : username,
      password : hash
    });

    user.save().then(function(user){
      console.info(`User ${user.username} created`);
    });
  });
}
