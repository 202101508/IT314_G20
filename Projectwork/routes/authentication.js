const session = require("express-session");
const passport = require("passport");

const { User } = require("./dataBase");

const initializeSession = (app) => {
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	// use static authenticate method of model in LocalStrategy
	passport.use(User.createStrategy());

	// use static serialize and deserialize of model for passport session support
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	//Logout User
	app.get("/logout", (req, res) => {
		req.logout((err) => {
			if (err) {
				console.log(err);
			}
			res.redirect("/");
		});
	});

	//Login User and create session cookies
	app.post("/login", (req, res, next) => {
		const user = new User({
			username: req.body.username,
			password: req.body.password,
		});

		passport.authenticate("local", (err, user, info) => {
			if (err) {
				console.log(err);
				return res.redirect("/");
			}
			if (!user) {
				// Authentication failed, user doesn't exist or incorrect credentials
				console.log("Authentication failed. Incorrect email or password.");
				return res.render("sign-in", { failure: "Invalid email or Password" }); // You can redirect to a login page or display an error message.
			}
			req.login(user, (loginErr) => {
				if (loginErr) {
					console.log(loginErr);
					return res.redirect("/");
				}
				// Authentication succeeded, redirect to the next page
				if (user.isAdmin === "on") {
					return res.redirect(`/admin/${user.username}/home`);
				}
				return res.redirect(`/student/${user.username}/home`);
			});
		})(req, res, next);
	});

	//Register new user.
	app.post("/register", (req, res) => {
		let passwd = req.body.password;

		User.register(
			{
				username: req.body.username,
				email: req.body.email,
				isAdmin: req.body.isAdmin,
			},
			passwd,
			(err, user) => {
				if (err) {
					console.log(err);
					res.redirect("/");
				} else {
					passport.authenticate("local")(req, res, () => {
						res.redirect("/login");
					});
				}
			}
		);
	});
};

const authenticateUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Please log in to access this page");
		res.redirect("/login");
	}
};

module.exports = {
	authenticateUser,
	initializeSession,
};
