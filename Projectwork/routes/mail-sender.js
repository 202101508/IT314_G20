const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

var mailOptions = {
	from: process.env.EMAIL,
	to: process.env.EMAIL,
	subject: "No subject.",
	text: "It is from hostelEase.",
};

// console.log(transporter);

module.exports = {
	transporter,
	mailOptions,
};
