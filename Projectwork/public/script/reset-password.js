//Confirm password validation
$("#confPassword").click((event) => {
    console.log("clicked");
});

var password = $("#password"),
    confirm_password = $("#confPassword");

function validatePassword() {
    if (password.val() != confirm_password.val()) {
        console.log(password.val());
        console.log(confirm_password.val());

        confirm_password[0].setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password[0].setCustomValidity("");
    }
}

password.change(validatePassword);
confirm_password.keyup(validatePassword);