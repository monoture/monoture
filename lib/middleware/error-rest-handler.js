module.exports = function(err, req, res, next) {
  console.log(err);
  res.status(400);
  res.json({
    meta : {
      errors : err
    },
    data : {}
  });
};
