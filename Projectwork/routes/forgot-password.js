const jwt = require("jsonwebtoken");
const { User } = require("./dataBase");
const { transporter, mailOptions } = require("./mail-sender");

module.exports = (app) => {
	app.get("/forgot-password", (req, res) => {
		res.render("forgot-password");
	});

	app.post("/forgot-password", (req, res) => {
		const { email } = req.body;

		//Finding if user exist with this email
		User.findOne({ email: email }, { salt: 1, email: 1, username: 1 })
			.then((user) => {
				if (!user) {
					//User not exist
					res.render("forgot-password", {
						msg: "User with given email do not exist.",
					});
				} else {
					//User found
					const payload = {
						username: user.username,
						email: user.email,
					};

					const secret = process.env.JWT_SECRET + user.salt;
					const token = jwt.sign(payload, secret, { expiresIn: "15m" });
					const link = `https://hostelease.onrender.com/reset-password/${user.username}/${token}`;

					console.log(link);

					//Sending mail to user for change password
					mailOptions.to = user.email;
					mailOptions.subject = "Link for change password.";
					mailOptions.text = `Here is your change password link: ${link}`;

					transporter
						.sendMail(mailOptions)
						.then((info) => {
							console.log("Email sent: ", info);
						})
						.catch((err) => {
							throw err;
						});

					res.render("mail-confirmation");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	app.get("/reset-password/:username/:token", (req, res) => {
		const { username, token } = req.params;

		User.findOne({ username: username }, { salt: 1, email: 1, username: 1 })
			.then((user) => {
				if (!user) {
					res.send("<h1> User not exist </h1>");
				} else {
					const secret = process.env.JWT_SECRET + user.salt;
					try {
						const payload = jwt.verify(token, secret);
						res.render("reset-password", { email: user.email });
					} catch (err) {
						if (err) {
							//Token expired
							res.send(`<h1> ${err.message} </h1>`);
							throw err;
						}
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	app.post("/reset-password/:username/:token", (req, res) => {
		const { username, token } = req.params;
		const { password } = req.body;

		User.findOne({ username: username }, { salt: 1, email: 1, username: 1 })
			.then((user) => {
				if (!user) {
					res.send("<h1> User not exist </h1>");
				} else {
					const secret = process.env.JWT_SECRET + user.salt;
					try {
						const payload = jwt.verify(token, secret);

						(async () => {
							await user
								.setPassword(password)
								.then((user) => {
									console.log(user);
									res.send("Password set.");
								})
								.catch((err) => {
									throw err;
								});

							await user.save();
						})();
					} catch (err) {
						if (err) {
							//Invalid signature
							res.send(`<h1> ${err.message} </h1>`);
							throw err;
						}
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
};
