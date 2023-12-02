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

//Room Number Validation
var RoomNo = $('#room_no');

function validateRoomno() {
    if (RoomNo.val().length>4) {
        RoomNo[0].setCustomValidity("Invalid Room Number");
    } else {
        RoomNo[0].setCustomValidity("");
    }
}

RoomNo.change(() => validateRoomno(RoomNo.val()));
RoomNo.keyup(() => validateRoomno(RoomNo.val()));
