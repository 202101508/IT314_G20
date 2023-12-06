// Name validation
var studentName = $('#student-name');

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
var studentid = $("#student-id");
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

//Mobile Number Validation
var MobileNo = $('#contact-no');

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

// visitor1 validation
var Visitor1 = $('#visitor1');

function validateVisitor1(value) {
    // Check if the input consists only of letters and spaces
    if (!/^[A-Za-z\s]+$/.test(value)) {
        Visitor1[0].setCustomValidity("Only letters and spaces allowed");
    } else {
        Visitor1[0].setCustomValidity("");
    }
}

Visitor1.change(() => validateVisitor1(Visitor1.val()));
Visitor1.keyup(() => validateVisitor1(Visitor1.val()));

// visitor2 validation
var Visitor2 = $('#visitor2');

function validateVisitor2(value) {
    // Check if the input consists only of letters and spaces
    if (!/^[A-Za-z\s]+$/.test(value)) {
        Visitor2[0].setCustomValidity("Only letters and spaces allowed");
    } else {
        Visitor2[0].setCustomValidity("");
    }
}

Visitor2.change(() => validateVisitor2(Visitor2.val()));
Visitor2.keyup(() => validateVisitor2(Visitor2.val()));

// Purpose of Visit validation
var Purpose = $('#purpose');

function validatePurpose(value) {
    // Check if the input consists only of letters and spaces
    if (!/^[A-Za-z\s]+$/.test(value)) {
        Purpose[0].setCustomValidity("Only letters and spaces allowed");
    } else {
        Purpose[0].setCustomValidity("");
    }
}

Purpose.change(() => validatePurpose(Purpose.val()));
Purpose.keyup(() => validatePurpose(Purpose.val()));
