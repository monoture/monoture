module.exports = function(rules, req) {
  var valid = true;

  // Loop over each field and get the rules
  for (var field in rules) {

    // Rules are delimited by a pipe, so split them out
    var validators = rules[field].split('|');

    // Now loop over each validator and validate the field
    for (var key in validators) {
      var validator = validators[key].split(':');
      if (valid) {
        valid = require('./validators/' + validator[0])(field, req, validator[1]);
      }
    }

    // Break if we've got an invalid rule
    if (!valid) break;
  }

  return valid;
}
