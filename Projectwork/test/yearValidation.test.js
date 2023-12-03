const validateYear = require('./unit/yearValidation');

const validYears = ["2018", "2019", "2020", "2021", "2022", "2023"];
const invalidYears = ["2017", "2024", "abcd", "202"];

validYears.forEach(year => {
  test(`returns no errors for valid year: ${year}`, () => {
    const errors = validateYear(year);
    expect(errors).toEqual([]); // Expecting an empty array for a valid year
  });
});

invalidYears.forEach(year => {
  test(`returns errors for invalid year: ${year}`, () => {
    const errors = validateYear(year);
    expect(errors).not.toEqual([]); // Expecting a non-empty array for an invalid year
  });
});
