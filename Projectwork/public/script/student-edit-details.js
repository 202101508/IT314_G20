// Name validation
var studentName = $('#student_name');

function validateName(value) {
    // Check if the input consists only of letters and spaces
    if (!/^[A-Za-z\s]+$/.test(value)) {
        studentName[0].setCustomValidity("Only letters and spaces allowed");
    } else {
        studentName[0].setCustomValidity("");
    }
}

studentName.change(() => validateName(studentName.val()));
studentName.keyup(() => validateName(studentName.val()));


//ID validation
var studentid = $("#student_id");
function validatestudentid(value){
    if (!/^\d+$/.test(value)) {
        studentid[0].setCustomValidity("Only numbers allowed");
    } else if(!(studentid.val().length == 9)){
        studentid[0].setCustomValidity("Only 9 digits allowed");
    }
    else {
        studentid[0].setCustomValidity("");
    }
}
studentid.change(() => validatestudentid(studentid.val()));
studentid.keyup(() => validatestudentid(studentid.val()));

//Email Validation
var email = $("#email");

function validateEmail(value) {
    if(!validator.isEmail(value)) {
        email[0].setCustomValidity("Invalid Email Address");
    } else {
        email[0].setCustomValidity("");
    }
}

email.change(() => validateEmail(email.val()));
email.keyup(() => validateEmail(email.val()));

//Gender Validation
var Gender = $('#gender');

function validateGender(){
    if(Gender.val() == "M" || Gender.val() == "F"){
        Gender[0].setCustomValidity("");
    }
    else{
        Gender[0].setCustomValidity("Plaease Enter correct deatil");
    }
}

Gender.change(() => validateGender(Gender.val()));
Gender.keyup(() => validateGender(Gender.val()));

//Mobile Number Validation
var MobileNo = $('#mobile_no');

function validateMobile(value){
    if (!/^\d+$/.test(value)) {
        MobileNo[0].setCustomValidity("Only numbers allowed");
    } else if(!(MobileNo.val().length == 10)){
        MobileNo[0].setCustomValidity("Invalid Mobile Number");
    }
    else {
        MobileNo[0].setCustomValidity("");
    }
}

MobileNo.change(() => validateMobile(MobileNo.val()));
MobileNo.keyup(() => validateMobile(MobileNo.val()));

//year validation
var Year = $('#academic_year');

function validateYear(){
    if(Year.val() == "2018" || Year.val() == "2019" || Year.val() == "2020" || Year.val() == "2021" || Year.val() == "2022" || Year.val() == "2023"){
        Year[0].setCustomValidity("");
    }
    else{
        Year[0].setCustomValidity("Invalid Year");
    }
}

Year.change(() => validateYear(Year.val()));
Year.keyup(() => validateYear(Year.val()));


// Blood group validation
var bloodGroup = $('#blood_group');

function validateBloodGroup(value) {
    // Check if the input follows a valid blood group pattern (e.g., A+, B-, AB+, O+)
    if (!/^(A|B|AB|O)[+-]$/.test(value.toUpperCase())) {
        bloodGroup[0].setCustomValidity("Invalid blood group format");
    } else {
        bloodGroup[0].setCustomValidity("");
    }
}

bloodGroup.change(() => validateBloodGroup(bloodGroup.val()));
bloodGroup.keyup(() => validateBloodGroup(bloodGroup.val()));

// Batch validation
var batch = $('#batch');

function validateBatch(value) {
    // Define an array of allowed batch values
    const allowedBatchValues = ['ICT', 'MNC', 'ICT-CS', 'VLSI'];

    // Check if the input is in the array of allowed values
    if (!allowedBatchValues.includes(value.toUpperCase())) {
        batch[0].setCustomValidity("Invalid batch value");
    } else {
        batch[0].setCustomValidity("");
    }
}

batch.change(() => validateBatch(batch.val()));
batch.keyup(() => validateBatch(batch.val()));
