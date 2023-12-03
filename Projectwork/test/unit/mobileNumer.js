function validateMobileNumber(mobileNumber) {
    if (!/^\d+$/.test(mobileNumber)) {
      return ["Only numbers allowed"];
    } else if (!(mobileNumber.length === 10)) {
      return ["Invalid Mobile Number"];
    } else {
      return [];
    }
  }
  
  module.exports = validateMobileNumber;
  