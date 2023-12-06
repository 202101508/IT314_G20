var {
	User,
	studDetailSchema,
	reqBox,
	vp_reqBox,
	Receipt,
} = require("../dataBase");

var { generateRandomString } = require("../data");

const { transporter, mailOptions } = require("../mail-sender");

module.exports = (app, authenticateUser) => {
	app.get(
		"/admin/:uName/student_records",
		authenticateUser,
		async (req, res) => {
			const username = req.params.uName;

			try {
				const result = await User.find({}).populate("studDetails");

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
		}
	);

	app.get(
		"/admin/:uName/students_profile/:studentId",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			var id = req.params.studentId;
			try {
				const result = await User.findOne({ _id: id }).populate("studDetails");

				if (result) {
					var resultStudentDetails = result.studDetails || {};
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
		}
	);

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
					const password = generateRandomString();

					//Sending mail to student about login details.
					mailOptions.to = email;
					mailOptions.subject = "Your Account Details";
					mailOptions.text = `Here is your Account details: 
					\nUsername: ${student_id}\nPassword: ${password}\nRoom No: ${room_no}
					\nYou can change your password using forgot password.`;

					transporter
						.sendMail(mailOptions)
						.then((info) => {
							console.log("Email sent: ", info);
						})
						.catch((err) => {
							throw err;
						});

					User.register(
						{
							username: student_id,
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

	app.get(
		"/admin/:uName/remove-student/:id",
		authenticateUser,
		async (req, res) => {
			const username = req.params.uName;
			try {
				const studentId = req.params.id;
				const result = await User.find({ _id: studentId }).populate(
					"studDetails"
				);
				if (result.length !== 0) {
					await studDetailSchema.findOneAndRemove({
						_id: result[0].studDetails,
					});
					await reqBox.deleteMany({ User: studentId });
					await vp_reqBox.deleteMany({ User: studentId });
					await Receipt.deleteMany({ userid: studentId });
					await User.findOneAndRemove({ _id: studentId });

					res.redirect(`/admin/${username}/student_records`);
				} else {
					console.log("User Not found!");
				}
			} catch (error) {
				console.error("Error removing student:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		}
	);
};
