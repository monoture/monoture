#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .command('install', 'Install monoture')
  .command('run', 'Runs monoture', {isDefault: true})
  .command('user-list', 'Lists a users')
  .command('user-add [username] [password]', 'Add a new user')
  .command('user-delete [username]', 'Delete a user')
  .command('user-pass [username] [password]', 'Change a user password')
  .parse(process.argv);
