#!/usr/bin/env node
var connect = require('camo').connect;
var User = require('../lib/controllers/services/user/model');
var program = require('commander');

program.parse(process.argv);

var username = program.args[0];

if (username) {
  connect('nedb://./app/data').then(function(db) {
    User.findOneAndDelete({username : username}).then(function(rows){
      if (rows > 0) {
        console.info(`User ${username} deleted`);
      } else {
        console.info(`Could not find user ${username}`);
      }
    });
  });
}
