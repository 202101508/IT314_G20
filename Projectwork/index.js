if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const port = 3000;
const { Schema } = mongoose;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect("mongodb://127.0.0.1:27017/hostelEase");

const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
	res.render("sign-in");
});

app.get("/login", (req, res) => {
	res.redirect("/");
});

app.get("/forgot-passwd", (req, res) => {
	res.send("<h1>Forgot-Password</h1>");
});

app.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/");
	});
});

const authenticateUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}

app.get("/nextPage", authenticateUser, (req, res) => {
	console.log("Next Page.");
	res.send("Authenticated!");
});

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
			return res.render("sign-in", {failure: "Invalid email or password"}); // You can redirect to a login page or display an error message.
		}
		req.login(user, (loginErr) => {
			if (loginErr) {
				console.log(loginErr);
				return res.redirect("/");
			}
			// Authentication succeeded, redirect to the next page
			return res.redirect("/nextPage");
		});
	})(req, res, next);
});

app.post("/register", (req, res) => {
	let passwd = req.body.password;

	User.register(
		{ username: req.body.username, email: req.body.email },
		passwd,
		(err, user) => {
			if (err) {
				console.log(err);
				res.redirect("/");
			} else {
				passport.authenticate("local")(req, res, () => {
					res.redirect("/nextPage");
				});
			}
		}
	);
});

require("./routes/vp_admin_request_response")(app, authenticateUser);

app.listen(port, (err) => {
	if (err) throw err;

	console.log("Server is runnig on port ", port);
});
