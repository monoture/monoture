var Datastore  = require('nedb');

module.exports = new Datastore({ filename: './app/data/user.db', autoload: true });
