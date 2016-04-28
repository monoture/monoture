var Datastore  = require('nedb');

module.exports = new Datastore({ filename: './app/data/post.db', autoload: true });
