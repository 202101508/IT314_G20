const validatePassword = require('./unit/passwordValidation');

const validPasswords = ["Qwerty@123", "Abcd_789"];
const invalidPasswords = ["invalid123", "short"];

validPasswords.forEach(element => {
  test(`returns no errors for valid password: ${element}`, () => {
    const errors = validatePassword(element);
    expect(errors).toEqual([]); // Expecting an empty array for a valid password
  });
});

invalidPasswords.forEach(element => {
  test(`returns errors for invalid password: ${element}`, () => {
    const errors = validatePassword(element);
    expect(errors).not.toEqual([]); // Expecting a non-empty array for an invalid password
  });
});
