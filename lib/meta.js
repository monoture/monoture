var env = require('./env');

module.exports = {
  title : function(title) {
    if (env.meta != undefined) {
      return env.meta.titlePrefix + title + env.meta.titleSuffix;
    } else {
      return title;
    }
  },

  description : function(description) {
    return description;
  }
}
