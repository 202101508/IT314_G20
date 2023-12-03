function validatePassword(password) {
  let errors = [];

  if (!password.match(/[0-9]/)) {
    errors.push("At least 1 number required");
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("At least 1 uppercase required");
  }

  if (!password.match(/[a-z]/)) {
    errors.push("At least 1 lowercase required");
  }

  if (!password.match(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\?\>\<\.\,]/)) {
    errors.push("At least 1 special symbol required");
  }

  if (password.length < 6 || password.length > 14) {
    errors.push("Password length should be between 6 and 14");
  }

  return errors;
}

module.exports = validatePassword;
