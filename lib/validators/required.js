module.exports = function(field, req) {
  return req.body[field] !== undefined
}
