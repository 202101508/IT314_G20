let container = $(".container");

toggle = () => {
    $(".container").toggleClass("sign-in");
    $(".container").toggleClass("sign-up");
    if ($(".container").attr("class").split(" ")[1] === "sign-up") {
        $("title").text("Sign Up");
    } else {
        $("title").text("Sign In");
    }
};

setTimeout(() => {
    $(".container").addClass("sign-in");
}, 200);

$("#reset").click((event) => {
    location.assign("/forgot-password");
});

$(".remove").click((event) => {
    $('.remove').text('');
});

$("#toggle.pointer").click((event) => {
    toggle();
});

//Username Validation
var username = $("#Username");
function validateUsername(value){
    if(username.val().length <6 || username.val().length>12){
        username[0].setCustomValidity("Username length should between 6 To 14");
    }
    if(username.val().match(/[!\@\#\$\%\^\&\*\(\)\-\+\=\?\>\<\.\,]/)){
        username[0].setCustomValidity("Only underscore allowed");
    }
}
username.change(() => validateUsername(username.val()));
username.keyup(() => validateUsername(username.val()));
// Email validation
var email = $("#Email");

function validateEmail(value) {
    // if(email.val().length<1) {
    //     email[0].setCustomValidity("Enter an email address");
    // }
    if(!validator.isEmail(value)) {
        email[0].setCustomValidity("Invalid Email Address");
    } else {
        email[0].setCustomValidity("");
    }
}

email.change(() => validateEmail(email.val()));
email.keyup(() => validateEmail(email.val()));

//Password validation

var password = $("#Passwd"),
    confirm_password = $("#Conf-Passwd");
    
function validatePassword() {
    var pass = document.getElementById('pass1');
    var upper = document.getElementById('upper');
    var lower = document.getElementById('lower');
    var num = document.getElementById('number');
    var len = document.getElementById('length');
    var sp_char = document.getElementById('special_char');
    if(password.val().match(/[0-9]/)){
        num.style.color = 'green';
    }
    else{
        password[0].setCustomValidity("Atleast 1 number required");
        num.style.color = 'red';
    }
    if(password.val().match(/[A-Z]/)){
        upper.style.color = 'green';
    }
    else{
        password[0].setCustomValidity("Atleast 1 uppercase required");
        upper.style.color = 'red';
    } 
    if(password.val().match(/[a-z]/)){
        lower.style.color = 'green';
    }
    else{
        password[0].setCustomValidity("Atleast 1 Lowercase required");
        lower.style.color = 'red';
    }
    if(password.val().match(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\?\>\<\.\,]/)){
        sp_char.style.color = 'green';
    }
    else{
        password[0].setCustomValidity("Atleast 1 Special symbole required");
        sp_char.style.color = 'red';
    }
    if(password.val().length <6 || password.val().length>14){
        password[0].setCustomValidity("Password length should between 6 To 14");
        len.style.color = 'red';
    }
    else{
        len.style.color = 'green';
    }
    // Confirm Password validation
    if (password.val() != confirm_password.val()) {
        confirm_password[0].setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password[0].setCustomValidity("");
    }
}

password.change(validatePassword);
confirm_password.keyup(validatePassword);

