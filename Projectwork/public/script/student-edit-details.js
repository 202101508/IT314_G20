//ID validation
var studentid = $("#student_id");
function validatestudentid(value){
    if(1){
        studentid[0].setCustomValidity("Please Enter only 9 digits");
    }
    else {
        studentid[0].setCustomValidity("");
    }
}
studentid.change(() => validatestudentid(studentid.val()));
studentid.keyup(() => validatestudentid(studentid.val()));