module.exports = function(field, req) {
  return /^[a-z0-9-]+$/.test(req.body[field]);
}
