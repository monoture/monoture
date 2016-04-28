module.exports = function(field, req, length) {
  return req.body[field].length <= length
}
