var { User, vp_reqBox } = require("../dataBase");

module.exports = (app, authenticateUser) => {
	app.get("/admin/:uName/vp_requests", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		try {
			const user = await User.findOne({ username: username });
			if (user) {
				const result = await vp_reqBox.find({}).populate({
					path: "User",
					model: "User",
					populate: {
						path: "studDetails",
						model: "studDetails",
					},
				});
				if (result.length !== 0) {
					res.render("admin/vp_requests", {
						username: username,
						data: result,
					});
				} else {
					res.render("admin/vp_requests", { username: username });
				}
			} else {
				console.log("User Not found!");
				return;
			}
		} catch (err) {
			if (err) throw err;
		}
	});

	app.get("/admin/:uName/vp_records", authenticateUser, async (req, res) => {
		var username = req.params.uName;
		try {
			const user = await User.findOne({ username: username });
			if (user) {
				const result = await vp_reqBox.find({}).populate({
					path: "User",
					model: "User",
					populate: {
						path: "studDetails",
						model: "studDetails",
					},
				});
				console.log(result[0].User.studDetails.student_id);
				if (result.length !== 0) {
					res.render("admin/vp_records", {
						username: username,
						data: result,
					});
				} else {
					res.render("admin/vp_records", { username: username });
				}
			} else {
				console.log("User Not found!");
				return;
			}
		} catch (err) {
			if (err) throw err;
		}
	});

	//Handling Visitation Permission Accept button click
	app.post(
		"/admin/:uName/vp_requests/accept/:id",
		authenticateUser,
		async (req, res) => {
			const id = req.params.id;
			var username = req.params.uName;
			console.log("Accept!: ", id);
			try {
				const result = await vp_reqBox.findOne({ _id: id });
				if (result) {
					const date = new Date();
					result.confirmation = "Accepted";
					result.confDate =
						date.toDateString() + " at " + date.toLocaleTimeString();

					result.save().then(() => {
						console.log("updated Successfully!");
					});
					res.redirect(`/admin/${username}/vp_requests`);
				} else {
					console.log("Couldn't able to find");
				}
			} catch (err) {
				if (err) throw err;
			}
		}
	);

	//Handling Visitation Permission Discard button click
	app.post(
		"/admin/:uName/vp_requests/discard/:id",
		authenticateUser,
		async (req, res) => {
			const id = req.params.id;
			var username = req.params.uName;
			console.log("Discard!: ", id);
			try {
				const result = await vp_reqBox.findOne({ _id: id });
				if (result) {
					const date = new Date();
					result.confirmation = "Discarded";
					result.confDate =
						date.toDateString() + " at " + date.toLocaleTimeString();
					result.save().then(() => {
						console.log("updated Successfully!");
					});
					res.redirect(`/admin/${username}/vp_requests`);
				} else {
					console.log("Couldn't able to find");
				}
			} catch (err) {
				if (err) throw err;
			}
		}
	);
};
