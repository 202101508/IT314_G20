const { addStudentDetails, updateStudentDetails } = require("../data");
var { User, studDetailSchema } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get(
		"/student/:uName/student_details",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await User.findOne({ username: username }).populate(
					"studDetails"
				);

				if (result) {
					var resultStudentDetails = result.studDetails || {};
					console.log("User with studDetails:", resultStudentDetails);
					res.render("student/student_details", {
						data: resultStudentDetails,
						username: username,
					});
				} else {
					console.log("User not found.");
				}
			} catch (error) {
				console.error(error);
			}
		}
	);

	app.get(
		"/student/:uName/edit_student_details",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await User.findOne({ username: username }).populate(
					"studDetails"
				);
				if (result) {
					var resultStudentDetails = result.studDetails || {};
					console.log("User with studDetails:", resultStudentDetails);
					res.render("student/edit_student_detail", {
						data: resultStudentDetails,
						username: username,
					});
				} else {
					console.log("User not found.");
				}

				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	);

	app.post(
		"/student/:uName/edit_student_details",
		authenticateUser,
		async (req, res) => {
			const formData = req.body;
			// console.log(req.body);

			var username = req.params.uName;
			try {
				const result = await User.findOne({ username: username }).populate(
					"studDetails"
				);
				if (result) {
					if (result.studDetails) {
						console.log("update");
						updateStudentDetails(result.studDetails, formData);
					} else {
						console.log("Add");
						addStudentDetails(studDetailSchema, username, formData);
					}
					res.redirect(`/student/${req.params.uName}/student_details`);
				} else {
					console.log("User not found.");
				}

				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	);
};
