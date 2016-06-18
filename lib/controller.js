module.exports = function(ref) {
  ref = ref.split('.');
  var controller = ref[0];
  var method = ref[1];
  return require('./controllers/' + controller)[method];
}
