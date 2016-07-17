module.exports = function(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
