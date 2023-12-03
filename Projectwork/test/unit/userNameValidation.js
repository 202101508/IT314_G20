function validateUsername(username) {
    let errors = [];
  
    if (username.length < 6 || username.length > 12) {
      errors.push("Username length should be between 6 and 12");
    }
  
    if (username.match(/[!\@\#\$\%\^\&\*\(\)\-\+\=\?\>\<\.\,]/)) {
      errors.push("Only underscore allowed in username");
    }
  
    return errors;
  }
  
  module.exports = validateUsername;
  