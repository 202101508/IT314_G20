if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const flash = require('express-flash');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.set("view engine", "ejs");

const { authenticateUser } = require("./routes/authentication");

require("./routes/authentication").initializeSession(app);
require("./routes/vp_admin_request_response")(app, authenticateUser);

app.get("/", (req, res) => {
	res.render("sign-in");
});

app.get("/login", (req, res) => {
	res.redirect("/");
});

app.get("/forgot-passwd", (req, res) => {
	res.send("<h1>Forgot-Password</h1>");
});

app.get("/nextPage", authenticateUser, (req, res) => {
	res.send("Authenticated!");
});

app.listen(port, (err) => {
	if (err) throw err;

	console.log("Server is runnig on port ", port);
});
