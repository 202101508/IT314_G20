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

// Subject Validation
var Subject = $('#subject');

function validateSubject(value) {
    // Check if the input consists only of letters and spaces
    if (!/^[A-Za-z\s]+$/.test(value)) {
        Subject[0].setCustomValidity("Only letters and spaces allowed");
    } else {
        Subject[0].setCustomValidity("");
    }
}

Subject.change(() => validateSubject(Subject.val()));
Subject.keyup(() => validateSubject(Subject.val()));

//Request Validation
var Request = $('#request');

function validateRequest(value) {
    // Check if the input consists only of letters and spaces
    if (!/^[A-Za-z0-9\s]+$/.test(value)) {
        Request[0].setCustomValidity("Only letters and spaces allowed");
    } else {
        Request[0].setCustomValidity("");
    }
    if(value.length>100){
        Request[0].setCustomValidity("Request must be 100 characters or less");
    }
}

Request.change(() => validateRequest(Request.val()));
Request.keyup(() => validateRequest(Request.val()));