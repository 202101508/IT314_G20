const validateStudentID = require('./unit/IdValidation');

const validIDs = ["123456789", "987654321"];
const invalidIDs = ["abc123", "123456", "1234567890"];

validIDs.forEach(id => {
  test(`returns no errors for valid ID: ${id}`, () => {
    const errors = validateStudentID(id);
    expect(errors).toEqual([]); // Expecting an empty array for a valid ID
  });
});

invalidIDs.forEach(id => {
  test(`returns errors for invalid ID: ${id}`, () => {
    const errors = validateStudentID(id);
    expect(errors).not.toEqual([]); // Expecting a non-empty array for an invalid ID
  });
});
