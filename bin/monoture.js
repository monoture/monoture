#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .command('install', 'Install monoture', {isDefault: true})
  .command('run', 'Runs monoture')
  .parse(process.argv);