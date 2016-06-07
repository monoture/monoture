module.exports = function(field, req) {
  return req.body[field] == 'true' || req.body[field] == 'false'
}
