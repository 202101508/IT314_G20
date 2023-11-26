var { User, studDetailSchema } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/student_records", authenticateUser, async (req, res) => {
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

	app.get("/admin/:uName/students_profile/:studentId", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		var id = req.params.studentId;
		try {
			const result = await User.findOne({ _id: id }).populate("studDetails");

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

	app.get("/admin/:uName/new_student", authenticateUser, (req, res) => {
		const username = req.params.uName;

		res.render("admin/new_student", { username: username });
	});

	app.post("/admin/:uName/new_student", authenticateUser, async (req, res) => {
		const username = req.params.uName;
		try {
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

	app.get("/admin/:uName/remove-student/:id", authenticateUser, async (req, res) => {
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
};
