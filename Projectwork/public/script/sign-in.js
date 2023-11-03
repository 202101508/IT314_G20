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
	location.assign("/forgot-passwd");
});

$(".remove").click((event) => {
	$('.remove').text('');
});

$("#toggle.pointer").click((event) => {
	toggle();
});

//Confirm Password validation
var password = $("#Passwd"),
	confirm_password = $("#Conf-Passwd");

function validatePassword() {
	if (password.val() != confirm_password.val()) {
		confirm_password[0].setCustomValidity("Passwords Don't Match");
	} else {
		confirm_password[0].setCustomValidity("");
	}
}

password.change(validatePassword);
confirm_password.keyup(validatePassword);
