#!/usr/bin/env node

var connect = require('camo').connect;
var User = require('../lib/controllers/services/user/model');

connect('nedb://./app/data').then(function(db) {
  console.info('\nMonoture Users');
  console.info('-------------- \n');
  User.find({}).then(function(users){
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      console.info(`${i + 1}. ${user.username}`);
    }
  });
});
