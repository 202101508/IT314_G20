const validateMobileNumber = require('./unit/mobileNumer');

const validMobileNumbers = ["1234567890", "9876543210"];
const invalidMobileNumbers = ["abc123", "123456", "123456789"];

validMobileNumbers.forEach(mobileNumber => {
  test(`returns no errors for valid mobile number: ${mobileNumber}`, () => {
    const errors = validateMobileNumber(mobileNumber);
    expect(errors).toEqual([]); // Expecting an empty array for a valid mobile number
  });
});

invalidMobileNumbers.forEach(mobileNumber => {
  test(`returns errors for invalid mobile number: ${mobileNumber}`, () => {
    const errors = validateMobileNumber(mobileNumber);
    expect(errors).not.toEqual([]); // Expecting a non-empty array for an invalid mobile number
  });
});
