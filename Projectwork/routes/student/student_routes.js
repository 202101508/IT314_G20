const {
	addStudentDetails,
	updateStudentDetails,
	addRequest,
	vp_addRequest,
} = require("../data");
var { User, studDetailSchema, reqBox, vp_reqBox } = require("../dataBase");

//Student Routes
module.exports = (app, authenticateUser) => {
	app.get("/student/:uName/home", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("student/student_home", { username: username });
	});

	app.get("/student/:uName/fee_receipt", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("student/fee_receipt", { username: username });
	});

	app.get(
		"/student/:uName/emergency_contacts",
		authenticateUser,
		(req, res) => {
			var username = req.params.uName;
			res.render("student/emergency_contacts", { username: username });
		}
	);
};
