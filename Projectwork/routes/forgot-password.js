const jwt = require("jsonwebtoken");
const express = require("express");
const { User } = require("./dataBase");

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
					const token = jwt.sign(payload, secret, { expiresIn: "10s" });
					const link = `http://localhost:3000/reset-password/${user.username}/${token}`;

					console.log(link);
					res.send("link has been sent to your email.");
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
					res.send("User not exist");
				} else {
					const secret = process.env.JWT_SECRET + user.salt;
					try {
						const payload = jwt.verify(token, secret);
						res.render("reset-password", { email: user.email });
					} catch (err) {
						if(err){
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
		const { password, confPassword } = req.body;

		User.findOne({ username: username }, { salt: 1, email: 1, username: 1 })
			.then((user) => {
				if (!user) {
					res.send("User not exist");
				} else {
					const secret = process.env.JWT_SECRET + user.salt;
					try {
						const payload = jwt.verify(token, secret);

						(async ()=> {
                            await user
							.setPassword(password)
							.then((user) => {
                                console.log(user);
								res.send("Password set.");
							})
							.catch((err) => {
								throw err;
							})

                           await  user.save()})();
					} catch (err) {
						if(err){
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
