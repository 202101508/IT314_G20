//Username Validation
var username = $("#username");
function validateUsername(){
    // console.log(username.val().length<6 || username.val().length>12);
    if(username.val().length<6 || username.val().length>12){
        username[0].setCustomValidity("Username length should between 6 To 12");
    }
    else{
        username[0].setCustomValidity("");
    }
    if(username.val().match(/[!\@\#\$\%\^\&\*\(\)\-\+\=\?\>\<\.\,]/)){
        username[0].setCustomValidity("Only underscore allowed");
    }
}
username.change(() => validateUsername(username.val()));
username.keyup(() => validateUsername(username.val()));

//Semester validation
// var studentid = $("#student_id");
// function validatestudentid(value){
//     if (!/^\d+$/.test(value)) {
//         studentid[0].setCustomValidity("Only numbers allowed");
//     } else if(!(studentid.val().length == 9)){
//         studentid[0].setCustomValidity("Only 9 digits allowed");
//     }
//     else {
//         studentid[0].setCustomValidity("");
//     }
// }
// studentid.change(() => validatestudentid(studentid.val()));
// studentid.keyup(() => validatestudentid(studentid.val()));

//Fee Payment Validation
var FeePayment = $("#feePayment");
function validateFeePayment(){
    if (!/^\d+$/.test(value)) {
        FeePayment[0].setCustomValidity("Only numbers allowed");
    }
    else {
        FeePayment[0].setCustomValidity("");
    }
}
FeePayment.change(() => validatestudentid(FeePayment.val()));
FeePayment.keyup(() => validatestudentid(FeePayment.val()));

//ID validation
var studentid = $("#userid");
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