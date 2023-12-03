const validateUsername = require('./unit/userNameValidation');

const validUsernames = ["john_doe", "user123"];
const invalidUsernames = ["short", "user$123", "user@123"];

validUsernames.forEach(username => {
  test(`returns no errors for valid username: ${username}`, () => {
    const errors = validateUsername(username);
    expect(errors).toEqual([]); // Expecting an empty array for a valid username
  });
});

invalidUsernames.forEach(username => {
  test(`returns errors for invalid username: ${username}`, () => {
    const errors = validateUsername(username);
    expect(errors).not.toEqual([]); // Expecting a non-empty array for an invalid username
  });
});
