module.exports = function(err, req, res, next) {
  res.status(400);
  res.json({
    meta : {
      errors : err
    },
    data : {}
  });
};
