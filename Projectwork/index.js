import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//sessions and cookies
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

import router from "./routes/vp_admin_request_response.js";

const app = express();
const port = 3000;
const { Schema } = mongoose;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/records", router);

app.use(
	session({
		secret: "This is hostelEase.",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/hostelEase");

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
	req.logout(function (err) {
		if (err) {
			console.log(err);
		}
		res.redirect("/");
	});
});

app.get("/nextPage", (req, res) => {
	console.log("Next Page.");
	if (req.isAuthenticated()) {
		res.send("Authenticated!");
	} else {
		res.redirect("/");
	}
});

// app.post('/login', passport.authenticate('local', { successRedirect:'/',
//                                                     failureRedirect: '/login' }));

app.post("/login", (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	});

	req.login(user, function (err) {
		if (err) {
			console.log(err);
			res.redirect("/");
		} else {
			passport.authenticate("local")(req, res, function (err) {
				if (err) console.log("Err : ", err);
				res.redirect("/nextPage");
			});
		}
	});
});

app.post("/register", (req, res) => {
	let passwd = req.body.password;

	User.register(
		{ username: req.body.username, email: req.body.email },
		passwd,
		function (err, user) {
			if (err) {
				console.log(err);
				res.redirect("/");
			} else {
				passport.authenticate("local")(req, res, function () {
					res.redirect("/nextPage");
				});
			}
		}
	);
});

app.listen(port, (err) => {
	if (err) throw err;

	console.log("Server is runnig on port ", port);
});
