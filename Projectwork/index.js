if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const flash = require("express-flash");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.set("view engine", "ejs");
app.use(express.json());

const { authenticateUser } = require("./routes/authentication");

require("./routes/authentication").initializeSession(app);
require("./routes/vp_admin_request_response")(app, authenticateUser);
require("./routes/forgot-password")(app);
require("./routes/student/student_routes")(app, authenticateUser);
require("./routes/admin/admin_routes")(app, authenticateUser);
require("./routes/admin/visitation_permission")(app, authenticateUser);
require("./routes/admin/request_Box")(app, authenticateUser);
require("./routes/admin/my_profile")(app, authenticateUser);
require("./routes/student/request_box")(app, authenticateUser);
require("./routes/student/student_profile")(app, authenticateUser);
require("./routes/student/visitation_permission")(app, authenticateUser);
require("./routes/admin/fee_receipt")(app, authenticateUser);


app.get("/", (req, res) => {
	res.redirect("/login");
});

app.get("/login", (req, res) => {
	res.render("sign-in");
});

app.get("/home", authenticateUser, (req, res) => {
	res.render("student/student_home");
});

app.listen(port, (err) => {
	if (err) throw err;

	console.log("Server is runnig on port ", port);
});
