module.exports = {
  title : function(title) {
    if (process.env.TITLE_PREFIX != undefined) {
      return process.env.TITLE_PREFIX + title + process.env.TITLE_SUFFIX;
    } else {
      return title;
    }
  },

  description : function(description) {
    return description;
  }
}
