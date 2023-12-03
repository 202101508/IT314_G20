const validateEmail = require('./unit/emailValidation');

const validEmails = ["test@example.com", "user123@gmail.com"];
const invalidEmails = ["invalid", "user@gmail"];

validEmails.forEach(email => {
  test(`returns no errors for valid email: ${email}`, () => {
    const errors = validateEmail(email);
    expect(errors).toEqual([]); // Expecting an empty array for a valid email
  });
});

invalidEmails.forEach(email => {
  test(`returns errors for invalid email: ${email}`, () => {
    const errors = validateEmail(email);
    expect(errors).not.toEqual([]); // Expecting a non-empty array for an invalid email
  });
});
