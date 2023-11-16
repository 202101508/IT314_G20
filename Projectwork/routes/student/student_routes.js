//Student Routes
module.exports = (app, authenticateUser) => {
	app.get("/student/home", authenticateUser, (req, res) => {
		res.render("student/student_home");
	});

	app.get("/student/student_details", authenticateUser, (req, res) => {
		res.render("student/student_details");
	});

	app.get("/student/fee_receipt", authenticateUser, (req, res) => {
		res.render("student/fee_receipt");
	});

	app.get("/student/req_box", authenticateUser, (req, res) => {
		res.render("student/req_box.ejs");
	});

	app.get("/student/edit_profile", authenticateUser, (req, res) => {
		res.render("student/edit_student_detail");
	});

	// app.post("/update-profile", (req, res) => {
	// 	const {
	// 		studentName,
	// 		studentId,
	// 		academicYear,
	// 		batch,
	// 		email,
	// 		gender,
	// 		bloodGroup,
	// 		mobileNo,
	// 	} = req.body;

	// 	res.json({ message: "Profile updated successfully" });
	// });

	app.get("/student/visitation", authenticateUser, (req, res) => {
		res.render("student/visitation");
	});

	app.get(
		"/student/visitation/visitation_button",
		authenticateUser,
		(req, res) => {
			res.render("student/visitation_button");
		}
	);

	app.get("/student/req_box/req_box_button", authenticateUser, (req, res) => {
		res.render("student/req_box_button");
	});

	app.get("/student/emergency_contacts", authenticateUser, (req, res) => {
		res.render("student/emergency_contacts");
	});
};
