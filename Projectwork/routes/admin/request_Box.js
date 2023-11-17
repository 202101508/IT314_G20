var { User, reqBox } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/req_box", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		try {
			const user = await User.findOne({ username: username });
			if (user) {
				const result = await reqBox.find({}).populate({
					path: "User",
					model: "User",
					populate: {
						path: "studDetails",
						model: "studDetails",
					},
				});
				if (result.length !== 0) {
					res.render("admin/req_box_admin", {
						username: username,
						data: result,
					});
				} else {
					res.render("admin/req_box_admin", { username: username });
				}
			} else {
				console.log("User Not found!");
				return;
			}
		} catch (err) {
			if (err) throw err;
		}
	});

	app.get(
		"/admin/:uName/req_box_records",
		authenticateUser,
		async (req, res) => {
			var username = req.params.uName;
			try {
				const user = await User.findOne({ username: username });
				if (user) {
					const result = await reqBox.find({}).populate({
						path: "User",
						model: "User",
						populate: {
							path: "studDetails",
							model: "studDetails",
						},
					});
					console.log(result[0].User.studDetails.student_id);
					if (result.length !== 0) {
						res.render("admin/req_box_records", {
							username: username,
							data: result,
						});
					} else {
						res.render("admin/req_box_records", { username: username });
					}
				} else {
					console.log("User Not found!");
					return;
				}
			} catch (err) {
				if (err) throw err;
			}
			// res.render("admin/req_box_records", { username: username });
		}
	);

	//Handling Accept button click
	app.post(
		"/admin/:uName/req_box/accept/:id",
		authenticateUser,
		async (req, res) => {
			const id = req.params.id;
			var username = req.params.uName;
			console.log("Accept!: ", id);
			try {
				const result = await reqBox.findOne({ _id: id });
				if (result) {
					const date = new Date();
					result.confirmation = "Accepted";
					result.confDate =
						date.toDateString() + " at " + date.toLocaleTimeString();

					result.save().then(() => {
						console.log("updated Successfully!");
					});
					res.redirect(`/admin/${username}/req_box`);
				} else {
					console.log("Couldn't able to find");
				}
			} catch (err) {
				if (err) throw err;
			}
		}
	);

	//Handling Discard button click
	app.post(
		"/admin/:uName/req_box/discard/:id",
		authenticateUser,
		async (req, res) => {
			const id = req.params.id;
			var username = req.params.uName;
			console.log("Discard!: ", id);
			try {
				const result = await reqBox.findOne({ _id: id });
				if (result) {
					const date = new Date();
					result.confirmation = "Discarded";
					result.confDate =
						date.toDateString() + " at " + date.toLocaleTimeString();
					result.save().then(() => {
						console.log("updated Successfully!");
					});
					res.redirect(`/admin/${username}/req_box`);
				} else {
					console.log("Couldn't able to find");
				}
			} catch (err) {
				if (err) throw err;
			}
		}
	);
};
