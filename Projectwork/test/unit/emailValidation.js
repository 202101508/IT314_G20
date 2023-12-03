const validator = require('validator');

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return ["Invalid Email Address"];
  } else {
    return [];
  }
}

module.exports = validateEmail;
