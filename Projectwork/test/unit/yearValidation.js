// yearValidation.js
function validateYear(year) {
    const validYears = ["2018", "2019", "2020", "2021", "2022", "2023"];
  
    if (!validYears.includes(year)) {
      return ["Invalid Year"];
    } else {
      return [];
    }
  }
  
  module.exports = validateYear;
  