const {
	addStudentDetails,
	updateStudentDetails,
	addRequest,
	vp_addRequest,
} = require("../data");
var {
	User,
	studDetailSchema,
	reqBox,
	vp_reqBox,
	Event,
	emergencyContacts,
} = require("../dataBase");

//Student Routes
module.exports = (app, authenticateUser) => {
	app.get("/student/:uName/home", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("student/student_home", { username: username });
	});

	app.get(
		"/student/:uName/emergency_contacts",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await emergencyContacts.find({});
				if (result) {
					res.render("student/emergency_contacts", {
						username: username,
						result: result[0],
					});
				} else {
					res.render("student/emergency_contacts", {
						username: username,
					});
				}
			} catch (err) {
				if (err) throw err;
			}
		}
	);

	app.get(
		"/student/:uName/upcoming_events",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await Event.find({});
				console.log("Events: ", result);

				if (result.length !== 0) {
					res.render("student/upcoming_event", {
						username: username,
						events: result,
					});
				} else {
					res.render("student/upcoming_event", { username: username });
				}
			} catch (err) {
				if (err) throw err;
				return;
			}
		}
	);
};
