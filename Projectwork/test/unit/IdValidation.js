function validateStudentID(studentID) {
    if (!/^\d+$/.test(studentID)) {
      return ["Only numbers allowed"];
    } else if (!(studentID.length === 9)) {
      return ["Only 9 digits allowed"];
    } else {
      return [];
    }
  }
  
  module.exports = validateStudentID;
  