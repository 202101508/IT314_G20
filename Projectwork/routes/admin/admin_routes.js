const { addAdminDetails, updateAdminDetails, addEvent } = require("../data");
var {
	User,
	adminDetailSchema,
	studDetailSchema,
	reqBox,
	vp_reqBox,
	Receipt,
	Event,
} = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/home", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/home", { username: username });
	});

	app.get("/admin/:uName/student_records", async (req, res) => {
		const username = req.params.uName;

		try {
			const result = await User.find({}).populate("studDetails");

			console.log(result);

			if (result) {
				res.render("admin/student_records", {
					username: username,
					students: result,
				});
			} else {
				res.render("admin/student_records", { username: username });
			}
		} catch (err) {
			if (err) throw err;
		}
	});

	app.get("/admin/:uName/students_profile/:studentId", async (req, res) => {
		var username = req.params.uName;
		var id = req.params.studentId;
		try {
			const result = await User.findOne({ _id: id }).populate(
				"studDetails"
			);

			if (result) {
				var resultStudentDetails = result.studDetails || {};
				console.log("User with studDetails:", resultStudentDetails);
				res.render("admin/student_details", {
					data: resultStudentDetails,
					username: username,
					isAdmin: "true",
				});
			} else {
				console.log("User not found.");
			}
		} catch (error) {
			console.error(error);
		}
	});

	app.get("/admin/:uName/new_student", (req, res) => {
		const username = req.params.uName;

		res.render("admin/new_student", { username: username });
	});

	app.post("/admin/:uName/new_student", async (req, res) => {
		const username = req.params.uName;
		try {
			// Retrieve data from the form submission
			const { student_name, student_id, room_no, email } = req.body;

			studDetailSchema
				.insertMany([
					{
						student_name: student_name,
						student_id: student_id,
						room_no: room_no,
					},
				])
				.then(async (std) => {
					if (!std) {
						console.log("Student No added.");
						res.send("Failure!");
					}

					console.log("Student Add: ", std[0]._id);

					const password = "1234";

					User.register(
						{
							username: student_name.split(" ")[0] + student_id.slice(-3),
							email: email,
							studDetails: std[0]._id,
							isAdmin: "off",
						},
						password,
						(err, user) => {
							if (err) {
								console.log(err);
								res.redirect("/");
							} else {
								res.redirect(`/admin/${username}/student_records`);
							}
						}
					);
				});
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error");
		}
	});

	app.get("/admin/:uName/remove-student/:id", async (req, res) => {
		const username = req.params.uName;
		try {
			const studentId = req.params.id;
			const result = await User.find({ _id: studentId }).populate(
				"studDetails"
			);
			if (result.length !== 0) {
				await studDetailSchema.findOneAndRemove({ _id: result[0].studDetails });
				await User.findOneAndRemove({ _id: studentId });

				res.redirect(`/admin/${username}/student_records`);
			} else {
				console.log("User Not found!");
			}
		} catch (error) {
			console.error("Error removing student:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

	app.get("/admin/:uName/emergency_contacts", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/emergency_contacts", { username: username });
	});

	app.get(
		"/admin/:uName/upcoming_events",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await Event.find({});
				console.log("Events: ", result);

				if (result.length !== 0) {
					res.render("admin/upcoming_events", {
						username: username,
						events: result,
					});
				} else {
					res.render("admin/upcoming_events", { username: username });
				}
			} catch (err) {
				if (err) throw err;
				return;
			}
		}
	);

	app.post("/admin/:uName/add-event", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		console.log(req.body);
		try {
			const user = await User.findOne({ username: username }, { _id: true });

			addEvent(Event, req.body, user._id);
		} catch (err) {
			if (err) throw err;
			return;
		}
		res.redirect(`/admin/${username}/upcoming_events`);
	});

	app.get("/admin/:uName/help", authenticateUser, (req, res) => {
		var username = req.params.uName;
		res.render("admin/help", { username: username });
	});
};
