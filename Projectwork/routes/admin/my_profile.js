const { addAdminDetails, updateAdminDetails } = require("../data");
var { User, adminDetailSchema } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/my_profile", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		try {
			const result = await User.findOne({ username: username }).populate(
				"adminDetails"
			);

			if (result) {
				var resultAdminDetails = result.adminDetails || {};
				console.log("User with adminDetails:", resultAdminDetails);
				res.render("admin/admin_details", {
					data: resultAdminDetails,
					username: username,
				});
			} else {
				console.log("User not found.");
			}
		} catch (error) {
			console.error(error);
		}
	});

	app.get(
		"/admin/:uName/edit_my_profile",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const result = await User.findOne({ username: username }).populate(
					"adminDetails"
				);
				if (result) {
					var resultAdminDetails = result.adminDetails || {};
					console.log("User with studDetails:", resultAdminDetails);
					res.render("admin/edit_admin_details", {
						data: resultAdminDetails,
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
		"/admin/:uName/edit_my_profile",
		authenticateUser,
		async (req, res) => {
			const formData = req.body;

			var username = req.params.uName;
			try {
				const result = await User.findOne({ username: username }).populate(
					"adminDetails"
				);
				if (result) {
					if (result.adminDetails) {
						console.log("update");
						updateAdminDetails(result.adminDetails, formData);
					} else {
						console.log("Add");
						addAdminDetails(adminDetailSchema, username, formData);
					}
					res.redirect(`/admin/${req.params.uName}/my_profile`);
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
